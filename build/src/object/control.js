"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../object/utility");
//in-game control
exports.default = {
    pressedKeys: new Array(),
    /**
     * control keys
     */
    //move up
    W: 87,
    UP: 38,
    //move down
    S: 83,
    DOWN: 40,
    //move left
    A: 65,
    LEFT: 37,
    //move right
    D: 68,
    RIGHT: 39,
    //most recent key pressed
    get active() {
        return utility_1.default.lastElement(this.pressedKeys);
    },
    isPressed(key) {
        return this.pressedKeys.includes(key);
    },
    add(key) {
        if (!this.isPressed(key)) {
            this.pressedKeys.push(key);
        }
    },
    remove(key) {
        if (this.isPressed(key)) {
            utility_1.default.removeElement(this.pressedKeys, key);
        }
    }
};
//# sourceMappingURL=control.js.map