import { IPlayer, IManager } from "../../interfaces";
import Canvas from "../../object/canvas";
import Locations from "../../object/locations";
import Movable from "../../class/player/movable";
import Grid from "../../class/grid";

export default abstract class Player extends Movable implements IPlayer {

    protected _originator: IManager;
    protected _name: string;
    protected _tick: number;
    protected _totalTicks: number;
    protected _timeout: number;
    protected _interval: number;
    protected _isMoving: boolean;
    protected _onAnimation: boolean;

    constructor(name: string, originator: IManager) {

        super(null, null, null);
        this._name = name;
        this._originator = originator;
    }

    get isMoving(): boolean {

        return this._isMoving;
    }

    get onAnimation(): boolean {

        return this._onAnimation;
    }

    //can turn left or right (exclude turning around)
    get canTurn(): boolean {

        return this.onNodeCenter && this.withinMaze;
    }

    set isMoving(value: boolean) {

        this._isMoving = value;
    }

    set onAnimation(value: boolean) {

        this._onAnimation = value;
    }

    public initialize(): void {

        super.initialize();
        Locations.setLocation(this, this._name);
        this._tick = 0;
        this._totalTicks = null;
        this._timeout = null;
        this._interval = null;
        this._isMoving = false;
        this._onAnimation = false;
        this._ctx = Canvas.player;
        //recalculate crop location since direction is reset
        this.getCropXY();
        this.syncLocation();
    }

    public reset(): void {

        if(this._interval !== null) {

            clearInterval(this._interval);
            this._interval = null;
        }

        super.reset();
        this.initialize();
    }

    //warp from one side to the other side of tunnel
    protected crossTunnel(): void {

        const left = -Grid.nodeSize;
        const right = Grid.width + Grid.nodeSize;

        if(this._coordinate.x < left || this._coordinate.x > right) {

            this._coordinate.x = this._coordinate.x < left ? right : left;
        }
    }

    //adjust current speed to ensure object can reach grid center
    protected adjustSpeed(speed: number): number {

        const toCollision = this.toCollision;

        if(toCollision !== null) {

            return Math.min(speed, toCollision);
        }

        return super.adjustSpeed(speed);
    }

    protected move(timeStep: number): void {

        super.move(timeStep);
        this.crossTunnel();

        if(this.withinMaze) {

            this.syncLocation();
        }
    }

    //move to next step of animation
    private nextTick(totalTicks: number = this._totalTicks): void {

        this._tick = (this._tick + 1) % totalTicks;
        this.getCropXY();
    }

    public playAnimation(

        totalTicks: number = this._totalTicks,
        speed: number = 100,
        endTick: number = this._tick

    ): void {

        if(!this._onAnimation) {

            this.stopAnimation(endTick);

            return;
        }
        //start animation
        if(this._interval === null) {

            this._interval = window.setInterval(() => {

                this.nextTick(totalTicks);

            }, speed);
        }
    }

    public stopAnimation(endTick: number): void {

        if(this._interval !== null) {

            clearInterval(this._interval);
            this._interval = null;
            //stop at given animation step
            this._tick = endTick;
            this.getCropXY();
        }
    }

    public draw(): void {

        this._ctx.drawImage(

            this._tile,
            this._cropXY.x,
            this._cropXY.y,
            this._cropWidth,
            this._cropWidth,
            this._coordinate.x - Grid.nodeSize * 0.8,
            this._coordinate.y - Grid.nodeSize * 0.8,
            Grid.nodeSize * 1.6,
            Grid.nodeSize * 1.6
        );
    }
}