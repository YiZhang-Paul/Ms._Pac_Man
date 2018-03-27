import { IGrid, IGridLayout, INode, IPoint } from "_ts/interfaces";
import Utility from "_ts/object/utility";
import Layout from "_ts/object/layout";
import Point from "_ts/class/point";
import Node from "_ts/class/node";

class Grid implements IGrid {

    private _layout: IGridLayout;
    private _directions = ["up", "down", "left", "right"];
    //walkable nodes on all sections of the grid
    private _accessible = {

        all         : new Array<INode>(),
        topLeft     : new Array<INode>(),
        topRight    : new Array<INode>(),
        bottomLeft  : new Array<INode>(),
        bottomRight : new Array<INode>()
    }

    constructor(layout: IGridLayout) {

        this._layout = layout;
        this.initialize();
    }

    get nodeSize(): number {

        return this._layout.nodeSize;
    }

    get width(): number {

        return this._layout.width;
    }

    get height(): number {

        return this._layout.height;
    }

    get directions(): string[] {

        return this._directions;
    }

    get accessible(): {

        all         : INode[],
        topLeft     : INode[],
        topRight    : INode[],
        bottomLeft  : INode[],
        bottomRight : INode[]

    } {

        return this._accessible;
    }

    get layout(): IGridLayout {

        return this._layout;
    }

    get centerColumn(): number {

        return Utility.getRangeCenter(this._layout.columns);
    }

    get centerRow(): number {

        return Utility.getRangeCenter(this._layout.rows);
    }

    public initialize(): void {

        this._layout.initialize();
        this.recordAccessible();
    }

    //retrieve section of grid on which the node is currently located
    private getSection(node: INode): string {

        const vertical = node.row < this.centerRow ? "top" : "bottom";
        const horizontal = node.column < this.centerColumn ? "left" : "right";

        return vertical + Utility.capitalize(horizontal);
    }

    //check if given node is walkable for players
    public isAccessible(row: number, column: number): boolean {

        let meta = this._layout.getMetadata(row, column);

        if(meta === null || meta.b === "p") {

            return meta !== null;
        }

        return meta.hasOwnProperty("f") || meta.hasOwnProperty("c");
    }

    private recordAccessible(): void {

        for(let i = 0; i < this._layout.rows; i++) {

            for(let j = 0; j < this._layout.columns; j++) {
                //check every node on logic layer
                if(this.isAccessible(i, j)) {

                    let node = new Node(i, j);
                    this._accessible.all.push(node);
                    this._accessible[this.getSection(node)].push(node);
                }
            }
        }
    }

    //check if given node is entrance area of the ghost house
    public isEntrance(row: number, column: number): boolean {

        let meta = this._layout.getMetadata(row, column);

        return meta.hasOwnProperty("d") || meta.b === "s";
    }

    public getNode(point: IPoint): INode {

        return new Node(

            Math.floor(point.y / this._layout.nodeSize),
            Math.floor(point.x / this._layout.nodeSize)
        );
    }

    //calculate center coordinate of a given node
    public getNodeCenter(row: number, column: number): IPoint {

        return new Point(

            (column + 0.5) * this._layout.nodeSize,
            (row + 0.5) * this._layout.nodeSize
        );
    }

    //retrieve adjacent node on given direction for given node
    public getAdjacentNode(direction: string, row: number, column: number): INode {

        if(direction === "up" && row > 0) row--;
        else if(direction === "down" && row < this._layout.rows - 1) row++;
        else if(direction === "left" && column > 0) column--;
        else if(direction === "right" && column < this._layout.columns - 1) column++;
        else {

            return null;
        }

        return new Node(row, column);
    }

    //retrieve adjacent nodes on all four directions for given node
    public getAdjacentNodes(row: number, column: number): INode[] {

        return this._directions.map(direction => {

            return this.getAdjacentNode(direction, row, column);

        }).filter(node => node !== null);
    }
}

export default new Grid(Layout);