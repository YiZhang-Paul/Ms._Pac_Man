"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x, y) {
        this._x = null;
        this._y = null;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    isSame(point) {
        return this._x === point.x && this._y === point.y;
    }
    distanceTo(point) {
        return Math.hypot((this._x - point.x), (this._y - point.y));
    }
}
exports.default = Point;
//# sourceMappingURL=point.js.map