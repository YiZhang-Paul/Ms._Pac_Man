System.register(["src/object/monitor", "src/object/canvas", "src/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, canvas_1, grid_1, ScoreBoard;
    return {
        setters: [
            function (monitor_1_1) {
                monitor_1 = monitor_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            ScoreBoard = class ScoreBoard {
                constructor(originator) {
                    this._originator = originator;
                    this.initialize();
                }
                get width() {
                    return this._width;
                }
                get height() {
                    return this._height;
                }
                initialize() {
                    this._width = grid_1.default.width;
                    this._height = (monitor_1.default.height - grid_1.default.height) * 0.5;
                    this._fontSize = this._height * 0.45;
                    this._interval = null;
                    this._tick = 0;
                    this._ctx = canvas_1.default.interface;
                    this.draw();
                    this.blinkId();
                }
                reset() {
                    //stop blinking player id
                    if (this._interval !== null) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }
                    this._tick = 0;
                    this.draw();
                }
                //change to next tick
                flip() {
                    this._tick = this._tick === 0 ? 1 : 0;
                }
                //blink player id
                blinkId() {
                    if (this._interval === null) {
                        this._interval = setInterval(() => {
                            this.flip();
                            this.draw();
                        }, 150);
                    }
                }
                drawTexts(texts) {
                    for (let i = 0; i < texts.length; i++) {
                        for (let j = 0; j < texts[i].length; j++) {
                            //blink player id and always draw other texts
                            if (i !== 0 || j !== 0 || this._tick !== 0) {
                                this._ctx.fillText(texts[i][j], this._width * (0.2 + i * 0.4), this._height * (0.5 + j * 0.43));
                            }
                        }
                    }
                }
                draw() {
                    this._ctx.clearRect(0, 0, this._width, this._height);
                    this._ctx.font = this._fontSize + "px 'Lucida Console'";
                    this._ctx.textAlign = "center";
                    this._ctx.fillStyle = "white";
                    this.drawTexts([
                        [`${this._originator.id}UP`, String(this._originator.score)],
                        ["HIGH SCORE", String(this._originator.highest)]
                    ]);
                }
            };
            exports_1("default", ScoreBoard);
        }
    };
});
//# sourceMappingURL=scoreBoard.js.map