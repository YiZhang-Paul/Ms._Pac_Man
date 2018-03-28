import { IMaze } from "src/interfaces";
import Canvas from "src/object/canvas";

export default class Maze implements IMaze {

    private _width: number;
    private _height: number;
    private _tick: number;
    private _tile: HTMLImageElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {

        this._width = width;
        this._height = height;
        this.initialize();
    }

    get width(): number {

        return this._width;
    }

    get height(): number {

        return this._height;
    }

    //current tile image
    get tile(): HTMLImageElement {

        const id = this._tick ? "maze_clipped" : "maze";

        return <HTMLImageElement>document.getElementById(id);
    }

    public initialize(): void {

        this._tick = 0;
        this._ctx = Canvas.background;
        this.draw();
    }

    public reset(): void {

        this.initialize();
    }

    //change to next tick
    private flip(): void {

        this._tick = this._tick === 0 ? 1 : 0;
    }

    //blink maze borders
    public blink(): void {

        this.flip();
        this.draw();
    }

    public draw(): void {

        this._ctx.clearRect(0, 0, this._width, this._height);
        this._ctx.drawImage(this.tile, 0, 0, this._width, this._height);
    }
}