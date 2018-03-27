System.register(["_ts/object/grid", "_ts/class/stateMachine"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var grid_1, stateMachine_1, Movable;
    return {
        setters: [
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (stateMachine_1_1) {
                stateMachine_1 = stateMachine_1_1;
            }
        ],
        execute: function () {
            Movable = class Movable {
                constructor(row, column, direction) {
                    this._row = row;
                    this._column = column;
                    this._direction = direction;
                    this.initialize();
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
                    return this._state.active;
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
                    this._cropXY = null;
                    this._cropWidth = 32;
                    this._tile = document.getElementById("tile");
                    this._ctx = null;
                    this._state = new stateMachine_1.default(this);
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
                    return new Set(["up", "down"]).has(this._direction) ?
                        Math.abs(this._coordinate.y - center.y) :
                        Math.abs(this._coordinate.x - center.x);
                }
                hasDoor(direction = this._direction) {
                    let adjacent = grid_1.default.getAdjacentNode(direction, this._row, this._column);
                    if (adjacent === null) {
                        return false;
                    }
                    return grid_1.default.getContent(1, adjacent.row, adjacent.column).hasOwnProperty("d");
                }
                hasWall(direction = this._direction) {
                    let adjacent = grid_1.default.getAdjacentNode(direction, this._row, this._column);
                    if (adjacent === null) {
                        return false;
                    }
                    return grid_1.default.getContent(1, adjacent.row, adjacent.column).hasOwnProperty("w");
                }
                getOpposite(direction = this.direction) {
                    switch (direction) {
                        case "up":
                        case "down":
                            return direction === "up" ? "down" : "up";
                        case "left":
                        case "right":
                            return direction === "left" ? "right" : "left";
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
                    if (new Set(["up", "down"]).has(this._direction)) {
                        this._coordinate.y += speed * (this._direction === "up" ? -1 : 1);
                    }
                    else {
                        this._coordinate.x += speed * (this._direction === "left" ? -1 : 1);
                    }
                }
                ;
            };
            exports_1("default", Movable);
        }
    };
});
//# sourceMappingURL=movable.js.map