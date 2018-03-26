import { IPoint, IGrid, INode } from "_ts/interfaces";
import Monitor from "_ts/object/monitor";
import Utility from "_ts/object/utility";
import Layout from "_ts/object/layout";
import Point from "_ts/class/point";
import Node from "_ts/class/node";

export default <IGrid>{

    rows       : Layout[0].length,
    columns    : Layout[0][0].length,
    nodeSize   : null,
    width      : null,
    height     : null,
    directions : ["up", "down", "left", "right"],
    //walkable nodes on all sections of the grid
    accessible : {

        all         : new Array<INode>(),
        topLeft     : new Array<INode>(),
        topRight    : new Array<INode>(),
        bottomLeft  : new Array<INode>(),
        bottomRight : new Array<INode>()
    },

    get centerColumn(): number {

        return Utility.getRangeCenter(this.columns);
    },

    get centerRow(): number {

        return Utility.getRangeCenter(this.rows);
    },

    //calculate node size base on monitor dimensions
    setNodeSize(): void {

        this.nodeSize = Monitor.width > Monitor.height ?
            Math.floor(Monitor.height * 0.8 / this.rows) :
            Math.floor(Monitor.width * 0.8 / this.columns);
    },

    setDimension(): void {

        this.width = this.nodeSize * this.columns;
        this.height = this.nodeSize * this.rows;
    },

    //retrieve section of grid on which the node is currently located
    getSection(node: INode): string {

        const vertical = node.row < this.centerRow ? "top" : "bottom";
        const horizontal = node.column < this.centerColumn ? "left" : "right";

        return vertical + Utility.capitalize(horizontal);
    },

    recordAccessibleNodes(): void {

        for(let i = 0; i < Layout[1].length; i++) {

            for(let j = 0; j < Layout[1][i].length; j++) {
                //check every node on logic layer
                if(this.isAccessible(i, j)) {

                    let node = new Node(i, j);
                    this.accessible.all.push(node);
                    this.accessible[this.getSection(node)].push(node);
                }
            }
        }
    },

    initialize(): void {

        this.setNodeSize();
        this.setDimension();
        this.recordAccessibleNodes();
    },

    //check if given row and column are within the grid boundaries
    exists(row: number, column: number): boolean {

        if(Layout[0][row] === undefined) {

            return false;
        }

        return Layout[0][row][column] !== undefined;
    },

    getNode(point: IPoint): INode {

        return new Node(

            Math.floor(point.y / this.nodeSize),
            Math.floor(point.x / this.nodeSize)
        );
    },

    getContent(layer: number, row: number, column: number): { [key: string] : string } {

        if(!this.exists(row, column)) {

            return null;
        }

        return Layout[layer][row][column];
    },

    setContent(layer: number, row: number, column: number, content: any): void {

        if(this.exists(row, column)) {

            Layout[layer][row][column] = content;
        }
    },

    //check if given node is walkable for players
    isAccessible(row: number, column: number): boolean {

        let content = this.getContent(1, row, column);

        if(content === null || content.b === "p") {

            return content !== null;
        }

        return content.hasOwnProperty("f") || content.hasOwnProperty("c");
    },

    //check if given node is entrance area of the ghost house
    isEntrance(row: number, column: number): boolean {

        let content = this.getContent(1, row, column);

        return content.hasOwnProperty("d") || content.b === "s";
    },

    //calculate center coordinate of a given node
    getNodeCenter(row: number, column: number): IPoint {

        return new Point(

            (column + 0.5) * this.nodeSize,
            (row + 0.5) * this.nodeSize
        );
    },

    //retrieve adjacent node on given direction for given node
    getAdjacentNode(direction: string, row: number, column: number): INode {

        if(direction === "up" && row > 0) row--;
        else if(direction === "down" && row < this.rows - 1) row++;
        else if(direction === "left" && column > 0) column--;
        else if(direction === "right" && column < this.columns - 1) column++;
        else {

            return null;
        }

        return new Node(row, column);
    },

    //retrieve adjacent nodes on all four directions for given node
    getAdjacentNodes(row: number, column: number): INode[] {

        return this.directions.map(direction => {

            return this.getAdjacentNode(direction, row, column);

        }).filter(node => node !== null);
    }
};