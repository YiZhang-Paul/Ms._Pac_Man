"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../src/object/utility");
const chai_1 = require("chai");
require("mocha");
//test begin
context("utility test", function () {
    describe("capitalize()", function () {
        it("capitalize lowercased word", function () {
            chai_1.expect(utility_1.default.capitalize("lowercase")).to.equal("Lowercase");
        });
        it("capitalize uppercased word", function () {
            chai_1.expect(utility_1.default.capitalize("UPPERCASE")).to.equal("UPPERCASE");
        });
    });
    describe("roundTo()", function () {
        it("round to 2 decimal places", function () {
            chai_1.expect(utility_1.default.roundTo(5.333333, 2)).to.equal(5.33);
        });
        it("round integer", function () {
            chai_1.expect(utility_1.default.roundTo(5, 2)).to.equal(5);
        });
    });
    describe("swap()", function () {
        let array;
        beforeEach("initialize array", function () {
            array = [1, 2, 3];
        });
        it("swap valid indexes", function () {
            utility_1.default.swap(array, 0, 2);
            chai_1.expect(array).to.deep.equal([3, 2, 1]);
        });
        it("swap invalid indexes", function () {
            chai_1.expect(utility_1.default.swap.bind(utility_1.default, array, -1, 2)).to.throw();
            chai_1.expect(utility_1.default.swap.bind(utility_1.default, array, 0, 3)).to.throw();
        });
    });
    describe("randomElement<T>()", function () {
        it("get random value", function () {
            let array = [1, 2, 3];
            for (let i = 0; i < 50; i++) {
                chai_1.expect(array).to.include(utility_1.default.randomElement(array));
            }
        });
    });
    describe("lastElement<T>()", function () {
        let array;
        it("last element of non-empty array", function () {
            array = [1, 2, 3];
            chai_1.expect(utility_1.default.lastElement(array)).to.equal(3);
        });
        it("last element of empty array", function () {
            array = new Array();
            chai_1.expect(utility_1.default.lastElement(array)).to.be.null;
        });
    });
    describe("removeElement<T>()", function () {
        let array;
        it("remove element without duplicate from array", function () {
            array = [1, 2, 3];
            chai_1.expect(array).to.deep.equal([1, 2, 3]);
            utility_1.default.removeElement(array, 2);
            chai_1.expect(array).to.deep.equal([1, 3]);
        });
        it("remove element with duplicate from array", function () {
            array = [1, 2, 3, 2];
            chai_1.expect(array).to.deep.equal([1, 2, 3, 2]);
            utility_1.default.removeElement(array, 2);
            chai_1.expect(array).to.deep.equal([1, 3, 2]);
        });
        it("remove element that is not in array", function () {
            array = [1, 2, 3];
            chai_1.expect(array).to.deep.equal([1, 2, 3]);
            utility_1.default.removeElement(array, 4);
            chai_1.expect(array).to.deep.equal([1, 2, 3]);
        });
    });
    describe("getRandom()", function () {
        it("get random value", function () {
            for (let i = 0; i < 50; i++) {
                chai_1.expect(utility_1.default.getRandom(5, 7)).to.be.within(5, 7);
            }
        });
    });
    describe("getRangeCenter()", function () {
        it("get middle of a range with even number of values", function () {
            chai_1.expect(utility_1.default.getRangeCenter(6)).to.be.equal(3);
        });
        it("get middle of a range with odd number of values", function () {
            chai_1.expect(utility_1.default.getRangeCenter(5)).to.be.equal(3);
        });
    });
    //test end
});
//# sourceMappingURL=utility.test.js.map