import { INode } from "../interfaces";

export default class Node implements INode {

    private _row: number;
    private _column: number;
    private _parent: INode;

    constructor(row: number, column: number) {

        this._row = row;
        this._column = column;
        this._parent = null;
    }

    get row(): number {

        return this._row;
    }

    get column(): number {

        return this._column;
    }

    //unique key to represent current node
    get key(): string {

        return `${this._row},${this._column}`;
    }

    get parent(): INode {

        return this._parent;
    }

    set parent(node: INode) {

        this._parent = node;
    }

    //check if two nodes are on the same location
    public isSame(node: INode): boolean {

        return this.key === node.key;
    }
}