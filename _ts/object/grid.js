System.register(["_ts/object/monitor", "_ts/object/utility", "_ts/object/layout", "_ts/class/node"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, utility_1, layout_1, node_1, locations;
    return {
        setters: [
            function (monitor_1_1) {
                monitor_1 = monitor_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (layout_1_1) {
                layout_1 = layout_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            }
        ],
        execute: function () {
            //game object default locations
            locations = {
                retreat: {
                    row: 14,
                    column: 14
                },
                door: {
                    row: 13,
                    column: [14, 15],
                },
                pacman: {
                    row: 23,
                    column: 14,
                    direction: "right"
                },
                blinky: {
                    row: 11,
                    column: 14,
                    direction: "left"
                },
                pinky: {
                    row: 14,
                    column: 14,
                    direction: "down"
                },
                inky: {
                    row: 14,
                    column: 12,
                    direction: "up"
                },
                sue: {
                    row: 14,
                    column: 16,
                    direction: "up"
                },
            };
            exports_1("default", {
                rows: layout_1.default[0].length,
                columns: layout_1.default[0][0].length,
                nodeSize: null,
                width: null,
                height: null,
                accessible: {
                    all: new Array(),
                    topLeft: new Array(),
                    topRight: new Array(),
                    bottomLeft: new Array(),
                    bottomRight: new Array()
                },
                get centerColumn() {
                    return utility_1.default.getRangeCenter(this.columns);
                },
                get centerRow() {
                    return utility_1.default.getRangeCenter(this.rows);
                },
                //calculate node size base on monitor dimensions
                setNodeSize() {
                    this.nodeSize = monitor_1.default.width > monitor_1.default.height ?
                        Math.floor(monitor_1.default.height * 0.8 / this.rows) :
                        Math.floor(monitor_1.default.width * 0.8 / this.columns);
                },
                setDimension() {
                    this.width = this.nodeSize * this.columns;
                    this.height = this.nodeSize * this.rows;
                },
                //retrieve section of grid on which the node is currently located
                getSection(node) {
                    const vertical = node.row < this.centerRow ? "top" : "bottom";
                    const horizontal = node.column < this.centerColumn ? "left" : "right";
                    return vertical + utility_1.default.capitalize(horizontal);
                },
                recordAccessibleNodes() {
                    for (let i = 0; i < layout_1.default[1].length; i++) {
                        for (let j = 0; j < layout_1.default[1][i].length; j++) {
                            //check every node on logic layer
                            if (this.isAccessible(i, j)) {
                                let node = new node_1.default(i, j);
                                this.accessible.all.push(node);
                                this.accessible[this.getSection(node)].push(node);
                            }
                        }
                    }
                },
                initialize() {
                    this.setNodeSize();
                    this.setDimension();
                    this.recordAccessibleNodes();
                },
                exists(row, column) {
                    if (layout_1.default[0][row] === undefined) {
                        return false;
                    }
                    return layout_1.default[0][row][column] !== undefined;
                },
                getNode(layer, row, column) {
                    if (!this.exists(row, column)) {
                        return null;
                    }
                    return layout_1.default[layer][row][column];
                },
                isAccessible(row, column) {
                    let node = this.getNode(1, row, column);
                    if (node === null) {
                        return false;
                    }
                    return node.hasOwnProperty("f") || node.b === "p";
                }
            });
        }
    };
});
//# sourceMappingURL=grid.js.map