"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("../src/object/control");
const chai_1 = require("chai");
require("mocha");
//test begin
context("control test", function () {
    beforeEach("initialize key pressed", function () {
        control_1.default.pressedKeys = new Array();
    });
    describe("active() getter", function () {
        it("get active key when no key pressed", function () {
            chai_1.expect(control_1.default.active).to.be.null;
        });
        it("get active key", function () {
            control_1.default.pressedKeys = [33, 67];
            chai_1.expect(control_1.default.active).to.equal(67);
        });
    });
    describe("isPressed()", function () {
        it("when key is pressed", function () {
            chai_1.expect(control_1.default.isPressed(67)).to.be.false;
            control_1.default.pressedKeys = [33, 67, 122, 96];
            chai_1.expect(control_1.default.isPressed(67)).to.be.true;
        });
        it("when key is not pressed", function () {
            control_1.default.pressedKeys = [33, 67, 122];
            chai_1.expect(control_1.default.isPressed(96)).to.be.false;
        });
    });
    describe("add()", function () {
        it("add new key", function () {
            control_1.default.pressedKeys = [33, 67];
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67]);
            control_1.default.add(122);
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67, 122]);
        });
        it("add duplicate key", function () {
            control_1.default.pressedKeys = [33, 67];
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67]);
            control_1.default.add(33);
            control_1.default.add(67);
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67]);
        });
    });
    describe("remove()", function () {
        it("remove pressed key", function () {
            control_1.default.pressedKeys = [33, 67, 122];
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67, 122]);
            control_1.default.remove(67);
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 122]);
        });
        it("remove not pressed key", function () {
            control_1.default.pressedKeys = [33, 67, 122];
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67, 122]);
            control_1.default.remove(96);
            chai_1.expect(control_1.default.pressedKeys).to.deep.equal([33, 67, 122]);
        });
    });
    //test end
});
//# sourceMappingURL=control.test.js.map