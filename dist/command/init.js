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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
var path_1 = require("../utils/path");
var context_1 = require("../utils/context");
var path_2 = require("path");
function initCommand(parent, path) {
    return __awaiter(this, void 0, void 0, function () {
        var cmd, ts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cmd = parent.command("init")
                        .description("generate project init code")
                        .option("--list", "list template names")
                        .action(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var list, ts;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        list = this.opts()["list"];
                                        return [4 /*yield*/, path_1.listTemplates(path)];
                                    case 1:
                                        ts = _a.sent();
                                        if (ts && ts.length) {
                                            ts.forEach(function (t) {
                                                if (list) {
                                                    console.log(t.filename);
                                                }
                                                else {
                                                    console.log("for help use : jsgenerate init " + t.filename + " -h");
                                                }
                                            });
                                        }
                                        else {
                                            if (!list) {
                                                console.log("not found template on directory : " + path);
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [4 /*yield*/, path_1.listTemplates(path)];
                case 1:
                    ts = _a.sent();
                    ts.forEach(function (t) {
                        cmd.command(t.filename)
                            .description(t.description)
                            .option("-n, --name []", "project name").option("-p, --package []", "package name").option("-t, --tag []", "code generate tag").action(function () {
                            var tag = this.opts()["tag"];
                            if (typeof tag === "string") {
                                tag = tag.trim();
                            }
                            else {
                                tag = "";
                            }
                            var context = new context_1.Context(this.opts()["package"], this.opts()["name"], tag, path_2.join(t.dirname, t.filename), process.cwd());
                            t.generate(context);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.initCommand = initCommand;
