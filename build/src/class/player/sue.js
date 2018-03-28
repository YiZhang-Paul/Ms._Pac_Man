System.register(["src/class/stateMachine", "src/class/node", "src/class/grid", "src/class/player/ghost"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stateMachine_1, node_1, grid_1, ghost_1, Sue;
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
            /**
             * sue will move towards pacman when getting too far away,
             * but will ignore pacman when getting too close
             */
            Sue = class Sue extends ghost_1.default {
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
            };
            exports_1("default", Sue);
        }
    };
});
//# sourceMappingURL=sue.js.map