# jsgenerate

[中文](https://github.com/powerpuffpenguin/jsgenerate/blob/master/README_ZH.md)

A code generation tool in nodejs environment

With the help of js flexibility and art-template templates to automatically generate some user-definable template codes

# install

After installing the nodejs environment, execute the following instructions

```
npm install -g @king011/jsgenerate
```

# update

```
npm update -g @king011/jsgenerate
```

# bash complete

Entering the command `jsgenerate complete` will generate a bash complete auto-complete script for linux

# init

Use the `jsgenerate init` command to create the initialization code using the specified template in the current directory

```
Options:
  -n, --name []        project name
  -p, --package []     package name
  -t, --tag [tags...]  code generate tag
  --list-tag           list supported tag
  -h, --help           display help for command
```

```
jsgenerate init jsgenerate_grpc -p penguin/example -t default -t init-supplement
```

* **jsgenerate_grpc** is the name of the template used 
* **-p** specify the package name of the project
* **-t** is the label passed to the template. The template can define the meaning of the label.

# template 

If the environment variable **JS_GENERATE_TEMPLATE** is specified, the template is stored in the path specified by JS_GENERATE_TEMPLATE, otherwise it is stored in the path of **~/.jsgenerate**

## init template

You can refer to [jsgenerate_grpc](https://github.com/powerpuffpenguin/jsgenerate_grpc) to implement your own template

To create a template used by the init command, you need to follow the steps below

1. Create a new folder under the init folder of the template root path, such as web (jsgenerate will use the name of this folder as the template name)
2. Create a js file of web/jsgenerate/main.js and export three attributes of description tag jsgenerate

Now the web template has been created, you can use `jsgenerate init jsgenerate_grpc -p xxx` to use this template

* **description** is a string used to describe the function of this template
* **tag** is used to indicate the tags supported by this template
* **jsgenerate** is a function with the signature `function jsgenerate(context: Context)`, which will be called by the jsgenerate program. You need to implement code generation in this function

# Context

The incoming parameter Context of jsgenerate generates the context required by the code and some useful member functions

```
/// <reference types="node" />
import { Stats } from "fs";
export declare class Context {
    readonly tag: Array<string>;
    readonly root: string;
    readonly output: string;
    readonly data: Map<string, any>;
    readonly version = "1.0.2";
    private pkg_;
    private name_;
    get pkg(): string;
    get name(): string;
    constructor(pkg: string, name: string, tag: string, root: string, output: string);
    serve(renderFile: (name: string, src: string, stat: Stats) => void | Promise<undefined>, renderDir: (name: string, src: string, stat: Stats) => void | Promise<undefined>): Promise<void>;
    private _name;
    private _serve;
    get extension(): {
        [key: string]: Function;
    };
    get defaults(): {
        filename?: string;
        rules: any[];
        excape: boolean;
        debug: boolean;
        bail: boolean;
        cache: boolean;
        minimize: boolean;
        compileDebug: boolean;
        resolveFilename: any;
        include: any;
        htmlMinifier: any;
        htmlMinifierOptions: {
            collapseWhitespace: boolean;
            minifyCSS: boolean;
            minifyJS: boolean;
            ignoreCustomFragments: any[];
        };
        onerror: any;
        loader: any;
        caches: any;
        root: string;
        extname: string;
        ignore: any[];
        imports: {
            [key: string]: Function;
        };
    };
    template(filenameOrTemplateId: string, content?: string | Object): any;
    compile(source: string, options?: any): (data: any) => string;
    render(source: string, data: any, options?: any): string;
    mkdir(path: string, recursive?: boolean, mode?: string | number): Promise<string>;
    copyFile(dst: string, src: string, mode?: string | number): Promise<void>;
    writeFile(dst: string, text: string, mode?: string | number, encoding?: BufferEncoding): Promise<void>;
    uuidv1(): string;
    uuidv4(): string;
}
```

* **serve** is the most important function. You need to call this function and pass in two callback functions to create files and folders for the project
* **template compile render** three functions are used to call the art-template template engine
