import Point from "../src/class/point";
import { expect } from "chai";
import "mocha";
import { POINT_CONVERSION_COMPRESSED } from "constants";
//test begin
context("point test", function() {

const point = new Point(5, 5);
let otherPoint: Point;

describe("isSame()", function() {

    it("is same point", function() {

        otherPoint = new Point(point.x, point.y);

        expect(point.isSame(otherPoint)).to.be.true;
    });

    it("is different point", function() {

        otherPoint = new Point(point.x + 1, point.y + 1);

        expect(point.isSame(otherPoint)).to.be.false;
    });
});

describe("distanceTo()", function() {

    it("find distance", function() {

        otherPoint = new Point(point.x, point.y);

        expect(point.distanceTo(otherPoint)).to.equal(0);

        otherPoint = new Point(point.x + 3, point.y + 4);

        expect(point.distanceTo(otherPoint)).to.equal(5);
    });
});

//test end
});