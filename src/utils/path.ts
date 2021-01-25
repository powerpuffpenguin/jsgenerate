import { promises } from "fs";
import { join } from "path";
const match = /^[a-zA-Z][a-zA-Z0-9\-\_\.]*$/
export function Match(str: string): boolean {
    if (str.indexOf("..") != -1 ||
        str.indexOf("--") != -1 ||
        str.indexOf("__") != -1) {
        return false
    }
    return match.test(str)
}
export class Template {
    constructor(public readonly dirname: string,
        public readonly filename: string,
        public readonly generate: Function) {
    }
    description: string = ''
    tag: string = ''
}
async function createTemplate(dirname: string, filename: string): Promise<Template> {
    const ctx = require(join(dirname, filename, "jsgenerate", "main.js"))
    if (typeof ctx.jsgenerate === 'function') {
        const result = new Template(dirname, filename, ctx.jsgenerate)
        if (typeof ctx.description === 'string') {
            result.description = ctx.description
        }
        if (typeof ctx.tag === 'string') {
            result.tag = ctx.tag
        }
        return result
    }
    return null
}
export async function listTemplates(filename: string): Promise<Array<Template>> {
    const ts = new Array<Template>()
    const dir = await promises.opendir(filename)
    for await (const dirent of dir) {
        if (!dirent.isDirectory()) {
            continue
        }
        if (Match(dirent.name)) {
            try {
                const t = await createTemplate(filename, dirent.name)
                if (t) {
                    ts.push(t)
                }
            } catch (e) {
            }
        }
    }
    return ts
}