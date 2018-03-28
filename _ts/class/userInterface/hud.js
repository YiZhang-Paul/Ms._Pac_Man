System.register(["_ts/object/monitor", "_ts/object/canvas", "_ts/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, canvas_1, grid_1, Hud;
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
            Hud = class Hud {
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
                    this._loaded = false;
                    this._iconSize = grid_1.default.nodeSize * 2;
                    this._margin = this._height * 0.05;
                    this._cropWidth = 32;
                    this._tile = document.getElementById("tile");
                    this._ctx = canvas_1.default.interface;
                    this.draw();
                }
                reset() {
                    this.draw();
                }
                load() {
                    if (!this._loaded && this._tile.complete) {
                        this.draw();
                        this._loaded = true;
                    }
                }
                showLife() {
                    //exclude current player life
                    for (let i = 0; i < this._originator.life - 1; i++) {
                        this._ctx.drawImage(this._tile, this._cropWidth, this._cropWidth, this._cropWidth, this._cropWidth, i * (this._iconSize + this._margin), monitor_1.default.height - this._height + this._margin, this._iconSize, this._iconSize);
                    }
                }
                showFruits() {
                    let fruits = this._originator.foodManager.fruitQueue;
                    //display fruit queue from head to tail
                    for (let i = fruits.length - 1; i >= 0; i--) {
                        this._ctx.drawImage(this._tile, this._cropWidth * (fruits[i] - 1), this._cropWidth * 6, this._cropWidth, this._cropWidth, this._width - (fruits.length - i) * (this._iconSize + this._margin), monitor_1.default.height - this._height + this._margin, this._iconSize, this._iconSize);
                    }
                }
                draw() {
                    this._ctx.clearRect(0, monitor_1.default.height - this._height, this._width, this._height);
                    this.showLife();
                    this.showFruits();
                }
            };
            exports_1("default", Hud);
        }
    };
});
//# sourceMappingURL=hud.js.map