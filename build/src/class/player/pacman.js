System.register(["src/object/direction", "src/object/control", "src/class/player/player", "src/class/sound", "src/class/point", "src/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var direction_1, control_1, player_1, sound_1, point_1, grid_1, Pacman;
    return {
        setters: [
            function (direction_1_1) {
                direction_1 = direction_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (sound_1_1) {
                sound_1 = sound_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            Pacman = class Pacman extends player_1.default {
                constructor(originator, foodManager) {
                    super("pacman", originator);
                    this._foodManager = foodManager;
                    this.initialize();
                }
                get isDying() {
                    return this._isDying;
                }
                //total ghost killed since last power bean consumption
                get killCount() {
                    return this._killCount;
                }
                initialize() {
                    super.initialize();
                    this._killCount = 0;
                    this._speed = Math.round(grid_1.default.height * 0.025) / 100;
                    this._isDying = false;
                    this._totalTicks = 3;
                    this._deathTimeout = null;
                    this._deathInterval = null;
                }
                reset() {
                    super.reset();
                    this._tick = 2;
                    this._isDying = false;
                }
                //check if pacman can turn to given direction
                isValidDirection(direction) {
                    //can always turn around
                    const isOpposite = direction === this.getOpposite();
                    const isAccessible = !this.hasDoor(direction) && !this.hasWall(direction);
                    return isOpposite || isAccessible;
                }
                //translate input key code to corresponding moving direction
                readInputKey(key) {
                    switch (key) {
                        case control_1.default.W:
                        case control_1.default.UP:
                        case control_1.default.S:
                        case control_1.default.DOWN:
                            return key === control_1.default.W || key === control_1.default.UP ? direction_1.Direction.UP : direction_1.Direction.DOWN;
                        case control_1.default.A:
                        case control_1.default.LEFT:
                        case control_1.default.D:
                        case control_1.default.RIGHT:
                            return key === control_1.default.A || key === control_1.default.LEFT ? direction_1.Direction.LEFT : direction_1.Direction.RIGHT;
                    }
                    return this._direction;
                }
                setDirection() {
                    const key = control_1.default.active;
                    if (key !== null) {
                        const direction = this.readInputKey(key);
                        //can always turn around
                        const isOpposite = direction === this.getOpposite();
                        const canTurn = this.canTurn && this.isValidDirection(direction);
                        if (isOpposite || canTurn) {
                            this._direction = direction;
                        }
                    }
                }
                canKill(ghost) {
                    //can only kill ghost on flee or transition state
                    if (!new Set(["flee", "transition"]).has(ghost.state)) {
                        return false;
                    }
                    return this.distanceToMovable(ghost) < grid_1.default.nodeSize * 0.5;
                }
                killGhost() {
                    let originator = this._originator;
                    originator.ghosts.forEach(ghost => {
                        if (this.canKill(ghost)) {
                            this._killCount++;
                            originator.killGhost(ghost);
                            sound_1.default.play(document.getElementById("eat_ghost"));
                        }
                    });
                }
                consumeFood() {
                    if (this.onNodeCenter && this._foodManager.isBean(this._row, this._column)) {
                        //refresh kill count on power bean consumption
                        if (this._foodManager.isPowerBean(this._row, this._column)) {
                            this._killCount = 0;
                        }
                        this._foodManager.getBean(this._row, this._column).dispose();
                        sound_1.default.play(document.getElementById("eat_bean"));
                    }
                }
                consumeFruit() {
                    let fruit = this._foodManager.fruit;
                    if (fruit === null) {
                        return;
                    }
                    //check fruit position
                    let fruitNode = grid_1.default.getNode(fruit.coordinate);
                    let pacmanNode = grid_1.default.getNode(this._coordinate);
                    if (fruitNode.isSame(pacmanNode)) {
                        fruit.dispose(false);
                        sound_1.default.play(document.getElementById("eat_fruit"));
                    }
                }
                consume() {
                    this.consumeFood();
                    this.consumeFruit();
                }
                //calculate tile image crop location
                getCropXY() {
                    let directions = [direction_1.Direction.UP, direction_1.Direction.DOWN, direction_1.Direction.LEFT, direction_1.Direction.RIGHT];
                    const index = directions.indexOf(this._direction);
                    const x = (index * 3 + this._tick) * this._cropWidth % 256;
                    const y = Math.floor((index * 3 + this._tick) * this._cropWidth / 256) * this._cropWidth;
                    this._cropXY = new point_1.default(x, y);
                }
                //calculate tile image crop location for death animation
                getDeathCropXY(tick) {
                    const x = tick % 8 * this._cropWidth;
                    const y = (Math.floor(tick / 8) + 8) * this._cropWidth;
                    this._cropXY = new point_1.default(x, y);
                }
                playDeathAnimation() {
                    if (this._deathTimeout !== null || this._deathInterval !== null) {
                        return;
                    }
                    let tick = 0;
                    this._isDying = true;
                    this.getDeathCropXY(tick);
                    this._deathTimeout = setTimeout(() => {
                        this._deathInterval = setInterval(() => {
                            this.getDeathCropXY(++tick);
                            if (tick === 13) {
                                this.stopDeathAnimation();
                            }
                        }, 140);
                    }, 1500);
                }
                stopDeathAnimation() {
                    clearTimeout(this._deathTimeout);
                    this._deathTimeout = null;
                    clearInterval(this._deathInterval);
                    this._deathInterval = null;
                    this._originator.killPacman(true);
                }
                update(timeStep) {
                    //animation
                    this._onAnimation = this.toCollision !== 0;
                    this.playAnimation(this._totalTicks, 70, 0);
                    //movement
                    this.setDirection();
                    this.move(timeStep);
                    //check food and ghost
                    this.consume();
                    this.killGhost();
                }
            };
            exports_1("default", Pacman);
        }
    };
});
//# sourceMappingURL=pacman.js.map