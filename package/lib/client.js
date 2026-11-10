window.__ModuleLoader__.load({
	id: "dsh-atom",
	factory: (require) => {
		const module = { exports: {} };
		const exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		//#endregion
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../wecom-toolchain/node_modules/zod/v4/core/core.cjs
		var require_core$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
			var _a;
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.globalConfig = exports.$ZodEncodeError = exports.$ZodAsyncError = exports.$brand = exports.NEVER = void 0;
			exports.$constructor = $constructor;
			exports.config = config;
			/** A special constant with type `never` */
			exports.NEVER = Object.freeze({ status: "aborted" });
			function $constructor(name, initializer, params) {
				function init(inst, def) {
					if (!inst._zod) Object.defineProperty(inst, "_zod", {
						value: {
							def,
							constr: _,
							traits: /* @__PURE__ */ new Set()
						},
						enumerable: false
					});
					if (inst._zod.traits.has(name)) return;
					inst._zod.traits.add(name);
					initializer(inst, def);
					const proto = _.prototype;
					const keys = Object.keys(proto);
					for (let i = 0; i < keys.length; i++) {
						const k = keys[i];
						if (!(k in inst)) inst[k] = proto[k].bind(inst);
					}
				}
				const Parent = params?.Parent ?? Object;
				class Definition extends Parent {}
				Object.defineProperty(Definition, "name", { value: name });
				function _(def) {
					var _a;
					const inst = params?.Parent ? new Definition() : this;
					init(inst, def);
					(_a = inst._zod).deferred ?? (_a.deferred = []);
					for (const fn of inst._zod.deferred) fn();
					return inst;
				}
				Object.defineProperty(_, "init", { value: init });
				Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
					if (params?.Parent && inst instanceof params.Parent) return true;
					return inst?._zod?.traits?.has(name);
				} });
				Object.defineProperty(_, "name", { value: name });
				return _;
			}
			exports.$brand = Symbol("zod_brand");
			var $ZodAsyncError = class extends Error {
				constructor() {
					super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
				}
			};
			exports.$ZodAsyncError = $ZodAsyncError;
			var $ZodEncodeError = class extends Error {
				constructor(name) {
					super(`Encountered unidirectional transform during encode: ${name}`);
					this.name = "ZodEncodeError";
				}
			};
			exports.$ZodEncodeError = $ZodEncodeError;
			(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
			exports.globalConfig = globalThis.__zod_globalConfig;
			function config(newConfig) {
				if (newConfig) Object.assign(exports.globalConfig, newConfig);
				return exports.globalConfig;
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/util.cjs
		var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.Class = exports.BIGINT_FORMAT_RANGES = exports.NUMBER_FORMAT_RANGES = exports.primitiveTypes = exports.propertyKeyTypes = exports.getParsedType = exports.allowsEval = exports.captureStackTrace = void 0;
			exports.assertEqual = assertEqual;
			exports.assertNotEqual = assertNotEqual;
			exports.assertIs = assertIs;
			exports.assertNever = assertNever;
			exports.assert = assert;
			exports.getEnumValues = getEnumValues;
			exports.joinValues = joinValues;
			exports.jsonStringifyReplacer = jsonStringifyReplacer;
			exports.cached = cached;
			exports.nullish = nullish;
			exports.cleanRegex = cleanRegex;
			exports.floatSafeRemainder = floatSafeRemainder;
			exports.defineLazy = defineLazy;
			exports.objectClone = objectClone;
			exports.assignProp = assignProp;
			exports.mergeDefs = mergeDefs;
			exports.cloneDef = cloneDef;
			exports.getElementAtPath = getElementAtPath;
			exports.promiseAllObject = promiseAllObject;
			exports.randomString = randomString;
			exports.esc = esc;
			exports.slugify = slugify;
			exports.isObject = isObject;
			exports.isPlainObject = isPlainObject;
			exports.shallowClone = shallowClone;
			exports.numKeys = numKeys;
			exports.escapeRegex = escapeRegex;
			exports.clone = clone;
			exports.normalizeParams = normalizeParams;
			exports.createTransparentProxy = createTransparentProxy;
			exports.stringifyPrimitive = stringifyPrimitive;
			exports.optionalKeys = optionalKeys;
			exports.pick = pick;
			exports.omit = omit;
			exports.extend = extend;
			exports.safeExtend = safeExtend;
			exports.merge = merge;
			exports.partial = partial;
			exports.required = required;
			exports.aborted = aborted;
			exports.explicitlyAborted = explicitlyAborted;
			exports.prefixIssues = prefixIssues;
			exports.unwrapMessage = unwrapMessage;
			exports.finalizeIssue = finalizeIssue;
			exports.getSizableOrigin = getSizableOrigin;
			exports.getLengthableOrigin = getLengthableOrigin;
			exports.parsedType = parsedType;
			exports.issue = issue;
			exports.cleanEnum = cleanEnum;
			exports.base64ToUint8Array = base64ToUint8Array;
			exports.uint8ArrayToBase64 = uint8ArrayToBase64;
			exports.base64urlToUint8Array = base64urlToUint8Array;
			exports.uint8ArrayToBase64url = uint8ArrayToBase64url;
			exports.hexToUint8Array = hexToUint8Array;
			exports.uint8ArrayToHex = uint8ArrayToHex;
			const core_js_1 = require_core$1();
			function assertEqual(val) {
				return val;
			}
			function assertNotEqual(val) {
				return val;
			}
			function assertIs(_arg) {}
			function assertNever(_x) {
				throw new Error("Unexpected value in exhaustive check");
			}
			function assert(_) {}
			function getEnumValues(entries) {
				const numericValues = Object.values(entries).filter((v) => typeof v === "number");
				return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
			}
			function joinValues(array, separator = "|") {
				return array.map((val) => stringifyPrimitive(val)).join(separator);
			}
			function jsonStringifyReplacer(_, value) {
				if (typeof value === "bigint") return value.toString();
				return value;
			}
			function cached(getter) {
				return { get value() {
					{
						const value = getter();
						Object.defineProperty(this, "value", { value });
						return value;
					}
					throw new Error("cached value already set");
				} };
			}
			function nullish(input) {
				return input === null || input === void 0;
			}
			function cleanRegex(source) {
				const start = source.startsWith("^") ? 1 : 0;
				const end = source.endsWith("$") ? source.length - 1 : source.length;
				return source.slice(start, end);
			}
			function floatSafeRemainder(val, step) {
				const ratio = val / step;
				const roundedRatio = Math.round(ratio);
				const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
				if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
				return ratio - roundedRatio;
			}
			const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
			function defineLazy(object, key, getter) {
				let value = void 0;
				Object.defineProperty(object, key, {
					get() {
						if (value === EVALUATING) return;
						if (value === void 0) {
							value = EVALUATING;
							value = getter();
						}
						return value;
					},
					set(v) {
						Object.defineProperty(object, key, { value: v });
					},
					configurable: true
				});
			}
			function objectClone(obj) {
				return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
			}
			function assignProp(target, prop, value) {
				Object.defineProperty(target, prop, {
					value,
					writable: true,
					enumerable: true,
					configurable: true
				});
			}
			function mergeDefs(...defs) {
				const mergedDescriptors = {};
				for (const def of defs) {
					const descriptors = Object.getOwnPropertyDescriptors(def);
					Object.assign(mergedDescriptors, descriptors);
				}
				return Object.defineProperties({}, mergedDescriptors);
			}
			function cloneDef(schema) {
				return mergeDefs(schema._zod.def);
			}
			function getElementAtPath(obj, path) {
				if (!path) return obj;
				return path.reduce((acc, key) => acc?.[key], obj);
			}
			function promiseAllObject(promisesObj) {
				const keys = Object.keys(promisesObj);
				const promises = keys.map((key) => promisesObj[key]);
				return Promise.all(promises).then((results) => {
					const resolvedObj = {};
					for (let i = 0; i < keys.length; i++) resolvedObj[keys[i]] = results[i];
					return resolvedObj;
				});
			}
			function randomString(length = 10) {
				const chars = "abcdefghijklmnopqrstuvwxyz";
				let str = "";
				for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * 26)];
				return str;
			}
			function esc(str) {
				return JSON.stringify(str);
			}
			function slugify(input) {
				return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
			}
			exports.captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
			function isObject(data) {
				return typeof data === "object" && data !== null && !Array.isArray(data);
			}
			exports.allowsEval = cached(() => {
				if (core_js_1.globalConfig.jitless) return false;
				if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
				try {
					new Function("");
					return true;
				} catch (_) {
					return false;
				}
			});
			function isPlainObject(o) {
				if (isObject(o) === false) return false;
				const ctor = o.constructor;
				if (ctor === void 0) return true;
				if (typeof ctor !== "function") return true;
				const prot = ctor.prototype;
				if (isObject(prot) === false) return false;
				if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
				return true;
			}
			function shallowClone(o) {
				if (isPlainObject(o)) return { ...o };
				if (Array.isArray(o)) return [...o];
				if (o instanceof Map) return new Map(o);
				if (o instanceof Set) return new Set(o);
				return o;
			}
			function numKeys(data) {
				let keyCount = 0;
				for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) keyCount++;
				return keyCount;
			}
			const getParsedType = (data) => {
				const t = typeof data;
				switch (t) {
					case "undefined": return "undefined";
					case "string": return "string";
					case "number": return Number.isNaN(data) ? "nan" : "number";
					case "boolean": return "boolean";
					case "function": return "function";
					case "bigint": return "bigint";
					case "symbol": return "symbol";
					case "object":
						if (Array.isArray(data)) return "array";
						if (data === null) return "null";
						if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return "promise";
						if (typeof Map !== "undefined" && data instanceof Map) return "map";
						if (typeof Set !== "undefined" && data instanceof Set) return "set";
						if (typeof Date !== "undefined" && data instanceof Date) return "date";
						if (typeof File !== "undefined" && data instanceof File) return "file";
						return "object";
					default: throw new Error(`Unknown data type: ${t}`);
				}
			};
			exports.getParsedType = getParsedType;
			exports.propertyKeyTypes = /* @__PURE__ */ new Set([
				"string",
				"number",
				"symbol"
			]);
			exports.primitiveTypes = /* @__PURE__ */ new Set([
				"string",
				"number",
				"bigint",
				"boolean",
				"symbol",
				"undefined"
			]);
			function escapeRegex(str) {
				return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			}
			function clone(inst, def, params) {
				const cl = new inst._zod.constr(def ?? inst._zod.def);
				if (!def || params?.parent) cl._zod.parent = inst;
				return cl;
			}
			function normalizeParams(_params) {
				const params = _params;
				if (!params) return {};
				if (typeof params === "string") return { error: () => params };
				if (params?.message !== void 0) {
					if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
					params.error = params.message;
				}
				delete params.message;
				if (typeof params.error === "string") return {
					...params,
					error: () => params.error
				};
				return params;
			}
			function createTransparentProxy(getter) {
				let target;
				return new Proxy({}, {
					get(_, prop, receiver) {
						target ?? (target = getter());
						return Reflect.get(target, prop, receiver);
					},
					set(_, prop, value, receiver) {
						target ?? (target = getter());
						return Reflect.set(target, prop, value, receiver);
					},
					has(_, prop) {
						target ?? (target = getter());
						return Reflect.has(target, prop);
					},
					deleteProperty(_, prop) {
						target ?? (target = getter());
						return Reflect.deleteProperty(target, prop);
					},
					ownKeys(_) {
						target ?? (target = getter());
						return Reflect.ownKeys(target);
					},
					getOwnPropertyDescriptor(_, prop) {
						target ?? (target = getter());
						return Reflect.getOwnPropertyDescriptor(target, prop);
					},
					defineProperty(_, prop, descriptor) {
						target ?? (target = getter());
						return Reflect.defineProperty(target, prop, descriptor);
					}
				});
			}
			function stringifyPrimitive(value) {
				if (typeof value === "bigint") return value.toString() + "n";
				if (typeof value === "string") return `"${value}"`;
				return `${value}`;
			}
			function optionalKeys(shape) {
				return Object.keys(shape).filter((k) => {
					return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
				});
			}
			exports.NUMBER_FORMAT_RANGES = {
				safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
				int32: [-2147483648, 2147483647],
				uint32: [0, 4294967295],
				float32: [-34028234663852886e22, 34028234663852886e22],
				float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
			};
			exports.BIGINT_FORMAT_RANGES = {
				int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
				uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
			};
			function pick(schema, mask) {
				const currDef = schema._zod.def;
				const checks = currDef.checks;
				if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
				return clone(schema, mergeDefs(schema._zod.def, {
					get shape() {
						const newShape = {};
						for (const key in mask) {
							if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
							if (!mask[key]) continue;
							newShape[key] = currDef.shape[key];
						}
						assignProp(this, "shape", newShape);
						return newShape;
					},
					checks: []
				}));
			}
			function omit(schema, mask) {
				const currDef = schema._zod.def;
				const checks = currDef.checks;
				if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
				return clone(schema, mergeDefs(schema._zod.def, {
					get shape() {
						const newShape = { ...schema._zod.def.shape };
						for (const key in mask) {
							if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
							if (!mask[key]) continue;
							delete newShape[key];
						}
						assignProp(this, "shape", newShape);
						return newShape;
					},
					checks: []
				}));
			}
			function extend(schema, shape) {
				if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
				const checks = schema._zod.def.checks;
				if (checks && checks.length > 0) {
					const existingShape = schema._zod.def.shape;
					for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
				}
				return clone(schema, mergeDefs(schema._zod.def, { get shape() {
					const _shape = {
						...schema._zod.def.shape,
						...shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				} }));
			}
			function safeExtend(schema, shape) {
				if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
				return clone(schema, mergeDefs(schema._zod.def, { get shape() {
					const _shape = {
						...schema._zod.def.shape,
						...shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				} }));
			}
			function merge(a, b) {
				if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
				return clone(a, mergeDefs(a._zod.def, {
					get shape() {
						const _shape = {
							...a._zod.def.shape,
							...b._zod.def.shape
						};
						assignProp(this, "shape", _shape);
						return _shape;
					},
					get catchall() {
						return b._zod.def.catchall;
					},
					checks: b._zod.def.checks ?? []
				}));
			}
			function partial(Class, schema, mask) {
				const checks = schema._zod.def.checks;
				if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
				return clone(schema, mergeDefs(schema._zod.def, {
					get shape() {
						const oldShape = schema._zod.def.shape;
						const shape = { ...oldShape };
						if (mask) for (const key in mask) {
							if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
							if (!mask[key]) continue;
							shape[key] = Class ? new Class({
								type: "optional",
								innerType: oldShape[key]
							}) : oldShape[key];
						}
						else for (const key in oldShape) shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
						assignProp(this, "shape", shape);
						return shape;
					},
					checks: []
				}));
			}
			function required(Class, schema, mask) {
				return clone(schema, mergeDefs(schema._zod.def, { get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = new Class({
							type: "nonoptional",
							innerType: oldShape[key]
						});
					}
					else for (const key in oldShape) shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
					assignProp(this, "shape", shape);
					return shape;
				} }));
			}
			function aborted(x, startIndex = 0) {
				if (x.aborted === true) return true;
				for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
				return false;
			}
			function explicitlyAborted(x, startIndex = 0) {
				if (x.aborted === true) return true;
				for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
				return false;
			}
			function prefixIssues(path, issues) {
				return issues.map((iss) => {
					var _a;
					(_a = iss).path ?? (_a.path = []);
					iss.path.unshift(path);
					return iss;
				});
			}
			function unwrapMessage(message) {
				return typeof message === "string" ? message : message?.message;
			}
			function finalizeIssue(iss, ctx, config) {
				const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
				const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
				rest.path ?? (rest.path = []);
				rest.message = message;
				if (ctx?.reportInput) rest.input = _input;
				return rest;
			}
			function getSizableOrigin(input) {
				if (input instanceof Set) return "set";
				if (input instanceof Map) return "map";
				if (input instanceof File) return "file";
				return "unknown";
			}
			function getLengthableOrigin(input) {
				if (Array.isArray(input)) return "array";
				if (typeof input === "string") return "string";
				return "unknown";
			}
			function parsedType(data) {
				const t = typeof data;
				switch (t) {
					case "number": return Number.isNaN(data) ? "nan" : "number";
					case "object": {
						if (data === null) return "null";
						if (Array.isArray(data)) return "array";
						const obj = data;
						if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
					}
				}
				return t;
			}
			function issue(...args) {
				const [iss, input, inst] = args;
				if (typeof iss === "string") return {
					message: iss,
					code: "custom",
					input,
					inst
				};
				return { ...iss };
			}
			function cleanEnum(obj) {
				return Object.entries(obj).filter(([k, _]) => {
					return Number.isNaN(Number.parseInt(k, 10));
				}).map((el) => el[1]);
			}
			function base64ToUint8Array(base64) {
				const binaryString = atob(base64);
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
				return bytes;
			}
			function uint8ArrayToBase64(bytes) {
				let binaryString = "";
				for (let i = 0; i < bytes.length; i++) binaryString += String.fromCharCode(bytes[i]);
				return btoa(binaryString);
			}
			function base64urlToUint8Array(base64url) {
				const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
				return base64ToUint8Array(base64 + "=".repeat((4 - base64.length % 4) % 4));
			}
			function uint8ArrayToBase64url(bytes) {
				return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
			}
			function hexToUint8Array(hex) {
				const cleanHex = hex.replace(/^0x/, "");
				if (cleanHex.length % 2 !== 0) throw new Error("Invalid hex string length");
				const bytes = new Uint8Array(cleanHex.length / 2);
				for (let i = 0; i < cleanHex.length; i += 2) bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
				return bytes;
			}
			function uint8ArrayToHex(bytes) {
				return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
			}
			var Class = class {
				constructor(..._args) {}
			};
			exports.Class = Class;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/errors.cjs
		var require_errors$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.$ZodRealError = exports.$ZodError = void 0;
			exports.flattenError = flattenError;
			exports.formatError = formatError;
			exports.treeifyError = treeifyError;
			exports.toDotPath = toDotPath;
			exports.prettifyError = prettifyError;
			const core_js_1 = require_core$1();
			const util = __importStar(require_util());
			const initializer = (inst, def) => {
				inst.name = "$ZodError";
				Object.defineProperty(inst, "_zod", {
					value: inst._zod,
					enumerable: false
				});
				Object.defineProperty(inst, "issues", {
					value: def,
					enumerable: false
				});
				inst.message = JSON.stringify(def, util.jsonStringifyReplacer, 2);
				Object.defineProperty(inst, "toString", {
					value: () => inst.message,
					enumerable: false
				});
			};
			exports.$ZodError = (0, core_js_1.$constructor)("$ZodError", initializer);
			exports.$ZodRealError = (0, core_js_1.$constructor)("$ZodError", initializer, { Parent: Error });
			function flattenError(error, mapper = (issue) => issue.message) {
				const fieldErrors = {};
				const formErrors = [];
				for (const sub of error.issues) if (sub.path.length > 0) {
					fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
					fieldErrors[sub.path[0]].push(mapper(sub));
				} else formErrors.push(mapper(sub));
				return {
					formErrors,
					fieldErrors
				};
			}
			function formatError(error, mapper = (issue) => issue.message) {
				const fieldErrors = { _errors: [] };
				const processError = (error, path = []) => {
					for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
					else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
					else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
					else {
						const fullpath = [...path, ...issue.path];
						if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
						else {
							let curr = fieldErrors;
							let i = 0;
							while (i < fullpath.length) {
								const el = fullpath[i];
								if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
								else {
									curr[el] = curr[el] || { _errors: [] };
									curr[el]._errors.push(mapper(issue));
								}
								curr = curr[el];
								i++;
							}
						}
					}
				};
				processError(error);
				return fieldErrors;
			}
			function treeifyError(error, mapper = (issue) => issue.message) {
				const result = { errors: [] };
				const processError = (error, path = []) => {
					var _a, _b;
					for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
					else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
					else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
					else {
						const fullpath = [...path, ...issue.path];
						if (fullpath.length === 0) {
							result.errors.push(mapper(issue));
							continue;
						}
						let curr = result;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							const terminal = i === fullpath.length - 1;
							if (typeof el === "string") {
								curr.properties ?? (curr.properties = {});
								(_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
								curr = curr.properties[el];
							} else {
								curr.items ?? (curr.items = []);
								(_b = curr.items)[el] ?? (_b[el] = { errors: [] });
								curr = curr.items[el];
							}
							if (terminal) curr.errors.push(mapper(issue));
							i++;
						}
					}
				};
				processError(error);
				return result;
			}
			/** Format a ZodError as a human-readable string in the following form.
			*
			* From
			*
			* ```ts
			* ZodError {
			*   issues: [
			*     {
			*       expected: 'string',
			*       code: 'invalid_type',
			*       path: [ 'username' ],
			*       message: 'Invalid input: expected string'
			*     },
			*     {
			*       expected: 'number',
			*       code: 'invalid_type',
			*       path: [ 'favoriteNumbers', 1 ],
			*       message: 'Invalid input: expected number'
			*     }
			*   ];
			* }
			* ```
			*
			* to
			*
			* ```
			* username
			*   ✖ Expected number, received string at "username
			* favoriteNumbers[0]
			*   ✖ Invalid input: expected number
			* ```
			*/
			function toDotPath(_path) {
				const segs = [];
				const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
				for (const seg of path) if (typeof seg === "number") segs.push(`[${seg}]`);
				else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`);
				else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`);
				else {
					if (segs.length) segs.push(".");
					segs.push(seg);
				}
				return segs.join("");
			}
			function prettifyError(error) {
				const lines = [];
				const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
				for (const issue of issues) {
					lines.push(`✖ ${issue.message}`);
					if (issue.path?.length) lines.push(`  → at ${toDotPath(issue.path)}`);
				}
				return lines.join("\n");
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/parse.cjs
		var require_parse$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.safeDecodeAsync = exports._safeDecodeAsync = exports.safeEncodeAsync = exports._safeEncodeAsync = exports.safeDecode = exports._safeDecode = exports.safeEncode = exports._safeEncode = exports.decodeAsync = exports._decodeAsync = exports.encodeAsync = exports._encodeAsync = exports.decode = exports._decode = exports.encode = exports._encode = exports.safeParseAsync = exports._safeParseAsync = exports.safeParse = exports._safeParse = exports.parseAsync = exports._parseAsync = exports.parse = exports._parse = void 0;
			const core = __importStar(require_core$1());
			const errors = __importStar(require_errors$1());
			const util = __importStar(require_util());
			const _parse = (_Err) => (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: false
				} : { async: false };
				const result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) throw new core.$ZodAsyncError();
				if (result.issues.length) {
					const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
					util.captureStackTrace(e, _params?.callee);
					throw e;
				}
				return result.value;
			};
			exports._parse = _parse;
			exports.parse = (0, exports._parse)(errors.$ZodRealError);
			const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: true
				} : { async: true };
				let result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) result = await result;
				if (result.issues.length) {
					const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
					util.captureStackTrace(e, params?.callee);
					throw e;
				}
				return result.value;
			};
			exports._parseAsync = _parseAsync;
			exports.parseAsync = (0, exports._parseAsync)(errors.$ZodRealError);
			const _safeParse = (_Err) => (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					async: false
				} : { async: false };
				const result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) throw new core.$ZodAsyncError();
				return result.issues.length ? {
					success: false,
					error: new (_Err ?? errors.$ZodError)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
				} : {
					success: true,
					data: result.value
				};
			};
			exports._safeParse = _safeParse;
			exports.safeParse = (0, exports._safeParse)(errors.$ZodRealError);
			const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					async: true
				} : { async: true };
				let result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) result = await result;
				return result.issues.length ? {
					success: false,
					error: new _Err(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
				} : {
					success: true,
					data: result.value
				};
			};
			exports._safeParseAsync = _safeParseAsync;
			exports.safeParseAsync = (0, exports._safeParseAsync)(errors.$ZodRealError);
			const _encode = (_Err) => (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return (0, exports._parse)(_Err)(schema, value, ctx);
			};
			exports._encode = _encode;
			exports.encode = (0, exports._encode)(errors.$ZodRealError);
			const _decode = (_Err) => (schema, value, _ctx) => {
				return (0, exports._parse)(_Err)(schema, value, _ctx);
			};
			exports._decode = _decode;
			exports.decode = (0, exports._decode)(errors.$ZodRealError);
			const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return (0, exports._parseAsync)(_Err)(schema, value, ctx);
			};
			exports._encodeAsync = _encodeAsync;
			exports.encodeAsync = (0, exports._encodeAsync)(errors.$ZodRealError);
			const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
				return (0, exports._parseAsync)(_Err)(schema, value, _ctx);
			};
			exports._decodeAsync = _decodeAsync;
			exports.decodeAsync = (0, exports._decodeAsync)(errors.$ZodRealError);
			const _safeEncode = (_Err) => (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return (0, exports._safeParse)(_Err)(schema, value, ctx);
			};
			exports._safeEncode = _safeEncode;
			exports.safeEncode = (0, exports._safeEncode)(errors.$ZodRealError);
			const _safeDecode = (_Err) => (schema, value, _ctx) => {
				return (0, exports._safeParse)(_Err)(schema, value, _ctx);
			};
			exports._safeDecode = _safeDecode;
			exports.safeDecode = (0, exports._safeDecode)(errors.$ZodRealError);
			const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return (0, exports._safeParseAsync)(_Err)(schema, value, ctx);
			};
			exports._safeEncodeAsync = _safeEncodeAsync;
			exports.safeEncodeAsync = (0, exports._safeEncodeAsync)(errors.$ZodRealError);
			const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
				return (0, exports._safeParseAsync)(_Err)(schema, value, _ctx);
			};
			exports._safeDecodeAsync = _safeDecodeAsync;
			exports.safeDecodeAsync = (0, exports._safeDecodeAsync)(errors.$ZodRealError);
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/regexes.cjs
		var require_regexes = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.sha256_base64url = exports.sha256_base64 = exports.sha256_hex = exports.sha1_base64url = exports.sha1_base64 = exports.sha1_hex = exports.md5_base64url = exports.md5_base64 = exports.md5_hex = exports.hex = exports.uppercase = exports.lowercase = exports.undefined = exports.null = exports.boolean = exports.number = exports.integer = exports.bigint = exports.string = exports.date = exports.e164 = exports.httpProtocol = exports.domain = exports.hostname = exports.base64url = exports.base64 = exports.cidrv6 = exports.cidrv4 = exports.mac = exports.ipv6 = exports.ipv4 = exports.browserEmail = exports.idnEmail = exports.unicodeEmail = exports.rfc5322Email = exports.html5Email = exports.email = exports.uuid7 = exports.uuid6 = exports.uuid4 = exports.uuid = exports.guid = exports.extendedDuration = exports.duration = exports.nanoid = exports.ksuid = exports.xid = exports.ulid = exports.cuid2 = exports.cuid = void 0;
			exports.sha512_base64url = exports.sha512_base64 = exports.sha512_hex = exports.sha384_base64url = exports.sha384_base64 = exports.sha384_hex = void 0;
			exports.emoji = emoji;
			exports.time = time;
			exports.datetime = datetime;
			const util = __importStar(require_util());
			/**
			* @deprecated CUID v1 is deprecated by its authors due to information leakage
			* (timestamps embedded in the id). Use {@link cuid2} instead.
			* See https://github.com/paralleldrive/cuid.
			*/
			exports.cuid = /^[cC][0-9a-z]{6,}$/;
			exports.cuid2 = /^[0-9a-z]+$/;
			exports.ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
			exports.xid = /^[0-9a-vA-V]{20}$/;
			exports.ksuid = /^[A-Za-z0-9]{27}$/;
			exports.nanoid = /^[a-zA-Z0-9_-]{21}$/;
			/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
			exports.duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
			/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
			exports.extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
			/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
			exports.guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
			/** Returns a regex for validating an RFC 9562/4122 UUID.
			*
			* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
			const uuid = (version) => {
				if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
				return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
			};
			exports.uuid = uuid;
			exports.uuid4 = (0, exports.uuid)(4);
			exports.uuid6 = (0, exports.uuid)(6);
			exports.uuid7 = (0, exports.uuid)(7);
			/** Practical email validation */
			exports.email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
			/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
			exports.html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			/** The classic emailregex.com regex for RFC 5322-compliant emails */
			exports.rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
			exports.unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
			exports.idnEmail = exports.unicodeEmail;
			exports.browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			const _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
			function emoji() {
				return new RegExp(_emoji, "u");
			}
			exports.ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
			exports.ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
			const mac = (delimiter) => {
				const escapedDelim = util.escapeRegex(delimiter ?? ":");
				return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
			};
			exports.mac = mac;
			exports.cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
			exports.cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
			exports.base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
			exports.base64url = /^[A-Za-z0-9_-]*$/;
			exports.hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
			exports.domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
			exports.httpProtocol = /^https?$/;
			exports.e164 = /^\+[1-9]\d{6,14}$/;
			const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
			exports.date = new RegExp(`^${dateSource}$`);
			function timeSource(args) {
				const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
				return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
			}
			function time(args) {
				return new RegExp(`^${timeSource(args)}$`);
			}
			function datetime(args) {
				const time = timeSource({ precision: args.precision });
				const opts = ["Z"];
				if (args.local) opts.push("");
				if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
				const timeRegex = `${time}(?:${opts.join("|")})`;
				return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
			}
			const string = (params) => {
				const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
				return new RegExp(`^${regex}$`);
			};
			exports.string = string;
			exports.bigint = /^-?\d+n?$/;
			exports.integer = /^-?\d+$/;
			exports.number = /^-?\d+(?:\.\d+)?$/;
			exports.boolean = /^(?:true|false)$/i;
			exports.null = /^null$/i;
			exports.undefined = /^undefined$/i;
			exports.lowercase = /^[^A-Z]*$/;
			exports.uppercase = /^[^a-z]*$/;
			exports.hex = /^[0-9a-fA-F]*$/;
			function fixedBase64(bodyLength, padding) {
				return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
			}
			function fixedBase64url(length) {
				return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
			}
			exports.md5_hex = /^[0-9a-fA-F]{32}$/;
			exports.md5_base64 = fixedBase64(22, "==");
			exports.md5_base64url = fixedBase64url(22);
			exports.sha1_hex = /^[0-9a-fA-F]{40}$/;
			exports.sha1_base64 = fixedBase64(27, "=");
			exports.sha1_base64url = fixedBase64url(27);
			exports.sha256_hex = /^[0-9a-fA-F]{64}$/;
			exports.sha256_base64 = fixedBase64(43, "=");
			exports.sha256_base64url = fixedBase64url(43);
			exports.sha384_hex = /^[0-9a-fA-F]{96}$/;
			exports.sha384_base64 = fixedBase64(64, "");
			exports.sha384_base64url = fixedBase64url(64);
			exports.sha512_hex = /^[0-9a-fA-F]{128}$/;
			exports.sha512_base64 = fixedBase64(86, "==");
			exports.sha512_base64url = fixedBase64url(86);
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/checks.cjs
		var require_checks$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.$ZodCheckOverwrite = exports.$ZodCheckMimeType = exports.$ZodCheckProperty = exports.$ZodCheckEndsWith = exports.$ZodCheckStartsWith = exports.$ZodCheckIncludes = exports.$ZodCheckUpperCase = exports.$ZodCheckLowerCase = exports.$ZodCheckRegex = exports.$ZodCheckStringFormat = exports.$ZodCheckLengthEquals = exports.$ZodCheckMinLength = exports.$ZodCheckMaxLength = exports.$ZodCheckSizeEquals = exports.$ZodCheckMinSize = exports.$ZodCheckMaxSize = exports.$ZodCheckBigIntFormat = exports.$ZodCheckNumberFormat = exports.$ZodCheckMultipleOf = exports.$ZodCheckGreaterThan = exports.$ZodCheckLessThan = exports.$ZodCheck = void 0;
			const core = __importStar(require_core$1());
			const regexes = __importStar(require_regexes());
			const util = __importStar(require_util());
			exports.$ZodCheck = core.$constructor("$ZodCheck", (inst, def) => {
				var _a;
				inst._zod ?? (inst._zod = {});
				inst._zod.def = def;
				(_a = inst._zod).onattach ?? (_a.onattach = []);
			});
			const numericOriginMap = {
				number: "number",
				bigint: "bigint",
				object: "date"
			};
			exports.$ZodCheckLessThan = core.$constructor("$ZodCheckLessThan", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const origin = numericOriginMap[typeof def.value];
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
					if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
					else bag.exclusiveMaximum = def.value;
				});
				inst._zod.check = (payload) => {
					if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
					payload.issues.push({
						origin,
						code: "too_big",
						maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
						input: payload.value,
						inclusive: def.inclusive,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckGreaterThan = core.$constructor("$ZodCheckGreaterThan", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const origin = numericOriginMap[typeof def.value];
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
					if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
					else bag.exclusiveMinimum = def.value;
				});
				inst._zod.check = (payload) => {
					if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
					payload.issues.push({
						origin,
						code: "too_small",
						minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
						input: payload.value,
						inclusive: def.inclusive,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckMultipleOf = /*@__PURE__*/ core.$constructor("$ZodCheckMultipleOf", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				inst._zod.onattach.push((inst) => {
					var _a;
					(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
				});
				inst._zod.check = (payload) => {
					if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
					if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : util.floatSafeRemainder(payload.value, def.value) === 0) return;
					payload.issues.push({
						origin: typeof payload.value,
						code: "not_multiple_of",
						divisor: def.value,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckNumberFormat = core.$constructor("$ZodCheckNumberFormat", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				def.format = def.format || "float64";
				const isInt = def.format?.includes("int");
				const origin = isInt ? "int" : "number";
				const [minimum, maximum] = util.NUMBER_FORMAT_RANGES[def.format];
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.format = def.format;
					bag.minimum = minimum;
					bag.maximum = maximum;
					if (isInt) bag.pattern = regexes.integer;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (isInt) {
						if (!Number.isInteger(input)) {
							payload.issues.push({
								expected: origin,
								format: def.format,
								code: "invalid_type",
								continue: false,
								input,
								inst
							});
							return;
						}
						if (!Number.isSafeInteger(input)) {
							if (input > 0) payload.issues.push({
								input,
								code: "too_big",
								maximum: Number.MAX_SAFE_INTEGER,
								note: "Integers must be within the safe integer range.",
								inst,
								origin,
								inclusive: true,
								continue: !def.abort
							});
							else payload.issues.push({
								input,
								code: "too_small",
								minimum: Number.MIN_SAFE_INTEGER,
								note: "Integers must be within the safe integer range.",
								inst,
								origin,
								inclusive: true,
								continue: !def.abort
							});
							return;
						}
					}
					if (input < minimum) payload.issues.push({
						origin: "number",
						input,
						code: "too_small",
						minimum,
						inclusive: true,
						inst,
						continue: !def.abort
					});
					if (input > maximum) payload.issues.push({
						origin: "number",
						input,
						code: "too_big",
						maximum,
						inclusive: true,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckBigIntFormat = core.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const [minimum, maximum] = util.BIGINT_FORMAT_RANGES[def.format];
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.format = def.format;
					bag.minimum = minimum;
					bag.maximum = maximum;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (input < minimum) payload.issues.push({
						origin: "bigint",
						input,
						code: "too_small",
						minimum,
						inclusive: true,
						inst,
						continue: !def.abort
					});
					if (input > maximum) payload.issues.push({
						origin: "bigint",
						input,
						code: "too_big",
						maximum,
						inclusive: true,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckMaxSize = core.$constructor("$ZodCheckMaxSize", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.size !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
					if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (input.size <= def.maximum) return;
					payload.issues.push({
						origin: util.getSizableOrigin(input),
						code: "too_big",
						maximum: def.maximum,
						inclusive: true,
						input,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckMinSize = core.$constructor("$ZodCheckMinSize", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.size !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
					if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (input.size >= def.minimum) return;
					payload.issues.push({
						origin: util.getSizableOrigin(input),
						code: "too_small",
						minimum: def.minimum,
						inclusive: true,
						input,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckSizeEquals = core.$constructor("$ZodCheckSizeEquals", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.size !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.minimum = def.size;
					bag.maximum = def.size;
					bag.size = def.size;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					const size = input.size;
					if (size === def.size) return;
					const tooBig = size > def.size;
					payload.issues.push({
						origin: util.getSizableOrigin(input),
						...tooBig ? {
							code: "too_big",
							maximum: def.size
						} : {
							code: "too_small",
							minimum: def.size
						},
						inclusive: true,
						exact: true,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckMaxLength = core.$constructor("$ZodCheckMaxLength", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.length !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
					if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (input.length <= def.maximum) return;
					const origin = util.getLengthableOrigin(input);
					payload.issues.push({
						origin,
						code: "too_big",
						maximum: def.maximum,
						inclusive: true,
						input,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckMinLength = core.$constructor("$ZodCheckMinLength", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.length !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
					if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					if (input.length >= def.minimum) return;
					const origin = util.getLengthableOrigin(input);
					payload.issues.push({
						origin,
						code: "too_small",
						minimum: def.minimum,
						inclusive: true,
						input,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckLengthEquals = core.$constructor("$ZodCheckLengthEquals", (inst, def) => {
				var _a;
				exports.$ZodCheck.init(inst, def);
				(_a = inst._zod.def).when ?? (_a.when = (payload) => {
					const val = payload.value;
					return !util.nullish(val) && val.length !== void 0;
				});
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.minimum = def.length;
					bag.maximum = def.length;
					bag.length = def.length;
				});
				inst._zod.check = (payload) => {
					const input = payload.value;
					const length = input.length;
					if (length === def.length) return;
					const origin = util.getLengthableOrigin(input);
					const tooBig = length > def.length;
					payload.issues.push({
						origin,
						...tooBig ? {
							code: "too_big",
							maximum: def.length
						} : {
							code: "too_small",
							minimum: def.length
						},
						inclusive: true,
						exact: true,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckStringFormat = core.$constructor("$ZodCheckStringFormat", (inst, def) => {
				var _a, _b;
				exports.$ZodCheck.init(inst, def);
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.format = def.format;
					if (def.pattern) {
						bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
						bag.patterns.add(def.pattern);
					}
				});
				if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
					def.pattern.lastIndex = 0;
					if (def.pattern.test(payload.value)) return;
					payload.issues.push({
						origin: "string",
						code: "invalid_format",
						format: def.format,
						input: payload.value,
						...def.pattern ? { pattern: def.pattern.toString() } : {},
						inst,
						continue: !def.abort
					});
				});
				else (_b = inst._zod).check ?? (_b.check = () => {});
			});
			exports.$ZodCheckRegex = core.$constructor("$ZodCheckRegex", (inst, def) => {
				exports.$ZodCheckStringFormat.init(inst, def);
				inst._zod.check = (payload) => {
					def.pattern.lastIndex = 0;
					if (def.pattern.test(payload.value)) return;
					payload.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "regex",
						input: payload.value,
						pattern: def.pattern.toString(),
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckLowerCase = core.$constructor("$ZodCheckLowerCase", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.lowercase);
				exports.$ZodCheckStringFormat.init(inst, def);
			});
			exports.$ZodCheckUpperCase = core.$constructor("$ZodCheckUpperCase", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.uppercase);
				exports.$ZodCheckStringFormat.init(inst, def);
			});
			exports.$ZodCheckIncludes = core.$constructor("$ZodCheckIncludes", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const escapedRegex = util.escapeRegex(def.includes);
				const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
				def.pattern = pattern;
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(pattern);
				});
				inst._zod.check = (payload) => {
					if (payload.value.includes(def.includes, def.position)) return;
					payload.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: def.includes,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckStartsWith = core.$constructor("$ZodCheckStartsWith", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const pattern = new RegExp(`^${util.escapeRegex(def.prefix)}.*`);
				def.pattern ?? (def.pattern = pattern);
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(pattern);
				});
				inst._zod.check = (payload) => {
					if (payload.value.startsWith(def.prefix)) return;
					payload.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "starts_with",
						prefix: def.prefix,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckEndsWith = core.$constructor("$ZodCheckEndsWith", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const pattern = new RegExp(`.*${util.escapeRegex(def.suffix)}$`);
				def.pattern ?? (def.pattern = pattern);
				inst._zod.onattach.push((inst) => {
					const bag = inst._zod.bag;
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(pattern);
				});
				inst._zod.check = (payload) => {
					if (payload.value.endsWith(def.suffix)) return;
					payload.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "ends_with",
						suffix: def.suffix,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			function handleCheckPropertyResult(result, payload, property) {
				if (result.issues.length) payload.issues.push(...util.prefixIssues(property, result.issues));
			}
			exports.$ZodCheckProperty = core.$constructor("$ZodCheckProperty", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				inst._zod.check = (payload) => {
					const result = def.schema._zod.run({
						value: payload.value[def.property],
						issues: []
					}, {});
					if (result instanceof Promise) return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
					handleCheckPropertyResult(result, payload, def.property);
				};
			});
			exports.$ZodCheckMimeType = core.$constructor("$ZodCheckMimeType", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				const mimeSet = new Set(def.mime);
				inst._zod.onattach.push((inst) => {
					inst._zod.bag.mime = def.mime;
				});
				inst._zod.check = (payload) => {
					if (mimeSet.has(payload.value.type)) return;
					payload.issues.push({
						code: "invalid_value",
						values: def.mime,
						input: payload.value.type,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCheckOverwrite = core.$constructor("$ZodCheckOverwrite", (inst, def) => {
				exports.$ZodCheck.init(inst, def);
				inst._zod.check = (payload) => {
					payload.value = def.tx(payload.value);
				};
			});
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/doc.cjs
		var require_doc = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.Doc = void 0;
			var Doc = class {
				constructor(args = []) {
					this.content = [];
					this.indent = 0;
					if (this) this.args = args;
				}
				indented(fn) {
					this.indent += 1;
					fn(this);
					this.indent -= 1;
				}
				write(arg) {
					if (typeof arg === "function") {
						arg(this, { execution: "sync" });
						arg(this, { execution: "async" });
						return;
					}
					const lines = arg.split("\n").filter((x) => x);
					const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
					const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
					for (const line of dedented) this.content.push(line);
				}
				compile() {
					const F = Function;
					const args = this?.args;
					const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
					return new F(...args, lines.join("\n"));
				}
			};
			exports.Doc = Doc;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/versions.cjs
		var require_versions = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.version = void 0;
			exports.version = {
				major: 4,
				minor: 4,
				patch: 3
			};
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/schemas.cjs
		var require_schemas$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.$ZodTuple = exports.$ZodIntersection = exports.$ZodDiscriminatedUnion = exports.$ZodXor = exports.$ZodUnion = exports.$ZodObjectJIT = exports.$ZodObject = exports.$ZodArray = exports.$ZodDate = exports.$ZodVoid = exports.$ZodNever = exports.$ZodUnknown = exports.$ZodAny = exports.$ZodNull = exports.$ZodUndefined = exports.$ZodSymbol = exports.$ZodBigIntFormat = exports.$ZodBigInt = exports.$ZodBoolean = exports.$ZodNumberFormat = exports.$ZodNumber = exports.$ZodCustomStringFormat = exports.$ZodJWT = exports.$ZodE164 = exports.$ZodBase64URL = exports.$ZodBase64 = exports.$ZodCIDRv6 = exports.$ZodCIDRv4 = exports.$ZodMAC = exports.$ZodIPv6 = exports.$ZodIPv4 = exports.$ZodISODuration = exports.$ZodISOTime = exports.$ZodISODate = exports.$ZodISODateTime = exports.$ZodKSUID = exports.$ZodXID = exports.$ZodULID = exports.$ZodCUID2 = exports.$ZodCUID = exports.$ZodNanoID = exports.$ZodEmoji = exports.$ZodURL = exports.$ZodEmail = exports.$ZodUUID = exports.$ZodGUID = exports.$ZodStringFormat = exports.$ZodString = exports.clone = exports.$ZodType = void 0;
			exports.$ZodCustom = exports.$ZodLazy = exports.$ZodPromise = exports.$ZodFunction = exports.$ZodTemplateLiteral = exports.$ZodReadonly = exports.$ZodPreprocess = exports.$ZodCodec = exports.$ZodPipe = exports.$ZodNaN = exports.$ZodCatch = exports.$ZodSuccess = exports.$ZodNonOptional = exports.$ZodPrefault = exports.$ZodDefault = exports.$ZodNullable = exports.$ZodExactOptional = exports.$ZodOptional = exports.$ZodTransform = exports.$ZodFile = exports.$ZodLiteral = exports.$ZodEnum = exports.$ZodSet = exports.$ZodMap = exports.$ZodRecord = void 0;
			exports.isValidBase64 = isValidBase64;
			exports.isValidBase64URL = isValidBase64URL;
			exports.isValidJWT = isValidJWT;
			const checks = __importStar(require_checks$1());
			const core = __importStar(require_core$1());
			const doc_js_1 = require_doc();
			const parse_js_1 = require_parse$1();
			const regexes = __importStar(require_regexes());
			const util = __importStar(require_util());
			const versions_js_1 = require_versions();
			exports.$ZodType = core.$constructor("$ZodType", (inst, def) => {
				var _a;
				inst ?? (inst = {});
				inst._zod.def = def;
				inst._zod.bag = inst._zod.bag || {};
				inst._zod.version = versions_js_1.version;
				const checks = [...inst._zod.def.checks ?? []];
				if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
				for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
				if (checks.length === 0) {
					(_a = inst._zod).deferred ?? (_a.deferred = []);
					inst._zod.deferred?.push(() => {
						inst._zod.run = inst._zod.parse;
					});
				} else {
					const runChecks = (payload, checks, ctx) => {
						let isAborted = util.aborted(payload);
						let asyncResult;
						for (const ch of checks) {
							if (ch._zod.def.when) {
								if (util.explicitlyAborted(payload)) continue;
								if (!ch._zod.def.when(payload)) continue;
							} else if (isAborted) continue;
							const currLen = payload.issues.length;
							const _ = ch._zod.check(payload);
							if (_ instanceof Promise && ctx?.async === false) throw new core.$ZodAsyncError();
							if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
								await _;
								if (payload.issues.length === currLen) return;
								if (!isAborted) isAborted = util.aborted(payload, currLen);
							});
							else {
								if (payload.issues.length === currLen) continue;
								if (!isAborted) isAborted = util.aborted(payload, currLen);
							}
						}
						if (asyncResult) return asyncResult.then(() => {
							return payload;
						});
						return payload;
					};
					const handleCanaryResult = (canary, payload, ctx) => {
						if (util.aborted(canary)) {
							canary.aborted = true;
							return canary;
						}
						const checkResult = runChecks(payload, checks, ctx);
						if (checkResult instanceof Promise) {
							if (ctx.async === false) throw new core.$ZodAsyncError();
							return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
						}
						return inst._zod.parse(checkResult, ctx);
					};
					inst._zod.run = (payload, ctx) => {
						if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
						if (ctx.direction === "backward") {
							const canary = inst._zod.parse({
								value: payload.value,
								issues: []
							}, {
								...ctx,
								skipChecks: true
							});
							if (canary instanceof Promise) return canary.then((canary) => {
								return handleCanaryResult(canary, payload, ctx);
							});
							return handleCanaryResult(canary, payload, ctx);
						}
						const result = inst._zod.parse(payload, ctx);
						if (result instanceof Promise) {
							if (ctx.async === false) throw new core.$ZodAsyncError();
							return result.then((result) => runChecks(result, checks, ctx));
						}
						return runChecks(result, checks, ctx);
					};
				}
				util.defineLazy(inst, "~standard", () => ({
					validate: (value) => {
						try {
							const r = (0, parse_js_1.safeParse)(inst, value);
							return r.success ? { value: r.data } : { issues: r.error?.issues };
						} catch (_) {
							return (0, parse_js_1.safeParseAsync)(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
						}
					},
					vendor: "zod",
					version: 1
				}));
			});
			var util_js_1 = require_util();
			Object.defineProperty(exports, "clone", {
				enumerable: true,
				get: function() {
					return util_js_1.clone;
				}
			});
			exports.$ZodString = core.$constructor("$ZodString", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? regexes.string(inst._zod.bag);
				inst._zod.parse = (payload, _) => {
					if (def.coerce) try {
						payload.value = String(payload.value);
					} catch (_) {}
					if (typeof payload.value === "string") return payload;
					payload.issues.push({
						expected: "string",
						code: "invalid_type",
						input: payload.value,
						inst
					});
					return payload;
				};
			});
			exports.$ZodStringFormat = core.$constructor("$ZodStringFormat", (inst, def) => {
				checks.$ZodCheckStringFormat.init(inst, def);
				exports.$ZodString.init(inst, def);
			});
			exports.$ZodGUID = core.$constructor("$ZodGUID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.guid);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodUUID = core.$constructor("$ZodUUID", (inst, def) => {
				if (def.version) {
					const v = {
						v1: 1,
						v2: 2,
						v3: 3,
						v4: 4,
						v5: 5,
						v6: 6,
						v7: 7,
						v8: 8
					}[def.version];
					if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
					def.pattern ?? (def.pattern = regexes.uuid(v));
				} else def.pattern ?? (def.pattern = regexes.uuid());
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodEmail = core.$constructor("$ZodEmail", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.email);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodURL = core.$constructor("$ZodURL", (inst, def) => {
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.check = (payload) => {
					try {
						const trimmed = payload.value.trim();
						if (!def.normalize && def.protocol?.source === regexes.httpProtocol.source) {
							if (!/^https?:\/\//i.test(trimmed)) {
								payload.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid URL format",
									input: payload.value,
									inst,
									continue: !def.abort
								});
								return;
							}
						}
						const url = new URL(trimmed);
						if (def.hostname) {
							def.hostname.lastIndex = 0;
							if (!def.hostname.test(url.hostname)) payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid hostname",
								pattern: def.hostname.source,
								input: payload.value,
								inst,
								continue: !def.abort
							});
						}
						if (def.protocol) {
							def.protocol.lastIndex = 0;
							if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid protocol",
								pattern: def.protocol.source,
								input: payload.value,
								inst,
								continue: !def.abort
							});
						}
						if (def.normalize) payload.value = url.href;
						else payload.value = trimmed;
						return;
					} catch (_) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
				};
			});
			exports.$ZodEmoji = core.$constructor("$ZodEmoji", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.emoji());
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodNanoID = core.$constructor("$ZodNanoID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.nanoid);
				exports.$ZodStringFormat.init(inst, def);
			});
			/**
			* @deprecated CUID v1 is deprecated by its authors due to information leakage
			* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
			* See https://github.com/paralleldrive/cuid.
			*/
			exports.$ZodCUID = core.$constructor("$ZodCUID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.cuid);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodCUID2 = core.$constructor("$ZodCUID2", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.cuid2);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodULID = core.$constructor("$ZodULID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.ulid);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodXID = core.$constructor("$ZodXID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.xid);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodKSUID = core.$constructor("$ZodKSUID", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.ksuid);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodISODateTime = core.$constructor("$ZodISODateTime", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.datetime(def));
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodISODate = core.$constructor("$ZodISODate", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.date);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodISOTime = core.$constructor("$ZodISOTime", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.time(def));
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodISODuration = core.$constructor("$ZodISODuration", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.duration);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodIPv4 = core.$constructor("$ZodIPv4", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.ipv4);
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.bag.format = `ipv4`;
			});
			exports.$ZodIPv6 = core.$constructor("$ZodIPv6", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.ipv6);
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.bag.format = `ipv6`;
				inst._zod.check = (payload) => {
					try {
						new URL(`http://[${payload.value}]`);
					} catch {
						payload.issues.push({
							code: "invalid_format",
							format: "ipv6",
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
				};
			});
			exports.$ZodMAC = core.$constructor("$ZodMAC", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.mac(def.delimiter));
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.bag.format = `mac`;
			});
			exports.$ZodCIDRv4 = core.$constructor("$ZodCIDRv4", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.cidrv4);
				exports.$ZodStringFormat.init(inst, def);
			});
			exports.$ZodCIDRv6 = core.$constructor("$ZodCIDRv6", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.cidrv6);
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.check = (payload) => {
					const parts = payload.value.split("/");
					try {
						if (parts.length !== 2) throw new Error();
						const [address, prefix] = parts;
						if (!prefix) throw new Error();
						const prefixNum = Number(prefix);
						if (`${prefixNum}` !== prefix) throw new Error();
						if (prefixNum < 0 || prefixNum > 128) throw new Error();
						new URL(`http://[${address}]`);
					} catch {
						payload.issues.push({
							code: "invalid_format",
							format: "cidrv6",
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
				};
			});
			function isValidBase64(data) {
				if (data === "") return true;
				if (/\s/.test(data)) return false;
				if (data.length % 4 !== 0) return false;
				try {
					atob(data);
					return true;
				} catch {
					return false;
				}
			}
			exports.$ZodBase64 = core.$constructor("$ZodBase64", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.base64);
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.bag.contentEncoding = "base64";
				inst._zod.check = (payload) => {
					if (isValidBase64(payload.value)) return;
					payload.issues.push({
						code: "invalid_format",
						format: "base64",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			function isValidBase64URL(data) {
				if (!regexes.base64url.test(data)) return false;
				const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
				return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
			}
			exports.$ZodBase64URL = core.$constructor("$ZodBase64URL", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.base64url);
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.bag.contentEncoding = "base64url";
				inst._zod.check = (payload) => {
					if (isValidBase64URL(payload.value)) return;
					payload.issues.push({
						code: "invalid_format",
						format: "base64url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodE164 = core.$constructor("$ZodE164", (inst, def) => {
				def.pattern ?? (def.pattern = regexes.e164);
				exports.$ZodStringFormat.init(inst, def);
			});
			function isValidJWT(token, algorithm = null) {
				try {
					const tokensParts = token.split(".");
					if (tokensParts.length !== 3) return false;
					const [header] = tokensParts;
					if (!header) return false;
					const parsedHeader = JSON.parse(atob(header));
					if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
					if (!parsedHeader.alg) return false;
					if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
					return true;
				} catch {
					return false;
				}
			}
			exports.$ZodJWT = core.$constructor("$ZodJWT", (inst, def) => {
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.check = (payload) => {
					if (isValidJWT(payload.value, def.alg)) return;
					payload.issues.push({
						code: "invalid_format",
						format: "jwt",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodCustomStringFormat = core.$constructor("$ZodCustomStringFormat", (inst, def) => {
				exports.$ZodStringFormat.init(inst, def);
				inst._zod.check = (payload) => {
					if (def.fn(payload.value)) return;
					payload.issues.push({
						code: "invalid_format",
						format: def.format,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				};
			});
			exports.$ZodNumber = core.$constructor("$ZodNumber", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = inst._zod.bag.pattern ?? regexes.number;
				inst._zod.parse = (payload, _ctx) => {
					if (def.coerce) try {
						payload.value = Number(payload.value);
					} catch (_) {}
					const input = payload.value;
					if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
					const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
					payload.issues.push({
						expected: "number",
						code: "invalid_type",
						input,
						inst,
						...received ? { received } : {}
					});
					return payload;
				};
			});
			exports.$ZodNumberFormat = core.$constructor("$ZodNumberFormat", (inst, def) => {
				checks.$ZodCheckNumberFormat.init(inst, def);
				exports.$ZodNumber.init(inst, def);
			});
			exports.$ZodBoolean = core.$constructor("$ZodBoolean", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = regexes.boolean;
				inst._zod.parse = (payload, _ctx) => {
					if (def.coerce) try {
						payload.value = Boolean(payload.value);
					} catch (_) {}
					const input = payload.value;
					if (typeof input === "boolean") return payload;
					payload.issues.push({
						expected: "boolean",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodBigInt = core.$constructor("$ZodBigInt", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = regexes.bigint;
				inst._zod.parse = (payload, _ctx) => {
					if (def.coerce) try {
						payload.value = BigInt(payload.value);
					} catch (_) {}
					if (typeof payload.value === "bigint") return payload;
					payload.issues.push({
						expected: "bigint",
						code: "invalid_type",
						input: payload.value,
						inst
					});
					return payload;
				};
			});
			exports.$ZodBigIntFormat = core.$constructor("$ZodBigIntFormat", (inst, def) => {
				checks.$ZodCheckBigIntFormat.init(inst, def);
				exports.$ZodBigInt.init(inst, def);
			});
			exports.$ZodSymbol = core.$constructor("$ZodSymbol", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (typeof input === "symbol") return payload;
					payload.issues.push({
						expected: "symbol",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodUndefined = core.$constructor("$ZodUndefined", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = regexes.undefined;
				inst._zod.values = /* @__PURE__ */ new Set([void 0]);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (typeof input === "undefined") return payload;
					payload.issues.push({
						expected: "undefined",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodNull = core.$constructor("$ZodNull", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.pattern = regexes.null;
				inst._zod.values = /* @__PURE__ */ new Set([null]);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (input === null) return payload;
					payload.issues.push({
						expected: "null",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodAny = core.$constructor("$ZodAny", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload) => payload;
			});
			exports.$ZodUnknown = core.$constructor("$ZodUnknown", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload) => payload;
			});
			exports.$ZodNever = core.$constructor("$ZodNever", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					payload.issues.push({
						expected: "never",
						code: "invalid_type",
						input: payload.value,
						inst
					});
					return payload;
				};
			});
			exports.$ZodVoid = core.$constructor("$ZodVoid", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (typeof input === "undefined") return payload;
					payload.issues.push({
						expected: "void",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodDate = core.$constructor("$ZodDate", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					if (def.coerce) try {
						payload.value = new Date(payload.value);
					} catch (_err) {}
					const input = payload.value;
					const isDate = input instanceof Date;
					if (isDate && !Number.isNaN(input.getTime())) return payload;
					payload.issues.push({
						expected: "date",
						code: "invalid_type",
						input,
						...isDate ? { received: "Invalid Date" } : {},
						inst
					});
					return payload;
				};
			});
			function handleArrayResult(result, final, index) {
				if (result.issues.length) final.issues.push(...util.prefixIssues(index, result.issues));
				final.value[index] = result.value;
			}
			exports.$ZodArray = core.$constructor("$ZodArray", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!Array.isArray(input)) {
						payload.issues.push({
							expected: "array",
							code: "invalid_type",
							input,
							inst
						});
						return payload;
					}
					payload.value = Array(input.length);
					const proms = [];
					for (let i = 0; i < input.length; i++) {
						const item = input[i];
						const result = def.element._zod.run({
							value: item,
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
						else handleArrayResult(result, payload, i);
					}
					if (proms.length) return Promise.all(proms).then(() => payload);
					return payload;
				};
			});
			function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
				const isPresent = key in input;
				if (result.issues.length) {
					if (isOptionalIn && isOptionalOut && !isPresent) return;
					final.issues.push(...util.prefixIssues(key, result.issues));
				}
				if (!isPresent && !isOptionalIn) {
					if (!result.issues.length) final.issues.push({
						code: "invalid_type",
						expected: "nonoptional",
						input: void 0,
						path: [key]
					});
					return;
				}
				if (result.value === void 0) {
					if (isPresent) final.value[key] = void 0;
				} else final.value[key] = result.value;
			}
			function normalizeDef(def) {
				const keys = Object.keys(def.shape);
				for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
				const okeys = util.optionalKeys(def.shape);
				return {
					...def,
					keys,
					keySet: new Set(keys),
					numKeys: keys.length,
					optionalKeys: new Set(okeys)
				};
			}
			function handleCatchall(proms, input, payload, ctx, def, inst) {
				const unrecognized = [];
				const keySet = def.keySet;
				const _catchall = def.catchall._zod;
				const t = _catchall.def.type;
				const isOptionalIn = _catchall.optin === "optional";
				const isOptionalOut = _catchall.optout === "optional";
				for (const key in input) {
					if (key === "__proto__") continue;
					if (keySet.has(key)) continue;
					if (t === "never") {
						unrecognized.push(key);
						continue;
					}
					const r = _catchall.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (unrecognized.length) payload.issues.push({
					code: "unrecognized_keys",
					keys: unrecognized,
					input,
					inst
				});
				if (!proms.length) return payload;
				return Promise.all(proms).then(() => {
					return payload;
				});
			}
			exports.$ZodObject = core.$constructor("$ZodObject", (inst, def) => {
				exports.$ZodType.init(inst, def);
				if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
					const sh = def.shape;
					Object.defineProperty(def, "shape", { get: () => {
						const newSh = { ...sh };
						Object.defineProperty(def, "shape", { value: newSh });
						return newSh;
					} });
				}
				const _normalized = util.cached(() => normalizeDef(def));
				util.defineLazy(inst._zod, "propValues", () => {
					const shape = def.shape;
					const propValues = {};
					for (const key in shape) {
						const field = shape[key]._zod;
						if (field.values) {
							propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
							for (const v of field.values) propValues[key].add(v);
						}
					}
					return propValues;
				});
				const isObject = util.isObject;
				const catchall = def.catchall;
				let value;
				inst._zod.parse = (payload, ctx) => {
					value ?? (value = _normalized.value);
					const input = payload.value;
					if (!isObject(input)) {
						payload.issues.push({
							expected: "object",
							code: "invalid_type",
							input,
							inst
						});
						return payload;
					}
					payload.value = {};
					const proms = [];
					const shape = value.shape;
					for (const key of value.keys) {
						const el = shape[key];
						const isOptionalIn = el._zod.optin === "optional";
						const isOptionalOut = el._zod.optout === "optional";
						const r = el._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
						else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
					}
					if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
					return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
				};
			});
			exports.$ZodObjectJIT = core.$constructor("$ZodObjectJIT", (inst, def) => {
				exports.$ZodObject.init(inst, def);
				const superParse = inst._zod.parse;
				const _normalized = util.cached(() => normalizeDef(def));
				const generateFastpass = (shape) => {
					const doc = new doc_js_1.Doc([
						"shape",
						"payload",
						"ctx"
					]);
					const normalized = _normalized.value;
					const parseStr = (key) => {
						const k = util.esc(key);
						return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
					};
					doc.write(`const input = payload.value;`);
					const ids = Object.create(null);
					let counter = 0;
					for (const key of normalized.keys) ids[key] = `key_${counter++}`;
					doc.write(`const newResult = {};`);
					for (const key of normalized.keys) {
						const id = ids[key];
						const k = util.esc(key);
						const schema = shape[key];
						const isOptionalIn = schema?._zod?.optin === "optional";
						const isOptionalOut = schema?._zod?.optout === "optional";
						doc.write(`const ${id} = ${parseStr(key)};`);
						if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
						else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
						else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
					}
					doc.write(`payload.value = newResult;`);
					doc.write(`return payload;`);
					const fn = doc.compile();
					return (payload, ctx) => fn(shape, payload, ctx);
				};
				let fastpass;
				const isObject = util.isObject;
				const jit = !core.globalConfig.jitless;
				const allowsEval = util.allowsEval;
				const fastEnabled = jit && allowsEval.value;
				const catchall = def.catchall;
				let value;
				inst._zod.parse = (payload, ctx) => {
					value ?? (value = _normalized.value);
					const input = payload.value;
					if (!isObject(input)) {
						payload.issues.push({
							expected: "object",
							code: "invalid_type",
							input,
							inst
						});
						return payload;
					}
					if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
						if (!fastpass) fastpass = generateFastpass(def.shape);
						payload = fastpass(payload, ctx);
						if (!catchall) return payload;
						return handleCatchall([], input, payload, ctx, value, inst);
					}
					return superParse(payload, ctx);
				};
			});
			function handleUnionResults(results, final, inst, ctx) {
				for (const result of results) if (result.issues.length === 0) {
					final.value = result.value;
					return final;
				}
				const nonaborted = results.filter((r) => !util.aborted(r));
				if (nonaborted.length === 1) {
					final.value = nonaborted[0].value;
					return nonaborted[0];
				}
				final.issues.push({
					code: "invalid_union",
					input: final.value,
					inst,
					errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
				});
				return final;
			}
			exports.$ZodUnion = core.$constructor("$ZodUnion", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
				util.defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
				util.defineLazy(inst._zod, "values", () => {
					if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
				});
				util.defineLazy(inst._zod, "pattern", () => {
					if (def.options.every((o) => o._zod.pattern)) {
						const patterns = def.options.map((o) => o._zod.pattern);
						return new RegExp(`^(${patterns.map((p) => util.cleanRegex(p.source)).join("|")})$`);
					}
				});
				const first = def.options.length === 1 ? def.options[0]._zod.run : null;
				inst._zod.parse = (payload, ctx) => {
					if (first) return first(payload, ctx);
					let async = false;
					const results = [];
					for (const option of def.options) {
						const result = option._zod.run({
							value: payload.value,
							issues: []
						}, ctx);
						if (result instanceof Promise) {
							results.push(result);
							async = true;
						} else {
							if (result.issues.length === 0) return result;
							results.push(result);
						}
					}
					if (!async) return handleUnionResults(results, payload, inst, ctx);
					return Promise.all(results).then((results) => {
						return handleUnionResults(results, payload, inst, ctx);
					});
				};
			});
			function handleExclusiveUnionResults(results, final, inst, ctx) {
				const successes = results.filter((r) => r.issues.length === 0);
				if (successes.length === 1) {
					final.value = successes[0].value;
					return final;
				}
				if (successes.length === 0) final.issues.push({
					code: "invalid_union",
					input: final.value,
					inst,
					errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
				});
				else final.issues.push({
					code: "invalid_union",
					input: final.value,
					inst,
					errors: [],
					inclusive: false
				});
				return final;
			}
			exports.$ZodXor = core.$constructor("$ZodXor", (inst, def) => {
				exports.$ZodUnion.init(inst, def);
				def.inclusive = false;
				const first = def.options.length === 1 ? def.options[0]._zod.run : null;
				inst._zod.parse = (payload, ctx) => {
					if (first) return first(payload, ctx);
					let async = false;
					const results = [];
					for (const option of def.options) {
						const result = option._zod.run({
							value: payload.value,
							issues: []
						}, ctx);
						if (result instanceof Promise) {
							results.push(result);
							async = true;
						} else results.push(result);
					}
					if (!async) return handleExclusiveUnionResults(results, payload, inst, ctx);
					return Promise.all(results).then((results) => {
						return handleExclusiveUnionResults(results, payload, inst, ctx);
					});
				};
			});
			exports.$ZodDiscriminatedUnion = /*@__PURE__*/ core.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
				def.inclusive = false;
				exports.$ZodUnion.init(inst, def);
				const _super = inst._zod.parse;
				util.defineLazy(inst._zod, "propValues", () => {
					const propValues = {};
					for (const option of def.options) {
						const pv = option._zod.propValues;
						if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
						for (const [k, v] of Object.entries(pv)) {
							if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
							for (const val of v) propValues[k].add(val);
						}
					}
					return propValues;
				});
				const disc = util.cached(() => {
					const opts = def.options;
					const map = /* @__PURE__ */ new Map();
					for (const o of opts) {
						const values = o._zod.propValues?.[def.discriminator];
						if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
						for (const v of values) {
							if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
							map.set(v, o);
						}
					}
					return map;
				});
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!util.isObject(input)) {
						payload.issues.push({
							code: "invalid_type",
							expected: "object",
							input,
							inst
						});
						return payload;
					}
					const opt = disc.value.get(input?.[def.discriminator]);
					if (opt) return opt._zod.run(payload, ctx);
					if (def.unionFallback || ctx.direction === "backward") return _super(payload, ctx);
					payload.issues.push({
						code: "invalid_union",
						errors: [],
						note: "No matching discriminator",
						discriminator: def.discriminator,
						options: Array.from(disc.value.keys()),
						input,
						path: [def.discriminator],
						inst
					});
					return payload;
				};
			});
			exports.$ZodIntersection = core.$constructor("$ZodIntersection", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					const left = def.left._zod.run({
						value: input,
						issues: []
					}, ctx);
					const right = def.right._zod.run({
						value: input,
						issues: []
					}, ctx);
					if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
						return handleIntersectionResults(payload, left, right);
					});
					return handleIntersectionResults(payload, left, right);
				};
			});
			function mergeValues(a, b) {
				if (a === b) return {
					valid: true,
					data: a
				};
				if (a instanceof Date && b instanceof Date && +a === +b) return {
					valid: true,
					data: a
				};
				if (util.isPlainObject(a) && util.isPlainObject(b)) {
					const bKeys = Object.keys(b);
					const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
					const newObj = {
						...a,
						...b
					};
					for (const key of sharedKeys) {
						const sharedValue = mergeValues(a[key], b[key]);
						if (!sharedValue.valid) return {
							valid: false,
							mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
						};
						newObj[key] = sharedValue.data;
					}
					return {
						valid: true,
						data: newObj
					};
				}
				if (Array.isArray(a) && Array.isArray(b)) {
					if (a.length !== b.length) return {
						valid: false,
						mergeErrorPath: []
					};
					const newArray = [];
					for (let index = 0; index < a.length; index++) {
						const itemA = a[index];
						const itemB = b[index];
						const sharedValue = mergeValues(itemA, itemB);
						if (!sharedValue.valid) return {
							valid: false,
							mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
						};
						newArray.push(sharedValue.data);
					}
					return {
						valid: true,
						data: newArray
					};
				}
				return {
					valid: false,
					mergeErrorPath: []
				};
			}
			function handleIntersectionResults(result, left, right) {
				const unrecKeys = /* @__PURE__ */ new Map();
				let unrecIssue;
				for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
					unrecIssue ?? (unrecIssue = iss);
					for (const k of iss.keys) {
						if (!unrecKeys.has(k)) unrecKeys.set(k, {});
						unrecKeys.get(k).l = true;
					}
				} else result.issues.push(iss);
				for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).r = true;
				}
				else result.issues.push(iss);
				const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
				if (bothKeys.length && unrecIssue) result.issues.push({
					...unrecIssue,
					keys: bothKeys
				});
				if (util.aborted(result)) return result;
				const merged = mergeValues(left.value, right.value);
				if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
				result.value = merged.data;
				return result;
			}
			exports.$ZodTuple = core.$constructor("$ZodTuple", (inst, def) => {
				exports.$ZodType.init(inst, def);
				const items = def.items;
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!Array.isArray(input)) {
						payload.issues.push({
							input,
							inst,
							expected: "tuple",
							code: "invalid_type"
						});
						return payload;
					}
					payload.value = [];
					const proms = [];
					const optinStart = getTupleOptStart(items, "optin");
					const optoutStart = getTupleOptStart(items, "optout");
					if (!def.rest) {
						if (input.length < optinStart) {
							payload.issues.push({
								code: "too_small",
								minimum: optinStart,
								inclusive: true,
								input,
								inst,
								origin: "array"
							});
							return payload;
						}
						if (input.length > items.length) payload.issues.push({
							code: "too_big",
							maximum: items.length,
							inclusive: true,
							input,
							inst,
							origin: "array"
						});
					}
					const itemResults = new Array(items.length);
					for (let i = 0; i < items.length; i++) {
						const r = items[i]._zod.run({
							value: input[i],
							issues: []
						}, ctx);
						if (r instanceof Promise) proms.push(r.then((rr) => {
							itemResults[i] = rr;
						}));
						else itemResults[i] = r;
					}
					if (def.rest) {
						let i = items.length - 1;
						const rest = input.slice(items.length);
						for (const el of rest) {
							i++;
							const result = def.rest._zod.run({
								value: el,
								issues: []
							}, ctx);
							if (result instanceof Promise) proms.push(result.then((r) => handleTupleResult(r, payload, i)));
							else handleTupleResult(result, payload, i);
						}
					}
					if (proms.length) return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
					return handleTupleResults(itemResults, payload, items, input, optoutStart);
				};
			});
			function getTupleOptStart(items, key) {
				for (let i = items.length - 1; i >= 0; i--) if (items[i]._zod[key] !== "optional") return i + 1;
				return 0;
			}
			function handleTupleResult(result, final, index) {
				if (result.issues.length) final.issues.push(...util.prefixIssues(index, result.issues));
				final.value[index] = result.value;
			}
			function handleTupleResults(itemResults, final, items, input, optoutStart) {
				for (let i = 0; i < items.length; i++) {
					const r = itemResults[i];
					const isPresent = i < input.length;
					if (r.issues.length) {
						if (!isPresent && i >= optoutStart) {
							final.value.length = i;
							break;
						}
						final.issues.push(...util.prefixIssues(i, r.issues));
					}
					final.value[i] = r.value;
				}
				for (let i = final.value.length - 1; i >= input.length; i--) if (items[i]._zod.optout === "optional" && final.value[i] === void 0) final.value.length = i;
				else break;
				return final;
			}
			exports.$ZodRecord = core.$constructor("$ZodRecord", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!util.isPlainObject(input)) {
						payload.issues.push({
							expected: "record",
							code: "invalid_type",
							input,
							inst
						});
						return payload;
					}
					const proms = [];
					const values = def.keyType._zod.values;
					if (values) {
						payload.value = {};
						const recordKeys = /* @__PURE__ */ new Set();
						for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
							recordKeys.add(typeof key === "number" ? key.toString() : key);
							const keyResult = def.keyType._zod.run({
								value: key,
								issues: []
							}, ctx);
							if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (keyResult.issues.length) {
								payload.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
									input: key,
									path: [key],
									inst
								});
								continue;
							}
							const outKey = keyResult.value;
							const result = def.valueType._zod.run({
								value: input[key],
								issues: []
							}, ctx);
							if (result instanceof Promise) proms.push(result.then((result) => {
								if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
								payload.value[outKey] = result.value;
							}));
							else {
								if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
								payload.value[outKey] = result.value;
							}
						}
						let unrecognized;
						for (const key in input) if (!recordKeys.has(key)) {
							unrecognized = unrecognized ?? [];
							unrecognized.push(key);
						}
						if (unrecognized && unrecognized.length > 0) payload.issues.push({
							code: "unrecognized_keys",
							input,
							inst,
							keys: unrecognized
						});
					} else {
						payload.value = {};
						for (const key of Reflect.ownKeys(input)) {
							if (key === "__proto__") continue;
							if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
							let keyResult = def.keyType._zod.run({
								value: key,
								issues: []
							}, ctx);
							if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (typeof key === "string" && regexes.number.test(key) && keyResult.issues.length) {
								const retryResult = def.keyType._zod.run({
									value: Number(key),
									issues: []
								}, ctx);
								if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
								if (retryResult.issues.length === 0) keyResult = retryResult;
							}
							if (keyResult.issues.length) {
								if (def.mode === "loose") payload.value[key] = input[key];
								else payload.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
									input: key,
									path: [key],
									inst
								});
								continue;
							}
							const result = def.valueType._zod.run({
								value: input[key],
								issues: []
							}, ctx);
							if (result instanceof Promise) proms.push(result.then((result) => {
								if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
								payload.value[keyResult.value] = result.value;
							}));
							else {
								if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
								payload.value[keyResult.value] = result.value;
							}
						}
					}
					if (proms.length) return Promise.all(proms).then(() => payload);
					return payload;
				};
			});
			exports.$ZodMap = core.$constructor("$ZodMap", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!(input instanceof Map)) {
						payload.issues.push({
							expected: "map",
							code: "invalid_type",
							input,
							inst
						});
						return payload;
					}
					const proms = [];
					payload.value = /* @__PURE__ */ new Map();
					for (const [key, value] of input) {
						const keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						const valueResult = def.valueType._zod.run({
							value,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise || valueResult instanceof Promise) proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
							handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
						}));
						else handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
					}
					if (proms.length) return Promise.all(proms).then(() => payload);
					return payload;
				};
			});
			function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
				if (keyResult.issues.length) if (util.propertyKeyTypes.has(typeof key)) final.issues.push(...util.prefixIssues(key, keyResult.issues));
				else final.issues.push({
					code: "invalid_key",
					origin: "map",
					input,
					inst,
					issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))
				});
				if (valueResult.issues.length) if (util.propertyKeyTypes.has(typeof key)) final.issues.push(...util.prefixIssues(key, valueResult.issues));
				else final.issues.push({
					origin: "map",
					code: "invalid_element",
					input,
					inst,
					key,
					issues: valueResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))
				});
				final.value.set(keyResult.value, valueResult.value);
			}
			exports.$ZodSet = core.$constructor("$ZodSet", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					const input = payload.value;
					if (!(input instanceof Set)) {
						payload.issues.push({
							input,
							inst,
							expected: "set",
							code: "invalid_type"
						});
						return payload;
					}
					const proms = [];
					payload.value = /* @__PURE__ */ new Set();
					for (const item of input) {
						const result = def.valueType._zod.run({
							value: item,
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => handleSetResult(result, payload)));
						else handleSetResult(result, payload);
					}
					if (proms.length) return Promise.all(proms).then(() => payload);
					return payload;
				};
			});
			function handleSetResult(result, final) {
				if (result.issues.length) final.issues.push(...result.issues);
				final.value.add(result.value);
			}
			exports.$ZodEnum = core.$constructor("$ZodEnum", (inst, def) => {
				exports.$ZodType.init(inst, def);
				const values = util.getEnumValues(def.entries);
				const valuesSet = new Set(values);
				inst._zod.values = valuesSet;
				inst._zod.pattern = new RegExp(`^(${values.filter((k) => util.propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? util.escapeRegex(o) : o.toString()).join("|")})$`);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (valuesSet.has(input)) return payload;
					payload.issues.push({
						code: "invalid_value",
						values,
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodLiteral = core.$constructor("$ZodLiteral", (inst, def) => {
				exports.$ZodType.init(inst, def);
				if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
				const values = new Set(def.values);
				inst._zod.values = values;
				inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? util.escapeRegex(o) : o ? util.escapeRegex(o.toString()) : String(o)).join("|")})$`);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (values.has(input)) return payload;
					payload.issues.push({
						code: "invalid_value",
						values: def.values,
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodFile = core.$constructor("$ZodFile", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					const input = payload.value;
					if (input instanceof File) return payload;
					payload.issues.push({
						expected: "file",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				};
			});
			exports.$ZodTransform = core.$constructor("$ZodTransform", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.optin = "optional";
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") throw new core.$ZodEncodeError(inst.constructor.name);
					const _out = def.transform(payload.value, payload);
					if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
						payload.value = output;
						payload.fallback = true;
						return payload;
					});
					if (_out instanceof Promise) throw new core.$ZodAsyncError();
					payload.value = _out;
					payload.fallback = true;
					return payload;
				};
			});
			function handleOptionalResult(result, input) {
				if (input === void 0 && (result.issues.length || result.fallback)) return {
					issues: [],
					value: void 0
				};
				return result;
			}
			exports.$ZodOptional = core.$constructor("$ZodOptional", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.optin = "optional";
				inst._zod.optout = "optional";
				util.defineLazy(inst._zod, "values", () => {
					return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
				});
				util.defineLazy(inst._zod, "pattern", () => {
					const pattern = def.innerType._zod.pattern;
					return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)})?$`) : void 0;
				});
				inst._zod.parse = (payload, ctx) => {
					if (def.innerType._zod.optin === "optional") {
						const input = payload.value;
						const result = def.innerType._zod.run(payload, ctx);
						if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
						return handleOptionalResult(result, input);
					}
					if (payload.value === void 0) return payload;
					return def.innerType._zod.run(payload, ctx);
				};
			});
			exports.$ZodExactOptional = core.$constructor("$ZodExactOptional", (inst, def) => {
				exports.$ZodOptional.init(inst, def);
				util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
				util.defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
				inst._zod.parse = (payload, ctx) => {
					return def.innerType._zod.run(payload, ctx);
				};
			});
			exports.$ZodNullable = core.$constructor("$ZodNullable", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
				util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
				util.defineLazy(inst._zod, "pattern", () => {
					const pattern = def.innerType._zod.pattern;
					return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)}|null)$`) : void 0;
				});
				util.defineLazy(inst._zod, "values", () => {
					return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
				});
				inst._zod.parse = (payload, ctx) => {
					if (payload.value === null) return payload;
					return def.innerType._zod.run(payload, ctx);
				};
			});
			exports.$ZodDefault = core.$constructor("$ZodDefault", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.optin = "optional";
				util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
					if (payload.value === void 0) {
						payload.value = def.defaultValue;
						/**
						* $ZodDefault returns the default value immediately in forward direction.
						* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
						return payload;
					}
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
					return handleDefaultResult(result, def);
				};
			});
			function handleDefaultResult(payload, def) {
				if (payload.value === void 0) payload.value = def.defaultValue;
				return payload;
			}
			exports.$ZodPrefault = core.$constructor("$ZodPrefault", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.optin = "optional";
				util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
					if (payload.value === void 0) payload.value = def.defaultValue;
					return def.innerType._zod.run(payload, ctx);
				};
			});
			exports.$ZodNonOptional = core.$constructor("$ZodNonOptional", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "values", () => {
					const v = def.innerType._zod.values;
					return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
				});
				inst._zod.parse = (payload, ctx) => {
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
					return handleNonOptionalResult(result, inst);
				};
			});
			function handleNonOptionalResult(payload, inst) {
				if (!payload.issues.length && payload.value === void 0) payload.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: payload.value,
					inst
				});
				return payload;
			}
			exports.$ZodSuccess = core.$constructor("$ZodSuccess", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") throw new core.$ZodEncodeError("ZodSuccess");
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((result) => {
						payload.value = result.issues.length === 0;
						return payload;
					});
					payload.value = result.issues.length === 0;
					return payload;
				};
			});
			exports.$ZodCatch = core.$constructor("$ZodCatch", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.optin = "optional";
				util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
				util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((result) => {
						payload.value = result.value;
						if (result.issues.length) {
							payload.value = def.catchValue({
								...payload,
								error: { issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())) },
								input: payload.value
							});
							payload.issues = [];
							payload.fallback = true;
						}
						return payload;
					});
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				};
			});
			exports.$ZodNaN = core.$constructor("$ZodNaN", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _ctx) => {
					if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
						payload.issues.push({
							input: payload.value,
							inst,
							expected: "nan",
							code: "invalid_type"
						});
						return payload;
					}
					return payload;
				};
			});
			exports.$ZodPipe = core.$constructor("$ZodPipe", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "values", () => def.in._zod.values);
				util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
				util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
				util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") {
						const right = def.out._zod.run(payload, ctx);
						if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
						return handlePipeResult(right, def.in, ctx);
					}
					const left = def.in._zod.run(payload, ctx);
					if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
					return handlePipeResult(left, def.out, ctx);
				};
			});
			function handlePipeResult(left, next, ctx) {
				if (left.issues.length) {
					left.aborted = true;
					return left;
				}
				return next._zod.run({
					value: left.value,
					issues: left.issues,
					fallback: left.fallback
				}, ctx);
			}
			exports.$ZodCodec = core.$constructor("$ZodCodec", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "values", () => def.in._zod.values);
				util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
				util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
				util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
				inst._zod.parse = (payload, ctx) => {
					if ((ctx.direction || "forward") === "forward") {
						const left = def.in._zod.run(payload, ctx);
						if (left instanceof Promise) return left.then((left) => handleCodecAResult(left, def, ctx));
						return handleCodecAResult(left, def, ctx);
					} else {
						const right = def.out._zod.run(payload, ctx);
						if (right instanceof Promise) return right.then((right) => handleCodecAResult(right, def, ctx));
						return handleCodecAResult(right, def, ctx);
					}
				};
			});
			function handleCodecAResult(result, def, ctx) {
				if (result.issues.length) {
					result.aborted = true;
					return result;
				}
				if ((ctx.direction || "forward") === "forward") {
					const transformed = def.transform(result.value, result);
					if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
					return handleCodecTxResult(result, transformed, def.out, ctx);
				} else {
					const transformed = def.reverseTransform(result.value, result);
					if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
					return handleCodecTxResult(result, transformed, def.in, ctx);
				}
			}
			function handleCodecTxResult(left, value, nextSchema, ctx) {
				if (left.issues.length) {
					left.aborted = true;
					return left;
				}
				return nextSchema._zod.run({
					value,
					issues: left.issues
				}, ctx);
			}
			exports.$ZodPreprocess = core.$constructor("$ZodPreprocess", (inst, def) => {
				exports.$ZodPipe.init(inst, def);
			});
			exports.$ZodReadonly = core.$constructor("$ZodReadonly", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
				util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
				util.defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
				util.defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
				inst._zod.parse = (payload, ctx) => {
					if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then(handleReadonlyResult);
					return handleReadonlyResult(result);
				};
			});
			function handleReadonlyResult(payload) {
				payload.value = Object.freeze(payload.value);
				return payload;
			}
			exports.$ZodTemplateLiteral = core.$constructor("$ZodTemplateLiteral", (inst, def) => {
				exports.$ZodType.init(inst, def);
				const regexParts = [];
				for (const part of def.parts) if (typeof part === "object" && part !== null) {
					if (!part._zod.pattern) throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
					const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
					if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
					const start = source.startsWith("^") ? 1 : 0;
					const end = source.endsWith("$") ? source.length - 1 : source.length;
					regexParts.push(source.slice(start, end));
				} else if (part === null || util.primitiveTypes.has(typeof part)) regexParts.push(util.escapeRegex(`${part}`));
				else throw new Error(`Invalid template literal part: ${part}`);
				inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
				inst._zod.parse = (payload, _ctx) => {
					if (typeof payload.value !== "string") {
						payload.issues.push({
							input: payload.value,
							inst,
							expected: "string",
							code: "invalid_type"
						});
						return payload;
					}
					inst._zod.pattern.lastIndex = 0;
					if (!inst._zod.pattern.test(payload.value)) {
						payload.issues.push({
							input: payload.value,
							inst,
							code: "invalid_format",
							format: def.format ?? "template_literal",
							pattern: inst._zod.pattern.source
						});
						return payload;
					}
					return payload;
				};
			});
			exports.$ZodFunction = core.$constructor("$ZodFunction", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._def = def;
				inst._zod.def = def;
				inst.implement = (func) => {
					if (typeof func !== "function") throw new Error("implement() must be called with a function");
					return function(...args) {
						const parsedArgs = inst._def.input ? (0, parse_js_1.parse)(inst._def.input, args) : args;
						const result = Reflect.apply(func, this, parsedArgs);
						if (inst._def.output) return (0, parse_js_1.parse)(inst._def.output, result);
						return result;
					};
				};
				inst.implementAsync = (func) => {
					if (typeof func !== "function") throw new Error("implementAsync() must be called with a function");
					return async function(...args) {
						const parsedArgs = inst._def.input ? await (0, parse_js_1.parseAsync)(inst._def.input, args) : args;
						const result = await Reflect.apply(func, this, parsedArgs);
						if (inst._def.output) return await (0, parse_js_1.parseAsync)(inst._def.output, result);
						return result;
					};
				};
				inst._zod.parse = (payload, _ctx) => {
					if (typeof payload.value !== "function") {
						payload.issues.push({
							code: "invalid_type",
							expected: "function",
							input: payload.value,
							inst
						});
						return payload;
					}
					if (inst._def.output && inst._def.output._zod.def.type === "promise") payload.value = inst.implementAsync(payload.value);
					else payload.value = inst.implement(payload.value);
					return payload;
				};
				inst.input = (...args) => {
					const F = inst.constructor;
					if (Array.isArray(args[0])) return new F({
						type: "function",
						input: new exports.$ZodTuple({
							type: "tuple",
							items: args[0],
							rest: args[1]
						}),
						output: inst._def.output
					});
					return new F({
						type: "function",
						input: args[0],
						output: inst._def.output
					});
				};
				inst.output = (output) => {
					const F = inst.constructor;
					return new F({
						type: "function",
						input: inst._def.input,
						output
					});
				};
				return inst;
			});
			exports.$ZodPromise = core.$constructor("$ZodPromise", (inst, def) => {
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, ctx) => {
					return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({
						value: inner,
						issues: []
					}, ctx));
				};
			});
			exports.$ZodLazy = core.$constructor("$ZodLazy", (inst, def) => {
				exports.$ZodType.init(inst, def);
				util.defineLazy(inst._zod, "innerType", () => {
					const d = def;
					if (!d._cachedInner) d._cachedInner = def.getter();
					return d._cachedInner;
				});
				util.defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
				util.defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
				util.defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
				util.defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
				inst._zod.parse = (payload, ctx) => {
					return inst._zod.innerType._zod.run(payload, ctx);
				};
			});
			exports.$ZodCustom = core.$constructor("$ZodCustom", (inst, def) => {
				checks.$ZodCheck.init(inst, def);
				exports.$ZodType.init(inst, def);
				inst._zod.parse = (payload, _) => {
					return payload;
				};
				inst._zod.check = (payload) => {
					const input = payload.value;
					const r = def.fn(input);
					if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
					handleRefineResult(r, payload, input, inst);
				};
			});
			function handleRefineResult(result, payload, input, inst) {
				if (!result) {
					const _iss = {
						code: "custom",
						input,
						inst,
						path: [...inst._zod.def.path ?? []],
						continue: !inst._zod.def.abort
					};
					if (inst._zod.def.params) _iss.params = inst._zod.def.params;
					payload.issues.push(util.issue(_iss));
				}
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ar.cjs
		var require_ar = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "حرف",
						verb: "أن يحوي"
					},
					file: {
						unit: "بايت",
						verb: "أن يحوي"
					},
					array: {
						unit: "عنصر",
						verb: "أن يحوي"
					},
					set: {
						unit: "عنصر",
						verb: "أن يحوي"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "مدخل",
					email: "بريد إلكتروني",
					url: "رابط",
					emoji: "إيموجي",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "تاريخ ووقت بمعيار ISO",
					date: "تاريخ بمعيار ISO",
					time: "وقت بمعيار ISO",
					duration: "مدة بمعيار ISO",
					ipv4: "عنوان IPv4",
					ipv6: "عنوان IPv6",
					cidrv4: "مدى عناوين بصيغة IPv4",
					cidrv6: "مدى عناوين بصيغة IPv6",
					base64: "نَص بترميز base64-encoded",
					base64url: "نَص بترميز base64url-encoded",
					json_string: "نَص على هيئة JSON",
					e164: "رقم هاتف بمعيار E.164",
					jwt: "JWT",
					template_literal: "مدخل"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue.expected}، ولكن تم إدخال ${received}`;
							return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `مدخلات غير مقبولة: يفترض إدخال ${util.stringifyPrimitive(issue.values[0])}`;
							return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
							return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
							return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
							if (_issue.format === "ends_with") return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
							if (_issue.format === "includes") return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
							if (_issue.format === "regex") return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} غير مقبول`;
						}
						case "not_multiple_of": return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
						case "unrecognized_keys": return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${util.joinValues(issue.keys, "، ")}`;
						case "invalid_key": return `معرف غير مقبول في ${issue.origin}`;
						case "invalid_union": return "مدخل غير مقبول";
						case "invalid_element": return `مدخل غير مقبول في ${issue.origin}`;
						default: return "مدخل غير مقبول";
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/az.cjs
		var require_az = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "simvol",
						verb: "olmalıdır"
					},
					file: {
						unit: "bayt",
						verb: "olmalıdır"
					},
					array: {
						unit: "element",
						verb: "olmalıdır"
					},
					set: {
						unit: "element",
						verb: "olmalıdır"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "email address",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO datetime",
					date: "ISO date",
					time: "ISO time",
					duration: "ISO duration",
					ipv4: "IPv4 address",
					ipv6: "IPv6 address",
					cidrv4: "IPv4 range",
					cidrv6: "IPv6 range",
					base64: "base64-encoded string",
					base64url: "base64url-encoded string",
					json_string: "JSON string",
					e164: "E.164 number",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Yanlış dəyər: gözlənilən instanceof ${issue.expected}, daxil olan ${received}`;
							return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Yanlış dəyər: gözlənilən ${util.stringifyPrimitive(issue.values[0])}`;
							return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
							return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
							if (_issue.format === "ends_with") return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
							if (_issue.format === "includes") return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
							if (_issue.format === "regex") return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
							return `Yanlış ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
						case "unrecognized_keys": return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} daxilində yanlış açar`;
						case "invalid_union": return "Yanlış dəyər";
						case "invalid_element": return `${issue.origin} daxilində yanlış dəyər`;
						default: return `Yanlış dəyər`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/be.cjs
		var require_be = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			function getBelarusianPlural(count, one, few, many) {
				const absCount = Math.abs(count);
				const lastDigit = absCount % 10;
				const lastTwoDigits = absCount % 100;
				if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
				if (lastDigit === 1) return one;
				if (lastDigit >= 2 && lastDigit <= 4) return few;
				return many;
			}
			const error = () => {
				const Sizable = {
					string: {
						unit: {
							one: "сімвал",
							few: "сімвалы",
							many: "сімвалаў"
						},
						verb: "мець"
					},
					array: {
						unit: {
							one: "элемент",
							few: "элементы",
							many: "элементаў"
						},
						verb: "мець"
					},
					set: {
						unit: {
							one: "элемент",
							few: "элементы",
							many: "элементаў"
						},
						verb: "мець"
					},
					file: {
						unit: {
							one: "байт",
							few: "байты",
							many: "байтаў"
						},
						verb: "мець"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "увод",
					email: "email адрас",
					url: "URL",
					emoji: "эмодзі",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO дата і час",
					date: "ISO дата",
					time: "ISO час",
					duration: "ISO працягласць",
					ipv4: "IPv4 адрас",
					ipv6: "IPv6 адрас",
					cidrv4: "IPv4 дыяпазон",
					cidrv6: "IPv6 дыяпазон",
					base64: "радок у фармаце base64",
					base64url: "радок у фармаце base64url",
					json_string: "JSON радок",
					e164: "нумар E.164",
					jwt: "JWT",
					template_literal: "увод"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "лік",
					array: "масіў"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Няправільны ўвод: чакаўся instanceof ${issue.expected}, атрымана ${received}`;
							return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Няправільны ўвод: чакалася ${util.stringifyPrimitive(issue.values[0])}`;
							return `Няправільны варыянт: чакаўся адзін з ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getBelarusianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
								return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
							}
							return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getBelarusianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
								return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
							}
							return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
							if (_issue.format === "regex") return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
							return `Няправільны ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
						case "unrecognized_keys": return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Няправільны ключ у ${issue.origin}`;
						case "invalid_union": return "Няправільны ўвод";
						case "invalid_element": return `Няправільнае значэнне ў ${issue.origin}`;
						default: return `Няправільны ўвод`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/bg.cjs
		var require_bg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "символа",
						verb: "да съдържа"
					},
					file: {
						unit: "байта",
						verb: "да съдържа"
					},
					array: {
						unit: "елемента",
						verb: "да съдържа"
					},
					set: {
						unit: "елемента",
						verb: "да съдържа"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "вход",
					email: "имейл адрес",
					url: "URL",
					emoji: "емоджи",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO време",
					date: "ISO дата",
					time: "ISO време",
					duration: "ISO продължителност",
					ipv4: "IPv4 адрес",
					ipv6: "IPv6 адрес",
					cidrv4: "IPv4 диапазон",
					cidrv6: "IPv6 диапазон",
					base64: "base64-кодиран низ",
					base64url: "base64url-кодиран низ",
					json_string: "JSON низ",
					e164: "E.164 номер",
					jwt: "JWT",
					template_literal: "вход"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "число",
					array: "масив"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Невалиден вход: очакван instanceof ${issue.expected}, получен ${received}`;
							return `Невалиден вход: очакван ${expected}, получен ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Невалиден вход: очакван ${util.stringifyPrimitive(issue.values[0])}`;
							return `Невалидна опция: очаквано едно от ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да съдържа ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елемента"}`;
							return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да бъде ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Твърде малко: очаква се ${issue.origin} да съдържа ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Твърде малко: очаква се ${issue.origin} да бъде ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Невалиден низ: трябва да включва "${_issue.includes}"`;
							if (_issue.format === "regex") return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
							let invalid_adj = "Невалиден";
							if (_issue.format === "emoji") invalid_adj = "Невалидно";
							if (_issue.format === "datetime") invalid_adj = "Невалидно";
							if (_issue.format === "date") invalid_adj = "Невалидна";
							if (_issue.format === "time") invalid_adj = "Невалидно";
							if (_issue.format === "duration") invalid_adj = "Невалидна";
							return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Невалидно число: трябва да бъде кратно на ${issue.divisor}`;
						case "unrecognized_keys": return `Неразпознат${issue.keys.length > 1 ? "и" : ""} ключ${issue.keys.length > 1 ? "ове" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Невалиден ключ в ${issue.origin}`;
						case "invalid_union": return "Невалиден вход";
						case "invalid_element": return `Невалидна стойност в ${issue.origin}`;
						default: return `Невалиден вход`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ca.cjs
		var require_ca = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caràcters",
						verb: "contenir"
					},
					file: {
						unit: "bytes",
						verb: "contenir"
					},
					array: {
						unit: "elements",
						verb: "contenir"
					},
					set: {
						unit: "elements",
						verb: "contenir"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "entrada",
					email: "adreça electrònica",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "data i hora ISO",
					date: "data ISO",
					time: "hora ISO",
					duration: "durada ISO",
					ipv4: "adreça IPv4",
					ipv6: "adreça IPv6",
					cidrv4: "rang IPv4",
					cidrv6: "rang IPv6",
					base64: "cadena codificada en base64",
					base64url: "cadena codificada en base64url",
					json_string: "cadena JSON",
					e164: "número E.164",
					jwt: "JWT",
					template_literal: "entrada"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Tipus invàlid: s'esperava instanceof ${issue.expected}, s'ha rebut ${received}`;
							return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Valor invàlid: s'esperava ${util.stringifyPrimitive(issue.values[0])}`;
							return `Opció invàlida: s'esperava una de ${util.joinValues(issue.values, " o ")}`;
						case "too_big": {
							const adj = issue.inclusive ? "com a màxim" : "menys de";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
							return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? "com a mínim" : "més de";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
							return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Format invàlid: ha d'incloure "${_issue.includes}"`;
							if (_issue.format === "regex") return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
							return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
						case "unrecognized_keys": return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Clau invàlida a ${issue.origin}`;
						case "invalid_union": return "Entrada invàlida";
						case "invalid_element": return `Element invàlid a ${issue.origin}`;
						default: return `Entrada invàlida`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/cs.cjs
		var require_cs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "znaků",
						verb: "mít"
					},
					file: {
						unit: "bajtů",
						verb: "mít"
					},
					array: {
						unit: "prvků",
						verb: "mít"
					},
					set: {
						unit: "prvků",
						verb: "mít"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "regulární výraz",
					email: "e-mailová adresa",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "datum a čas ve formátu ISO",
					date: "datum ve formátu ISO",
					time: "čas ve formátu ISO",
					duration: "doba trvání ISO",
					ipv4: "IPv4 adresa",
					ipv6: "IPv6 adresa",
					cidrv4: "rozsah IPv4",
					cidrv6: "rozsah IPv6",
					base64: "řetězec zakódovaný ve formátu base64",
					base64url: "řetězec zakódovaný ve formátu base64url",
					json_string: "řetězec ve formátu JSON",
					e164: "číslo E.164",
					jwt: "JWT",
					template_literal: "vstup"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "číslo",
					string: "řetězec",
					function: "funkce",
					array: "pole"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Neplatný vstup: očekáváno instanceof ${issue.expected}, obdrženo ${received}`;
							return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Neplatný vstup: očekáváno ${util.stringifyPrimitive(issue.values[0])}`;
							return `Neplatná možnost: očekávána jedna z hodnot ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
							return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
							return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
							if (_issue.format === "regex") return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
							return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
						case "unrecognized_keys": return `Neznámé klíče: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Neplatný klíč v ${issue.origin}`;
						case "invalid_union": return "Neplatný vstup";
						case "invalid_element": return `Neplatná hodnota v ${issue.origin}`;
						default: return `Neplatný vstup`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/da.cjs
		var require_da = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "tegn",
						verb: "havde"
					},
					file: {
						unit: "bytes",
						verb: "havde"
					},
					array: {
						unit: "elementer",
						verb: "indeholdt"
					},
					set: {
						unit: "elementer",
						verb: "indeholdt"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "e-mailadresse",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO dato- og klokkeslæt",
					date: "ISO-dato",
					time: "ISO-klokkeslæt",
					duration: "ISO-varighed",
					ipv4: "IPv4-område",
					ipv6: "IPv6-område",
					cidrv4: "IPv4-spektrum",
					cidrv6: "IPv6-spektrum",
					base64: "base64-kodet streng",
					base64url: "base64url-kodet streng",
					json_string: "JSON-streng",
					e164: "E.164-nummer",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = {
					nan: "NaN",
					string: "streng",
					number: "tal",
					boolean: "boolean",
					array: "liste",
					object: "objekt",
					set: "sæt",
					file: "fil"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ugyldigt input: forventede instanceof ${issue.expected}, fik ${received}`;
							return `Ugyldigt input: forventede ${expected}, fik ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ugyldig værdi: forventede ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ugyldigt valg: forventede en af følgende ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
							return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
							return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
							if (_issue.format === "regex") return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
							return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Ugyldig nøgle i ${issue.origin}`;
						case "invalid_union": return "Ugyldigt input: matcher ingen af de tilladte typer";
						case "invalid_element": return `Ugyldig værdi i ${issue.origin}`;
						default: return `Ugyldigt input`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/de.cjs
		var require_de = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "Zeichen",
						verb: "zu haben"
					},
					file: {
						unit: "Bytes",
						verb: "zu haben"
					},
					array: {
						unit: "Elemente",
						verb: "zu haben"
					},
					set: {
						unit: "Elemente",
						verb: "zu haben"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "Eingabe",
					email: "E-Mail-Adresse",
					url: "URL",
					emoji: "Emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO-Datum und -Uhrzeit",
					date: "ISO-Datum",
					time: "ISO-Uhrzeit",
					duration: "ISO-Dauer",
					ipv4: "IPv4-Adresse",
					ipv6: "IPv6-Adresse",
					cidrv4: "IPv4-Bereich",
					cidrv6: "IPv6-Bereich",
					base64: "Base64-codierter String",
					base64url: "Base64-URL-codierter String",
					json_string: "JSON-String",
					e164: "E.164-Nummer",
					jwt: "JWT",
					template_literal: "Eingabe"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "Zahl",
					array: "Array"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ungültige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}`;
							return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ungültige Eingabe: erwartet ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ungültige Option: erwartet eine von ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
							return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
							return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
							if (_issue.format === "ends_with") return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
							if (_issue.format === "includes") return `Ungültiger String: muss "${_issue.includes}" enthalten`;
							if (_issue.format === "regex") return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
							return `Ungültig: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Ungültiger Schlüssel in ${issue.origin}`;
						case "invalid_union": return "Ungültige Eingabe";
						case "invalid_element": return `Ungültiger Wert in ${issue.origin}`;
						default: return `Ungültige Eingabe`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/el.cjs
		var require_el = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "χαρακτήρες",
						verb: "να έχει"
					},
					file: {
						unit: "bytes",
						verb: "να έχει"
					},
					array: {
						unit: "στοιχεία",
						verb: "να έχει"
					},
					set: {
						unit: "στοιχεία",
						verb: "να έχει"
					},
					map: {
						unit: "καταχωρήσεις",
						verb: "να έχει"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "είσοδος",
					email: "διεύθυνση email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO ημερομηνία και ώρα",
					date: "ISO ημερομηνία",
					time: "ISO ώρα",
					duration: "ISO διάρκεια",
					ipv4: "διεύθυνση IPv4",
					ipv6: "διεύθυνση IPv6",
					mac: "διεύθυνση MAC",
					cidrv4: "εύρος IPv4",
					cidrv6: "εύρος IPv6",
					base64: "συμβολοσειρά κωδικοποιημένη σε base64",
					base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
					json_string: "συμβολοσειρά JSON",
					e164: "αριθμός E.164",
					jwt: "JWT",
					template_literal: "είσοδος"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (typeof issue.expected === "string" && /^[A-Z]/.test(issue.expected)) return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue.expected}, λήφθηκε ${received}`;
							return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Μη έγκυρη είσοδος: αναμενόταν ${util.stringifyPrimitive(issue.values[0])}`;
							return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να έχει ${adj}${issue.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
							return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να είναι ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Πολύ μικρό: αναμενόταν ${issue.origin} να έχει ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Πολύ μικρό: αναμενόταν ${issue.origin} να είναι ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
							if (_issue.format === "regex") return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
							return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue.divisor}`;
						case "unrecognized_keys": return `Άγνωστ${issue.keys.length > 1 ? "α" : "ο"} κλειδ${issue.keys.length > 1 ? "ιά" : "ί"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Μη έγκυρο κλειδί στο ${issue.origin}`;
						case "invalid_union": return "Μη έγκυρη είσοδος";
						case "invalid_element": return `Μη έγκυρη τιμή στο ${issue.origin}`;
						default: return `Μη έγκυρη είσοδος`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/en.cjs
		var require_en = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "characters",
						verb: "to have"
					},
					file: {
						unit: "bytes",
						verb: "to have"
					},
					array: {
						unit: "items",
						verb: "to have"
					},
					set: {
						unit: "items",
						verb: "to have"
					},
					map: {
						unit: "entries",
						verb: "to have"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "email address",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO datetime",
					date: "ISO date",
					time: "ISO time",
					duration: "ISO duration",
					ipv4: "IPv4 address",
					ipv6: "IPv6 address",
					mac: "MAC address",
					cidrv4: "IPv4 range",
					cidrv6: "IPv6 range",
					base64: "base64-encoded string",
					base64url: "base64url-encoded string",
					json_string: "JSON string",
					e164: "E.164 number",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							return `Invalid input: expected ${expected}, received ${TypeDictionary[receivedType] ?? receivedType}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
							return `Invalid option: expected one of ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
							return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
							if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
							return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
						case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Invalid key in ${issue.origin}`;
						case "invalid_union":
							if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
							return "Invalid input";
						case "invalid_element": return `Invalid value in ${issue.origin}`;
						default: return `Invalid input`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/eo.cjs
		var require_eo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "karaktrojn",
						verb: "havi"
					},
					file: {
						unit: "bajtojn",
						verb: "havi"
					},
					array: {
						unit: "elementojn",
						verb: "havi"
					},
					set: {
						unit: "elementojn",
						verb: "havi"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "enigo",
					email: "retadreso",
					url: "URL",
					emoji: "emoĝio",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO-datotempo",
					date: "ISO-dato",
					time: "ISO-tempo",
					duration: "ISO-daŭro",
					ipv4: "IPv4-adreso",
					ipv6: "IPv6-adreso",
					cidrv4: "IPv4-rango",
					cidrv6: "IPv6-rango",
					base64: "64-ume kodita karaktraro",
					base64url: "URL-64-ume kodita karaktraro",
					json_string: "JSON-karaktraro",
					e164: "E.164-nombro",
					jwt: "JWT",
					template_literal: "enigo"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "nombro",
					array: "tabelo",
					null: "senvalora"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Nevalida enigo: atendiĝis instanceof ${issue.expected}, riceviĝis ${received}`;
							return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Nevalida enigo: atendiĝis ${util.stringifyPrimitive(issue.values[0])}`;
							return `Nevalida opcio: atendiĝis unu el ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
							return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
							if (_issue.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
							return `Nevalida ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
						case "unrecognized_keys": return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Nevalida ŝlosilo en ${issue.origin}`;
						case "invalid_union": return "Nevalida enigo";
						case "invalid_element": return `Nevalida valoro en ${issue.origin}`;
						default: return `Nevalida enigo`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/es.cjs
		var require_es = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caracteres",
						verb: "tener"
					},
					file: {
						unit: "bytes",
						verb: "tener"
					},
					array: {
						unit: "elementos",
						verb: "tener"
					},
					set: {
						unit: "elementos",
						verb: "tener"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "entrada",
					email: "dirección de correo electrónico",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "fecha y hora ISO",
					date: "fecha ISO",
					time: "hora ISO",
					duration: "duración ISO",
					ipv4: "dirección IPv4",
					ipv6: "dirección IPv6",
					cidrv4: "rango IPv4",
					cidrv6: "rango IPv6",
					base64: "cadena codificada en base64",
					base64url: "URL codificada en base64",
					json_string: "cadena JSON",
					e164: "número E.164",
					jwt: "JWT",
					template_literal: "entrada"
				};
				const TypeDictionary = {
					nan: "NaN",
					string: "texto",
					number: "número",
					boolean: "booleano",
					array: "arreglo",
					object: "objeto",
					set: "conjunto",
					file: "archivo",
					date: "fecha",
					bigint: "número grande",
					symbol: "símbolo",
					undefined: "indefinido",
					null: "nulo",
					function: "función",
					map: "mapa",
					record: "registro",
					tuple: "tupla",
					enum: "enumeración",
					union: "unión",
					literal: "literal",
					promise: "promesa",
					void: "vacío",
					never: "nunca",
					unknown: "desconocido",
					any: "cualquiera"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Entrada inválida: se esperaba instanceof ${issue.expected}, recibido ${received}`;
							return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Entrada inválida: se esperaba ${util.stringifyPrimitive(issue.values[0])}`;
							return `Opción inválida: se esperaba una de ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
							return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Cadena inválida: debe incluir "${_issue.includes}"`;
							if (_issue.format === "regex") return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
							return `Inválido ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
						case "unrecognized_keys": return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Llave inválida en ${TypeDictionary[issue.origin] ?? issue.origin}`;
						case "invalid_union": return "Entrada inválida";
						case "invalid_element": return `Valor inválido en ${TypeDictionary[issue.origin] ?? issue.origin}`;
						default: return `Entrada inválida`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/fa.cjs
		var require_fa = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "کاراکتر",
						verb: "داشته باشد"
					},
					file: {
						unit: "بایت",
						verb: "داشته باشد"
					},
					array: {
						unit: "آیتم",
						verb: "داشته باشد"
					},
					set: {
						unit: "آیتم",
						verb: "داشته باشد"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ورودی",
					email: "آدرس ایمیل",
					url: "URL",
					emoji: "ایموجی",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "تاریخ و زمان ایزو",
					date: "تاریخ ایزو",
					time: "زمان ایزو",
					duration: "مدت زمان ایزو",
					ipv4: "IPv4 آدرس",
					ipv6: "IPv6 آدرس",
					cidrv4: "IPv4 دامنه",
					cidrv6: "IPv6 دامنه",
					base64: "base64-encoded رشته",
					base64url: "base64url-encoded رشته",
					json_string: "JSON رشته",
					e164: "E.164 عدد",
					jwt: "JWT",
					template_literal: "ورودی"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "عدد",
					array: "آرایه"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `ورودی نامعتبر: می‌بایست instanceof ${issue.expected} می‌بود، ${received} دریافت شد`;
							return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `ورودی نامعتبر: می‌بایست ${util.stringifyPrimitive(issue.values[0])} می‌بود`;
							return `گزینه نامعتبر: می‌بایست یکی از ${util.joinValues(issue.values, "|")} می‌بود`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
							return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
							return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
							if (_issue.format === "ends_with") return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
							if (_issue.format === "includes") return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
							if (_issue.format === "regex") return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
							return `${FormatDictionary[_issue.format] ?? issue.format} نامعتبر`;
						}
						case "not_multiple_of": return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
						case "unrecognized_keys": return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `کلید ناشناس در ${issue.origin}`;
						case "invalid_union": return `ورودی نامعتبر`;
						case "invalid_element": return `مقدار نامعتبر در ${issue.origin}`;
						default: return `ورودی نامعتبر`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/fi.cjs
		var require_fi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "merkkiä",
						subject: "merkkijonon"
					},
					file: {
						unit: "tavua",
						subject: "tiedoston"
					},
					array: {
						unit: "alkiota",
						subject: "listan"
					},
					set: {
						unit: "alkiota",
						subject: "joukon"
					},
					number: {
						unit: "",
						subject: "luvun"
					},
					bigint: {
						unit: "",
						subject: "suuren kokonaisluvun"
					},
					int: {
						unit: "",
						subject: "kokonaisluvun"
					},
					date: {
						unit: "",
						subject: "päivämäärän"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "säännöllinen lauseke",
					email: "sähköpostiosoite",
					url: "URL-osoite",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO-aikaleima",
					date: "ISO-päivämäärä",
					time: "ISO-aika",
					duration: "ISO-kesto",
					ipv4: "IPv4-osoite",
					ipv6: "IPv6-osoite",
					cidrv4: "IPv4-alue",
					cidrv6: "IPv6-alue",
					base64: "base64-koodattu merkkijono",
					base64url: "base64url-koodattu merkkijono",
					json_string: "JSON-merkkijono",
					e164: "E.164-luku",
					jwt: "JWT",
					template_literal: "templaattimerkkijono"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Virheellinen tyyppi: odotettiin instanceof ${issue.expected}, oli ${received}`;
							return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Virheellinen syöte: täytyy olla ${util.stringifyPrimitive(issue.values[0])}`;
							return `Virheellinen valinta: täytyy olla yksi seuraavista: ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
							return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
							return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
							if (_issue.format === "regex") return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
							return `Virheellinen ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return "Virheellinen avain tietueessa";
						case "invalid_union": return "Virheellinen unioni";
						case "invalid_element": return "Virheellinen arvo joukossa";
						default: return `Virheellinen syöte`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/fr.cjs
		var require_fr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caractères",
						verb: "avoir"
					},
					file: {
						unit: "octets",
						verb: "avoir"
					},
					array: {
						unit: "éléments",
						verb: "avoir"
					},
					set: {
						unit: "éléments",
						verb: "avoir"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "entrée",
					email: "adresse e-mail",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "date et heure ISO",
					date: "date ISO",
					time: "heure ISO",
					duration: "durée ISO",
					ipv4: "adresse IPv4",
					ipv6: "adresse IPv6",
					cidrv4: "plage IPv4",
					cidrv6: "plage IPv6",
					base64: "chaîne encodée en base64",
					base64url: "chaîne encodée en base64url",
					json_string: "chaîne JSON",
					e164: "numéro E.164",
					jwt: "JWT",
					template_literal: "entrée"
				};
				const TypeDictionary = {
					string: "chaîne",
					number: "nombre",
					int: "entier",
					boolean: "booléen",
					bigint: "grand entier",
					symbol: "symbole",
					undefined: "indéfini",
					null: "null",
					never: "jamais",
					void: "vide",
					date: "date",
					array: "tableau",
					object: "objet",
					tuple: "tuple",
					record: "enregistrement",
					map: "carte",
					set: "ensemble",
					file: "fichier",
					nonoptional: "non-optionnel",
					nan: "NaN",
					function: "fonction"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : instanceof ${issue.expected} attendu, ${received} reçu`;
							return `Entrée invalide : ${expected} attendu, ${received} reçu`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Entrée invalide : ${util.stringifyPrimitive(issue.values[0])} attendu`;
							return `Option invalide : une valeur parmi ${util.joinValues(issue.values, "|")} attendue`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
							return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
							if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
						}
						case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
						case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Clé invalide dans ${issue.origin}`;
						case "invalid_union": return "Entrée invalide";
						case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
						default: return `Entrée invalide`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/fr-CA.cjs
		var require_fr_CA = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caractères",
						verb: "avoir"
					},
					file: {
						unit: "octets",
						verb: "avoir"
					},
					array: {
						unit: "éléments",
						verb: "avoir"
					},
					set: {
						unit: "éléments",
						verb: "avoir"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "entrée",
					email: "adresse courriel",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "date-heure ISO",
					date: "date ISO",
					time: "heure ISO",
					duration: "durée ISO",
					ipv4: "adresse IPv4",
					ipv6: "adresse IPv6",
					cidrv4: "plage IPv4",
					cidrv6: "plage IPv6",
					base64: "chaîne encodée en base64",
					base64url: "chaîne encodée en base64url",
					json_string: "chaîne JSON",
					e164: "numéro E.164",
					jwt: "JWT",
					template_literal: "entrée"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : attendu instanceof ${issue.expected}, reçu ${received}`;
							return `Entrée invalide : attendu ${expected}, reçu ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Entrée invalide : attendu ${util.stringifyPrimitive(issue.values[0])}`;
							return `Option invalide : attendu l'une des valeurs suivantes ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "≤" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
							return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? "≥" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
							if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
						}
						case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
						case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Clé invalide dans ${issue.origin}`;
						case "invalid_union": return "Entrée invalide";
						case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
						default: return `Entrée invalide`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/he.cjs
		var require_he = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const TypeNames = {
					string: {
						label: "מחרוזת",
						gender: "f"
					},
					number: {
						label: "מספר",
						gender: "m"
					},
					boolean: {
						label: "ערך בוליאני",
						gender: "m"
					},
					bigint: {
						label: "BigInt",
						gender: "m"
					},
					date: {
						label: "תאריך",
						gender: "m"
					},
					array: {
						label: "מערך",
						gender: "m"
					},
					object: {
						label: "אובייקט",
						gender: "m"
					},
					null: {
						label: "ערך ריק (null)",
						gender: "m"
					},
					undefined: {
						label: "ערך לא מוגדר (undefined)",
						gender: "m"
					},
					symbol: {
						label: "סימבול (Symbol)",
						gender: "m"
					},
					function: {
						label: "פונקציה",
						gender: "f"
					},
					map: {
						label: "מפה (Map)",
						gender: "f"
					},
					set: {
						label: "קבוצה (Set)",
						gender: "f"
					},
					file: {
						label: "קובץ",
						gender: "m"
					},
					promise: {
						label: "Promise",
						gender: "m"
					},
					NaN: {
						label: "NaN",
						gender: "m"
					},
					unknown: {
						label: "ערך לא ידוע",
						gender: "m"
					},
					value: {
						label: "ערך",
						gender: "m"
					}
				};
				const Sizable = {
					string: {
						unit: "תווים",
						shortLabel: "קצר",
						longLabel: "ארוך"
					},
					file: {
						unit: "בייטים",
						shortLabel: "קטן",
						longLabel: "גדול"
					},
					array: {
						unit: "פריטים",
						shortLabel: "קטן",
						longLabel: "גדול"
					},
					set: {
						unit: "פריטים",
						shortLabel: "קטן",
						longLabel: "גדול"
					},
					number: {
						unit: "",
						shortLabel: "קטן",
						longLabel: "גדול"
					}
				};
				const typeEntry = (t) => t ? TypeNames[t] : void 0;
				const typeLabel = (t) => {
					const e = typeEntry(t);
					if (e) return e.label;
					return t ?? TypeNames.unknown.label;
				};
				const withDefinite = (t) => `ה${typeLabel(t)}`;
				const verbFor = (t) => {
					return (typeEntry(t)?.gender ?? "m") === "f" ? "צריכה להיות" : "צריך להיות";
				};
				const getSizing = (origin) => {
					if (!origin) return null;
					return Sizable[origin] ?? null;
				};
				const FormatDictionary = {
					regex: {
						label: "קלט",
						gender: "m"
					},
					email: {
						label: "כתובת אימייל",
						gender: "f"
					},
					url: {
						label: "כתובת רשת",
						gender: "f"
					},
					emoji: {
						label: "אימוג'י",
						gender: "m"
					},
					uuid: {
						label: "UUID",
						gender: "m"
					},
					nanoid: {
						label: "nanoid",
						gender: "m"
					},
					guid: {
						label: "GUID",
						gender: "m"
					},
					cuid: {
						label: "cuid",
						gender: "m"
					},
					cuid2: {
						label: "cuid2",
						gender: "m"
					},
					ulid: {
						label: "ULID",
						gender: "m"
					},
					xid: {
						label: "XID",
						gender: "m"
					},
					ksuid: {
						label: "KSUID",
						gender: "m"
					},
					datetime: {
						label: "תאריך וזמן ISO",
						gender: "m"
					},
					date: {
						label: "תאריך ISO",
						gender: "m"
					},
					time: {
						label: "זמן ISO",
						gender: "m"
					},
					duration: {
						label: "משך זמן ISO",
						gender: "m"
					},
					ipv4: {
						label: "כתובת IPv4",
						gender: "f"
					},
					ipv6: {
						label: "כתובת IPv6",
						gender: "f"
					},
					cidrv4: {
						label: "טווח IPv4",
						gender: "m"
					},
					cidrv6: {
						label: "טווח IPv6",
						gender: "m"
					},
					base64: {
						label: "מחרוזת בבסיס 64",
						gender: "f"
					},
					base64url: {
						label: "מחרוזת בבסיס 64 לכתובות רשת",
						gender: "f"
					},
					json_string: {
						label: "מחרוזת JSON",
						gender: "f"
					},
					e164: {
						label: "מספר E.164",
						gender: "m"
					},
					jwt: {
						label: "JWT",
						gender: "m"
					},
					ends_with: {
						label: "קלט",
						gender: "m"
					},
					includes: {
						label: "קלט",
						gender: "m"
					},
					lowercase: {
						label: "קלט",
						gender: "m"
					},
					starts_with: {
						label: "קלט",
						gender: "m"
					},
					uppercase: {
						label: "קלט",
						gender: "m"
					}
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expectedKey = issue.expected;
							const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
							return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
						}
						case "invalid_value": {
							if (issue.values.length === 1) return `ערך לא תקין: הערך חייב להיות ${util.stringifyPrimitive(issue.values[0])}`;
							const stringified = issue.values.map((v) => util.stringifyPrimitive(v));
							if (issue.values.length === 2) return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
							const lastValue = stringified[stringified.length - 1];
							return `ערך לא תקין: האפשרויות המתאימות הן ${stringified.slice(0, -1).join(", ")} או ${lastValue}`;
						}
						case "too_big": {
							const sizing = getSizing(issue.origin);
							const subject = withDefinite(issue.origin ?? "value");
							if (issue.origin === "string") return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
							if (issue.origin === "number") return `גדול מדי: ${subject} צריך להיות ${issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`}`;
							if (issue.origin === "array" || issue.origin === "set") return `גדול מדי: ${subject} ${issue.origin === "set" ? "צריכה" : "צריך"} להכיל ${issue.inclusive ? `${issue.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue.maximum} ${sizing?.unit ?? ""}`}`.trim();
							const adj = issue.inclusive ? "<=" : "<";
							const be = verbFor(issue.origin ?? "value");
							if (sizing?.unit) return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
							return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const sizing = getSizing(issue.origin);
							const subject = withDefinite(issue.origin ?? "value");
							if (issue.origin === "string") return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
							if (issue.origin === "number") return `קטן מדי: ${subject} צריך להיות ${issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`}`;
							if (issue.origin === "array" || issue.origin === "set") {
								const verb = issue.origin === "set" ? "צריכה" : "צריך";
								if (issue.minimum === 1 && issue.inclusive) return `קטן מדי: ${subject} ${verb} להכיל ${issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד"}`;
								return `קטן מדי: ${subject} ${verb} להכיל ${issue.inclusive ? `${issue.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue.minimum} ${sizing?.unit ?? ""}`}`.trim();
							}
							const adj = issue.inclusive ? ">=" : ">";
							const be = verbFor(issue.origin ?? "value");
							if (sizing?.unit) return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
							if (_issue.format === "includes") return `המחרוזת חייבת לכלול "${_issue.includes}"`;
							if (_issue.format === "regex") return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
							const nounEntry = FormatDictionary[_issue.format];
							return `${nounEntry?.label ?? _issue.format} לא ${(nounEntry?.gender ?? "m") === "f" ? "תקינה" : "תקין"}`;
						}
						case "not_multiple_of": return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
						case "unrecognized_keys": return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `שדה לא תקין באובייקט`;
						case "invalid_union": return "קלט לא תקין";
						case "invalid_element": return `ערך לא תקין ב${withDefinite(issue.origin ?? "array")}`;
						default: return `קלט לא תקין`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/hr.cjs
		var require_hr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "znakova",
						verb: "imati"
					},
					file: {
						unit: "bajtova",
						verb: "imati"
					},
					array: {
						unit: "stavki",
						verb: "imati"
					},
					set: {
						unit: "stavki",
						verb: "imati"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "unos",
					email: "email adresa",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO datum i vrijeme",
					date: "ISO datum",
					time: "ISO vrijeme",
					duration: "ISO trajanje",
					ipv4: "IPv4 adresa",
					ipv6: "IPv6 adresa",
					cidrv4: "IPv4 raspon",
					cidrv6: "IPv6 raspon",
					base64: "base64 kodirani tekst",
					base64url: "base64url kodirani tekst",
					json_string: "JSON tekst",
					e164: "E.164 broj",
					jwt: "JWT",
					template_literal: "unos"
				};
				const TypeDictionary = {
					nan: "NaN",
					string: "tekst",
					number: "broj",
					boolean: "boolean",
					array: "niz",
					object: "objekt",
					set: "skup",
					file: "datoteka",
					date: "datum",
					bigint: "bigint",
					symbol: "simbol",
					undefined: "undefined",
					null: "null",
					function: "funkcija",
					map: "mapa"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Neispravan unos: očekuje se instanceof ${issue.expected}, a primljeno je ${received}`;
							return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Neispravna vrijednost: očekivano ${util.stringifyPrimitive(issue.values[0])}`;
							return `Neispravna opcija: očekivano jedno od ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
							return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							if (sizing) return `Premalo: očekivano da ${origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Premalo: očekivano da ${origin} bude ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
							if (_issue.format === "regex") return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
							return `Neispravna ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Neispravan broj: mora biti višekratnik od ${issue.divisor}`;
						case "unrecognized_keys": return `Neprepoznat${issue.keys.length > 1 ? "i ključevi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Neispravan ključ u ${TypeDictionary[issue.origin] ?? issue.origin}`;
						case "invalid_union": return "Neispravan unos";
						case "invalid_element": return `Neispravna vrijednost u ${TypeDictionary[issue.origin] ?? issue.origin}`;
						default: return `Neispravan unos`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/hu.cjs
		var require_hu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "karakter",
						verb: "legyen"
					},
					file: {
						unit: "byte",
						verb: "legyen"
					},
					array: {
						unit: "elem",
						verb: "legyen"
					},
					set: {
						unit: "elem",
						verb: "legyen"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "bemenet",
					email: "email cím",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO időbélyeg",
					date: "ISO dátum",
					time: "ISO idő",
					duration: "ISO időintervallum",
					ipv4: "IPv4 cím",
					ipv6: "IPv6 cím",
					cidrv4: "IPv4 tartomány",
					cidrv6: "IPv6 tartomány",
					base64: "base64-kódolt string",
					base64url: "base64url-kódolt string",
					json_string: "JSON string",
					e164: "E.164 szám",
					jwt: "JWT",
					template_literal: "bemenet"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "szám",
					array: "tömb"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Érvénytelen bemenet: a várt érték instanceof ${issue.expected}, a kapott érték ${received}`;
							return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Érvénytelen bemenet: a várt érték ${util.stringifyPrimitive(issue.values[0])}`;
							return `Érvénytelen opció: valamelyik érték várt ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
							return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
							if (_issue.format === "ends_with") return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
							if (_issue.format === "includes") return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
							if (_issue.format === "regex") return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
							return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
						case "unrecognized_keys": return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Érvénytelen kulcs ${issue.origin}`;
						case "invalid_union": return "Érvénytelen bemenet";
						case "invalid_element": return `Érvénytelen érték: ${issue.origin}`;
						default: return `Érvénytelen bemenet`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/hy.cjs
		var require_hy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			function getArmenianPlural(count, one, many) {
				return Math.abs(count) === 1 ? one : many;
			}
			function withDefiniteArticle(word) {
				if (!word) return "";
				const vowels = [
					"ա",
					"ե",
					"ը",
					"ի",
					"ո",
					"ու",
					"օ"
				];
				const lastChar = word[word.length - 1];
				return word + (vowels.includes(lastChar) ? "ն" : "ը");
			}
			const error = () => {
				const Sizable = {
					string: {
						unit: {
							one: "նշան",
							many: "նշաններ"
						},
						verb: "ունենալ"
					},
					file: {
						unit: {
							one: "բայթ",
							many: "բայթեր"
						},
						verb: "ունենալ"
					},
					array: {
						unit: {
							one: "տարր",
							many: "տարրեր"
						},
						verb: "ունենալ"
					},
					set: {
						unit: {
							one: "տարր",
							many: "տարրեր"
						},
						verb: "ունենալ"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "մուտք",
					email: "էլ. հասցե",
					url: "URL",
					emoji: "էմոջի",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO ամսաթիվ և ժամ",
					date: "ISO ամսաթիվ",
					time: "ISO ժամ",
					duration: "ISO տևողություն",
					ipv4: "IPv4 հասցե",
					ipv6: "IPv6 հասցե",
					cidrv4: "IPv4 միջակայք",
					cidrv6: "IPv6 միջակայք",
					base64: "base64 ձևաչափով տող",
					base64url: "base64url ձևաչափով տող",
					json_string: "JSON տող",
					e164: "E.164 համար",
					jwt: "JWT",
					template_literal: "մուտք"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "թիվ",
					array: "զանգված"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue.expected}, ստացվել է ${received}`;
							return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Սխալ մուտքագրում․ սպասվում էր ${util.stringifyPrimitive(issue.values[1])}`;
							return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getArmenianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.many);
								return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} կունենա ${adj}${issue.maximum.toString()} ${unit}`;
							}
							return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} լինի ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getArmenianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.many);
								return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} կունենա ${adj}${issue.minimum.toString()} ${unit}`;
							}
							return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} լինի ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
							if (_issue.format === "ends_with") return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
							if (_issue.format === "includes") return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
							if (_issue.format === "regex") return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
							return `Սխալ ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue.divisor}-ի`;
						case "unrecognized_keys": return `Չճանաչված բանալի${issue.keys.length > 1 ? "ներ" : ""}. ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Սխալ բանալի ${withDefiniteArticle(issue.origin)}-ում`;
						case "invalid_union": return "Սխալ մուտքագրում";
						case "invalid_element": return `Սխալ արժեք ${withDefiniteArticle(issue.origin)}-ում`;
						default: return `Սխալ մուտքագրում`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/id.cjs
		var require_id = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "karakter",
						verb: "memiliki"
					},
					file: {
						unit: "byte",
						verb: "memiliki"
					},
					array: {
						unit: "item",
						verb: "memiliki"
					},
					set: {
						unit: "item",
						verb: "memiliki"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "alamat email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "tanggal dan waktu format ISO",
					date: "tanggal format ISO",
					time: "jam format ISO",
					duration: "durasi format ISO",
					ipv4: "alamat IPv4",
					ipv6: "alamat IPv6",
					cidrv4: "rentang alamat IPv4",
					cidrv6: "rentang alamat IPv6",
					base64: "string dengan enkode base64",
					base64url: "string dengan enkode base64url",
					json_string: "string JSON",
					e164: "angka E.164",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Input tidak valid: diharapkan instanceof ${issue.expected}, diterima ${received}`;
							return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Input tidak valid: diharapkan ${util.stringifyPrimitive(issue.values[0])}`;
							return `Pilihan tidak valid: diharapkan salah satu dari ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
							return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
							if (_issue.format === "includes") return `String tidak valid: harus menyertakan "${_issue.includes}"`;
							if (_issue.format === "regex") return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} tidak valid`;
						}
						case "not_multiple_of": return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
						case "unrecognized_keys": return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Kunci tidak valid di ${issue.origin}`;
						case "invalid_union": return "Input tidak valid";
						case "invalid_element": return `Nilai tidak valid di ${issue.origin}`;
						default: return `Input tidak valid`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/is.cjs
		var require_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "stafi",
						verb: "að hafa"
					},
					file: {
						unit: "bæti",
						verb: "að hafa"
					},
					array: {
						unit: "hluti",
						verb: "að hafa"
					},
					set: {
						unit: "hluti",
						verb: "að hafa"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "gildi",
					email: "netfang",
					url: "vefslóð",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO dagsetning og tími",
					date: "ISO dagsetning",
					time: "ISO tími",
					duration: "ISO tímalengd",
					ipv4: "IPv4 address",
					ipv6: "IPv6 address",
					cidrv4: "IPv4 range",
					cidrv6: "IPv6 range",
					base64: "base64-encoded strengur",
					base64url: "base64url-encoded strengur",
					json_string: "JSON strengur",
					e164: "E.164 tölugildi",
					jwt: "JWT",
					template_literal: "gildi"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "númer",
					array: "fylki"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue.expected}`;
							return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Rangt gildi: gert ráð fyrir ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ógilt val: má vera eitt af eftirfarandi ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
							return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
							if (_issue.format === "regex") return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
							return `Rangt ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
						case "unrecognized_keys": return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Rangur lykill í ${issue.origin}`;
						case "invalid_union": return "Rangt gildi";
						case "invalid_element": return `Rangt gildi í ${issue.origin}`;
						default: return `Rangt gildi`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/it.cjs
		var require_it = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caratteri",
						verb: "avere"
					},
					file: {
						unit: "byte",
						verb: "avere"
					},
					array: {
						unit: "elementi",
						verb: "avere"
					},
					set: {
						unit: "elementi",
						verb: "avere"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "indirizzo email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "data e ora ISO",
					date: "data ISO",
					time: "ora ISO",
					duration: "durata ISO",
					ipv4: "indirizzo IPv4",
					ipv6: "indirizzo IPv6",
					cidrv4: "intervallo IPv4",
					cidrv6: "intervallo IPv6",
					base64: "stringa codificata in base64",
					base64url: "URL codificata in base64",
					json_string: "stringa JSON",
					e164: "numero E.164",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "numero",
					array: "vettore"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Input non valido: atteso instanceof ${issue.expected}, ricevuto ${received}`;
							return `Input non valido: atteso ${expected}, ricevuto ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Input non valido: atteso ${util.stringifyPrimitive(issue.values[0])}`;
							return `Opzione non valida: atteso uno tra ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
							return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Stringa non valida: deve includere "${_issue.includes}"`;
							if (_issue.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
							return `Input non valido: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
						case "unrecognized_keys": return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Chiave non valida in ${issue.origin}`;
						case "invalid_union": return "Input non valido";
						case "invalid_element": return `Valore non valido in ${issue.origin}`;
						default: return `Input non valido`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ja.cjs
		var require_ja = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "文字",
						verb: "である"
					},
					file: {
						unit: "バイト",
						verb: "である"
					},
					array: {
						unit: "要素",
						verb: "である"
					},
					set: {
						unit: "要素",
						verb: "である"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "入力値",
					email: "メールアドレス",
					url: "URL",
					emoji: "絵文字",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO日時",
					date: "ISO日付",
					time: "ISO時刻",
					duration: "ISO期間",
					ipv4: "IPv4アドレス",
					ipv6: "IPv6アドレス",
					cidrv4: "IPv4範囲",
					cidrv6: "IPv6範囲",
					base64: "base64エンコード文字列",
					base64url: "base64urlエンコード文字列",
					json_string: "JSON文字列",
					e164: "E.164番号",
					jwt: "JWT",
					template_literal: "入力値"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "数値",
					array: "配列"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `無効な入力: instanceof ${issue.expected}が期待されましたが、${received}が入力されました`;
							return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `無効な入力: ${util.stringifyPrimitive(issue.values[0])}が期待されました`;
							return `無効な選択: ${util.joinValues(issue.values, "、")}のいずれかである必要があります`;
						case "too_big": {
							const adj = issue.inclusive ? "以下である" : "より小さい";
							const sizing = getSizing(issue.origin);
							if (sizing) return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
							return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
						}
						case "too_small": {
							const adj = issue.inclusive ? "以上である" : "より大きい";
							const sizing = getSizing(issue.origin);
							if (sizing) return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
							return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
							if (_issue.format === "ends_with") return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
							if (_issue.format === "includes") return `無効な文字列: "${_issue.includes}"を含む必要があります`;
							if (_issue.format === "regex") return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
							return `無効な${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `無効な数値: ${issue.divisor}の倍数である必要があります`;
						case "unrecognized_keys": return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${util.joinValues(issue.keys, "、")}`;
						case "invalid_key": return `${issue.origin}内の無効なキー`;
						case "invalid_union": return "無効な入力";
						case "invalid_element": return `${issue.origin}内の無効な値`;
						default: return `無効な入力`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ka.cjs
		var require_ka = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "სიმბოლო",
						verb: "უნდა შეიცავდეს"
					},
					file: {
						unit: "ბაიტი",
						verb: "უნდა შეიცავდეს"
					},
					array: {
						unit: "ელემენტი",
						verb: "უნდა შეიცავდეს"
					},
					set: {
						unit: "ელემენტი",
						verb: "უნდა შეიცავდეს"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "შეყვანა",
					email: "ელ-ფოსტის მისამართი",
					url: "URL",
					emoji: "ემოჯი",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "თარიღი-დრო",
					date: "თარიღი",
					time: "დრო",
					duration: "ხანგრძლივობა",
					ipv4: "IPv4 მისამართი",
					ipv6: "IPv6 მისამართი",
					cidrv4: "IPv4 დიაპაზონი",
					cidrv6: "IPv6 დიაპაზონი",
					base64: "base64-კოდირებული ველი",
					base64url: "base64url-კოდირებული ველი",
					json_string: "JSON ველი",
					e164: "E.164 ნომერი",
					jwt: "JWT",
					template_literal: "შეყვანა"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "რიცხვი",
					string: "ველი",
					boolean: "ბულეანი",
					function: "ფუნქცია",
					array: "მასივი"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue.expected}, მიღებული ${received}`;
							return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `არასწორი შეყვანა: მოსალოდნელი ${util.stringifyPrimitive(issue.values[0])}`;
							return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${util.joinValues(issue.values, "|")}-დან`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
							return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} იყოს ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
							if (_issue.format === "ends_with") return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
							if (_issue.format === "includes") return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
							if (_issue.format === "regex") return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
							return `არასწორი ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `არასწორი რიცხვი: უნდა იყოს ${issue.divisor}-ის ჯერადი`;
						case "unrecognized_keys": return `უცნობი გასაღებ${issue.keys.length > 1 ? "ები" : "ი"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `არასწორი გასაღები ${issue.origin}-ში`;
						case "invalid_union": return "არასწორი შეყვანა";
						case "invalid_element": return `არასწორი მნიშვნელობა ${issue.origin}-ში`;
						default: return `არასწორი შეყვანა`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/km.cjs
		var require_km = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "តួអក្សរ",
						verb: "គួរមាន"
					},
					file: {
						unit: "បៃ",
						verb: "គួរមាន"
					},
					array: {
						unit: "ធាតុ",
						verb: "គួរមាន"
					},
					set: {
						unit: "ធាតុ",
						verb: "គួរមាន"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ទិន្នន័យបញ្ចូល",
					email: "អាសយដ្ឋានអ៊ីមែល",
					url: "URL",
					emoji: "សញ្ញាអារម្មណ៍",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
					date: "កាលបរិច្ឆេទ ISO",
					time: "ម៉ោង ISO",
					duration: "រយៈពេល ISO",
					ipv4: "អាសយដ្ឋាន IPv4",
					ipv6: "អាសយដ្ឋាន IPv6",
					cidrv4: "ដែនអាសយដ្ឋាន IPv4",
					cidrv6: "ដែនអាសយដ្ឋាន IPv6",
					base64: "ខ្សែអក្សរអ៊ិកូដ base64",
					base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
					json_string: "ខ្សែអក្សរ JSON",
					e164: "លេខ E.164",
					jwt: "JWT",
					template_literal: "ទិន្នន័យបញ្ចូល"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "លេខ",
					array: "អារេ (Array)",
					null: "គ្មានតម្លៃ (null)"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue.expected} ប៉ុន្តែទទួលបាន ${received}`;
							return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${util.stringifyPrimitive(issue.values[0])}`;
							return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
							return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
							return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
							if (_issue.format === "includes") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
							if (_issue.format === "regex") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
							return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
						case "unrecognized_keys": return `រកឃើញសោមិនស្គាល់៖ ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
						case "invalid_union": return `ទិន្នន័យមិនត្រឹមត្រូវ`;
						case "invalid_element": return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
						default: return `ទិន្នន័យមិនត្រឹមត្រូវ`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/kh.cjs
		var require_kh = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __importDefault = exports && exports.__importDefault || function(mod) {
				return mod && mod.__esModule ? mod : { "default": mod };
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const km_js_1 = __importDefault(require_km());
			/** @deprecated Use `km` instead. */
			function default_1() {
				return (0, km_js_1.default)();
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ko.cjs
		var require_ko = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "문자",
						verb: "to have"
					},
					file: {
						unit: "바이트",
						verb: "to have"
					},
					array: {
						unit: "개",
						verb: "to have"
					},
					set: {
						unit: "개",
						verb: "to have"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "입력",
					email: "이메일 주소",
					url: "URL",
					emoji: "이모지",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO 날짜시간",
					date: "ISO 날짜",
					time: "ISO 시간",
					duration: "ISO 기간",
					ipv4: "IPv4 주소",
					ipv6: "IPv6 주소",
					cidrv4: "IPv4 범위",
					cidrv6: "IPv6 범위",
					base64: "base64 인코딩 문자열",
					base64url: "base64url 인코딩 문자열",
					json_string: "JSON 문자열",
					e164: "E.164 번호",
					jwt: "JWT",
					template_literal: "입력"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `잘못된 입력: 예상 타입은 instanceof ${issue.expected}, 받은 타입은 ${received}입니다`;
							return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `잘못된 입력: 값은 ${util.stringifyPrimitive(issue.values[0])} 이어야 합니다`;
							return `잘못된 옵션: ${util.joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
						case "too_big": {
							const adj = issue.inclusive ? "이하" : "미만";
							const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
							const sizing = getSizing(issue.origin);
							const unit = sizing?.unit ?? "요소";
							if (sizing) return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
							return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? "이상" : "초과";
							const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
							const sizing = getSizing(issue.origin);
							const unit = sizing?.unit ?? "요소";
							if (sizing) return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
							return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
							if (_issue.format === "ends_with") return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
							if (_issue.format === "includes") return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
							if (_issue.format === "regex") return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
							return `잘못된 ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
						case "unrecognized_keys": return `인식할 수 없는 키: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `잘못된 키: ${issue.origin}`;
						case "invalid_union": return `잘못된 입력`;
						case "invalid_element": return `잘못된 값: ${issue.origin}`;
						default: return `잘못된 입력`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/lt.cjs
		var require_lt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const capitalizeFirstCharacter = (text) => {
				return text.charAt(0).toUpperCase() + text.slice(1);
			};
			function getUnitTypeFromNumber(number) {
				const abs = Math.abs(number);
				const last = abs % 10;
				const last2 = abs % 100;
				if (last2 >= 11 && last2 <= 19 || last === 0) return "many";
				if (last === 1) return "one";
				return "few";
			}
			const error = () => {
				const Sizable = {
					string: {
						unit: {
							one: "simbolis",
							few: "simboliai",
							many: "simbolių"
						},
						verb: {
							smaller: {
								inclusive: "turi būti ne ilgesnė kaip",
								notInclusive: "turi būti trumpesnė kaip"
							},
							bigger: {
								inclusive: "turi būti ne trumpesnė kaip",
								notInclusive: "turi būti ilgesnė kaip"
							}
						}
					},
					file: {
						unit: {
							one: "baitas",
							few: "baitai",
							many: "baitų"
						},
						verb: {
							smaller: {
								inclusive: "turi būti ne didesnis kaip",
								notInclusive: "turi būti mažesnis kaip"
							},
							bigger: {
								inclusive: "turi būti ne mažesnis kaip",
								notInclusive: "turi būti didesnis kaip"
							}
						}
					},
					array: {
						unit: {
							one: "elementą",
							few: "elementus",
							many: "elementų"
						},
						verb: {
							smaller: {
								inclusive: "turi turėti ne daugiau kaip",
								notInclusive: "turi turėti mažiau kaip"
							},
							bigger: {
								inclusive: "turi turėti ne mažiau kaip",
								notInclusive: "turi turėti daugiau kaip"
							}
						}
					},
					set: {
						unit: {
							one: "elementą",
							few: "elementus",
							many: "elementų"
						},
						verb: {
							smaller: {
								inclusive: "turi turėti ne daugiau kaip",
								notInclusive: "turi turėti mažiau kaip"
							},
							bigger: {
								inclusive: "turi turėti ne mažiau kaip",
								notInclusive: "turi turėti daugiau kaip"
							}
						}
					}
				};
				function getSizing(origin, unitType, inclusive, targetShouldBe) {
					const result = Sizable[origin] ?? null;
					if (result === null) return result;
					return {
						unit: result.unit[unitType],
						verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
					};
				}
				const FormatDictionary = {
					regex: "įvestis",
					email: "el. pašto adresas",
					url: "URL",
					emoji: "jaustukas",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO data ir laikas",
					date: "ISO data",
					time: "ISO laikas",
					duration: "ISO trukmė",
					ipv4: "IPv4 adresas",
					ipv6: "IPv6 adresas",
					cidrv4: "IPv4 tinklo prefiksas (CIDR)",
					cidrv6: "IPv6 tinklo prefiksas (CIDR)",
					base64: "base64 užkoduota eilutė",
					base64url: "base64url užkoduota eilutė",
					json_string: "JSON eilutė",
					e164: "E.164 numeris",
					jwt: "JWT",
					template_literal: "įvestis"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "skaičius",
					bigint: "sveikasis skaičius",
					string: "eilutė",
					boolean: "loginė reikšmė",
					undefined: "neapibrėžta reikšmė",
					function: "funkcija",
					symbol: "simbolis",
					array: "masyvas",
					object: "objektas",
					null: "nulinė reikšmė"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue.expected}`;
							return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Privalo būti ${util.stringifyPrimitive(issue.values[0])}`;
							return `Privalo būti vienas iš ${util.joinValues(issue.values, "|")} pasirinkimų`;
						case "too_big": {
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.maximum)), issue.inclusive ?? false, "smaller");
							if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.maximum.toString()} ${sizing.unit ?? "elementų"}`;
							const adj = issue.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
							return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.maximum.toString()} ${sizing?.unit}`;
						}
						case "too_small": {
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.minimum)), issue.inclusive ?? false, "bigger");
							if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.minimum.toString()} ${sizing.unit ?? "elementų"}`;
							const adj = issue.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
							return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.minimum.toString()} ${sizing?.unit}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Eilutė privalo prasidėti "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Eilutė privalo įtraukti "${_issue.includes}"`;
							if (_issue.format === "regex") return `Eilutė privalo atitikti ${_issue.pattern}`;
							return `Neteisingas ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Skaičius privalo būti ${issue.divisor} kartotinis.`;
						case "unrecognized_keys": return `Neatpažint${issue.keys.length > 1 ? "i" : "as"} rakt${issue.keys.length > 1 ? "ai" : "as"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return "Rastas klaidingas raktas";
						case "invalid_union": return "Klaidinga įvestis";
						case "invalid_element": {
							const origin = TypeDictionary[issue.origin] ?? issue.origin;
							return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi klaidingą įvestį`;
						}
						default: return "Klaidinga įvestis";
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/mk.cjs
		var require_mk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "знаци",
						verb: "да имаат"
					},
					file: {
						unit: "бајти",
						verb: "да имаат"
					},
					array: {
						unit: "ставки",
						verb: "да имаат"
					},
					set: {
						unit: "ставки",
						verb: "да имаат"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "внес",
					email: "адреса на е-пошта",
					url: "URL",
					emoji: "емоџи",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO датум и време",
					date: "ISO датум",
					time: "ISO време",
					duration: "ISO времетраење",
					ipv4: "IPv4 адреса",
					ipv6: "IPv6 адреса",
					cidrv4: "IPv4 опсег",
					cidrv6: "IPv6 опсег",
					base64: "base64-енкодирана низа",
					base64url: "base64url-енкодирана низа",
					json_string: "JSON низа",
					e164: "E.164 број",
					jwt: "JWT",
					template_literal: "внес"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "број",
					array: "низа"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Грешен внес: се очекува instanceof ${issue.expected}, примено ${received}`;
							return `Грешен внес: се очекува ${expected}, примено ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
							return `Грешана опција: се очекува една ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
							return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
							if (_issue.format === "regex") return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
							return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Грешен број: мора да биде делив со ${issue.divisor}`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Грешен клуч во ${issue.origin}`;
						case "invalid_union": return "Грешен внес";
						case "invalid_element": return `Грешна вредност во ${issue.origin}`;
						default: return `Грешен внес`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ms.cjs
		var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "aksara",
						verb: "mempunyai"
					},
					file: {
						unit: "bait",
						verb: "mempunyai"
					},
					array: {
						unit: "elemen",
						verb: "mempunyai"
					},
					set: {
						unit: "elemen",
						verb: "mempunyai"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "alamat e-mel",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "tarikh masa ISO",
					date: "tarikh ISO",
					time: "masa ISO",
					duration: "tempoh ISO",
					ipv4: "alamat IPv4",
					ipv6: "alamat IPv6",
					cidrv4: "julat IPv4",
					cidrv6: "julat IPv6",
					base64: "string dikodkan base64",
					base64url: "string dikodkan base64url",
					json_string: "string JSON",
					e164: "nombor E.164",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "nombor"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Input tidak sah: dijangka instanceof ${issue.expected}, diterima ${received}`;
							return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Input tidak sah: dijangka ${util.stringifyPrimitive(issue.values[0])}`;
							return `Pilihan tidak sah: dijangka salah satu daripada ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
							return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
							if (_issue.format === "includes") return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
							if (_issue.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} tidak sah`;
						}
						case "not_multiple_of": return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
						case "unrecognized_keys": return `Kunci tidak dikenali: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Kunci tidak sah dalam ${issue.origin}`;
						case "invalid_union": return "Input tidak sah";
						case "invalid_element": return `Nilai tidak sah dalam ${issue.origin}`;
						default: return `Input tidak sah`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/nl.cjs
		var require_nl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "tekens",
						verb: "heeft"
					},
					file: {
						unit: "bytes",
						verb: "heeft"
					},
					array: {
						unit: "elementen",
						verb: "heeft"
					},
					set: {
						unit: "elementen",
						verb: "heeft"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "invoer",
					email: "emailadres",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO datum en tijd",
					date: "ISO datum",
					time: "ISO tijd",
					duration: "ISO duur",
					ipv4: "IPv4-adres",
					ipv6: "IPv6-adres",
					cidrv4: "IPv4-bereik",
					cidrv6: "IPv6-bereik",
					base64: "base64-gecodeerde tekst",
					base64url: "base64 URL-gecodeerde tekst",
					json_string: "JSON string",
					e164: "E.164-nummer",
					jwt: "JWT",
					template_literal: "invoer"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "getal"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}`;
							return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ongeldige invoer: verwacht ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ongeldige optie: verwacht één van ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							const longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";
							if (sizing) return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
							return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							const shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";
							if (sizing) return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
							return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
							if (_issue.format === "ends_with") return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
							if (_issue.format === "includes") return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
							if (_issue.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
							return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
						case "unrecognized_keys": return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Ongeldige key in ${issue.origin}`;
						case "invalid_union": return "Ongeldige invoer";
						case "invalid_element": return `Ongeldige waarde in ${issue.origin}`;
						default: return `Ongeldige invoer`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/no.cjs
		var require_no = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "tegn",
						verb: "å ha"
					},
					file: {
						unit: "bytes",
						verb: "å ha"
					},
					array: {
						unit: "elementer",
						verb: "å inneholde"
					},
					set: {
						unit: "elementer",
						verb: "å inneholde"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "input",
					email: "e-postadresse",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO dato- og klokkeslett",
					date: "ISO-dato",
					time: "ISO-klokkeslett",
					duration: "ISO-varighet",
					ipv4: "IPv4-område",
					ipv6: "IPv6-område",
					cidrv4: "IPv4-spekter",
					cidrv6: "IPv6-spekter",
					base64: "base64-enkodet streng",
					base64url: "base64url-enkodet streng",
					json_string: "JSON-streng",
					e164: "E.164-nummer",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "tall",
					array: "liste"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ugyldig input: forventet instanceof ${issue.expected}, fikk ${received}`;
							return `Ugyldig input: forventet ${expected}, fikk ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ugyldig verdi: forventet ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ugyldig valg: forventet en av ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
							return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ugyldig streng: må starte med "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Ugyldig streng: må ende med "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Ugyldig streng: må inneholde "${_issue.includes}"`;
							if (_issue.format === "regex") return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
							return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Ugyldig nøkkel i ${issue.origin}`;
						case "invalid_union": return "Ugyldig input";
						case "invalid_element": return `Ugyldig verdi i ${issue.origin}`;
						default: return `Ugyldig input`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ota.cjs
		var require_ota = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "harf",
						verb: "olmalıdır"
					},
					file: {
						unit: "bayt",
						verb: "olmalıdır"
					},
					array: {
						unit: "unsur",
						verb: "olmalıdır"
					},
					set: {
						unit: "unsur",
						verb: "olmalıdır"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "giren",
					email: "epostagâh",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO hengâmı",
					date: "ISO tarihi",
					time: "ISO zamanı",
					duration: "ISO müddeti",
					ipv4: "IPv4 nişânı",
					ipv6: "IPv6 nişânı",
					cidrv4: "IPv4 menzili",
					cidrv6: "IPv6 menzili",
					base64: "base64-şifreli metin",
					base64url: "base64url-şifreli metin",
					json_string: "JSON metin",
					e164: "E.164 sayısı",
					jwt: "JWT",
					template_literal: "giren"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "numara",
					array: "saf",
					null: "gayb"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Fâsit giren: umulan instanceof ${issue.expected}, alınan ${received}`;
							return `Fâsit giren: umulan ${expected}, alınan ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Fâsit giren: umulan ${util.stringifyPrimitive(issue.values[0])}`;
							return `Fâsit tercih: mûteberler ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
							return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
							return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
							if (_issue.format === "ends_with") return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
							if (_issue.format === "includes") return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
							if (_issue.format === "regex") return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
							return `Fâsit ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
						case "unrecognized_keys": return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} için tanınmayan anahtar var.`;
						case "invalid_union": return "Giren tanınamadı.";
						case "invalid_element": return `${issue.origin} için tanınmayan kıymet var.`;
						default: return `Kıymet tanınamadı.`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ps.cjs
		var require_ps = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "توکي",
						verb: "ولري"
					},
					file: {
						unit: "بایټس",
						verb: "ولري"
					},
					array: {
						unit: "توکي",
						verb: "ولري"
					},
					set: {
						unit: "توکي",
						verb: "ولري"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ورودي",
					email: "بریښنالیک",
					url: "یو آر ال",
					emoji: "ایموجي",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "نیټه او وخت",
					date: "نېټه",
					time: "وخت",
					duration: "موده",
					ipv4: "د IPv4 پته",
					ipv6: "د IPv6 پته",
					cidrv4: "د IPv4 ساحه",
					cidrv6: "د IPv6 ساحه",
					base64: "base64-encoded متن",
					base64url: "base64url-encoded متن",
					json_string: "JSON متن",
					e164: "د E.164 شمېره",
					jwt: "JWT",
					template_literal: "ورودي"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "عدد",
					array: "ارې"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `ناسم ورودي: باید instanceof ${issue.expected} وای, مګر ${received} ترلاسه شو`;
							return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `ناسم ورودي: باید ${util.stringifyPrimitive(issue.values[0])} وای`;
							return `ناسم انتخاب: باید یو له ${util.joinValues(issue.values, "|")} څخه وای`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
							return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
							return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
							if (_issue.format === "ends_with") return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
							if (_issue.format === "includes") return `ناسم متن: باید "${_issue.includes}" ولري`;
							if (_issue.format === "regex") return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
							return `${FormatDictionary[_issue.format] ?? issue.format} ناسم دی`;
						}
						case "not_multiple_of": return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
						case "unrecognized_keys": return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `ناسم کلیډ په ${issue.origin} کې`;
						case "invalid_union": return `ناسمه ورودي`;
						case "invalid_element": return `ناسم عنصر په ${issue.origin} کې`;
						default: return `ناسمه ورودي`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/pl.cjs
		var require_pl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "znaków",
						verb: "mieć"
					},
					file: {
						unit: "bajtów",
						verb: "mieć"
					},
					array: {
						unit: "elementów",
						verb: "mieć"
					},
					set: {
						unit: "elementów",
						verb: "mieć"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "wyrażenie",
					email: "adres email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "data i godzina w formacie ISO",
					date: "data w formacie ISO",
					time: "godzina w formacie ISO",
					duration: "czas trwania ISO",
					ipv4: "adres IPv4",
					ipv6: "adres IPv6",
					cidrv4: "zakres IPv4",
					cidrv6: "zakres IPv6",
					base64: "ciąg znaków zakodowany w formacie base64",
					base64url: "ciąg znaków zakodowany w formacie base64url",
					json_string: "ciąg znaków w formacie JSON",
					e164: "liczba E.164",
					jwt: "JWT",
					template_literal: "wejście"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "liczba",
					array: "tablica"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue.expected}, otrzymano ${received}`;
							return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Nieprawidłowe dane wejściowe: oczekiwano ${util.stringifyPrimitive(issue.values[0])}`;
							return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
							return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
							return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
							if (_issue.format === "regex") return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
							return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
						case "unrecognized_keys": return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Nieprawidłowy klucz w ${issue.origin}`;
						case "invalid_union": return "Nieprawidłowe dane wejściowe";
						case "invalid_element": return `Nieprawidłowa wartość w ${issue.origin}`;
						default: return `Nieprawidłowe dane wejściowe`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/pt.cjs
		var require_pt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caracteres",
						verb: "ter"
					},
					file: {
						unit: "bytes",
						verb: "ter"
					},
					array: {
						unit: "itens",
						verb: "ter"
					},
					set: {
						unit: "itens",
						verb: "ter"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "padrão",
					email: "endereço de e-mail",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "data e hora ISO",
					date: "data ISO",
					time: "hora ISO",
					duration: "duração ISO",
					ipv4: "endereço IPv4",
					ipv6: "endereço IPv6",
					cidrv4: "faixa de IPv4",
					cidrv6: "faixa de IPv6",
					base64: "texto codificado em base64",
					base64url: "URL codificada em base64",
					json_string: "texto JSON",
					e164: "número E.164",
					jwt: "JWT",
					template_literal: "entrada"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "número",
					null: "nulo"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Tipo inválido: esperado instanceof ${issue.expected}, recebido ${received}`;
							return `Tipo inválido: esperado ${expected}, recebido ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Entrada inválida: esperado ${util.stringifyPrimitive(issue.values[0])}`;
							return `Opção inválida: esperada uma das ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Muito grande: esperado que ${issue.origin ?? "valor"} tivesse ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
							return `Muito grande: esperado que ${issue.origin ?? "valor"} fosse ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Muito pequeno: esperado que ${issue.origin} tivesse ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Muito pequeno: esperado que ${issue.origin} fosse ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Texto inválido: deve começar com "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Texto inválido: deve terminar com "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Texto inválido: deve incluir "${_issue.includes}"`;
							if (_issue.format === "regex") return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} inválido`;
						}
						case "not_multiple_of": return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
						case "unrecognized_keys": return `Chave${issue.keys.length > 1 ? "s" : ""} desconhecida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Chave inválida em ${issue.origin}`;
						case "invalid_union": return "Entrada inválida";
						case "invalid_element": return `Valor inválido em ${issue.origin}`;
						default: return `Campo inválido`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ro.cjs
		var require_ro = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "caractere",
						verb: "să aibă"
					},
					file: {
						unit: "octeți",
						verb: "să aibă"
					},
					array: {
						unit: "elemente",
						verb: "să aibă"
					},
					set: {
						unit: "elemente",
						verb: "să aibă"
					},
					map: {
						unit: "intrări",
						verb: "să aibă"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "intrare",
					email: "adresă de email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "dată și oră ISO",
					date: "dată ISO",
					time: "oră ISO",
					duration: "durată ISO",
					ipv4: "adresă IPv4",
					ipv6: "adresă IPv6",
					mac: "adresă MAC",
					cidrv4: "interval IPv4",
					cidrv6: "interval IPv6",
					base64: "șir codat base64",
					base64url: "șir codat base64url",
					json_string: "șir JSON",
					e164: "număr E.164",
					jwt: "JWT",
					template_literal: "intrare"
				};
				const TypeDictionary = {
					nan: "NaN",
					string: "șir",
					number: "număr",
					boolean: "boolean",
					function: "funcție",
					array: "matrice",
					object: "obiect",
					undefined: "nedefinit",
					symbol: "simbol",
					bigint: "număr mare",
					void: "void",
					never: "never",
					map: "hartă",
					set: "set"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							return `Intrare invalidă: așteptat ${expected}, primit ${TypeDictionary[receivedType] ?? receivedType}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Intrare invalidă: așteptat ${util.stringifyPrimitive(issue.values[0])}`;
							return `Opțiune invalidă: așteptat una dintre ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemente"}`;
							return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} să fie ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Prea mic: așteptat ca ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Prea mic: așteptat ca ${issue.origin} să fie ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Șir invalid: trebuie să includă "${_issue.includes}"`;
							if (_issue.format === "regex") return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
							return `Format invalid: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Număr invalid: trebuie să fie multiplu de ${issue.divisor}`;
						case "unrecognized_keys": return `Chei nerecunoscute: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Cheie invalidă în ${issue.origin}`;
						case "invalid_union": return "Intrare invalidă";
						case "invalid_element": return `Valoare invalidă în ${issue.origin}`;
						default: return `Intrare invalidă`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ru.cjs
		var require_ru = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			function getRussianPlural(count, one, few, many) {
				const absCount = Math.abs(count);
				const lastDigit = absCount % 10;
				const lastTwoDigits = absCount % 100;
				if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
				if (lastDigit === 1) return one;
				if (lastDigit >= 2 && lastDigit <= 4) return few;
				return many;
			}
			const error = () => {
				const Sizable = {
					string: {
						unit: {
							one: "символ",
							few: "символа",
							many: "символов"
						},
						verb: "иметь"
					},
					file: {
						unit: {
							one: "байт",
							few: "байта",
							many: "байт"
						},
						verb: "иметь"
					},
					array: {
						unit: {
							one: "элемент",
							few: "элемента",
							many: "элементов"
						},
						verb: "иметь"
					},
					set: {
						unit: {
							one: "элемент",
							few: "элемента",
							many: "элементов"
						},
						verb: "иметь"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ввод",
					email: "email адрес",
					url: "URL",
					emoji: "эмодзи",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO дата и время",
					date: "ISO дата",
					time: "ISO время",
					duration: "ISO длительность",
					ipv4: "IPv4 адрес",
					ipv6: "IPv6 адрес",
					cidrv4: "IPv4 диапазон",
					cidrv6: "IPv6 диапазон",
					base64: "строка в формате base64",
					base64url: "строка в формате base64url",
					json_string: "JSON строка",
					e164: "номер E.164",
					jwt: "JWT",
					template_literal: "ввод"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "число",
					array: "массив"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Неверный ввод: ожидалось instanceof ${issue.expected}, получено ${received}`;
							return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Неверный ввод: ожидалось ${util.stringifyPrimitive(issue.values[0])}`;
							return `Неверный вариант: ожидалось одно из ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getRussianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
								return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
							}
							return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) {
								const unit = getRussianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
								return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
							}
							return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Неверная строка: должна содержать "${_issue.includes}"`;
							if (_issue.format === "regex") return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
							return `Неверный ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Неверное число: должно быть кратным ${issue.divisor}`;
						case "unrecognized_keys": return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Неверный ключ в ${issue.origin}`;
						case "invalid_union": return "Неверные входные данные";
						case "invalid_element": return `Неверное значение в ${issue.origin}`;
						default: return `Неверные входные данные`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/sl.cjs
		var require_sl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "znakov",
						verb: "imeti"
					},
					file: {
						unit: "bajtov",
						verb: "imeti"
					},
					array: {
						unit: "elementov",
						verb: "imeti"
					},
					set: {
						unit: "elementov",
						verb: "imeti"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "vnos",
					email: "e-poštni naslov",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO datum in čas",
					date: "ISO datum",
					time: "ISO čas",
					duration: "ISO trajanje",
					ipv4: "IPv4 naslov",
					ipv6: "IPv6 naslov",
					cidrv4: "obseg IPv4",
					cidrv6: "obseg IPv6",
					base64: "base64 kodiran niz",
					base64url: "base64url kodiran niz",
					json_string: "JSON niz",
					e164: "E.164 številka",
					jwt: "JWT",
					template_literal: "vnos"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "število",
					array: "tabela"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Neveljaven vnos: pričakovano instanceof ${issue.expected}, prejeto ${received}`;
							return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Neveljaven vnos: pričakovano ${util.stringifyPrimitive(issue.values[0])}`;
							return `Neveljavna možnost: pričakovano eno izmed ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
							return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
							if (_issue.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
							return `Neveljaven ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
						case "unrecognized_keys": return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Neveljaven ključ v ${issue.origin}`;
						case "invalid_union": return "Neveljaven vnos";
						case "invalid_element": return `Neveljavna vrednost v ${issue.origin}`;
						default: return "Neveljaven vnos";
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/sv.cjs
		var require_sv = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "tecken",
						verb: "att ha"
					},
					file: {
						unit: "bytes",
						verb: "att ha"
					},
					array: {
						unit: "objekt",
						verb: "att innehålla"
					},
					set: {
						unit: "objekt",
						verb: "att innehålla"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "reguljärt uttryck",
					email: "e-postadress",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO-datum och tid",
					date: "ISO-datum",
					time: "ISO-tid",
					duration: "ISO-varaktighet",
					ipv4: "IPv4-intervall",
					ipv6: "IPv6-intervall",
					cidrv4: "IPv4-spektrum",
					cidrv6: "IPv6-spektrum",
					base64: "base64-kodad sträng",
					base64url: "base64url-kodad sträng",
					json_string: "JSON-sträng",
					e164: "E.164-nummer",
					jwt: "JWT",
					template_literal: "mall-literal"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "antal",
					array: "lista"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ogiltig inmatning: förväntat instanceof ${issue.expected}, fick ${received}`;
							return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ogiltig inmatning: förväntat ${util.stringifyPrimitive(issue.values[0])}`;
							return `Ogiltigt val: förväntade en av ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
							return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
							if (_issue.format === "regex") return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
							return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
						case "unrecognized_keys": return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
						case "invalid_union": return "Ogiltig input";
						case "invalid_element": return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
						default: return `Ogiltig input`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ta.cjs
		var require_ta = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "எழுத்துக்கள்",
						verb: "கொண்டிருக்க வேண்டும்"
					},
					file: {
						unit: "பைட்டுகள்",
						verb: "கொண்டிருக்க வேண்டும்"
					},
					array: {
						unit: "உறுப்புகள்",
						verb: "கொண்டிருக்க வேண்டும்"
					},
					set: {
						unit: "உறுப்புகள்",
						verb: "கொண்டிருக்க வேண்டும்"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "உள்ளீடு",
					email: "மின்னஞ்சல் முகவரி",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO தேதி நேரம்",
					date: "ISO தேதி",
					time: "ISO நேரம்",
					duration: "ISO கால அளவு",
					ipv4: "IPv4 முகவரி",
					ipv6: "IPv6 முகவரி",
					cidrv4: "IPv4 வரம்பு",
					cidrv6: "IPv6 வரம்பு",
					base64: "base64-encoded சரம்",
					base64url: "base64url-encoded சரம்",
					json_string: "JSON சரம்",
					e164: "E.164 எண்",
					jwt: "JWT",
					template_literal: "input"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "எண்",
					array: "அணி",
					null: "வெறுமை"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue.expected}, பெறப்பட்டது ${received}`;
							return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${util.stringifyPrimitive(issue.values[0])}`;
							return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${util.joinValues(issue.values, "|")} இல் ஒன்று`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
							return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
							return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
							if (_issue.format === "ends_with") return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
							if (_issue.format === "includes") return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
							if (_issue.format === "regex") return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
							return `தவறான ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
						case "unrecognized_keys": return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} இல் தவறான விசை`;
						case "invalid_union": return "தவறான உள்ளீடு";
						case "invalid_element": return `${issue.origin} இல் தவறான மதிப்பு`;
						default: return `தவறான உள்ளீடு`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/th.cjs
		var require_th = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "ตัวอักษร",
						verb: "ควรมี"
					},
					file: {
						unit: "ไบต์",
						verb: "ควรมี"
					},
					array: {
						unit: "รายการ",
						verb: "ควรมี"
					},
					set: {
						unit: "รายการ",
						verb: "ควรมี"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ข้อมูลที่ป้อน",
					email: "ที่อยู่อีเมล",
					url: "URL",
					emoji: "อิโมจิ",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "วันที่เวลาแบบ ISO",
					date: "วันที่แบบ ISO",
					time: "เวลาแบบ ISO",
					duration: "ช่วงเวลาแบบ ISO",
					ipv4: "ที่อยู่ IPv4",
					ipv6: "ที่อยู่ IPv6",
					cidrv4: "ช่วง IP แบบ IPv4",
					cidrv6: "ช่วง IP แบบ IPv6",
					base64: "ข้อความแบบ Base64",
					base64url: "ข้อความแบบ Base64 สำหรับ URL",
					json_string: "ข้อความแบบ JSON",
					e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
					jwt: "โทเคน JWT",
					template_literal: "ข้อมูลที่ป้อน"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "ตัวเลข",
					array: "อาร์เรย์ (Array)",
					null: "ไม่มีค่า (null)"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue.expected} แต่ได้รับ ${received}`;
							return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `ค่าไม่ถูกต้อง: ควรเป็น ${util.stringifyPrimitive(issue.values[0])}`;
							return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
							const sizing = getSizing(issue.origin);
							if (sizing) return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
							return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
							const sizing = getSizing(issue.origin);
							if (sizing) return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
							return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
							if (_issue.format === "includes") return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
							if (_issue.format === "regex") return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
							return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
						case "unrecognized_keys": return `พบคีย์ที่ไม่รู้จัก: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
						case "invalid_union": return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
						case "invalid_element": return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
						default: return `ข้อมูลไม่ถูกต้อง`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/tr.cjs
		var require_tr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "karakter",
						verb: "olmalı"
					},
					file: {
						unit: "bayt",
						verb: "olmalı"
					},
					array: {
						unit: "öğe",
						verb: "olmalı"
					},
					set: {
						unit: "öğe",
						verb: "olmalı"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "girdi",
					email: "e-posta adresi",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO tarih ve saat",
					date: "ISO tarih",
					time: "ISO saat",
					duration: "ISO süre",
					ipv4: "IPv4 adresi",
					ipv6: "IPv6 adresi",
					cidrv4: "IPv4 aralığı",
					cidrv6: "IPv6 aralığı",
					base64: "base64 ile şifrelenmiş metin",
					base64url: "base64url ile şifrelenmiş metin",
					json_string: "JSON dizesi",
					e164: "E.164 sayısı",
					jwt: "JWT",
					template_literal: "Şablon dizesi"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Geçersiz değer: beklenen instanceof ${issue.expected}, alınan ${received}`;
							return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Geçersiz değer: beklenen ${util.stringifyPrimitive(issue.values[0])}`;
							return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
							return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
							if (_issue.format === "ends_with") return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
							if (_issue.format === "includes") return `Geçersiz metin: "${_issue.includes}" içermeli`;
							if (_issue.format === "regex") return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
							return `Geçersiz ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
						case "unrecognized_keys": return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} içinde geçersiz anahtar`;
						case "invalid_union": return "Geçersiz değer";
						case "invalid_element": return `${issue.origin} içinde geçersiz değer`;
						default: return `Geçersiz değer`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/uk.cjs
		var require_uk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "символів",
						verb: "матиме"
					},
					file: {
						unit: "байтів",
						verb: "матиме"
					},
					array: {
						unit: "елементів",
						verb: "матиме"
					},
					set: {
						unit: "елементів",
						verb: "матиме"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "вхідні дані",
					email: "адреса електронної пошти",
					url: "URL",
					emoji: "емодзі",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "дата та час ISO",
					date: "дата ISO",
					time: "час ISO",
					duration: "тривалість ISO",
					ipv4: "адреса IPv4",
					ipv6: "адреса IPv6",
					cidrv4: "діапазон IPv4",
					cidrv6: "діапазон IPv6",
					base64: "рядок у кодуванні base64",
					base64url: "рядок у кодуванні base64url",
					json_string: "рядок JSON",
					e164: "номер E.164",
					jwt: "JWT",
					template_literal: "вхідні дані"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "число",
					array: "масив"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Неправильні вхідні дані: очікується instanceof ${issue.expected}, отримано ${received}`;
							return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Неправильні вхідні дані: очікується ${util.stringifyPrimitive(issue.values[0])}`;
							return `Неправильна опція: очікується одне з ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
							return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Неправильний рядок: повинен містити "${_issue.includes}"`;
							if (_issue.format === "regex") return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
							return `Неправильний ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Неправильне число: повинно бути кратним ${issue.divisor}`;
						case "unrecognized_keys": return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Неправильний ключ у ${issue.origin}`;
						case "invalid_union": return "Неправильні вхідні дані";
						case "invalid_element": return `Неправильне значення у ${issue.origin}`;
						default: return `Неправильні вхідні дані`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ua.cjs
		var require_ua = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __importDefault = exports && exports.__importDefault || function(mod) {
				return mod && mod.__esModule ? mod : { "default": mod };
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const uk_js_1 = __importDefault(require_uk());
			/** @deprecated Use `uk` instead. */
			function default_1() {
				return (0, uk_js_1.default)();
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/ur.cjs
		var require_ur = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "حروف",
						verb: "ہونا"
					},
					file: {
						unit: "بائٹس",
						verb: "ہونا"
					},
					array: {
						unit: "آئٹمز",
						verb: "ہونا"
					},
					set: {
						unit: "آئٹمز",
						verb: "ہونا"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ان پٹ",
					email: "ای میل ایڈریس",
					url: "یو آر ایل",
					emoji: "ایموجی",
					uuid: "یو یو آئی ڈی",
					uuidv4: "یو یو آئی ڈی وی 4",
					uuidv6: "یو یو آئی ڈی وی 6",
					nanoid: "نینو آئی ڈی",
					guid: "جی یو آئی ڈی",
					cuid: "سی یو آئی ڈی",
					cuid2: "سی یو آئی ڈی 2",
					ulid: "یو ایل آئی ڈی",
					xid: "ایکس آئی ڈی",
					ksuid: "کے ایس یو آئی ڈی",
					datetime: "آئی ایس او ڈیٹ ٹائم",
					date: "آئی ایس او تاریخ",
					time: "آئی ایس او وقت",
					duration: "آئی ایس او مدت",
					ipv4: "آئی پی وی 4 ایڈریس",
					ipv6: "آئی پی وی 6 ایڈریس",
					cidrv4: "آئی پی وی 4 رینج",
					cidrv6: "آئی پی وی 6 رینج",
					base64: "بیس 64 ان کوڈڈ سٹرنگ",
					base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
					json_string: "جے ایس او این سٹرنگ",
					e164: "ای 164 نمبر",
					jwt: "جے ڈبلیو ٹی",
					template_literal: "ان پٹ"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "نمبر",
					array: "آرے",
					null: "نل"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `غلط ان پٹ: instanceof ${issue.expected} متوقع تھا، ${received} موصول ہوا`;
							return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `غلط ان پٹ: ${util.stringifyPrimitive(issue.values[0])} متوقع تھا`;
							return `غلط آپشن: ${util.joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
							return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
							return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
							if (_issue.format === "ends_with") return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
							if (_issue.format === "includes") return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
							if (_issue.format === "regex") return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
							return `غلط ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
						case "unrecognized_keys": return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${util.joinValues(issue.keys, "، ")}`;
						case "invalid_key": return `${issue.origin} میں غلط کی`;
						case "invalid_union": return "غلط ان پٹ";
						case "invalid_element": return `${issue.origin} میں غلط ویلیو`;
						default: return `غلط ان پٹ`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/uz.cjs
		var require_uz = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "belgi",
						verb: "bo‘lishi kerak"
					},
					file: {
						unit: "bayt",
						verb: "bo‘lishi kerak"
					},
					array: {
						unit: "element",
						verb: "bo‘lishi kerak"
					},
					set: {
						unit: "element",
						verb: "bo‘lishi kerak"
					},
					map: {
						unit: "yozuv",
						verb: "bo‘lishi kerak"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "kirish",
					email: "elektron pochta manzili",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO sana va vaqti",
					date: "ISO sana",
					time: "ISO vaqt",
					duration: "ISO davomiylik",
					ipv4: "IPv4 manzil",
					ipv6: "IPv6 manzil",
					mac: "MAC manzil",
					cidrv4: "IPv4 diapazon",
					cidrv6: "IPv6 diapazon",
					base64: "base64 kodlangan satr",
					base64url: "base64url kodlangan satr",
					json_string: "JSON satr",
					e164: "E.164 raqam",
					jwt: "JWT",
					template_literal: "kirish"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "raqam",
					array: "massiv"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Noto‘g‘ri kirish: kutilgan instanceof ${issue.expected}, qabul qilingan ${received}`;
							return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Noto‘g‘ri kirish: kutilgan ${util.stringifyPrimitive(issue.values[0])}`;
							return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
							return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
							return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
							if (_issue.format === "ends_with") return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
							if (_issue.format === "includes") return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
							if (_issue.format === "regex") return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
							return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Noto‘g‘ri raqam: ${issue.divisor} ning karralisi bo‘lishi kerak`;
						case "unrecognized_keys": return `Noma’lum kalit${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} dagi kalit noto‘g‘ri`;
						case "invalid_union": return "Noto‘g‘ri kirish";
						case "invalid_element": return `${issue.origin} da noto‘g‘ri qiymat`;
						default: return `Noto‘g‘ri kirish`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/vi.cjs
		var require_vi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "ký tự",
						verb: "có"
					},
					file: {
						unit: "byte",
						verb: "có"
					},
					array: {
						unit: "phần tử",
						verb: "có"
					},
					set: {
						unit: "phần tử",
						verb: "có"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "đầu vào",
					email: "địa chỉ email",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ngày giờ ISO",
					date: "ngày ISO",
					time: "giờ ISO",
					duration: "khoảng thời gian ISO",
					ipv4: "địa chỉ IPv4",
					ipv6: "địa chỉ IPv6",
					cidrv4: "dải IPv4",
					cidrv6: "dải IPv6",
					base64: "chuỗi mã hóa base64",
					base64url: "chuỗi mã hóa base64url",
					json_string: "chuỗi JSON",
					e164: "số E.164",
					jwt: "JWT",
					template_literal: "đầu vào"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "số",
					array: "mảng"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Đầu vào không hợp lệ: mong đợi instanceof ${issue.expected}, nhận được ${received}`;
							return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Đầu vào không hợp lệ: mong đợi ${util.stringifyPrimitive(issue.values[0])}`;
							return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
							return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
							if (_issue.format === "regex") return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
							return `${FormatDictionary[_issue.format] ?? issue.format} không hợp lệ`;
						}
						case "not_multiple_of": return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
						case "unrecognized_keys": return `Khóa không được nhận dạng: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Khóa không hợp lệ trong ${issue.origin}`;
						case "invalid_union": return "Đầu vào không hợp lệ";
						case "invalid_element": return `Giá trị không hợp lệ trong ${issue.origin}`;
						default: return `Đầu vào không hợp lệ`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/zh-CN.cjs
		var require_zh_CN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "字符",
						verb: "包含"
					},
					file: {
						unit: "字节",
						verb: "包含"
					},
					array: {
						unit: "项",
						verb: "包含"
					},
					set: {
						unit: "项",
						verb: "包含"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "输入",
					email: "电子邮件",
					url: "URL",
					emoji: "表情符号",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO日期时间",
					date: "ISO日期",
					time: "ISO时间",
					duration: "ISO时长",
					ipv4: "IPv4地址",
					ipv6: "IPv6地址",
					cidrv4: "IPv4网段",
					cidrv6: "IPv6网段",
					base64: "base64编码字符串",
					base64url: "base64url编码字符串",
					json_string: "JSON字符串",
					e164: "E.164号码",
					jwt: "JWT",
					template_literal: "输入"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "数字",
					array: "数组",
					null: "空值(null)"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `无效输入：期望 instanceof ${issue.expected}，实际接收 ${received}`;
							return `无效输入：期望 ${expected}，实际接收 ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `无效输入：期望 ${util.stringifyPrimitive(issue.values[0])}`;
							return `无效选项：期望以下之一 ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
							return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `无效字符串：必须以 "${_issue.prefix}" 开头`;
							if (_issue.format === "ends_with") return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
							if (_issue.format === "includes") return `无效字符串：必须包含 "${_issue.includes}"`;
							if (_issue.format === "regex") return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
							return `无效${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `无效数字：必须是 ${issue.divisor} 的倍数`;
						case "unrecognized_keys": return `出现未知的键(key): ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `${issue.origin} 中的键(key)无效`;
						case "invalid_union": return "无效输入";
						case "invalid_element": return `${issue.origin} 中包含无效值(value)`;
						default: return `无效输入`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/zh-TW.cjs
		var require_zh_TW = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "字元",
						verb: "擁有"
					},
					file: {
						unit: "位元組",
						verb: "擁有"
					},
					array: {
						unit: "項目",
						verb: "擁有"
					},
					set: {
						unit: "項目",
						verb: "擁有"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "輸入",
					email: "郵件地址",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "ISO 日期時間",
					date: "ISO 日期",
					time: "ISO 時間",
					duration: "ISO 期間",
					ipv4: "IPv4 位址",
					ipv6: "IPv6 位址",
					cidrv4: "IPv4 範圍",
					cidrv6: "IPv6 範圍",
					base64: "base64 編碼字串",
					base64url: "base64url 編碼字串",
					json_string: "JSON 字串",
					e164: "E.164 數值",
					jwt: "JWT",
					template_literal: "輸入"
				};
				const TypeDictionary = { nan: "NaN" };
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `無效的輸入值：預期為 instanceof ${issue.expected}，但收到 ${received}`;
							return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `無效的輸入值：預期為 ${util.stringifyPrimitive(issue.values[0])}`;
							return `無效的選項：預期為以下其中之一 ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
							return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
							return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
							if (_issue.format === "ends_with") return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
							if (_issue.format === "includes") return `無效的字串：必須包含 "${_issue.includes}"`;
							if (_issue.format === "regex") return `無效的字串：必須符合格式 ${_issue.pattern}`;
							return `無效的 ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `無效的數字：必須為 ${issue.divisor} 的倍數`;
						case "unrecognized_keys": return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${util.joinValues(issue.keys, "、")}`;
						case "invalid_key": return `${issue.origin} 中有無效的鍵值`;
						case "invalid_union": return "無效的輸入值";
						case "invalid_element": return `${issue.origin} 中有無效的值`;
						default: return `無效的輸入值`;
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/yo.cjs
		var require_yo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = default_1;
			const util = __importStar(require_util());
			const error = () => {
				const Sizable = {
					string: {
						unit: "àmi",
						verb: "ní"
					},
					file: {
						unit: "bytes",
						verb: "ní"
					},
					array: {
						unit: "nkan",
						verb: "ní"
					},
					set: {
						unit: "nkan",
						verb: "ní"
					}
				};
				function getSizing(origin) {
					return Sizable[origin] ?? null;
				}
				const FormatDictionary = {
					regex: "ẹ̀rọ ìbáwọlé",
					email: "àdírẹ́sì ìmẹ́lì",
					url: "URL",
					emoji: "emoji",
					uuid: "UUID",
					uuidv4: "UUIDv4",
					uuidv6: "UUIDv6",
					nanoid: "nanoid",
					guid: "GUID",
					cuid: "cuid",
					cuid2: "cuid2",
					ulid: "ULID",
					xid: "XID",
					ksuid: "KSUID",
					datetime: "àkókò ISO",
					date: "ọjọ́ ISO",
					time: "àkókò ISO",
					duration: "àkókò tó pé ISO",
					ipv4: "àdírẹ́sì IPv4",
					ipv6: "àdírẹ́sì IPv6",
					cidrv4: "àgbègbè IPv4",
					cidrv6: "àgbègbè IPv6",
					base64: "ọ̀rọ̀ tí a kọ́ ní base64",
					base64url: "ọ̀rọ̀ base64url",
					json_string: "ọ̀rọ̀ JSON",
					e164: "nọ́mbà E.164",
					jwt: "JWT",
					template_literal: "ẹ̀rọ ìbáwọlé"
				};
				const TypeDictionary = {
					nan: "NaN",
					number: "nọ́mbà",
					array: "akopọ"
				};
				return (issue) => {
					switch (issue.code) {
						case "invalid_type": {
							const expected = TypeDictionary[issue.expected] ?? issue.expected;
							const receivedType = util.parsedType(issue.input);
							const received = TypeDictionary[receivedType] ?? receivedType;
							if (/^[A-Z]/.test(issue.expected)) return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue.expected}, àmọ̀ a rí ${received}`;
							return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
						}
						case "invalid_value":
							if (issue.values.length === 1) return `Ìbáwọlé aṣìṣe: a ní láti fi ${util.stringifyPrimitive(issue.values[0])}`;
							return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${util.joinValues(issue.values, "|")}`;
						case "too_big": {
							const adj = issue.inclusive ? "<=" : "<";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
							return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
						}
						case "too_small": {
							const adj = issue.inclusive ? ">=" : ">";
							const sizing = getSizing(issue.origin);
							if (sizing) return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
							return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
						}
						case "invalid_format": {
							const _issue = issue;
							if (_issue.format === "starts_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
							if (_issue.format === "ends_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
							if (_issue.format === "includes") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
							if (_issue.format === "regex") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
							return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue.format}`;
						}
						case "not_multiple_of": return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
						case "unrecognized_keys": return `Bọtìnì àìmọ̀: ${util.joinValues(issue.keys, ", ")}`;
						case "invalid_key": return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
						case "invalid_union": return "Ìbáwọlé aṣìṣe";
						case "invalid_element": return `Iye aṣìṣe nínú ${issue.origin}`;
						default: return "Ìbáwọlé aṣìṣe";
					}
				};
			};
			function default_1() {
				return { localeError: error() };
			}
			module.exports = exports.default;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/locales/index.cjs
		var require_locales = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __importDefault = exports && exports.__importDefault || function(mod) {
				return mod && mod.__esModule ? mod : { "default": mod };
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.zhCN = exports.vi = exports.uz = exports.ur = exports.uk = exports.ua = exports.tr = exports.th = exports.ta = exports.sv = exports.sl = exports.ru = exports.ro = exports.pt = exports.pl = exports.ps = exports.ota = exports.no = exports.nl = exports.ms = exports.mk = exports.lt = exports.ko = exports.km = exports.kh = exports.ka = exports.ja = exports.it = exports.is = exports.id = exports.hy = exports.hu = exports.hr = exports.he = exports.frCA = exports.fr = exports.fi = exports.fa = exports.es = exports.eo = exports.en = exports.el = exports.de = exports.da = exports.cs = exports.ca = exports.bg = exports.be = exports.az = exports.ar = void 0;
			exports.yo = exports.zhTW = void 0;
			var ar_js_1 = require_ar();
			Object.defineProperty(exports, "ar", {
				enumerable: true,
				get: function() {
					return __importDefault(ar_js_1).default;
				}
			});
			var az_js_1 = require_az();
			Object.defineProperty(exports, "az", {
				enumerable: true,
				get: function() {
					return __importDefault(az_js_1).default;
				}
			});
			var be_js_1 = require_be();
			Object.defineProperty(exports, "be", {
				enumerable: true,
				get: function() {
					return __importDefault(be_js_1).default;
				}
			});
			var bg_js_1 = require_bg();
			Object.defineProperty(exports, "bg", {
				enumerable: true,
				get: function() {
					return __importDefault(bg_js_1).default;
				}
			});
			var ca_js_1 = require_ca();
			Object.defineProperty(exports, "ca", {
				enumerable: true,
				get: function() {
					return __importDefault(ca_js_1).default;
				}
			});
			var cs_js_1 = require_cs();
			Object.defineProperty(exports, "cs", {
				enumerable: true,
				get: function() {
					return __importDefault(cs_js_1).default;
				}
			});
			var da_js_1 = require_da();
			Object.defineProperty(exports, "da", {
				enumerable: true,
				get: function() {
					return __importDefault(da_js_1).default;
				}
			});
			var de_js_1 = require_de();
			Object.defineProperty(exports, "de", {
				enumerable: true,
				get: function() {
					return __importDefault(de_js_1).default;
				}
			});
			var el_js_1 = require_el();
			Object.defineProperty(exports, "el", {
				enumerable: true,
				get: function() {
					return __importDefault(el_js_1).default;
				}
			});
			var en_js_1 = require_en();
			Object.defineProperty(exports, "en", {
				enumerable: true,
				get: function() {
					return __importDefault(en_js_1).default;
				}
			});
			var eo_js_1 = require_eo();
			Object.defineProperty(exports, "eo", {
				enumerable: true,
				get: function() {
					return __importDefault(eo_js_1).default;
				}
			});
			var es_js_1 = require_es();
			Object.defineProperty(exports, "es", {
				enumerable: true,
				get: function() {
					return __importDefault(es_js_1).default;
				}
			});
			var fa_js_1 = require_fa();
			Object.defineProperty(exports, "fa", {
				enumerable: true,
				get: function() {
					return __importDefault(fa_js_1).default;
				}
			});
			var fi_js_1 = require_fi();
			Object.defineProperty(exports, "fi", {
				enumerable: true,
				get: function() {
					return __importDefault(fi_js_1).default;
				}
			});
			var fr_js_1 = require_fr();
			Object.defineProperty(exports, "fr", {
				enumerable: true,
				get: function() {
					return __importDefault(fr_js_1).default;
				}
			});
			var fr_CA_js_1 = require_fr_CA();
			Object.defineProperty(exports, "frCA", {
				enumerable: true,
				get: function() {
					return __importDefault(fr_CA_js_1).default;
				}
			});
			var he_js_1 = require_he();
			Object.defineProperty(exports, "he", {
				enumerable: true,
				get: function() {
					return __importDefault(he_js_1).default;
				}
			});
			var hr_js_1 = require_hr();
			Object.defineProperty(exports, "hr", {
				enumerable: true,
				get: function() {
					return __importDefault(hr_js_1).default;
				}
			});
			var hu_js_1 = require_hu();
			Object.defineProperty(exports, "hu", {
				enumerable: true,
				get: function() {
					return __importDefault(hu_js_1).default;
				}
			});
			var hy_js_1 = require_hy();
			Object.defineProperty(exports, "hy", {
				enumerable: true,
				get: function() {
					return __importDefault(hy_js_1).default;
				}
			});
			var id_js_1 = require_id();
			Object.defineProperty(exports, "id", {
				enumerable: true,
				get: function() {
					return __importDefault(id_js_1).default;
				}
			});
			var is_js_1 = require_is();
			Object.defineProperty(exports, "is", {
				enumerable: true,
				get: function() {
					return __importDefault(is_js_1).default;
				}
			});
			var it_js_1 = require_it();
			Object.defineProperty(exports, "it", {
				enumerable: true,
				get: function() {
					return __importDefault(it_js_1).default;
				}
			});
			var ja_js_1 = require_ja();
			Object.defineProperty(exports, "ja", {
				enumerable: true,
				get: function() {
					return __importDefault(ja_js_1).default;
				}
			});
			var ka_js_1 = require_ka();
			Object.defineProperty(exports, "ka", {
				enumerable: true,
				get: function() {
					return __importDefault(ka_js_1).default;
				}
			});
			var kh_js_1 = require_kh();
			Object.defineProperty(exports, "kh", {
				enumerable: true,
				get: function() {
					return __importDefault(kh_js_1).default;
				}
			});
			var km_js_1 = require_km();
			Object.defineProperty(exports, "km", {
				enumerable: true,
				get: function() {
					return __importDefault(km_js_1).default;
				}
			});
			var ko_js_1 = require_ko();
			Object.defineProperty(exports, "ko", {
				enumerable: true,
				get: function() {
					return __importDefault(ko_js_1).default;
				}
			});
			var lt_js_1 = require_lt();
			Object.defineProperty(exports, "lt", {
				enumerable: true,
				get: function() {
					return __importDefault(lt_js_1).default;
				}
			});
			var mk_js_1 = require_mk();
			Object.defineProperty(exports, "mk", {
				enumerable: true,
				get: function() {
					return __importDefault(mk_js_1).default;
				}
			});
			var ms_js_1 = require_ms();
			Object.defineProperty(exports, "ms", {
				enumerable: true,
				get: function() {
					return __importDefault(ms_js_1).default;
				}
			});
			var nl_js_1 = require_nl();
			Object.defineProperty(exports, "nl", {
				enumerable: true,
				get: function() {
					return __importDefault(nl_js_1).default;
				}
			});
			var no_js_1 = require_no();
			Object.defineProperty(exports, "no", {
				enumerable: true,
				get: function() {
					return __importDefault(no_js_1).default;
				}
			});
			var ota_js_1 = require_ota();
			Object.defineProperty(exports, "ota", {
				enumerable: true,
				get: function() {
					return __importDefault(ota_js_1).default;
				}
			});
			var ps_js_1 = require_ps();
			Object.defineProperty(exports, "ps", {
				enumerable: true,
				get: function() {
					return __importDefault(ps_js_1).default;
				}
			});
			var pl_js_1 = require_pl();
			Object.defineProperty(exports, "pl", {
				enumerable: true,
				get: function() {
					return __importDefault(pl_js_1).default;
				}
			});
			var pt_js_1 = require_pt();
			Object.defineProperty(exports, "pt", {
				enumerable: true,
				get: function() {
					return __importDefault(pt_js_1).default;
				}
			});
			var ro_js_1 = require_ro();
			Object.defineProperty(exports, "ro", {
				enumerable: true,
				get: function() {
					return __importDefault(ro_js_1).default;
				}
			});
			var ru_js_1 = require_ru();
			Object.defineProperty(exports, "ru", {
				enumerable: true,
				get: function() {
					return __importDefault(ru_js_1).default;
				}
			});
			var sl_js_1 = require_sl();
			Object.defineProperty(exports, "sl", {
				enumerable: true,
				get: function() {
					return __importDefault(sl_js_1).default;
				}
			});
			var sv_js_1 = require_sv();
			Object.defineProperty(exports, "sv", {
				enumerable: true,
				get: function() {
					return __importDefault(sv_js_1).default;
				}
			});
			var ta_js_1 = require_ta();
			Object.defineProperty(exports, "ta", {
				enumerable: true,
				get: function() {
					return __importDefault(ta_js_1).default;
				}
			});
			var th_js_1 = require_th();
			Object.defineProperty(exports, "th", {
				enumerable: true,
				get: function() {
					return __importDefault(th_js_1).default;
				}
			});
			var tr_js_1 = require_tr();
			Object.defineProperty(exports, "tr", {
				enumerable: true,
				get: function() {
					return __importDefault(tr_js_1).default;
				}
			});
			var ua_js_1 = require_ua();
			Object.defineProperty(exports, "ua", {
				enumerable: true,
				get: function() {
					return __importDefault(ua_js_1).default;
				}
			});
			var uk_js_1 = require_uk();
			Object.defineProperty(exports, "uk", {
				enumerable: true,
				get: function() {
					return __importDefault(uk_js_1).default;
				}
			});
			var ur_js_1 = require_ur();
			Object.defineProperty(exports, "ur", {
				enumerable: true,
				get: function() {
					return __importDefault(ur_js_1).default;
				}
			});
			var uz_js_1 = require_uz();
			Object.defineProperty(exports, "uz", {
				enumerable: true,
				get: function() {
					return __importDefault(uz_js_1).default;
				}
			});
			var vi_js_1 = require_vi();
			Object.defineProperty(exports, "vi", {
				enumerable: true,
				get: function() {
					return __importDefault(vi_js_1).default;
				}
			});
			var zh_CN_js_1 = require_zh_CN();
			Object.defineProperty(exports, "zhCN", {
				enumerable: true,
				get: function() {
					return __importDefault(zh_CN_js_1).default;
				}
			});
			var zh_TW_js_1 = require_zh_TW();
			Object.defineProperty(exports, "zhTW", {
				enumerable: true,
				get: function() {
					return __importDefault(zh_TW_js_1).default;
				}
			});
			var yo_js_1 = require_yo();
			Object.defineProperty(exports, "yo", {
				enumerable: true,
				get: function() {
					return __importDefault(yo_js_1).default;
				}
			});
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/registries.cjs
		var require_registries = /* @__PURE__ */ __commonJSMin(((exports) => {
			var _a;
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.globalRegistry = exports.$ZodRegistry = exports.$input = exports.$output = void 0;
			exports.registry = registry;
			exports.$output = Symbol("ZodOutput");
			exports.$input = Symbol("ZodInput");
			var $ZodRegistry = class {
				constructor() {
					this._map = /* @__PURE__ */ new WeakMap();
					this._idmap = /* @__PURE__ */ new Map();
				}
				add(schema, ..._meta) {
					const meta = _meta[0];
					this._map.set(schema, meta);
					if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
					return this;
				}
				clear() {
					this._map = /* @__PURE__ */ new WeakMap();
					this._idmap = /* @__PURE__ */ new Map();
					return this;
				}
				remove(schema) {
					const meta = this._map.get(schema);
					if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
					this._map.delete(schema);
					return this;
				}
				get(schema) {
					const p = schema._zod.parent;
					if (p) {
						const pm = { ...this.get(p) ?? {} };
						delete pm.id;
						const f = {
							...pm,
							...this._map.get(schema)
						};
						return Object.keys(f).length ? f : void 0;
					}
					return this._map.get(schema);
				}
				has(schema) {
					return this._map.has(schema);
				}
			};
			exports.$ZodRegistry = $ZodRegistry;
			function registry() {
				return new $ZodRegistry();
			}
			(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
			exports.globalRegistry = globalThis.__zod_globalRegistry;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/api.cjs
		var require_api = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.TimePrecision = void 0;
			exports._string = _string;
			exports._coercedString = _coercedString;
			exports._email = _email;
			exports._guid = _guid;
			exports._uuid = _uuid;
			exports._uuidv4 = _uuidv4;
			exports._uuidv6 = _uuidv6;
			exports._uuidv7 = _uuidv7;
			exports._url = _url;
			exports._emoji = _emoji;
			exports._nanoid = _nanoid;
			exports._cuid = _cuid;
			exports._cuid2 = _cuid2;
			exports._ulid = _ulid;
			exports._xid = _xid;
			exports._ksuid = _ksuid;
			exports._ipv4 = _ipv4;
			exports._ipv6 = _ipv6;
			exports._mac = _mac;
			exports._cidrv4 = _cidrv4;
			exports._cidrv6 = _cidrv6;
			exports._base64 = _base64;
			exports._base64url = _base64url;
			exports._e164 = _e164;
			exports._jwt = _jwt;
			exports._isoDateTime = _isoDateTime;
			exports._isoDate = _isoDate;
			exports._isoTime = _isoTime;
			exports._isoDuration = _isoDuration;
			exports._number = _number;
			exports._coercedNumber = _coercedNumber;
			exports._int = _int;
			exports._float32 = _float32;
			exports._float64 = _float64;
			exports._int32 = _int32;
			exports._uint32 = _uint32;
			exports._boolean = _boolean;
			exports._coercedBoolean = _coercedBoolean;
			exports._bigint = _bigint;
			exports._coercedBigint = _coercedBigint;
			exports._int64 = _int64;
			exports._uint64 = _uint64;
			exports._symbol = _symbol;
			exports._undefined = _undefined;
			exports._null = _null;
			exports._any = _any;
			exports._unknown = _unknown;
			exports._never = _never;
			exports._void = _void;
			exports._date = _date;
			exports._coercedDate = _coercedDate;
			exports._nan = _nan;
			exports._lt = _lt;
			exports._lte = _lte;
			exports._max = _lte;
			exports._lte = _lte;
			exports._max = _lte;
			exports._gt = _gt;
			exports._gte = _gte;
			exports._min = _gte;
			exports._gte = _gte;
			exports._min = _gte;
			exports._positive = _positive;
			exports._negative = _negative;
			exports._nonpositive = _nonpositive;
			exports._nonnegative = _nonnegative;
			exports._multipleOf = _multipleOf;
			exports._maxSize = _maxSize;
			exports._minSize = _minSize;
			exports._size = _size;
			exports._maxLength = _maxLength;
			exports._minLength = _minLength;
			exports._length = _length;
			exports._regex = _regex;
			exports._lowercase = _lowercase;
			exports._uppercase = _uppercase;
			exports._includes = _includes;
			exports._startsWith = _startsWith;
			exports._endsWith = _endsWith;
			exports._property = _property;
			exports._mime = _mime;
			exports._overwrite = _overwrite;
			exports._normalize = _normalize;
			exports._trim = _trim;
			exports._toLowerCase = _toLowerCase;
			exports._toUpperCase = _toUpperCase;
			exports._slugify = _slugify;
			exports._array = _array;
			exports._union = _union;
			exports._xor = _xor;
			exports._discriminatedUnion = _discriminatedUnion;
			exports._intersection = _intersection;
			exports._tuple = _tuple;
			exports._record = _record;
			exports._map = _map;
			exports._set = _set;
			exports._enum = _enum;
			exports._nativeEnum = _nativeEnum;
			exports._literal = _literal;
			exports._file = _file;
			exports._transform = _transform;
			exports._optional = _optional;
			exports._nullable = _nullable;
			exports._default = _default;
			exports._nonoptional = _nonoptional;
			exports._success = _success;
			exports._catch = _catch;
			exports._pipe = _pipe;
			exports._readonly = _readonly;
			exports._templateLiteral = _templateLiteral;
			exports._lazy = _lazy;
			exports._promise = _promise;
			exports._custom = _custom;
			exports._refine = _refine;
			exports._superRefine = _superRefine;
			exports._check = _check;
			exports.describe = describe;
			exports.meta = meta;
			exports._stringbool = _stringbool;
			exports._stringFormat = _stringFormat;
			const checks = __importStar(require_checks$1());
			const registries = __importStar(require_registries());
			const schemas = __importStar(require_schemas$1());
			const util = __importStar(require_util());
			// @__NO_SIDE_EFFECTS__
			function _string(Class, params) {
				return new Class({
					type: "string",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _coercedString(Class, params) {
				return new Class({
					type: "string",
					coerce: true,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _email(Class, params) {
				return new Class({
					type: "string",
					format: "email",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _guid(Class, params) {
				return new Class({
					type: "string",
					format: "guid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uuid(Class, params) {
				return new Class({
					type: "string",
					format: "uuid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uuidv4(Class, params) {
				return new Class({
					type: "string",
					format: "uuid",
					check: "string_format",
					abort: false,
					version: "v4",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uuidv6(Class, params) {
				return new Class({
					type: "string",
					format: "uuid",
					check: "string_format",
					abort: false,
					version: "v6",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uuidv7(Class, params) {
				return new Class({
					type: "string",
					format: "uuid",
					check: "string_format",
					abort: false,
					version: "v7",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _url(Class, params) {
				return new Class({
					type: "string",
					format: "url",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _emoji(Class, params) {
				return new Class({
					type: "string",
					format: "emoji",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _nanoid(Class, params) {
				return new Class({
					type: "string",
					format: "nanoid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			/**
			* @deprecated CUID v1 is deprecated by its authors due to information leakage
			* (timestamps embedded in the id). Use {@link _cuid2} instead.
			* See https://github.com/paralleldrive/cuid.
			*/
			// @__NO_SIDE_EFFECTS__
			function _cuid(Class, params) {
				return new Class({
					type: "string",
					format: "cuid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _cuid2(Class, params) {
				return new Class({
					type: "string",
					format: "cuid2",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _ulid(Class, params) {
				return new Class({
					type: "string",
					format: "ulid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _xid(Class, params) {
				return new Class({
					type: "string",
					format: "xid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _ksuid(Class, params) {
				return new Class({
					type: "string",
					format: "ksuid",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _ipv4(Class, params) {
				return new Class({
					type: "string",
					format: "ipv4",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _ipv6(Class, params) {
				return new Class({
					type: "string",
					format: "ipv6",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _mac(Class, params) {
				return new Class({
					type: "string",
					format: "mac",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _cidrv4(Class, params) {
				return new Class({
					type: "string",
					format: "cidrv4",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _cidrv6(Class, params) {
				return new Class({
					type: "string",
					format: "cidrv6",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _base64(Class, params) {
				return new Class({
					type: "string",
					format: "base64",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _base64url(Class, params) {
				return new Class({
					type: "string",
					format: "base64url",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _e164(Class, params) {
				return new Class({
					type: "string",
					format: "e164",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _jwt(Class, params) {
				return new Class({
					type: "string",
					format: "jwt",
					check: "string_format",
					abort: false,
					...util.normalizeParams(params)
				});
			}
			exports.TimePrecision = {
				Any: null,
				Minute: -1,
				Second: 0,
				Millisecond: 3,
				Microsecond: 6
			};
			// @__NO_SIDE_EFFECTS__
			function _isoDateTime(Class, params) {
				return new Class({
					type: "string",
					format: "datetime",
					check: "string_format",
					offset: false,
					local: false,
					precision: null,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _isoDate(Class, params) {
				return new Class({
					type: "string",
					format: "date",
					check: "string_format",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _isoTime(Class, params) {
				return new Class({
					type: "string",
					format: "time",
					check: "string_format",
					precision: null,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _isoDuration(Class, params) {
				return new Class({
					type: "string",
					format: "duration",
					check: "string_format",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _number(Class, params) {
				return new Class({
					type: "number",
					checks: [],
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _coercedNumber(Class, params) {
				return new Class({
					type: "number",
					coerce: true,
					checks: [],
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _int(Class, params) {
				return new Class({
					type: "number",
					check: "number_format",
					abort: false,
					format: "safeint",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _float32(Class, params) {
				return new Class({
					type: "number",
					check: "number_format",
					abort: false,
					format: "float32",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _float64(Class, params) {
				return new Class({
					type: "number",
					check: "number_format",
					abort: false,
					format: "float64",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _int32(Class, params) {
				return new Class({
					type: "number",
					check: "number_format",
					abort: false,
					format: "int32",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uint32(Class, params) {
				return new Class({
					type: "number",
					check: "number_format",
					abort: false,
					format: "uint32",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _boolean(Class, params) {
				return new Class({
					type: "boolean",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _coercedBoolean(Class, params) {
				return new Class({
					type: "boolean",
					coerce: true,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _bigint(Class, params) {
				return new Class({
					type: "bigint",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _coercedBigint(Class, params) {
				return new Class({
					type: "bigint",
					coerce: true,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _int64(Class, params) {
				return new Class({
					type: "bigint",
					check: "bigint_format",
					abort: false,
					format: "int64",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uint64(Class, params) {
				return new Class({
					type: "bigint",
					check: "bigint_format",
					abort: false,
					format: "uint64",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _symbol(Class, params) {
				return new Class({
					type: "symbol",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _undefined(Class, params) {
				return new Class({
					type: "undefined",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _null(Class, params) {
				return new Class({
					type: "null",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _any(Class) {
				return new Class({ type: "any" });
			}
			// @__NO_SIDE_EFFECTS__
			function _unknown(Class) {
				return new Class({ type: "unknown" });
			}
			// @__NO_SIDE_EFFECTS__
			function _never(Class, params) {
				return new Class({
					type: "never",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _void(Class, params) {
				return new Class({
					type: "void",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _date(Class, params) {
				return new Class({
					type: "date",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _coercedDate(Class, params) {
				return new Class({
					type: "date",
					coerce: true,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _nan(Class, params) {
				return new Class({
					type: "nan",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _lt(value, params) {
				return new checks.$ZodCheckLessThan({
					check: "less_than",
					...util.normalizeParams(params),
					value,
					inclusive: false
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _lte(value, params) {
				return new checks.$ZodCheckLessThan({
					check: "less_than",
					...util.normalizeParams(params),
					value,
					inclusive: true
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _gt(value, params) {
				return new checks.$ZodCheckGreaterThan({
					check: "greater_than",
					...util.normalizeParams(params),
					value,
					inclusive: false
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _gte(value, params) {
				return new checks.$ZodCheckGreaterThan({
					check: "greater_than",
					...util.normalizeParams(params),
					value,
					inclusive: true
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _positive(params) {
				return /* @__PURE__ */ _gt(0, params);
			}
			// @__NO_SIDE_EFFECTS__
			function _negative(params) {
				return /* @__PURE__ */ _lt(0, params);
			}
			// @__NO_SIDE_EFFECTS__
			function _nonpositive(params) {
				return /* @__PURE__ */ _lte(0, params);
			}
			// @__NO_SIDE_EFFECTS__
			function _nonnegative(params) {
				return /* @__PURE__ */ _gte(0, params);
			}
			// @__NO_SIDE_EFFECTS__
			function _multipleOf(value, params) {
				return new checks.$ZodCheckMultipleOf({
					check: "multiple_of",
					...util.normalizeParams(params),
					value
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _maxSize(maximum, params) {
				return new checks.$ZodCheckMaxSize({
					check: "max_size",
					...util.normalizeParams(params),
					maximum
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _minSize(minimum, params) {
				return new checks.$ZodCheckMinSize({
					check: "min_size",
					...util.normalizeParams(params),
					minimum
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _size(size, params) {
				return new checks.$ZodCheckSizeEquals({
					check: "size_equals",
					...util.normalizeParams(params),
					size
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _maxLength(maximum, params) {
				return new checks.$ZodCheckMaxLength({
					check: "max_length",
					...util.normalizeParams(params),
					maximum
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _minLength(minimum, params) {
				return new checks.$ZodCheckMinLength({
					check: "min_length",
					...util.normalizeParams(params),
					minimum
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _length(length, params) {
				return new checks.$ZodCheckLengthEquals({
					check: "length_equals",
					...util.normalizeParams(params),
					length
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _regex(pattern, params) {
				return new checks.$ZodCheckRegex({
					check: "string_format",
					format: "regex",
					...util.normalizeParams(params),
					pattern
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _lowercase(params) {
				return new checks.$ZodCheckLowerCase({
					check: "string_format",
					format: "lowercase",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _uppercase(params) {
				return new checks.$ZodCheckUpperCase({
					check: "string_format",
					format: "uppercase",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _includes(includes, params) {
				return new checks.$ZodCheckIncludes({
					check: "string_format",
					format: "includes",
					...util.normalizeParams(params),
					includes
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _startsWith(prefix, params) {
				return new checks.$ZodCheckStartsWith({
					check: "string_format",
					format: "starts_with",
					...util.normalizeParams(params),
					prefix
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _endsWith(suffix, params) {
				return new checks.$ZodCheckEndsWith({
					check: "string_format",
					format: "ends_with",
					...util.normalizeParams(params),
					suffix
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _property(property, schema, params) {
				return new checks.$ZodCheckProperty({
					check: "property",
					property,
					schema,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _mime(types, params) {
				return new checks.$ZodCheckMimeType({
					check: "mime_type",
					mime: types,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _overwrite(tx) {
				return new checks.$ZodCheckOverwrite({
					check: "overwrite",
					tx
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _normalize(form) {
				return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
			}
			// @__NO_SIDE_EFFECTS__
			function _trim() {
				return /* @__PURE__ */ _overwrite((input) => input.trim());
			}
			// @__NO_SIDE_EFFECTS__
			function _toLowerCase() {
				return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
			}
			// @__NO_SIDE_EFFECTS__
			function _toUpperCase() {
				return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
			}
			// @__NO_SIDE_EFFECTS__
			function _slugify() {
				return /* @__PURE__ */ _overwrite((input) => util.slugify(input));
			}
			// @__NO_SIDE_EFFECTS__
			function _array(Class, element, params) {
				return new Class({
					type: "array",
					element,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _union(Class, options, params) {
				return new Class({
					type: "union",
					options,
					...util.normalizeParams(params)
				});
			}
			function _xor(Class, options, params) {
				return new Class({
					type: "union",
					options,
					inclusive: false,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _discriminatedUnion(Class, discriminator, options, params) {
				return new Class({
					type: "union",
					options,
					discriminator,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _intersection(Class, left, right) {
				return new Class({
					type: "intersection",
					left,
					right
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _tuple(Class, items, _paramsOrRest, _params) {
				const hasRest = _paramsOrRest instanceof schemas.$ZodType;
				const params = hasRest ? _params : _paramsOrRest;
				return new Class({
					type: "tuple",
					items,
					rest: hasRest ? _paramsOrRest : null,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _record(Class, keyType, valueType, params) {
				return new Class({
					type: "record",
					keyType,
					valueType,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _map(Class, keyType, valueType, params) {
				return new Class({
					type: "map",
					keyType,
					valueType,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _set(Class, valueType, params) {
				return new Class({
					type: "set",
					valueType,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _enum(Class, values, params) {
				return new Class({
					type: "enum",
					entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
					...util.normalizeParams(params)
				});
			}
			/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
			*
			* ```ts
			* enum Colors { red, green, blue }
			* z.enum(Colors);
			* ```
			*/
			// @__NO_SIDE_EFFECTS__
			function _nativeEnum(Class, entries, params) {
				return new Class({
					type: "enum",
					entries,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _literal(Class, value, params) {
				return new Class({
					type: "literal",
					values: Array.isArray(value) ? value : [value],
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _file(Class, params) {
				return new Class({
					type: "file",
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _transform(Class, fn) {
				return new Class({
					type: "transform",
					transform: fn
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _optional(Class, innerType) {
				return new Class({
					type: "optional",
					innerType
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _nullable(Class, innerType) {
				return new Class({
					type: "nullable",
					innerType
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _default(Class, innerType, defaultValue) {
				return new Class({
					type: "default",
					innerType,
					get defaultValue() {
						return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
					}
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _nonoptional(Class, innerType, params) {
				return new Class({
					type: "nonoptional",
					innerType,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _success(Class, innerType) {
				return new Class({
					type: "success",
					innerType
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _catch(Class, innerType, catchValue) {
				return new Class({
					type: "catch",
					innerType,
					catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _pipe(Class, in_, out) {
				return new Class({
					type: "pipe",
					in: in_,
					out
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _readonly(Class, innerType) {
				return new Class({
					type: "readonly",
					innerType
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _templateLiteral(Class, parts, params) {
				return new Class({
					type: "template_literal",
					parts,
					...util.normalizeParams(params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _lazy(Class, getter) {
				return new Class({
					type: "lazy",
					getter
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _promise(Class, innerType) {
				return new Class({
					type: "promise",
					innerType
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _custom(Class, fn, _params) {
				const norm = util.normalizeParams(_params);
				norm.abort ?? (norm.abort = true);
				return new Class({
					type: "custom",
					check: "custom",
					fn,
					...norm
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _refine(Class, fn, _params) {
				return new Class({
					type: "custom",
					check: "custom",
					fn,
					...util.normalizeParams(_params)
				});
			}
			// @__NO_SIDE_EFFECTS__
			function _superRefine(fn, params) {
				const ch = /* @__PURE__ */ _check((payload) => {
					payload.addIssue = (issue) => {
						if (typeof issue === "string") payload.issues.push(util.issue(issue, payload.value, ch._zod.def));
						else {
							const _issue = issue;
							if (_issue.fatal) _issue.continue = false;
							_issue.code ?? (_issue.code = "custom");
							_issue.input ?? (_issue.input = payload.value);
							_issue.inst ?? (_issue.inst = ch);
							_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
							payload.issues.push(util.issue(_issue));
						}
					};
					return fn(payload.value, payload);
				}, params);
				return ch;
			}
			// @__NO_SIDE_EFFECTS__
			function _check(fn, params) {
				const ch = new checks.$ZodCheck({
					check: "custom",
					...util.normalizeParams(params)
				});
				ch._zod.check = fn;
				return ch;
			}
			// @__NO_SIDE_EFFECTS__
			function describe(description) {
				const ch = new checks.$ZodCheck({ check: "describe" });
				ch._zod.onattach = [(inst) => {
					const existing = registries.globalRegistry.get(inst) ?? {};
					registries.globalRegistry.add(inst, {
						...existing,
						description
					});
				}];
				ch._zod.check = () => {};
				return ch;
			}
			// @__NO_SIDE_EFFECTS__
			function meta(metadata) {
				const ch = new checks.$ZodCheck({ check: "meta" });
				ch._zod.onattach = [(inst) => {
					const existing = registries.globalRegistry.get(inst) ?? {};
					registries.globalRegistry.add(inst, {
						...existing,
						...metadata
					});
				}];
				ch._zod.check = () => {};
				return ch;
			}
			// @__NO_SIDE_EFFECTS__
			function _stringbool(Classes, _params) {
				const params = util.normalizeParams(_params);
				let truthyArray = params.truthy ?? [
					"true",
					"1",
					"yes",
					"on",
					"y",
					"enabled"
				];
				let falsyArray = params.falsy ?? [
					"false",
					"0",
					"no",
					"off",
					"n",
					"disabled"
				];
				if (params.case !== "sensitive") {
					truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
					falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
				}
				const truthySet = new Set(truthyArray);
				const falsySet = new Set(falsyArray);
				const _Codec = Classes.Codec ?? schemas.$ZodCodec;
				const _Boolean = Classes.Boolean ?? schemas.$ZodBoolean;
				const codec = new _Codec({
					type: "pipe",
					in: new (Classes.String ?? schemas.$ZodString)({
						type: "string",
						error: params.error
					}),
					out: new _Boolean({
						type: "boolean",
						error: params.error
					}),
					transform: ((input, payload) => {
						let data = input;
						if (params.case !== "sensitive") data = data.toLowerCase();
						if (truthySet.has(data)) return true;
						else if (falsySet.has(data)) return false;
						else {
							payload.issues.push({
								code: "invalid_value",
								expected: "stringbool",
								values: [...truthySet, ...falsySet],
								input: payload.value,
								inst: codec,
								continue: false
							});
							return {};
						}
					}),
					reverseTransform: ((input, _payload) => {
						if (input === true) return truthyArray[0] || "true";
						else return falsyArray[0] || "false";
					}),
					error: params.error
				});
				return codec;
			}
			// @__NO_SIDE_EFFECTS__
			function _stringFormat(Class, format, fnOrRegex, _params = {}) {
				const params = util.normalizeParams(_params);
				const def = {
					...util.normalizeParams(_params),
					check: "string_format",
					type: "string",
					format,
					fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
					...params
				};
				if (fnOrRegex instanceof RegExp) def.pattern = fnOrRegex;
				return new Class(def);
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/to-json-schema.cjs
		var require_to_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.createStandardJSONSchemaMethod = exports.createToJSONSchemaMethod = void 0;
			exports.initializeContext = initializeContext;
			exports.process = process;
			exports.extractDefs = extractDefs;
			exports.finalize = finalize;
			const registries_js_1 = require_registries();
			function initializeContext(params) {
				let target = params?.target ?? "draft-2020-12";
				if (target === "draft-4") target = "draft-04";
				if (target === "draft-7") target = "draft-07";
				return {
					processors: params.processors ?? {},
					metadataRegistry: params?.metadata ?? registries_js_1.globalRegistry,
					target,
					unrepresentable: params?.unrepresentable ?? "throw",
					override: params?.override ?? (() => {}),
					io: params?.io ?? "output",
					counter: 0,
					seen: /* @__PURE__ */ new Map(),
					cycles: params?.cycles ?? "ref",
					reused: params?.reused ?? "inline",
					external: params?.external ?? void 0
				};
			}
			function process(schema, ctx, _params = {
				path: [],
				schemaPath: []
			}) {
				var _a;
				const def = schema._zod.def;
				const seen = ctx.seen.get(schema);
				if (seen) {
					seen.count++;
					if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
					return seen.schema;
				}
				const result = {
					schema: {},
					count: 1,
					cycle: void 0,
					path: _params.path
				};
				ctx.seen.set(schema, result);
				const overrideSchema = schema._zod.toJSONSchema?.();
				if (overrideSchema) result.schema = overrideSchema;
				else {
					const params = {
						..._params,
						schemaPath: [..._params.schemaPath, schema],
						path: _params.path
					};
					if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
					else {
						const _json = result.schema;
						const processor = ctx.processors[def.type];
						if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
						processor(schema, ctx, _json, params);
					}
					const parent = schema._zod.parent;
					if (parent) {
						if (!result.ref) result.ref = parent;
						process(parent, ctx, params);
						ctx.seen.get(parent).isParent = true;
					}
				}
				const meta = ctx.metadataRegistry.get(schema);
				if (meta) Object.assign(result.schema, meta);
				if (ctx.io === "input" && isTransforming(schema)) {
					delete result.schema.examples;
					delete result.schema.default;
				}
				if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
				delete result.schema._prefault;
				return ctx.seen.get(schema).schema;
			}
			function extractDefs(ctx, schema) {
				const root = ctx.seen.get(schema);
				if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
				const idToSchema = /* @__PURE__ */ new Map();
				for (const entry of ctx.seen.entries()) {
					const id = ctx.metadataRegistry.get(entry[0])?.id;
					if (id) {
						const existing = idToSchema.get(id);
						if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
						idToSchema.set(id, entry[0]);
					}
				}
				const makeURI = (entry) => {
					const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
					if (ctx.external) {
						const externalId = ctx.external.registry.get(entry[0])?.id;
						const uriGenerator = ctx.external.uri ?? ((id) => id);
						if (externalId) return { ref: uriGenerator(externalId) };
						const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
						entry[1].defId = id;
						return {
							defId: id,
							ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
						};
					}
					if (entry[1] === root) return { ref: "#" };
					const defUriPrefix = `#/${defsSegment}/`;
					const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
					return {
						defId,
						ref: defUriPrefix + defId
					};
				};
				const extractToDef = (entry) => {
					if (entry[1].schema.$ref) return;
					const seen = entry[1];
					const { ref, defId } = makeURI(entry);
					seen.def = { ...seen.schema };
					if (defId) seen.defId = defId;
					const schema = seen.schema;
					for (const key in schema) delete schema[key];
					schema.$ref = ref;
				};
				if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
					const seen = entry[1];
					if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
				}
				for (const entry of ctx.seen.entries()) {
					const seen = entry[1];
					if (schema === entry[0]) {
						extractToDef(entry);
						continue;
					}
					if (ctx.external) {
						const ext = ctx.external.registry.get(entry[0])?.id;
						if (schema !== entry[0] && ext) {
							extractToDef(entry);
							continue;
						}
					}
					if (ctx.metadataRegistry.get(entry[0])?.id) {
						extractToDef(entry);
						continue;
					}
					if (seen.cycle) {
						extractToDef(entry);
						continue;
					}
					if (seen.count > 1) {
						if (ctx.reused === "ref") {
							extractToDef(entry);
							continue;
						}
					}
				}
			}
			function finalize(ctx, schema) {
				const root = ctx.seen.get(schema);
				if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
				const flattenRef = (zodSchema) => {
					const seen = ctx.seen.get(zodSchema);
					if (seen.ref === null) return;
					const schema = seen.def ?? seen.schema;
					const _cached = { ...schema };
					const ref = seen.ref;
					seen.ref = null;
					if (ref) {
						flattenRef(ref);
						const refSeen = ctx.seen.get(ref);
						const refSchema = refSeen.schema;
						if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
							schema.allOf = schema.allOf ?? [];
							schema.allOf.push(refSchema);
						} else Object.assign(schema, refSchema);
						Object.assign(schema, _cached);
						if (zodSchema._zod.parent === ref) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (!(key in _cached)) delete schema[key];
						}
						if (refSchema.$ref && refSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
						}
					}
					const parent = zodSchema._zod.parent;
					if (parent && parent !== ref) {
						flattenRef(parent);
						const parentSeen = ctx.seen.get(parent);
						if (parentSeen?.schema.$ref) {
							schema.$ref = parentSeen.schema.$ref;
							if (parentSeen.def) for (const key in schema) {
								if (key === "$ref" || key === "allOf") continue;
								if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
							}
						}
					}
					ctx.override({
						zodSchema,
						jsonSchema: schema,
						path: seen.path ?? []
					});
				};
				for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
				const result = {};
				if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
				else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
				else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
				else if (ctx.target === "openapi-3.0") {}
				if (ctx.external?.uri) {
					const id = ctx.external.registry.get(schema)?.id;
					if (!id) throw new Error("Schema is missing an `id` property");
					result.$id = ctx.external.uri(id);
				}
				Object.assign(result, root.def ?? root.schema);
				const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
				if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
				const defs = ctx.external?.defs ?? {};
				for (const entry of ctx.seen.entries()) {
					const seen = entry[1];
					if (seen.def && seen.defId) {
						if (seen.def.id === seen.defId) delete seen.def.id;
						defs[seen.defId] = seen.def;
					}
				}
				if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
				else result.definitions = defs;
				try {
					const finalized = JSON.parse(JSON.stringify(result));
					Object.defineProperty(finalized, "~standard", {
						value: {
							...schema["~standard"],
							jsonSchema: {
								input: (0, exports.createStandardJSONSchemaMethod)(schema, "input", ctx.processors),
								output: (0, exports.createStandardJSONSchemaMethod)(schema, "output", ctx.processors)
							}
						},
						enumerable: false,
						writable: false
					});
					return finalized;
				} catch (_err) {
					throw new Error("Error converting schema to JSON.");
				}
			}
			function isTransforming(_schema, _ctx) {
				const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
				if (ctx.seen.has(_schema)) return false;
				ctx.seen.add(_schema);
				const def = _schema._zod.def;
				if (def.type === "transform") return true;
				if (def.type === "array") return isTransforming(def.element, ctx);
				if (def.type === "set") return isTransforming(def.valueType, ctx);
				if (def.type === "lazy") return isTransforming(def.getter(), ctx);
				if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
				if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
				if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
				if (def.type === "pipe") {
					if (_schema._zod.traits.has("$ZodCodec")) return true;
					return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
				}
				if (def.type === "object") {
					for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
					return false;
				}
				if (def.type === "union") {
					for (const option of def.options) if (isTransforming(option, ctx)) return true;
					return false;
				}
				if (def.type === "tuple") {
					for (const item of def.items) if (isTransforming(item, ctx)) return true;
					if (def.rest && isTransforming(def.rest, ctx)) return true;
					return false;
				}
				return false;
			}
			/**
			* Creates a toJSONSchema method for a schema instance.
			* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
			*/
			const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
				const ctx = initializeContext({
					...params,
					processors
				});
				process(schema, ctx);
				extractDefs(ctx, schema);
				return finalize(ctx, schema);
			};
			exports.createToJSONSchemaMethod = createToJSONSchemaMethod;
			const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
				const { libraryOptions, target } = params ?? {};
				const ctx = initializeContext({
					...libraryOptions ?? {},
					target,
					io,
					processors
				});
				process(schema, ctx);
				extractDefs(ctx, schema);
				return finalize(ctx, schema);
			};
			exports.createStandardJSONSchemaMethod = createStandardJSONSchemaMethod;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/json-schema-processors.cjs
		var require_json_schema_processors = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.allProcessors = exports.lazyProcessor = exports.optionalProcessor = exports.promiseProcessor = exports.readonlyProcessor = exports.pipeProcessor = exports.catchProcessor = exports.prefaultProcessor = exports.defaultProcessor = exports.nonoptionalProcessor = exports.nullableProcessor = exports.recordProcessor = exports.tupleProcessor = exports.intersectionProcessor = exports.unionProcessor = exports.objectProcessor = exports.arrayProcessor = exports.setProcessor = exports.mapProcessor = exports.transformProcessor = exports.functionProcessor = exports.customProcessor = exports.successProcessor = exports.fileProcessor = exports.templateLiteralProcessor = exports.nanProcessor = exports.literalProcessor = exports.enumProcessor = exports.dateProcessor = exports.unknownProcessor = exports.anyProcessor = exports.neverProcessor = exports.voidProcessor = exports.undefinedProcessor = exports.nullProcessor = exports.symbolProcessor = exports.bigintProcessor = exports.booleanProcessor = exports.numberProcessor = exports.stringProcessor = void 0;
			exports.toJSONSchema = toJSONSchema;
			const to_json_schema_js_1 = require_to_json_schema();
			const util_js_1 = require_util();
			const formatMap = {
				guid: "uuid",
				url: "uri",
				datetime: "date-time",
				json_string: "json-string",
				regex: ""
			};
			const stringProcessor = (schema, ctx, _json, _params) => {
				const json = _json;
				json.type = "string";
				const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
				if (typeof minimum === "number") json.minLength = minimum;
				if (typeof maximum === "number") json.maxLength = maximum;
				if (format) {
					json.format = formatMap[format] ?? format;
					if (json.format === "") delete json.format;
					if (format === "time") delete json.format;
				}
				if (contentEncoding) json.contentEncoding = contentEncoding;
				if (patterns && patterns.size > 0) {
					const regexes = [...patterns];
					if (regexes.length === 1) json.pattern = regexes[0].source;
					else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
						...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
						pattern: regex.source
					}))];
				}
			};
			exports.stringProcessor = stringProcessor;
			const numberProcessor = (schema, ctx, _json, _params) => {
				const json = _json;
				const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
				if (typeof format === "string" && format.includes("int")) json.type = "integer";
				else json.type = "number";
				const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
				const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
				const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
				if (exMin) if (legacy) {
					json.minimum = exclusiveMinimum;
					json.exclusiveMinimum = true;
				} else json.exclusiveMinimum = exclusiveMinimum;
				else if (typeof minimum === "number") json.minimum = minimum;
				if (exMax) if (legacy) {
					json.maximum = exclusiveMaximum;
					json.exclusiveMaximum = true;
				} else json.exclusiveMaximum = exclusiveMaximum;
				else if (typeof maximum === "number") json.maximum = maximum;
				if (typeof multipleOf === "number") json.multipleOf = multipleOf;
			};
			exports.numberProcessor = numberProcessor;
			const booleanProcessor = (_schema, _ctx, json, _params) => {
				json.type = "boolean";
			};
			exports.booleanProcessor = booleanProcessor;
			const bigintProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
			};
			exports.bigintProcessor = bigintProcessor;
			const symbolProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
			};
			exports.symbolProcessor = symbolProcessor;
			const nullProcessor = (_schema, ctx, json, _params) => {
				if (ctx.target === "openapi-3.0") {
					json.type = "string";
					json.nullable = true;
					json.enum = [null];
				} else json.type = "null";
			};
			exports.nullProcessor = nullProcessor;
			const undefinedProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
			};
			exports.undefinedProcessor = undefinedProcessor;
			const voidProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
			};
			exports.voidProcessor = voidProcessor;
			const neverProcessor = (_schema, _ctx, json, _params) => {
				json.not = {};
			};
			exports.neverProcessor = neverProcessor;
			const anyProcessor = (_schema, _ctx, _json, _params) => {};
			exports.anyProcessor = anyProcessor;
			const unknownProcessor = (_schema, _ctx, _json, _params) => {};
			exports.unknownProcessor = unknownProcessor;
			const dateProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
			};
			exports.dateProcessor = dateProcessor;
			const enumProcessor = (schema, _ctx, json, _params) => {
				const def = schema._zod.def;
				const values = (0, util_js_1.getEnumValues)(def.entries);
				if (values.every((v) => typeof v === "number")) json.type = "number";
				if (values.every((v) => typeof v === "string")) json.type = "string";
				json.enum = values;
			};
			exports.enumProcessor = enumProcessor;
			const literalProcessor = (schema, ctx, json, _params) => {
				const def = schema._zod.def;
				const vals = [];
				for (const val of def.values) if (val === void 0) {
					if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
				} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
				else vals.push(Number(val));
				else vals.push(val);
				if (vals.length === 0) {} else if (vals.length === 1) {
					const val = vals[0];
					json.type = val === null ? "null" : typeof val;
					if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
					else json.const = val;
				} else {
					if (vals.every((v) => typeof v === "number")) json.type = "number";
					if (vals.every((v) => typeof v === "string")) json.type = "string";
					if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
					if (vals.every((v) => v === null)) json.type = "null";
					json.enum = vals;
				}
			};
			exports.literalProcessor = literalProcessor;
			const nanProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
			};
			exports.nanProcessor = nanProcessor;
			const templateLiteralProcessor = (schema, _ctx, json, _params) => {
				const _json = json;
				const pattern = schema._zod.pattern;
				if (!pattern) throw new Error("Pattern not found in template literal");
				_json.type = "string";
				_json.pattern = pattern.source;
			};
			exports.templateLiteralProcessor = templateLiteralProcessor;
			const fileProcessor = (schema, _ctx, json, _params) => {
				const _json = json;
				const file = {
					type: "string",
					format: "binary",
					contentEncoding: "binary"
				};
				const { minimum, maximum, mime } = schema._zod.bag;
				if (minimum !== void 0) file.minLength = minimum;
				if (maximum !== void 0) file.maxLength = maximum;
				if (mime) if (mime.length === 1) {
					file.contentMediaType = mime[0];
					Object.assign(_json, file);
				} else {
					Object.assign(_json, file);
					_json.anyOf = mime.map((m) => ({ contentMediaType: m }));
				}
				else Object.assign(_json, file);
			};
			exports.fileProcessor = fileProcessor;
			const successProcessor = (_schema, _ctx, json, _params) => {
				json.type = "boolean";
			};
			exports.successProcessor = successProcessor;
			const customProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
			};
			exports.customProcessor = customProcessor;
			const functionProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Function types cannot be represented in JSON Schema");
			};
			exports.functionProcessor = functionProcessor;
			const transformProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
			};
			exports.transformProcessor = transformProcessor;
			const mapProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
			};
			exports.mapProcessor = mapProcessor;
			const setProcessor = (_schema, ctx, _json, _params) => {
				if (ctx.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
			};
			exports.setProcessor = setProcessor;
			const arrayProcessor = (schema, ctx, _json, params) => {
				const json = _json;
				const def = schema._zod.def;
				const { minimum, maximum } = schema._zod.bag;
				if (typeof minimum === "number") json.minItems = minimum;
				if (typeof maximum === "number") json.maxItems = maximum;
				json.type = "array";
				json.items = (0, to_json_schema_js_1.process)(def.element, ctx, {
					...params,
					path: [...params.path, "items"]
				});
			};
			exports.arrayProcessor = arrayProcessor;
			const objectProcessor = (schema, ctx, _json, params) => {
				const json = _json;
				const def = schema._zod.def;
				json.type = "object";
				json.properties = {};
				const shape = def.shape;
				for (const key in shape) json.properties[key] = (0, to_json_schema_js_1.process)(shape[key], ctx, {
					...params,
					path: [
						...params.path,
						"properties",
						key
					]
				});
				const allKeys = new Set(Object.keys(shape));
				const requiredKeys = new Set([...allKeys].filter((key) => {
					const v = def.shape[key]._zod;
					if (ctx.io === "input") return v.optin === void 0;
					else return v.optout === void 0;
				}));
				if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
				if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
				else if (!def.catchall) {
					if (ctx.io === "output") json.additionalProperties = false;
				} else if (def.catchall) json.additionalProperties = (0, to_json_schema_js_1.process)(def.catchall, ctx, {
					...params,
					path: [...params.path, "additionalProperties"]
				});
			};
			exports.objectProcessor = objectProcessor;
			const unionProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				const isExclusive = def.inclusive === false;
				const options = def.options.map((x, i) => (0, to_json_schema_js_1.process)(x, ctx, {
					...params,
					path: [
						...params.path,
						isExclusive ? "oneOf" : "anyOf",
						i
					]
				}));
				if (isExclusive) json.oneOf = options;
				else json.anyOf = options;
			};
			exports.unionProcessor = unionProcessor;
			const intersectionProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				const a = (0, to_json_schema_js_1.process)(def.left, ctx, {
					...params,
					path: [
						...params.path,
						"allOf",
						0
					]
				});
				const b = (0, to_json_schema_js_1.process)(def.right, ctx, {
					...params,
					path: [
						...params.path,
						"allOf",
						1
					]
				});
				const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
				json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
			};
			exports.intersectionProcessor = intersectionProcessor;
			const tupleProcessor = (schema, ctx, _json, params) => {
				const json = _json;
				const def = schema._zod.def;
				json.type = "array";
				const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
				const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
				const prefixItems = def.items.map((x, i) => (0, to_json_schema_js_1.process)(x, ctx, {
					...params,
					path: [
						...params.path,
						prefixPath,
						i
					]
				}));
				const rest = def.rest ? (0, to_json_schema_js_1.process)(def.rest, ctx, {
					...params,
					path: [
						...params.path,
						restPath,
						...ctx.target === "openapi-3.0" ? [def.items.length] : []
					]
				}) : null;
				if (ctx.target === "draft-2020-12") {
					json.prefixItems = prefixItems;
					if (rest) json.items = rest;
				} else if (ctx.target === "openapi-3.0") {
					json.items = { anyOf: prefixItems };
					if (rest) json.items.anyOf.push(rest);
					json.minItems = prefixItems.length;
					if (!rest) json.maxItems = prefixItems.length;
				} else {
					json.items = prefixItems;
					if (rest) json.additionalItems = rest;
				}
				const { minimum, maximum } = schema._zod.bag;
				if (typeof minimum === "number") json.minItems = minimum;
				if (typeof maximum === "number") json.maxItems = maximum;
			};
			exports.tupleProcessor = tupleProcessor;
			const recordProcessor = (schema, ctx, _json, params) => {
				const json = _json;
				const def = schema._zod.def;
				json.type = "object";
				const keyType = def.keyType;
				const patterns = keyType._zod.bag?.patterns;
				if (def.mode === "loose" && patterns && patterns.size > 0) {
					const valueSchema = (0, to_json_schema_js_1.process)(def.valueType, ctx, {
						...params,
						path: [
							...params.path,
							"patternProperties",
							"*"
						]
					});
					json.patternProperties = {};
					for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
				} else {
					if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = (0, to_json_schema_js_1.process)(def.keyType, ctx, {
						...params,
						path: [...params.path, "propertyNames"]
					});
					json.additionalProperties = (0, to_json_schema_js_1.process)(def.valueType, ctx, {
						...params,
						path: [...params.path, "additionalProperties"]
					});
				}
				const keyValues = keyType._zod.values;
				if (keyValues) {
					const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
					if (validKeyValues.length > 0) json.required = validKeyValues;
				}
			};
			exports.recordProcessor = recordProcessor;
			const nullableProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				const inner = (0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				if (ctx.target === "openapi-3.0") {
					seen.ref = def.innerType;
					json.nullable = true;
				} else json.anyOf = [inner, { type: "null" }];
			};
			exports.nullableProcessor = nullableProcessor;
			const nonoptionalProcessor = (schema, ctx, _json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
			};
			exports.nonoptionalProcessor = nonoptionalProcessor;
			const defaultProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
				json.default = JSON.parse(JSON.stringify(def.defaultValue));
			};
			exports.defaultProcessor = defaultProcessor;
			const prefaultProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
				if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
			};
			exports.prefaultProcessor = prefaultProcessor;
			const catchProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
				let catchValue;
				try {
					catchValue = def.catchValue(void 0);
				} catch {
					throw new Error("Dynamic catch values are not supported in JSON Schema");
				}
				json.default = catchValue;
			};
			exports.catchProcessor = catchProcessor;
			const pipeProcessor = (schema, ctx, _json, params) => {
				const def = schema._zod.def;
				const inIsTransform = def.in._zod.traits.has("$ZodTransform");
				const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
				(0, to_json_schema_js_1.process)(innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = innerType;
			};
			exports.pipeProcessor = pipeProcessor;
			const readonlyProcessor = (schema, ctx, json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
				json.readOnly = true;
			};
			exports.readonlyProcessor = readonlyProcessor;
			const promiseProcessor = (schema, ctx, _json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
			};
			exports.promiseProcessor = promiseProcessor;
			const optionalProcessor = (schema, ctx, _json, params) => {
				const def = schema._zod.def;
				(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = def.innerType;
			};
			exports.optionalProcessor = optionalProcessor;
			const lazyProcessor = (schema, ctx, _json, params) => {
				const innerType = schema._zod.innerType;
				(0, to_json_schema_js_1.process)(innerType, ctx, params);
				const seen = ctx.seen.get(schema);
				seen.ref = innerType;
			};
			exports.lazyProcessor = lazyProcessor;
			exports.allProcessors = {
				string: exports.stringProcessor,
				number: exports.numberProcessor,
				boolean: exports.booleanProcessor,
				bigint: exports.bigintProcessor,
				symbol: exports.symbolProcessor,
				null: exports.nullProcessor,
				undefined: exports.undefinedProcessor,
				void: exports.voidProcessor,
				never: exports.neverProcessor,
				any: exports.anyProcessor,
				unknown: exports.unknownProcessor,
				date: exports.dateProcessor,
				enum: exports.enumProcessor,
				literal: exports.literalProcessor,
				nan: exports.nanProcessor,
				template_literal: exports.templateLiteralProcessor,
				file: exports.fileProcessor,
				success: exports.successProcessor,
				custom: exports.customProcessor,
				function: exports.functionProcessor,
				transform: exports.transformProcessor,
				map: exports.mapProcessor,
				set: exports.setProcessor,
				array: exports.arrayProcessor,
				object: exports.objectProcessor,
				union: exports.unionProcessor,
				intersection: exports.intersectionProcessor,
				tuple: exports.tupleProcessor,
				record: exports.recordProcessor,
				nullable: exports.nullableProcessor,
				nonoptional: exports.nonoptionalProcessor,
				default: exports.defaultProcessor,
				prefault: exports.prefaultProcessor,
				catch: exports.catchProcessor,
				pipe: exports.pipeProcessor,
				readonly: exports.readonlyProcessor,
				promise: exports.promiseProcessor,
				optional: exports.optionalProcessor,
				lazy: exports.lazyProcessor
			};
			function toJSONSchema(input, params) {
				if ("_idmap" in input) {
					const registry = input;
					const ctx = (0, to_json_schema_js_1.initializeContext)({
						...params,
						processors: exports.allProcessors
					});
					const defs = {};
					for (const entry of registry._idmap.entries()) {
						const [_, schema] = entry;
						(0, to_json_schema_js_1.process)(schema, ctx);
					}
					const schemas = {};
					ctx.external = {
						registry,
						uri: params?.uri,
						defs
					};
					for (const entry of registry._idmap.entries()) {
						const [key, schema] = entry;
						(0, to_json_schema_js_1.extractDefs)(ctx, schema);
						schemas[key] = (0, to_json_schema_js_1.finalize)(ctx, schema);
					}
					if (Object.keys(defs).length > 0) schemas.__shared = { [ctx.target === "draft-2020-12" ? "$defs" : "definitions"]: defs };
					return { schemas };
				}
				const ctx = (0, to_json_schema_js_1.initializeContext)({
					...params,
					processors: exports.allProcessors
				});
				(0, to_json_schema_js_1.process)(input, ctx);
				(0, to_json_schema_js_1.extractDefs)(ctx, input);
				return (0, to_json_schema_js_1.finalize)(ctx, input);
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/json-schema-generator.cjs
		var require_json_schema_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.JSONSchemaGenerator = void 0;
			const json_schema_processors_js_1 = require_json_schema_processors();
			const to_json_schema_js_1 = require_to_json_schema();
			/**
			* Legacy class-based interface for JSON Schema generation.
			* This class wraps the new functional implementation to provide backward compatibility.
			*
			* @deprecated Use the `toJSONSchema` function instead for new code.
			*
			* @example
			* ```typescript
			* // Legacy usage (still supported)
			* const gen = new JSONSchemaGenerator({ target: "draft-07" });
			* gen.process(schema);
			* const result = gen.emit(schema);
			*
			* // Preferred modern usage
			* const result = toJSONSchema(schema, { target: "draft-07" });
			* ```
			*/
			var JSONSchemaGenerator = class {
				/** @deprecated Access via ctx instead */
				get metadataRegistry() {
					return this.ctx.metadataRegistry;
				}
				/** @deprecated Access via ctx instead */
				get target() {
					return this.ctx.target;
				}
				/** @deprecated Access via ctx instead */
				get unrepresentable() {
					return this.ctx.unrepresentable;
				}
				/** @deprecated Access via ctx instead */
				get override() {
					return this.ctx.override;
				}
				/** @deprecated Access via ctx instead */
				get io() {
					return this.ctx.io;
				}
				/** @deprecated Access via ctx instead */
				get counter() {
					return this.ctx.counter;
				}
				set counter(value) {
					this.ctx.counter = value;
				}
				/** @deprecated Access via ctx instead */
				get seen() {
					return this.ctx.seen;
				}
				constructor(params) {
					let normalizedTarget = params?.target ?? "draft-2020-12";
					if (normalizedTarget === "draft-4") normalizedTarget = "draft-04";
					if (normalizedTarget === "draft-7") normalizedTarget = "draft-07";
					this.ctx = (0, to_json_schema_js_1.initializeContext)({
						processors: json_schema_processors_js_1.allProcessors,
						target: normalizedTarget,
						...params?.metadata && { metadata: params.metadata },
						...params?.unrepresentable && { unrepresentable: params.unrepresentable },
						...params?.override && { override: params.override },
						...params?.io && { io: params.io }
					});
				}
				/**
				* Process a schema to prepare it for JSON Schema generation.
				* This must be called before emit().
				*/
				process(schema, _params = {
					path: [],
					schemaPath: []
				}) {
					return (0, to_json_schema_js_1.process)(schema, this.ctx, _params);
				}
				/**
				* Emit the final JSON Schema after processing.
				* Must call process() first.
				*/
				emit(schema, _params) {
					if (_params) {
						if (_params.cycles) this.ctx.cycles = _params.cycles;
						if (_params.reused) this.ctx.reused = _params.reused;
						if (_params.external) this.ctx.external = _params.external;
					}
					(0, to_json_schema_js_1.extractDefs)(this.ctx, schema);
					const { "~standard": _, ...plainResult } = (0, to_json_schema_js_1.finalize)(this.ctx, schema);
					return plainResult;
				}
			};
			exports.JSONSchemaGenerator = JSONSchemaGenerator;
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/json-schema.cjs
		var require_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/core/index.cjs
		var require_core = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __exportStar = exports && exports.__exportStar || function(m, exports$3) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$3, p)) __createBinding(exports$3, m, p);
			};
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.JSONSchema = exports.JSONSchemaGenerator = exports.toJSONSchema = exports.locales = exports.regexes = exports.util = void 0;
			__exportStar(require_core$1(), exports);
			__exportStar(require_parse$1(), exports);
			__exportStar(require_errors$1(), exports);
			__exportStar(require_schemas$1(), exports);
			__exportStar(require_checks$1(), exports);
			__exportStar(require_versions(), exports);
			exports.util = __importStar(require_util());
			exports.regexes = __importStar(require_regexes());
			exports.locales = __importStar(require_locales());
			__exportStar(require_registries(), exports);
			__exportStar(require_doc(), exports);
			__exportStar(require_api(), exports);
			__exportStar(require_to_json_schema(), exports);
			var json_schema_processors_js_1 = require_json_schema_processors();
			Object.defineProperty(exports, "toJSONSchema", {
				enumerable: true,
				get: function() {
					return json_schema_processors_js_1.toJSONSchema;
				}
			});
			var json_schema_generator_js_1 = require_json_schema_generator();
			Object.defineProperty(exports, "JSONSchemaGenerator", {
				enumerable: true,
				get: function() {
					return json_schema_generator_js_1.JSONSchemaGenerator;
				}
			});
			exports.JSONSchema = __importStar(require_json_schema());
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/checks.cjs
		var require_checks = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.slugify = exports.toUpperCase = exports.toLowerCase = exports.trim = exports.normalize = exports.overwrite = exports.mime = exports.property = exports.endsWith = exports.startsWith = exports.includes = exports.uppercase = exports.lowercase = exports.regex = exports.length = exports.minLength = exports.maxLength = exports.size = exports.minSize = exports.maxSize = exports.multipleOf = exports.nonnegative = exports.nonpositive = exports.negative = exports.positive = exports.gte = exports.gt = exports.lte = exports.lt = void 0;
			var index_js_1 = require_core();
			Object.defineProperty(exports, "lt", {
				enumerable: true,
				get: function() {
					return index_js_1._lt;
				}
			});
			Object.defineProperty(exports, "lte", {
				enumerable: true,
				get: function() {
					return index_js_1._lte;
				}
			});
			Object.defineProperty(exports, "gt", {
				enumerable: true,
				get: function() {
					return index_js_1._gt;
				}
			});
			Object.defineProperty(exports, "gte", {
				enumerable: true,
				get: function() {
					return index_js_1._gte;
				}
			});
			Object.defineProperty(exports, "positive", {
				enumerable: true,
				get: function() {
					return index_js_1._positive;
				}
			});
			Object.defineProperty(exports, "negative", {
				enumerable: true,
				get: function() {
					return index_js_1._negative;
				}
			});
			Object.defineProperty(exports, "nonpositive", {
				enumerable: true,
				get: function() {
					return index_js_1._nonpositive;
				}
			});
			Object.defineProperty(exports, "nonnegative", {
				enumerable: true,
				get: function() {
					return index_js_1._nonnegative;
				}
			});
			Object.defineProperty(exports, "multipleOf", {
				enumerable: true,
				get: function() {
					return index_js_1._multipleOf;
				}
			});
			Object.defineProperty(exports, "maxSize", {
				enumerable: true,
				get: function() {
					return index_js_1._maxSize;
				}
			});
			Object.defineProperty(exports, "minSize", {
				enumerable: true,
				get: function() {
					return index_js_1._minSize;
				}
			});
			Object.defineProperty(exports, "size", {
				enumerable: true,
				get: function() {
					return index_js_1._size;
				}
			});
			Object.defineProperty(exports, "maxLength", {
				enumerable: true,
				get: function() {
					return index_js_1._maxLength;
				}
			});
			Object.defineProperty(exports, "minLength", {
				enumerable: true,
				get: function() {
					return index_js_1._minLength;
				}
			});
			Object.defineProperty(exports, "length", {
				enumerable: true,
				get: function() {
					return index_js_1._length;
				}
			});
			Object.defineProperty(exports, "regex", {
				enumerable: true,
				get: function() {
					return index_js_1._regex;
				}
			});
			Object.defineProperty(exports, "lowercase", {
				enumerable: true,
				get: function() {
					return index_js_1._lowercase;
				}
			});
			Object.defineProperty(exports, "uppercase", {
				enumerable: true,
				get: function() {
					return index_js_1._uppercase;
				}
			});
			Object.defineProperty(exports, "includes", {
				enumerable: true,
				get: function() {
					return index_js_1._includes;
				}
			});
			Object.defineProperty(exports, "startsWith", {
				enumerable: true,
				get: function() {
					return index_js_1._startsWith;
				}
			});
			Object.defineProperty(exports, "endsWith", {
				enumerable: true,
				get: function() {
					return index_js_1._endsWith;
				}
			});
			Object.defineProperty(exports, "property", {
				enumerable: true,
				get: function() {
					return index_js_1._property;
				}
			});
			Object.defineProperty(exports, "mime", {
				enumerable: true,
				get: function() {
					return index_js_1._mime;
				}
			});
			Object.defineProperty(exports, "overwrite", {
				enumerable: true,
				get: function() {
					return index_js_1._overwrite;
				}
			});
			Object.defineProperty(exports, "normalize", {
				enumerable: true,
				get: function() {
					return index_js_1._normalize;
				}
			});
			Object.defineProperty(exports, "trim", {
				enumerable: true,
				get: function() {
					return index_js_1._trim;
				}
			});
			Object.defineProperty(exports, "toLowerCase", {
				enumerable: true,
				get: function() {
					return index_js_1._toLowerCase;
				}
			});
			Object.defineProperty(exports, "toUpperCase", {
				enumerable: true,
				get: function() {
					return index_js_1._toUpperCase;
				}
			});
			Object.defineProperty(exports, "slugify", {
				enumerable: true,
				get: function() {
					return index_js_1._slugify;
				}
			});
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/iso.cjs
		var require_iso = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = void 0;
			exports.datetime = datetime;
			exports.date = date;
			exports.time = time;
			exports.duration = duration;
			const core = __importStar(require_core());
			const schemas = __importStar(require_schemas());
			exports.ZodISODateTime = core.$constructor("ZodISODateTime", (inst, def) => {
				core.$ZodISODateTime.init(inst, def);
				schemas.ZodStringFormat.init(inst, def);
			});
			function datetime(params) {
				return core._isoDateTime(exports.ZodISODateTime, params);
			}
			exports.ZodISODate = core.$constructor("ZodISODate", (inst, def) => {
				core.$ZodISODate.init(inst, def);
				schemas.ZodStringFormat.init(inst, def);
			});
			function date(params) {
				return core._isoDate(exports.ZodISODate, params);
			}
			exports.ZodISOTime = core.$constructor("ZodISOTime", (inst, def) => {
				core.$ZodISOTime.init(inst, def);
				schemas.ZodStringFormat.init(inst, def);
			});
			function time(params) {
				return core._isoTime(exports.ZodISOTime, params);
			}
			exports.ZodISODuration = core.$constructor("ZodISODuration", (inst, def) => {
				core.$ZodISODuration.init(inst, def);
				schemas.ZodStringFormat.init(inst, def);
			});
			function duration(params) {
				return core._isoDuration(exports.ZodISODuration, params);
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/errors.cjs
		var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ZodRealError = exports.ZodError = void 0;
			const core = __importStar(require_core());
			const index_js_1 = require_core();
			const util = __importStar(require_util());
			const initializer = (inst, issues) => {
				index_js_1.$ZodError.init(inst, issues);
				inst.name = "ZodError";
				Object.defineProperties(inst, {
					format: { value: (mapper) => core.formatError(inst, mapper) },
					flatten: { value: (mapper) => core.flattenError(inst, mapper) },
					addIssue: { value: (issue) => {
						inst.issues.push(issue);
						inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
					} },
					addIssues: { value: (issues) => {
						inst.issues.push(...issues);
						inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
					} },
					isEmpty: { get() {
						return inst.issues.length === 0;
					} }
				});
			};
			exports.ZodError = core.$constructor("ZodError", initializer);
			exports.ZodRealError = core.$constructor("ZodError", initializer, { Parent: Error });
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/parse.cjs
		var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.safeDecodeAsync = exports.safeEncodeAsync = exports.safeDecode = exports.safeEncode = exports.decodeAsync = exports.encodeAsync = exports.decode = exports.encode = exports.safeParseAsync = exports.safeParse = exports.parseAsync = exports.parse = void 0;
			const core = __importStar(require_core());
			const errors_js_1 = require_errors();
			exports.parse = core._parse(errors_js_1.ZodRealError);
			exports.parseAsync = core._parseAsync(errors_js_1.ZodRealError);
			exports.safeParse = core._safeParse(errors_js_1.ZodRealError);
			exports.safeParseAsync = core._safeParseAsync(errors_js_1.ZodRealError);
			exports.encode = core._encode(errors_js_1.ZodRealError);
			exports.decode = core._decode(errors_js_1.ZodRealError);
			exports.encodeAsync = core._encodeAsync(errors_js_1.ZodRealError);
			exports.decodeAsync = core._decodeAsync(errors_js_1.ZodRealError);
			exports.safeEncode = core._safeEncode(errors_js_1.ZodRealError);
			exports.safeDecode = core._safeDecode(errors_js_1.ZodRealError);
			exports.safeEncodeAsync = core._safeEncodeAsync(errors_js_1.ZodRealError);
			exports.safeDecodeAsync = core._safeDecodeAsync(errors_js_1.ZodRealError);
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/schemas.cjs
		var require_schemas = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ZodLiteral = exports.ZodEnum = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodXor = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodDate = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodBigIntFormat = exports.ZodBigInt = exports.ZodBoolean = exports.ZodNumberFormat = exports.ZodNumber = exports.ZodCustomStringFormat = exports.ZodJWT = exports.ZodE164 = exports.ZodBase64URL = exports.ZodBase64 = exports.ZodCIDRv6 = exports.ZodCIDRv4 = exports.ZodIPv6 = exports.ZodMAC = exports.ZodIPv4 = exports.ZodKSUID = exports.ZodXID = exports.ZodULID = exports.ZodCUID2 = exports.ZodCUID = exports.ZodNanoID = exports.ZodEmoji = exports.ZodURL = exports.ZodUUID = exports.ZodGUID = exports.ZodEmail = exports.ZodStringFormat = exports.ZodString = exports._ZodString = exports.ZodType = void 0;
			exports.stringbool = exports.meta = exports.describe = exports.ZodCustom = exports.ZodFunction = exports.ZodPromise = exports.ZodLazy = exports.ZodTemplateLiteral = exports.ZodReadonly = exports.ZodPreprocess = exports.ZodCodec = exports.ZodPipe = exports.ZodNaN = exports.ZodCatch = exports.ZodSuccess = exports.ZodNonOptional = exports.ZodPrefault = exports.ZodDefault = exports.ZodNullable = exports.ZodExactOptional = exports.ZodOptional = exports.ZodTransform = exports.ZodFile = void 0;
			exports.string = string;
			exports.email = email;
			exports.guid = guid;
			exports.uuid = uuid;
			exports.uuidv4 = uuidv4;
			exports.uuidv6 = uuidv6;
			exports.uuidv7 = uuidv7;
			exports.url = url;
			exports.httpUrl = httpUrl;
			exports.emoji = emoji;
			exports.nanoid = nanoid;
			exports.cuid = cuid;
			exports.cuid2 = cuid2;
			exports.ulid = ulid;
			exports.xid = xid;
			exports.ksuid = ksuid;
			exports.ipv4 = ipv4;
			exports.mac = mac;
			exports.ipv6 = ipv6;
			exports.cidrv4 = cidrv4;
			exports.cidrv6 = cidrv6;
			exports.base64 = base64;
			exports.base64url = base64url;
			exports.e164 = e164;
			exports.jwt = jwt;
			exports.stringFormat = stringFormat;
			exports.hostname = hostname;
			exports.hex = hex;
			exports.hash = hash;
			exports.number = number;
			exports.int = int;
			exports.float32 = float32;
			exports.float64 = float64;
			exports.int32 = int32;
			exports.uint32 = uint32;
			exports.boolean = boolean;
			exports.bigint = bigint;
			exports.int64 = int64;
			exports.uint64 = uint64;
			exports.symbol = symbol;
			exports.undefined = _undefined;
			exports.null = _null;
			exports.any = any;
			exports.unknown = unknown;
			exports.never = never;
			exports.void = _void;
			exports.date = date;
			exports.array = array;
			exports.keyof = keyof;
			exports.object = object;
			exports.strictObject = strictObject;
			exports.looseObject = looseObject;
			exports.union = union;
			exports.xor = xor;
			exports.discriminatedUnion = discriminatedUnion;
			exports.intersection = intersection;
			exports.tuple = tuple;
			exports.record = record;
			exports.partialRecord = partialRecord;
			exports.looseRecord = looseRecord;
			exports.map = map;
			exports.set = set;
			exports.enum = _enum;
			exports.nativeEnum = nativeEnum;
			exports.literal = literal;
			exports.file = file;
			exports.transform = transform;
			exports.optional = optional;
			exports.exactOptional = exactOptional;
			exports.nullable = nullable;
			exports.nullish = nullish;
			exports._default = _default;
			exports.prefault = prefault;
			exports.nonoptional = nonoptional;
			exports.success = success;
			exports.catch = _catch;
			exports.nan = nan;
			exports.pipe = pipe;
			exports.codec = codec;
			exports.invertCodec = invertCodec;
			exports.readonly = readonly;
			exports.templateLiteral = templateLiteral;
			exports.lazy = lazy;
			exports.promise = promise;
			exports._function = _function;
			exports.function = _function;
			exports._function = _function;
			exports.function = _function;
			exports.check = check;
			exports.custom = custom;
			exports.refine = refine;
			exports.superRefine = superRefine;
			exports.instanceof = _instanceof;
			exports.json = json;
			exports.preprocess = preprocess;
			const core = __importStar(require_core());
			const index_js_1 = require_core();
			const processors = __importStar(require_json_schema_processors());
			const to_json_schema_js_1 = require_to_json_schema();
			const checks = __importStar(require_checks());
			const iso = __importStar(require_iso());
			const parse = __importStar(require_parse());
			const _installedGroups = /* @__PURE__ */ new WeakMap();
			function _installLazyMethods(inst, group, methods) {
				const proto = Object.getPrototypeOf(inst);
				let installed = _installedGroups.get(proto);
				if (!installed) {
					installed = /* @__PURE__ */ new Set();
					_installedGroups.set(proto, installed);
				}
				if (installed.has(group)) return;
				installed.add(group);
				for (const key in methods) {
					const fn = methods[key];
					Object.defineProperty(proto, key, {
						configurable: true,
						enumerable: false,
						get() {
							const bound = fn.bind(this);
							Object.defineProperty(this, key, {
								configurable: true,
								writable: true,
								enumerable: true,
								value: bound
							});
							return bound;
						},
						set(v) {
							Object.defineProperty(this, key, {
								configurable: true,
								writable: true,
								enumerable: true,
								value: v
							});
						}
					});
				}
			}
			exports.ZodType = core.$constructor("ZodType", (inst, def) => {
				core.$ZodType.init(inst, def);
				Object.assign(inst["~standard"], { jsonSchema: {
					input: (0, to_json_schema_js_1.createStandardJSONSchemaMethod)(inst, "input"),
					output: (0, to_json_schema_js_1.createStandardJSONSchemaMethod)(inst, "output")
				} });
				inst.toJSONSchema = (0, to_json_schema_js_1.createToJSONSchemaMethod)(inst, {});
				inst.def = def;
				inst.type = def.type;
				Object.defineProperty(inst, "_def", { value: def });
				inst.parse = (data, params) => parse.parse(inst, data, params, { callee: inst.parse });
				inst.safeParse = (data, params) => parse.safeParse(inst, data, params);
				inst.parseAsync = async (data, params) => parse.parseAsync(inst, data, params, { callee: inst.parseAsync });
				inst.safeParseAsync = async (data, params) => parse.safeParseAsync(inst, data, params);
				inst.spa = inst.safeParseAsync;
				inst.encode = (data, params) => parse.encode(inst, data, params);
				inst.decode = (data, params) => parse.decode(inst, data, params);
				inst.encodeAsync = async (data, params) => parse.encodeAsync(inst, data, params);
				inst.decodeAsync = async (data, params) => parse.decodeAsync(inst, data, params);
				inst.safeEncode = (data, params) => parse.safeEncode(inst, data, params);
				inst.safeDecode = (data, params) => parse.safeDecode(inst, data, params);
				inst.safeEncodeAsync = async (data, params) => parse.safeEncodeAsync(inst, data, params);
				inst.safeDecodeAsync = async (data, params) => parse.safeDecodeAsync(inst, data, params);
				_installLazyMethods(inst, "ZodType", {
					check(...chks) {
						const def = this.def;
						return this.clone(index_js_1.util.mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
							check: ch,
							def: { check: "custom" },
							onattach: []
						} } : ch)] }), { parent: true });
					},
					with(...chks) {
						return this.check(...chks);
					},
					clone(def, params) {
						return core.clone(this, def, params);
					},
					brand() {
						return this;
					},
					register(reg, meta) {
						reg.add(this, meta);
						return this;
					},
					refine(check, params) {
						return this.check(refine(check, params));
					},
					superRefine(refinement, params) {
						return this.check(superRefine(refinement, params));
					},
					overwrite(fn) {
						return this.check(checks.overwrite(fn));
					},
					optional() {
						return optional(this);
					},
					exactOptional() {
						return exactOptional(this);
					},
					nullable() {
						return nullable(this);
					},
					nullish() {
						return optional(nullable(this));
					},
					nonoptional(params) {
						return nonoptional(this, params);
					},
					array() {
						return array(this);
					},
					or(arg) {
						return union([this, arg]);
					},
					and(arg) {
						return intersection(this, arg);
					},
					transform(tx) {
						return pipe(this, transform(tx));
					},
					default(d) {
						return _default(this, d);
					},
					prefault(d) {
						return prefault(this, d);
					},
					catch(params) {
						return _catch(this, params);
					},
					pipe(target) {
						return pipe(this, target);
					},
					readonly() {
						return readonly(this);
					},
					describe(description) {
						const cl = this.clone();
						core.globalRegistry.add(cl, { description });
						return cl;
					},
					meta(...args) {
						if (args.length === 0) return core.globalRegistry.get(this);
						const cl = this.clone();
						core.globalRegistry.add(cl, args[0]);
						return cl;
					},
					isOptional() {
						return this.safeParse(void 0).success;
					},
					isNullable() {
						return this.safeParse(null).success;
					},
					apply(fn) {
						return fn(this);
					}
				});
				Object.defineProperty(inst, "description", {
					get() {
						return core.globalRegistry.get(inst)?.description;
					},
					configurable: true
				});
				return inst;
			});
			/** @internal */
			exports._ZodString = core.$constructor("_ZodString", (inst, def) => {
				core.$ZodString.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.stringProcessor(inst, ctx, json, params);
				const bag = inst._zod.bag;
				inst.format = bag.format ?? null;
				inst.minLength = bag.minimum ?? null;
				inst.maxLength = bag.maximum ?? null;
				_installLazyMethods(inst, "_ZodString", {
					regex(...args) {
						return this.check(checks.regex(...args));
					},
					includes(...args) {
						return this.check(checks.includes(...args));
					},
					startsWith(...args) {
						return this.check(checks.startsWith(...args));
					},
					endsWith(...args) {
						return this.check(checks.endsWith(...args));
					},
					min(...args) {
						return this.check(checks.minLength(...args));
					},
					max(...args) {
						return this.check(checks.maxLength(...args));
					},
					length(...args) {
						return this.check(checks.length(...args));
					},
					nonempty(...args) {
						return this.check(checks.minLength(1, ...args));
					},
					lowercase(params) {
						return this.check(checks.lowercase(params));
					},
					uppercase(params) {
						return this.check(checks.uppercase(params));
					},
					trim() {
						return this.check(checks.trim());
					},
					normalize(...args) {
						return this.check(checks.normalize(...args));
					},
					toLowerCase() {
						return this.check(checks.toLowerCase());
					},
					toUpperCase() {
						return this.check(checks.toUpperCase());
					},
					slugify() {
						return this.check(checks.slugify());
					}
				});
			});
			exports.ZodString = core.$constructor("ZodString", (inst, def) => {
				core.$ZodString.init(inst, def);
				exports._ZodString.init(inst, def);
				inst.email = (params) => inst.check(core._email(exports.ZodEmail, params));
				inst.url = (params) => inst.check(core._url(exports.ZodURL, params));
				inst.jwt = (params) => inst.check(core._jwt(exports.ZodJWT, params));
				inst.emoji = (params) => inst.check(core._emoji(exports.ZodEmoji, params));
				inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
				inst.uuid = (params) => inst.check(core._uuid(exports.ZodUUID, params));
				inst.uuidv4 = (params) => inst.check(core._uuidv4(exports.ZodUUID, params));
				inst.uuidv6 = (params) => inst.check(core._uuidv6(exports.ZodUUID, params));
				inst.uuidv7 = (params) => inst.check(core._uuidv7(exports.ZodUUID, params));
				inst.nanoid = (params) => inst.check(core._nanoid(exports.ZodNanoID, params));
				inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
				inst.cuid = (params) => inst.check(core._cuid(exports.ZodCUID, params));
				inst.cuid2 = (params) => inst.check(core._cuid2(exports.ZodCUID2, params));
				inst.ulid = (params) => inst.check(core._ulid(exports.ZodULID, params));
				inst.base64 = (params) => inst.check(core._base64(exports.ZodBase64, params));
				inst.base64url = (params) => inst.check(core._base64url(exports.ZodBase64URL, params));
				inst.xid = (params) => inst.check(core._xid(exports.ZodXID, params));
				inst.ksuid = (params) => inst.check(core._ksuid(exports.ZodKSUID, params));
				inst.ipv4 = (params) => inst.check(core._ipv4(exports.ZodIPv4, params));
				inst.ipv6 = (params) => inst.check(core._ipv6(exports.ZodIPv6, params));
				inst.cidrv4 = (params) => inst.check(core._cidrv4(exports.ZodCIDRv4, params));
				inst.cidrv6 = (params) => inst.check(core._cidrv6(exports.ZodCIDRv6, params));
				inst.e164 = (params) => inst.check(core._e164(exports.ZodE164, params));
				inst.datetime = (params) => inst.check(iso.datetime(params));
				inst.date = (params) => inst.check(iso.date(params));
				inst.time = (params) => inst.check(iso.time(params));
				inst.duration = (params) => inst.check(iso.duration(params));
			});
			function string(params) {
				return core._string(exports.ZodString, params);
			}
			exports.ZodStringFormat = core.$constructor("ZodStringFormat", (inst, def) => {
				core.$ZodStringFormat.init(inst, def);
				exports._ZodString.init(inst, def);
			});
			exports.ZodEmail = core.$constructor("ZodEmail", (inst, def) => {
				core.$ZodEmail.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function email(params) {
				return core._email(exports.ZodEmail, params);
			}
			exports.ZodGUID = core.$constructor("ZodGUID", (inst, def) => {
				core.$ZodGUID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function guid(params) {
				return core._guid(exports.ZodGUID, params);
			}
			exports.ZodUUID = core.$constructor("ZodUUID", (inst, def) => {
				core.$ZodUUID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function uuid(params) {
				return core._uuid(exports.ZodUUID, params);
			}
			function uuidv4(params) {
				return core._uuidv4(exports.ZodUUID, params);
			}
			function uuidv6(params) {
				return core._uuidv6(exports.ZodUUID, params);
			}
			function uuidv7(params) {
				return core._uuidv7(exports.ZodUUID, params);
			}
			exports.ZodURL = core.$constructor("ZodURL", (inst, def) => {
				core.$ZodURL.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function url(params) {
				return core._url(exports.ZodURL, params);
			}
			function httpUrl(params) {
				return core._url(exports.ZodURL, {
					protocol: core.regexes.httpProtocol,
					hostname: core.regexes.domain,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodEmoji = core.$constructor("ZodEmoji", (inst, def) => {
				core.$ZodEmoji.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function emoji(params) {
				return core._emoji(exports.ZodEmoji, params);
			}
			exports.ZodNanoID = core.$constructor("ZodNanoID", (inst, def) => {
				core.$ZodNanoID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function nanoid(params) {
				return core._nanoid(exports.ZodNanoID, params);
			}
			/**
			* @deprecated CUID v1 is deprecated by its authors due to information leakage
			* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
			* See https://github.com/paralleldrive/cuid.
			*/
			exports.ZodCUID = core.$constructor("ZodCUID", (inst, def) => {
				core.$ZodCUID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			/**
			* Validates a CUID v1 string.
			*
			* @deprecated CUID v1 is deprecated by its authors due to information leakage
			* (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
			* See https://github.com/paralleldrive/cuid.
			*/
			function cuid(params) {
				return core._cuid(exports.ZodCUID, params);
			}
			exports.ZodCUID2 = core.$constructor("ZodCUID2", (inst, def) => {
				core.$ZodCUID2.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function cuid2(params) {
				return core._cuid2(exports.ZodCUID2, params);
			}
			exports.ZodULID = core.$constructor("ZodULID", (inst, def) => {
				core.$ZodULID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function ulid(params) {
				return core._ulid(exports.ZodULID, params);
			}
			exports.ZodXID = core.$constructor("ZodXID", (inst, def) => {
				core.$ZodXID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function xid(params) {
				return core._xid(exports.ZodXID, params);
			}
			exports.ZodKSUID = core.$constructor("ZodKSUID", (inst, def) => {
				core.$ZodKSUID.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function ksuid(params) {
				return core._ksuid(exports.ZodKSUID, params);
			}
			exports.ZodIPv4 = core.$constructor("ZodIPv4", (inst, def) => {
				core.$ZodIPv4.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function ipv4(params) {
				return core._ipv4(exports.ZodIPv4, params);
			}
			exports.ZodMAC = core.$constructor("ZodMAC", (inst, def) => {
				core.$ZodMAC.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function mac(params) {
				return core._mac(exports.ZodMAC, params);
			}
			exports.ZodIPv6 = core.$constructor("ZodIPv6", (inst, def) => {
				core.$ZodIPv6.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function ipv6(params) {
				return core._ipv6(exports.ZodIPv6, params);
			}
			exports.ZodCIDRv4 = core.$constructor("ZodCIDRv4", (inst, def) => {
				core.$ZodCIDRv4.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function cidrv4(params) {
				return core._cidrv4(exports.ZodCIDRv4, params);
			}
			exports.ZodCIDRv6 = core.$constructor("ZodCIDRv6", (inst, def) => {
				core.$ZodCIDRv6.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function cidrv6(params) {
				return core._cidrv6(exports.ZodCIDRv6, params);
			}
			exports.ZodBase64 = core.$constructor("ZodBase64", (inst, def) => {
				core.$ZodBase64.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function base64(params) {
				return core._base64(exports.ZodBase64, params);
			}
			exports.ZodBase64URL = core.$constructor("ZodBase64URL", (inst, def) => {
				core.$ZodBase64URL.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function base64url(params) {
				return core._base64url(exports.ZodBase64URL, params);
			}
			exports.ZodE164 = core.$constructor("ZodE164", (inst, def) => {
				core.$ZodE164.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function e164(params) {
				return core._e164(exports.ZodE164, params);
			}
			exports.ZodJWT = core.$constructor("ZodJWT", (inst, def) => {
				core.$ZodJWT.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function jwt(params) {
				return core._jwt(exports.ZodJWT, params);
			}
			exports.ZodCustomStringFormat = core.$constructor("ZodCustomStringFormat", (inst, def) => {
				core.$ZodCustomStringFormat.init(inst, def);
				exports.ZodStringFormat.init(inst, def);
			});
			function stringFormat(format, fnOrRegex, _params = {}) {
				return core._stringFormat(exports.ZodCustomStringFormat, format, fnOrRegex, _params);
			}
			function hostname(_params) {
				return core._stringFormat(exports.ZodCustomStringFormat, "hostname", core.regexes.hostname, _params);
			}
			function hex(_params) {
				return core._stringFormat(exports.ZodCustomStringFormat, "hex", core.regexes.hex, _params);
			}
			function hash(alg, params) {
				const format = `${alg}_${params?.enc ?? "hex"}`;
				const regex = core.regexes[format];
				if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
				return core._stringFormat(exports.ZodCustomStringFormat, format, regex, params);
			}
			exports.ZodNumber = core.$constructor("ZodNumber", (inst, def) => {
				core.$ZodNumber.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.numberProcessor(inst, ctx, json, params);
				_installLazyMethods(inst, "ZodNumber", {
					gt(value, params) {
						return this.check(checks.gt(value, params));
					},
					gte(value, params) {
						return this.check(checks.gte(value, params));
					},
					min(value, params) {
						return this.check(checks.gte(value, params));
					},
					lt(value, params) {
						return this.check(checks.lt(value, params));
					},
					lte(value, params) {
						return this.check(checks.lte(value, params));
					},
					max(value, params) {
						return this.check(checks.lte(value, params));
					},
					int(params) {
						return this.check(int(params));
					},
					safe(params) {
						return this.check(int(params));
					},
					positive(params) {
						return this.check(checks.gt(0, params));
					},
					nonnegative(params) {
						return this.check(checks.gte(0, params));
					},
					negative(params) {
						return this.check(checks.lt(0, params));
					},
					nonpositive(params) {
						return this.check(checks.lte(0, params));
					},
					multipleOf(value, params) {
						return this.check(checks.multipleOf(value, params));
					},
					step(value, params) {
						return this.check(checks.multipleOf(value, params));
					},
					finite() {
						return this;
					}
				});
				const bag = inst._zod.bag;
				inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
				inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
				inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
				inst.isFinite = true;
				inst.format = bag.format ?? null;
			});
			function number(params) {
				return core._number(exports.ZodNumber, params);
			}
			exports.ZodNumberFormat = core.$constructor("ZodNumberFormat", (inst, def) => {
				core.$ZodNumberFormat.init(inst, def);
				exports.ZodNumber.init(inst, def);
			});
			function int(params) {
				return core._int(exports.ZodNumberFormat, params);
			}
			function float32(params) {
				return core._float32(exports.ZodNumberFormat, params);
			}
			function float64(params) {
				return core._float64(exports.ZodNumberFormat, params);
			}
			function int32(params) {
				return core._int32(exports.ZodNumberFormat, params);
			}
			function uint32(params) {
				return core._uint32(exports.ZodNumberFormat, params);
			}
			exports.ZodBoolean = core.$constructor("ZodBoolean", (inst, def) => {
				core.$ZodBoolean.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.booleanProcessor(inst, ctx, json, params);
			});
			function boolean(params) {
				return core._boolean(exports.ZodBoolean, params);
			}
			exports.ZodBigInt = core.$constructor("ZodBigInt", (inst, def) => {
				core.$ZodBigInt.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.bigintProcessor(inst, ctx, json, params);
				inst.gte = (value, params) => inst.check(checks.gte(value, params));
				inst.min = (value, params) => inst.check(checks.gte(value, params));
				inst.gt = (value, params) => inst.check(checks.gt(value, params));
				inst.gte = (value, params) => inst.check(checks.gte(value, params));
				inst.min = (value, params) => inst.check(checks.gte(value, params));
				inst.lt = (value, params) => inst.check(checks.lt(value, params));
				inst.lte = (value, params) => inst.check(checks.lte(value, params));
				inst.max = (value, params) => inst.check(checks.lte(value, params));
				inst.positive = (params) => inst.check(checks.gt(BigInt(0), params));
				inst.negative = (params) => inst.check(checks.lt(BigInt(0), params));
				inst.nonpositive = (params) => inst.check(checks.lte(BigInt(0), params));
				inst.nonnegative = (params) => inst.check(checks.gte(BigInt(0), params));
				inst.multipleOf = (value, params) => inst.check(checks.multipleOf(value, params));
				const bag = inst._zod.bag;
				inst.minValue = bag.minimum ?? null;
				inst.maxValue = bag.maximum ?? null;
				inst.format = bag.format ?? null;
			});
			function bigint(params) {
				return core._bigint(exports.ZodBigInt, params);
			}
			exports.ZodBigIntFormat = core.$constructor("ZodBigIntFormat", (inst, def) => {
				core.$ZodBigIntFormat.init(inst, def);
				exports.ZodBigInt.init(inst, def);
			});
			function int64(params) {
				return core._int64(exports.ZodBigIntFormat, params);
			}
			function uint64(params) {
				return core._uint64(exports.ZodBigIntFormat, params);
			}
			exports.ZodSymbol = core.$constructor("ZodSymbol", (inst, def) => {
				core.$ZodSymbol.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.symbolProcessor(inst, ctx, json, params);
			});
			function symbol(params) {
				return core._symbol(exports.ZodSymbol, params);
			}
			exports.ZodUndefined = core.$constructor("ZodUndefined", (inst, def) => {
				core.$ZodUndefined.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.undefinedProcessor(inst, ctx, json, params);
			});
			function _undefined(params) {
				return core._undefined(exports.ZodUndefined, params);
			}
			exports.ZodNull = core.$constructor("ZodNull", (inst, def) => {
				core.$ZodNull.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.nullProcessor(inst, ctx, json, params);
			});
			function _null(params) {
				return core._null(exports.ZodNull, params);
			}
			exports.ZodAny = core.$constructor("ZodAny", (inst, def) => {
				core.$ZodAny.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.anyProcessor(inst, ctx, json, params);
			});
			function any() {
				return core._any(exports.ZodAny);
			}
			exports.ZodUnknown = core.$constructor("ZodUnknown", (inst, def) => {
				core.$ZodUnknown.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.unknownProcessor(inst, ctx, json, params);
			});
			function unknown() {
				return core._unknown(exports.ZodUnknown);
			}
			exports.ZodNever = core.$constructor("ZodNever", (inst, def) => {
				core.$ZodNever.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.neverProcessor(inst, ctx, json, params);
			});
			function never(params) {
				return core._never(exports.ZodNever, params);
			}
			exports.ZodVoid = core.$constructor("ZodVoid", (inst, def) => {
				core.$ZodVoid.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.voidProcessor(inst, ctx, json, params);
			});
			function _void(params) {
				return core._void(exports.ZodVoid, params);
			}
			exports.ZodDate = core.$constructor("ZodDate", (inst, def) => {
				core.$ZodDate.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.dateProcessor(inst, ctx, json, params);
				inst.min = (value, params) => inst.check(checks.gte(value, params));
				inst.max = (value, params) => inst.check(checks.lte(value, params));
				const c = inst._zod.bag;
				inst.minDate = c.minimum ? new Date(c.minimum) : null;
				inst.maxDate = c.maximum ? new Date(c.maximum) : null;
			});
			function date(params) {
				return core._date(exports.ZodDate, params);
			}
			exports.ZodArray = core.$constructor("ZodArray", (inst, def) => {
				core.$ZodArray.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.arrayProcessor(inst, ctx, json, params);
				inst.element = def.element;
				_installLazyMethods(inst, "ZodArray", {
					min(n, params) {
						return this.check(checks.minLength(n, params));
					},
					nonempty(params) {
						return this.check(checks.minLength(1, params));
					},
					max(n, params) {
						return this.check(checks.maxLength(n, params));
					},
					length(n, params) {
						return this.check(checks.length(n, params));
					},
					unwrap() {
						return this.element;
					}
				});
			});
			function array(element, params) {
				return core._array(exports.ZodArray, element, params);
			}
			function keyof(schema) {
				const shape = schema._zod.def.shape;
				return _enum(Object.keys(shape));
			}
			exports.ZodObject = core.$constructor("ZodObject", (inst, def) => {
				core.$ZodObjectJIT.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.objectProcessor(inst, ctx, json, params);
				index_js_1.util.defineLazy(inst, "shape", () => {
					return def.shape;
				});
				_installLazyMethods(inst, "ZodObject", {
					keyof() {
						return _enum(Object.keys(this._zod.def.shape));
					},
					catchall(catchall) {
						return this.clone({
							...this._zod.def,
							catchall
						});
					},
					passthrough() {
						return this.clone({
							...this._zod.def,
							catchall: unknown()
						});
					},
					loose() {
						return this.clone({
							...this._zod.def,
							catchall: unknown()
						});
					},
					strict() {
						return this.clone({
							...this._zod.def,
							catchall: never()
						});
					},
					strip() {
						return this.clone({
							...this._zod.def,
							catchall: void 0
						});
					},
					extend(incoming) {
						return index_js_1.util.extend(this, incoming);
					},
					safeExtend(incoming) {
						return index_js_1.util.safeExtend(this, incoming);
					},
					merge(other) {
						return index_js_1.util.merge(this, other);
					},
					pick(mask) {
						return index_js_1.util.pick(this, mask);
					},
					omit(mask) {
						return index_js_1.util.omit(this, mask);
					},
					partial(...args) {
						return index_js_1.util.partial(exports.ZodOptional, this, args[0]);
					},
					required(...args) {
						return index_js_1.util.required(exports.ZodNonOptional, this, args[0]);
					}
				});
			});
			function object(shape, params) {
				const def = {
					type: "object",
					shape: shape ?? {},
					...index_js_1.util.normalizeParams(params)
				};
				return new exports.ZodObject(def);
			}
			function strictObject(shape, params) {
				return new exports.ZodObject({
					type: "object",
					shape,
					catchall: never(),
					...index_js_1.util.normalizeParams(params)
				});
			}
			function looseObject(shape, params) {
				return new exports.ZodObject({
					type: "object",
					shape,
					catchall: unknown(),
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodUnion = core.$constructor("ZodUnion", (inst, def) => {
				core.$ZodUnion.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
				inst.options = def.options;
			});
			function union(options, params) {
				return new exports.ZodUnion({
					type: "union",
					options,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodXor = core.$constructor("ZodXor", (inst, def) => {
				exports.ZodUnion.init(inst, def);
				core.$ZodXor.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
				inst.options = def.options;
			});
			/** Creates an exclusive union (XOR) where exactly one option must match.
			* Unlike regular unions that succeed when any option matches, xor fails if
			* zero or more than one option matches the input. */
			function xor(options, params) {
				return new exports.ZodXor({
					type: "union",
					options,
					inclusive: false,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodDiscriminatedUnion = core.$constructor("ZodDiscriminatedUnion", (inst, def) => {
				exports.ZodUnion.init(inst, def);
				core.$ZodDiscriminatedUnion.init(inst, def);
			});
			function discriminatedUnion(discriminator, options, params) {
				return new exports.ZodDiscriminatedUnion({
					type: "union",
					options,
					discriminator,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodIntersection = core.$constructor("ZodIntersection", (inst, def) => {
				core.$ZodIntersection.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.intersectionProcessor(inst, ctx, json, params);
			});
			function intersection(left, right) {
				return new exports.ZodIntersection({
					type: "intersection",
					left,
					right
				});
			}
			exports.ZodTuple = core.$constructor("ZodTuple", (inst, def) => {
				core.$ZodTuple.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.tupleProcessor(inst, ctx, json, params);
				inst.rest = (rest) => inst.clone({
					...inst._zod.def,
					rest
				});
			});
			function tuple(items, _paramsOrRest, _params) {
				const hasRest = _paramsOrRest instanceof core.$ZodType;
				const params = hasRest ? _params : _paramsOrRest;
				const rest = hasRest ? _paramsOrRest : null;
				return new exports.ZodTuple({
					type: "tuple",
					items,
					rest,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodRecord = core.$constructor("ZodRecord", (inst, def) => {
				core.$ZodRecord.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.recordProcessor(inst, ctx, json, params);
				inst.keyType = def.keyType;
				inst.valueType = def.valueType;
			});
			function record(keyType, valueType, params) {
				if (!valueType || !valueType._zod) return new exports.ZodRecord({
					type: "record",
					keyType: string(),
					valueType: keyType,
					...index_js_1.util.normalizeParams(valueType)
				});
				return new exports.ZodRecord({
					type: "record",
					keyType,
					valueType,
					...index_js_1.util.normalizeParams(params)
				});
			}
			function partialRecord(keyType, valueType, params) {
				const k = core.clone(keyType);
				k._zod.values = void 0;
				return new exports.ZodRecord({
					type: "record",
					keyType: k,
					valueType,
					...index_js_1.util.normalizeParams(params)
				});
			}
			function looseRecord(keyType, valueType, params) {
				return new exports.ZodRecord({
					type: "record",
					keyType,
					valueType,
					mode: "loose",
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodMap = core.$constructor("ZodMap", (inst, def) => {
				core.$ZodMap.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.mapProcessor(inst, ctx, json, params);
				inst.keyType = def.keyType;
				inst.valueType = def.valueType;
				inst.min = (...args) => inst.check(core._minSize(...args));
				inst.nonempty = (params) => inst.check(core._minSize(1, params));
				inst.max = (...args) => inst.check(core._maxSize(...args));
				inst.size = (...args) => inst.check(core._size(...args));
			});
			function map(keyType, valueType, params) {
				return new exports.ZodMap({
					type: "map",
					keyType,
					valueType,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodSet = core.$constructor("ZodSet", (inst, def) => {
				core.$ZodSet.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.setProcessor(inst, ctx, json, params);
				inst.min = (...args) => inst.check(core._minSize(...args));
				inst.nonempty = (params) => inst.check(core._minSize(1, params));
				inst.max = (...args) => inst.check(core._maxSize(...args));
				inst.size = (...args) => inst.check(core._size(...args));
			});
			function set(valueType, params) {
				return new exports.ZodSet({
					type: "set",
					valueType,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodEnum = core.$constructor("ZodEnum", (inst, def) => {
				core.$ZodEnum.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.enumProcessor(inst, ctx, json, params);
				inst.enum = def.entries;
				inst.options = Object.values(def.entries);
				const keys = new Set(Object.keys(def.entries));
				inst.extract = (values, params) => {
					const newEntries = {};
					for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
					else throw new Error(`Key ${value} not found in enum`);
					return new exports.ZodEnum({
						...def,
						checks: [],
						...index_js_1.util.normalizeParams(params),
						entries: newEntries
					});
				};
				inst.exclude = (values, params) => {
					const newEntries = { ...def.entries };
					for (const value of values) if (keys.has(value)) delete newEntries[value];
					else throw new Error(`Key ${value} not found in enum`);
					return new exports.ZodEnum({
						...def,
						checks: [],
						...index_js_1.util.normalizeParams(params),
						entries: newEntries
					});
				};
			});
			function _enum(values, params) {
				const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
				return new exports.ZodEnum({
					type: "enum",
					entries,
					...index_js_1.util.normalizeParams(params)
				});
			}
			/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
			*
			* ```ts
			* enum Colors { red, green, blue }
			* z.enum(Colors);
			* ```
			*/
			function nativeEnum(entries, params) {
				return new exports.ZodEnum({
					type: "enum",
					entries,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodLiteral = core.$constructor("ZodLiteral", (inst, def) => {
				core.$ZodLiteral.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.literalProcessor(inst, ctx, json, params);
				inst.values = new Set(def.values);
				Object.defineProperty(inst, "value", { get() {
					if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
					return def.values[0];
				} });
			});
			function literal(value, params) {
				return new exports.ZodLiteral({
					type: "literal",
					values: Array.isArray(value) ? value : [value],
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodFile = core.$constructor("ZodFile", (inst, def) => {
				core.$ZodFile.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.fileProcessor(inst, ctx, json, params);
				inst.min = (size, params) => inst.check(core._minSize(size, params));
				inst.max = (size, params) => inst.check(core._maxSize(size, params));
				inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
			});
			function file(params) {
				return core._file(exports.ZodFile, params);
			}
			exports.ZodTransform = core.$constructor("ZodTransform", (inst, def) => {
				core.$ZodTransform.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.transformProcessor(inst, ctx, json, params);
				inst._zod.parse = (payload, _ctx) => {
					if (_ctx.direction === "backward") throw new core.$ZodEncodeError(inst.constructor.name);
					payload.addIssue = (issue) => {
						if (typeof issue === "string") payload.issues.push(index_js_1.util.issue(issue, payload.value, def));
						else {
							const _issue = issue;
							if (_issue.fatal) _issue.continue = false;
							_issue.code ?? (_issue.code = "custom");
							_issue.input ?? (_issue.input = payload.value);
							_issue.inst ?? (_issue.inst = inst);
							payload.issues.push(index_js_1.util.issue(_issue));
						}
					};
					const output = def.transform(payload.value, payload);
					if (output instanceof Promise) return output.then((output) => {
						payload.value = output;
						payload.fallback = true;
						return payload;
					});
					payload.value = output;
					payload.fallback = true;
					return payload;
				};
			});
			function transform(fn) {
				return new exports.ZodTransform({
					type: "transform",
					transform: fn
				});
			}
			exports.ZodOptional = core.$constructor("ZodOptional", (inst, def) => {
				core.$ZodOptional.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function optional(innerType) {
				return new exports.ZodOptional({
					type: "optional",
					innerType
				});
			}
			exports.ZodExactOptional = core.$constructor("ZodExactOptional", (inst, def) => {
				core.$ZodExactOptional.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function exactOptional(innerType) {
				return new exports.ZodExactOptional({
					type: "optional",
					innerType
				});
			}
			exports.ZodNullable = core.$constructor("ZodNullable", (inst, def) => {
				core.$ZodNullable.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.nullableProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function nullable(innerType) {
				return new exports.ZodNullable({
					type: "nullable",
					innerType
				});
			}
			function nullish(innerType) {
				return optional(nullable(innerType));
			}
			exports.ZodDefault = core.$constructor("ZodDefault", (inst, def) => {
				core.$ZodDefault.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.defaultProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
				inst.removeDefault = inst.unwrap;
			});
			function _default(innerType, defaultValue) {
				return new exports.ZodDefault({
					type: "default",
					innerType,
					get defaultValue() {
						return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
					}
				});
			}
			exports.ZodPrefault = core.$constructor("ZodPrefault", (inst, def) => {
				core.$ZodPrefault.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.prefaultProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function prefault(innerType, defaultValue) {
				return new exports.ZodPrefault({
					type: "prefault",
					innerType,
					get defaultValue() {
						return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
					}
				});
			}
			exports.ZodNonOptional = core.$constructor("ZodNonOptional", (inst, def) => {
				core.$ZodNonOptional.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.nonoptionalProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function nonoptional(innerType, params) {
				return new exports.ZodNonOptional({
					type: "nonoptional",
					innerType,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodSuccess = core.$constructor("ZodSuccess", (inst, def) => {
				core.$ZodSuccess.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.successProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function success(innerType) {
				return new exports.ZodSuccess({
					type: "success",
					innerType
				});
			}
			exports.ZodCatch = core.$constructor("ZodCatch", (inst, def) => {
				core.$ZodCatch.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.catchProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
				inst.removeCatch = inst.unwrap;
			});
			function _catch(innerType, catchValue) {
				return new exports.ZodCatch({
					type: "catch",
					innerType,
					catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
				});
			}
			exports.ZodNaN = core.$constructor("ZodNaN", (inst, def) => {
				core.$ZodNaN.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.nanProcessor(inst, ctx, json, params);
			});
			function nan(params) {
				return core._nan(exports.ZodNaN, params);
			}
			exports.ZodPipe = core.$constructor("ZodPipe", (inst, def) => {
				core.$ZodPipe.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.pipeProcessor(inst, ctx, json, params);
				inst.in = def.in;
				inst.out = def.out;
			});
			function pipe(in_, out) {
				return new exports.ZodPipe({
					type: "pipe",
					in: in_,
					out
				});
			}
			exports.ZodCodec = core.$constructor("ZodCodec", (inst, def) => {
				exports.ZodPipe.init(inst, def);
				core.$ZodCodec.init(inst, def);
			});
			function codec(in_, out, params) {
				return new exports.ZodCodec({
					type: "pipe",
					in: in_,
					out,
					transform: params.decode,
					reverseTransform: params.encode
				});
			}
			function invertCodec(codec) {
				const def = codec._zod.def;
				return new exports.ZodCodec({
					type: "pipe",
					in: def.out,
					out: def.in,
					transform: def.reverseTransform,
					reverseTransform: def.transform
				});
			}
			exports.ZodPreprocess = core.$constructor("ZodPreprocess", (inst, def) => {
				exports.ZodPipe.init(inst, def);
				core.$ZodPreprocess.init(inst, def);
			});
			exports.ZodReadonly = core.$constructor("ZodReadonly", (inst, def) => {
				core.$ZodReadonly.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.readonlyProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function readonly(innerType) {
				return new exports.ZodReadonly({
					type: "readonly",
					innerType
				});
			}
			exports.ZodTemplateLiteral = core.$constructor("ZodTemplateLiteral", (inst, def) => {
				core.$ZodTemplateLiteral.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.templateLiteralProcessor(inst, ctx, json, params);
			});
			function templateLiteral(parts, params) {
				return new exports.ZodTemplateLiteral({
					type: "template_literal",
					parts,
					...index_js_1.util.normalizeParams(params)
				});
			}
			exports.ZodLazy = core.$constructor("ZodLazy", (inst, def) => {
				core.$ZodLazy.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.lazyProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.getter();
			});
			function lazy(getter) {
				return new exports.ZodLazy({
					type: "lazy",
					getter
				});
			}
			exports.ZodPromise = core.$constructor("ZodPromise", (inst, def) => {
				core.$ZodPromise.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.promiseProcessor(inst, ctx, json, params);
				inst.unwrap = () => inst._zod.def.innerType;
			});
			function promise(innerType) {
				return new exports.ZodPromise({
					type: "promise",
					innerType
				});
			}
			exports.ZodFunction = core.$constructor("ZodFunction", (inst, def) => {
				core.$ZodFunction.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.functionProcessor(inst, ctx, json, params);
			});
			function _function(params) {
				return new exports.ZodFunction({
					type: "function",
					input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
					output: params?.output ?? unknown()
				});
			}
			exports.ZodCustom = core.$constructor("ZodCustom", (inst, def) => {
				core.$ZodCustom.init(inst, def);
				exports.ZodType.init(inst, def);
				inst._zod.processJSONSchema = (ctx, json, params) => processors.customProcessor(inst, ctx, json, params);
			});
			function check(fn) {
				const ch = new core.$ZodCheck({ check: "custom" });
				ch._zod.check = fn;
				return ch;
			}
			function custom(fn, _params) {
				return core._custom(exports.ZodCustom, fn ?? (() => true), _params);
			}
			function refine(fn, _params = {}) {
				return core._refine(exports.ZodCustom, fn, _params);
			}
			function superRefine(fn, params) {
				return core._superRefine(fn, params);
			}
			exports.describe = core.describe;
			exports.meta = core.meta;
			function _instanceof(cls, params = {}) {
				const inst = new exports.ZodCustom({
					type: "custom",
					check: "custom",
					fn: (data) => data instanceof cls,
					abort: true,
					...index_js_1.util.normalizeParams(params)
				});
				inst._zod.bag.Class = cls;
				inst._zod.check = (payload) => {
					if (!(payload.value instanceof cls)) payload.issues.push({
						code: "invalid_type",
						expected: cls.name,
						input: payload.value,
						inst,
						path: [...inst._zod.def.path ?? []]
					});
				};
				return inst;
			}
			const stringbool = (...args) => core._stringbool({
				Codec: exports.ZodCodec,
				Boolean: exports.ZodBoolean,
				String: exports.ZodString
			}, ...args);
			exports.stringbool = stringbool;
			function json(params) {
				const jsonSchema = lazy(() => {
					return union([
						string(params),
						number(),
						boolean(),
						_null(),
						array(jsonSchema),
						record(string(), jsonSchema)
					]);
				});
				return jsonSchema;
			}
			function preprocess(fn, schema) {
				return new exports.ZodPreprocess({
					type: "pipe",
					in: transform(fn),
					out: schema
				});
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/compat.cjs
		var require_compat = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ZodFirstPartyTypeKind = exports.config = exports.$brand = exports.ZodIssueCode = void 0;
			exports.setErrorMap = setErrorMap;
			exports.getErrorMap = getErrorMap;
			const core = __importStar(require_core());
			/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
			exports.ZodIssueCode = {
				invalid_type: "invalid_type",
				too_big: "too_big",
				too_small: "too_small",
				invalid_format: "invalid_format",
				not_multiple_of: "not_multiple_of",
				unrecognized_keys: "unrecognized_keys",
				invalid_union: "invalid_union",
				invalid_key: "invalid_key",
				invalid_element: "invalid_element",
				invalid_value: "invalid_value",
				custom: "custom"
			};
			var index_js_1 = require_core();
			Object.defineProperty(exports, "$brand", {
				enumerable: true,
				get: function() {
					return index_js_1.$brand;
				}
			});
			Object.defineProperty(exports, "config", {
				enumerable: true,
				get: function() {
					return index_js_1.config;
				}
			});
			/** @deprecated Use `z.config(params)` instead. */
			function setErrorMap(map) {
				core.config({ customError: map });
			}
			/** @deprecated Use `z.config()` instead. */
			function getErrorMap() {
				return core.config().customError;
			}
			/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
			var ZodFirstPartyTypeKind;
			ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {});
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/from-json-schema.cjs
		var require_from_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.fromJSONSchema = fromJSONSchema;
			const registries_js_1 = require_registries();
			const _checks = __importStar(require_checks());
			const _iso = __importStar(require_iso());
			const z = {
				...__importStar(require_schemas()),
				..._checks,
				iso: _iso
			};
			const RECOGNIZED_KEYS = /*@__PURE__*/ new Set([
				"$schema",
				"$ref",
				"$defs",
				"definitions",
				"$id",
				"id",
				"$comment",
				"$anchor",
				"$vocabulary",
				"$dynamicRef",
				"$dynamicAnchor",
				"type",
				"enum",
				"const",
				"anyOf",
				"oneOf",
				"allOf",
				"not",
				"properties",
				"required",
				"additionalProperties",
				"patternProperties",
				"propertyNames",
				"minProperties",
				"maxProperties",
				"items",
				"prefixItems",
				"additionalItems",
				"minItems",
				"maxItems",
				"uniqueItems",
				"contains",
				"minContains",
				"maxContains",
				"minLength",
				"maxLength",
				"pattern",
				"format",
				"minimum",
				"maximum",
				"exclusiveMinimum",
				"exclusiveMaximum",
				"multipleOf",
				"description",
				"default",
				"contentEncoding",
				"contentMediaType",
				"contentSchema",
				"unevaluatedItems",
				"unevaluatedProperties",
				"if",
				"then",
				"else",
				"dependentSchemas",
				"dependentRequired",
				"nullable",
				"readOnly"
			]);
			function detectVersion(schema, defaultTarget) {
				const $schema = schema.$schema;
				if ($schema === "https://json-schema.org/draft/2020-12/schema") return "draft-2020-12";
				if ($schema === "http://json-schema.org/draft-07/schema#") return "draft-7";
				if ($schema === "http://json-schema.org/draft-04/schema#") return "draft-4";
				return defaultTarget ?? "draft-2020-12";
			}
			function resolveRef(ref, ctx) {
				if (!ref.startsWith("#")) throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
				const path = ref.slice(1).split("/").filter(Boolean);
				if (path.length === 0) return ctx.rootSchema;
				const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
				if (path[0] === defsKey) {
					const key = path[1];
					if (!key || !ctx.defs[key]) throw new Error(`Reference not found: ${ref}`);
					return ctx.defs[key];
				}
				throw new Error(`Reference not found: ${ref}`);
			}
			function convertBaseSchema(schema, ctx) {
				if (schema.not !== void 0) {
					if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) return z.never();
					throw new Error("not is not supported in Zod (except { not: {} } for never)");
				}
				if (schema.unevaluatedItems !== void 0) throw new Error("unevaluatedItems is not supported");
				if (schema.unevaluatedProperties !== void 0) throw new Error("unevaluatedProperties is not supported");
				if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) throw new Error("Conditional schemas (if/then/else) are not supported");
				if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) throw new Error("dependentSchemas and dependentRequired are not supported");
				if (schema.$ref) {
					const refPath = schema.$ref;
					if (ctx.refs.has(refPath)) return ctx.refs.get(refPath);
					if (ctx.processing.has(refPath)) return z.lazy(() => {
						if (!ctx.refs.has(refPath)) throw new Error(`Circular reference not resolved: ${refPath}`);
						return ctx.refs.get(refPath);
					});
					ctx.processing.add(refPath);
					const zodSchema = convertSchema(resolveRef(refPath, ctx), ctx);
					ctx.refs.set(refPath, zodSchema);
					ctx.processing.delete(refPath);
					return zodSchema;
				}
				if (schema.enum !== void 0) {
					const enumValues = schema.enum;
					if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) return z.null();
					if (enumValues.length === 0) return z.never();
					if (enumValues.length === 1) return z.literal(enumValues[0]);
					if (enumValues.every((v) => typeof v === "string")) return z.enum(enumValues);
					const literalSchemas = enumValues.map((v) => z.literal(v));
					if (literalSchemas.length < 2) return literalSchemas[0];
					return z.union([
						literalSchemas[0],
						literalSchemas[1],
						...literalSchemas.slice(2)
					]);
				}
				if (schema.const !== void 0) return z.literal(schema.const);
				const type = schema.type;
				if (Array.isArray(type)) {
					const typeSchemas = type.map((t) => {
						return convertBaseSchema({
							...schema,
							type: t
						}, ctx);
					});
					if (typeSchemas.length === 0) return z.never();
					if (typeSchemas.length === 1) return typeSchemas[0];
					return z.union(typeSchemas);
				}
				if (!type) return z.any();
				let zodSchema;
				switch (type) {
					case "string": {
						let stringSchema = z.string();
						if (schema.format) {
							const format = schema.format;
							if (format === "email") stringSchema = stringSchema.check(z.email());
							else if (format === "uri" || format === "uri-reference") stringSchema = stringSchema.check(z.url());
							else if (format === "uuid" || format === "guid") stringSchema = stringSchema.check(z.uuid());
							else if (format === "date-time") stringSchema = stringSchema.check(z.iso.datetime());
							else if (format === "date") stringSchema = stringSchema.check(z.iso.date());
							else if (format === "time") stringSchema = stringSchema.check(z.iso.time());
							else if (format === "duration") stringSchema = stringSchema.check(z.iso.duration());
							else if (format === "ipv4") stringSchema = stringSchema.check(z.ipv4());
							else if (format === "ipv6") stringSchema = stringSchema.check(z.ipv6());
							else if (format === "mac") stringSchema = stringSchema.check(z.mac());
							else if (format === "cidr") stringSchema = stringSchema.check(z.cidrv4());
							else if (format === "cidr-v6") stringSchema = stringSchema.check(z.cidrv6());
							else if (format === "base64") stringSchema = stringSchema.check(z.base64());
							else if (format === "base64url") stringSchema = stringSchema.check(z.base64url());
							else if (format === "e164") stringSchema = stringSchema.check(z.e164());
							else if (format === "jwt") stringSchema = stringSchema.check(z.jwt());
							else if (format === "emoji") stringSchema = stringSchema.check(z.emoji());
							else if (format === "nanoid") stringSchema = stringSchema.check(z.nanoid());
							else if (format === "cuid") stringSchema = stringSchema.check(z.cuid());
							else if (format === "cuid2") stringSchema = stringSchema.check(z.cuid2());
							else if (format === "ulid") stringSchema = stringSchema.check(z.ulid());
							else if (format === "xid") stringSchema = stringSchema.check(z.xid());
							else if (format === "ksuid") stringSchema = stringSchema.check(z.ksuid());
						}
						if (typeof schema.minLength === "number") stringSchema = stringSchema.min(schema.minLength);
						if (typeof schema.maxLength === "number") stringSchema = stringSchema.max(schema.maxLength);
						if (schema.pattern) stringSchema = stringSchema.regex(new RegExp(schema.pattern));
						zodSchema = stringSchema;
						break;
					}
					case "number":
					case "integer": {
						let numberSchema = type === "integer" ? z.number().int() : z.number();
						if (typeof schema.minimum === "number") numberSchema = numberSchema.min(schema.minimum);
						if (typeof schema.maximum === "number") numberSchema = numberSchema.max(schema.maximum);
						if (typeof schema.exclusiveMinimum === "number") numberSchema = numberSchema.gt(schema.exclusiveMinimum);
						else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") numberSchema = numberSchema.gt(schema.minimum);
						if (typeof schema.exclusiveMaximum === "number") numberSchema = numberSchema.lt(schema.exclusiveMaximum);
						else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") numberSchema = numberSchema.lt(schema.maximum);
						if (typeof schema.multipleOf === "number") numberSchema = numberSchema.multipleOf(schema.multipleOf);
						zodSchema = numberSchema;
						break;
					}
					case "boolean":
						zodSchema = z.boolean();
						break;
					case "null":
						zodSchema = z.null();
						break;
					case "object": {
						const shape = {};
						const properties = schema.properties || {};
						const requiredSet = new Set(schema.required || []);
						for (const [key, propSchema] of Object.entries(properties)) {
							const propZodSchema = convertSchema(propSchema, ctx);
							shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
						}
						if (schema.propertyNames) {
							const keySchema = convertSchema(schema.propertyNames, ctx);
							const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
							if (Object.keys(shape).length === 0) {
								zodSchema = z.record(keySchema, valueSchema);
								break;
							}
							const objectSchema = z.object(shape).passthrough();
							const recordSchema = z.looseRecord(keySchema, valueSchema);
							zodSchema = z.intersection(objectSchema, recordSchema);
							break;
						}
						if (schema.patternProperties) {
							const patternProps = schema.patternProperties;
							const patternKeys = Object.keys(patternProps);
							const looseRecords = [];
							for (const pattern of patternKeys) {
								const patternValue = convertSchema(patternProps[pattern], ctx);
								const keySchema = z.string().regex(new RegExp(pattern));
								looseRecords.push(z.looseRecord(keySchema, patternValue));
							}
							const schemasToIntersect = [];
							if (Object.keys(shape).length > 0) schemasToIntersect.push(z.object(shape).passthrough());
							schemasToIntersect.push(...looseRecords);
							if (schemasToIntersect.length === 0) zodSchema = z.object({}).passthrough();
							else if (schemasToIntersect.length === 1) zodSchema = schemasToIntersect[0];
							else {
								let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
								for (let i = 2; i < schemasToIntersect.length; i++) result = z.intersection(result, schemasToIntersect[i]);
								zodSchema = result;
							}
							break;
						}
						const objectSchema = z.object(shape);
						if (schema.additionalProperties === false) zodSchema = objectSchema.strict();
						else if (typeof schema.additionalProperties === "object") zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
						else zodSchema = objectSchema.passthrough();
						break;
					}
					case "array": {
						const prefixItems = schema.prefixItems;
						const items = schema.items;
						if (prefixItems && Array.isArray(prefixItems)) {
							const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
							const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
							if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
							else zodSchema = z.tuple(tupleItems);
							if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
							if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
						} else if (Array.isArray(items)) {
							const tupleItems = items.map((item) => convertSchema(item, ctx));
							const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
							if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
							else zodSchema = z.tuple(tupleItems);
							if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
							if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
						} else if (items !== void 0) {
							const element = convertSchema(items, ctx);
							let arraySchema = z.array(element);
							if (typeof schema.minItems === "number") arraySchema = arraySchema.min(schema.minItems);
							if (typeof schema.maxItems === "number") arraySchema = arraySchema.max(schema.maxItems);
							zodSchema = arraySchema;
						} else zodSchema = z.array(z.any());
						break;
					}
					default: throw new Error(`Unsupported type: ${type}`);
				}
				return zodSchema;
			}
			function convertSchema(schema, ctx) {
				if (typeof schema === "boolean") return schema ? z.any() : z.never();
				let baseSchema = convertBaseSchema(schema, ctx);
				const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
				if (schema.anyOf && Array.isArray(schema.anyOf)) {
					const options = schema.anyOf.map((s) => convertSchema(s, ctx));
					const anyOfUnion = z.union(options);
					baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
				}
				if (schema.oneOf && Array.isArray(schema.oneOf)) {
					const options = schema.oneOf.map((s) => convertSchema(s, ctx));
					const oneOfUnion = z.xor(options);
					baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
				}
				if (schema.allOf && Array.isArray(schema.allOf)) if (schema.allOf.length === 0) baseSchema = hasExplicitType ? baseSchema : z.any();
				else {
					let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
					const startIdx = hasExplicitType ? 0 : 1;
					for (let i = startIdx; i < schema.allOf.length; i++) result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
					baseSchema = result;
				}
				if (schema.nullable === true && ctx.version === "openapi-3.0") baseSchema = z.nullable(baseSchema);
				if (schema.readOnly === true) baseSchema = z.readonly(baseSchema);
				if (schema.default !== void 0) baseSchema = baseSchema.default(schema.default);
				const extraMeta = {};
				for (const key of [
					"$id",
					"id",
					"$comment",
					"$anchor",
					"$vocabulary",
					"$dynamicRef",
					"$dynamicAnchor"
				]) if (key in schema) extraMeta[key] = schema[key];
				for (const key of [
					"contentEncoding",
					"contentMediaType",
					"contentSchema"
				]) if (key in schema) extraMeta[key] = schema[key];
				for (const key of Object.keys(schema)) if (!RECOGNIZED_KEYS.has(key)) extraMeta[key] = schema[key];
				if (Object.keys(extraMeta).length > 0) ctx.registry.add(baseSchema, extraMeta);
				if (schema.description) baseSchema = baseSchema.describe(schema.description);
				return baseSchema;
			}
			/**
			* Converts a JSON Schema to a Zod schema. This function should be considered semi-experimental. It's behavior is liable to change. */
			function fromJSONSchema(schema, params) {
				if (typeof schema === "boolean") return schema ? z.any() : z.never();
				let normalized;
				try {
					normalized = JSON.parse(JSON.stringify(schema));
				} catch {
					throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
				}
				const ctx = {
					version: detectVersion(normalized, params?.defaultTarget),
					defs: normalized.$defs || normalized.definitions || {},
					refs: /* @__PURE__ */ new Map(),
					processing: /* @__PURE__ */ new Set(),
					rootSchema: normalized,
					registry: params?.registry ?? registries_js_1.globalRegistry
				};
				return convertSchema(normalized, ctx);
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/coerce.cjs
		var require_coerce = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.string = string;
			exports.number = number;
			exports.boolean = boolean;
			exports.bigint = bigint;
			exports.date = date;
			const core = __importStar(require_core());
			const schemas = __importStar(require_schemas());
			function string(params) {
				return core._coercedString(schemas.ZodString, params);
			}
			function number(params) {
				return core._coercedNumber(schemas.ZodNumber, params);
			}
			function boolean(params) {
				return core._coercedBoolean(schemas.ZodBoolean, params);
			}
			function bigint(params) {
				return core._coercedBigint(schemas.ZodBigInt, params);
			}
			function date(params) {
				return core._coercedDate(schemas.ZodDate, params);
			}
		}));
		//#endregion
		//#region ../wecom-toolchain/node_modules/zod/v4/classic/external.cjs
		var require_external = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			var __exportStar = exports && exports.__exportStar || function(m, exports$2) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
			};
			var __importDefault = exports && exports.__importDefault || function(mod) {
				return mod && mod.__esModule ? mod : { "default": mod };
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.coerce = exports.iso = exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = exports.locales = exports.fromJSONSchema = exports.toJSONSchema = exports.NEVER = exports.util = exports.TimePrecision = exports.flattenError = exports.formatError = exports.prettifyError = exports.treeifyError = exports.regexes = exports.clone = exports.$brand = exports.$input = exports.$output = exports.config = exports.registry = exports.globalRegistry = exports.core = void 0;
			exports.core = __importStar(require_core());
			__exportStar(require_schemas(), exports);
			__exportStar(require_checks(), exports);
			__exportStar(require_errors(), exports);
			__exportStar(require_parse(), exports);
			__exportStar(require_compat(), exports);
			const index_js_1 = require_core();
			const en_js_1 = __importDefault(require_en());
			(0, index_js_1.config)((0, en_js_1.default)());
			var index_js_2 = require_core();
			Object.defineProperty(exports, "globalRegistry", {
				enumerable: true,
				get: function() {
					return index_js_2.globalRegistry;
				}
			});
			Object.defineProperty(exports, "registry", {
				enumerable: true,
				get: function() {
					return index_js_2.registry;
				}
			});
			Object.defineProperty(exports, "config", {
				enumerable: true,
				get: function() {
					return index_js_2.config;
				}
			});
			Object.defineProperty(exports, "$output", {
				enumerable: true,
				get: function() {
					return index_js_2.$output;
				}
			});
			Object.defineProperty(exports, "$input", {
				enumerable: true,
				get: function() {
					return index_js_2.$input;
				}
			});
			Object.defineProperty(exports, "$brand", {
				enumerable: true,
				get: function() {
					return index_js_2.$brand;
				}
			});
			Object.defineProperty(exports, "clone", {
				enumerable: true,
				get: function() {
					return index_js_2.clone;
				}
			});
			Object.defineProperty(exports, "regexes", {
				enumerable: true,
				get: function() {
					return index_js_2.regexes;
				}
			});
			Object.defineProperty(exports, "treeifyError", {
				enumerable: true,
				get: function() {
					return index_js_2.treeifyError;
				}
			});
			Object.defineProperty(exports, "prettifyError", {
				enumerable: true,
				get: function() {
					return index_js_2.prettifyError;
				}
			});
			Object.defineProperty(exports, "formatError", {
				enumerable: true,
				get: function() {
					return index_js_2.formatError;
				}
			});
			Object.defineProperty(exports, "flattenError", {
				enumerable: true,
				get: function() {
					return index_js_2.flattenError;
				}
			});
			Object.defineProperty(exports, "TimePrecision", {
				enumerable: true,
				get: function() {
					return index_js_2.TimePrecision;
				}
			});
			Object.defineProperty(exports, "util", {
				enumerable: true,
				get: function() {
					return index_js_2.util;
				}
			});
			Object.defineProperty(exports, "NEVER", {
				enumerable: true,
				get: function() {
					return index_js_2.NEVER;
				}
			});
			var json_schema_processors_js_1 = require_json_schema_processors();
			Object.defineProperty(exports, "toJSONSchema", {
				enumerable: true,
				get: function() {
					return json_schema_processors_js_1.toJSONSchema;
				}
			});
			var from_json_schema_js_1 = require_from_json_schema();
			Object.defineProperty(exports, "fromJSONSchema", {
				enumerable: true,
				get: function() {
					return from_json_schema_js_1.fromJSONSchema;
				}
			});
			exports.locales = __importStar(require_locales());
			var iso_js_1 = require_iso();
			Object.defineProperty(exports, "ZodISODateTime", {
				enumerable: true,
				get: function() {
					return iso_js_1.ZodISODateTime;
				}
			});
			Object.defineProperty(exports, "ZodISODate", {
				enumerable: true,
				get: function() {
					return iso_js_1.ZodISODate;
				}
			});
			Object.defineProperty(exports, "ZodISOTime", {
				enumerable: true,
				get: function() {
					return iso_js_1.ZodISOTime;
				}
			});
			Object.defineProperty(exports, "ZodISODuration", {
				enumerable: true,
				get: function() {
					return iso_js_1.ZodISODuration;
				}
			});
			exports.iso = __importStar(require_iso());
			exports.coerce = __importStar(require_coerce());
		}));
		//#endregion
		//#region src/wire.ts
		var import_zod = (/* @__PURE__ */ __commonJSMin(((exports) => {
			var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
					enumerable: true,
					get: function() {
						return m[k];
					}
				};
				Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
				if (k2 === void 0) k2 = k;
				o[k2] = m[k];
			}));
			var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v
				});
			}) : function(o, v) {
				o["default"] = v;
			});
			var __importStar = exports && exports.__importStar || function(mod) {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
				}
				__setModuleDefault(result, mod);
				return result;
			};
			var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.z = void 0;
			const z = __importStar(require_external());
			exports.z = z;
			__exportStar(require_external(), exports);
			exports.default = z;
		})))();
		const PACKAGE = "dsh-atom";
		const TYPERT_REMOTE = {
			package: PACKAGE,
			descriptors: [{
				id: `${PACKAGE}#wecomFws/request`,
				service: "wecomFws",
				namespace: "wecomFws",
				method: "request",
				invocation: { kind: "direct" },
				parameters: [{
					name: "payload",
					wire: "payload",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: `${PACKAGE}#payload`,
						create: () => import_zod.z.string().max(1048576)
					}
				}],
				result: {
					mode: "strict",
					typeSymbol: `${PACKAGE}#result`,
					create: () => import_zod.z.string()
				}
			}]
		};
		//#endregion
		//#region src/client/locales.ts
		/** Workbench product copy, including failure and accessibility labels. */
		const zh = {
			panel: "Atom 群文件工作台",
			title: "Atom 群文件工作台",
			intro: "按群和时间读取文件，先检查系统分配的文件夹，勾选并确认后再保存。",
			capability: "本机企微读取已启用，请保持企微登录。仅在读取账号与组织、查找群或手动更新时读取本机资料，不操作企微窗口。",
			capabilityFallback: "当前运行环境未配置本机企微读取组件，仅可读取已解密的测试索引。",
			configuration: "群与保存目录",
			sourceRoot: "企微数据根目录",
			rootHint: "通常为“文档\\WXWork”；可填写自己的实际路径。",
			accounts: "读取账号与组织",
			account: "公司或组织与账号",
			chooseAccount: "请选择公司或组织",
			groupName: "群名称关键词",
			search: "查找群",
			accountHint: "优先显示本机可读的组织名称和本人姓名；历史账号名称不可读时，可自行填写显示名称。",
			unnamedAccount: "名称暂不可读，目录尾号",
			directorySuffix: "目录尾号",
			accountLabel: "账号显示名称",
			accountDetails: "查看账号目录信息",
			accountId: "本机目录编号",
			accountUnavailable: "此账号的组织资料暂不可读；可能未登录或属于历史账号。可先确认企微中的组织，再填写显示名称。",
			searchHint: "支持输入部分群名。相同名称可能对应较早与近期的会话记录，请结合时间、附件数量和示例核对；不会仅凭同名自动合并。",
			noGroups: "没有找到匹配的群；请检查组织、关键词和本机同步情况。",
			searchLimit: "本次最多显示 200 条匹配记录，请细化关键词以缩小范围。",
			recentRecord: "近期会话，可优先核对",
			historicalRecord: "较早会话，含历史记录",
			unknownRecord: "本机会话记录",
			lastMessage: "最近消息",
			fileRecords: "群附件记录",
			memberRecords: "群成员人数",
			noMemberInfo: "暂无",
			fileExamples: "附件示例",
			sourceDetails: "查看来源标识",
			groupFolder: "保存子目录名",
			historyFolder: "历史资料",
			alternateFolder: "另一会话",
			folderHint: "默认使用群名。同名会话可以设置不同的中文子目录名；这不会更改企微中的群名称。",
			bind: "添加此群",
			bound: "已添加",
			remove: "移除",
			directory: "保存目录",
			browse: "选择目录",
			layout: "目录格式：保存目录 \\ 群名称或自定子目录名 \\ 文件接收日期（YYYY-MM-DD） \\ 文件名（去扩展名） \\ 文件",
			savedIndexDays: "分组目录索引存留时间",
			savedIndexDaysHint: "仅保存近 {days} 天的分组目录索引。",
			savedIndexDaysInvalid: "分组目录索引存留时间需为 1～365 的整数。",
			savedFilterDefault: "默认筛选",
			savedFilterDefaultHint: "读取后各群卡片默认按此状态筛选，仍可逐群切换。仅影响之后的读取。",
			archiveHandling: "压缩包处理",
			autoExtractLabel: "保存后自动解压",
			extractNestedLabel: "同时处理子压缩包",
			archiveHandlingHint: "自动解压在批量保存、单行保存与「保存到已存在目录」后生效；开启子压缩包后逐层解压（最多 8 层）。解压失败不影响保存结果。",
			selected: "已选群",
			noSelection: "尚未选择群",
			migratedGroups: "已将旧目录改为纯群名称",
			"error_duplicate-folder-name": "保存子目录名重复，请为不同的会话填写不同的中文子目录名。无需删除其中一个群。",
			"error_legacy-folder-conflict": "带后缀的旧目录与纯群名目录同时存在，请核对后合并，或选择其他保存目录。插件未自动合并或覆盖文件。",
			"error_legacy-rename-failed": "无法将旧目录改为群名称，请关闭正在占用目录或文件的程序后重试。",
			multiGroupHint: "支持保存多个群：重复查找并添加即可。更新时会遍历所有已保存的群，分别保存到各自目录。",
			"error_invalid-groups": "群配置无效；最多保存 100 个群，请检查所选群记录。",
			save: "保存配置",
			saved: "配置已保存，文件预览已清空，请重新读取。",
			saveHint: "保存配置后将清空下方文件预览及未确认的勾选、目录调整，需要重新读取。",
			unsaved: "配置有修改，请先保存再更新。",
			loading: "正在读取…",
			start: "开始时间",
			end: "结束时间",
			today: "今天",
			yesterday: "昨天",
			update: "读取提单文件",
			updateAll: "读取全部文件",
			cancel: "取消本次操作",
			modeAll: "全部文件预览",
			modeBill: "提单预览（可人工补选）",
			manual: "按北京时间精确到分钟，包含结束分钟的全部秒数；默认今天 00:00～23:59，实际读取截至点击时刻。读取只生成预览，不保存或移动归档文件。",
			range: "结果时间",
			filterHint: "“读取全部文件”默认勾选可保存的全部附件；“读取提单文件”默认勾选名称疑似含提单号、且为 pdf、png、jpeg、jpg、svg、doc、docx、pptx、zip、xls、xlsx 的附件。可在提单模式中补选这些格式的普通文件；其他格式需使用全部文件模式。两个入口都会列出全部记录，确认后只保存所选的本机附件。",
			legacyResult: "这是旧版本的上次结果，尚未按提单号命名规则筛选；请手动更新以生成新结果。",
			legacyFormatResult: "这是增加格式过滤前的上次结果；重新点击“更新并保存提单文件”后应用新的扩展名规则，之前保存的文件仍会保留。",
			legacyLayoutResult: "这是升级前的上次结果。手动更新后使用文件名子目录，并将校验通过的旧归档副本逐份归入新目录。",
			empty: "尚未读取文件。配置完成后选择时间范围，读取预览、检查文件夹，再确认保存。",
			noFiles: "所选范围未发现附件记录。",
			searchNoMatch: "没有匹配此关键词的文件。",
			filename: "文件名",
			group: "来源群",
			messageTime: "时间",
			status: "状态",
			selectFile: "选择文件",
			selectColumn: "勾选",
			documentFolder: "文件保存目录",
			saveToGroup: "保存到已存在目录",
			chooseGroup: "选择目录",
			noFileGroups: "暂无已保存目录",
			saveToGroupHint: "选择已保存目录后立即归档该文件，并按该目录名建立保存子目录",
			selectedFiles: "已选文件",
			timeAsc: "按消息时间：从早到晚",
			timeDesc: "按消息时间：从晚到早",
			searchFiles: "群文件查询",
			searchFilesHint: "输入文件名或保存目录关键词，按回车或点“查询”执行",
			searchAction: "查询",
			matchedFiles: "匹配文件",
			savedFilterLabel: "按保存状态筛选",
			savedFilterUnsaved: "未保存",
			savedFilterSaved: "已保存",
			savedFilterAll: "全部",
			savedFilterHint: "未保存只显示尚未保存的文件；已保存只显示索引中记录、可复用的文件；全部不过滤。",
			savedFilterEmptyUnsaved: "当前没有未保存的文件。",
			savedFilterEmptySaved: "当前没有已保存的文件。",
			selectAll: "全选",
			selectableFiles: "可保存",
			allPagesSelection: "勾选即本群全部页全选，取消即全部清空；部分选中时点击将补全为全选；单个文件仍可单独调整。",
			scopedSelection: "全选作用于当前筛选结果（全部页）；没有筛选时为本群全部文件。部分选中时点击将补全为全选，取消即清空当前范围内的选择。",
			scopeTruncated: "当前范围超过 10000 份可保存文件，全选只作用于前 10000 份。",
			setDefaultFolder: "设置默认目录",
			savedDirectoryView: "按目录查看已保存文件",
			backToFileList: "返回文件列表",
			savedDirectoryViewHint: "在文件列表区域按实际保存目录分组查看本群已保存的文件",
			savedDirectoriesTitle: "已保存文件分组",
			directoryGroupName: "目录名",
			directoryFileCount: "文件数量",
			savedDirectoriesEmpty: "当前查询结果中没有已保存的文件。",
			savedDirectoriesPick: "点击左侧目录查看其中的文件。",
			savedDirectoriesFileEmpty: "此目录当前页没有文件。",
			savedDirectoriesTruncated: "已保存文件较多，仅列出前 10000 份。",
			renameAction: "重命名",
			deleteAction: "删除",
			renameSavedFile: "重命名已保存文件",
			renameSavedFileHint: "只修改归档副本的文件名，不改变企微中的原文件。",
			deleteSavedFile: "删除已保存文件",
			deleteSavedFileHint: "删除归档副本，并将该文件恢复为未保存状态；不会删除企微中的原文件。",
			extractAction: "解压",
			extractHint: "直接解压到压缩包所在目录，子压缩包解压到以它命名的子目录（都拍平包内结构），加密、超限或重名条目自动跳过，整包保留。",
			extractBusy: "正在解压…",
			extractStop: "停止解压",
			extractDoneTitle: "解压完成",
			extractFailedLabel: "失败",
			extractSkippedLabel: "跳过",
			extractPathTooLongLabel: "路径过长",
			autoExtractToast: "自动解压",
			extractedFromLabel: "来自",
			extractedCountLabel: "已解压",
			fileRenameName: "新文件名",
			createGroup: "为选中文件创建目录",
			createGroupConfirm: "创建目录",
			groupName: "目录名",
			groupNameHint: "默认使用第一个选中文件的文件名（不含扩展名）；目录名同时作为组内文件的保存子目录。",
			groupNameExists: "本群已有同名目录，请换一个名称。",
			groupsLabel: "分组",
			ungrouped: "只查看未收入目录文件",
			filterGroupHint: "点击只看该分组的文件；再次点击取消筛选",
			ungroupedHint: "点击只看尚未收入目录的文件；再次点击取消筛选",
			selectGroup: "选择整组文件",
			groupSelectionHint: "勾选即选中组内全部可保存文件（忽略当前筛选）；部分选中时点击将补全为全选；取消即清空组内选择。",
			groupSelectionUngroupedHint: "“只查看未收入目录文件”筛选下不能整组选择，请先取消该筛选。",
			groupSelectionAllSaved: "组内文件都已保存过，没有可再选择的文件。",
			groupSelectionHiddenHint: "部分分组成员不在当前筛选范围内，计数仍按整组统计。",
			removeGroupHint: "从分组列表中移除，不改变文件勾选状态",
			filteredFiles: "筛选结果",
			filterNoMatch: "当前筛选下没有文件。",
			removeGroup: "移除分组",
			dismiss: "取消",
			"error_invalid-group-name": "目录名会作为保存子目录名：不能为空，不能含 \\ / : * ? \" < > | 等字符，不能是 CON、NUL 等保留名称，也不能以空格或句点结尾。",
			storedAt: "文件将会存放在",
			pathDateLabel: "文件接收日期",
			pathFolderLabel: "文件名",
			pathFileLabel: "文件",
			clearDefaultFolder: "取消默认目录",
			defaultFolderName: "目录名",
			defaultFolderHint: "应用于本群当前已选文件，以及之后新勾选的文件；已创建的分组优先。",
			reviewSave: "保存",
			saveGroupHint: "打开保存范围确认，默认只勾选本群；其他群也可一并保存",
			saveDoneTitle: "保存完成",
			saveNewLabel: "新增",
			saveExistingLabel: "已存在",
			saveFailedLabel: "失败",
			saveUnsavedLabel: "未保存",
			closeNotice: "关闭提示",
			confirmSave: "确认并保存",
			backToReview: "返回检查",
			confirmTitle: "再次确认保存",
			confirmGroupTitle: "确认保存当前群组",
			confirmDescription: "请核对要保存的群组、文件数量、时间范围和目标目录。只有勾选的群组会被保存，取消勾选的群组不会提交。",
			confirmGroupDescription: "默认只勾选该群组；其他群组也可一并保存。取消勾选的群组不会提交。",
			confirmDestinationHint: "每份文件仍位于所属群和文件接收日期目录下；逐文件修改的子目录优先于分组，分组优先于本群默认文件夹。归档后保留不同内容的同名版本。",
			confirmUncheckedHint: "未勾选的群组本次不会保存，其现有文件勾选状态会保留到下次保存确认。",
			confirmEmptyScope: "没有勾选任何群组，至少选择一个才能保存。",
			confirmAutoFolderWarning: "有文件尚未指定文件夹，将按文件名各自创建子目录。",
			confirmAutoFolderAcknowledge: "我确认让这些文件按文件名各自创建子目录",
			copyPathButton: "复制文件目录",
			copyPathDone: "已复制",
			copyPathFailed: "复制失败",
			copyPathHint: "复制文件所在的绝对目录",
			autoFolderTarget: "按文件名各自创建子目录",
			fileFolderTarget: "按分组或逐文件目录",
			mixedFolderTarget: "部分按文件名各自创建子目录",
			beijingTime: "北京时间",
			fileUnit: "份文件",
			groupedFiles: "分组文件",
			automaticFolders: "按系统自动分配",
			individualFolderEdits: "含逐文件调整",
			reviewStale: "配置或时间范围已变化，请重新读取文件后再确认保存。",
			legacyReviewResult: "这是旧版本结果，或预览尚未完整完成。请先读取文件生成可确认的预览。",
			incompleteReviewResult: "本次读取尚未完整完成，请重新读取后再检查并确认保存。",
			operationPreview: "文件预览",
			operationSave: "人工确认保存",
			total: "全部文件",
			billMatch: "命中的疑似提单号",
			noMatch: "未命中",
			status_running: "正在更新",
			status_cancelling: "正在取消",
			status_completed: "本次处理完成",
			status_incomplete: "部分文件需要处理",
			status_failed: "本次检查未完成",
			status_cancelled: "已取消",
			status_interrupted: "上次任务已中断；请手动重新更新",
			"status_awaiting-confirmation": "预览已就绪，等待人工确认",
			phase_reading: "读取群文件记录",
			phase_indexing: "核对本地文件",
			phase_copying: "校验并保存文件",
			row_saved: "已保存",
			"row_saved-before": "已保存",
			savedBeforeHint: "上次保存于",
			row_existing: "已存在，校验通过",
			locateSavedFolderHint: "点击跳转到对应目录",
			row_missing: "本地原件未找到",
			row_changing: "文件仍在变化，请稍后重试",
			row_ready: "待人工确认",
			row_queued: "等待保存",
			"row_not-selected": "未选择，仅列出",
			"row_grouped-unselected": "已分组，未勾选（不会保存）",
			row_unverifiable: "缺少可靠的文件校验信息",
			"row_source-conflict": "来源关联冲突",
			row_failed: "保存失败",
			"row_path-too-long": "保存路径过长，请缩短保存目录或群子目录名",
			"row_folder-conflict": "文件占用了所需子目录，请核对旧归档后重试",
			row_skipped: "未命中规则，仅列出",
			"row_skipped-format": "格式不在保存范围，仅列出",
			pageLoadFailed: "这一页加载失败，请重试。重试只读取已有结果，不会重新保存文件。",
			retryPage: "重试加载本页",
			unknown: "无法确定",
			before: "上一页",
			next: "下一页",
			page: "页",
			jumpTo: "第",
			pageNumber: "页码",
			go: "跳转",
			warnings: "部分来源记录无法核对，不能视为完整检查。",
			warningsDropped: "未列入清单的附件",
			warningsDroppedSuffix: "个（在消息记录中找不到对应时间），请核对时间范围或重新读取",
			warningsGroupNotFound: "未找到的群",
			code: "错误代码",
			"error_source-locked": "当前运行环境无法读取企微加密数据，请确认已安装完整的 Windows 插件包。",
			"error_wecom-not-running": "未找到当前 Windows 用户正在运行的企业微信，请先打开并登录企微。",
			"error_wecom-read-denied": "无法只读访问企微，请确认 DSH 与企微使用同一 Windows 用户和相同权限级别运行。",
			"error_source-adapter-unavailable": "未能读取所选账号的数据库，请确认该账号已登录；也可能是当前企微版本不兼容。",
			"error_reader-windows-x64-required": "此读取组件仅支持 Windows x64 桌面环境。",
			"error_reader-missing": "本机读取组件缺失，请重新安装完整的插件包。",
			"error_reader-integrity-failed": "本机读取组件校验失败，请重新安装完整的插件包。",
			"error_reader-failed": "本机读取组件未能运行，请检查是否被安全软件拦截或安装文件缺失。",
			"error_reader-protocol-failed": "本机读取组件返回的数据无法校验，本次检查未完成。",
			"error_source-adapter-failed": "读取企微本机数据失败，本次检查未完成。",
			"error_source-not-found": "找不到所选账号的数据文件，请重新检查企微数据目录和账号。",
			"error_source-too-large": "本机数据库超过读取容量限制，请联系管理员调整读取配置。",
			"error_source-output-too-large": "所选范围的文件清单过大，请缩小日期范围后重试。",
			"error_source-busy": "企微数据正在变化，请稍后重新更新。",
			"error_source-damaged": "来源索引完整性校验未通过。",
			"error_source-format-unsupported": "当前来源索引结构不受支持，检查未完成。",
			"error_configure-first": "请先选择账号、添加群并保存配置。",
			"error_destination-in-source": "保存目录不能放在企微源目录或插件状态目录中。",
			"error_job-running": "已有操作正在运行。",
			"error_invalid-dates": "请填写有效的北京时间；开始时间不能晚于结束时间或当前时刻，结束日期不能晚于今天。",
			"error_invalid-review": "所选文件或文件夹调整无效，请重新读取预览后重试。",
			"error_selection-unavailable": "部分所选文件的来源、校验信息或格式不允许保存，请重新检查。",
			"error_selection-required": "请至少选择一份可保存的文件。",
			"error_auto-folder-unconfirmed": "有文件尚未指定文件夹。请确认按文件名各自建文件夹后再保存。",
			"error_group-no-ungrouped": "当前选中文件都已归入分组，没有可再创建分组的新文件。",
			"error_group-too-large": "本次选中文件超过 10000 份，请缩小选择后再创建分组。",
			"error_path-too-long": "调整后的保存路径过长，请缩短子目录名或保存根目录。",
			"error_preview-stale": "配置已改变，请重新读取文件生成预览。",
			"error_review-unavailable": "当前结果尚不能确认保存，请先完整读取文件。",
			"error_job-changed": "文件预览已经变化，请检查当前结果后再确认。",
			"error_absolute-path-required": "请填写完整的本机绝对路径。",
			"error_invalid-account": "账号目录无效，请重新读取并选择。",
			"error_invalid-save-directory": "保存目录无效。请填写 D:\\客户资料 这类完整路径；每段目录名不能含 : * ? \" < > | 等非法字符，冒号仅用于盘符，也不能使用保留名称或以空格、句点结尾。",
			"error_invalid-folder-name": "保存子目录名不能含 \\ / : * ? \" < > | 等非法字符，不能是 CON、NUL 等保留名称，也不能以空格、句点结尾。",
			"error_invalid-file-name": "文件名不能含 \\ / : * ? \" < > | 等非法字符，不能是 CON、NUL 等保留名称，也不能以空格、句点结尾。",
			"error_file-exists": "目标文件名已存在，请换一个名称。",
			"error_file-locked": "文件正被其他程序占用，无法完成操作，请关闭占用程序后重试。",
			"error_file-missing": "归档副本已不存在，可能已被移动或删除。",
			"error_file-operation-failed": "文件操作未完成，请检查磁盘和权限后重试。",
			"error_already-saved": "该文件已有可复用的归档副本，无需再次保存。",
			"error_not-saved": "该文件当前没有可维护的归档副本。",
			"error_unsafe-output-path": "归档路径不在当前保存目录中，为安全起见未执行操作。",
			"error_missing": "本地原件未找到，无法保存。",
			"error_changing": "文件仍在变化，请稍后重试。",
			"error_unverifiable": "缺少可靠的文件校验信息，无法保存。",
			"error_failed": "保存未完成，请检查本地原件和磁盘后重试。",
			"error_folder-conflict": "目标文件夹被同名文件占用，无法保存。",
			"error_invalid-request": "操作参数无效，请重试。",
			"error_worker-no-result": "保存未返回结果，请稍后重试。",
			"error_atomic-publish-failed": "归档副本发布失败，请检查磁盘空间和权限。",
			"error_archive-migration-failed": "旧归档副本迁移失败，原件未改动。",
			"error_invalid-save-mode": "保存方式无效，请重新选择保存所有文件或提单文件。",
			"error_save-directory-unavailable": "保存目录不可用，请检查盘符或网络位置是否可访问，以及已有路径是否为文件夹。",
			"error_group-name-required": "请填写群名称关键词。",
			"error_state-unreadable": "本机配置或上次结果无法读取，请检查状态目录。",
			"error_state-write-failed": "无法保存本机任务状态，请稍后重试并检查状态目录是否可写。",
			"error_state-migration-failed": "无法从旧目录导入插件数据，旧数据仍保留。请检查 ~/.eline/plugin-data/wecom-files 是否可写，以及旧配置是否完好后重试。",
			"error_source-timeout": "本次操作超时，检查未完成。",
			"error_cancelled": "本次操作已取消。",
			"error_not-archive": "该文件不是 zip 或 rar 压缩包，无法解压。",
			"error_archive-changed": "归档副本已变化，无法确认内容，请重新读取后再试。",
			"error_zip-invalid": "压缩包结构无法识别，可能已损坏或不是标准 zip。",
			"error_zip-multi-volume": "分卷压缩包暂不支持解压。",
			"error_zip-too-large": "压缩包条目过多或结构过大，无法读取。",
			"error_zip-entry-changed": "包内文件校验未通过，可能已损坏。",
			"error_archive-too-large": "本次解压总量超过 8 GiB 限制，无法解压。",
			"error_rar-encrypted": "该 rar 压缩包已加密，无法解压。",
			"error_rar-volume": "分卷 rar 压缩包暂不支持解压。",
			"error_rar-invalid": "压缩包结构无法识别，可能已损坏或不是标准 rar。",
			"error_rar-damaged": "rar 压缩包数据已损坏，无法解压。",
			"error_rar-no-memory": "内存不足，无法解压该 rar 压缩包。",
			"error_rar-solid-reference": "该 rar 为固实压缩且缺少前序文件，无法解压。",
			"error_rar-entry-changed": "包内文件校验未通过，可能已损坏。",
			"error_rar-failed": "rar 解压未完成，请检查压缩包后重试。",
			"error_unknown": "操作未完成，请检查配置后重试。"
		};
		Object.assign(zh, {
  "orderTitle": "AI 建单（目录=一票）",
  "orderIntro": "把已归档的一票单据识别成订单：读取所选目录内的 PDF、Word、Excel 与图片，用当前默认模型提取字段，结果导出到「目录\\_orders」。扫描件与图片会转成页面图片交给视觉模型。",
  "orderAuto": "归档完成后自动建单",
  "orderChoose": "选择其他目录建单",
  "orderBuild": "生成订单",
  "orderRebuild": "重新建单",
  "orderCancelJob": "取消建单",
  "orderNoDirs": "还没有可用的归档目录。先在下方读取并保存文件，或直接选择目录建单。",
  "orderDocs": "份已归档文件",
  "orderLastSaved": "最近归档",
  "orderStarted": "已开始识别，进度会自动刷新。",
  "orderOutput": "订单文件",
  "orderMissing": "缺失必填",
  "orderIssues": "校验提示",
  "orderCompleteness": "完整度",
  "orderStatus_queued": "排队中",
  "orderStatus_running": "识别中",
  "orderStatus_done": "已完成",
  "orderStatus_failed": "识别失败",
  "orderStatus_cancelled": "已取消",
  "orderStep_queued": "排队中",
  "orderStep_scan": "扫描目录",
  "orderStep_parse": "解析单据",
  "orderStep_classify": "识别单据类型",
  "orderStep_extract": "AI 提取字段",
  "orderStep_build": "整理订单",
  "orderStep_export": "导出 Excel",
  "orderStep_done": "已完成",
  "orderStep_skipped": "文件未变化，已跳过",
  "orderStep_failed": "已失败",
  "orderStep_cancelled": "已取消",
  "error_order-running": "这个目录已有建单任务在运行。",
  "error_no-documents": "目录内没有可识别的单据文件。",
  "error_too-many-documents": "目录内单据过多（超过 200 份），请确认该目录是否只属于一票。",
  "error_directory-not-found": "目录不存在或不可访问。",
  "error_invalid-directory": "请选择有效的归档目录。",
  "error_extract-failed": "大模型未返回可用结果，请检查模型配置或单据清晰度后重试。",
  "error_extract-empty": "没有提取到订单字段，请确认目录内是这一票的单据。",
  "error_order-failed": "建单未完成，请检查模型与目录后重试。",
  "error_build-failed": "建单未完成，请检查模型配置与目录权限后重试。"
});
		const en = { ...zh };
		//#endregion
		//#region src/client/MinuteDateTime.tsx
		/** Use the native date/minute picker, with its appearance scoped in styles.css. */
		function MinuteDateTime({ id, label, value, max, disabled, onChange }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "wf-minute-control",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
					id,
					"aria-label": label,
					type: "datetime-local",
					step: 60,
					value,
					max,
					disabled,
					onChange: (event) => onChange(event.target.value)
				})
			});
		}
		//#endregion
		//#region src/directory-rules.mjs
		/** Windows directory rules shared by the workbench and Host; no silent input cleanup. */
		const illegalName = /[\\/<>:"|?*\x00-\x1f]/;
		const reservedName = /^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/i;
		function directoryNameError(value, maximum = 180) {
			return typeof value !== "string" || !value.trim() || value.length > maximum || illegalName.test(value) || /[. ]$/.test(value) || value === "." || value === ".." || reservedName.test(value) ? "invalid-folder-name" : null;
		}
		/** Renamed archive files are one Windows path component; reuse the folder rules with the file-name limit. */
		function fileNameError(value, maximum = 255) {
			return typeof value !== "string" || !value.trim() || value.length > maximum || illegalName.test(value) || /[. ]$/.test(value) || value === "." || value === ".." || reservedName.test(value) ? "invalid-file-name" : null;
		}
		/** Separators and a drive-letter colon are legal only as full-path structure. */
		function directoryPathError(value) {
			if (typeof value !== "string" || !value.trim() || value.length > 2048 || /[<>"|?*\x00-\x1f]/.test(value)) return "invalid-save-directory";
			const normalized = value.replaceAll("/", "\\");
			let parts;
			if (/^[a-z]:\\/i.test(normalized)) parts = normalized.slice(3).split("\\");
			else if (normalized.startsWith("\\\\")) {
				parts = normalized.slice(2).split("\\");
				if (!parts[0] || !parts[1]) return "invalid-save-directory";
			} else return "invalid-save-directory";
			return parts.filter(Boolean).some((part) => directoryNameError(part, 255)) ? "invalid-save-directory" : null;
		}
		/** Suggest a legal initial alias for group titles containing Windows punctuation. */
		function suggestDirectoryName(value) {
			let name = String(value).normalize("NFC").replace(/[\\/<>:"|?*\x00-\x1f]/g, "_").slice(0, 180).replace(/[. ]+$/g, "");
			if (!name || name === "." || name === "..") name = "_";
			if (reservedName.test(name)) name = `_${name}`.slice(0, 180);
			return name;
		}
		/** A directory derived from an attachment name never keeps the file-type suffix. */
		function directoryStem(value) {
			const name = String(value).normalize("NFC");
			const cut = name.lastIndexOf(".");
			const suffix = cut > 0 ? name.slice(cut + 1) : "";
			return suffix && /^[A-Za-z0-9]{2,12}$/.test(suffix) ? name.slice(0, cut) : name;
		}
		const accountTitle = (account, fallback) => account.label || [account.organization, account.displayName].filter(Boolean).join(" · ") || `${fallback}（${account.id.slice(-6)}）`;
		/** A fresh read may fill in what an earlier read could not, or reveal the account is unreadable again.
		*  Auto-generated labels follow the fresh read in both directions; a user-typed label is kept.
		*  A label restored from saved settings carries no auto/manual provenance, so it follows the read
		*  only when the account becomes unreadable — a stale real name must not outlive the data it names. */
		function refreshAccountLabel(current, { previous, account, selected, unnamedAccount }) {
			const title = accountTitle(selected, unnamedAccount);
			const pattern = `${unnamedAccount}（${account.slice(-6)}）`;
			if (!current || current === pattern) return title;
			if (title === pattern) {
				if (previous && !Object.hasOwn(previous, "label")) return current === accountTitle(previous, unnamedAccount) ? title : current;
				return title;
			}
			if (previous && !Object.hasOwn(previous, "label") && current === accountTitle(previous, unnamedAccount)) return title;
			return current;
		}
		const UNGROUPED_FILTER = "__ungrouped__";
		/** Translate the client-side group filter into the records API id filter. */
		function groupFilterIds(state, groupId, filter) {
			const entries = state.fileGroups[groupId] || [];
			if (filter === UNGROUPED_FILTER) return { excludeIds: entries.flatMap((entry) => entry.recordIds) };
			if (filter) return { includeIds: (entries.find((entry) => entry.id === filter) || {}).recordIds || [] };
			return {};
		}
		/** Search context so the backend matches the folder the table actually shows (edits, group default, selection). */
		function reviewSearch(reviewChanges, groupFolders, groupId) {
			const overrides = {}, selected = [], deselected = [];
			for (const [id, change] of Object.entries(reviewChanges || {})) {
				if (!change || change.groupId !== groupId) continue;
				if (Object.hasOwn(change, "documentFolder")) overrides[id] = change.documentFolder;
				if (change.selected === true) selected.push(id);
				else if (change.selected === false) deselected.push(id);
			}
			const folder = groupFolders?.[groupId] || "";
			return {
				...(folder ? {
					folder,
					...(selected.length ? { selected } : {}),
					...(deselected.length ? { deselected } : {})
				} : {}),
				...(Object.keys(overrides).length ? { overrides } : {})
			};
		}
		function createViewState(day) {
			let state = {
				initialized: false,
				snapshot: null,
				draft: {
					root: "",
					account: "",
					accountLabel: "",
					saveDirectory: "",
					savedIndexDays: 7,
					defaultSavedFilter: "all",
					autoExtract: false,
					extractNested: false,
					groups: []
				},
				accountList: [],
				name: "",
				found: null,
				start: `${day}T00:00`,
				end: `${day}T23:59`,
				working: false,
				error: "",
				notice: "",
				page: 1,
				rows: [],
				rowsKey: null,
				recordsLoading: false,
				recordsError: "",
				configurationOpen: null,
				groupViews: {},
				reviewChanges: {},
				groupFolders: {},
				fileGroups: {},
				confirmationOpen: false
			};
			const listeners = /* @__PURE__ */ new Set();
			let closed = false, snapshotEpoch = 0, recordsEpoch = 0, scrollTop = 0;
			let scrollHost = null, pendingScroll = null;
			const groupEpochs = /* @__PURE__ */ new Map();
			const getSnapshot = () => state;
			const captureScroll = () => {
				if (scrollHost) pendingScroll = scrollHost.scrollTop;
			};
			const update = (patch) => {
				if (closed) return;
				if (Object.entries(patch).every(([key, value]) => Object.is(state[key], value))) return;
				state = {
					...state,
					...patch
				};
				for (const listener of listeners) listener();
			};
			const pageKey = () => `${state.snapshot?.job?.id || ""}:${state.page}`;
			function acceptSnapshot(value) {
				if (closed) return;
				++snapshotEpoch;
				const previous = state.snapshot, job = value.job;
				const changed = previous?.job?.id !== job?.id;
				const pages = Math.max(1, Math.ceil((job?.recordCount || 0) / 100));
				const page = changed ? 1 : Math.max(1, Math.min(state.page, pages));
				const cleanDraft = !state.initialized || JSON.stringify(state.draft) === JSON.stringify(previous?.settings);
				const patch = {
					initialized: true,
					snapshot: value,
					page
				};
				if (!state.initialized && value.today) {
					patch.start = `${value.today}T00:00`;
					patch.end = `${value.today}T23:59`;
				}
				if (!state.initialized && job?.reviewVersion === 1 && job.reviewReady && (job.operation === "save" || job.operation === "preview" && job.status === "awaiting-confirmation") && typeof job.start === "string" && typeof job.end === "string") {
					patch.start = job.start.includes("T") ? job.start : `${job.start}T00:00`;
					patch.end = job.end.includes("T") ? job.end : `${job.end}T23:59`;
				}
				if (cleanDraft) patch.draft = value.settings || {
					root: value.defaultRoot,
					account: "",
					accountLabel: "",
					saveDirectory: "",
					savedIndexDays: 7,
					defaultSavedFilter: "all",
					autoExtract: false,
					extractNested: false,
					groups: []
				};
				if (!state.initialized && value.settings) patch.accountList = [{
					id: value.settings.account,
					label: value.settings.accountLabel
				}];
				if (state.configurationOpen === null) patch.configurationOpen = !value.settings;
				if (changed || page !== state.page) {
					++recordsEpoch;
					patch.rows = page === 1 ? job?.records || [] : [];
					patch.rowsKey = job ? `${job.id}:${page}` : null;
					patch.recordsError = "";
					patch.recordsLoading = false;
				}
				// A confirmed save opens a new job; keep each group's own filter and expanded state
				// instead of resetting them, and fall back to the configured default for new groups.
				const inheritedViews = job?.operation === "save" ? state.groupViews : {};
				if (changed) {
					groupEpochs.clear();
					pendingScroll = null;
					patch.groupViews = Object.fromEntries((job?.groupSummaries || []).map((group, index) => [group.id, {
						page: 1,
						open: inheritedViews[group.id]?.open ?? (index === 0),
						rows: [],
						loading: false,
						error: "",
						loadedKey: null,
						order: "desc",
						keyword: "",
						filter: "",
						savedFilter: inheritedViews[group.id]?.savedFilter || value.settings?.defaultSavedFilter || "all",
						total: null
					}]));
					patch.reviewChanges = {};
					patch.groupFolders = {};
					patch.fileGroups = {};
					patch.confirmationOpen = false;
				} else if (job?.groupSummaries) {
					patch.groupViews = { ...state.groupViews };
					for (const [index, group] of job.groupSummaries.entries()) {
						const saved = patch.groupViews[group.id] || {
							page: 1,
							open: index === 0,
							rows: [],
							loading: false,
							error: "",
							loadedKey: null,
							order: "desc",
							keyword: "",
							filter: "",
							savedFilter: inheritedViews[group.id]?.savedFilter || value.settings?.defaultSavedFilter || "all",
							total: null
						};
						const page = Math.max(1, Math.min(saved.page, Math.ceil(group.recordCount / 10) || 1));
						patch.groupViews[group.id] = page === saved.page ? saved : {
							...saved,
							page,
							rows: [],
							loadedKey: null
						};
					}
				}
				update(patch);
			}
			async function refresh(request) {
				const epoch = ++snapshotEpoch;
				const value = await request({ action: "state" });
				if (!closed && epoch === snapshotEpoch) acceptSnapshot(value);
			}
			function setPage(value) {
				const next = typeof value === "function" ? value(state.page) : value;
				const maximum = Math.max(1, Math.ceil((state.snapshot?.job?.recordCount || 0) / 100));
				const page = Math.max(1, Math.min(next, maximum));
				if (page === state.page) return;
				++recordsEpoch;
				update({
					page,
					rows: [],
					rowsKey: null,
					recordsError: "",
					recordsLoading: true
				});
			}
			async function loadPage(request) {
				const job = state.snapshot?.job;
				if (!job || closed) return;
				const page = state.page, key = pageKey(), epoch = ++recordsEpoch;
				update({
					recordsLoading: true,
					recordsError: "",
					...state.rowsKey === key ? {} : {
						rows: page === 1 ? job.records : [],
						rowsKey: key
					}
				});
				try {
					const value = await request({
						action: "records",
						jobId: job.id,
						offset: (page - 1) * 100,
						limit: 100
					});
					if (!closed && epoch === recordsEpoch && key === pageKey()) update({
						rows: value.records,
						rowsKey: key
					});
				} catch (error) {
					if (!closed && epoch === recordsEpoch && key === pageKey()) {
						if (error.code === "job-changed") try {
							await refresh(request);
						} catch (refreshError) {}
						if (epoch === recordsEpoch && key === pageKey()) update({ recordsError: error.code || "page-load-failed" });
					}
				} finally {
					if (!closed && epoch === recordsEpoch) update({ recordsLoading: false });
				}
			}
			async function run(operation, onError) {
				if (closed || state.working) return;
				update({
					working: true,
					error: "",
					notice: ""
				});
				try {
					await operation();
				} catch (error) {
					if (!closed) onError(error);
				} finally {
					update({ working: false });
				}
			}
			function setGroupView(id, patch) {
				const current = state.groupViews[id] || {
					page: 1,
					open: false,
					rows: [],
					loading: false,
					error: "",
					loadedKey: null,
					order: "desc",
					keyword: "",
					filter: "",
					savedFilter: state.snapshot?.settings?.defaultSavedFilter ?? "all",
					total: null
				};
				const next = {
					...current,
					...patch
				};
				if (Object.entries(next).every(([key, value]) => Object.is(current[key], value))) return;
				update({ groupViews: {
					...state.groupViews,
					[id]: next
				} });
			}
			function setGroupPage(id, value) {
				const group = state.snapshot?.job?.groupSummaries?.find((group) => group.id === id);
				if (!group) return;
				const current = state.groupViews[id]?.page || 1;
				const maximum = Math.max(1, Math.ceil((state.groupViews[id]?.total ?? group.recordCount) / 10));
				const page = Math.max(1, Math.min(typeof value === "function" ? value(current) : value, maximum));
				if (page === current) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					page,
					loadedKey: null,
					error: "",
					loading: Boolean(state.groupViews[id]?.open)
				});
			}
			function setGroupOrder(id, order) {
				if (!["asc", "desc"].includes(order)) return;
				const current = state.groupViews[id];
				if (!current || current.order === order) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					order,
					page: 1,
					total: null,
					loadedKey: null,
					error: "",
					loading: Boolean(current.open)
				});
			}
			function setGroupKeyword(id, keyword) {
				const current = state.groupViews[id];
				const value = typeof keyword === "string" ? keyword.slice(0, 100) : "";
				if (!current || current.keyword === value) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					keyword: value,
					page: 1,
					total: null,
					loadedKey: null,
					error: "",
					loading: Boolean(current.open)
				});
			}
			function setGroupFilter(id, filter) {
				const current = state.groupViews[id];
				if (!current || (current.filter || "") === filter) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					filter,
					page: 1,
					total: null,
					loadedKey: null,
					error: "",
					loading: Boolean(current.open)
				});
			}
			function setGroupSavedFilter(id, savedFilter) {
				const current = state.groupViews[id];
				if (!current || current.savedFilter === savedFilter) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					savedFilter,
					page: 1,
					total: null,
					loadedKey: null,
					error: "",
					loading: Boolean(current.open)
				});
			}
			function invalidateFilteredGroup(id, reset) {
				const current = state.groupViews[id];
				if (!current || !current.filter) return;
				captureScroll();
				groupEpochs.set(id, (groupEpochs.get(id) || 0) + 1);
				setGroupView(id, {
					...(reset ? { filter: "" } : {}),
					page: 1,
					total: null,
					loadedKey: null,
					error: "",
					loading: Boolean(current.open)
				});
			}
			async function loadGroup(request, id, force = false) {
				const job = state.snapshot?.job, saved = state.groupViews[id];
				if (closed || !job || !saved?.open) return;
				const filter = saved.filter || "";
				const { includeIds, excludeIds } = groupFilterIds(state, id, filter);
				const search = saved.keyword ? reviewSearch(state.reviewChanges, state.groupFolders, id) : null;
				const key = `${job.id}:${job.done || 0}:${job.status}:${saved.page}:${saved.order}:${saved.keyword}:${filter}:${saved.savedFilter}${search ? `:${JSON.stringify(search)}` : ""}`;
				if (!force && saved.loadedKey === key) return;
				const epoch = (groupEpochs.get(id) || 0) + 1;
				groupEpochs.set(id, epoch);
				setGroupView(id, {
					loading: true,
					error: ""
				});
				const current = () => !closed && state.snapshot?.job?.id === job.id && state.groupViews[id]?.page === saved.page && groupEpochs.get(id) === epoch;
				try {
					const value = await request({
						action: "records",
						jobId: job.id,
						groupId: id,
						offset: (saved.page - 1) * 10,
						limit: 10,
						order: saved.order,
						keyword: saved.keyword || void 0,
						status: saved.savedFilter === "all" ? void 0 : saved.savedFilter,
						includeIds,
						excludeIds,
						...(search ? { search } : {})
					});
					if (current()) setGroupView(id, {
						rows: value.records,
						total: value.recordCount,
						loadedKey: key
					});
				} catch (error) {
					if (current()) {
						if (error.code === "job-changed") try {
							await refresh(request);
						} catch (reason) {}
						if (current()) setGroupView(id, { error: error.code || "page-load-failed" });
					}
				} finally {
					if (current()) setGroupView(id, { loading: false });
				}
			}
			function setRecordReview(record, patch) {
				const previous = state.reviewChanges[record.id] || {
					groupId: record.groupId,
					baseSelected: reviewedRow(state, record).selected,
					selectable: Boolean(record.selectable)
				};
				update({
					reviewChanges: {
						...state.reviewChanges,
						[record.id]: { ...previous, ...patch }
					},
					confirmationOpen: false
				});
			}
			/** Header select-all writes explicit changes for the records in the current filter scope. */
			function applySelections(entries, selected) {
				const savedJob = state.snapshot?.job?.operation === "save";
				const changes = { ...state.reviewChanges };
				for (const entry of entries) {
					const previous = changes[entry.id] || {
						groupId: entry.groupId,
						baseSelected: savedJob ? false : Boolean(entry.selected),
						selectable: true
					};
					const next = { ...previous, selected };
					if (next.selected === next.baseSelected) delete next.selected;
					if (Object.keys(next).every((key) => ["groupId", "baseSelected", "selectable"].includes(key))) delete changes[entry.id];
					else changes[entry.id] = next;
				}
				update({
					reviewChanges: changes,
					confirmationOpen: false
				});
			}
			/** An in-place save is final; drop that row's pending selection/folder edit so it matches group-level saves. */
			function clearRecordReview(id) {
				if (!Object.hasOwn(state.reviewChanges, id)) return;
				const changes = { ...state.reviewChanges };
				delete changes[id];
				update({ reviewChanges: changes });
			}
			function setGroupFolder(id, documentFolder) {
				const next = { ...state.groupFolders };
				if (documentFolder) next[id] = documentFolder;
				else delete next[id];
				update({
					groupFolders: next,
					confirmationOpen: false
				});
			}
			function addFileGroup(id, name, records) {
				const existing = state.fileGroups[id] || [];
				const changes = { ...state.reviewChanges };
				for (const record of records) {
					const previous = changes[record.id] || {
						groupId: record.groupId,
						baseSelected: Boolean(record.selected),
						selectable: Boolean(record.selectable)
					};
					// The group is a named selection with a folder preset; it is not a second save channel.
					changes[record.id] = { ...previous, documentFolder: name };
				}
				update({
					fileGroups: {
						...state.fileGroups,
						[id]: [...existing, {
							id: `${id}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2, 6)}`,
							name,
							recordIds: records.map((record) => record.id)
						}]
					},
					reviewChanges: changes,
					confirmationOpen: false
				});
				invalidateFilteredGroup(id, false);
			}
			function removeFileGroup(id, entryId) {
				const entry = (state.fileGroups[id] || []).find((item) => item.id === entryId);
				if (!entry) return;
				const changes = { ...state.reviewChanges };
				for (const recordId of entry.recordIds) {
					const change = changes[recordId];
					if (!change) continue;
					const next = { ...change };
					if (next.documentFolder === entry.name) delete next.documentFolder;
					if (Object.keys(next).every((key) => ["groupId", "baseSelected", "selectable"].includes(key))) delete changes[recordId];
					else changes[recordId] = next;
				}
				update({
					fileGroups: {
						...state.fileGroups,
						[id]: (state.fileGroups[id] || []).filter((item) => item.id !== entryId)
					},
					reviewChanges: changes,
					confirmationOpen: false
				});
				invalidateFilteredGroup(id, state.groupViews[id]?.filter === entryId);
			}
			function addFileGroupMembers(id, entryId, recordIds) {
				const groups = state.fileGroups[id] || [];
				const entry = groups.find((item) => item.id === entryId);
				if (!entry) return;
				const ids = [...new Set([...entry.recordIds, ...recordIds.filter((recordId) => typeof recordId === "string" && recordId)])];
				if (ids.length === entry.recordIds.length) return;
				update({
					fileGroups: {
						...state.fileGroups,
						[id]: groups.map((item) => item.id === entryId ? { ...item, recordIds: ids } : item)
					},
					confirmationOpen: false
				});
				invalidateFilteredGroup(id, false);
			}
			return {
				getSnapshot,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => listeners.delete(listener);
				},
				set: (key, value) => update({ [key]: typeof value === "function" ? value(state[key]) : value }),
				acceptSnapshot,
				refresh,
				setPage,
				loadPage,
				run,
				setGroupView,
				setGroupPage,
				setGroupOrder,
				loadGroup,
				setRecordReview,
				clearRecordReview,
				applySelections,
				setGroupKeyword,
				setGroupFilter,
				setGroupSavedFilter,
				setGroupFolder,
				addFileGroup,
				addFileGroupMembers,
				removeFileGroup,
				rememberScroll: (value) => {
					if (!closed) scrollTop = value;
				},
				getScroll: () => scrollTop,
				attachScroll: (node) => {
					scrollHost = node || null;
				},
				consumeScroll: () => {
					if (!scrollHost || pendingScroll === null) return;
					const top = pendingScroll;
					pendingScroll = null;
					scrollHost.scrollTop = top;
				},
				dispose: () => {
					closed = true;
					scrollHost = null;
					pendingScroll = null;
					++snapshotEpoch;
					++recordsEpoch;
					groupEpochs.clear();
					listeners.clear();
				}
			};
		}
		/** Effective selection and folder retain edits even when the record is on another page. */
		function reviewedRow(state, record) {
			const change = state.reviewChanges[record.id];
			const savedJob = state.snapshot?.job?.operation === "save";
			const selected = Boolean(record.selectable && (change?.selected ?? (savedJob ? false : record.selected)));
			return {
				selected,
				documentFolder: change?.documentFolder ?? (selected ? state.groupFolders[record.groupId] : void 0) ?? record.documentFolder ?? ""
			};
		}
		/** Count from complete group summaries rather than the currently displayed pages. */
		function reviewCounts(state) {
			const savedJob = state.snapshot?.job?.operation === "save";
			const groups = (state.snapshot?.job?.groupSummaries || []).map((group) => {
				let selected = savedJob ? 0 : group.selectedCount;
				for (const value of Object.values(state.reviewChanges)) {
					if (value.groupId !== group.id || !value.selectable) continue;
					if (!Object.hasOwn(value, "selected")) continue;
					selected += Number(value.selected) - Number(value.baseSelected);
				}
				return {
					...group,
					selectedCount: Math.max(0, selected)
				};
			});
			return {
				groups,
				selectedCount: groups.reduce((sum, group) => sum + group.selectedCount, 0)
			};
		}
		/** Every group-selected file is an ordinary selected row, so the payload carries only selectors and folders. */
		function reviewPayload(state) {
			const rows = Object.entries(state.reviewChanges).flatMap(([id, value]) => {
				const selected = Object.hasOwn(value, "selected") ? value.selected : value.baseSelected;
				const change = { id };
				if (Object.hasOwn(value, "selected")) change.selected = value.selected;
				if (selected && Object.hasOwn(value, "documentFolder")) change.documentFolder = value.documentFolder;
				return Object.keys(change).length > 1 ? [{ groupId: value.groupId, change }] : [];
			});
			return {
				groupFolders: Object.entries(state.groupFolders).map(([groupId, documentFolder]) => ({
					groupId,
					documentFolder
				})),
				changes: rows.map((item) => item.change),
				rows
			};
		}
		/** Send only the chosen groups, selectors and directory components, never client-supplied file metadata. */
		function confirmationPayload(state, groupIds, allowAutoFolders) {
			const payload = reviewPayload(state), scope = new Set(groupIds);
			return {
				action: "confirm",
				jobId: state.snapshot?.job?.id,
				groupIds: [...groupIds],
				...(allowAutoFolders ? { allowAutoFolders: true } : {}),
				groupFolders: payload.groupFolders.filter((item) => scope.has(item.groupId)),
				changes: payload.rows.filter((item) => scope.has(item.groupId)).map((item) => item.change)
			};
		}
		//#endregion
		//#region src/client/Page.tsx
		/** User-triggered workbench; mounting reads saved configuration and results only. */
		const currentDay = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai" }).format(/* @__PURE__ */ new Date());
		const busyJob = (job) => job && (["running", "cancelling"].includes(job.status) || job.extracting === true);
		/** Every terminal outcome that did not end as saved/existing/skipped counts as unsaved. */
		const unsavedCount = (counts) => Object.entries(counts || {}).reduce((sum, [status, value]) => sum + (["saved", "existing", "skipped", "not-selected"].includes(status) || !Number.isFinite(value) ? 0 : value), 0);
		/** Left list shows only the parent folder; the full path stays in the detail card and tooltip. */
		const directoryLabel = (value) => typeof value === "string" ? value.split(/[\\/]/).filter(Boolean).pop() || value : "";
		const messageDate = (value, fallback) => {
			const number = Number(value);
			return number > 0 ? new Date(number > 1e11 ? number : number * 1e3).toLocaleString("zh-CN", {
				timeZone: "Asia/Shanghai",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			}) : fallback;
		};
		/** Each group owns its page and local review controls; only opened groups fetch rows. */
		function GroupFiles({ group, data, view, request, t, disabled, editable, reportError, onSaveGroup, notify }) {
			const job = data.snapshot.job, saved = data.groupViews[group.id] || {
				page: 1,
				open: false,
				rows: [],
				loading: false,
				error: "",
				order: "desc",
				keyword: "",
				filter: "",
				savedFilter: data.snapshot.settings?.defaultSavedFilter ?? "all",
				total: null
			};
			const pages = Math.max(1, Math.ceil((saved.total ?? group.recordCount) / 10));
			const fileGroups = data.fileGroups[group.id] || [];
			const activeFilter = saved.filter || "";
			const activeFileGroup = fileGroups.find((entry) => entry.id === activeFilter) || null;
			const folderHint = [group.folder, t("pathDateLabel"), activeFileGroup ? activeFileGroup.name : data.groupFolders[group.id] || t("pathFolderLabel"), t("pathFileLabel")].join("\\");
			const savedJob = job.operation === "save";
			const search = saved.keyword ? reviewSearch(data.reviewChanges, data.groupFolders, group.id) : null;
			const [jump, setJump] = (0, react.useState)("");
			const [keywordDraft, setKeywordDraft] = (0, react.useState)(saved.keyword);
			const [directoryView, setDirectoryView] = (0, react.useState)(null);
			const [directoryJump, setDirectoryJump] = (0, react.useState)("");
			const [fileJump, setFileJump] = (0, react.useState)("");
			const directoryEpoch = (0, react.useRef)(0);
			const [directoryCopy, setDirectoryCopy] = (0, react.useState)({ directory: "", status: "" });
			const writeClipboard = async (text) => {
				if (navigator.clipboard?.writeText) {
					await navigator.clipboard.writeText(text);
					return;
				}
				const area = document.createElement("textarea");
				area.value = text;
				area.style.position = "fixed";
				area.style.opacity = "0";
				document.body.append(area);
				area.select();
				const copied = document.execCommand("copy");
				area.remove();
				if (!copied) throw new Error("copy-failed");
			};
			const copySavedDirectory = async (directory) => {
				try {
					await writeClipboard(directory);
					setDirectoryCopy({ directory, status: "copied" });
				} catch {
					setDirectoryCopy({ directory, status: "failed" });
				}
			};
			// Deleting an archive copy turns a previously final row back into a selectable one;
			// the cached scope has to be rebuilt or select-all keeps skipping it.
			const [scopeEpoch, setScopeEpoch] = (0, react.useState)(0);
			const scopeKey = `${job.id}:${group.id}:${saved.keyword || ""}:${activeFilter}:${saved.savedFilter}:${scopeEpoch}${search ? `:${JSON.stringify(search)}` : ""}`;
			const [scope, setScope] = (0, react.useState)({ key: "", rows: [], loading: false, truncated: false });
			const scopeRows = scope.key === scopeKey ? scope.rows : [];
			const scopeEntries = scopeRows;
			const pendingSelectable = scopeEntries.length;
			const scopeSelected = scopeEntries.filter((entry) => {
				const change = data.reviewChanges[entry.id];
				return Boolean(change?.selected ?? change?.baseSelected ?? (!savedJob && entry.selected));
			}).length;
			const allSelected = pendingSelectable > 0 && scopeSelected >= pendingSelectable;
			const scopeReady = scope.key === scopeKey && !scope.loading;
			const [groupBusy, setGroupBusy] = (0, react.useState)(false);
			const [groupDialog, setGroupDialog] = (0, react.useState)(null);
			const [defaultDialog, setDefaultDialog] = (0, react.useState)(null);
			const [fileAction, setFileAction] = (0, react.useState)(null);
			const [fileActionBusy, setFileActionBusy] = (0, react.useState)(false);
			const [zipBusy, setZipBusy] = (0, react.useState)(false);
			const [extractingId, setExtractingId] = (0, react.useState)("");
			const isArchiveFile = (name) => typeof name === "string" && /\.(zip|rar)$/i.test(name);
			const [rowSaving, setRowSaving] = (0, react.useState)({});
			const [savedFolderNames, setSavedFolderNames] = (0, react.useState)([]);
			const [savedFolderEpoch, setSavedFolderEpoch] = (0, react.useState)(0);
			const [memberBases, setMemberBases] = (0, react.useState)({ key: "", map: {} });
			// Saved/unsaved flags change after delete or single-row archive; scopeEpoch forces chip counts to refetch.
			const membershipKey = `${scopeEpoch}|${fileGroups.map((entry) => entry.id).join("|")}`;
			(0, react.useEffect)(() => {
				setKeywordDraft(saved.keyword);
			}, [saved.keyword]);
			(0, react.useEffect)(() => {
				if (!directoryCopy.directory) return;
				const timer = setTimeout(() => setDirectoryCopy({ directory: "", status: "" }), 2000);
				return () => clearTimeout(timer);
			}, [directoryCopy]);
			(0, react.useEffect)(() => {
				if (!saved.open || !job.reviewReady) return;
				const key = scopeKey;
				let stopped = false;
				setScope((current) => current.key === key ? current : { key, rows: [], loading: true, truncated: false });
				request({
					action: "scope",
					jobId: job.id,
					groupId: group.id,
					...(saved.keyword ? { keyword: saved.keyword, search } : {}),
					...(saved.savedFilter === "all" ? {} : { status: saved.savedFilter }),
					...groupFilterIds(data, group.id, activeFilter)
				}).then((value) => {
					if (!stopped) setScope({ key, rows: value.records, loading: false, truncated: Boolean(value.truncated) });
				}).catch(() => {
					if (!stopped) setScope({ key, rows: [], loading: false, truncated: false });
				});
				return () => {
					stopped = true;
				};
			}, [scopeKey, saved.open, job.reviewReady, request, data.fileGroups]);
			/** Fetch each saved group's complete membership once; chip selection crosses pages and filters. */
			(0, react.useEffect)(() => {
				if (!saved.open || !job.reviewReady) return;
				const key = membershipKey, groups = data.fileGroups[group.id] || [];
				let stopped = false;
				const load = async () => {
					const map = {};
					for (const entry of groups) {
						if (entry.recordIds.length > 10000) {
							map[entry.id] = { rows: [], error: "group-too-large" };
							continue;
						}
						if (!entry.recordIds.length) {
							map[entry.id] = { rows: [], error: "" };
							continue;
						}
						try {
							const value = await request({
								action: "scope",
								jobId: job.id,
								groupId: group.id,
								includeIds: entry.recordIds
							});
							map[entry.id] = { rows: value.records, error: "" };
						} catch (error) {
							map[entry.id] = { rows: [], error: error.code || "invalid-request" };
						}
					}
					if (!stopped) setMemberBases({ key, map });
				};
				void load();
				return () => {
					stopped = true;
				};
			}, [membershipKey, saved.open, job.id, job.reviewReady, request, group.id, scopeEpoch]);
			/** Existing archive folders are valid group targets even when this preview has no named group. */
			(0, react.useEffect)(() => {
				if (!saved.open || !job.reviewReady) {
					setSavedFolderNames([]);
					return;
				}
				let stopped = false;
				request({
					action: "saved-folders",
					jobId: job.id,
					groupId: group.id
				}).then((value) => {
					if (!stopped) setSavedFolderNames(Array.isArray(value.names) ? value.names : []);
				}).catch(() => {
					if (!stopped) setSavedFolderNames([]);
				});
				return () => {
					stopped = true;
				};
			}, [job.id, job.reviewReady, group.id, saved.open, savedFolderEpoch, request]);
			const refreshSavedFolderNames = () => setSavedFolderEpoch((value) => value + 1);
			const groupOptions = savedFolderNames;
			const groupInfos = fileGroups.map((entry) => {
				const base = memberBases.key === membershipKey ? memberBases.map[entry.id] : null;
				if (!base || base.error) return { entry, state: "unavailable", selected: 0, total: 0, error: base ? base.error : "" };
				const rows = base.rows.filter((row) => !row.savedBefore);
				const total = rows.length;
				const selected = rows.filter((row) => {
					const change = data.reviewChanges[row.id];
					return Boolean(change?.selected ?? (savedJob ? false : row.selected));
				}).length;
				return {
					entry,
					state: total === 0 || selected === 0 ? "none" : selected >= total ? "all" : "partial",
					selected,
					total,
					error: ""
				};
			});
			const memberGroup = new Map();
			for (const entry of fileGroups) for (const recordId of entry.recordIds) memberGroup.set(recordId, entry.name);
			const toggleFileGroup = (entry, info) => {
				if (info.error || info.total === 0) return;
				const base = memberBases.key === membershipKey ? memberBases.map[entry.id] : null;
				if (!base) return;
				const rows = base.rows.filter((row) => !row.savedBefore);
				view.applySelections(rows.map((row) => ({ id: row.id, groupId: group.id, selected: row.selected })), info.state !== "all");
			};
			const runSearch = () => view.setGroupKeyword(group.id, keywordDraft.trim());
			const openDefaultDialog = () => setDefaultDialog({
				name: data.groupFolders[group.id] || "",
				error: ""
			});
			const confirmDefaultDialog = () => {
				if (!defaultDialog) return;
				if (directoryNameError(defaultDialog.name)) {
					setDefaultDialog({ ...defaultDialog, error: t("error_invalid-folder-name") });
					return;
				}
				view.setGroupFolder(group.id, defaultDialog.name);
				setDefaultDialog(null);
			};
			const collectSelected = async () => {
				const selected = [];
				let offset = 0, total = Infinity;
				while (offset < total) {
					const value = await request({
						action: "records",
						jobId: job.id,
						groupId: group.id,
						offset,
						limit: 100,
						order: "asc"
					});
					total = value.recordCount;
					if (!value.records.length) break;
					for (const record of value.records) {
						if (memberGroup.has(record.id)) continue;
						if (!reviewedRow(view.getSnapshot(), record).selected) continue;
						selected.push(record);
						if (selected.length > 10000) return { records: selected, truncated: true };
					}
					offset += value.records.length;
				}
				return { records: selected, truncated: false };
			};
			const openGroupDialog = async () => {
				if (groupBusy || !group.selectedCount) return;
				setGroupBusy(true);
				try {
					const { records, truncated } = await collectSelected();
					if (truncated) {
						reportError({ code: "group-too-large" });
						return;
					}
					if (!records.length) {
						reportError({ code: "group-no-ungrouped" });
						return;
					}
					const visible = saved.rows.find((record) => !memberGroup.has(record.id) && reviewedRow(view.getSnapshot(), record).selected);
					setGroupDialog({ name: directoryStem((visible || records[0]).name), records, error: "" });
				} catch (error) {
					reportError(error);
				} finally {
					setGroupBusy(false);
				}
			};
			const confirmGroupDialog = () => {
				if (!groupDialog) return;
				// Only the suggested name strips the file extension; keep what the user typed.
				const name = groupDialog.name.normalize("NFC");
				if (directoryNameError(name)) {
					setGroupDialog({ ...groupDialog, error: t("error_invalid-group-name") });
					return;
				}
				if ((data.fileGroups[group.id] || []).some((entry) => entry.name === name)) {
					setGroupDialog({ ...groupDialog, error: t("groupNameExists") });
					return;
				}
				view.addFileGroup(group.id, name, groupDialog.records);
				setGroupDialog(null);
			};
			const errorText = (code) => {
				const key = `error_${code}`;
				return t(key in zh ? key : "error_unknown");
			};
			const saveRowToGroup = async (record, name) => {
				if (rowSaving[record.id]) return;
				// A named-group view under the unsaved segment would hide the row that was just archived.
				const keepSavedRowVisible = saved.savedFilter === "unsaved" && fileGroups.some((item) => item.id === activeFilter);
				setRowSaving((current) => ({ ...current, [record.id]: true }));
				try {
					const value = await request({
						action: "save-row",
						jobId: job.id,
						recordId: record.id,
						groupName: name
					});
					view.acceptSnapshot(value.snapshot);
					if (value.status === "saved" || value.status === "existing") {
						// The same job keeps reviewChanges; an explicit selected:true would keep the archived row checked.
						view.clearRecordReview(record.id);
						if (keepSavedRowVisible) view.setGroupSavedFilter(group.id, "all");
						setScopeEpoch((current) => current + 1);
						refreshSavedFolderNames();
						if (value.extractSummary) notify({ title: t("autoExtractToast"), extract: value.extractSummary });
					} else reportError({ code: value.status });
					await view.loadGroup(request, group.id, true);
					if (directoryView) await loadDirectories({
						directoryPage: directoryView.directoryPage || 1,
						directory: directoryView.selected || "",
						filePage: directoryView.filePage || 1
					});
				} catch (error) {
					reportError(error);
				} finally {
					setRowSaving((current) => {
						const next = { ...current };
						delete next[record.id];
						return next;
					});
				}
			};
			const openFileDelete = (file) => setFileAction({ kind: "delete", id: file.id, name: file.name, path: file.path, error: "" });
			const openFileRename = (file) => setFileAction({ kind: "rename", id: file.id, name: file.name, path: file.path, error: "" });
			const confirmFileAction = async () => {
				if (!fileAction || fileActionBusy) return;
				const rename = fileAction.kind === "rename";
				const name = rename ? fileAction.name.trim() : "";
				if (rename) {
					const invalid = fileNameError(name, 255);
					if (invalid) {
						setFileAction({ ...fileAction, error: t(`error_${invalid}`) });
						return;
					}
				}
				setFileActionBusy(true);
				const currentDirectory = directoryView;
				try {
					const value = await request(rename ? {
						action: "file-rename",
						jobId: job.id,
						recordId: fileAction.id,
						name
					} : {
						action: "file-delete",
						jobId: job.id,
						recordId: fileAction.id
					});
					view.acceptSnapshot(value.snapshot);
					setFileAction(null);
					if (!rename) setScopeEpoch((current) => current + 1);
					refreshSavedFolderNames();
					await view.loadGroup(request, group.id, true);
					await loadDirectories({
						directoryPage: currentDirectory?.directoryPage || 1,
						directory: currentDirectory?.selected || "",
						filePage: rename ? currentDirectory?.filePage || 1 : 1
					});
				} catch (error) {
					setFileAction((current) => current ? { ...current, error: errorText(error.code) } : current);
				} finally {
					setFileActionBusy(false);
				}
			};
			const extractNow = async (file) => {
				if (zipBusy) return;
				setZipBusy(true);
				setExtractingId(file.id);
				const currentDirectory = directoryView;
				try {
					const value = await request({ action: "zip-extract", jobId: job.id, recordId: file.id });
					view.acceptSnapshot(value.snapshot);
					setScopeEpoch((current) => current + 1);
					refreshSavedFolderNames();
					await view.loadGroup(request, group.id, true);
					if (currentDirectory) await loadDirectories({
						directoryPage: currentDirectory.directoryPage || 1,
						directory: currentDirectory.selected || "",
						filePage: currentDirectory.filePage || 1
					});
					notify({ title: t("extractDoneTitle"), extract: value.summary });
				} catch (error) {
					reportError(error);
				} finally {
					setZipBusy(false);
					setExtractingId("");
				}
			};
			const stopExtract = () => {
				void request({ action: "cancel", jobId: job.id }).catch(() => {});
			};
			const loadDirectories = async ({ directoryPage = 1, directory = "", filePage = 1 } = {}) => {
				const epoch = ++directoryEpoch.current;
				setDirectoryView((current) => current ? { ...current, loading: true, error: "" } : current);
				try {
					const value = await request({
						action: "directories",
						jobId: job.id,
						groupId: group.id,
						...(saved.keyword ? { keyword: saved.keyword, search } : {}),
						...groupFilterIds(data, group.id, saved.filter),
						directoryOffset: (directoryPage - 1) * 10,
						directoryLimit: 10,
						...(directory ? { directory, fileOffset: (filePage - 1) * 10, fileLimit: 10 } : {})
					});
					if (epoch !== directoryEpoch.current) return;
					setDirectoryView((current) => current ? {
						...current,
						loading: false,
						error: "",
						truncated: value.truncated === true,
						directories: value.directories || [],
						directoryCount: value.directoryCount || 0,
						recordCount: value.recordCount || 0,
						directoryPage: value.directoryPage || directoryPage,
						selected: value.directory || "",
						files: value.files || [],
						fileCount: value.fileCount || 0,
						filePage: value.directory ? filePage : 1
					} : current);
				} catch (error) {
					if (epoch !== directoryEpoch.current) return;
					setDirectoryView((current) => current ? { ...current, loading: false, error: error.code || "unknown" } : current);
				}
			};
			const toggleSavedDirectories = () => {
				setDirectoryCopy({ directory: "", status: "" });
				setDirectoryJump("");
				setFileJump("");
				setFileAction(null);
				if (directoryView) {
					++directoryEpoch.current;
					setDirectoryView(null);
					return;
				}
				setDirectoryView({ loading: true, error: "", truncated: false, directories: [], directoryCount: 0, recordCount: 0, directoryPage: 1, selected: "", files: [], fileCount: 0, filePage: 1 });
				void loadDirectories({});
			};
			const selectSavedDirectory = (directory) => {
				if (!directoryView || directoryView.loading || directoryView.selected === directory) return;
				setFileJump("");
				void loadDirectories({ directoryPage: directoryView.directoryPage, directory, filePage: 1 });
			};
			const openSavedLocation = (record) => {
				const filePath = (record.savedBefore && record.savedBefore.path) || (job.operation === "save" ? record.path : "");
				const cut = typeof filePath === "string" ? Math.max(filePath.lastIndexOf("\\"), filePath.lastIndexOf("/")) : -1;
				if (cut <= 0) return;
				const directory = filePath.slice(0, cut);
				setDirectoryCopy({ directory: "", status: "" });
				setDirectoryJump("");
				setFileJump("");
				setFileAction(null);
				setDirectoryView({ loading: true, error: "", truncated: false, directories: [], directoryCount: 0, recordCount: 0, directoryPage: 1, selected: directory, files: [], fileCount: 0, filePage: 1 });
				void loadDirectories({ directory, filePage: 1 });
			};
			const changeDirectoryPage = (value) => {
				if (!directoryView) return;
				const maximum = Math.max(1, Math.ceil(directoryView.directoryCount / 10));
				const target = Math.max(1, Math.min(typeof value === "function" ? value(directoryView.directoryPage) : value, maximum));
				if (target === directoryView.directoryPage) return;
				setFileJump("");
				void loadDirectories({ directoryPage: target });
			};
			const changeDirectoryFilePage = (value) => {
				if (!directoryView?.selected) return;
				const maximum = Math.max(1, Math.ceil(directoryView.fileCount / 10));
				const target = Math.max(1, Math.min(typeof value === "function" ? value(directoryView.filePage) : value, maximum));
				if (target === directoryView.filePage) return;
				void loadDirectories({ directoryPage: directoryView.directoryPage, directory: directoryView.selected, filePage: target });
			};
			const renderDirectoryPager = (page, count, jumpValue, setJumpValue, onChange, compact = false) => {
				const pages = Math.max(1, Math.ceil(count / 10));
				const submit = () => {
					const target = parseInt(jumpValue, 10);
					if (Number.isInteger(target)) onChange(target);
					setJumpValue("");
				};
				const jumpInput = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
					value: jumpValue,
					inputMode: "numeric",
					...(compact ? { placeholder: t("pageNumber") } : {}),
					"aria-label": compact ? t("pageNumber") : t("go"),
					onChange: (event) => setJumpValue(event.target.value.replace(/\D/g, "").slice(0, 4)),
					onKeyDown: (event) => {
						if (event.key === "Enter" && !event.nativeEvent.isComposing) submit();
					}
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: compact ? "wf-row wf-pagination wf-directory-pagination wf-directory-pagination-compact" : "wf-row wf-pagination wf-directory-pagination",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							disabled: page <= 1 || directoryView?.loading,
							onClick: () => onChange(page - 1),
							children: t("before")
						}),
						compact ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [page, " / ", pages] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [page, " / ", pages, " ", t("page")] }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							disabled: page >= pages || directoryView?.loading,
							onClick: () => onChange(page + 1),
							children: t("next")
						}),
						compact ? jumpInput : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: "wf-page-jump",
							children: [
								t("jumpTo"),
								jumpInput,
								t("page")
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: Boolean(directoryView?.loading) || !jumpValue,
							onClick: submit,
							children: t("go")
						})
					]
				});
			};
			// Filter/search changes reset the directory view; scopeEpoch alone (delete/single archive)
			// must keep the directory the user is inspecting, which reloads itself explicitly.
			const directoryScopeKey = `${job.id}:${group.id}:${saved.keyword || ""}:${activeFilter}:${saved.savedFilter}${search ? `:${JSON.stringify(search)}` : ""}`;
			(0, react.useEffect)(() => {
				if (!directoryView) return;
				void loadDirectories({});
			}, [directoryScopeKey]);
			(0, react.useEffect)(() => {
				++directoryEpoch.current;
				setDirectoryView(null);
				setFileAction(null);
			}, [job.id]);
			(0, react.useEffect)(() => {
				if (saved.open) view.loadGroup(request, group.id);
			}, [
				view,
				request,
				job.id,
				job.done,
				job.status,
				group.id,
				saved.open,
				saved.page,
				saved.order,
				saved.keyword,
				saved.filter,
				saved.savedFilter,
				data.fileGroups,
				data.reviewChanges,
				data.groupFolders
			]);
			(0, react.useLayoutEffect)(() => {
				if (!saved.loading) view.consumeScroll();
			}, [
				view,
				saved.loading,
				saved.rows
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
				className: "wf-box wf-group-files",
				"data-group-id": group.id,
				open: saved.open,
				onToggle: (event) => view.setGroupView(group.id, { open: event.currentTarget.open }),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "wf-group-title",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "wf-group-name",
							children: group.name
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "wf-group-folder",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "wf-muted",
									children: [t("storedAt"), "："]
								}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "wf-folder-path",
										title: folderHint,
										children: folderHint
									}), data.groupFolders[group.id] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "wf-chip-remove",
									title: t("clearDefaultFolder"),
									"aria-label": `${t("clearDefaultFolder")}：${data.groupFolders[group.id]}`,
									disabled: disabled || !editable || Boolean(directoryView),
									onMouseDown: (event) => {
										event.preventDefault();
										event.stopPropagation();
									},
									onClick: (event) => {
										event.preventDefault();
										event.stopPropagation();
										view.setGroupFolder(group.id, "");
									},
									children: "×"
								})
							]
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "wf-muted",
						children: [
							t("total"),
							" ",
							group.recordCount,
							" · ",
							t("selectableFiles"),
							" ",
							group.selectableCount,
							" · ",
							t("selectedFiles"),
							" ",
							group.selectedCount
						]
					})] }),
					job.reviewReady && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "wf-group-actions",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "wf-row wf-file-search",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: "wf-inline-search",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
										"aria-label": `${t("searchFiles")}：${group.name}`,
										value: keywordDraft,
										maxLength: 100,
										onChange: (event) => setKeywordDraft(event.target.value),
										onKeyDown: (event) => {
											if (event.key === "Enter" && !event.nativeEvent.isComposing) runSearch();
										},
										placeholder: t("searchFilesHint")
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: saved.loading,
									onClick: runSearch,
									children: t("searchAction")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "wf-segmented",
									role: "group",
									"aria-label": t("savedFilterLabel"),
									title: t("savedFilterHint"),
									children: [["unsaved", "savedFilterUnsaved"], ["saved", "savedFilterSaved"], ["all", "savedFilterAll"]].map(([value, label]) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: saved.savedFilter === value ? "wf-segment wf-segment-active" : "wf-segment",
										"aria-pressed": saved.savedFilter === value,
										disabled: saved.loading || Boolean(directoryView),
										onClick: () => view.setGroupSavedFilter(group.id, value),
										children: t(label)
									}, value))
								}),
								(saved.keyword || saved.filter || saved.savedFilter !== "all") && saved.total !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "wf-muted",
									children: [saved.keyword ? t("matchedFiles") : t("filteredFiles"), " ", saved.total]
								})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-row wf-group-actions-row",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										disabled: disabled || !editable || Boolean(directoryView),
										onClick: openDefaultDialog,
										children: t("setDefaultFolder")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										disabled: disabled || !editable || !group.selectedCount || groupBusy || Boolean(directoryView),
										onClick: () => void openGroupDialog(),
										children: groupBusy ? t("loading") : t("createGroup")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "primary",
										title: t("saveGroupHint"),
										disabled: disabled || !editable || !group.selectedCount || Boolean(directoryView),
										onClick: () => onSaveGroup(group.id),
										children: t("reviewSave")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "wf-group-actions-end",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "outline",
											title: t("savedDirectoryViewHint"),
											disabled: disabled,
											"aria-pressed": Boolean(directoryView),
											onClick: toggleSavedDirectories,
											children: t(directoryView ? "backToFileList" : "savedDirectoryView")
										})
									})
								]
							}),
							fileGroups.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-group-chips",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: activeFilter === UNGROUPED_FILTER ? "wf-group-chip wf-ungrouped-chip wf-group-chip-active" : "wf-group-chip wf-ungrouped-chip",
									title: t("ungroupedHint"),
									"aria-pressed": activeFilter === UNGROUPED_FILTER,
									onClick: () => view.setGroupFilter(group.id, activeFilter === UNGROUPED_FILTER ? "" : UNGROUPED_FILTER),
									children: t("ungrouped")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "wf-muted",
									children: t("groupsLabel")
								}), groupInfos.map(({ entry, state, selected, total, error }) => {
									const loading = state === "unavailable" && !error;
									const errorKey = error ? `error_${error}` : "";
									const title = loading ? t("loading") : error ? t(errorKey in zh ? errorKey : "error_unknown") : activeFilter === UNGROUPED_FILTER ? t("groupSelectionUngroupedHint") : total === 0 ? t("groupSelectionAllSaved") : t("groupSelectionHint");
									const unavailable = loading || Boolean(error) || activeFilter === UNGROUPED_FILTER || total === 0;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: activeFilter === entry.id ? "wf-group-chip wf-group-chip-active" : "wf-group-chip",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: "wf-group-chip-check",
											"aria-label": `${t("selectGroup")}：${entry.name}`,
											title,
											checked: state === "all",
											ref: (node) => {
												if (node) node.indeterminate = state === "partial";
											},
											disabled: disabled || !editable || unavailable || Boolean(directoryView),
											onChange: () => toggleFileGroup(entry, { state, total, error })
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "wf-group-chip-toggle",
											title: t("filterGroupHint"),
											"aria-pressed": activeFilter === entry.id,
											onClick: () => view.setGroupFilter(group.id, activeFilter === entry.id ? "" : entry.id),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "wf-group-chip-name",
												children: entry.name
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "wf-group-chip-count",
												title,
												children: loading ? "…" : `${selected}/${total}`
											})]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "wf-chip-remove",
											title: t("removeGroupHint"),
											"aria-label": `${t("removeGroup")}：${entry.name}`,
											disabled: disabled || !editable || Boolean(directoryView),
											onClick: () => view.removeFileGroup(group.id, entry.id),
											children: "×"
										})]
									}, entry.id);
								}), (saved.keyword || activeFilter || saved.savedFilter !== "all") && groupInfos.some((info) => info.selected > 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "wf-muted",
									children: t("groupSelectionHiddenHint")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "wf-group-content",
						children: [
					saved.error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "wf-row",
						role: "alert",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "wf-error",
							children: t("pageLoadFailed")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: saved.loading,
							onClick: () => void view.loadGroup(request, group.id, true),
							children: t("retryPage")
						})]
					}),
					!directoryView && (!saved.rows.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "wf-empty",
						children: saved.loading ? t("loading") : saved.error ? t("pageLoadFailed") : saved.keyword ? t("searchNoMatch") : saved.savedFilter === "unsaved" ? t("savedFilterEmptyUnsaved") : saved.savedFilter === "saved" ? t("savedFilterEmptySaved") : saved.filter ? t("filterNoMatch") : t("noFiles")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "wf-table",
						"aria-busy": saved.loading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: [
							"selectColumn",
							"filename",
							"messageTime",
							"billMatch",
							"documentFolder",
							"saveToGroup",
							"status"
						].map((key) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: key === "selectColumn" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "wf-head-select",
							"aria-label": `${t("selectAll")}：${group.name}`,
							title: scope.key === scopeKey && scope.truncated ? t("scopeTruncated") : saved.keyword || saved.filter || saved.savedFilter !== "all" ? t("scopedSelection") : t("allPagesSelection"),
							checked: allSelected,
							ref: (node) => {
								if (node) node.indeterminate = !allSelected && scopeSelected > 0;
							},
							disabled: disabled || !editable || !pendingSelectable || !scopeReady,
							onChange: (event) => view.applySelections(scopeEntries, event.target.checked)
						}) : key === "messageTime" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "wf-time-sort",
							"aria-label": t(saved.order === "desc" ? "timeDesc" : "timeAsc"),
							onClick: () => view.setGroupOrder(group.id, saved.order === "desc" ? "asc" : "desc"),
							children: [t(key), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "wf-sort-arrows",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: saved.order === "asc" ? "wf-arrow-active" : "",
									children: "▲"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: saved.order === "desc" ? "wf-arrow-active" : "",
									children: "▼"
								})]
							})]
						}) : t(key) }, key)) }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: saved.rows.map((record) => {
							const review = reviewedRow(data, record), folderError = review.documentFolder && directoryNameError(review.documentFolder);
							const savedBefore = job.operation === "preview" || record.status === "not-selected" ? record.savedBefore : null;
							const archived = Boolean(savedBefore) || record.status === "saved" || record.status === "existing";
							const savedLocation = (record.savedBefore && record.savedBefore.path) || (job.operation === "save" ? record.path : "");
							const groupedName = memberGroup.get(record.id);
							const rowKey = savedBefore ? "row_saved-before" : job.operation === "preview" && record.selectable ? review.selected ? "row_ready" : groupedName ? "row_grouped-unselected" : "row_not-selected" : record.status === "skipped" && record.skipReason === "format" ? "row_skipped-format" : `row_${record.status}`;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
								className: review.selected ? "wf-selected-row" : "",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "checkbox",
										"aria-label": `${t("selectFile")}：${record.name}`,
										checked: review.selected,
										disabled: disabled || !editable || !record.selectable || (job.operation !== "preview" && archived),
										onChange: (event) => view.setRecordReview(record, { selected: event.target.checked })
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: record.name }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										className: "wf-message-time",
										children: messageDate(record.time, record.day || t("unknown"))
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: record.match ? record.match.matched ? record.match.candidates.join("；") : t("noMatch") : "—" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", {
										className: archived && savedLocation ? "wf-folder-saved" : void 0,
										title: archived && savedLocation ? `${t("locateSavedFolderHint")}：${savedLocation}` : void 0,
										onClick: archived && savedLocation ? () => openSavedLocation(record) : void 0,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
											"aria-label": `${t("documentFolder")}：${record.name}`,
											value: review.documentFolder,
											disabled: disabled || !editable || !record.selectable || archived && Boolean(savedLocation),
											readOnly: archived && Boolean(savedLocation),
											"aria-invalid": Boolean(folderError),
											onChange: (event) => view.setRecordReview(record, { documentFolder: event.target.value })
										}), folderError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "wf-error",
											children: t("error_invalid-folder-name")
										})] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
										className: "wf-row-group-select",
										"aria-label": `${t("saveToGroup")}：${record.name}`,
										title: t("saveToGroupHint"),
										value: "",
										disabled: disabled || !editable || !record.selectable || archived || !groupOptions.length || Boolean(rowSaving[record.id]),
										onChange: (event) => {
											const name = event.target.value;
											event.target.value = "";
											if (name) void saveRowToGroup(record, name);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "",
											children: archived ? t("row_saved-before") : groupOptions.length ? t("chooseGroup") : t("noFileGroups")
										}), groupOptions.map((name) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: name,
											children: name
										}, `saved:${name}`))]
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", { title: savedBefore ? `${t("savedBeforeHint")}：${savedBefore.path}` : rowKey === "row_grouped-unselected" ? `${t("row_grouped-unselected")}：${groupedName}` : void 0, children: [t(rowKey in zh ? rowKey : "row_ready"), record.selectable === false && record.skipReason === "format" && record.status !== "skipped" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "wf-muted",
										children: t("row_skipped-format")
									}), archived && isArchiveFile(record.name) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "wf-zip-actions",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											title: extractingId === record.id ? t("extractBusy") : t("extractHint"),
											disabled: disabled || (zipBusy && extractingId !== record.id),
											onClick: () => extractingId === record.id ? stopExtract() : extractNow({ id: record.id, name: record.name }),
											children: extractingId === record.id ? t("extractStop") : t("extractAction")
										}), Boolean(record.extractedCount) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "wf-muted",
											children: [t("extractedCountLabel"), " ", record.extractedCount, " ", t("fileUnit")]
										})]
									})] })								]
							}, record.id);
						}) })] })
					})),
					!directoryView && pages > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "wf-row wf-pagination",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								disabled: saved.page <= 1 || saved.loading,
								onClick: () => view.setGroupPage(group.id, (page) => page - 1),
								children: t("before")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								saved.page,
								" / ",
								pages,
								" ",
								t("page")
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								disabled: saved.page >= pages || saved.loading,
								onClick: () => view.setGroupPage(group.id, (page) => page + 1),
								children: t("next")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: "wf-page-jump",
								children: [
									t("jumpTo"),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
										value: jump,
										inputMode: "numeric",
										"aria-label": `${t("go")}：${group.name}`,
										onChange: (event) => setJump(event.target.value.replace(/\D/g, "").slice(0, 4)),
										onKeyDown: (event) => {
											if (event.key === "Enter" && !event.nativeEvent.isComposing) {
												const target = parseInt(jump, 10);
												if (Number.isInteger(target)) view.setGroupPage(group.id, target);
												setJump("");
											}
										}
									}),
									t("page")
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: saved.loading || !jump,
								onClick: () => {
									const target = parseInt(jump, 10);
									if (Number.isInteger(target)) view.setGroupPage(group.id, target);
									setJump("");
								},
								children: t("go")
							})
						]
					}),
					directoryView && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "wf-directory-view",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
								className: "wf-directory-sidebar",
								"aria-label": t("savedDirectoriesTitle"),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-directory-sider-head",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											children: t("directoryGroupName")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											children: `${t("directoryFileCount")}（${directoryView.recordCount || 0}）`
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-directory-listbox",
										children: [
									directoryView.truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("savedDirectoriesTruncated")
									}),
									directoryView.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-error",
										role: "alert",
										children: t(`error_${directoryView.error}` in zh ? `error_${directoryView.error}` : "error_unknown")
									}),
									directoryView.loading && !directoryView.directories.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("loading")
									}),
									!directoryView.loading && !directoryView.error && !directoryView.directories.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-empty",
										children: t("savedDirectoriesEmpty")
									}),
									!!directoryView.directories.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										className: "wf-directory-list",
										children: directoryView.directories.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: directoryView.selected === entry.directory ? "wf-directory-item wf-directory-item-active" : "wf-directory-item",
												title: entry.directory,
												"aria-pressed": directoryView.selected === entry.directory,
												onClick: () => selectSavedDirectory(entry.directory),
												onDoubleClick: (event) => {
													event.preventDefault();
													const nameNode = event.currentTarget.querySelector(".wf-directory-item-name");
													const selection = window.getSelection();
													if (!nameNode || !selection) return;
													const range = document.createRange();
													range.selectNodeContents(nameNode);
													selection.removeAllRanges();
													selection.addRange(range);
												},
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "wf-directory-item-name",
													children: directoryLabel(entry.directory)
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "wf-directory-item-count",
													children: entry.count
												})]
											})
										}, entry.directory))
									})
									]
								}),
									renderDirectoryPager(directoryView.directoryPage, directoryView.directoryCount, directoryJump, setDirectoryJump, changeDirectoryPage, true)
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: "wf-directory-detail",
								children: [directoryView.selected ? [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-directory-head",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "outline",
											title: t("copyPathHint"),
											onClick: () => void copySavedDirectory(directoryView.selected),
											children: t(directoryCopy.directory === directoryView.selected ? directoryCopy.status === "copied" ? "copyPathDone" : "copyPathFailed" : "copyPathButton")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "wf-directory-path",
											title: directoryView.selected,
											children: directoryView.selected
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-directory-filebox",
										children: [
									!directoryView.files.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-empty",
										children: directoryView.loading ? t("loading") : t("savedDirectoriesFileEmpty")
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										className: "wf-directory-files",
										children: directoryView.files.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
											title: file.path,
											children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "wf-directory-file-name",
											children: [file.name, file.source && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "wf-muted wf-file-source",
												title: file.source,
												children: [" ", t("extractedFromLabel"), " ", file.source]
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "wf-muted",
											children: messageDate(file.time, t("unknown"))
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "wf-directory-file-actions",
											children: [
												isArchiveFile(file.name) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													title: extractingId === file.id ? t("extractBusy") : t("extractHint"),
													disabled: directoryView.loading || fileActionBusy || (zipBusy && extractingId !== file.id),
													onClick: () => extractingId === file.id ? stopExtract() : extractNow(file),
													children: extractingId === file.id ? t("extractStop") : t("extractAction")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													title: t("renameSavedFileHint"),
													disabled: directoryView.loading || fileActionBusy,
													onClick: () => openFileRename(file),
													children: t("renameAction")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													title: t("deleteSavedFileHint"),
													disabled: directoryView.loading || fileActionBusy,
													onClick: () => openFileDelete(file),
													children: t("deleteAction")
												})
											]
										})
									]
										}, file.id))
									})
									]
								}),
									renderDirectoryPager(directoryView.filePage, directoryView.fileCount, fileJump, setFileJump, changeDirectoryFilePage)
								] : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "wf-directory-filebox",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-empty",
										children: directoryView.loading ? t("loading") : t("savedDirectoriesPick")
									})]
								})]
							})
						]
					}),
					]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: Boolean(groupDialog),
						onClose: () => setGroupDialog(null),
						title: t("createGroup"),
						closeLabel: t("dismiss"),
						className: "wf-modal",
						description: groupDialog ? t("selectedFiles") + "：" + groupDialog.records.length + " " + t("fileUnit") : void 0,
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => setGroupDialog(null),
							children: t("dismiss")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: !groupDialog || !groupDialog.name,
							onClick: confirmGroupDialog,
							children: t("createGroupConfirm")
						})] }),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("groupName"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"data-modal-autofocus": true,
								value: groupDialog ? groupDialog.name : "",
								disabled: !groupDialog,
								"aria-invalid": Boolean(groupDialog && groupDialog.error),
								onChange: (event) => setGroupDialog((current) => current ? {
									...current,
									name: event.target.value,
									error: ""
								} : current),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.nativeEvent.isComposing) confirmGroupDialog();
								}
							})] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("groupNameHint")
							}),
							groupDialog && groupDialog.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-error",
								children: groupDialog.error
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: Boolean(defaultDialog),
						onClose: () => setDefaultDialog(null),
						title: t("setDefaultFolder"),
						closeLabel: t("dismiss"),
						className: "wf-modal",
						description: t("defaultFolderHint"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => setDefaultDialog(null),
							children: t("dismiss")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: !defaultDialog || !defaultDialog.name,
							onClick: confirmDefaultDialog,
							children: t("reviewSave")
						})] }),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("defaultFolderName"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"data-modal-autofocus": true,
								value: defaultDialog ? defaultDialog.name : "",
								disabled: !defaultDialog,
								"aria-invalid": Boolean(defaultDialog && defaultDialog.error),
								onChange: (event) => setDefaultDialog((current) => current ? {
									...current,
									name: event.target.value,
									error: ""
								} : current),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.nativeEvent.isComposing) confirmDefaultDialog();
								}
							})] }),
							defaultDialog && defaultDialog.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-error",
								children: defaultDialog.error
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: Boolean(fileAction),
						onClose: () => {
							if (!fileActionBusy) setFileAction(null);
						},
						title: fileAction?.kind === "delete" ? t("deleteSavedFile") : t("renameSavedFile"),
						closeLabel: t("dismiss"),
						className: "wf-modal",
						description: fileAction ? fileAction.path : void 0,
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: fileActionBusy,
							onClick: () => setFileAction(null),
							children: t("dismiss")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: fileActionBusy || !fileAction || fileAction.kind === "rename" && !fileAction.name,
							onClick: confirmFileAction,
							children: fileAction?.kind === "delete" ? t("deleteAction") : t("renameAction")
						})] }),
						children: [
							fileAction?.kind === "rename" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("fileRenameName"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"data-modal-autofocus": true,
								value: fileAction ? fileAction.name : "",
								disabled: !fileAction || fileActionBusy,
								"aria-invalid": Boolean(fileAction && fileAction.error),
								onChange: (event) => setFileAction((current) => current ? {
									...current,
									name: event.target.value,
									error: ""
								} : current),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.nativeEvent.isComposing) confirmFileAction();
								}
							})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("deleteSavedFileHint")
							}),
							fileAction && fileAction.kind === "rename" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("renameSavedFileHint")
							}),
							fileAction && fileAction.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-error",
								children: fileAction.error
							})
						]
					}),
					]
			});
		}
		function Page({ request, pickDirectory, t, view }) {
			const data = (0, react.useSyncExternalStore)(view.subscribe, view.getSnapshot, view.getSnapshot);
			const field = (key) => [data[key], (value) => view.set(key, value)];
			const snapshot = data.snapshot, setSnapshot = (value) => view.acceptSnapshot(value);
			const [draft, setDraft] = field("draft"), [accountList, setAccountList] = field("accountList"), [name, setName] = field("name"), [found, setFound] = field("found");
			const [start, setStart] = field("start"), [end, setEnd] = field("end"), [notice, setNotice] = field("notice");
			const { working, error, configurationOpen } = data;
			const [confirmationGroup, setConfirmationGroup] = (0, react.useState)("");
			const [confirmationPlan, setConfirmationPlan] = (0, react.useState)(null);
			const [confirmationLoading, setConfirmationLoading] = (0, react.useState)(false);
			const [confirmationError, setConfirmationError] = (0, react.useState)("");
			const [confirmationScope, setConfirmationScope] = (0, react.useState)({});
			const [confirmationAutoAcks, setConfirmationAutoAcks] = (0, react.useState)({});
			const confirmationEpoch = (0, react.useRef)(0);
			const [saveToast, setSaveToast] = (0, react.useState)("");
			const previousJobRef = (0, react.useRef)(null);
			const openConfirmation = (groupId) => {
				confirmationEpoch.current++;
				setConfirmationGroup(groupId || "");
				setConfirmationPlan(null);
				setConfirmationLoading(false);
				setConfirmationError("");
				setConfirmationScope({});
				setConfirmationAutoAcks({});
				view.set("confirmationOpen", true);
			};
			const closeConfirmation = () => {
				confirmationEpoch.current++;
				setConfirmationGroup("");
				setConfirmationLoading(false);
				view.set("confirmationOpen", false);
			};
			const main = (0, react.useRef)(null), confirmation = (0, react.useRef)(null);
			const job = snapshot?.job, running = busyJob(job), disabled = !data.initialized || working || running;
			const dirty = JSON.stringify(draft) !== JSON.stringify(snapshot?.settings);
			function failure(reason) {
				const key = `error_${reason.code}`;
				view.set("error", `${t(key in zh ? key : "error_unknown")}${reason.code ? ` (${reason.code})` : ""}`);
			}
			const act = (operation) => view.run(operation, failure);
			(0, react.useEffect)(() => {
				view.refresh(request).catch(failure);
			}, [view, request]);
			(0, react.useLayoutEffect)(() => {
				view.attachScroll(main.current);
				if (main.current) main.current.scrollTop = view.getScroll();
				return () => view.attachScroll(null);
			}, [view]);
			(0, react.useEffect)(() => {
				if (!running) return;
				let stopped = false, timer;
				const poll = async () => {
					try {
						await view.refresh(request);
						if (!stopped && busyJob(view.getSnapshot().snapshot?.job)) timer = setTimeout(poll, 700);
					} catch (reason) {
						if (!stopped) failure(reason);
					}
				};
				timer = setTimeout(poll, 700);
				return () => {
					stopped = true;
					clearTimeout(timer);
				};
			}, [running, request]);
			(0, react.useEffect)(() => {
				const previous = previousJobRef.current;
				previousJobRef.current = job ? { id: job.id, status: job.status, extracting: job.extracting === true } : null;
				if (!job || job.operation !== "save") return;
				if (job.id !== previous?.id || !busyJob(previous)) return;
				if (busyJob(job)) return;
				if (job.status !== "completed" && job.status !== "incomplete") return;
				const doneGroups = (job.groupSummaries || []).filter((group) => group.selectedCount > 0);
				setSaveToast({
					title: doneGroups.length === 1 ? `${doneGroups[0].name} · ${t("saveDoneTitle")}` : t("saveDoneTitle"),
					saved: job.counts?.saved ?? 0,
					existing: job.counts?.existing ?? 0,
					failed: unsavedCount(job.counts),
					...(job.extractSummary ? { extract: job.extractSummary, extractLabel: t("autoExtractToast") } : {})
				});
			}, [job?.id, job?.status, job?.operation, job?.extracting]);
			(0, react.useEffect)(() => {
				if (!saveToast) return;
				const timer = setTimeout(() => setSaveToast(""), 8000);
				return () => clearTimeout(timer);
			}, [saveToast]);
			(0, react.useEffect)(() => {
				const dialog = confirmation.current;
				if (!dialog) return;
				if (data.confirmationOpen && !dialog.open) dialog.showModal();
				else if (!data.confirmationOpen && dialog.open) dialog.close();
			}, [data.confirmationOpen]);
			/** Ask the server how many selected files each group would save and which still need a generated folder. */
			(0, react.useEffect)(() => {
				if (!data.confirmationOpen || !job?.reviewReady) return;
				const epoch = ++confirmationEpoch.current;
				const payload = reviewPayload(view.getSnapshot());
				setConfirmationPlan(null);
				setConfirmationError("");
				setConfirmationLoading(true);
				request({
					action: "plan",
					jobId: job.id,
					groupFolders: payload.groupFolders,
					changes: payload.changes
				}).then((value) => {
					if (epoch !== confirmationEpoch.current) return;
					const scope = {};
					for (const group of value.groups) {
						scope[group.id] = !group.error && group.selectedCount > 0 && (confirmationGroup ? group.id === confirmationGroup : group.autoFolderCount === 0);
					}
					setConfirmationScope(scope);
					setConfirmationAutoAcks({});
					setConfirmationPlan(value);
				}).catch((reason) => {
					if (epoch === confirmationEpoch.current) setConfirmationError(reason.code || "invalid-request");
				}).finally(() => {
					if (epoch === confirmationEpoch.current) setConfirmationLoading(false);
				});
			}, [data.confirmationOpen, confirmationGroup, job?.id, job?.reviewReady]);
			const change = (key, value) => setDraft((previous) => ({
				...previous,
				[key]: value
			}));
			const directoryError = directoryPathError(draft.saveDirectory);
			const savedIndexDays = Number(draft.savedIndexDays);
			const savedIndexDaysError = !Number.isInteger(savedIndexDays) || savedIndexDays < 1 || savedIndexDays > 365;
			const folderErrors = draft.groups.map((group) => directoryNameError(group.folderName ?? suggestDirectoryName(group.name)));
			const invalidDirectories = Boolean(directoryError || folderErrors.some(Boolean));
			const reviewed = reviewCounts(data);
			const rangeChanged = Boolean(job && (job.start !== start || job.end !== end));
			const reviewStale = dirty || rangeChanged || Boolean(job?.previewStale);
			const reviewFolderInvalid = Object.entries(data.reviewChanges).some(([, value]) => Object.hasOwn(value, "documentFolder") && directoryNameError(value.documentFolder) && (value.selected ?? value.baseSelected)) || Object.entries(data.groupFolders).some(([groupId, folder]) => directoryNameError(folder) && reviewed.groups.some((group) => group.id === groupId && group.selectedCount > 0));
			const canConfirm = Boolean(job?.reviewReady && !disabled && !reviewStale && !invalidDirectories && reviewed.selectedCount > 0);
			const scopedGroup = confirmationGroup ? reviewed.groups.find((group) => group.id === confirmationGroup) || null : null;
			const plannedGroups = confirmationPlan ? confirmationPlan.groups.filter((group) => group.selectedCount > 0 || group.error) : [];
			const checkedGroups = plannedGroups.filter((group) => confirmationScope[group.id] === true);
			const confirmationSelected = checkedGroups.reduce((sum, group) => sum + group.selectedCount, 0);
			const confirmationAutoFolders = checkedGroups.reduce((sum, group) => sum + group.autoFolderCount, 0);
			const confirmationAutoGroups = checkedGroups.filter((group) => group.autoFolderCount > 0);
			const confirmationAutoPending = confirmationAutoGroups.filter((group) => confirmationAutoAcks[group.id] !== true);
			const confirmationReady = Boolean(canConfirm && confirmationPlan && !confirmationLoading && !confirmationError && confirmationSelected > 0 && confirmationAutoPending.length === 0);
			const folderTarget = (group) => {
				if (data.groupFolders[group.id]) return data.groupFolders[group.id];
				if (group.autoFolderCount === 0) return t("fileFolderTarget");
				if (group.autoFolderCount >= group.selectedCount) return t("autoFolderTarget");
				return t("mixedFolderTarget");
			};
			const saveMode = job?.mode || (job?.filterVersion ? "bill" : "all");
			/** Reader warnings carry the number of attachments dropped for an unmatched message, which matters more than how many warnings fired. */
			const warningList = Array.isArray(job?.warnings) ? job.warnings : [];
			const droppedFiles = warningList.reduce((sum, item) => sum + (Number.isSafeInteger(item?.count) && item.count > 0 ? item.count : 0), 0);
			const unfoundGroups = [...new Set(warningList.filter((item) => item?.code === "group-not-found" && typeof item.group === "string" && item.group).map((item) => item.group))];
			const warningsText = droppedFiles || unfoundGroups.length ? [
				droppedFiles ? `${t("warningsDropped")} ${droppedFiles} ${t("warningsDroppedSuffix")}` : "",
				unfoundGroups.length ? `${t("warningsGroupNotFound")}：${unfoundGroups.join("、")}` : ""
			].filter(Boolean).join("；") : `${t("warnings")} (${warningList.length})`;
			const selectedAccount = accountList.find((item) => item.id === draft.account);
			const accountLabel = selectedAccount ? accountTitle(selectedAccount, t("unnamedAccount")) : "";
			const groupState = (group) => t(group.recordState === "historical" ? "historicalRecord" : group.recordState === "recent" ? "recentRecord" : "unknownRecord");
			const sourceLabel = (group) => {
				const latest = found?.find((item) => item.id === group.id);
				return latest ? `${groupState(latest)} · ${t("lastMessage")} ${messageDate(latest.lastTime, t("unknown"))}` : group.sourceLabel;
			};
			const searchGroups = () => act(async () => setFound(await request({
				action: "groups",
				source: {
					root: draft.root,
					account: draft.account
				},
				name
			})));
			function addGroup(group) {
				const base = suggestDirectoryName(group.name), withSuffix = (suffix) => `${base.slice(0, 180 - suffix.length)}${suffix}`;
				let folderName = base, index = 2;
				if (draft.groups.some((item) => (item.folderName || item.name) === folderName)) folderName = withSuffix(`（${t(group.recordState === "historical" ? "historyFolder" : "alternateFolder")}）`);
				while (draft.groups.some((item) => (item.folderName || item.name) === folderName)) folderName = withSuffix(`（${t("alternateFolder")}${index++}）`);
				change("groups", [...draft.groups, {
					id: group.id,
					name: group.name,
					folderName,
					sourceLabel: `${groupState(group)} · ${t("lastMessage")} ${messageDate(group.lastTime, t("unknown"))}`
				}]);
			}
			function preset(day) {
				setStart(`${day}T00:00`);
				setEnd(`${day}T23:59`);
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
				className: "wecom-fws",
				ref: main,
				onScroll: (event) => view.rememberScroll(event.currentTarget.scrollTop),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: t("title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "wf-muted",
						children: t("intro")
					})] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "wf-notice",
						role: "status",
						children: t(snapshot?.sourceCapability === "wecom-readonly" ? "capability" : "capabilityFallback")
					}),

					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AtomOrderPanel, {
						request,
						pickDirectory,
						t
					}),					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
						className: "wf-box",
						open: configurationOpen ?? false,
						onToggle: (event) => {
							if (data.initialized) view.set("configurationOpen", event.currentTarget.open);
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("configuration") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-grid",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("sourceRoot"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
										value: draft.root,
										disabled,
										onChange: (event) => {
											change("root", event.target.value);
											change("account", "");
											change("accountLabel", "");
											change("groups", []);
											setAccountList([]);
											setFound(null);
										}
									})] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("rootHint")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "wf-row",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "outline",
											disabled,
											onClick: () => act(async () => {
												const value = await request({
													action: "accounts",
													root: draft.root
												});
												change("root", value.root);
												const previous = accountList.find((item) => item.id === draft.account);
												setAccountList(value.accounts);
												const selected = value.accounts.find((item) => item.id === draft.account) || value.accounts[0];
												if (selected?.id !== draft.account) {
													change("account", selected?.id || "");
													change("accountLabel", selected ? accountTitle(selected, t("unnamedAccount")) : "");
													change("groups", []);
													setFound(null);
												} else if (selected) {
													const label = refreshAccountLabel(draft.accountLabel, {
														previous,
														account: draft.account,
														selected,
														unnamedAccount: t("unnamedAccount")
													});
													if (label !== draft.accountLabel) change("accountLabel", label);
												}
											}),
											children: t("accounts")
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "wf-row",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("account"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: draft.account,
											disabled,
											onChange: (event) => {
												const selected = accountList.find((item) => item.id === event.target.value);
												change("account", event.target.value);
												change("accountLabel", selected ? accountTitle(selected, t("unnamedAccount")) : "");
												change("groups", []);
												setFound(null);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: t("chooseAccount")
											}), accountList.map((account) => {
												const label = accountTitle(account, t("unnamedAccount"));
												const duplicate = accountList.filter((item) => accountTitle(item, t("unnamedAccount")) === label).length > 1;
												return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
													value: account.id,
													children: [label, duplicate ? ` · ${t("directorySuffix")} ${account.id.slice(-6)}` : ""]
												}, account.id);
											})]
										})] })
									}),
									draft.account && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: "wf-muted",
											children: t("accountHint")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: "wf-account-label",
											children: [t("accountLabel"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
												value: draft.accountLabel ?? accountLabel,
												disabled,
												onChange: (event) => change("accountLabel", event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
											className: "wf-id-detail",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("accountDetails") }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
													className: "wf-muted",
													children: [
														t("accountId"),
														"：",
														draft.account
													]
												}),
												selectedAccount?.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
													className: "wf-muted",
													children: t("accountUnavailable")
												})
											]
										})
									] })
								] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("directory"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
										value: draft.saveDirectory,
										"aria-invalid": Boolean(draft.saveDirectory && directoryError),
										"aria-describedby": directoryError ? "wf-directory-error" : void 0,
										disabled,
										onChange: (event) => change("saveDirectory", event.target.value)
									})] }),
									draft.saveDirectory && directoryError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-error",
										id: "wf-directory-error",
										role: "alert",
										children: t("error_invalid-save-directory")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "wf-row",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "outline",
											disabled,
											onClick: () => act(async () => {
												const value = await pickDirectory();
												if (value) change("saveDirectory", value);
											}),
											children: t("browse")
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("layout")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										children: [t("savedIndexDays"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
											type: "number",
											min: 1,
											max: 365,
											step: 1,
											value: draft.savedIndexDays ?? 7,
											"aria-invalid": savedIndexDaysError,
											disabled,
											onChange: (event) => change("savedIndexDays", event.target.value === "" ? "" : Number(event.target.value))
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("savedIndexDaysHint").replace("{days}", String(draft.savedIndexDays ?? 7))
									}),
									savedIndexDaysError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-error",
										role: "alert",
										children: t("savedIndexDaysInvalid")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-setting-filter",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											children: t("savedFilterDefault")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "wf-segmented",
											role: "group",
											"aria-label": t("savedFilterDefault"),
											children: [["unsaved", "savedFilterUnsaved"], ["saved", "savedFilterSaved"], ["all", "savedFilterAll"]].map(([value, label]) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: (draft.defaultSavedFilter || "all") === value ? "wf-segment wf-segment-active" : "wf-segment",
												"aria-pressed": (draft.defaultSavedFilter || "all") === value,
												disabled,
												onClick: () => change("defaultSavedFilter", value),
												children: t(label)
											}, value))
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "wf-muted",
										children: t("savedFilterDefaultHint")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-setting-archive",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											children: t("archiveHandling")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: "wf-check-line",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: draft.autoExtract === true,
												disabled,
												onChange: (event) => change("autoExtract", event.target.checked)
											}), t("autoExtractLabel")]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: "wf-check-line",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: draft.extractNested === true,
												disabled,
												onChange: (event) => change("extractNested", event.target.checked)
											}), t("extractNestedLabel")]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: "wf-muted",
											children: t("archiveHandlingHint")
										})]
									})
								] })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-search",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("groupName"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
									value: name,
									disabled,
									onChange: (event) => {
										setName(event.target.value);
										setFound(null);
									},
									onKeyDown: (event) => {
										if (event.key === "Enter" && !event.nativeEvent.isComposing && !disabled && draft.account && name.trim()) {
											event.preventDefault();
											searchGroups();
										}
									}
								})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: disabled || !draft.account || !name.trim(),
									onClick: searchGroups,
									children: t("search")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("searchHint")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("multiGroupHint")
							}),
							found?.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("noGroups") }),
							found?.length >= 200 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("searchLimit")
							}),
							found?.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-search-result",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "wf-result-heading",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: group.name }),
											" ",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "wf-tag",
												children: groupState(group)
											})
										] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											variant: "outline",
											disabled: disabled || draft.groups.some((item) => item.id === group.id),
											onClick: () => addGroup(group),
											children: t(draft.groups.some((item) => item.id === group.id) ? "bound" : "bind")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
										className: "wf-muted",
										children: [
											t("lastMessage"),
											"：",
											messageDate(group.lastTime, t("unknown")),
											" · ",
											t("fileRecords"),
											"：",
											group.fileCount ?? t("unknown"),
											" · ",
											t("memberRecords"),
											"：",
											group.memberCount || t("noMemberInfo")
										]
									}),
									!!group.fileExamples?.length && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
										className: "wf-muted",
										children: [
											t("fileExamples"),
											"：",
											group.fileExamples.join("；")
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
										className: "wf-id-detail",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("sourceDetails") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: group.id })]
									})
								]
							}, group.id)),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								className: "wf-muted",
								children: [
									t("selected"),
									" (",
									draft.groups.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: "wf-bound",
								children: draft.groups.map((group, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "wf-bound-info",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: group.name }),
										sourceLabel(group) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: "wf-muted",
											children: sourceLabel(group)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [t("groupFolder"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
											value: group.folderName ?? suggestDirectoryName(group.name),
											"aria-invalid": Boolean(folderErrors[index]),
											"aria-describedby": folderErrors[index] ? `wf-folder-error-${index}` : void 0,
											disabled,
											onChange: (event) => change("groups", draft.groups.map((item) => item.id === group.id ? {
												...item,
												folderName: event.target.value
											} : item))
										})] }),
										folderErrors[index] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: "wf-error",
											id: `wf-folder-error-${index}`,
											role: "alert",
											children: t("error_invalid-folder-name")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
											className: "wf-id-detail",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("sourceDetails") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: group.id })]
										})
									]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									disabled,
									onClick: () => change("groups", draft.groups.filter((item) => item.id !== group.id)),
									children: t("remove")
								})] }, group.id))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("folderHint")
							}),
							!draft.groups.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("noSelection")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-row",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: disabled || !draft.account || !draft.saveDirectory || savedIndexDaysError,
									onClick: () => act(async () => {
										const code = directoryError || folderErrors.find(Boolean);
										if (code) throw Object.assign(new Error(code), { code });
										const value = await request({
											action: "save",
											settings: draft
										});
										setSnapshot(value);
										setDraft(value.settings);
										setName("");
										setFound(null);
										view.set("configurationOpen", false);
										setNotice(t("saved"));
									}),
									children: t("save")
								}), dirty && snapshot?.settings && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "wf-muted",
									children: t("unsaved")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("saveHint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "wf-dates",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "wf-date-field",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
										htmlFor: "wf-start",
										children: t("start")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MinuteDateTime, {
										id: "wf-start",
										label: t("start"),
										value: start,
										max: `${currentDay()}T23:59`,
										disabled,
										onChange: setStart
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "wf-date-field",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
										htmlFor: "wf-end",
										children: t("end")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MinuteDateTime, {
										id: "wf-end",
										label: t("end"),
										value: end,
										max: `${currentDay()}T23:59`,
										disabled,
										onChange: setEnd
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									disabled,
									onClick: () => preset(currentDay()),
									children: t("today")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									disabled,
									onClick: () => {
										const date = /* @__PURE__ */ new Date(`${currentDay()}T12:00:00+08:00`);
										date.setUTCDate(date.getUTCDate() - 1);
										preset(new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai" }).format(date));
									},
									children: t("yesterday")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: disabled || !snapshot?.settings?.groups.length || dirty || invalidDirectories,
									onClick: () => act(async () => setSnapshot(await request({
										action: "start",
										mode: "all",
										start,
										end
									}))),
									children: t("updateAll")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: disabled || !snapshot?.settings?.groups.length || dirty || invalidDirectories,
									onClick: () => act(async () => setSnapshot(await request({
										action: "start",
										mode: "bill",
										start,
										end
									}))),
									children: t("update")
								}),
								running && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: working || job.status === "cancelling",
									onClick: () => act(async () => setSnapshot(await request({ action: "cancel" }))),
									children: t("cancel")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "wf-muted",
							children: t("manual")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "wf-muted",
							children: t("filterHint")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "wf-error",
							children: error
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							role: "status",
							"aria-live": "polite",
							children: working ? t("loading") : notice
						})
					] }),
					!job ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "wf-empty",
						children: t("empty")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "wf-result-note",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "wf-status",
									role: "status",
									children: [
										t(`status_${job.status}` in zh ? `status_${job.status}` : "status_completed"),
										" · ",
										t(job.operation === "preview" ? "operationPreview" : "operationSave"),
										" · ",
										t(saveMode === "all" ? "modeAll" : "modeBill"),
										job.operation === "save" && (job.status === "completed" || job.status === "incomplete") && [
											" · ",
											t("saveNewLabel"),
											" ",
											job.counts?.saved ?? 0,
											" ",
											t("fileUnit"),
											" · ",
											t("saveExistingLabel"),
											" ",
											job.counts?.existing ?? 0,
											" ",
											t("fileUnit"),
											unsavedCount(job.counts) > 0 && [" · ", t("saveUnsavedLabel"), " ", unsavedCount(job.counts), " ", t("fileUnit")]
										]
									]
								}),
								running && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "wf-progress",
									role: "status",
									children: [
										t(job.operation === "preview" ? "phase_reading" : "phase_copying"),
										" · ",
										job.done,
										" / ",
										job.total ?? "—"
									]
								}),
								job.error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "wf-error",
									role: "alert",
									children: [
										t(`error_${job.error}` in zh ? `error_${job.error}` : "error_unknown"),
										" (",
										job.error,
										")"
									]
								}),
								!job.reviewReady && !running && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-muted",
									children: t(job.reviewVersion === 1 ? "incompleteReviewResult" : "legacyReviewResult")
								}),
								job.reviewReady && reviewStale && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-error",
									role: "alert",
									children: t("reviewStale")
								}),
								job.reviewReady && reviewFolderInvalid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-error",
									role: "alert",
									children: t("error_invalid-folder-name")
								}),
								!!job.warnings?.length && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "wf-error",
									children: warningsText
								})
							]
						}),
						reviewed.groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GroupFiles, {
							group,
							data,
							view,
							request,
							t,
							disabled,
							editable: Boolean(job.reviewReady && !reviewStale),
							reportError: failure,
							onSaveGroup: openConfirmation,
							notify: setSaveToast
						}, group.id)),
						!reviewed.groups.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "wf-empty",
							children: running ? t("loading") : t("noFiles")
						}),
						job.reviewReady && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "wf-confirm-bar",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "wf-fab",
								title: t("reviewSave"),
								"aria-label": t("reviewSave"),
								disabled: !canConfirm,
								onClick: () => openConfirmation(""),
								children: t("reviewSave")
							})
						}),
						saveToast && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "wf-toast",
							role: "status",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: saveToast.title }),
								saveToast.saved !== undefined && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									t("saveNewLabel"), " ", saveToast.saved, " ", t("fileUnit"),
									" · ",
									t("saveExistingLabel"), " ", saveToast.existing, " ", t("fileUnit"),
									saveToast.failed > 0 && [" · ", t("saveUnsavedLabel"), " ", saveToast.failed, " ", t("fileUnit")]
								] }),
								saveToast.extract && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "wf-toast-extract",
									children: [
										saveToast.extractLabel ? [saveToast.extractLabel, "："] : null,
										t("saveNewLabel"), " ", saveToast.extract.saved, " ", t("fileUnit"),
										" · ", t("saveExistingLabel"), " ", saveToast.extract.existing, " ", t("fileUnit"),
										saveToast.extract.failed > 0 && [" · ", t("extractFailedLabel"), " ", saveToast.extract.failed, " ", t("fileUnit")],
										saveToast.extract.skipped > 0 && [" · ", t("extractSkippedLabel"), " ", saveToast.extract.skipped, " ", t("fileUnit")],
										saveToast.extract.pathTooLong > 0 && [" · ", t("extractPathTooLongLabel"), " ", saveToast.extract.pathTooLong, " ", t("fileUnit")]
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "wf-toast-close",
									"aria-label": t("closeNotice"),
									onClick: () => setSaveToast(""),
									children: "×"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dialog", {
						className: "wf-confirm-dialog",
						ref: confirmation,
						"aria-labelledby": "wf-confirm-title",
						"aria-describedby": "wf-confirm-description",
						onCancel: (event) => {
							event.preventDefault();
							closeConfirmation();
						},
						onClose: () => closeConfirmation(),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								id: "wf-confirm-title",
								children: scopedGroup ? t("confirmGroupTitle") : t("confirmTitle")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								id: "wf-confirm-description",
								children: scopedGroup ? `${t("confirmGroupDescription")}（${scopedGroup.name}）` : t("confirmDescription")
							}),
							confirmationLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-muted",
								children: t("loading")
							}),
							confirmationError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "wf-error",
								role: "alert",
								children: t(`error_${confirmationError}` in zh ? `error_${confirmationError}` : "error_unknown")
							}),
							confirmationPlan && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
									t("selectedFiles"),
									"：",
									confirmationSelected
								] }) }),
								job && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
									t("range"),
									"：",
									job.start.replace("T", " "),
									" — ",
									job.end.replace("T", " "),
									"（",
									t("beijingTime"),
									"）"
								] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "wf-confirm-root",
									children: [
										t("directory"),
										"：",
										job?.saveDirectory || snapshot?.settings?.saveDirectory
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
									className: "wf-confirm-groups",
									children: plannedGroups.map((group) => {
										const errorKey = `error_${group.error}`;
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
												className: confirmationScope[group.id] ? "wf-confirm-group wf-confirm-group-checked" : "wf-confirm-group",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
														className: "wf-confirm-group-line",
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: confirmationScope[group.id] === true,
															disabled: Boolean(group.error) || group.selectedCount === 0,
															onChange: (event) => {
																const checked = event.target.checked;
																setConfirmationScope((current) => ({
																	...current,
																	[group.id]: checked
																}));
																if (!checked) setConfirmationAutoAcks((current) => {
																	if (!current[group.id]) return current;
																	const next = { ...current };
																	delete next[group.id];
																	return next;
																});
															}
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: group.name }),
															" · ",
															group.selectedCount,
															" ",
															t("fileUnit")
														] })]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: "wf-muted",
														children: [t("documentFolder"), "：", folderTarget(group)]
													}),
													group.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "wf-error",
														children: t(errorKey in zh ? errorKey : "error_unknown")
													}),
												confirmationScope[group.id] === true && group.autoFolderCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
													className: "wf-confirm-ack",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: confirmationAutoAcks[group.id] === true,
														onChange: (event) => setConfirmationAutoAcks((current) => ({
															...current,
															[group.id]: event.target.checked
														}))
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
														t("confirmAutoFolderAcknowledge"),
														"（",
														group.autoFolderCount,
														" ",
														t("fileUnit"),
														"）"
													] })]
												})
												]
											}, `group-${group.id}`)]
										}, group.id);
									})
								}),
								!plannedGroups.some((group) => group.selectedCount > 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-muted",
									children: t("confirmEmptyScope")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-muted",
									children: t("confirmUncheckedHint")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "wf-muted",
									children: t("confirmDestinationHint")
								})
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "wf-row",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: working,
									onClick: closeConfirmation,
									children: t("backToReview")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: !confirmationReady,
									onClick: () => {
										const groupIds = plannedGroups.filter((group) => confirmationScope[group.id]).map((group) => group.id);
										const payload = confirmationPayload(view.getSnapshot(), groupIds, confirmationAutoFolders > 0);
										closeConfirmation();
										act(async () => setSnapshot(await request(payload)));
									},
									children: t("confirmSave")
								})]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region \0raw:/tmp/wecom-src15/src/client/styles.css.mjs
		var styles_css_default = ".wecom-fws{box-sizing:border-box;height:100%;overflow:auto;padding:28px clamp(18px,4vw,48px) 48px;color:var(--dsw-alias-label-primary);font-size:14px;line-height:1.6}\n.wecom-fws *{box-sizing:border-box}.wecom-fws>*{max-width:1100px;margin-inline:auto}\n.wecom-fws h1{font-size:22px;font-weight:500;margin:0}.wecom-fws h2{font-size:15px;font-weight:500;margin:0}\n.wecom-fws p{margin:6px 0 0}.wecom-fws .wf-muted{color:var(--dsw-alias-label-secondary);font-size:12px}\n.wecom-fws .wf-notice{padding:12px 16px;border:1px solid var(--dsw-alias-state-warning-primary,var(--dsw-alias-label-tertiary));border-radius:10px;margin-top:18px;color:var(--dsw-alias-label-primary)}\n.wecom-fws .wf-error{color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere}\n.wecom-fws .wf-box{border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:12px;padding:18px;margin-top:20px}\n.wecom-fws summary{font-weight:500}.wecom-fws .wf-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;margin-top:16px}\n.wecom-fws label{display:grid;gap:6px;min-width:0;font-size:13px}.wecom-fws label>span{min-width:0;width:100%}\n.wecom-fws .wf-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px}.wecom-fws .wf-row>label{flex:1;min-width:150px}\n.wecom-fws select{font:inherit;color:inherit;background:var(--dsw-alias-background-primary);border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:8px;padding:8px;width:100%}\n.wecom-fws .wf-bound{list-style:none;padding:0;margin:10px 0;display:grid;gap:8px}.wecom-fws .wf-bound li{display:flex;gap:12px;align-items:center;justify-content:space-between;overflow-wrap:anywhere}\n.wecom-fws .wf-search-result{padding:10px 0;border-bottom:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption))}\n.wecom-fws .wf-dates{display:flex;gap:12px;align-items:end;flex-wrap:wrap;margin-top:24px}.wecom-fws .wf-date-field{display:grid;gap:6px;width:230px;min-width:0}.wecom-fws .wf-date-field>label{font-size:13px}\n.wecom-fws .wf-minute-control{position:relative;display:flex;align-items:center;gap:6px;min-width:0}.wecom-fws .wf-minute-control>span:first-child{flex:1;min-width:0}.wecom-fws .wf-minute-control input{width:100%;font-variant-numeric:tabular-nums}\n/* Native picker popups follow color-scheme; their internal year list is browser-rendered. */\n.wecom-fws .wf-minute-control{color-scheme:only light}.wecom-fws .wf-minute-control>span{background:#fff;color:#1f2937}.wecom-fws .wf-minute-control input{color-scheme:only light;background:#fff;color:#1f2937;accent-color:#2563eb}\n.wecom-fws .wf-minute-control input::-webkit-datetime-edit-year-field{border-radius:4px;padding:2px 3px}.wecom-fws .wf-minute-control input::-webkit-datetime-edit-year-field:focus{background:#e8f0fe;color:#174ea6;outline:none}.wecom-fws .wf-minute-control input::-webkit-calendar-picker-indicator{opacity:.75;cursor:pointer}\n.wecom-fws .wf-result-note{margin-top:16px}.wecom-fws .wf-result-note p{margin:4px 0 0}\n.wecom-fws .wf-table{overflow:auto;margin-top:16px}.wecom-fws table{width:100%;border-collapse:collapse;min-width:650px;font-size:12px}\n.wecom-fws th,.wecom-fws td{padding:12px 10px;border-bottom:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));text-align:left;vertical-align:top;overflow-wrap:anywhere;max-width:300px}\n.wecom-fws th{font-weight:400;color:var(--dsw-alias-label-secondary)}.wecom-fws .wf-status{font-weight:500}.wecom-fws .wf-empty{padding:24px 0;color:var(--dsw-alias-label-secondary)}\n.wecom-fws .wf-progress{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:12px}.wecom-fws .wf-search-result code{font-size:11px}\n.wecom-fws .wf-search{display:flex;align-items:flex-end;gap:10px;margin-top:16px}.wecom-fws .wf-search>label{flex:1;min-width:0}.wecom-fws .wf-search>label>span,.wecom-fws .wf-search>button{height:36px}.wecom-fws .wf-search>button{flex-shrink:0;align-self:flex-end}\n.wecom-fws .wf-result-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.wecom-fws .wf-result-heading strong,.wecom-fws .wf-bound strong{font-weight:500}.wecom-fws .wf-tag{font-size:12px;color:var(--dsw-alias-label-secondary)}\n.wecom-fws .wf-id-detail{font-size:12px;margin-top:6px;color:var(--dsw-alias-label-secondary)}.wecom-fws .wf-id-detail summary{cursor:pointer;font-weight:400}.wecom-fws .wf-id-detail code{overflow-wrap:anywhere}.wecom-fws .wf-bound li{align-items:flex-start;border-bottom:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));padding:10px 0}.wecom-fws .wf-bound-info{min-width:0;flex:1}.wecom-fws .wf-bound-info label{margin-top:6px;max-width:520px}.wecom-fws .wf-account-label{margin-top:10px}\n@media(max-width:650px){.wecom-fws .wf-grid{grid-template-columns:minmax(0,1fr)}.wecom-fws .wf-box{padding:14px}.wecom-fws .wf-date-field{flex:1;min-width:260px}}\n.wecom-fws .wf-group-files>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;list-style:revert}.wecom-fws .wf-group-title{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px 10px;min-width:0;font-weight:600}.wecom-fws .wf-group-folder{display:inline-flex;align-items:center;gap:4px;min-width:0;font-size:12px;font-weight:400;color:var(--dsw-alias-label-secondary)}.wecom-fws .wf-group-folder .wf-muted{font-size:12px}.wecom-fws .wf-folder-path{color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}.wecom-fws .wf-folder-sep{color:var(--dsw-alias-label-secondary)}.wecom-fws .wf-group-files>summary:before{content:'▸';font-size:12px}.wecom-fws .wf-group-files[open]>summary:before{content:'▾'}.wecom-fws .wf-group-files>summary>.wf-group-title{flex:1}\n.wecom-fws .wf-group-actions{margin-top:10px;padding-bottom:12px;border-bottom:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption))}.wecom-fws .wf-file-search{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:8px;margin-top:12px}.wecom-fws label.wf-inline-search{display:flex;flex-wrap:nowrap;align-items:center;gap:10px;flex:0 1 460px;min-width:0;width:auto;max-width:460px}.wecom-fws .wf-group-actions-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:8px;margin-top:8px}\n.wecom-fws .wf-segmented{display:inline-flex;align-items:stretch;height:36px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:999px;overflow:hidden;background:var(--dsw-alias-background-primary)}\n.wecom-fws .wf-segmented .wf-segment{display:inline-flex;align-items:center;justify-content:center;padding:0 14px;border:none;border-radius:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;white-space:nowrap;cursor:pointer}\n.wecom-fws .wf-segmented .wf-segment+.wf-segment{border-left:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption))}\n.wecom-fws .wf-segmented .wf-segment:not(.wf-segment-active):hover{color:var(--dsw-alias-label-primary)}\n.wecom-fws .wf-segmented .wf-segment-active{background:var(--dsw-alias-label-primary,#1f2937);color:var(--dsw-alias-background-primary,#fff)}\n.wecom-fws .wf-segmented .wf-segment:disabled{cursor:default;opacity:.6}\n.wecom-fws .wf-segmented .wf-segment:focus-visible{outline:2px solid var(--dsw-alias-label-primary,currentColor);outline-offset:-4px}\n.wecom-fws .wf-setting-filter{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px;font-size:13px}\n\n\n\n.wecom-fws label.wf-inline-search>input{flex:1 1 auto;min-width:0;width:100%}.wecom-fws .wf-group-chips{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:12px}.wecom-fws .wf-group-chip{display:inline-flex;align-items:center;gap:8px;max-width:100%;padding:4px 6px 4px 10px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:999px;font-size:12px}.wecom-fws .wf-group-chip-name{font-weight:500;overflow-wrap:anywhere}.wecom-fws .wf-group-chip-toggle{display:inline-flex;align-items:center;gap:8px;min-width:0;padding:0;border:none;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}.wecom-fws .wf-group-chip-active{border-color:var(--dsw-alias-label-primary,currentColor);background:var(--dsw-alias-background-secondary,rgba(128,128,128,.08))}.wecom-fws .wf-ungrouped-chip{padding:4px 10px;border-style:dashed;font:inherit;font-size:12px;color:var(--dsw-alias-label-primary,currentColor);background:transparent;cursor:pointer}.wecom-fws .wf-ungrouped-chip.wf-group-chip-active{border-style:solid}.wecom-fws .wf-chip-remove{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;border:none;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;line-height:1;cursor:pointer}.wecom-fws .wf-chip-remove:hover{background:var(--dsw-alias-background-secondary,rgba(128,128,128,.12));color:var(--dsw-alias-label-primary)}.wecom-fws .wf-chip-remove:disabled{cursor:default;opacity:.4}\n.wecom-fws .wf-time-sort{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;font:inherit;color:inherit;background:none;border:none;cursor:pointer}.wecom-fws .wf-time-sort:hover{color:var(--dsw-alias-label-primary)}.wecom-fws .wf-sort-arrows{display:inline-flex;flex-direction:column;line-height:1;font-size:9px}.wecom-fws .wf-sort-arrows>span{opacity:.3}.wecom-fws .wf-sort-arrows>span.wf-arrow-active{opacity:1}.wecom-fws .wf-folder-saved{cursor:pointer}.wecom-fws .wf-folder-saved input{pointer-events:none;opacity:1;cursor:pointer}.wecom-fws .wf-folder-saved:hover input{border-color:var(--dsw-alias-label-primary)}.wecom-fws .wf-pagination{justify-content:flex-end;margin-top:16px}.wecom-fws .wf-pagination .wf-page-jump{flex:0 0 auto;min-width:0;display:inline-flex;align-items:center;gap:6px}.wecom-fws .wf-page-jump input{width:56px}\n.wecom-fws .wf-group-files table{min-width:1120px;table-layout:fixed}.wecom-fws .wf-group-files th,.wecom-fws .wf-group-files td{padding:10px 8px}.wecom-fws .wf-group-files th:first-child,.wecom-fws .wf-group-files td:first-child{white-space:nowrap;width:44px}.wecom-fws .wf-group-files th:nth-child(2){width:280px}.wecom-fws .wf-group-files th:nth-child(3){width:132px}.wecom-fws .wf-group-files th:nth-child(4){width:136px}.wecom-fws .wf-group-files th:nth-child(5){width:208px}.wecom-fws .wf-row-group-select{font-size:12px;padding:4px 6px;height:32px;text-overflow:ellipsis}.wecom-fws .wf-group-files th:nth-child(6){width:168px}.wecom-fws .wf-group-files th:nth-child(7),.wecom-fws .wf-group-files td:nth-child(7){white-space:nowrap}.wecom-fws .wf-group-files td:nth-child(5)>span{width:100%}.wecom-fws .wf-group-actions-row .wf-group-actions-end{margin-left:auto;display:inline-flex}.wecom-fws input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-label-primary);cursor:pointer}.wecom-fws input[type=checkbox]:disabled{cursor:default}.wecom-fws .wf-message-time{white-space:nowrap}.wecom-fws .wf-selected-row{background:var(--dsw-alias-background-secondary,rgba(128,128,128,.05))}\n.wecom-fws .wf-toast{position:fixed;right:clamp(18px,4vw,40px);bottom:84px;z-index:4;display:flex;align-items:center;flex-wrap:wrap;gap:10px;max-width:min(560px,calc(100vw - 36px));padding:10px 14px;border:1px solid var(--dsw-alias-border-primary,#777);border-radius:10px;background:var(--dsw-alias-background-primary,#fff);color:var(--dsw-alias-label-primary);box-shadow:0 6px 16px rgba(0,0,0,.18);font-size:13px;overflow-wrap:anywhere}.wecom-fws .wf-toast strong{font-weight:600;white-space:nowrap}.wecom-fws .wf-toast-close{order:1;margin-left:auto;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;line-height:1;cursor:pointer}.wecom-fws .wf-toast-close:hover{background:var(--dsw-alias-background-secondary,rgba(128,128,128,.12));color:var(--dsw-alias-label-primary)}\n.wecom-fws .wf-confirm-bar{position:fixed;right:clamp(18px,4vw,40px);bottom:24px;z-index:3}.wecom-fws .wf-fab{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 22px;border:none;border-radius:999px;font:inherit;font-size:14px;font-weight:500;color:var(--dsw-alias-background-primary,#fff);background:var(--dsw-alias-label-primary,#1f2937);box-shadow:0 6px 16px rgba(0,0,0,.18);cursor:pointer;transition:opacity .15s ease}.wecom-fws .wf-fab:hover{opacity:.9}.wecom-fws .wf-fab:focus-visible{outline:2px solid var(--dsw-alias-label-primary,#1f2937);outline-offset:3px}.wecom-fws .wf-fab:disabled{opacity:.4;box-shadow:none;cursor:default}\n.wecom-fws .wf-confirm-dialog{width:min(640px,calc(100vw - 36px));max-height:calc(100vh - 60px);overflow:auto;padding:24px;border:1px solid var(--dsw-alias-border-primary,#777);border-radius:12px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-background-primary,#fff);font:inherit}.wecom-fws .wf-confirm-dialog::backdrop{background:rgba(0,0,0,.35)}.wecom-fws .wf-confirm-dialog h2{font-size:19px}.wecom-fws .wf-confirm-dialog ul{padding-left:20px}.wecom-fws .wf-confirm-dialog li{margin-top:10px}.wecom-fws .wf-confirm-root{overflow-wrap:anywhere}.wf-modal label{display:grid;gap:6px;min-width:0;font-size:13px}.wf-modal label>span{min-width:0;width:100%}.wf-modal .wf-muted{margin:6px 0 0;color:var(--dsw-alias-label-secondary);font-size:12px}.wf-modal .wf-error{margin:6px 0 0;color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere}.wecom-fws .wf-group-content{height:657px;overflow:auto}.wecom-fws .wf-directory-view{display:grid;grid-template-columns:minmax(240px,280px) minmax(0,1fr);gap:14px;margin-top:16px;align-items:stretch}.wecom-fws .wf-directory-sidebar{min-width:0;box-sizing:border-box;display:flex;flex-direction:column;height:641px;padding-bottom:13px;overflow:hidden}.wecom-fws .wf-directory-sider-head{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 10px 6px;margin-bottom:6px;border-bottom:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));font-size:12px;color:var(--dsw-alias-label-secondary)}.wecom-fws .wf-directory-list{list-style:none;margin:0;padding:0;display:grid;align-content:start;gap:4px}.wecom-fws .wf-directory-listbox{flex:1 1 auto;min-height:0;overflow:auto}.wecom-fws .wf-directory-filebox{flex:1 1 auto;min-height:0;overflow:auto;margin-top:12px}.wecom-fws .wf-directory-item{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%;padding:8px 10px;border:1px solid transparent;border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:12px;text-align:left;cursor:pointer}.wecom-fws .wf-directory-item:hover{background:var(--dsw-alias-background-secondary,rgba(128,128,128,.1))}.wecom-fws .wf-directory-item-active{border-color:var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));background:var(--dsw-alias-background-secondary,rgba(128,128,128,.1))}.wecom-fws .wf-directory-item-name{min-width:0;overflow-wrap:anywhere;user-select:text}.wecom-fws .wf-directory-item-count{flex:0 0 auto;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}.wecom-fws .wf-directory-detail{min-width:0;box-sizing:border-box;display:flex;flex-direction:column;height:641px;overflow:hidden;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:10px;padding:12px}.wecom-fws .wf-directory-head{flex:0 0 auto;display:flex;align-items:center;justify-content:flex-start;gap:12px}.wecom-fws .wf-directory-path{flex:1;min-width:0;font-size:13px;font-weight:500;overflow-wrap:anywhere}.wecom-fws .wf-directory-files{list-style:none;margin:0;padding:0;display:grid;align-content:start;gap:6px;font-size:12px}.wecom-fws .wf-directory-files>li{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));padding-top:6px}.wecom-fws .wf-directory-files>li:first-child{border-top:none;padding-top:0}.wecom-fws .wf-directory-file-name{flex:1 1 auto;min-width:0;overflow-wrap:anywhere}.wecom-fws .wf-directory-file-actions{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto}.wecom-fws .wf-directory-file-actions>button{padding:2px 8px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1.4;cursor:pointer}.wecom-fws .wf-directory-file-actions>button:hover:not(:disabled){background:var(--dsw-alias-background-secondary,rgba(128,128,128,.12))}.wecom-fws .wf-directory-file-actions>button:disabled{cursor:default;opacity:.5}.wecom-fws .wf-directory-files .wf-muted{flex:0 0 auto;white-space:nowrap}.wecom-fws .wf-directory-pagination{flex:0 0 auto;margin-top:10px}.wecom-fws .wf-directory-pagination-compact{flex-wrap:nowrap;justify-content:flex-start;gap:4px}.wecom-fws .wf-directory-pagination-compact button{padding:0 6px;white-space:nowrap}.wecom-fws .wf-directory-pagination-compact input{width:44px}@media(max-width:800px){.wecom-fws .wf-directory-view{grid-template-columns:minmax(0,1fr)}}\n.wecom-fws .wf-group-chip-check{width:14px;height:14px;flex:0 0 auto}.wecom-fws .wf-group-chip-count{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}.wecom-fws .wf-confirm-groups{list-style:none;padding:0;margin:12px 0 0;display:grid;gap:8px}.wecom-fws .wf-confirm-groups>li{margin-top:0}.wecom-fws .wf-confirm-group{display:grid;gap:4px;padding:10px 12px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:10px}.wecom-fws .wf-confirm-group-checked{border-color:var(--dsw-alias-label-primary,currentColor)}.wecom-fws .wf-confirm-group-line{display:flex;align-items:center;gap:8px;font-size:13px}.wecom-fws .wf-confirm-group .wf-muted,.wecom-fws .wf-confirm-group .wf-error{padding-left:24px}.wecom-fws .wf-confirm-ack{display:flex;align-items:flex-start;gap:8px;margin-top:8px;font-size:13px}\n@media(max-width:650px){.wecom-fws .wf-group-files>summary{flex-wrap:wrap}.wecom-fws .wf-group-files>summary>.wf-muted{width:100%;padding-left:20px}}\n.wecom-fws .wf-zip-actions{display:inline-flex;align-items:center;gap:6px;margin-left:8px}\n.wecom-fws .wf-zip-actions>button{padding:2px 8px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1.4;cursor:pointer}\n.wecom-fws .wf-zip-actions>button:hover:not(:disabled){background:var(--dsw-alias-background-secondary,rgba(128,128,128,.12))}\n.wecom-fws .wf-zip-actions>button:disabled{cursor:default;opacity:.5}\n.wecom-fws .wf-file-source{white-space:normal;overflow-wrap:anywhere}\n.wf-setting-archive{display:grid;gap:6px;margin-top:12px;font-size:13px}\n.wf-setting-archive>span{font-weight:500}\n.wf-check-line{display:flex;flex-direction:row;align-items:center;gap:6px;cursor:pointer}\n.wf-toast-extract{order:2;flex-basis:100%;margin-top:2px}\n";
		//#endregion
		//#region src/client/index.tsx
		/** DSH sidebar contribution and its main workbench panel. */
		const NS = "elineWecomFws";
		const PANEL = "eline-wecom-fws";
		const inject = [
			"slots",
			"locale",
			"remote",
			"remote.directoryPicker"
		];
		function Icon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, { size });
		}
		async function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}));
			ctx.effect(() => {
				const element = document.createElement("style");
				element.dataset.plugin = "dsh-atom";
				element.textContent = styles_css_default;
				document.head.append(element);
				return () => element.remove();
			});
			const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
			ctx.effect(() => disposeRemote);
			ctx.inject(["remote.wecomFws"], (ctx) => {
				const t = ctx.locale.bind(NS);
				const view = createViewState(new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai" }).format(/* @__PURE__ */ new Date()));
				ctx.effect(() => () => view.dispose());
				const request = async (value) => {
					const result = await ctx.remote.wecomFws.request(JSON.stringify(value));
					if (!result.ok) throw Object.assign(new Error(result.error.message), { code: result.error.code });
					const response = JSON.parse(result.value);
					if (!response.ok) throw Object.assign(new Error(response.code), { code: response.code });
					return response.value;
				};
				const pickDirectory = async () => {
					const result = await ctx.remote.directoryPicker.pick();
					if (!result.ok) throw Object.assign(new Error(result.error.message), { code: "directory-picker-failed" });
					return result.value;
				};
				ctx.slots.inject("main", () => ctx.slots.register({
					name: "main",
					key: PANEL,
					locale: NS,
					inject: () => ({
						request,
						pickDirectory,
						view
					})
				}, Page));
				ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
					name: "sidebar.panellist",
					id: PANEL,
					order: 1,
					locale: NS,
					label: () => t("panel")
				}, Icon));
			});
		}
		//#endregion
		var AtomOrderPanel = (function (require) {
			const module = { exports: {} };
			const exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/order-panel.tsx
var order_panel_exports = {};
__export(order_panel_exports, {
  default: () => OrderPanel
});
module.exports = __toCommonJS(order_panel_exports);
var import_react = require("react");

// src/client/order-panel.css
var order_panel_default = "/* \u5EFA\u5355\u9762\u677F\uFF08\u6CE8\u5165\u7EC4\u4EF6\u81EA\u5E26\u6837\u5F0F\uFF0C\u547D\u540D\u7A7A\u95F4 wf-order\uFF09\u3002 */\n.wecom-fws .wf-order-head{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.wecom-fws .wf-order-auto{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer}\n.wecom-fws .wf-order-auto span{width:auto}\n.wecom-fws .wf-order-button{padding:4px 12px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1.6;cursor:pointer}\n.wecom-fws .wf-order-button:hover:not(:disabled){background:var(--dsw-alias-background-secondary,rgba(128,128,128,.12))}\n.wecom-fws .wf-order-button:disabled{cursor:default;opacity:.5}\n.wecom-fws .wf-order-notice{margin-top:10px;font-size:12px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}\n.wecom-fws .wf-order-list{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:10px}\n.wecom-fws .wf-order-row{padding:10px 12px;border:1px solid var(--dsw-alias-border-primary,var(--dsw-alias-label-caption));border-radius:10px}\n.wecom-fws .wf-order-path{display:flex;align-items:baseline;flex-wrap:wrap;gap:8px;font-size:13px;min-width:0}\n.wecom-fws .wf-order-path strong{font-weight:500;overflow-wrap:anywhere}\n.wecom-fws .wf-order-job-head{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:6px;font-size:12px}\n.wecom-fws .wf-order-actions{margin-left:auto;display:inline-flex;gap:6px}\n.wecom-fws .wf-order-status{font-size:12px;font-weight:500}\n.wecom-fws .wf-order-status.wf-order-running,.wecom-fws .wf-order-status.wf-order-queued{color:var(--dsw-alias-state-warning-primary,inherit)}\n.wecom-fws .wf-order-status.wf-order-failed{color:var(--dsw-alias-state-error-primary)}\n.wecom-fws .wf-order-failed{margin-top:6px;font-size:12px;color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere}\n.wecom-fws .wf-order-output{margin-top:6px;font-size:12px;overflow-wrap:anywhere}\n.wecom-fws .wf-order-result{margin-top:8px;font-size:12px;display:grid;gap:6px}\n.wecom-fws .wf-order-missing{margin:2px 0 0;color:var(--dsw-alias-state-error-primary)}\n.wecom-fws .wf-order-issues{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:2px;font-size:12px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}\n.wecom-fws .wf-order-issues .wf-order-issue-error{color:var(--dsw-alias-state-error-primary)}\n";

// src/client/order-panel.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ACTIVE = ["queued", "running"];
var formatTime = (value) => value ? new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }) : "";
var folderLabel = (value) => String(value || "").split(/[\\/]/).filter(Boolean).pop() || value;
function OrderPanel({ request, pickDirectory, t }) {
  const [state, setState] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)("");
  const [notice, setNotice] = (0, import_react.useState)("");
  const alive = (0, import_react.useRef)(true);
  const loading = (0, import_react.useRef)(false);
  const message = (error) => {
    const key = `error_${error?.code || "order-failed"}`;
    const text = t(key);
    return text === key ? error?.message || error?.code || "" : text;
  };
  const load = async () => {
    if (loading.current) return;
    loading.current = true;
    try {
      const value = await request({ action: "order-state" });
      if (alive.current) setState(value);
    } catch {
    } finally {
      loading.current = false;
    }
  };
  (0, import_react.useEffect)(() => {
    alive.current = true;
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-atom-order";
    style.textContent = order_panel_default;
    document.head.append(style);
    load();
    return () => {
      alive.current = false;
      style.remove();
    };
  }, []);
  const running = !!state?.jobs?.some((job) => ACTIVE.includes(job.status));
  (0, import_react.useEffect)(() => {
    const timer = setInterval(load, running ? 1500 : 5e3);
    return () => clearInterval(timer);
  }, [running]);
  const run = async (key, task) => {
    if (busy) return;
    setBusy(key);
    setNotice("");
    try {
      const value = await task();
      if (typeof value === "string" && value) setNotice(value);
      await load();
    } catch (error) {
      setNotice(message(error));
    } finally {
      setBusy("");
    }
  };
  const build = (directory, force) => run(`build:${directory}`, async () => {
    await request({ action: "order-build", directory, force });
    return t("orderStarted");
  });
  const choose = () => run("choose", async () => {
    const directory = await pickDirectory();
    if (!directory) return "";
    await request({ action: "order-build", directory, force: false });
    return t("orderStarted");
  });
  const cancel = (directory) => run(`cancel:${directory}`, async () => {
    await request({ action: "order-cancel", directory });
    return "";
  });
  const toggleAuto = (checked) => run("auto", async () => {
    await request({ action: "order-config", patch: { autoOrder: checked } });
    return "";
  });
  if (!state) return null;
  const jobs = new Map((state.jobs || []).map((job) => [job.directory.toLowerCase(), job]));
  const directories = state.directories || [];
  const seen = /* @__PURE__ */ new Set();
  const rows = [];
  for (const item of directories) {
    const key = item.directory.toLowerCase();
    seen.add(key);
    rows.push({ ...item, job: jobs.get(key) });
  }
  for (const [key, job] of jobs) {
    if (seen.has(key)) continue;
    rows.push({ directory: job.directory, fileCount: 0, lastSavedAt: 0, job });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "wf-box wf-order", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "wf-order-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("orderTitle") }),
      running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "wf-muted", children: t("orderStatus_running") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "wf-muted", children: t("orderIntro") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "wf-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "wf-order-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: state.config?.autoOrder === true, disabled: !!busy, onChange: (event) => toggleAuto(event.target.checked) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("orderAuto") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "wf-order-button", disabled: !!busy, onClick: choose, children: t("orderChoose") })
    ] }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "wf-order-notice", role: "status", children: notice }),
    !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "wf-muted", children: t("orderNoDirs") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "wf-order-list", children: rows.map((row) => {
      const job = row.job;
      const active = !!job && ACTIVE.includes(job.status);
      const status = job ? t(`orderStatus_${job.status}`) : "";
      const step = job ? job.step === "queued" ? "" : t(`orderStep_${job.step}`) : "";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "wf-order-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "wf-order-path", title: row.directory, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: folderLabel(row.directory) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "wf-muted", children: [
            row.fileCount ? `${row.fileCount} ${t("orderDocs")}` : "",
            row.lastSavedAt ? `${row.fileCount ? " \xB7 " : ""}${t("orderLastSaved")} ${formatTime(row.lastSavedAt)}` : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "wf-order-job-head", children: [
          job && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `wf-order-status wf-order-${job.status}`, children: status }),
          active && job && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "wf-muted", children: [
            step,
            " ",
            job.progress || 0,
            "%"
          ] }),
          job && job.status === "done" && job.docCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "wf-muted", children: [
            job.docCount,
            " ",
            t("orderDocs")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "wf-order-actions", children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "wf-order-button", disabled: !!busy, onClick: () => cancel(row.directory), children: t("orderCancelJob") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "wf-order-button", disabled: !!busy, onClick: () => build(row.directory, true), children: t("orderRebuild") }) })
        ] }),
        job?.status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "wf-order-failed", children: job.errorMessage || t(`error_${job.error || "order-failed"}`) }),
        job?.status === "done" && job.outputPath && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "wf-order-output", title: job.outputPath, children: [
          t("orderOutput"),
          "\uFF1A",
          job.outputPath
        ] }),
        !!job?.orders?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "wf-order-result", children: job.orders.slice(0, 5).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "wf-muted", children: [
            " ",
            t("orderCompleteness"),
            " ",
            order.completeness,
            "%"
          ] }),
          !!order.summary?.warnings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "wf-muted", children: [
            " \xB7 ",
            order.summary.warnings,
            " ",
            t("orderIssues")
          ] }),
          !!order.missing?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "wf-order-missing", children: [
            t("orderMissing"),
            "\uFF1A",
            order.missing.join("\u3001")
          ] }),
          !!order.issues?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "wf-order-issues", children: order.issues.slice(0, 3).map((issue, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: issue.level === "error" ? "wf-order-issue-error" : "", children: [
            issue.field,
            "\uFF1A",
            issue.message
          ] }, index)) })
        ] }, `${job.id}:${order.label}`)) }),
        !!job?.warnings?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "wf-order-issues", children: job.warnings.slice(0, 3).map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: warning }, index)) })
      ] }, row.directory);
    }) })
  ] });
}

			return module.exports.default;
		})(require);
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

