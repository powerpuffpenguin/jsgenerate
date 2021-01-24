import { Command } from "commander";
import { listTemplates } from "../utils/path";
import { Context } from "../utils/context";
import { join } from "path";

export async function initCommand(parent: Command, path: string) {
    const cmd = parent.command(`init`)
        .description(`generate project init code`)
        .option(`--list`, `list template names`)
        .action(async function () {
            const list = this.opts()["list"]
            const ts = await listTemplates(path)
            if (ts && ts.length) {
                ts.forEach((t) => {
                    if (list) {
                        console.log(t.filename)
                    } else {
                        console.log(`for help use : jsgenerate init ${t.filename} -h`)
                    }
                })
            } else {
                if (!list) {
                    console.log(`not found template on directory : ${path}`)
                }
            }
        })

    const ts = await listTemplates(path)
    ts.forEach((t) => {
        cmd.command(t.filename)
            .description(t.description)
            .option(`-n, --name []`,
                `project name`,
            ).option(`-p, --package []`,
                `package name`,
            ).action(function () {
                const context = new Context(
                    this.opts()["package"], this.opts()["name"],
                    join(t.dirname, t.filename), process.cwd(),
                )
                t.generate(context)
            })
    })
}
