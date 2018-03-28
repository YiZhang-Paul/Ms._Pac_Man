import { IScoreBoard, IGameManager } from "src/interfaces";
import Monitor from "src/object/monitor";
import Canvas from "src/object/canvas";
import Grid from "src/class/grid";

export default class ScoreBoard implements IScoreBoard {

    private _originator: IGameManager;
    private _width: number;
    private _height: number;
    private _fontSize: number;
    private _interval: number;
    private _tick: number;
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
        this._fontSize = this._height * 0.45;
        this._interval = null;
        this._tick = 0;
        this._ctx = Canvas.interface;
        this.draw();
        this.blinkId();
    }

    public reset(): void {
        //stop blinking player id
        if(this._interval !== null) {

            clearInterval(this._interval);
            this._interval = null;
        }

        this._tick = 0;
        this.draw();
    }

    //change to next tick
    private flip(): void {

        this._tick = this._tick === 0 ? 1 : 0;
    }

    //blink player id
    public blinkId(): void {

        if(this._interval === null) {

            this._interval = setInterval(() => {

                this.flip();
                this.draw();

            }, 150);
        }
    }

    private drawTexts(texts: string[][]): void {

        for(let i = 0; i < texts.length; i++) {

            for(let j = 0; j < texts[i].length; j++) {
                //blink player id and always draw other texts
                if(i !== 0 || j !== 0 || this._tick !== 0) {

                    this._ctx.fillText(

                        texts[i][j],
                        this._width * (0.2 + i * 0.4),
                        this._height * (0.5 + j * 0.43)
                    );
                }
            }
        }
    }

    public draw(): void {

        this._ctx.clearRect(0, 0, this._width, this._height);
        this._ctx.font = this._fontSize + "px 'Lucida Console'";
        this._ctx.textAlign = "center";
        this._ctx.fillStyle = "white";

        this.drawTexts([

            [`${this._originator.id}UP`, String(this._originator.score)],
            ["HIGH SCORE", String(this._originator.highest)]
        ]);
    }
}