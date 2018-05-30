"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../../class/stateMachine");
const ghost_1 = require("../../class/player/ghost");
/**
 * pinky will always try to stay 3 nodes ahead and ambush pacman
 */
class Pinky extends ghost_1.default {
    constructor(originator) {
        super("pinky", originator);
    }
    initialize() {
        super.initialize();
        this._passiveness = 15;
        this._stateManager = new stateMachine_1.default(this, "inHouse");
    }
    setDirectionInHouse() {
        let originator = this._originator;
        //pinky will not leave ghost house when blinky is inside
        if (originator.house.has(originator.blinky) || originator.onCooldown) {
            this.turnAround();
            return;
        }
        super.setDirectionInHouse();
    }
    getChaseDestination() {
        //move to 3 nodes ahead of pacman
        let nodeAhead = this.nodeAhead(this.enemy.direction, 3);
        if (nodeAhead !== null) {
            return nodeAhead;
        }
        return this.getRandomDestination();
    }
}
exports.default = Pinky;
//# sourceMappingURL=pinky.js.map