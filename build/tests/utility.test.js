"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../src/object/utility");
const chai_1 = require("chai");
require("mocha");
describe("capitalizeWord", () => {
    it("return capitalized word", () => {
        chai_1.expect(utility_1.default.capitalize("word")).to.equal("Word");
    });
});
//# sourceMappingURL=utility.test.js.map