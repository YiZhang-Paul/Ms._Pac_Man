import Canvas from "../src/object/canvas";
import * as jsdom from "jsdom-global";
import { expect } from "chai";
import "mocha";

jsdom("<!doctype html><html><body id='board'></body></html>");

//test begin
context("canvas test", function() {

describe("create()", function() {

    it("get canvas", function() {

        let canvas = Canvas.create(500, 700, 2).canvas;

        expect(canvas).to.be.an.instanceof(HTMLCanvasElement);
        expect(canvas.width).to.equal(500);
        expect(canvas.height).to.equal(700);
    });
});

//test end
});