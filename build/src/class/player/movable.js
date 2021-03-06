"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../../object/direction");
const stateMachine_1 = require("../../class/stateMachine");
const node_1 = require("../../class/node");
const grid_1 = require("../../class/grid");
class Movable {
    constructor(row, column, direction) {
        this._row = row;
        this._column = column;
        this._direction = direction;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    get coordinate() {
        return this._coordinate;
    }
    get speed() {
        return this._speed;
    }
    //current facing direction
    get direction() {
        return this._direction;
    }
    get state() {
        return this._stateManager.active;
    }
    //straight path on current facing direction
    get pathAhead() {
        let path = [new node_1.default(this._row, this._column)];
        let node = grid_1.default.getAdjacentNode(this._direction, this._row, this._column);
        while (node !== null && grid_1.default.isAccessible(node.row, node.column)) {
            path.push(node);
            node = grid_1.default.getAdjacentNode(this._direction, node.row, node.column);
        }
        return path;
    }
    //check if object is right on center of current node
    get onNodeCenter() {
        let center = grid_1.default.getNodeCenter(this._row, this._column);
        return this._coordinate.isSame(center);
    }
    //retrieve distance before collision
    get toCollision() {
        if (!this.hasWall()) {
            return null;
        }
        let adjacent = grid_1.default.getAdjacentNode(this._direction, this._row, this._column);
        return this.distanceToNode(adjacent.row, adjacent.column) - grid_1.default.nodeSize;
    }
    //retrieve distance to center of nearest facing node
    get distanceToFacingNode() {
        if (this.onNodeCenter) {
            return grid_1.default.nodeSize;
        }
        let adjacent = grid_1.default.getAdjacentNode(this._direction, this._row, this._column);
        if (adjacent === null) {
            return null;
        }
        const toAdjacent = this.distanceToNode(adjacent.row, adjacent.column);
        //check if object is facing toward/opposite to center of current node
        if (toAdjacent <= grid_1.default.nodeSize) {
            return toAdjacent;
        }
        return this.distanceToNode(this._row, this._column);
    }
    get withinMaze() {
        return this._coordinate.x >= 0 && this._coordinate.x <= grid_1.default.width;
    }
    set coordinate(value) {
        this._coordinate = value;
    }
    set direction(value) {
        this._direction = value;
    }
    initialize() {
        this._coordinate = grid_1.default.getNodeCenter(this._row, this._column);
        this._speed = 0;
        this._cropWidth = 32;
        this._tile = document.getElementById("tile");
        this._ctx = null;
        this._stateManager = new stateMachine_1.default(this, null);
        this.getCropXY();
        this.syncLocation();
    }
    reset() {
        this.getCropXY();
        this.syncLocation();
    }
    distanceToMovable(movable) {
        return this._coordinate.distanceTo(movable.coordinate);
    }
    //calculate distance to center of given node
    distanceToNode(row, column) {
        let center = grid_1.default.getNodeCenter(row, column);
        return new Set([direction_1.Direction.UP, direction_1.Direction.DOWN]).has(this._direction) ?
            Math.abs(this._coordinate.y - center.y) :
            Math.abs(this._coordinate.x - center.x);
    }
    hasDoor(direction = this._direction) {
        let adjacent = grid_1.default.getAdjacentNode(direction, this._row, this._column);
        if (adjacent === null) {
            return false;
        }
        return grid_1.default.layout.getMetadata(adjacent.row, adjacent.column).hasOwnProperty("d");
    }
    hasWall(direction = this._direction) {
        let adjacent = grid_1.default.getAdjacentNode(direction, this._row, this._column);
        if (adjacent === null) {
            return false;
        }
        return grid_1.default.layout.getMetadata(adjacent.row, adjacent.column).hasOwnProperty("w");
    }
    //retrieve node with given distance ahead
    nodeAhead(direction, total) {
        if (!this.withinMaze) {
            return null;
        }
        let node = new node_1.default(this._row, this._column);
        for (let i = 0; i < total; i++) {
            node = grid_1.default.getAdjacentNode(direction, node.row, node.column);
            if (node === null || !grid_1.default.isAccessible(node.row, node.column)) {
                return null;
            }
        }
        return node;
    }
    getOpposite(direction = this._direction) {
        switch (direction) {
            case direction_1.Direction.UP:
            case direction_1.Direction.DOWN:
                return direction === direction_1.Direction.UP ? direction_1.Direction.DOWN : direction_1.Direction.UP;
            case direction_1.Direction.LEFT:
            case direction_1.Direction.RIGHT:
                return direction === direction_1.Direction.LEFT ? direction_1.Direction.RIGHT : direction_1.Direction.LEFT;
        }
        return direction;
    }
    //update row and column of current node
    syncLocation() {
        let node = grid_1.default.getNode(this._coordinate);
        this._row = node.row;
        this._column = node.column;
    }
    //adjust current speed to ensure object can reach grid center
    adjustSpeed(speed) {
        const toNodeCenter = this.distanceToFacingNode;
        if (toNodeCenter === null) {
            return speed;
        }
        return Math.min(speed, toNodeCenter);
    }
    move(timeStep) {
        const speed = this.adjustSpeed(this._speed * timeStep);
        if (new Set([direction_1.Direction.UP, direction_1.Direction.DOWN]).has(this._direction)) {
            this._coordinate.y += speed * (this._direction === direction_1.Direction.UP ? -1 : 1);
        }
        else {
            this._coordinate.x += speed * (this._direction === direction_1.Direction.LEFT ? -1 : 1);
        }
    }
    ;
}
exports.default = Movable;
//# sourceMappingURL=movable.js.map