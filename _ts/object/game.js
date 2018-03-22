System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                state: null,
                timeStep: null,
                maze: null,
                manager: null,
                grid: null,
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
                    this.canvas.background = this.createCanvas(grid.width, grid.height, 1);
                    this.canvas.food = this.createCanvas(grid.width, grid.height, 2);
                    this.canvas.fruit = this.createCanvas(grid.width, grid.height, 3);
                    this.canvas.player = this.createCanvas(grid.width, grid.height, 4);
                    this.canvas.userInterface = this.createCanvas(grid.width, this.monitor.height, 5);
                    this.canvas.scorePopUp = this.createCanvas(grid.width, grid.height, 6);
                },
                initialize() {
                },
                run() {
                },
                reset() {
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