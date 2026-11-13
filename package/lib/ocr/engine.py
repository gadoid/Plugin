"""dsh-atom 扫描件 OCR：单页输出行级归一化框，供核对浮层定位证据。

独立进程运行（Host spawn），stdout 只输出一行 ASCII JSON（非 ASCII 走 \\u 转义），
避免 Windows 控制台编码影响解析。依赖：rapidocr-onnxruntime / pypdfium2 / Pillow。
"""
import argparse
import json
import sys
import time


def emit(payload):
    print(json.dumps(payload, ensure_ascii=True))
    sys.stdout.flush()


def main():
    ap = argparse.ArgumentParser(description="dsh-atom OCR engine")
    ap.add_argument("--input", required=True)
    ap.add_argument("--page", type=int, default=1)
    ap.add_argument("--dpi", type=int, default=200)
    args = ap.parse_args()

    t0 = time.time()
    try:
        import pypdfium2 as pdfium
        from PIL import Image
        from rapidocr_onnxruntime import RapidOCR
    except Exception as e:
        emit({"ok": False, "error": "engine_unavailable", "detail": str(e).splitlines()[0][:300]})
        return

    try:
        if args.input.lower().endswith(".pdf"):
            doc = pdfium.PdfDocument(args.input)
            index = max(0, min(args.page - 1, len(doc) - 1))
            img = doc[index].render(scale=args.dpi / 72).to_pil()
        else:
            img = Image.open(args.input).convert("RGB")
    except Exception as e:
        emit({"ok": False, "error": "render_failed", "detail": str(e)[:300]})
        return

    try:
        engine = RapidOCR()
        result, _ = engine(img)
    except Exception as e:
        emit({"ok": False, "error": "ocr_failed", "detail": str(e)[:300]})
        return

    width, height = img.width, img.height
    items = []
    for entry in result or []:
        box, text, score = entry[0], str(entry[1]), float(entry[2])
        xs = [point[0] for point in box]
        ys = [point[1] for point in box]
        x0, x1 = min(xs), max(xs)
        y0, y1 = min(ys), max(ys)
        items.append({
            "x": round(x0 / width, 4),
            "y": round(y0 / height, 4),
            "w": round((x1 - x0) / width, 4),
            "h": round((y1 - y0) / height, 4),
            "text": text,
            "conf": round(score, 4),
        })

    emit({
        "ok": True,
        "page": args.page,
        "width": width,
        "height": height,
        "elapsed_s": round(time.time() - t0, 1),
        "items": items,
    })


if __name__ == "__main__":
    main()
