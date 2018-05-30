"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../object/direction");
const utility_1 = require("../object/utility");
const layout_1 = require("../object/layout");
const point_1 = require("../class/point");
const node_1 = require("../class/node");
class Grid {
    constructor(layout) {
        //walkable nodes on all sections of the grid
        this._accessible = {
            all: new Array(),
            topLeft: new Array(),
            topRight: new Array(),
            bottomLeft: new Array(),
            bottomRight: new Array()
        };
        this._layout = layout;
        this.initialize();
    }
    get nodeSize() {
        return this._layout.nodeSize;
    }
    get width() {
        return this._layout.width;
    }
    get height() {
        return this._layout.height;
    }
    get accessible() {
        return this._accessible;
    }
    get layout() {
        return this._layout;
    }
    get centerColumn() {
        return utility_1.default.getRangeCenter(this._layout.columns);
    }
    get centerRow() {
        return utility_1.default.getRangeCenter(this._layout.rows);
    }
    initialize() {
        this._layout.initialize();
        this.recordAccessible();
    }
    //retrieve section of grid on which the node is currently located
    getSection(node) {
        const vertical = node.row < this.centerRow ? "top" : "bottom";
        const horizontal = node.column < this.centerColumn ? "left" : "right";
        return vertical + utility_1.default.capitalize(horizontal);
    }
    //check if given node is walkable for players
    isAccessible(row, column) {
        let meta = this._layout.getMetadata(row, column);
        if (meta === null || meta.b === "p") {
            return meta !== null;
        }
        return meta.hasOwnProperty("f") || meta.hasOwnProperty("c");
    }
    recordAccessible() {
        for (let i = 0; i < this._layout.rows; i++) {
            for (let j = 0; j < this._layout.columns; j++) {
                //check every node on logic layer
                if (this.isAccessible(i, j)) {
                    let node = new node_1.default(i, j);
                    this._accessible.all.push(node);
                    this._accessible[this.getSection(node)].push(node);
                }
            }
        }
    }
    //check if given node is entrance area of the ghost house
    isEntrance(row, column) {
        let meta = this._layout.getMetadata(row, column);
        return meta.hasOwnProperty("d") || meta.b === "s";
    }
    getNode(point) {
        return new node_1.default(Math.floor(point.y / this._layout.nodeSize), Math.floor(point.x / this._layout.nodeSize));
    }
    //calculate center coordinate of a given node
    getNodeCenter(row, column) {
        return new point_1.default((column + 0.5) * this._layout.nodeSize, (row + 0.5) * this._layout.nodeSize);
    }
    //retrieve adjacent node on given direction for given node
    getAdjacentNode(direction, row, column) {
        if (direction === direction_1.Direction.UP && row > 0)
            row--;
        else if (direction === direction_1.Direction.DOWN && row < this._layout.rows - 1)
            row++;
        else if (direction === direction_1.Direction.LEFT && column > 0)
            column--;
        else if (direction === direction_1.Direction.RIGHT && column < this._layout.columns - 1)
            column++;
        else {
            return null;
        }
        return new node_1.default(row, column);
    }
    //retrieve adjacent nodes on all four directions for given node
    getAdjacentNodes(row, column) {
        let directions = [direction_1.Direction.UP, direction_1.Direction.DOWN, direction_1.Direction.LEFT, direction_1.Direction.RIGHT];
        return directions.map(direction => {
            return this.getAdjacentNode(direction, row, column);
        }).filter(node => node !== null);
    }
}
exports.default = new Grid(layout_1.default);
//# sourceMappingURL=grid.js.map