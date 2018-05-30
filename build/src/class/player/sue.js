"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../../class/stateMachine");
const node_1 = require("../../class/node");
const grid_1 = require("../../class/grid");
const ghost_1 = require("../../class/player/ghost");
/**
 * sue will move towards pacman when getting too far away,
 * but will ignore pacman when getting too close
 */
class Sue extends ghost_1.default {
    constructor(originator) {
        super("sue", originator);
    }
    initialize() {
        super.initialize();
        this._ignored = false;
        this._passiveness = 35;
        this._stateManager = new stateMachine_1.default(this, "inHouse");
    }
    setDirectionInHouse() {
        let originator = this._originator;
        //sue will always be the last one to leave ghost house
        if (originator.house.size > 1 || originator.onCooldown) {
            this.turnAround();
            return;
        }
        super.setDirectionInHouse();
    }
    getChaseDestination() {
        //move to pacman when getting too far
        if (this.distanceToMovable(this.enemy) >= grid_1.default.nodeSize * 8) {
            this._ignored = false;
            return new node_1.default(this.enemy.row, this.enemy.column);
        }
        //move to elsewhere when getting too close to pacman
        if (!this._ignored && this._path !== null) {
            this._path = null;
            this._ignored = true;
        }
        return this.getRandomDestination();
    }
}
exports.default = Sue;
//# sourceMappingURL=sue.js.map