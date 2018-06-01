"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../src/class/node");
const chai_1 = require("chai");
require("mocha");
//test begin
context("node test", function () {
    const node = new node_1.default(5, 8);
    let otherNode;
    describe("key() getter", function () {
        it("get key", function () {
            chai_1.expect(node.key).to.equal("5,8");
        });
    });
    describe("isSame()", function () {
        it("is same node", function () {
            otherNode = new node_1.default(node.row, node.column);
            chai_1.expect(node.isSame(otherNode)).to.be.true;
        });
        it("is different node", function () {
            otherNode = new node_1.default(node.row + 1, node.column + 1);
            chai_1.expect(node.isSame(otherNode)).to.be.false;
        });
    });
    //test end
});
//# sourceMappingURL=node.test.js.map