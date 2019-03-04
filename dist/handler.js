"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
function isValidHash(hash) {
    return /^[0-9a-f]{64}$/.test(hash);
}
exports.isValidHash = isValidHash;
function getFile(args) {
    return new Promise(function (resolve, reject) {
        request(args.gateway + "/" + args.url, function (error, response) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode !== 200) {
                resolve(response.body);
            }
            else {
                resolve(response.body);
            }
        });
    });
}
exports.getFile = getFile;
function putFile(args) {
    return new Promise((resolve, reject) => {
        request({
            method: "POST",
            uri: args.gateway + "/bzz-raw:/",
            body: args.content
        }, function (error, response) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode !== 200) {
                resolve(response.body);
            }
            else if (!isValidHash(response.body)) {
                reject("Invalid hash");
            }
            else {
                resolve(response.body);
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
            return getFile({ gateway, url });
        },
        put: function (content) {
            return putFile({ gateway, content });
        }
    };
}
exports.handler = handler;
