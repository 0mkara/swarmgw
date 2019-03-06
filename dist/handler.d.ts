import { getFileArgs, putFileArgs, opts } from "./types";
export declare function isValidHash(hash: string): boolean;
export declare function getFile(args: getFileArgs): Promise<any>;
export declare function putFile(args: putFileArgs): Promise<any>;
export declare function handler(opts: opts): any;
