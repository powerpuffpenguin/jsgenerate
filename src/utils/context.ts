import { promises, Stats } from "fs";
import { join } from "path";
import * as art from "art-template";
import { v1, v4 } from 'uuid';
import { Version } from "../version";
const match = /^[a-zA-Z@][a-zA-Z0-9\-\_\.\/@]*$/
function Match(str: string): boolean {
    if (str.indexOf("..") != -1 ||
        str.indexOf("--") != -1 ||
        str.indexOf("__") != -1 ||
        str.indexOf("__") != -1 ||
        str.indexOf("@@") != -1) {
        return false
    }
    return match.test(str)
}
export class Context {
    readonly data = new Map<string, any>()
    readonly version = Version
    private pkg_: string
    private name_: string
    get pkg(): string {
        return this.pkg_
    }
    get name(): string {
        return this.name_
    }
    constructor(pkg: string,
        name: string,
        public readonly tag: string,
        public readonly root: string,
        public readonly output: string,
    ) {
        if (!(typeof pkg === 'string')) {
            throw new Error(`unknow package`)
        }
        pkg = pkg.trim()
        if (pkg.length == 0 || !Match(pkg)) {
            throw new Error(`not supported package name`)
        }
        if (!(typeof name === 'string')) {
            name = pkg
            let f1 = name.lastIndexOf(".")
            let f2 = name.lastIndexOf("/")
            if (f2 != -1) {
                if (f1 == -1) {
                    f1 = f2
                } else {
                    f1 = f1 > f2 ? f1 : f2
                }
            }
            if (f1 != -1) {
                name = name.substr(f1 + 1)
            }
        }
        name = name.trim()
        if (name.length == 0 || !Match(name)) {
            throw new Error(`not supported project name`)
        }
        this.pkg_ = pkg
        this.name_ = name
    }
    async serve(renderFile: (name: string, src: string, stat: Stats) => void | Promise<undefined>, renderDir: (name: string, src: string, stat: Stats) => void | Promise<undefined>) {
        await this._serve(this.root, undefined, renderFile, renderDir)
    }
    private _name(prefix: string, name: string): string {
        if (prefix === undefined) {
            return name
        }
        return join(prefix, name)
    }
    private async _serve(root: string, prefix: string, renderFile: (name: string, src: string, stat: Stats) => void | Promise<undefined>, renderDir: (name: string, src: string, stat: Stats) => void | Promise<undefined>) {
        const dir = await promises.opendir(root)
        for await (const dirent of dir) {
            const name = this._name(prefix, dirent.name)
            if (name == 'jsgenerate') {
                // 跳過定製檔案
                continue
            }
            const filename = join(root, dirent.name)
            const stat = await promises.stat(filename)
            if (dirent.isFile()) {
                await renderFile(name, filename, stat)
            } else if (dirent.isDirectory()) {
                await renderDir(name, filename, stat)
                await this._serve(join(root, dirent.name),
                    prefix === undefined ? dirent.name : join(prefix, dirent.name),
                    renderFile, renderDir,
                )
            }
        }
    }
    get extension() {
        return art.extension
    }
    get defaults() {
        return art.defaults
    }
    template(filenameOrTemplateId: string, content?: string | Object): any {
        return art.default(filenameOrTemplateId, content)
    }
    compile(source: string, options?: any): (data: any) => string {
        return art.compile(source, options)
    }
    render(source: string, data: any, options?: any): string {
        return art.render(source, data, options)
    }
    mkdir(path: string, recursive?: boolean, mode?: string | number): Promise<string> {
        if (typeof recursive === 'boolean' && !recursive) {
            recursive = false
        } else {
            recursive = true
        }
        if (!(typeof mode === 'string' || typeof mode === 'number')) {
            mode = 0o775
        }
        return promises.mkdir(path, {
            recursive: recursive,
            mode: mode,
        })
    }
    async copyFile(dst: string, src: string, mode?: string | number): Promise<void> {
        if (!(typeof mode === 'string' || typeof mode === 'number')) {
            mode = 0o664
        }
        await promises.copyFile(src, dst)
        await promises.chmod(dst, mode)
    }
    async writeFile(dst: string, text: string, mode?: string | number, encoding?: BufferEncoding): Promise<void> {
        if (!(typeof mode === 'string' || typeof mode === 'number')) {
            mode = 0o664
        }
        if (!(typeof encoding === 'string')) {
            encoding = "utf8"
        }
        await promises.writeFile(dst, text, {
            encoding: encoding,
            mode: mode,
        })
    }
    uuidv1() {
        return v1()
    }
    uuidv4() {
        return v4()
    }
}