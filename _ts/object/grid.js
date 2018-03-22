System.register(["_ts/object/monitor", "_ts/object/utility", "_ts/object/layout", "_ts/class/point", "_ts/class/node"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1, utility_1, layout_1, point_1, node_1;
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
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                rows: layout_1.default[0].length,
                columns: layout_1.default[0][0].length,
                nodeSize: null,
                width: null,
                height: null,
                directions: ["up", "down", "left", "right"],
                //walkable nodes on all sections of the grid
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
                //check if given row and column are within the grid boundaries
                exists(row, column) {
                    if (layout_1.default[0][row] === undefined) {
                        return false;
                    }
                    return layout_1.default[0][row][column] !== undefined;
                },
                getNode(point) {
                    return new node_1.default(Math.floor(point.y / this.nodeSize), Math.floor(point.x / this.nodeSize));
                },
                getContent(layer, row, column) {
                    if (!this.exists(row, column)) {
                        return null;
                    }
                    return layout_1.default[layer][row][column];
                },
                setContent(layer, row, column, content) {
                    if (this.exists(row, column)) {
                        layout_1.default[layer][row][column] = content;
                    }
                },
                //check if given node is walkable for players
                isAccessible(row, column) {
                    let node = this.getContent(1, row, column);
                    if (node === null) {
                        return false;
                    }
                    return node.hasOwnProperty("f") || node.b === "p";
                },
                //calculate center coordinate of a given node
                getNodeCenter(row, column) {
                    return new point_1.default((column + 0.5) * this.nodeSize, (row + 0.5) * this.nodeSize);
                },
                //retrieve adjacent node on given direction for given node
                getAdjacentNode(direction, row, column) {
                    if (direction === "up" && row > 0)
                        row--;
                    else if (direction === "down" && row < this.rows - 1)
                        row++;
                    else if (direction === "left" && column > 0)
                        column--;
                    else if (direction === "right" && column < this.columns - 1)
                        column++;
                    else {
                        return null;
                    }
                    return new node_1.default(row, column);
                },
                //retrieve adjacent nodes on all four directions for given node
                getAdjacentNodes(row, column) {
                    return this.directions.map(direction => {
                        return this.getAdjacentNode(direction, row, column);
                    }).filter(node => node !== null);
                }
            });
        }
    };
});
//# sourceMappingURL=grid.js.map