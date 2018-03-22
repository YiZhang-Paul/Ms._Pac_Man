import { IGame } from "_ts/interfaces";
import Monitor from "_ts/object/monitor";
import Utility from "_ts/object/utility";
import Canvas from "_ts/object/canvas";
import Control from "_ts/object/control";
import Grid from "_ts/object/grid";

export default <IGame>{

    state      : null,
    timeStep   : null,
    maze       : null,
    manager    : null,

    loadCanvas(): void {

        Canvas.background = Canvas.create(Grid.width, Grid.height, 1);
        Canvas.food = Canvas.create(Grid.width, Grid.height, 2);
        Canvas.fruit = Canvas.create(Grid.width, Grid.height, 3);
        Canvas.player = Canvas.create(Grid.width, Grid.height, 4);
        Canvas.userInterface = Canvas.create(Grid.width, Monitor.height, 5);
        Canvas.scorePopUp = Canvas.create(Grid.width, Grid.height, 6);
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