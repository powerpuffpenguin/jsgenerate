#!/usr/bin/env node
import { readFile } from "fs";
import { join } from "path";

readFile(join(__dirname, "..", "complete.sh"), (e, data) => {
    if (e) {
        throw e
    }
    console.log(data.toString("base64"))
})