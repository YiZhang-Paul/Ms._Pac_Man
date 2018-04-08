System.register(["src/object/direction", "src/class/point", "src/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var direction_1, point_1, grid_1;
    return {
        setters: [
            function (direction_1_1) {
                direction_1 = direction_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                //destination for all retreating ghosts
                retreat: {
                    row: 14,
                    column: 14
                },
                door: {
                    row: 13,
                    column: [14, 15],
                },
                /**
                 * spawn locations
                 */
                pacman: {
                    row: 23,
                    column: 14,
                    direction: direction_1.Direction.RIGHT
                },
                blinky: {
                    row: 11,
                    column: 14,
                    direction: direction_1.Direction.LEFT
                },
                pinky: {
                    row: 14,
                    column: 14,
                    direction: direction_1.Direction.DOWN
                },
                inky: {
                    row: 14,
                    column: 12,
                    direction: direction_1.Direction.UP
                },
                sue: {
                    row: 14,
                    column: 16,
                    direction: direction_1.Direction.UP
                },
                //set initial location of given movable object
                setLocation(movable, key) {
                    movable.direction = this[key].direction;
                    movable.coordinate = new point_1.default(grid_1.default.nodeSize * this[key].column, grid_1.default.nodeSize * (this[key].row + 0.5));
                }
            });
        }
    };
});
//# sourceMappingURL=locations.js.map