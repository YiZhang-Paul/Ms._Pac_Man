import {

    IGameManager, IFoodManager, IHud, IPopUp,
    IPacman, IGhost, IGhostManager, IMaze,
    IPoint, IScoreBoard, IState

} from "src/interfaces";

import Control from "src/object/control";
import Canvas from "src/object/canvas";
import StateMachine from "src/class/stateMachine";
import Grid from "src/class/grid";
import Maze from "src/class/userInterface/maze";
import ScoreBoard from "src/class/userInterface/scoreBoard";
import Hud from "src/class/userInterface/hud";
import ScorePopUp from "src/class/userInterface/scorePopUp";
import Pacman from "src/class/player/pacman";
import GhostManager from "src/class/player/ghostManager";
import FoodManager from "src/class/food/foodManager";

export default class GameManager implements IGameManager {

    private _id: number;
    private _life: number;
    private _score: number;
    private _highest: number;
    private _foodManager: IFoodManager;
    private _ghostManager: IGhostManager;
    private _lastGhostKilled: IGhost;
    private _pacman: IPacman;
    private _maze: IMaze;
    private _scoreBoard: IScoreBoard;
    private _hud: IHud;
    private _popUps: Set<IPopUp>;
    private _timeout: number;
    private _interval: number;
    private _ctx: CanvasRenderingContext2D;
    private _stateManager: IState;

    constructor() {

        this.initialize();
    }

    get id(): number {

        return this._id;
    }

    get life(): number {

        return this._life;
    }

    get score(): number {

        return this._score;
    }

    get highest(): number {

        return this._highest;
    }

    get state(): string {

        return this._stateManager.active;
    }

    get pacman(): IPacman {

        return this._pacman;
    }

    get ghosts(): Set<IGhost> {

        return this._ghostManager.ghosts;
    }

    public initialize(): void {

        this._id = 1;
        this._life = 4;
        this._score = 0;
        this._highest = this._score;
        this._foodManager = new FoodManager(this);
        this._ghostManager = new GhostManager(this);
        this._lastGhostKilled = null;
        this._pacman = new Pacman(this, this._foodManager);
        this._maze = new Maze(Grid.width, Grid.height);
        this._hud = new Hud(this, this._foodManager);
        this._popUps = new Set<IPopUp>();
        this._timeout = null;
        this._interval = null;
        this._ctx = Canvas.player;
        this._stateManager = new StateMachine(this, "loaded");

        if(this._scoreBoard === undefined) {

            this._scoreBoard = new ScoreBoard(this);
        }
        else {

            this._scoreBoard.reset();
        }
    }

    public reset(): void {

        this._score = 0;
        this._ghostManager.reset();
        this._lastGhostKilled = null;
        this._foodManager.reset();
        this._pacman.reset();
        this._maze.reset();
        this._hud.reset();
        this._scoreBoard.reset();
        this._stateManager.reset();
    }

    public startFlee(): void {

        this._ghostManager.startFlee();
    }

    public killPacman(killed: boolean): void {

        if(killed) {

            this._life--;
            this._stateManager.swap("resetting");

            return;
        }

        this._stateManager.swap("pacmanDying");
    }

    public killGhost(ghost: IGhost): void {

        const multiplier = Math.pow(2, this._pacman.killCount - 1);
        const score = ghost.score * multiplier;
        this.checkScore(score);
        this.addPopUp(ghost.coordinate, score);
        this._lastGhostKilled = ghost;
        this._lastGhostKilled.startRetreat();
        this._stateManager.swap("ghostKilled");
    }

    public checkScore(score: number): void {

        this._score += score;
        this._highest = Math.max(this._score, this._highest);
        this._scoreBoard.draw();
    }

    public checkGameState(): void {

        if(this._foodManager.totalBeans === 0) {

            this._stateManager.swap("resetting");
        }
    }

    public showFruits(): void {

        this._hud.draw();
    }

    public addPopUp(coordinate: IPoint, score: number): void {

        this._popUps.add(new ScorePopUp(this, coordinate.x, coordinate.y, score));
    }

    public removePopUp(popUp: IPopUp): void {

        this._popUps.delete(popUp);
    }

    private loaded(timeStep: number): void {

        this._hud.load();
        this.startGame(timeStep);
    }

    private startGame(timeStep: number): void {

        if(Control.active !== null) {

            this._ghostManager.startMove();
            this._stateManager.swap("ongoing");
        }
    }

    private ongoing(timeStep: number): void {

        this._pacman.update(timeStep);
        this._ghostManager.update(timeStep);
        this._foodManager.update(timeStep);
    }

    private ghostKilled(timeStep: number): void {

        this.ghosts.forEach(ghost => {

            if(ghost !== this._lastGhostKilled && ghost.state === "retreat") {

                ghost.update(timeStep);
            }
        });

        if(this._timeout === null) {

            this._pacman.stopAnimation(0);

            this._timeout = setTimeout(() => {

                this._stateManager.swap("ongoing");

                clearTimeout(this._timeout);
                this._timeout = null;

            }, 400);
        }
    }

    private pacmanDying(timeStep: number): void {

        if(this._timeout === null && !this._pacman.isDying) {

            this._pacman.stopAnimation(2);

            this._timeout = setTimeout(() => {

                this._pacman.playDeathAnimation();

                clearTimeout(this._timeout);
                this._timeout = null;

            }, 2000);
        }
    }

    private resetting(timeStep: number): void {

        if(this._interval === null && this._timeout === null) {

            this._interval = setInterval(() => {

                this._maze.blink();

            }, 300);

            this._timeout = setTimeout(() => {

                clearTimeout(this._timeout);
                this._timeout = null;
                clearInterval(this._interval);
                this._interval = null;

                if(this._life === 0) {

                    this.initialize();
                }
                else {

                    this.reset();
                }

            }, 3000);
        }
    }

    public update(timeStep: number): void {

        this._stateManager.update(timeStep);

        this._popUps.forEach(popUp => {

            popUp.update();
        });
    }

    private drawPopUps(): void {

        this._popUps.forEach(popUp => {

            popUp.draw();
        });
    }

    public draw(): void {

        this._ctx.clearRect(0, 0, Grid.width, Grid.height);
        this._foodManager.draw();
        this.drawPopUps();

        if(this.state !== "resetting") {

            this._pacman.draw();
        }

        if(!this._pacman.isDying && this.state !== "resetting") {

            this._ghostManager.draw();
        }
    }
}