System.register(["_ts/object/utility", "_ts/object/canvas", "_ts/class/point", "_ts/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, canvas_1, point_1, grid_1, ScorePopUp;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            ScorePopUp = class ScorePopUp {
                constructor(originator, x, y, value) {
                    this._originator = originator;
                    this._coordinate = new point_1.default(x, y);
                    this._value = value;
                    this.initialize();
                }
                //check for the end of pop up lifecycle
                get isAlive() {
                    return this._spawn + this._lifespan > utility_1.default.now;
                }
                get width() {
                    return this._width;
                }
                get height() {
                    return this._height;
                }
                initialize() {
                    this._width = grid_1.default.nodeSize * 1.8;
                    this._height = this._width;
                    this._spawn = utility_1.default.now;
                    this._lifespan = 1500;
                    this._cropWidth = 32;
                    this._tile = document.getElementById("tile");
                    this._ctx = canvas_1.default.popUp;
                    this.getCropXY();
                }
                reset() {
                    this.initialize();
                }
                //calculate crop location on tile image
                getCropXY() {
                    //default x, y value for 500 score pop up
                    let [x, y] = [224, 192];
                    if (this._value !== 500) {
                        x = (Math.log2(this._value / 100) - 1) * this._cropWidth;
                        y = 224;
                    }
                    this._cropXY = new point_1.default(x, y);
                }
                //erase pop up graphics only
                erase() {
                    this._ctx.clearRect(this._coordinate.x - this._width * 0.5, this._coordinate.y - this._height * 0.5, this._width, this._height);
                }
                //permanently delete pop up
                dispose() {
                    this._originator.popUps.delete(this);
                    this.erase();
                }
                draw() {
                    this.erase();
                    this._ctx.drawImage(this._tile, this._cropXY.x, this._cropXY.y, this._cropWidth, this._cropWidth, this._coordinate.x - this._width * 0.5, this._coordinate.y - this._height * 0.5, this._width, this._height);
                }
            };
            exports_1("default", ScorePopUp);
        }
    };
});
//# sourceMappingURL=scorePopUp.js.map