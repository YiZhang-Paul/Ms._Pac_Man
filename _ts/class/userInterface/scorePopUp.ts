import { IPopUp, IPoint, IGameManager } from "_ts/interfaces";
import Utility from "_ts/object/utility";
import Canvas from "_ts/object/canvas";
import Grid from "_ts/object/grid";
import Point from "_ts/class/point";

export default class ScorePopUp implements IPopUp {

    private _originator: IGameManager;
    private _width: number;
    private _height: number;
    private _coordinate: IPoint;
    private _value: number;
    private _spawn: number;
    private _duration: number;
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

    //check for the end of current pop up lifecycle
    get isAlive(): boolean {

        return this._spawn + this._duration > Utility.now;
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
        this._duration = 1500;
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

        this._originator.popUps.delete(this);
        this.erase();
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