import { IFood, IPoint, IFoodManager } from "src/interfaces";
import Point from "src/class/point";
import Canvas from "src/object/canvas";
import Grid from "src/class/grid";

export default class Bean implements IFood {

    private _originator: IFoodManager;
    private _row: number;
    private _column: number;
    private _coordinate: IPoint;
    protected _score: number;
    private _color: string;
    protected _radius: number;
    private _ctx: CanvasRenderingContext2D;

    constructor(row: number, column: number, originator: IFoodManager) {

        this._originator = originator;
        this._row = row;
        this._column = column;
        this._coordinate = new Point(this.x, this.y);
        this._score = 10;
        this._color = "red";
        this._radius = Grid.nodeSize * 0.2;
        this._ctx = Canvas.food;
    }

    get row(): number {

        return this._row;
    }

    get column(): number {

        return this._column;
    }

    get x(): number {

        return (this._column + 0.5) * Grid.nodeSize;
    }

    get y(): number {

        return (this._row + 0.5) * Grid.nodeSize;
    }

    get coordinate(): IPoint {

        return this._coordinate;
    }

    get score(): number {

        return this._score;
    }

    //erase bean graphics only
    protected erase(): void {

        this._ctx.clearRect(

            this._coordinate.x - 0.5 * Grid.nodeSize,
            this._coordinate.y - 0.5 * Grid.nodeSize,
            Grid.nodeSize,
            Grid.nodeSize
        );
    }

    //permanently delete bean
    public dispose(): void {

        this._originator.remove(this);
        this.erase();
    }

    public draw(): void {

        this._ctx.beginPath();
        this._ctx.arc(this._coordinate.x, this._coordinate.y, this._radius, 0, Math.PI * 2);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
    }
}