import request from "request";
import { GetFileArgs, PutFileArgs, Opts } from "./types";

export function isValidHash(hash: string): boolean {
  return /^[0-9a-f]{64}$/.test(hash);
}

export function getFile(args: GetFileArgs): Promise<any>;
export function getFile( args: GetFileArgs,  cb: (error: Error, result?: any) => void): void;

export function getFile(args: GetFileArgs, cb?: any): Promise<any> | void {
  if (cb && typeof (cb == "function")) {
    request(args.gateway + "/" + args.url, function(error, response, body) {
      if (error) {
        cb(error);
      } else if (response.statusCode !== 200) {
        cb(response.statusCode);
      } else {
        cb(null, body);
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      request(args.gateway + "/" + args.url, (error: Error, response: any) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(response.statusCode);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}

export function putFile(args: PutFileArgs): Promise<any>;
export function putFile(args: PutFileArgs,  cb: (error: Error, result?: any) => void): void;

export function putFile(args: PutFileArgs, cb?: any): Promise<any> | void {
  if (cb && typeof cb == "function") {
    request(
      {
        method: "POST",
        uri: args.gateway + "/bzz:/",
        headers: {
          "Content-Type": "text/plain"
        },
        body: args.content
      },
      (error: Error, response: any) => {
        if (error) {
          cb(error);
        } else if (response.statusCode !== 200) {
          cb(response.statusCode);
        } else if (!isValidHash(response.body)) {
          cb("Invalid hash");
        } else {
          cb(null, response.body);
        }
      }
    );
  } else {
    return new Promise((resolve, reject) => {
      request(
        {
          method: "POST",
          uri: args.gateway + "/bzz:/",
          headers: {
            "Content-Type": "text/plain"
          },
          body: args.content
        },
        (error: Error, response: any) => {
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
            reject(response.statusCode);
          } else if (!isValidHash(response.body)) {
            reject("Invalid hash");
          } else {
            resolve(response.body);
          }
        }
      );
    });
  }
}

export function handler(opts: Opts): any {
  let gateway: string;
  if (opts.gateway) {
    gateway = opts.gateway;
  } else if (opts.mode === "http") {
    gateway = "http://swarm-gateways.net";
  } else {
    gateway = "https://swarm-gateways.net";
  }
  return {
    get: (url: string) => {
      return getFile({ gateway, url });
    },
    put: (content: any) => {
      return putFile({ gateway, content });
    }
  };
}
