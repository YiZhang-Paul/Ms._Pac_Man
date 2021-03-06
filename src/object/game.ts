import { IGame, IGameManager } from "../interfaces";
import Monitor from "../object/monitor";
import Utility from "../object/utility";
import Canvas from "../object/canvas";
import Control from "../object/control";
import GameManager from "../class/gameManager";
import Grid from "../class/grid";

export default <IGame>{

    _state    : null,
    _timeStep : null,
    _manager  : null,

    get state(): string {

        return this._state;
    },

    //fps control
    get timeStep(): number {

        return this._timeStep;
    },

    get manager(): IGameManager {

        return this._manager;
    },

    //in-game canvases
    loadCanvas(): void {

        Canvas.background = Canvas.create(Grid.width, Grid.height, 1);
        Canvas.food = Canvas.create(Grid.width, Grid.height, 2);
        Canvas.fruit = Canvas.create(Grid.width, Grid.height, 3);
        Canvas.player = Canvas.create(Grid.width, Grid.height, 4);
        Canvas.interface = Canvas.create(Grid.width, Monitor.height, 5);
        Canvas.popUp = Canvas.create(Grid.width, Grid.height, 6);
    },

    loadAsset(): void {

        this.loadCanvas();
        this._manager = new GameManager();
    },

    /**
     * keyboard event listeners
     */
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
        this._state = "initialized";
    },

    run(): void {
        //fps optimization
        const maxFps = 60;
        let delta = 0;
        let lastFrameRender = 0;
        this._timeStep = Utility.roundTo(1000 / maxFps, 2);

        const mainLoop = timestamp => {
            //sync with target fps
            if(timestamp < lastFrameRender + this._timeStep) {

                requestAnimationFrame(mainLoop);

                return;
            }

            //update delta time and record most recent render
            delta += timestamp - lastFrameRender;
            lastFrameRender = timestamp;
            let counter = 0;

            while(delta > this._timeStep) {

                this.update();
                delta -= this._timeStep;

                if(++counter >= 240) {

                    delta = 0;
                }
            }

            this.draw();
            requestAnimationFrame(mainLoop);
        }
        //run game
        requestAnimationFrame(mainLoop);
        this._state = "running";
    },

    reset(): void {

        this._manager.reset();
    },

    update(): void {

        this._manager.update(this._timeStep);
    },

    draw(): void {

        this._manager.draw();
    }
};