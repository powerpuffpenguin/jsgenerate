"use strict";
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
exports.listTemplates = exports.Template = exports.Match = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var match = /^[a-zA-Z][a-zA-Z0-9\-\_\.]*$/;
function Match(str) {
    if (str.indexOf("..") != -1 ||
        str.indexOf("--") != -1 ||
        str.indexOf("__") != -1) {
        return false;
    }
    return match.test(str);
}
exports.Match = Match;
var Template = /** @class */ (function () {
    function Template(dirname, filename, generate) {
        this.dirname = dirname;
        this.filename = filename;
        this.generate = generate;
        this.description = '';
        this.tag = '';
    }
    return Template;
}());
exports.Template = Template;
function createTemplate(dirname, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, result;
        return __generator(this, function (_a) {
            ctx = require(path_1.join(dirname, filename, "jsgenerate", "main.js"));
            if (typeof ctx.jsgenerate === 'function') {
                result = new Template(dirname, filename, ctx.jsgenerate);
                if (typeof ctx.description === 'string') {
                    result.description = ctx.description;
                }
                if (typeof ctx.tag === 'string') {
                    result.tag = ctx.tag;
                }
                return [2 /*return*/, result];
            }
            return [2 /*return*/, null];
        });
    });
}
function listTemplates(filename) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var ts, dir, dir_1, dir_1_1, dirent, t, e_2, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ts = new Array();
                    return [4 /*yield*/, fs_1.promises.opendir(filename)];
                case 1:
                    dir = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, 11, 16]);
                    dir_1 = __asyncValues(dir);
                    _b.label = 3;
                case 3: return [4 /*yield*/, dir_1.next()];
                case 4:
                    if (!(dir_1_1 = _b.sent(), !dir_1_1.done)) return [3 /*break*/, 9];
                    dirent = dir_1_1.value;
                    if (!dirent.isDirectory()) {
                        return [3 /*break*/, 8];
                    }
                    if (!Match(dirent.name)) return [3 /*break*/, 8];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, createTemplate(filename, dirent.name)];
                case 6:
                    t = _b.sent();
                    if (t) {
                        ts.push(t);
                    }
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _b.sent();
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 3];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _b.trys.push([11, , 14, 15]);
                    if (!(dir_1_1 && !dir_1_1.done && (_a = dir_1.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _a.call(dir_1)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/, ts];
            }
        });
    });
}
exports.listTemplates = listTemplates;
