System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Point;
    return {
        setters: [],
        execute: function () {
            Point = class Point {
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
            };
            exports_1("default", Point);
        }
    };
});
//# sourceMappingURL=point.js.map