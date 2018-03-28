System.register(["src/class/stateMachine", "src/class/player/ghost"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stateMachine_1, ghost_1, Pinky;
    return {
        setters: [
            function (stateMachine_1_1) {
                stateMachine_1 = stateMachine_1_1;
            },
            function (ghost_1_1) {
                ghost_1 = ghost_1_1;
            }
        ],
        execute: function () {
            /**
             * pinky will always try to stay 3 nodes ahead and ambush pacman
             */
            Pinky = class Pinky extends ghost_1.default {
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
            };
            exports_1("default", Pinky);
        }
    };
});
//# sourceMappingURL=pinky.js.map