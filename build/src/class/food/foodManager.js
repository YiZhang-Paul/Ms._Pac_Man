System.register(["src/object/direction", "src/object/utility", "src/object/canvas", "src/class/food/bean", "src/class/food/powerBean", "src/class/food/fruit", "src/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var direction_1, utility_1, canvas_1, bean_1, powerBean_1, fruit_1, grid_1, FoodManager;
    return {
        setters: [
            function (direction_1_1) {
                direction_1 = direction_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (bean_1_1) {
                bean_1 = bean_1_1;
            },
            function (powerBean_1_1) {
                powerBean_1 = powerBean_1_1;
            },
            function (fruit_1_1) {
                fruit_1 = fruit_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            FoodManager = class FoodManager {
                constructor(originator) {
                    this._originator = originator;
                    this.initialize();
                }
                get totalBeans() {
                    return this._totalBeans;
                }
                get fruitQueue() {
                    return this._fruitQueue;
                }
                get fruit() {
                    return this._fruit;
                }
                get canPutFruit() {
                    if (this._fruit !== null || this._timeout !== null) {
                        return false;
                    }
                    return this._fruitQueue.length > 0;
                }
                initialize() {
                    this._totalBeans = 0;
                    this._powerBeans = new Set();
                    this._fruitQueue = new Array();
                    this._fruit = null;
                    this._timeout = null;
                    this._fruitInterval = null;
                    this._beanInterval = null;
                    this._ctx = canvas_1.default.food;
                    this.putBeans();
                    this.blink();
                }
                reset() {
                    this._fruitQueue = new Array();
                    if (this._fruit !== null) {
                        this._fruit.dispose(true);
                    }
                    if (this._timeout !== null) {
                        clearTimeout(this._timeout);
                        this._timeout = null;
                    }
                    if (this._fruitInterval !== null) {
                        clearInterval(this._fruitInterval);
                        this._fruitInterval = null;
                    }
                }
                destroy() {
                    this._powerBeans.clear();
                    if (this._fruit !== null) {
                        this._fruit.dispose(true);
                    }
                    if (this._timeout !== null) {
                        clearTimeout(this._timeout);
                    }
                    if (this._fruitInterval !== null) {
                        clearInterval(this._fruitInterval);
                    }
                    if (this._beanInterval !== null) {
                        clearInterval(this._beanInterval);
                    }
                }
                //blink all power beans
                blink() {
                    if (this._beanInterval === null) {
                        this._beanInterval = setInterval(() => {
                            this._powerBeans.forEach(bean => {
                                bean.blink();
                            });
                        }, 150);
                    }
                }
                isBean(row, column) {
                    //check meta layer
                    let meta = grid_1.default.layout.getMetadata(row, column);
                    if (meta === null || !meta.hasOwnProperty("f")) {
                        return false;
                    }
                    //check logic layer to ensure the food is not consumed
                    return grid_1.default.layout.getObject(row, column) !== null;
                }
                isPowerBean(row, column) {
                    if (!this.isBean(row, column)) {
                        return false;
                    }
                    //check the type of bean on meta layer
                    return grid_1.default.layout.getMetadata(row, column).f === "l";
                }
                //retrieve existing bean
                getBean(row, column) {
                    return grid_1.default.layout.getObject(row, column);
                }
                createBean(row, column, type) {
                    if (type === "l") {
                        return new powerBean_1.default(row, column, this);
                    }
                    return new bean_1.default(row, column, this);
                }
                putBean(row, column, type) {
                    let bean = this.createBean(row, column, type);
                    //register bean on logic layer
                    grid_1.default.layout.setObject(row, column, bean);
                    bean.draw();
                    this._totalBeans++;
                    if (type === "l") {
                        this._powerBeans.add(bean);
                    }
                }
                putBeans() {
                    this._totalBeans = 0;
                    this._powerBeans.clear();
                    this._ctx.clearRect(0, 0, grid_1.default.width, grid_1.default.height);
                    for (let i = 0; i < grid_1.default.layout.rows; i++) {
                        for (let j = 0; j < grid_1.default.layout.columns; j++) {
                            let meta = grid_1.default.layout.getMetadata(i, j);
                            //check meta layer
                            if (meta.hasOwnProperty("f")) {
                                this.putBean(i, j, meta.f);
                            }
                        }
                    }
                }
                createFruit(type) {
                    let row;
                    let column;
                    let direction;
                    //randomize fruit spawn location
                    if (Math.random() < 0.5) {
                        row = Math.random() < 0.5 ? 0 : grid_1.default.layout.rows - 1;
                        column = Math.floor(Math.random() * (grid_1.default.layout.columns - 10)) + 5;
                        direction = row === 0 ? direction_1.Direction.DOWN : direction_1.Direction.UP;
                    }
                    else {
                        row = Math.floor(Math.random() * (grid_1.default.layout.rows - 10)) + 5;
                        column = Math.random() < 0.5 ? 0 : grid_1.default.layout.columns - 1;
                        direction = column === 0 ? direction_1.Direction.RIGHT : direction_1.Direction.LEFT;
                    }
                    return new fruit_1.default(this, row, column, type, direction);
                }
                //add next fruit to queue
                queueFruit() {
                    if (this._fruitInterval === null) {
                        this._fruitInterval = setInterval(() => {
                            if (this._fruitQueue.length < 5) {
                                //pick random fruit type
                                this._fruitQueue.push(utility_1.default.getRandom(1, 7));
                                this._originator.showFruits();
                            }
                        }, utility_1.default.getRandom(15, 20) * 1000);
                    }
                }
                //place first fruit in queue on game area
                putFruit() {
                    if (!this.canPutFruit) {
                        return;
                    }
                    this._timeout = setTimeout(() => {
                        this._fruit = this.createFruit(this._fruitQueue.shift());
                        this._originator.showFruits();
                        clearTimeout(this._timeout);
                        this._timeout = null;
                    }, utility_1.default.getRandom(3, 8) * 1000);
                }
                removeBean(bean) {
                    if (this.isPowerBean(bean.row, bean.column)) {
                        //trigger ghost flee mode on power bean consumption
                        this._originator.startFlee();
                        this._powerBeans.delete(bean);
                    }
                    this._originator.checkScore(bean.score);
                    //remove beans
                    grid_1.default.layout.setObject(bean.row, bean.column, null);
                    this._totalBeans--;
                    //check game end
                    this._originator.checkGameState();
                }
                removeFruit(auto) {
                    if (!auto) {
                        //calculate score when consumed by pacman
                        const score = this._fruit.score;
                        this._originator.checkScore(score);
                        this._originator.addPopUp(this._fruit.coordinate, score);
                    }
                    this._fruit = null;
                }
                update(timeStep) {
                    this.queueFruit();
                    this.putFruit();
                    if (this._fruit !== null) {
                        this._fruit.update(timeStep);
                    }
                }
                draw() {
                    if (this._fruit !== null) {
                        this._fruit.draw();
                    }
                }
            };
            exports_1("default", FoodManager);
        }
    };
});
//# sourceMappingURL=foodManager.js.map