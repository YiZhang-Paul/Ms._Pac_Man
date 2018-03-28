import { IPopUp, IPoint, IGameManager } from "src/interfaces";
import Utility from "src/object/utility";
import Canvas from "src/object/canvas";
import Point from "src/class/point";
import Grid from "src/class/grid";

export default class ScorePopUp implements IPopUp {

    private _originator: IGameManager;
    private _width: number;
    private _height: number;
    private _coordinate: IPoint;
    private _value: number;
    private _spawn: number;
    private _lifespan: number;
    private _cropXY: IPoint;
    private _cropWidth: number;
    private _tile: HTMLImageElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(originator: IGameManager, x: number, y: number, value: number) {

        this._originator = originator;
        this._coordinate = new Point(x, y);
        this._value = value;
        this.initialize();
    }

    //check for the end of pop up lifecycle
    get isAlive(): boolean {

        return this._spawn + this._lifespan > Utility.now;
    }

    get width(): number {

        return this._width;
    }

    get height(): number {

        return this._height;
    }

    public initialize(): void {

        this._width = Grid.nodeSize * 1.8;
        this._height = this._width;
        this._spawn = Utility.now;
        this._lifespan = 1500;
        this._cropWidth = 32;
        this._tile = <HTMLImageElement>document.getElementById("tile");
        this._ctx = Canvas.popUp;
        this.getCropXY();
    }

    public reset(): void {

        this.initialize();
    }

    //calculate crop location on tile image
    private getCropXY(): void {
        //default x, y value for 500 score pop up
        let [x, y] = [224, 192];

        if(this._value !== 500) {

            x = (Math.log2(this._value / 100) - 1) * this._cropWidth;
            y = 224;
        }

        this._cropXY = new Point(x, y);
    }

    //erase pop up graphics only
    private erase(): void {

        this._ctx.clearRect(

            this._coordinate.x - this._width * 0.5,
            this._coordinate.y - this._height * 0.5,
            this._width,
            this._height
        );
    }

    //permanently delete pop up
    public dispose(): void {

        this._originator.removePopUp(this);
        this.erase();
    }

    public update(): void {

        if(!this.isAlive) {

            this.dispose();
        }
    }

    public draw(): void {

        this.erase();

        this._ctx.drawImage(

            this._tile,
            this._cropXY.x,
            this._cropXY.y,
            this._cropWidth,
            this._cropWidth,
            this._coordinate.x - this._width * 0.5,
            this._coordinate.y - this._height * 0.5,
            this._width,
            this._height
        );
    }
}