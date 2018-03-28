System.register(["_ts/object/utility"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, GhostManager;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }
        ],
        execute: function () {
            GhostManager = class GhostManager {
                constructor(originator, enemy) {
                    this._originator = originator;
                    this._enemy = enemy;
                    this.initialize();
                }
                get names() {
                    return this._names;
                }
                get ghosts() {
                    return this._ghosts;
                }
                get house() {
                    return this._house;
                }
                get enemy() {
                    return this._enemy;
                }
                get onCooldown() {
                    return this._timestamp + this._cooldown > utility_1.default.now;
                }
                initialize() {
                    this._names = ["blinky", "pinky", "inky", "sue"];
                    this._blinky = null;
                    this._pinky = null;
                    this._inky = null;
                    this._sue = null;
                    this._ghosts = new Set([this._blinky, this._pinky, this._inky, this._sue]);
                    this._house = new Set([this._pinky, this._inky, this._sue]);
                    this._cooldown = 2000;
                    this._timestamp = 0;
                }
                reset() {
                    this._ghosts.forEach(ghost => {
                        ghost.reset();
                    });
                    this._house = new Set([this._pinky, this._inky, this._sue]);
                }
                setCooldown() {
                    this._timestamp = utility_1.default.now;
                }
                startAnimation() {
                    this._ghosts.forEach(ghost => {
                        ghost.onAnimation = true;
                    });
                }
                startMove() {
                    this.startAnimation();
                    this._ghosts.forEach(ghost => {
                        let timeout = setTimeout(() => {
                            clearTimeout(timeout);
                            ghost.isMoving = true;
                        }, ghost.state === "chasing" ? 1000 : this._cooldown);
                    });
                }
                stopMove() {
                    this._ghosts.forEach(ghost => {
                        ghost.isMoving = false;
                    });
                }
                getInHouse(ghost) {
                    this._house.add(ghost);
                    this.setCooldown();
                }
                getOutHouse(ghost) {
                    this._house.delete(ghost);
                    this.setCooldown();
                }
                startFlee() {
                    let states = ["chasing", "flee", "transition"];
                    this._ghosts.forEach(ghost => {
                        if (new Set(states).has(ghost.state)) {
                            ghost.startFlee();
                        }
                    });
                }
                killPacman() {
                    this._originator.killPacman();
                }
                killGhost(ghost) {
                    ghost.startRetreat();
                }
                update(timeStep) {
                    this._ghosts.forEach(ghost => {
                        ghost.update(timeStep);
                    });
                }
                draw() {
                    this._ghosts.forEach(ghost => {
                        ghost.draw();
                    });
                }
            };
            exports_1("default", GhostManager);
        }
    };
});
//# sourceMappingURL=ghostManager.js.map