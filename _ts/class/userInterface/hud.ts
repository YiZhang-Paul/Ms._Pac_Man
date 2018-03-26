import { IHud, IGameManager } from "_ts/interfaces";
import Monitor from "_ts/object/monitor";
import Canvas from "_ts/object/canvas";
import Grid from "_ts/object/grid";

export default class Hud implements IHud {

    private _originator: IGameManager;
    private _width: number;
    private _height: number;
    private _loaded: boolean;
    private _iconSize: number;
    private _margin: number;
    private _cropWidth: number;
    private _tile: HTMLImageElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(originator: IGameManager) {

        this._originator = originator;
        this.initialize();
    }

    get width(): number {

        return this._width;
    }

    get height(): number {

        return this._height;
    }

    public initialize(): void {

        this._width = Grid.width;
        this._height = (Monitor.height - Grid.height) * 0.5;
        this._loaded = false;
        this._iconSize = Grid.nodeSize * 2;
        this._margin = this._height * 0.05;
        this._cropWidth = 32;
        this._tile = <HTMLImageElement>document.getElementById("tile");
        this._ctx = Canvas.interface;
        this.draw();
    }

    public reset(): void {

        this.draw();
    }

    public load(): void {

        if(!this._loaded && this._tile.complete) {

            this.draw();
            this._loaded = true;
        }
    }

    public showLife(): void {
        //exclude current player life
        for(let i = 0; i < this._originator.life - 1; i++) {

            this._ctx.drawImage(

                this._tile,
                this._cropWidth,
                this._cropWidth,
                this._cropWidth,
                this._cropWidth,
                i * (this._iconSize + this._margin),
                Monitor.height - this._height + this._margin,
                this._iconSize,
                this._iconSize
            );
        }
    }

    public showFruits(): void {

        let fruits = this._originator.foodManager.fruitQueue;
        //display fruit queue from head to tail
        for(let i = fruits.length - 1; i >= 0; i--) {

            this._ctx.drawImage(

                this._tile,
                this._cropWidth * (fruits[i] - 1),
                this._cropWidth * 6,
                this._cropWidth,
                this._cropWidth,
                this._width - (fruits.length - i) * (this._iconSize + this._margin),
                Monitor.height - this._height + this._margin,
                this._iconSize,
                this._iconSize
            );
        }
    }

    public draw(): void {

        this._ctx.clearRect(0, Monitor.height - this._height, this._width, this._height);
        this.showLife();
        this.showFruits();
    }
}