System.register(["_ts/object/canvas"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var canvas_1, Maze;
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            }
        ],
        execute: function () {
            Maze = class Maze {
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
            };
            exports_1("default", Maze);
        }
    };
});
//# sourceMappingURL=maze.js.map