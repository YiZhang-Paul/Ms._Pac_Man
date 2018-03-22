import { IGame } from "_ts/interfaces";
import Monitor from "_ts/object/monitor";
import Utility from "_ts/object/utility";
import Control from "_ts/object/control";
import Grid from "_ts/object/grid";

export default <IGame>{

    state      : null,
    timeStep   : null,
    maze       : null,
    manager    : null,

    canvas     : {

        background    : null,
        food          : null,
        fruit         : null,
        player        : null,
        userInterface : null,
        scorePopUp    : null
    },

    createCanvas(width, height, zIndex): CanvasRenderingContext2D {

        let canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.zIndex = zIndex;

        document.getElementById("board").appendChild(canvas);

        return canvas.getContext("2d");
    },

    loadCanvas(): void {

        this.canvas.background = this.createCanvas(Grid.width, Grid.height, 1);
        this.canvas.food = this.createCanvas(Grid.width, Grid.height, 2);
        this.canvas.fruit = this.createCanvas(Grid.width, Grid.height, 3);
        this.canvas.player = this.createCanvas(Grid.width, Grid.height, 4);
        this.canvas.userInterface = this.createCanvas(Grid.width, Monitor.height, 5);
        this.canvas.scorePopUp = this.createCanvas(Grid.width, Grid.height, 6);
    },

    loadAsset(): void {

        Grid.initialize();
        this.loadCanvas();
    },

    registerKeyDown(): void {

        document.addEventListener("keydown", event => {

            const key = event.keyCode;

            switch(key) {

                case Control.W : case Control.UP :
                case Control.S : case Control.DOWN :
                case Control.A : case Control.LEFT :
                case Control.D : case Control.RIGHT :

                    Control.add(key);
            }
        });
    },

    registerKeyUp(): void {

        document.addEventListener("keyup", event => {

            const key = event.keyCode;

            switch(key) {

                case Control.W : case Control.UP :
                case Control.S : case Control.DOWN :
                case Control.A : case Control.LEFT :
                case Control.D : case Control.RIGHT :

                    Control.remove(key);
            }
        });
    },

    initialize(): void {

        this.loadAsset();
        this.registerKeyDown();
        this.registerKeyUp();
        this.state = "initialized";
    },

    run(): void {
        //fps optimization
        const maxFps = 60;
        let delta = 0;
        let lastFrameRender = 0;
        this.timeStep = Utility.roundTo(1000 / maxFps, 2);

        const mainLoop = timestamp => {
            //sync with target fps
            if(timestamp < lastFrameRender + this.timeStep) {

                requestAnimationFrame(mainLoop);

                return;
            }

            //update delta time and record most recent render
            delta += timestamp - lastFrameRender;
            lastFrameRender = timestamp;
            let counter = 0;

            while(delta > this.timeStep) {

                this.update();
                delta -= this.timeStep;

                if(++counter >= 240) {

                    delta = 0;
                }
            }

            this.draw();
            requestAnimationFrame(mainLoop);
        }
        //run game
        requestAnimationFrame(mainLoop);
        this.state = "running";
    },

    reset(): void {

        this.manager.reset();
    },

    update(): void {

        this.manager.update(this.timeStep);
    },

    draw(): void {

        this.manager.draw();
    }
};