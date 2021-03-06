import { IPacman, IGameManager, IGhost, IFood, IFoodManager } from "../../interfaces";
import { Direction } from "../../object/direction";
import Control from "../../object/control";
import Player from "../../class/player/player";
import Sound from "../../class/sound";
import Point from "../../class/point";
import Grid from "../../class/grid";

export default class Pacman extends Player implements IPacman {

    private _foodManager: IFoodManager;
    private _killCount: number;
    private _isDying: boolean;
    private _deathTimeout: number;
    private _deathInterval: number;

    constructor(originator: IGameManager, foodManager: IFoodManager) {

        super("pacman", originator);
        this._foodManager = foodManager;
        this.initialize();
    }

    get isDying(): boolean {

        return this._isDying;
    }

    //total ghost killed since last power bean consumption
    get killCount(): number {

        return this._killCount;
    }

    public initialize(): void {

        super.initialize();
        this._killCount = 0;
        this._speed = Math.round(Grid.height * 0.025) / 100;
        this._isDying = false;
        this._totalTicks = 3;
        this._deathTimeout = null;
        this._deathInterval = null;
    }

    public reset(): void {

        super.reset();
        this._tick = 2;
        this._isDying = false;
    }

    //check if pacman can turn to given direction
    protected isValidDirection(direction: number): boolean {
        //can always turn around
        const isOpposite = direction === this.getOpposite();
        const isAccessible = !this.hasDoor(direction) && !this.hasWall(direction);

        return isOpposite || isAccessible;
    }

    //translate input key code to corresponding moving direction
    private readInputKey(key: number): number {

        switch(key) {

            case Control.W : case Control.UP :
            case Control.S : case Control.DOWN :

                return key === Control.W || key === Control.UP ? Direction.UP : Direction.DOWN;

            case Control.A : case Control.LEFT :
            case Control.D : case Control.RIGHT :

                return key === Control.A || key === Control.LEFT ? Direction.LEFT : Direction.RIGHT;
        }

        return this._direction;
    }

    protected setDirection(): void {

        const key = Control.active;

        if(key !== null) {

            const direction = this.readInputKey(key);
            //can always turn around
            const isOpposite = direction === this.getOpposite();
            const canTurn = this.canTurn && this.isValidDirection(direction);

            if(isOpposite || canTurn) {

                this._direction = direction;
            }
        }
    }

    private canKill(ghost: IGhost): boolean {
        //can only kill ghost on flee or transition state
        if(!new Set(["flee", "transition"]).has(ghost.state)) {

            return false;
        }

        return this.distanceToMovable(ghost) < Grid.nodeSize * 0.5;
    }

    public killGhost(): void {

        let originator = <IGameManager>this._originator;

        originator.ghosts.forEach(ghost => {

            if(this.canKill(ghost)) {

                this._killCount++;
                originator.killGhost(ghost);
                Sound.play(<HTMLAudioElement>document.getElementById("eat_ghost"));
            }
        });
    }

    private clearEatSound(): void {

        let sound = <HTMLAudioElement>document.getElementById("eat_bean");

        if(Sound.isPlaying(sound) && this._timeout === null) {

            this._timeout = window.setTimeout(() => {

                clearTimeout(this._timeout);
                this._timeout = null;

                Sound.clear(sound);

            }, 350);
        }
    }

    private consumeFood(): void {

        if(!this.onNodeCenter) {

            return;
        }

        if(!this._foodManager.isBean(this._row, this._column)) {

            this.clearEatSound();

            return;
        }
        //refresh kill count on power bean consumption
        if(this._foodManager.isPowerBean(this._row, this._column)) {

            this._killCount = 0;
        }

        this._foodManager.getBean(this._row, this._column).dispose();
        Sound.play(<HTMLAudioElement>document.getElementById("eat_bean"), 1);
    }

    private consumeFruit(): void {

        let fruit = this._foodManager.fruit;

        if(fruit === null) {

            return;
        }
        //check fruit position
        let fruitNode = Grid.getNode(fruit.coordinate);
        let pacmanNode = Grid.getNode(this._coordinate);

        if(fruitNode.isSame(pacmanNode)) {

            fruit.dispose(false);
            Sound.play(<HTMLAudioElement>document.getElementById("eat_fruit"));
        }
    }

    public consume(): void {

        this.consumeFood();
        this.consumeFruit();
    }

    //calculate tile image crop location
    protected getCropXY(): void {

        let directions: number[] = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        const index = directions.indexOf(this._direction);
        const x = (index * 3 + this._tick) * this._cropWidth % 256;
        const y = Math.floor((index * 3 + this._tick) * this._cropWidth / 256) * this._cropWidth;

        this._cropXY = new Point(x, y);
    }

    //calculate tile image crop location for death animation
    private getDeathCropXY(tick: number): void {

        const x = tick % 8 * this._cropWidth;
        const y = (Math.floor(tick / 8) + 8) * this._cropWidth;

        this._cropXY = new Point(x, y);
    }

    public playDeathAnimation(): void {

        if(this._deathTimeout !== null || this._deathInterval !== null) {

            return;
        }

        let tick = 0;
        this._isDying = true;
        this.getDeathCropXY(tick);

        this._deathTimeout = window.setTimeout(() => {

            this._deathInterval = window.setInterval(() => {

                this.getDeathCropXY(++tick);

                if(tick === 13) {

                    this.stopDeathAnimation();
                }

            }, 140);

        }, 1500);
    }

    private stopDeathAnimation(): void {

        clearTimeout(this._deathTimeout);
        this._deathTimeout = null;
        clearInterval(this._deathInterval);
        this._deathInterval = null;

        (<IGameManager>this._originator).killPacman(true);
    }

    public update(timeStep: number): void {
        //animation
        this._onAnimation = this.toCollision !== 0;
        this.playAnimation(this._totalTicks, 70, 0);
        //movement
        this.setDirection();
        this.move(timeStep);
        //check food and ghost
        this.consume();
        this.killGhost();
    }
}