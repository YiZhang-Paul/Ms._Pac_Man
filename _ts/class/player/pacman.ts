import { IPacman, IGameManager, IGhost, IFood } from "_ts/interfaces";
import Control from "_ts/object/control";
import Player from "_ts/class/player/player";
import Point from "_ts/class/point";
import Grid from "_ts/class/grid";

export default class Pacman extends Player implements IPacman {

    private _killCount: number;
    private _isDying: boolean;
    private _lastGhostKilled: IGhost;
    private _deathTimeout: number;
    private _deathInterval: number;

    constructor(originator: IGameManager) {

        super("pacman", originator);
        this.initialize();
    }

    get isDying(): boolean {

        return this._isDying;
    }

    //total ghost killed since last power bean consumption
    get killCount(): number {

        return this._killCount;
    }

    get lastGhostKilled(): IGhost {

        return this._lastGhostKilled;
    }

    //can turn left or right (exclude turning around)
    get canTurn(): boolean {

        return this.onNodeCenter && this.withinMaze;
    }

    public initialize(): void {

        super.initialize();
        this._killCount = 0;
        this._speed = Math.round(Grid.height * 0.025) / 100;
        this._isDying = false;
        this._lastGhostKilled = null;
        this._totalTicks = 3;
        this._deathTimeout = null;
        this._deathInterval = null;
    }

    public reset(): void {

        super.reset();
        this._tick = 2;
        this._isDying = false;
    }

    //check if object can turn to given direction
    protected isValidDirection(direction: string): boolean {
        //can always turn around
        const isOpposite = direction === this.getOpposite();
        const isAccessible = !this.hasDoor(direction) && !this.hasWall(direction);

        return isOpposite || isAccessible;
    }

    //translate input key code to corresponding moving direction
    private readInputKey(key: number): string {

        switch(key) {

            case Control.W : case Control.UP :
            case Control.S : case Control.DOWN :

                return key === Control.W || key === Control.UP ? "up" : "down";

            case Control.A : case Control.LEFT :
            case Control.D : case Control.RIGHT :

                return key === Control.A || key === Control.LEFT ? "left" : "right";
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

    private consumeGhost(): void {

        this._originator.ghostManager.ghosts.forEach(ghost => {

            if(this.canKill(ghost)) {

                this._killCount++;
                this._lastGhostKilled = ghost;
                this._originator.killGhost();
            }
        });
    }

    private consumeFood(): void {

        let foodManager = this._originator.foodManager;

        if(this.onNodeCenter && foodManager.isBean(this._row, this._column)) {
            //refresh kill count on power bean consumption
            if(foodManager.isPowerBean(this._row, this._column)) {

                this._killCount = 0;
            }

            foodManager.remove(foodManager.getBean(this._row, this._column));
        }
    }

    private consumeFruit(): void {

        let foodManager = this._originator.foodManager;
        let fruit = foodManager.fruit;

        if(fruit === null) {

            return;
        }

        let fruitNode = Grid.getNode(fruit.coordinate);
        let pacmanNode = Grid.getNode(this._coordinate);

        if(fruitNode.isSame(pacmanNode)) {

            foodManager.remove(fruit);
        }
    }

    public consume(): void {

        this.consumeFood();
        this.consumeFruit();
        this.consumeGhost();
    }

    //calculate tile image crop location
    protected getCropXY(): void {

        const index = Grid.directions.indexOf(this._direction);
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

    private playDeathAnimation(): void {

        if(this._deathTimeout !== null || this._deathInterval !== null) {

            return;
        }

        let tick = 0;
        this._isDying = true;
        this.getDeathCropXY(tick);

        this._deathTimeout = setTimeout(() => {

            this._deathInterval = setInterval(() => {

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

        this._originator.changeState("resetting");
    }

    public update(timeStep: number): void {
        //animation
        this._onAnimation = this.toCollision !== 0;
        this.playAnimation(this._totalTicks, 100, 0);
        //movement
        this.setDirection();
        this.move(timeStep);
        //check food and ghost
        this.consume();
    }
}