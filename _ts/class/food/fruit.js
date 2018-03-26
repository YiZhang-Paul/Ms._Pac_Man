System.register(["_ts/object/utility", "_ts/object/canvas", "_ts/object/grid", "_ts/class/point", "_ts/class/player/movable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, canvas_1, grid_1, point_1, movable_1, Fruit;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (movable_1_1) {
                movable_1 = movable_1_1;
            }
        ],
        execute: function () {
            Fruit = class Fruit extends movable_1.default {
                constructor(originator, row, column, type, direction) {
                    super(row, column, direction);
                    this._originator = originator;
                    this._type = type;
                    this.initialize();
                }
                get score() {
                    return this._score;
                }
                //check for the end of fruit lifecycle
                get isAlive() {
                    return this._spawn + this._lifespan > utility_1.default.now;
                }
                get canTurn() {
                    //go straight out of maze area at the end of lifecycle
                    if (!this.isAlive || !this.onNodeCenter) {
                        return false;
                    }
                    return grid_1.default.isAccessible(this._row, this._column);
                }
                initialize() {
                    super.initialize();
                    this._score = 500;
                    this._spawn = utility_1.default.now;
                    this._lifespan = 30000;
                    this._falling = false;
                    this._jumpHeight = 0;
                    this._maxJumpHeight = grid_1.default.nodeSize;
                    this._jumpSpeed = grid_1.default.nodeSize * 0.1;
                    this._speed = Math.round(grid_1.default.height * 0.01) / 100;
                    this._ctx = canvas_1.default.fruit;
                    this.getCropXY();
                }
                //erase fruit graphics only
                erase() {
                    this._ctx.clearRect(this._coordinate.x - grid_1.default.nodeSize * 2, this._coordinate.y - grid_1.default.nodeSize * 2, grid_1.default.nodeSize * 4, grid_1.default.nodeSize * 4);
                }
                //permanently delete fruit
                dispose() {
                    this._originator.remove(this);
                    this.erase();
                }
                //self-dispose when going out of maze area
                autoDispose() {
                    if (!grid_1.default.exists(this._row, this._column)) {
                        this.dispose();
                    }
                }
                getCropXY() {
                    const x = this._cropWidth * (this._type - 1);
                    const y = this._cropWidth * 6;
                    this._cropXY = new point_1.default(x, y);
                }
                isValidDirection(direction) {
                    return direction !== this.getOpposite();
                }
                getValidDirections() {
                    return grid_1.default.directions.filter(direction => {
                        return this.isValidDirection(direction);
                    });
                }
                jump() {
                    if (this._jumpHeight >= this._maxJumpHeight) {
                        this._falling = true;
                    }
                    else if (this._jumpHeight <= 0) {
                        this._falling = false;
                    }
                    this._jumpHeight += this._jumpSpeed * (this._falling ? -1 : 1);
                }
                //check if fruit can jump over obstacle on given direction
                canJumpOver(direction) {
                    let [row, column] = [this._row, this._column];
                    const thickness = 3;
                    if (new Set(["up", "down"]).has(direction)) {
                        row += thickness * (direction === "up" ? -1 : 1);
                    }
                    else {
                        column += thickness * (direction === "left" ? -1 : 1);
                    }
                    return grid_1.default.isAccessible(row, column);
                }
                //check if fruit can move through adjacent node on given direction
                canMoveThrough(direction) {
                    let node = grid_1.default.getAdjacentNode(direction, this._row, this._column);
                    return node !== null && grid_1.default.isAccessible(node.row, node.column);
                }
                setDirection() {
                    if (!this.canTurn) {
                        return;
                    }
                    //70% chance to keep moving in current direction when possible
                    if (this.canMoveThrough(this._direction) && Math.random() < 0.7) {
                        return;
                    }
                    //choose random direction
                    const direction = utility_1.default.randomElement(this.getValidDirections());
                    //20% chance to jump over obstacles when possible
                    const jumpOver = this.canJumpOver(direction) && Math.random() < 0.2;
                    if (jumpOver || this.canMoveThrough(direction)) {
                        this._direction = direction;
                    }
                    else {
                        this.setDirection();
                    }
                }
                //adjust current speed to ensure object can reach grid center
                adjustSpeed(speed) {
                    const toNodeCenter = this.distanceToFacingNode;
                    if (toNodeCenter === null) {
                        return speed;
                    }
                    return Math.min(toNodeCenter, speed);
                }
                move(timeStep) {
                    const speed = this.adjustSpeed(this._speed * timeStep);
                    if (new Set(["up", "down"]).has(this._direction)) {
                        this._coordinate.y += speed * (this._direction === "up" ? -1 : 1);
                    }
                    else {
                        this._coordinate.x += speed * (this._direction === "left" ? -1 : 1);
                    }
                    this.syncLocation();
                    this.autoDispose();
                }
                update(timeStep) {
                    this.jump(); //jump animation
                    this.setDirection();
                    this.move(timeStep);
                }
                draw() {
                    this.erase();
                    this._ctx.drawImage(this._tile, this._cropXY.x, this._cropXY.y, this._cropWidth, this._cropWidth, this._coordinate.x - grid_1.default.nodeSize * 0.8, this._coordinate.y - grid_1.default.nodeSize * 0.8 - this._jumpHeight, grid_1.default.nodeSize * 1.6, grid_1.default.nodeSize * 1.6);
                }
            };
            exports_1("default", Fruit);
        }
    };
});
//# sourceMappingURL=fruit.js.map