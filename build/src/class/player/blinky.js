"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../../class/stateMachine");
const node_1 = require("../../class/node");
const ghost_1 = require("../../class/player/ghost");
/**
 * blinky will chase pacman for entire game duration
 */
class Blinky extends ghost_1.default {
    constructor(originator) {
        super("blinky", originator);
    }
    initialize() {
        super.initialize();
        //set to chasing mode on default
        this._stateManager = new stateMachine_1.default(this, "chasing");
    }
    setDirectionInHouse() {
        let originator = this._originator;
        //will leave ghost house as soon as cooldown is off
        if (!originator.onCooldown) {
            super.setDirectionInHouse();
            return;
        }
        this.turnAround();
        ;
    }
    getChaseDestination() {
        return new node_1.default(this.enemy.row, this.enemy.column);
    }
}
exports.default = Blinky;
//# sourceMappingURL=blinky.js.map