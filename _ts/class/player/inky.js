System.register(["_ts/class/stateMachine", "_ts/class/node", "_ts/class/grid", "_ts/class/player/ghost"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stateMachine_1, node_1, grid_1, ghost_1, Inky;
    return {
        setters: [
            function (stateMachine_1_1) {
                stateMachine_1 = stateMachine_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (ghost_1_1) {
                ghost_1 = ghost_1_1;
            }
        ],
        execute: function () {
            Inky = class Inky extends ghost_1.default {
                constructor(originator) {
                    super("inky", originator);
                }
                initialize() {
                    super.initialize();
                    this._aggressiveness = 25;
                    this._stateManager = new stateMachine_1.default(this, "inHouse");
                }
                setDirectionInHouse() {
                    let originator = this._originator;
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
                    for (let i = 2; i <= 5; i++) {
                        nodeAhead = this.nodeAhead(this.enemy.direction, i);
                        if (nodeAhead !== null) {
                            break;
                        }
                    }
                    if (nodeAhead === null) {
                        return this.getRandomDestination();
                    }
                    let blinky = this._originator.blinky;
                    const row = nodeAhead.row * 2 - blinky.row;
                    const column = nodeAhead.column * 2 - blinky.column;
                    if (!grid_1.default.isAccessible(row, column)) {
                        return this.getRandomDestination();
                    }
                    return new node_1.default(row, column);
                }
            };
            exports_1("default", Inky);
        }
    };
});
//# sourceMappingURL=inky.js.map