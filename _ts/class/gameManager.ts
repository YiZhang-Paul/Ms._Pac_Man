import { IGameManager, IFoodManager, IHud, IPopUp, IPacman, IGhost, IGhostManager, IMaze, IScoreBoard, IState } from "_ts/interfaces";
import Control from "_ts/object/control";
import Canvas from "_ts/object/canvas";
import StateMachine from "_ts/class/stateMachine";
import Grid from "_ts/class/grid";
import Maze from "_ts/class/userInterface/maze";
import ScoreBoard from "_ts/class/userInterface/scoreBoard";
import Hud from "_ts/class/userInterface/hud";
import ScorePopUp from "_ts/class/userInterface/scorePopUp";
import Pacman from "_ts/class/player/pacman";
import GhostManager from "_ts/class/player/ghostManager";
import FoodManager from "_ts/class/food/foodManager";

export default class GameManager implements IGameManager {

    private _id: number;
    private _life: number;
    private _score: number;
    private _highest: number;
    private _foodManager: IFoodManager;
    private _ghostManager: IGhostManager;
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
        this._pacman.reset();
        this._maze.reset();
        this._scoreBoard.reset();
        this._popUps = new Set<IPopUp>();
        this._stateManager.reset();
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
        const x = ghost.coordinate.x;
        const y = ghost.coordinate.y;
        this._popUps.add(new ScorePopUp(this, x, y, score));
        this.checkScore(score);
        this._stateManager.swap("ghostKilled");
    }

    public checkScore(score: number): void {

        this._score += score;
        this._highest = Math.max(this._score, this._highest);
        this._scoreBoard.draw();
    }

    public showFruits(): void {

        this._hud.draw();
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

    public update(timeStep: number): void {

        this._stateManager.update(timeStep);
    }

    private drawPopUps(): void {

        this._popUps.forEach(popUp => {

            popUp.draw();
        });
    }

    public draw(): void {

        this._ctx.clearRect(0, 0, Grid.width, Grid.height);
        this._pacman.draw();
        this._ghostManager.draw();
        this._foodManager.draw();
        this.drawPopUps();
    }
}