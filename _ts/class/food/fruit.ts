import { IFood, IFoodManager } from "_ts/interfaces";
import Utility from "_ts/object/utility";
import Canvas from "_ts/object/canvas";
import Grid from "_ts/object/grid";
import Point from "_ts/class/point";
import Movable from "_ts/class/player/movable";

export default class Fruit extends Movable implements IFood {

    private _originator: IFoodManager;
    private _type: number;
    private _score: number;
    private _spawn: number;
    private _lifespan: number;
    private _falling: boolean;
    private _jumpHeight: number;
    private _maxJumpHeight: number;
    private _jumpSpeed: number;

    constructor(

        originator: IFoodManager,
        row: number,
        column: number,
        type: number,
        direction: string

    ) {

        super(row, column, direction);
        this._originator = originator;
        this._type = type;
        this.initialize();
    }

    get score(): number {

        return this._score;
    }

    //check for the end of fruit lifecycle
    get isAlive(): boolean {

        return this._spawn + this._lifespan > Utility.now;
    }

    get canTurn(): boolean {
        //go straight out of maze area at the end of lifecycle
        if(!this.isAlive || !this.onNodeCenter) {

            return false;
        }

        return Grid.isAccessible(this._row, this._column);
    }

    public initialize(): void {

        super.initialize();
        this._score = 500;
        this._spawn = Utility.now;
        this._lifespan = 30000;
        this._falling = false;
        this._jumpHeight = 0;
        this._maxJumpHeight = Grid.nodeSize;
        this._jumpSpeed = Grid.nodeSize * 0.1;
        this._speed = Math.round(Grid.height * 0.01) / 100;
        this._ctx = Canvas.fruit;
        this.getCropXY();
    }

    //erase fruit graphics only
    private erase(): void {

        this._ctx.clearRect(

            this._coordinate.x - Grid.nodeSize * 2,
            this._coordinate.y - Grid.nodeSize * 2,
            Grid.nodeSize * 4,
            Grid.nodeSize * 4
        );
    }

    //permanently delete fruit
    public dispose(): void {

        this._originator.remove(this);
        this.erase();
    }

    //self-dispose when going out of maze area
    private autoDispose(): void {

        if(!Grid.exists(this._row, this._column)) {

            this.dispose();
        }
    }

    protected getCropXY(): void {

        const x = this._cropWidth * (this._type - 1);
        const y = this._cropWidth * 6;

        this._cropXY = new Point(x, y);
    }

    protected isValidDirection(direction: string): boolean {

        return direction !== this.getOpposite();
    }

    private getValidDirections(): string[] {

        return Grid.directions.filter(direction => {

            return this.isValidDirection(direction);
        });
    }

    private jump(): void {

        if(this._jumpHeight >= this._maxJumpHeight) {

            this._falling = true;
        }
        else if(this._jumpHeight <= 0) {

            this._falling = false;
        }

        this._jumpHeight += this._jumpSpeed * (this._falling ? -1 : 1);
    }

    //check if fruit can jump over obstacle on given direction
    private canJumpOver(direction: string): boolean {

        let [row, column] = [this._row, this._column];
        const thickness = 3;

        if(new Set(["up", "down"]).has(direction)) {

            row += thickness * (direction === "up" ? -1 : 1);
        }
        else {

            column += thickness * (direction === "left" ? -1 : 1);
        }

        return Grid.isAccessible(row, column);
    }

    //check if fruit can move through adjacent node on given direction
    private canMoveThrough(direction: string): boolean {

        let node = Grid.getAdjacentNode(direction, this._row, this._column);

        return node !== null && Grid.isAccessible(node.row, node.column);
    }

    protected setDirection(): void {

        if(!this.canTurn) {

            return;
        }
        //70% chance to keep moving in current direction when possible
        if(this.canMoveThrough(this._direction) && Math.random() < 0.7) {

            return;
        }
        //choose random direction
        const direction = Utility.randomElement(this.getValidDirections());
        //20% chance to jump over obstacles when possible
        const jumpOver = this.canJumpOver(direction) && Math.random() < 0.2;

        if(jumpOver || this.canMoveThrough(direction)) {

            this._direction = direction;
        }
        else {

            this.setDirection();
        }
    }

    //adjust current speed to ensure object can reach grid center
    protected adjustSpeed(speed: number): number {

        const toNodeCenter = this.distanceToFacingNode;

        if(toNodeCenter === null) {

            return speed;
        }

        return Math.min(toNodeCenter, speed);
    }

    protected move(timeStep: number): void {

        const speed = this.adjustSpeed(this._speed * timeStep);

        if(new Set(["up", "down"]).has(this._direction)) {

            this._coordinate.y += speed * (this._direction === "up" ? -1 : 1);
        }
        else {

            this._coordinate.x += speed * (this._direction === "left" ? -1 : 1);
        }

        this.syncLocation();
        this.autoDispose();
    }

    public update(timeStep: number): void {

        this.jump(); //jump animation
        this.setDirection();
        this.move(timeStep);
    }

    public draw(): void {

        this.erase();

        this._ctx.drawImage(

            this._tile,
            this._cropXY.x,
            this._cropXY.y,
            this._cropWidth,
            this._cropWidth,
            this._coordinate.x - Grid.nodeSize * 0.8,
            this._coordinate.y - Grid.nodeSize * 0.8 - this._jumpHeight,
            Grid.nodeSize * 1.6,
            Grid.nodeSize * 1.6
        );
    }
}