"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../object/direction");
const point_1 = require("../class/point");
const grid_1 = require("../class/grid");
//game object default locations
exports.default = {
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
};
//# sourceMappingURL=locations.js.map