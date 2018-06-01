"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("../src/class/point");
const chai_1 = require("chai");
require("mocha");
//test begin
context("point test", function () {
    const point = new point_1.default(5, 5);
    let otherPoint;
    describe("isSame()", function () {
        it("is same point", function () {
            otherPoint = new point_1.default(point.x, point.y);
            chai_1.expect(point.isSame(otherPoint)).to.be.true;
        });
        it("is different point", function () {
            otherPoint = new point_1.default(point.x + 1, point.y + 1);
            chai_1.expect(point.isSame(otherPoint)).to.be.false;
        });
    });
    describe("distanceTo()", function () {
        it("find distance", function () {
            otherPoint = new point_1.default(point.x, point.y);
            chai_1.expect(point.distanceTo(otherPoint)).to.equal(0);
            otherPoint = new point_1.default(point.x + 3, point.y + 4);
            chai_1.expect(point.distanceTo(otherPoint)).to.equal(5);
        });
    });
    //test end
});
//# sourceMappingURL=point.test.js.map