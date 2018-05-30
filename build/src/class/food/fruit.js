"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../../object/direction");
const utility_1 = require("../../object/utility");
const canvas_1 = require("../../object/canvas");
const movable_1 = require("../../class/player/movable");
const point_1 = require("../../class/point");
const grid_1 = require("../../class/grid");
class Fruit extends movable_1.default {
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
        this._lifespan = 10000;
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
    dispose(auto) {
        this._originator.removeFruit(auto);
        this.erase();
    }
    //self-dispose when going out of maze area
    autoDispose() {
        if (!grid_1.default.layout.exists(this._row, this._column)) {
            this.dispose(true);
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
        let directions = [direction_1.Direction.UP, direction_1.Direction.DOWN, direction_1.Direction.LEFT, direction_1.Direction.RIGHT];
        return directions.filter(direction => {
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
        if (new Set([direction_1.Direction.UP, direction_1.Direction.DOWN]).has(direction)) {
            row += thickness * (direction === direction_1.Direction.UP ? -1 : 1);
        }
        else {
            column += thickness * (direction === direction_1.Direction.LEFT ? -1 : 1);
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
    move(timeStep) {
        super.move(timeStep);
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
}
exports.default = Fruit;
//# sourceMappingURL=fruit.js.map