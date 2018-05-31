"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("../src/object/canvas");
require("mocha");
context("canvas test", function () {
    describe("create()", function () {
        it("get canvas", function () {
            let canvas = canvas_1.default.create(500, 700, 2);
            //expect(canvas).to.be.an.instanceof(CanvasRenderingContext2D);
        });
    });
});
//# sourceMappingURL=canvas.test.js.map