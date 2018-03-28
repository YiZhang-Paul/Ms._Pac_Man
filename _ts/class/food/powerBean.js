System.register(["_ts/class/food/bean", "_ts/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var bean_1, grid_1, PowerBean;
    return {
        setters: [
            function (bean_1_1) {
                bean_1 = bean_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            PowerBean = class PowerBean extends bean_1.default {
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
            };
            exports_1("default", PowerBean);
        }
    };
});
//# sourceMappingURL=powerBean.js.map