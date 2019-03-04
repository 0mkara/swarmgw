"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
test("Tests isValidhash function", () => {
    let mockHash = "j2nkr";
    expect(index_js_1.isValidHash(mockHash)).toBe(false);
});
