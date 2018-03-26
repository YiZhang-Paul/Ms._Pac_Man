System.register(["_ts/object/canvas", "_ts/object/location", "_ts/class/point", "_ts/object/grid", "_ts/class/player/movable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var canvas_1, location_1, point_1, grid_1, movable_1, Player;
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (movable_1_1) {
                movable_1 = movable_1_1;
            }
        ],
        execute: function () {
            Player = class Player extends movable_1.default {
                constructor(name) {
                    super(null, null, null);
                    this._name = name;
                    this.initialize();
                }
                initialize() {
                    this.setLocation();
                    this._tick = 0;
                    this._totalTicks = null;
                    this._interval = null;
                    this._ctx = canvas_1.default.player;
                }
                reset() {
                    this.initialize();
                    if (this._interval !== null) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }
                }
                setLocation() {
                    let location = location_1.default[this._name];
                    const x = grid_1.default.nodeSize * location.column;
                    const y = grid_1.default.nodeSize * (location.row + 0.5);
                    this._coordinate = new point_1.default(x, y);
                    this._direction = location.direction;
                }
            };
            exports_1("default", Player);
            initialize();
            {
                let stats = grid[this.name];
                const x = grid.nodeSize * stats.column;
                const y = grid.nodeSize * (stats.row + 0.5);
                this.coordinate = new point_1.default(x, y);
                this.direction = stats.direction;
            }
        }
    };
});
//# sourceMappingURL=player.js.map