"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../../class/stateMachine");
const node_1 = require("../../class/node");
const grid_1 = require("../../class/grid");
const ghost_1 = require("../../class/player/ghost");
/**
 * inky will always move in correlation to blinky to trap pacman
 */
class Inky extends ghost_1.default {
    constructor(originator) {
        super("inky", originator);
    }
    initialize() {
        super.initialize();
        this._passiveness = 25;
        this._stateManager = new stateMachine_1.default(this, "inHouse");
    }
    setDirectionInHouse() {
        let originator = this._originator;
        //inky is the second last ghost that will leave ghost house
        if (originator.house.has(originator.blinky) ||
            originator.house.has(originator.pinky) ||
            originator.onCooldown) {
            this.turnAround();
            return;
        }
        super.setDirectionInHouse();
    }
    getChaseDestination() {
        let nodeAhead;
        //find a node ahead of pacman
        for (let i = 2; i <= 5; i++) {
            nodeAhead = this.nodeAhead(this.enemy.direction, i);
            if (nodeAhead !== null) {
                break;
            }
        }
        if (nodeAhead === null) {
            return this.getRandomDestination();
        }
        //move in correlation to blinky's position
        let blinky = this._originator.blinky;
        const row = nodeAhead.row * 2 - blinky.row;
        const column = nodeAhead.column * 2 - blinky.column;
        if (!grid_1.default.isAccessible(row, column)) {
            return this.getRandomDestination();
        }
        return new node_1.default(row, column);
    }
}
exports.default = Inky;
//# sourceMappingURL=inky.js.map