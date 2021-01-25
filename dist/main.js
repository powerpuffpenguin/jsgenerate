#!/usr/bin/env node
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
var path_1 = require("path");
var commander_1 = require("commander");
var version_1 = require("./version");
var init_1 = require("./command/init");
var program = new commander_1.Command('jsgenerate');
program
    .command("version")
    .description("display version")
    .action(function () {
    console.log(version_1.Version);
});
program.command("complete")
    .description("generate bash complete code")
    .action(function () {
    console.log(Buffer.from("IyEvYmluL2Jhc2gKZnVuY3Rpb24gX19raW5nMDExX2pzZ2VuZXJhdGVfYmFzZSgpewogICAgbG9jYWwgY3VyPSR7Q09NUF9XT1JEU1tDT01QX0NXT1JEXX0KICAgIGlmIFsgMiA9PSAkQ09NUF9DV09SRCBdO3RoZW4KICAgICAgICBsb2NhbCBvcHRzPSItaCAtLWhlbHAiCiAgICAgICAgQ09NUFJFUExZPSggJChjb21wZ2VuIC1XICIke29wdHN9IiAtLSAke2N1cn0pICkKICAgIGZpCn0KZnVuY3Rpb24gX19raW5nMDExX2pzZ2VuZXJhdGVfaGVscCgpewogICAgbG9jYWwgY3VyPSR7Q09NUF9XT1JEU1tDT01QX0NXT1JEXX0KICAgIGlmIFsgMiA9PSAkQ09NUF9DV09SRCBdO3RoZW4KICAgICAgICBsb2NhbCBvcHRzPSJ2ZXJzaW9uIGNvbXBsZXRlIGluaXQgaGVscCAtaCAtLWhlbHAiCiAgICAgICAgQ09NUFJFUExZPSggJChjb21wZ2VuIC1XICIke29wdHN9IiAtLSAke2N1cn0pICkKICAgIGZpCn0KZnVuY3Rpb24gX19raW5nMDExX2pzZ2VuZXJhdGVfaW5pdF9vcHRpb24oKXsKICAgIGxvY2FsIGN1cj0ke0NPTVBfV09SRFNbQ09NUF9DV09SRF19CiAgICBsb2NhbCBvcHRzPSctbiAtLW5hbWUgLXAgLS1wYWNrYWdlIC10IC0tdGFnIC1oIC0taGVscCcKICAgIGNhc2UgJHtDT01QX1dPUkRTW0NPTVBfQ1dPUkQtMV19IGluCiAgICAgICAgLW58LS1uYW1lfC1wfC0tcGFja2FnZXwtaHwtLWhlbHApCgogICAgICAgIDs7CiAgICAgICAgLXR8LS10YWcpCiAgICAgICAgICAgIGxvY2FsIG9wdHNfaXRlbXM9YGpzZ2VuZXJhdGUgaW5pdCAke0NPTVBfV09SRFNbMl19IC0tbGlzdC10YWcgMj4gL2Rldi9udWxsYAogICAgICAgICAgICBDT01QUkVQTFk9KCAkKGNvbXBnZW4gLVcgIiR7b3B0c19pdGVtc30iIC0tICR7Y3VyfSkgKQogICAgICAgIDs7CgogICAgICAgICMgZGVmYXVsdAogICAgICAgICopCiAgICAgICAgICAgIENPTVBSRVBMWT0oICQoY29tcGdlbiAtVyAiJHtvcHRzfSIgLS0gJHtjdXJ9KSApCiAgICAgICAgOzsKICAgIGVzYWMKfQpmdW5jdGlvbiBfX2tpbmcwMTFfanNnZW5lcmF0ZV9pbml0KCl7CiAgICBsb2NhbCBjdXI9JHtDT01QX1dPUkRTW0NPTVBfQ1dPUkRdfQogICAgaWYgWyAyID09ICRDT01QX0NXT1JEIF07dGhlbgogICAgICAgIGxvY2FsIG9wdHNfaXRlbXM9YGpzZ2VuZXJhdGUgaW5pdCAtLWxpc3QgMj4gL2Rldi9udWxsYAogICAgICAgIGxvY2FsIG9wdHM9Ii0tbGlzdCAtaCAtLWhlbHAiCiAgICAgICAgQ09NUFJFUExZPSggJChjb21wZ2VuIC1XICIke29wdHNfaXRlbXN9ICR7b3B0c30iIC0tICR7Y3VyfSkgKQogICAgZWxzZSAKICAgICAgICBsb2NhbCBrZXk9JHtDT01QX1dPUkRTWzJdfQogICAgICAgIGxvY2FsIG9wdHNfaXRlbXM9YGpzZ2VuZXJhdGUgaW5pdCAtLWxpc3QgMj4gL2Rldi9udWxsYAogICAgICAgIGlmIFtbICIkb3B0c19pdGVtcyIgPT0gKiIka2V5IiogXV07dGhlbgogICAgICAgICAgICBfX2tpbmcwMTFfanNnZW5lcmF0ZV9pbml0X29wdGlvbgogICAgICAgIGZpCiAgICBmaQp9CmZ1bmN0aW9uIF9fa2luZzAxMV9qc2dlbmVyYXRlKCl7CiAgICAjIOeNsuWPliDmraPlnKjovLjlhaXnmoQg5Y+D5pW4CiAgICBsb2NhbCBjdXI9JHtDT01QX1dPUkRTW0NPTVBfQ1dPUkRdfQogICAgIyAg6Ly45YWlIOesrDHlgIsg5Y+D5pW4CiAgICBpZiBbIDEgPT0gJENPTVBfQ1dPUkQgXTt0aGVuCiAgICAgICAgbG9jYWwgb3B0cz0idmVyc2lvbiBjb21wbGV0ZSBpbml0IGhlbHAgLWggLS1oZWxwIgogICAgICAgIENPTVBSRVBMWT0oICQoY29tcGdlbiAtVyAiJHtvcHRzfSIgLS0gJHtjdXJ9KSApCiAgICBlbHNlCiAgICAgICAgICMgc3dpdGNoIOWtkOWRveS7pAogICAgICAgIGNhc2UgJHtDT01QX1dPUkRTWzFdfSBpbgogICAgICAgICAgICB2ZXJzaW9uKQogICAgICAgICAgICAgICAgX19raW5nMDExX2pzZ2VuZXJhdGVfYmFzZQogICAgICAgICAgICA7OwogICAgICAgICAgICBjb21wbGV0ZSkKICAgICAgICAgICAgICAgIF9fa2luZzAxMV9qc2dlbmVyYXRlX2Jhc2UKICAgICAgICAgICAgOzsKICAgICAgICAgICAgaGVscCkKICAgICAgICAgICAgICAgIF9fa2luZzAxMV9qc2dlbmVyYXRlX2hlbHAKICAgICAgICAgICAgOzsKICAgICAgICAgICAgaW5pdCkKICAgICAgICAgICAgICAgIF9fa2luZzAxMV9qc2dlbmVyYXRlX2luaXQKICAgICAgICAgICAgOzsKICAgICAgICBlc2FjCiAgICBmaQp9CmNvbXBsZXRlIC1GIF9fa2luZzAxMV9qc2dlbmVyYXRlIGpzZ2VuZXJhdGU=", "base64").toString("utf8"));
});
var root = process.env["JS_GENERATE_TEMPLATE"];
if (root == undefined) {
    root = process.env.HOME || process.env.USERPROFILE;
    root = path_1.normalize(path_1.join(root, ".jsgenerate"));
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init_1.initCommand(program, path_1.join(root, "init"))];
                case 1:
                    _a.sent();
                    program.parse(process.argv);
                    return [2 /*return*/];
            }
        });
    });
})();
