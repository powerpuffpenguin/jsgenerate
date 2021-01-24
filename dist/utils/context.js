"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var art = __importStar(require("art-template"));
var uuid_1 = require("uuid");
var version_1 = require("../version");
var match = /^[a-zA-Z@][a-zA-Z0-9\-\_\.\/@]*$/;
function Match(str) {
    if (str.indexOf("..") != -1 ||
        str.indexOf("--") != -1 ||
        str.indexOf("__") != -1 ||
        str.indexOf("__") != -1 ||
        str.indexOf("@@") != -1) {
        return false;
    }
    return match.test(str);
}
var Context = /** @class */ (function () {
    function Context(pkg, name, tag, root, output) {
        this.tag = tag;
        this.root = root;
        this.output = output;
        this.data = new Map();
        this.version = version_1.Version;
        if (!(typeof pkg === 'string')) {
            throw new Error("unknow package");
        }
        pkg = pkg.trim();
        if (pkg.length == 0 || !Match(pkg)) {
            throw new Error("not supported package name");
        }
        if (!(typeof name === 'string')) {
            name = pkg;
            var f1 = name.lastIndexOf(".");
            var f2 = name.lastIndexOf("/");
            if (f2 != -1) {
                if (f1 == -1) {
                    f1 = f2;
                }
                else {
                    f1 = f1 > f2 ? f1 : f2;
                }
            }
            if (f1 != -1) {
                name = name.substr(f1 + 1);
            }
        }
        name = name.trim();
        if (name.length == 0 || !Match(name)) {
            throw new Error("not supported project name");
        }
        this.pkg_ = pkg;
        this.name_ = name;
    }
    Object.defineProperty(Context.prototype, "pkg", {
        get: function () {
            return this.pkg_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "name", {
        get: function () {
            return this.name_;
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.serve = function (renderFile, renderDir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._serve(this.root, undefined, renderFile, renderDir)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Context.prototype._name = function (prefix, name) {
        if (prefix === undefined) {
            return name;
        }
        return path_1.join(prefix, name);
    };
    Context.prototype._serve = function (root, prefix, renderFile, renderDir) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var dir, dir_1, dir_1_1, dirent, name_1, filename, stat, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.opendir(root)];
                    case 1:
                        dir = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 12, 13, 18]);
                        dir_1 = __asyncValues(dir);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, dir_1.next()];
                    case 4:
                        if (!(dir_1_1 = _b.sent(), !dir_1_1.done)) return [3 /*break*/, 11];
                        dirent = dir_1_1.value;
                        name_1 = this._name(prefix, dirent.name);
                        if (name_1 == 'jsgenerate') {
                            // 跳過定製檔案
                            return [3 /*break*/, 10];
                        }
                        filename = path_1.join(root, dirent.name);
                        return [4 /*yield*/, fs_1.promises.stat(filename)];
                    case 5:
                        stat = _b.sent();
                        if (!dirent.isFile()) return [3 /*break*/, 7];
                        return [4 /*yield*/, renderFile(name_1, filename, stat)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        if (!dirent.isDirectory()) return [3 /*break*/, 10];
                        return [4 /*yield*/, renderDir(name_1, filename, stat)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this._serve(path_1.join(root, dirent.name), prefix === undefined ? dirent.name : path_1.join(prefix, dirent.name), renderFile, renderDir)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 3];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _b.trys.push([13, , 16, 17]);
                        if (!(dir_1_1 && !dir_1_1.done && (_a = dir_1.return))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _a.call(dir_1)];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Context.prototype, "extension", {
        get: function () {
            return art.extension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "defaults", {
        get: function () {
            return art.defaults;
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.template = function (filenameOrTemplateId, content) {
        return art.default(filenameOrTemplateId, content);
    };
    Context.prototype.compile = function (source, options) {
        return art.compile(source, options);
    };
    Context.prototype.render = function (source, data, options) {
        return art.render(source, data, options);
    };
    Context.prototype.mkdir = function (path, recursive, mode) {
        if (typeof recursive === 'boolean' && !recursive) {
            recursive = false;
        }
        else {
            recursive = true;
        }
        if (!(typeof mode === 'string' || typeof mode === 'number')) {
            mode = 509;
        }
        return fs_1.promises.mkdir(path, {
            recursive: recursive,
            mode: mode,
        });
    };
    Context.prototype.copyFile = function (dst, src, mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof mode === 'string' || typeof mode === 'number')) {
                            mode = 436;
                        }
                        return [4 /*yield*/, fs_1.promises.copyFile(src, dst)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_1.promises.chmod(dst, mode)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Context.prototype.writeFile = function (dst, text, mode, encoding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof mode === 'string' || typeof mode === 'number')) {
                            mode = 436;
                        }
                        if (!(typeof encoding === 'string')) {
                            encoding = "utf8";
                        }
                        return [4 /*yield*/, fs_1.promises.writeFile(dst, text, {
                                encoding: encoding,
                                mode: mode,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Context.prototype.uuidv1 = function () {
        return uuid_1.v1();
    };
    Context.prototype.uuidv4 = function () {
        return uuid_1.v4();
    };
    return Context;
}());
exports.Context = Context;
