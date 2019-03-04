"use strict";
exports.__esModule = true;
var request = require("request");
function isValidHash(hash) {
    return /^[0-9a-f]{64}$/.test(hash);
}
exports.isValidHash = isValidHash;
function getFile(args) {
    return new Promise(function (resolve, reject) {
        request(args.gateway + "/" + args.url, function (args) {
            if (args.error) {
                reject(args.error);
            }
            else if (args.response.statusCode !== 200) {
                resolve(args.body);
            }
            else {
                resolve(args.body);
            }
        });
    });
}
exports.getFile = getFile;
function putFile(args) {
    return new Promise(function (resolve, reject) {
        request({
            method: "POST",
            uri: args.gateway + "/bzz-raw:/",
            body: args.content
        }, function (args) {
            if (args.error) {
                reject(args.error);
            }
            else if (args.response.statusCode !== 200) {
                resolve(args.body);
            }
            else if (!isValidHash(args.body)) {
                reject("Invalid hash");
            }
            else {
                resolve(args.body);
            }
        });
    });
}
exports.putFile = putFile;
function handler(opts) {
    //   opts = opts || {};
    var gateway;
    if (opts.gateway) {
        gateway = opts.gateway;
    }
    else if (opts.mode === "http") {
        gateway = "http://swarm-gateways.net";
    }
    else {
        gateway = "https://swarm-gateways.net";
    }
    return {
        get: function (url) {
            return getFile({ gateway: gateway, url: url });
        },
        put: function (content) {
            return putFile({ gateway: gateway, content: content });
        }
    };
}
exports.handler = handler;
