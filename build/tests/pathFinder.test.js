"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathfinder_1 = require("../src/class/pathfinder");
const chai_1 = require("chai");
const Sinon = require("sinon");
require("mocha");
function getNode(key = "") {
    let node = { get key() { return key; } };
    node.isSame = Sinon.fake.returns(false);
    return node;
}
function getPath(total, keys) {
    if (keys.length !== total) {
        throw "Invalid Keys.";
    }
    let path = new Array();
    for (let i = 0; i < total; i++) {
        path[i] = getNode(keys[i]);
    }
    return path;
}
//test begin
context("path finder test", function () {
    const pathFinder = new pathfinder_1.default({});
    describe("contains()", function () {
        let path;
        let node;
        beforeEach("initialize path and node", function () {
            path = getPath(5, new Array(5).fill(""));
            node = getNode();
        });
        it("contains node", function () {
            path[1].isSame = Sinon.fake.returns(true);
            node.isSame = Sinon.fake.returns(true);
            chai_1.expect(pathFinder.contains(path, node)).to.be.true;
        });
        it("does not contain node", function () {
            chai_1.expect(pathFinder.contains(path, node)).to.be.false;
        });
    });
    describe("coincides()", function () {
        let path1;
        let path2;
        beforeEach("initialize path and node", function () {
            path1 = getPath(5, ["1", "2", "3", "4", "5"]);
            path2 = getPath(5, ["6", "7", "8", "9", "10"]);
        });
        it("coincides", function () {
            path2 = getPath(5, ["3", "7", "8", "9", "10"]);
            path1[1].isSame = Sinon.fake.returns(true);
            path2[1].isSame = Sinon.fake.returns(true);
            chai_1.expect(pathFinder.coincides(path1, path2)).to.be.true;
        });
        it("does not coincide", function () {
            chai_1.expect(pathFinder.coincides(path1, path2)).to.be.false;
        });
    });
    //test end
});
//# sourceMappingURL=pathFinder.test.js.map