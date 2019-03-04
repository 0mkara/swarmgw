export declare function isValidHash(hash: string): boolean;
interface getFileArgs {
    gateway: string;
    url: string;
}
export declare function getFile(args: getFileArgs): any;
interface putFileArgs {
    gateway: string;
    content: any;
}
export declare function putFile(args: putFileArgs): any;
interface opts {
    gateway: string;
    mode: string;
}
export declare function handler(opts: opts): any;
export {};
