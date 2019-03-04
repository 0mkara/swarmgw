const request = require("request");

export function isValidHash(hash: string): boolean {
  return /^[0-9a-f]{64}$/.test(hash);
}

interface getFileArgs {
  gateway: string;
  url: string;
}

interface requestCB {
  error?: Error;
  response?: {
    statusCode?: number;
  };
  body: string;
}

export function getFile(args: getFileArgs): any {
  return new Promise(function(resolve, reject) {
    request(args.gateway + "/" + args.url, function(
      error: Error,
      response: any
    ) {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        resolve(response.body);
      } else {
        resolve(response.body);
      }
    });
  });
}

interface putFileArgs {
  gateway: string;
  content: any;
}

export function putFile(args: putFileArgs): any {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "POST",
        uri: args.gateway + "/bzz-raw:/",
        body: args.content
      },
      function(error: Error, response: any) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          resolve(response.body);
        } else if (!isValidHash(response.body)) {
          reject("Invalid hash");
        } else {
          resolve(response.body);
        }
      }
    );
  });
}

interface opts {
  gateway: string;
  mode: string;
}

export function handler(opts: opts): any {
  //   opts = opts || {};
  var gateway: string;
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
