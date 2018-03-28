import { IMovable, IPoint, IState, INode } from "src/interfaces";
import StateMachine from "src/class/stateMachine";
import Node from "src/class/node";
import Grid from "src/class/grid";

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
    protected _stateManager: IState;

    constructor(row: number, column: number, direction: string) {

        this._row = row;
        this._column = column;
        this._direction = direction;
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

    get state(): string {

        return this._stateManager.active;
    }

    //straight path on current facing direction
    get pathAhead(): INode[] {

        let path: INode[] = [new Node(this._row, this._column)];
        let node = Grid.getAdjacentNode(this._direction, this._row, this._column);

        while(node !== null && Grid.isAccessible(node.row, node.column)) {

            path.push(node);
            node = Grid.getAdjacentNode(this._direction, node.row, node.column);
        }

        return path;
    }

    abstract get canTurn(): boolean;

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

    set coordinate(value: IPoint) {

        this._coordinate = value;
    }

    set direction(value: string) {

        this._direction = value;
    }

    public initialize(): void {

        this._coordinate = Grid.getNodeCenter(this._row, this._column);
        this._speed = 0;
        this._cropWidth = 32;
        this._tile = <HTMLImageElement>document.getElementById("tile");
        this._ctx = null;
        this._stateManager = new StateMachine(this, null);
        this.getCropXY();
        this.syncLocation();
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

        return Grid.layout.getMetadata(adjacent.row, adjacent.column).hasOwnProperty("d");
    }

    protected hasWall(direction: string = this._direction): boolean {

        let adjacent = Grid.getAdjacentNode(direction, this._row, this._column);

        if(adjacent === null) {

            return false;
        }

        return Grid.layout.getMetadata(adjacent.row, adjacent.column).hasOwnProperty("w");
    }

    //retrieve node with given distance ahead
    public nodeAhead(direction: string, total: number): INode {

        if(!this.withinMaze) {

            return null;
        }

        let node: INode = new Node(this._row, this._column);

        for(let i = 0; i < total; i++) {

            node = Grid.getAdjacentNode(direction, node.row, node.column);

            if(node === null || !Grid.isAccessible(node.row, node.column)) {

                return null;
            }
        }

        return node;
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
    protected abstract isValidDirection(direction: string): boolean;

    protected abstract setDirection(): void;

    //update row and column of current node
    protected syncLocation(): void {

        let node = Grid.getNode(this._coordinate);
        this._row = node.row;
        this._column = node.column;
    }

    //calculate tile image crop location
    protected abstract getCropXY(): void;

    //adjust current speed to ensure object can reach grid center
    protected adjustSpeed(speed: number): number {

        const toNodeCenter = this.distanceToFacingNode;

        if(toNodeCenter === null) {

            return speed;
        }

        return Math.min(speed, toNodeCenter);
    }

    protected move(timeStep: number): void {

        const speed = this.adjustSpeed(this._speed * timeStep);

        if(new Set(["up", "down"]).has(this._direction)) {

            this._coordinate.y += speed * (this._direction === "up" ? -1 : 1);
        }
        else {

            this._coordinate.x += speed * (this._direction === "left" ? -1 : 1);
        }
    };

    public abstract update(timeStep: number): void;

    public abstract draw(): void;
}