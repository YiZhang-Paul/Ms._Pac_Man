require("jsdom-global")("<!doctype html><html><body id='board'></body></html>");
import Canvas from "../src/object/canvas";
import { expect } from "chai";
import "mocha";

context("canvas test", function() {

    describe("create()", function() {

        it("get canvas", function() {

            let canvas = Canvas.create(500, 700, 2).canvas;

            expect(canvas).to.be.an.instanceof(HTMLCanvasElement);
            expect(canvas.width).to.equal(500);
            expect(canvas.height).to.equal(700);
        });
    });
});