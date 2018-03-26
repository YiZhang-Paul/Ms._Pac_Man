import { IGameManager, IFoodManager, IFood, IBlinkableFood, IFruit } from "_ts/interfaces";
import Utility from "_ts/object/utility";
import Canvas from "_ts/object/canvas";
import Grid from "_ts/object/grid";
import Bean from "_ts/class/food/bean";
import PowerBean from "_ts/class/food/powerBean";
import Fruit from "_ts/class/food/fruit";

export default class FoodManager implements IFoodManager {

    private _originator: IGameManager;
    private _totalBeans: number;
    private _powerBeans: Set<IBlinkableFood>;
    private _fruitQueue: number[];
    private _fruit: IFruit;
    private _timeout: number;
    private _fruitInterval: number;
    private _beanInterval: number;
    private _ctx: CanvasRenderingContext2D;

    constructor(originator: IGameManager) {

        this._originator = originator;
        this.initialize();
    }

    get totalBeans(): number {

        return this._totalBeans;
    }

    get fruitQueue(): number[] {

        return this._fruitQueue;
    }

    get canPutFruit(): boolean {

        if(this._fruit !== null || this._timeout !== null) {

            return false;
        }

        return this._fruitQueue.length > 0;
    }

    public initialize(): void {

        this._totalBeans = 0;
        this._powerBeans = new Set<IBlinkableFood>();
        this._fruitQueue = new Array<number>();
        this._fruit = null;
        this._timeout = null;
        this._fruitInterval = null;
        this._beanInterval = null;
        this._ctx = Canvas.food;
        this.putBeans();
        this.blink();
    }

    public reset(): void {

        this._powerBeans = new Set<IBlinkableFood>();
        this._fruitQueue = new Array<number>();

        if(this._fruit !== null) {

            this._fruit.dispose();
        }
    }

    //blink all power beans
    private blink(): void {

        if(this._beanInterval === null) {

            this._beanInterval = setInterval(() => {

                this._powerBeans.forEach(bean => {

                    bean.blink();
                });

            }, 150);
        }
    }

    private createBean(row: number, column: number, type: string): IFood {

        if(type === "l") {

            return new PowerBean(row, column, this);
        }

        return new Bean(row, column, this);
    }

    private putBean(row: number, column: number, type: string): void {

        let bean = this.createBean(row, column, type);
        //register bean on logic layer
        Grid.setContent(0, row, column, bean);
        bean.draw();
        this._totalBeans++;

        if(type === "l") {

            this._powerBeans.add(<IBlinkableFood>bean);
        }
    }

    public putBeans(): void {

        this._totalBeans = 0;
        this._ctx.clearRect(0, 0, Grid.width, Grid.height);

        for(let i = 0; i < Grid.rows; i++) {

            for(let j = 0; j < Grid.columns; j++) {

                let content = Grid.getContent(1, i, j);
                //check meta layer
                if(content.hasOwnProperty("f")) {

                    this.putBean(i, j, content.f);
                }
            }
        }
    }

    private createFruit(type: number): IFruit {

        let row: number;
        let column: number;
        let direction: string;
        //randomize fruit spawn location
        if(Math.random() < 0.5) {

            row = Math.random() < 0.5 ? 0 : Grid.rows - 1;
            column = Math.floor(Math.random() * (Grid.columns - 10)) + 5;
            direction = row === 0 ? "down" : "up";
        }
        else {

            row = Math.floor(Math.random() * (Grid.rows - 10)) + 5;
            column = Math.random() < 0.5 ? 0 : Grid.columns - 1;
            direction = column === 0 ? "right" : "left";
        }

        return new Fruit(this, row, column, type, direction);
    }

    //add next fruit to queue
    private queueFruit(): void {

        if(this._fruitInterval === null) {

            this._fruitInterval = setInterval(() => {

                if(this._fruitQueue.length < 5) {
                    //pick random fruit type
                    this._fruitQueue.push(Utility.getRandom(1, 7));
                    this._originator.hud.showFruits();
                }

            }, 1000);
        }
    }

    //place first fruit in queue on game area
    public putFruit(): void {

        if(!this.canPutFruit) {

            return;
        }

        this._timeout = setTimeout(() => {

            this._fruit = this.createFruit(this._fruitQueue.shift());
            this._originator.hud.showFruits();

            clearTimeout(this._timeout);
            this._timeout = null;

        }, Utility.getRandom(10, 20) * 1000);
    }

    public remove(food: IFood): void {
        //remove fruit
        if(food === this._fruit) {

            this._fruit === null;

            return;
        }
        //remove beans
        this._powerBeans.delete(<IBlinkableFood>food);
        Grid.setContent(0, food.row, food.column, null);
    }

    public update(timeStep: number): void {

        this.queueFruit();
        this.putFruit();

        if(this._fruit !== null) {

            this._fruit.update(timeStep);
        }
    }

    public draw(): void {

        if(this._fruit !== null) {

            this._fruit.draw();
        }
    }
}