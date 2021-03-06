"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("../../class/point");
const canvas_1 = require("../../object/canvas");
const grid_1 = require("../../class/grid");
class Bean {
    constructor(row, column, originator) {
        this._originator = originator;
        this._row = row;
        this._column = column;
        this._coordinate = new point_1.default(this.x, this.y);
        this._score = 10;
        this._color = "red";
        this._radius = grid_1.default.nodeSize * 0.2;
        this._ctx = canvas_1.default.food;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    get x() {
        return (this._column + 0.5) * grid_1.default.nodeSize;
    }
    get y() {
        return (this._row + 0.5) * grid_1.default.nodeSize;
    }
    get coordinate() {
        return this._coordinate;
    }
    get score() {
        return this._score;
    }
    //erase bean graphics only
    erase() {
        this._ctx.clearRect(this._coordinate.x - 0.5 * grid_1.default.nodeSize, this._coordinate.y - 0.5 * grid_1.default.nodeSize, grid_1.default.nodeSize, grid_1.default.nodeSize);
    }
    //permanently delete bean
    dispose() {
        this._originator.removeBean(this);
        this.erase();
    }
    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._coordinate.x, this._coordinate.y, this._radius, 0, Math.PI * 2);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
    }
}
exports.default = Bean;
//# sourceMappingURL=bean.js.map