System.register(["_ts/object/monitor", "_ts/object/utility", "_ts/object/control", "_ts/object/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, utility_1, control_1, grid_1;
    return {
        setters: [
            function (monitor_1_1) {
                monitor_1 = monitor_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                state: null,
                timeStep: null,
                maze: null,
                manager: null,
                canvas: {
                    background: null,
                    food: null,
                    fruit: null,
                    player: null,
                    userInterface: null,
                    scorePopUp: null
                },
                createCanvas(width, height, zIndex) {
                    let canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.style.zIndex = zIndex;
                    document.getElementById("board").appendChild(canvas);
                    return canvas.getContext("2d");
                },
                loadCanvas() {
                    this.canvas.background = this.createCanvas(grid_1.default.width, grid_1.default.height, 1);
                    this.canvas.food = this.createCanvas(grid_1.default.width, grid_1.default.height, 2);
                    this.canvas.fruit = this.createCanvas(grid_1.default.width, grid_1.default.height, 3);
                    this.canvas.player = this.createCanvas(grid_1.default.width, grid_1.default.height, 4);
                    this.canvas.userInterface = this.createCanvas(grid_1.default.width, monitor_1.default.height, 5);
                    this.canvas.scorePopUp = this.createCanvas(grid_1.default.width, grid_1.default.height, 6);
                },
                loadAsset() {
                    grid_1.default.initialize();
                    this.loadCanvas();
                },
                registerKeyDown() {
                    document.addEventListener("keydown", event => {
                        const key = event.keyCode;
                        switch (key) {
                            case control_1.default.W:
                            case control_1.default.UP:
                            case control_1.default.S:
                            case control_1.default.DOWN:
                            case control_1.default.A:
                            case control_1.default.LEFT:
                            case control_1.default.D:
                            case control_1.default.RIGHT:
                                control_1.default.add(key);
                        }
                    });
                },
                registerKeyUp() {
                    document.addEventListener("keyup", event => {
                        const key = event.keyCode;
                        switch (key) {
                            case control_1.default.W:
                            case control_1.default.UP:
                            case control_1.default.S:
                            case control_1.default.DOWN:
                            case control_1.default.A:
                            case control_1.default.LEFT:
                            case control_1.default.D:
                            case control_1.default.RIGHT:
                                control_1.default.remove(key);
                        }
                    });
                },
                initialize() {
                    this.loadAsset();
                    this.registerKeyDown();
                    this.registerKeyUp();
                    this.state = "initialized";
                },
                run() {
                    //fps optimization
                    const maxFps = 60;
                    let delta = 0;
                    let lastFrameRender = 0;
                    this.timeStep = utility_1.default.roundTo(1000 / maxFps, 2);
                    const mainLoop = timestamp => {
                        //sync with target fps
                        if (timestamp < lastFrameRender + this.timeStep) {
                            requestAnimationFrame(mainLoop);
                            return;
                        }
                        //update delta time and record most recent render
                        delta += timestamp - lastFrameRender;
                        lastFrameRender = timestamp;
                        let counter = 0;
                        while (delta > this.timeStep) {
                            this.update();
                            delta -= this.timeStep;
                            if (++counter >= 240) {
                                delta = 0;
                            }
                        }
                        this.draw();
                        requestAnimationFrame(mainLoop);
                    };
                    //run game
                    requestAnimationFrame(mainLoop);
                    this.state = "running";
                },
                reset() {
                    this.manager.reset();
                },
                update() {
                    this.manager.update(this.timeStep);
                },
                draw() {
                    this.manager.draw();
                }
            });
        }
    };
});
//# sourceMappingURL=game.js.map