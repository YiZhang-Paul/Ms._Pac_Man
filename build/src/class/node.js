"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(row, column) {
        this._row = row;
        this._column = column;
        this._parent = null;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    //unique key to represent current node
    get key() {
        return `${this._row},${this._column}`;
    }
    get parent() {
        return this._parent;
    }
    set parent(node) {
        this._parent = node;
    }
    //check if two nodes are on the same location
    isSame(node) {
        return this.key === node.key;
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map