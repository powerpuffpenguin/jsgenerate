#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
fs_1.readFile(path_1.join(__dirname, "..", "complete.sh"), function (e, data) {
    if (e) {
        throw e;
    }
    console.log(data.toString("base64"));
});
