System.register(["_ts/object/utility"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, StateMachine;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }
        ],
        execute: function () {
            //stack based finite state machine
            StateMachine = class StateMachine {
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
            };
            exports_1("default", StateMachine);
        }
    };
});
//# sourceMappingURL=stateMachine.js.map