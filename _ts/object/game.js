System.register(["_ts/object/monitor", "_ts/object/utility", "_ts/object/canvas", "_ts/object/control", "_ts/object/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, utility_1, canvas_1, control_1, grid_1;
    return {
        setters: [
            function (monitor_1_1) {
                monitor_1 = monitor_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
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
                manager: null,
                loadCanvas() {
                    canvas_1.default.background = canvas_1.default.create(grid_1.default.width, grid_1.default.height, 1);
                    canvas_1.default.food = canvas_1.default.create(grid_1.default.width, grid_1.default.height, 2);
                    canvas_1.default.fruit = canvas_1.default.create(grid_1.default.width, grid_1.default.height, 3);
                    canvas_1.default.player = canvas_1.default.create(grid_1.default.width, grid_1.default.height, 4);
                    canvas_1.default.interface = canvas_1.default.create(grid_1.default.width, monitor_1.default.height, 5);
                    canvas_1.default.popUp = canvas_1.default.create(grid_1.default.width, grid_1.default.height, 6);
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