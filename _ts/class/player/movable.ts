import { IMovable, IPoint } from "_ts/interfaces";
import Grid from "_ts/object/grid";

export default abstract class Movable implements IMovable {

    protected _row: number;
    protected _column: number;
    protected _coordinate: IPoint;
    protected _speed: number;
    protected _direction: string;
    protected _cropXY: IPoint;
    protected _cropWidth: number;
    protected _tile: HTMLImageElement;
    protected _ctx: CanvasRenderingContext2D;

    constructor(row: number, column: number) {

        this._row = row;
        this._column = column;
        this.initialize();
    }

    get row(): number {

        return this._row;
    }

    get column(): number {

        return this._column;
    }

    get coordinate(): IPoint {

        return this._coordinate;
    }

    get speed(): number {

        return this._speed;
    }

    //current facing direction
    get direction(): string {

        return this._direction;
    }

    //check if object is right on center of current node
    get onNodeCenter(): boolean {

        let center = Grid.getNodeCenter(this._row, this._column);

        return this._coordinate.isSame(center);
    }

    //retrieve distance before collision
    get toCollision(): number {

        if(!this.hasWall()) {

            return null;
        }

        let adjacent = Grid.getAdjacentNode(this._direction, this._row, this._column);

        return this.distanceToNode(adjacent.row, adjacent.column) - Grid.nodeSize;
    }

    //retrieve distance to center of nearest facing node
    get distanceToFacingNode(): number {

        if(this.onNodeCenter) {

            return Grid.nodeSize;
        }

        let adjacent = Grid.getAdjacentNode(this._direction, this._row, this._column);

        if(adjacent === null) {

            return null;
        }

        const toAdjacent = this.distanceToNode(adjacent.row, adjacent.column);
        //check if object is facing toward/opposite to center of current node
        if(toAdjacent <= Grid.nodeSize) {

            return toAdjacent;
        }

        return this.distanceToNode(this._row, this._column);
    }

    get withinMaze(): boolean {

        return this._coordinate.x >= 0 && this._coordinate.x <= Grid.width;
    }

    public initialize(): void {

        this._coordinate = Grid.getNodeCenter(this._row, this._column);
        this._speed = 0;
        this._direction = null;
        this._cropXY = null;
        this._cropWidth = 32;
        this._tile = <HTMLImageElement>document.getElementById("tile");
        this._ctx = null;
    }

    public reset(): void {

        this.getCropXY();
        this.syncLocation();
    }

    public distanceToMovable(movable: IMovable): number {

        return this._coordinate.distanceTo(movable.coordinate);
    }

    //calculate distance to center of given node
    protected distanceToNode(row: number, column: number): number {

        let center = Grid.getNodeCenter(row, column);

        return new Set(["up", "down"]).has(this._direction) ?
            Math.abs(this._coordinate.y - center.y) :
            Math.abs(this._coordinate.x - center.x);
    }

    protected hasDoor(direction: string = this._direction): boolean {

        let adjacent = Grid.getAdjacentNode(direction, this._row, this._column);

        if(adjacent === null) {

            return false;
        }

        return Grid.getContent(1, adjacent.row, adjacent.column).hasOwnProperty("d");
    }

    protected hasWall(direction: string = this._direction): boolean {

        let adjacent = Grid.getAdjacentNode(direction, this._row, this._column);

        if(adjacent === null) {

            return false;
        }

        return Grid.getContent(1, adjacent.row, adjacent.column).hasOwnProperty("w");
    }

    protected getOpposite(direction: string = this.direction): string {

        switch(direction) {

            case "up" : case "down" :

                return direction === "up" ? "down" : "up";

            case "left" : case "right" :

                return direction === "left" ? "right" : "left";
        }

        return direction;
    }

    //check if object can turn to given direction
    protected abstract isValidDirection(): boolean;

    protected changeDirection(direction: string): void {

        this._direction = direction;
        this.getCropXY();
    }

    //update row and column of current node
    protected syncLocation(): void {

        let node = Grid.getNode(this._coordinate);
        this._row = node.row;
        this._column = node.column;
    }

    //calculate tile image crop location
    protected abstract getCropXY(): void;

    //adjust current speed to ensure object can reach grid center
    protected abstract adjustSpeed(speed: number): number;

    protected abstract move(timeStep: number): void;

    public abstract update(timeStep: number): void;

    public abstract draw(): void;
}