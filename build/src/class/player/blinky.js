System.register(["src/class/stateMachine", "src/class/node", "src/class/player/ghost"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stateMachine_1, node_1, ghost_1, Blinky;
    return {
        setters: [
            function (stateMachine_1_1) {
                stateMachine_1 = stateMachine_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (ghost_1_1) {
                ghost_1 = ghost_1_1;
            }
        ],
        execute: function () {
            /**
             * blinky will chase pacman for entire game duration
             */
            Blinky = class Blinky extends ghost_1.default {
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
            };
            exports_1("default", Blinky);
        }
    };
});
//# sourceMappingURL=blinky.js.map