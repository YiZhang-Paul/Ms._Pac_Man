"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("../../object/canvas");
class Maze {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this.initialize();
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    //current tile image
    get tile() {
        const id = this._tick ? "maze_clipped" : "maze";
        return document.getElementById(id);
    }
    initialize() {
        this._tick = 0;
        this._ctx = canvas_1.default.background;
        this.draw();
    }
    reset() {
        this.initialize();
    }
    //change to next tick
    flip() {
        this._tick = this._tick === 0 ? 1 : 0;
    }
    //blink maze borders
    blink() {
        this.flip();
        this.draw();
    }
    draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);
        this._ctx.drawImage(this.tile, 0, 0, this._width, this._height);
    }
}
exports.default = Maze;
//# sourceMappingURL=maze.js.map