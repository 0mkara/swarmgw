import request from "request";
import { getFileArgs, putFileArgs, opts } from "./types";

export function isValidHash(hash: string): boolean {
  return /^[0-9a-f]{64}$/.test(hash);
}

export function getFile(args: getFileArgs): Promise<any> {
  return new Promise(function(resolve, reject) {
    request(args.gateway + "/" + args.url, function(
      error: Error,
      response: any
    ) {
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

export function putFile(args: putFileArgs): Promise<any> {
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
      function(error: Error, response: any) {
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

export function handler(opts: opts): any {
  let gateway: string;
  if (opts.gateway) {
    gateway = opts.gateway;
  } else if (opts.mode === "http") {
    gateway = "http://swarm-gateways.net";
  } else {
    gateway = "https://swarm-gateways.net";
  }
  return {
    get: function(url: string) {
      return getFile({ gateway, url });
    },
    put: function(content: any) {
      return putFile({ gateway, content });
    }
  };
}
