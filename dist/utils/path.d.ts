export declare function Match(str: string): boolean;
export declare class Template {
    readonly dirname: string;
    readonly filename: string;
    readonly generate: Function;
    constructor(dirname: string, filename: string, generate: Function);
    description: string;
}
export declare function listTemplates(filename: string): Promise<Array<Template>>;
