#!/usr/bin/env node
import { normalize, join } from "path";
import { Command } from "commander";
import { Version } from "./version";
import { initCommand } from "./command/init";

const program = new Command('jsgenerate')
program
    .command(`version`)
    .description(`display version`)
    .action(() => {
        console.log(Version)
    })
program.command(`complete`)
    .description(`generate bash complete code`)
    .action(() => {
        console.log("ok")
    })
let root = process.env["JS_GENERATE_TEMPLATE"]
if (root == undefined) {
    root = process.env.HOME || process.env.USERPROFILE
    root = normalize(join(root as string, ".jsgenerate"))
}

(async function () {
    await initCommand(program as any, join(root, `init`))
    program.parse(process.argv)
})()
