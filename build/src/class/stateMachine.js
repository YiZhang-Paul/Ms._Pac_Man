"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../object/utility");
//stack based finite state machine
class StateMachine {
    constructor(originator, defaultState = null) {
        this._originator = originator;
        this._defaultState = defaultState;
        this.initialize();
    }
    //current active state
    get active() {
        return utility_1.default.lastElement(this._states);
    }
    initialize() {
        this._states = [];
        //initialize state tracker if default state is given
        if (this._defaultState) {
            this.push(this._defaultState);
        }
    }
    reset() {
        this.initialize();
    }
    push(state) {
        if (this.active !== state) {
            this._states.push(state);
        }
    }
    pop() {
        return this._states.pop();
    }
    //replace current active state
    swap(state) {
        this.pop();
        this.push(state);
    }
    update(timeStep) {
        if (this.active) {
            this._originator[this.active](timeStep);
        }
    }
}
exports.default = StateMachine;
//# sourceMappingURL=stateMachine.js.map