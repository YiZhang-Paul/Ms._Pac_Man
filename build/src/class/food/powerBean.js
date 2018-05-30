"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bean_1 = require("../../class/food/bean");
const grid_1 = require("../../class/grid");
class PowerBean extends bean_1.default {
    constructor(row, column, originator) {
        super(row, column, originator);
        this._tick = 0;
        this._score = 50;
        this._radius = grid_1.default.nodeSize * 0.45;
    }
    //change to next tick
    flip() {
        this._tick = this._tick === 0 ? 1 : 0;
    }
    blink() {
        this.flip();
        if (this._tick) {
            this.draw();
        }
        else {
            this.erase();
        }
    }
}
exports.default = PowerBean;
//# sourceMappingURL=powerBean.js.map