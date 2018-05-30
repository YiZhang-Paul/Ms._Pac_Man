"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("../../object/canvas");
const locations_1 = require("../../object/locations");
const movable_1 = require("../../class/player/movable");
const grid_1 = require("../../class/grid");
class Player extends movable_1.default {
    constructor(name, originator) {
        super(null, null, null);
        this._name = name;
        this._originator = originator;
    }
    get isMoving() {
        return this._isMoving;
    }
    get onAnimation() {
        return this._onAnimation;
    }
    //can turn left or right (exclude turning around)
    get canTurn() {
        return this.onNodeCenter && this.withinMaze;
    }
    set isMoving(value) {
        this._isMoving = value;
    }
    set onAnimation(value) {
        this._onAnimation = value;
    }
    initialize() {
        super.initialize();
        locations_1.default.setLocation(this, this._name);
        this._tick = 0;
        this._totalTicks = null;
        this._timeout = null;
        this._interval = null;
        this._isMoving = false;
        this._onAnimation = false;
        this._ctx = canvas_1.default.player;
        //recalculate crop location since direction is reset
        this.getCropXY();
        this.syncLocation();
    }
    reset() {
        if (this._interval !== null) {
            clearInterval(this._interval);
            this._interval = null;
        }
        super.reset();
        this.initialize();
    }
    //warp from one side to the other side of tunnel
    crossTunnel() {
        const left = -grid_1.default.nodeSize;
        const right = grid_1.default.width + grid_1.default.nodeSize;
        if (this._coordinate.x < left || this._coordinate.x > right) {
            this._coordinate.x = this._coordinate.x < left ? right : left;
        }
    }
    //adjust current speed to ensure object can reach grid center
    adjustSpeed(speed) {
        const toCollision = this.toCollision;
        if (toCollision !== null) {
            return Math.min(speed, toCollision);
        }
        return super.adjustSpeed(speed);
    }
    move(timeStep) {
        super.move(timeStep);
        this.crossTunnel();
        if (this.withinMaze) {
            this.syncLocation();
        }
    }
    //move to next step of animation
    nextTick(totalTicks = this._totalTicks) {
        this._tick = (this._tick + 1) % totalTicks;
        this.getCropXY();
    }
    playAnimation(totalTicks = this._totalTicks, speed = 100, endTick = this._tick) {
        if (!this._onAnimation) {
            this.stopAnimation(endTick);
            return;
        }
        //start animation
        if (this._interval === null) {
            this._interval = setInterval(() => {
                this.nextTick(totalTicks);
            }, speed);
        }
    }
    stopAnimation(endTick) {
        if (this._interval !== null) {
            clearInterval(this._interval);
            this._interval = null;
            //stop at given animation step
            this._tick = endTick;
            this.getCropXY();
        }
    }
    draw() {
        this._ctx.drawImage(this._tile, this._cropXY.x, this._cropXY.y, this._cropWidth, this._cropWidth, this._coordinate.x - grid_1.default.nodeSize * 0.8, this._coordinate.y - grid_1.default.nodeSize * 0.8, grid_1.default.nodeSize * 1.6, grid_1.default.nodeSize * 1.6);
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map