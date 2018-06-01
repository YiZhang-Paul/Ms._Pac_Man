"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("../src/object/canvas");
const jsdom = require("jsdom-global");
const chai_1 = require("chai");
require("mocha");
jsdom("<!doctype html><html><body id='board'></body></html>");
//test begin
context("canvas test", function () {
    describe("create()", function () {
        it("get canvas", function () {
            let canvas = canvas_1.default.create(500, 700, 2).canvas;
            chai_1.expect(canvas).to.be.an.instanceof(HTMLCanvasElement);
            chai_1.expect(canvas.width).to.equal(500);
            chai_1.expect(canvas.height).to.equal(700);
        });
    });
    //test end
});
//# sourceMappingURL=canvas.test.js.map