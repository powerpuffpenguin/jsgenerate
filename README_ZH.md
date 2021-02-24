# jsgenerate

[English](https://github.com/powerpuffpenguin/jsgenerate/blob/master/README_ZH.md)

nodejs 環境下的一個代碼生成 工具 

藉助 js的靈活 和 art-template 模板 來自動生成一些用戶 可定義的 模板代碼 

# 安裝

在安裝nodejs環境後 執行 如下指令

```
npm install -g @king011/jsgenerate
```

# 更新

```
npm update -g @king011/jsgenerate
```

# bash complete

輸入 `jsgenerate complete`  指令 將會爲linux生成 bash complete 自動完成腳本

# init

使用 `jsgenerate init` 指令可以在當前目錄下使用 指定模板創建初始化代碼

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

* **jsgenerate_grpc** 是使用的模板名稱 
* **-p** 指定項目的包名
* **-t** 是傳遞給模板的 標籤 模板可以自行定義標籤的含義

# template 

如果指定了環境變量 **JS_GENERATE_TEMPLATE** 則模板 存儲在 JS_GENERATE_TEMPLATE 指定的路徑下 否則存儲在 **~/.jsgenerate** 路徑下

## init template

你可以 參考 [jsgenerate_grpc](https://github.com/powerpuffpenguin/jsgenerate_grpc) 來實現你自己的模板

要創建一個 init 指令使用的模板 需要遵循如下步驟

1. 在模板根路徑的init檔案夾下創建一個 新檔案夾 例如 web (jsgenerate會使用此檔案夾的名稱作爲模板名)
2. 創建一個 web/jsgenerate/main.js 的js檔案 並且導出 description tag jsgenerate 三個屬性

此時web模板已經創建好 你可以使用 `jsgenerate init jsgenerate_grpc -p xxx` 來使用此模板

* **description** 是一個字符串 用於描述 此模板的功能
* **tag** 用於提示此模板支持的標籤
* **jsgenerate** 是一個簽名爲 `function jsgenerate(context: Context)` 的函數 會被jsgenerate 程式呼叫，你需要在此函數中實現代碼生成工作

# Context

jsgenerate 的傳入參數 Context 生成代碼所需要的 上下文 以及一些有用的成員函數

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

* **serve** 是最重要的函數 你需要調用此函數 並傳入兩個回調函數 用於爲項目創建檔案和檔案夾
* **template compile render** 三個函數用於 調用 art-template 模板引擎
