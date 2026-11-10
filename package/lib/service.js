import { isAbsolute } from "node:path";
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import { Workbench, resolveStateLocation } from "./backend.mjs";
import { readNativeSource } from "./native-reader.mjs";
//#region .build-host.mjs
/** DSH Host entry; no collection runs during installation or activation. */
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
let WecomFiles = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _request_decorators;
	return class WecomFiles extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_request_decorators = [Remote];
			__esDecorate(this, null, _request_decorators, {
				kind: "method",
				name: "request",
				static: false,
				private: false,
				access: {
					has: (obj) => "request" in obj,
					get: (obj) => obj.request
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static inject = ["subprocess"];
		constructor(ctx, config = {}) {
			super(ctx, "wecomFws");
			__runInitializers(this, _instanceExtraInitializers);
			const hostHome = ctx.profileContext?.home ?? null;
			const { stateDirectory, legacyStateDirectories } = resolveStateLocation(config.stateDirectory, { hostHome });
			const jobTimeoutMs = config.jobTimeoutMs ?? 6e5;
			const readerKeyTimeoutMs = config.readerKeyTimeoutMs ?? 1e5;
			const readerMaxDatabaseBytes = config.readerMaxDatabaseBytes ?? 1073741824;
			if (typeof stateDirectory !== "string" || !isAbsolute(stateDirectory) || !Number.isSafeInteger(jobTimeoutMs) || jobTimeoutMs < 1e3 || jobTimeoutMs > 18e5) throw new Error("wecom-files: invalid host config");
			if (!Number.isSafeInteger(readerKeyTimeoutMs) || readerKeyTimeoutMs < 1e3 || readerKeyTimeoutMs > 3e5 || !Number.isSafeInteger(readerMaxDatabaseBytes) || readerMaxDatabaseBytes < 4096 || readerMaxDatabaseBytes > 4294967296) throw new Error("wecom-files: invalid reader config");
			this.workbench = new Workbench({
				stateDirectory,
				legacyStateDirectories,
				jobTimeoutMs,
				nativeReader: (request, signal) => readNativeSource(ctx.subprocess, request, signal, {
					readerKeyTimeoutMs,
					readerMaxDatabaseBytes
				})
			});
			ctx.effect(() => () => this.workbench.dispose());
			ctx.on("ready", () => this.workbench.ready);
		}
		/** Execute one user action; attachment copies only begin after start. */
		async request(payload) {
			try {
				return JSON.stringify({
					ok: true,
					value: await this.workbench.request(JSON.parse(payload))
				});
			} catch (error) {
				return JSON.stringify({
					ok: false,
					code: error.code || "invalid-request"
				});
			}
		}
	};
})();
//#endregion
export { WecomFiles as default };

//# sourceMappingURL=index.js.map