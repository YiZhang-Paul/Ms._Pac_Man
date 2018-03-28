System.register(["_ts/object/locations", "_ts/object/utility", "_ts/class/stateMachine", "_ts/class/pathfinder", "_ts/class/player/player", "_ts/class/point", "_ts/class/node", "_ts/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var locations_1, utility_1, stateMachine_1, pathfinder_1, player_1, point_1, node_1, grid_1, Ghost;
    return {
        setters: [
            function (locations_1_1) {
                locations_1 = locations_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (stateMachine_1_1) {
                stateMachine_1 = stateMachine_1_1;
            },
            function (pathfinder_1_1) {
                pathfinder_1 = pathfinder_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            Ghost = class Ghost extends player_1.default {
                constructor(name, originator) {
                    super(name, originator);
                    this.initialize();
                }
                get score() {
                    return this._score;
                }
                //direction of next node on traveling path
                get nextNodeDirection() {
                    //when current path is not available or too short
                    if (this._path === null || this._path.length <= 1) {
                        return this._direction;
                    }
                    return grid_1.default.directions.find(direction => {
                        let node = grid_1.default.getAdjacentNode(direction, this._row, this._column);
                        return this._path[1].isSame(node);
                    });
                }
                get destination() {
                    if (this._path === null) {
                        return null;
                    }
                    return utility_1.default.lastElement(this._path);
                }
                //human controlled characters
                get enemy() {
                    return this._originator.enemy;
                }
                get onFlee() {
                    return this._timestamp + this._fleeTime > utility_1.default.now;
                }
                get onTransition() {
                    if (this.onFlee) {
                        return false;
                    }
                    return this._timestamp + this._fleeTime + this._transitionTime > utility_1.default.now;
                }
                //check if ghost should actively flee from human controlled characters
                get inFleeRange() {
                    return this.distanceToMovable(this.enemy) < grid_1.default.nodeSize * 8;
                }
                get inTunnel() {
                    if (!this.withinMaze) {
                        return true;
                    }
                    let meta = grid_1.default.layout.getMetadata(this._row, this._column);
                    if (meta === null || meta.b !== "p") {
                        return false;
                    }
                    //check if ghost is located in tunnels inside of maze area
                    return this._column < 3 || this._column > grid_1.default.layout.columns - 4;
                }
                initialize() {
                    this._defaultSpeed = Math.round(grid_1.default.height * 0.02) / 100;
                    this._speed = this._defaultSpeed;
                    this._score = 200;
                    this._path = null;
                    this._pathfinder = new pathfinder_1.default(this);
                    this._totalTicks = 2;
                    this._timestamp = null;
                    this._fleeTime = 10000;
                    this._transitionTime = 3000;
                    this._dodging = false;
                    this._stateManager = new stateMachine_1.default(this, null);
                    this.defaultCropXY = this.getCropXY;
                }
                reset() {
                    super.reset();
                    this._speed = this._defaultSpeed;
                    this._path = null;
                    this._stateManager = new stateMachine_1.default(this, null);
                    this.getCropXY = this.defaultCropXY;
                }
                turnAround() {
                    if (this.toCollision === 0) {
                        this._direction = this.getOpposite();
                    }
                }
                //check if pacman can turn to given direction
                isValidDirection(direction) {
                    //can always turn around
                    if (direction === this.getOpposite()) {
                        return true;
                    }
                    return !this.hasWall(direction);
                }
                setDirectionInHouse() {
                    //calculate door locations
                    const doorWidth = grid_1.default.nodeSize * 0.2;
                    const left = (grid_1.default.width - doorWidth) * 0.5;
                    const right = (grid_1.default.width + doorWidth) * 0.5;
                    const centerY = (locations_1.default.door.row + 2) * grid_1.default.nodeSize;
                    const inXRange = this._coordinate.x > left && this._coordinate.x < right;
                    const inYRange = Math.round(Math.abs(this._coordinate.y - centerY)) < grid_1.default.nodeSize * 0.5;
                    //change directions to move out of ghost house
                    if (new Set(["up", "down"]).has(this._direction) && !inXRange && inYRange) {
                        this._direction = this._coordinate.x > grid_1.default.width * 0.5 ? "left" : "right";
                    }
                    else if (new Set(["left", "right"]).has(this._direction) && inXRange) {
                        this._direction = "up";
                        this._stateManager.swap("exitingHouse");
                    }
                    else {
                        this.turnAround();
                    }
                }
                getRandomDestination() {
                    return utility_1.default.randomElement(grid_1.default.accessible.all);
                }
                //check if ghost and given object is moving towards each other
                isHeadOn(direction, movable) {
                    if (this.getOpposite(direction) === movable.direction) {
                        return true;
                    }
                    //when ghost and given object are moving on same axis
                    if (new Set(["left", "right"]).has(direction)) {
                        return direction === "left" ?
                            this._coordinate.x > movable.coordinate.x :
                            this._coordinate.x < movable.coordinate.x;
                    }
                    return direction === "up" ?
                        this._coordinate.y > movable.coordinate.y :
                        this._coordinate.y < movable.coordinate.y;
                }
                isValidFleePath(fleePath, enemyPath) {
                    if (!this._pathfinder.coincides(fleePath, enemyPath)) {
                        return true;
                    }
                    //avoid short flee path or running into pacman (e.g. when pacman is holding position)
                    if (fleePath.length < 3 || this._pathfinder.contains(fleePath, enemyPath[0])) {
                        return false;
                    }
                    if (this._pathfinder.contains(enemyPath, new node_1.default(this._row, this._column))) {
                        //avoid head on collision with pacman
                        return !this.isHeadOn(this.nextNodeDirection, this.enemy);
                    }
                    return true;
                }
                getFleeDestination() {
                    //stop fleeing actively when far away from enemy
                    if (!this.inFleeRange || this._path === null) {
                        this._dodging = false;
                        return this.getRandomDestination();
                    }
                    let destination;
                    let fleePath;
                    let enemyPath = this.enemy.pathAhead;
                    //avoid running into pacman
                    if (!this.inTunnel) {
                        for (let i = 0; i < 30; i++) {
                            destination = this.getRandomDestination();
                            fleePath = this._pathfinder.find(destination);
                            if (this.isValidFleePath(fleePath, enemyPath)) {
                                break;
                            }
                        }
                    }
                    //replace current path with flee path if not already dodging the enemy
                    if (!this._dodging && this._path !== null) {
                        this._dodging = true;
                        this._path = fleePath;
                    }
                    return destination;
                }
                getRetreatDestination() {
                    //coordinate of ghost house
                    return new node_1.default(locations_1.default.retreat.row, locations_1.default.retreat.column);
                }
                setPath(destination, walkFullPath) {
                    let path = this._pathfinder.find(destination);
                    this._path = walkFullPath ? path : path.slice(0, 2);
                }
                //check completion of current path
                checkPath(destination, walkFullPath) {
                    let node = this._path[0];
                    let center = grid_1.default.getNodeCenter(node.row, node.column);
                    if (this._coordinate.isSame(center)) {
                        this._path.shift();
                        if (this._path.length === 0) {
                            this.setPath(destination, walkFullPath);
                        }
                    }
                }
                managePath(destination, walkFullPath) {
                    if (!this.withinMaze || this.inTunnel) {
                        this._path = null;
                        return;
                    }
                    if (this._path === null) {
                        this.setPath(destination, walkFullPath);
                    }
                    this.checkPath(destination, walkFullPath);
                }
                //set direction to move along current path
                setDirection() {
                    let direction = null;
                    let node = this._path[0];
                    let center = grid_1.default.getNodeCenter(node.row, node.column);
                    if (this._coordinate.y === center.y) {
                        direction = this._coordinate.x < center.x ? "right" : "left";
                    }
                    else if (this._coordinate.x === center.x) {
                        direction = this._coordinate.y < center.y ? "down" : "up";
                    }
                    else {
                        //correct current coordinate to prevent number precision error
                        this._coordinate = grid_1.default.getNodeCenter(this._row, this._column);
                        this.setDirection();
                        return;
                    }
                    if (this.isValidDirection(direction)) {
                        this._direction = direction;
                    }
                }
                killPacman() {
                    if (this.distanceToMovable(this.enemy) < grid_1.default.nodeSize) {
                        this._originator.killPacman();
                    }
                }
                /**
                 * tile image crop location for corresponding states
                 */
                defaultCropXY() { }
                fleeCropXY() {
                    const x = (4 + this._tick) * this._cropWidth + 1;
                    const y = this._cropWidth + 1;
                    this._cropXY = new point_1.default(x, y);
                }
                retreatCropXY() {
                    const index = grid_1.default.directions.indexOf(this._direction);
                    const x = (4 + index) * this._cropWidth + 1;
                    const y = this._cropWidth * 7;
                    this._cropXY = new point_1.default(x, y);
                }
                //default tile image crop location
                getCropXY() {
                    let names = this._originator.names;
                    const index = grid_1.default.directions.indexOf(this._direction);
                    const x = (index * 2 + this._tick) * this._cropWidth;
                    const y = (names.indexOf(this._name) + 2) * this._cropWidth;
                    this._cropXY = new point_1.default(x, y);
                }
                /**
                 * trigger state transition
                 */
                startFlee() {
                    this.getCropXY = this.fleeCropXY;
                    this.stopAnimation(0);
                    this._path = null;
                    this._timestamp = utility_1.default.now;
                    this._stateManager.swap("flee");
                }
                startTransition() {
                    if (!this.onFlee) {
                        this.stopAnimation(0);
                        this.playAnimation(4);
                        this._stateManager.swap("transition");
                    }
                }
                endTransition() {
                    if (!this.onTransition) {
                        this.getCropXY = this.defaultCropXY;
                        this.stopAnimation(0);
                        this._path = null;
                        this._stateManager.swap("chasing");
                    }
                }
                startRetreat() {
                    this.getCropXY = this.retreatCropXY;
                    this.stopAnimation(0);
                    this._path = null;
                    this._stateManager.swap("retreat");
                }
                getInHouse() {
                    let meta = grid_1.default.layout.getMetadata(this._row, this._column);
                    if (meta !== null && meta.hasOwnProperty("c")) {
                        this._originator.getInHouse(this);
                        //move to left or right upon entering
                        this._direction = this._coordinate.x < grid_1.default.width * 0.5 ? "left" : "right";
                        //restore default appearance
                        this.getCropXY = this.defaultCropXY;
                        this.stopAnimation(0);
                        this._path = null;
                        this._stateManager.swap("inHouse");
                    }
                }
                getOutHouse() {
                    if (this._direction === "up" && this.hasDoor("down")) {
                        this._originator.getOutHouse(this);
                        this._stateManager.swap("chasing");
                    }
                }
                //ghost action inside ghost house
                insideActions(timeStep, modifier, changeState) {
                    this._speed = this._defaultSpeed * modifier;
                    if (this._isMoving) {
                        if (changeState !== null) {
                            changeState();
                        }
                        this.move(timeStep);
                        this.getOutHouse();
                    }
                    this.playAnimation();
                }
                //ghost action outside of ghost house
                outsideActions(timeStep, modifier, callback, changeState, walkFullPath) {
                    this._speed = this._defaultSpeed * modifier;
                    if (this._isMoving) {
                        if (this.canTurn) {
                            this.managePath(callback(), walkFullPath);
                        }
                        if (this._path !== null) {
                            this.setDirection();
                        }
                        this.move(timeStep);
                    }
                    this.playAnimation();
                    changeState();
                }
                /**
                 * ghost states
                 */
                inHouse(timeStep) {
                    this.insideActions(timeStep, 0.65, this.setDirectionInHouse);
                }
                exitingHouse(timeStep) {
                    this.insideActions(timeStep, 0.65, null);
                }
                chasing(timeStep) {
                    this.outsideActions(timeStep, 1, this.getChaseDestination, this.killPacman, false);
                }
                flee(timeStep) {
                    this.outsideActions(timeStep, 0.8, this.getFleeDestination, this.startTransition, true);
                }
                transition(timeStep) {
                    this.outsideActions(timeStep, 0.8, this.getFleeDestination, this.endTransition, true);
                }
                retreat(timeStep) {
                    this.outsideActions(timeStep, 1.4, this.getRetreatDestination, this.getInHouse, true);
                }
                update(timeStep) {
                    this._stateManager.update(timeStep);
                }
            };
            exports_1("default", Ghost);
        }
    };
});
//# sourceMappingURL=ghost.js.map