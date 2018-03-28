import { IGridLayout } from "_ts/interfaces";
import Monitor from "_ts/object/monitor";

let layers = [

    [
        //logic layer
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
        [   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null]
    ],
    [
        //meta layer
        [{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"}],
        [{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"l"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"l"},{w:"w"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{b:"p"},{b:"p"},{b:"p"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{b:"p"},{b:"p"},{b:"p"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{d:"d"},{d:"d"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{b:"b"},{b:"b"},{b:"s"},{b:"s"},{b:"b"},{b:"b"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{b:"p"},{b:"p"},{b:"p"},{w:"w"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{w:"w"},{b:"p"},{b:"p"},{b:"p"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{b:"p"},{b:"p"},{b:"p"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{b:"p"},{b:"p"},{b:"p"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
        [{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
        [{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"l"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"l"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
        [{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
        [{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"}]
    ]
];

//game area layout
export default <IGridLayout>{

    _rows     : layers[0].length,
    _columns  : layers[0][0].length,
    _nodeSize : null,
    _width    : null,
    _height   : null,

    get rows(): number {

        return this._rows;
    },

    get columns(): number {

        return this._columns;
    },

    get nodeSize(): number {

        return this._nodeSize;
    },

    get width(): number {

        return this._width;
    },

    get height(): number {

        return this._height;
    },

    get layers(): any[][][] {

        return layers;
    },

    //calculate node size base on monitor dimensions
    setNodeSize(): void {

        this._nodeSize = Monitor.width > Monitor.height ?
            Math.floor(Monitor.height * 0.8 / this._rows) :
            Math.floor(Monitor.width * 0.8 / this._columns);
    },

    setDimension(): void {

        this._width = this._nodeSize * this._columns;
        this._height = this._nodeSize * this._rows;
    },

    initialize(): void {

        this.setNodeSize();
        this.setDimension();
    },

    //check if given row and column are within the grid boundaries
    exists(row: number, column: number): boolean {

        if(layers[0][row] === undefined) {

            return false;
        }

        return layers[0][row][column] !== undefined;
    },

    //retrieve objects on logic layer
    getObject(row: number, column: number): any {

        if(!this.exists(row, column)) {

            return null;
        }

        return layers[0][row][column];
    },

    //retrieve metadata on meta layer
    getMetadata(row: number, column: number): { [key: string] : string } {

        if(!this.exists(row, column)) {

            return null;
        }

        return layers[1][row][column];
    },

    //register objects on logic layer
    setObject(row: number, column: number, object: any): void {

        if(this.exists(row, column)) {

            layers[0][row][column] = object;
        }
    }
};