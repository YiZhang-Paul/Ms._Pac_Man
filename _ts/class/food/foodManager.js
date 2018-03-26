System.register(["_ts/object/utility", "_ts/object/canvas", "_ts/object/grid", "_ts/class/food/bean", "_ts/class/food/powerBean", "_ts/class/food/fruit"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, canvas_1, grid_1, bean_1, powerBean_1, fruit_1, FoodManager;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (bean_1_1) {
                bean_1 = bean_1_1;
            },
            function (powerBean_1_1) {
                powerBean_1 = powerBean_1_1;
            },
            function (fruit_1_1) {
                fruit_1 = fruit_1_1;
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
                    this._powerBeans = new Set();
                    this._fruitQueue = new Array();
                    if (this._fruit !== null) {
                        this._fruit.dispose();
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
                createBean(row, column, type) {
                    if (type === "l") {
                        return new powerBean_1.default(row, column, this);
                    }
                    return new bean_1.default(row, column, this);
                }
                putBean(row, column, type) {
                    let bean = this.createBean(row, column, type);
                    //register bean on logic layer
                    grid_1.default.setContent(0, row, column, bean);
                    bean.draw();
                    this._totalBeans++;
                    if (type === "l") {
                        this._powerBeans.add(bean);
                    }
                }
                putBeans() {
                    this._totalBeans = 0;
                    this._ctx.clearRect(0, 0, grid_1.default.width, grid_1.default.height);
                    for (let i = 0; i < grid_1.default.rows; i++) {
                        for (let j = 0; j < grid_1.default.columns; j++) {
                            let content = grid_1.default.getContent(1, i, j);
                            //check meta layer
                            if (content.hasOwnProperty("f")) {
                                this.putBean(i, j, content.f);
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
                        row = Math.random() < 0.5 ? 0 : grid_1.default.rows - 1;
                        column = Math.floor(Math.random() * (grid_1.default.columns - 10)) + 5;
                        direction = row === 0 ? "down" : "up";
                    }
                    else {
                        row = Math.floor(Math.random() * (grid_1.default.rows - 10)) + 5;
                        column = Math.random() < 0.5 ? 0 : grid_1.default.columns - 1;
                        direction = column === 0 ? "right" : "left";
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
                                this._originator.hud.showFruits();
                            }
                        }, 1000);
                    }
                }
                //place first fruit in queue in game area
                putFruit() {
                    if (!this.canPutFruit) {
                        return;
                    }
                    this._timeout = setTimeout(() => {
                        this._fruit = this.createFruit(this._fruitQueue.shift());
                        this._originator.hud.showFruits();
                        clearTimeout(this._timeout);
                        this._timeout = null;
                    }, utility_1.default.getRandom(10, 20) * 1000);
                }
                remove(food) {
                    //remove fruit
                    if (food === this._fruit) {
                        this._fruit === null;
                        return;
                    }
                    //remove beans
                    this._powerBeans.delete(food);
                    grid_1.default.setContent(0, food.row, food.column, null);
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