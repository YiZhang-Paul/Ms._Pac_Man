System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Node;
    return {
        setters: [],
        execute: function () {
            Node = class Node {
                constructor(row, column) {
                    this._row = row;
                    this._column = column;
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
                //check if two nodes are on the same location
                isSame(node) {
                    return this.key === node.key;
                }
            };
            exports_1("default", Node);
        }
    };
});
//# sourceMappingURL=node.js.map