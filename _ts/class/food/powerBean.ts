import { IFoodManager, IBlinkableFood } from "_ts/interfaces";
import Bean from "_ts/class/food/bean";
import Grid from "_ts/class/grid";

export default class PowerBean extends Bean implements IBlinkableFood {

    private _tick: number;

    constructor(row: number, column: number, originator: IFoodManager) {

        super(row, column, originator);
        this._tick = 0;
        this._score = 50;
        this._radius = Grid.nodeSize * 0.45;
    }

    //change to next tick
    private flip(): void {

        this._tick = this._tick === 0 ? 1 : 0;
    }

    public blink(): void {

        this.flip();

        if(this._tick) {

            this.draw();
        }
        else {

            this.erase();
        }
    }
}