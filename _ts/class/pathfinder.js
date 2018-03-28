System.register(["_ts/class/priorityQueue", "_ts/class/node", "_ts/class/grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var priorityQueue_1, node_1, grid_1, Pathfinder;
    return {
        setters: [
            function (priorityQueue_1_1) {
                priorityQueue_1 = priorityQueue_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            }
        ],
        execute: function () {
            Pathfinder = class Pathfinder {
                constructor(originator) {
                    this._originator = originator;
                }
                //setup initial travel costs and priorities to visit nodes
                setup(start) {
                    this._costs = new Map();
                    this._priority = new priorityQueue_1.default();
                    //initialize cost and priority
                    this._costs.set(start.key, 0);
                    this._priority.enqueue(0, start);
                }
                contains(path, node) {
                    return path.some(current => current.isSame(node));
                }
                //check if two paths intersect with each other
                coincides(path1, path2) {
                    let keys = new Set(path1.map(node => node.key));
                    return path2.some(node => keys.has(node.key));
                }
                //calculate sum of horizontal and vertical distance between nodes
                getHeuristic(candidate, destination) {
                    const horizontal = Math.abs(candidate.column - destination.column);
                    const vertical = Math.abs(candidate.row - destination.row);
                    return horizontal + vertical;
                }
                //find all accessible neighbour nodes
                getCandidates(node) {
                    let candidates = grid_1.default.getAdjacentNodes(node.row, node.column);
                    return candidates.filter(candidate => {
                        const [row, column] = [candidate.row, candidate.column];
                        const isRetreat = this._originator.state === "retreat";
                        //can only move through doors while retreating
                        if (isRetreat && grid_1.default.isEntrance(row, column)) {
                            return true;
                        }
                        return grid_1.default.isAccessible(row, column);
                    });
                }
                //evaluate travel costs and update priorities to visit neighbour nodes
                evaluateCosts(current, destination) {
                    this.getCandidates(current).forEach(candidate => {
                        const key = candidate.key;
                        const cost = this._costs.get(current.key) + 1;
                        //record new cost or update cost when better route is found
                        if (!this._costs.has(key) || cost < this._costs.get(key)) {
                            this._costs.set(key, cost);
                            //update priority to visit candidate node
                            const heuristic = this.getHeuristic(candidate, destination);
                            this._priority.enqueue(cost + heuristic, candidate);
                            candidate.parent = current;
                        }
                    });
                }
                searchNode(node) {
                    let result;
                    const row = this._originator.row;
                    const column = this._originator.column;
                    this.setup(new node_1.default(row, column));
                    while (this._priority.size > 0) {
                        result = this._priority.dequeue();
                        //when path is found
                        if (result.isSame(node)) {
                            break;
                        }
                        this.evaluateCosts(result, node);
                    }
                    return result;
                }
                find(destination) {
                    let path = new Array();
                    let node = this.searchNode(destination);
                    while (node.parent !== null) {
                        path.push(node);
                        node = node.parent;
                    }
                    return [...path, node].reverse();
                }
            };
            exports_1("default", Pathfinder);
        }
    };
});
//# sourceMappingURL=pathfinder.js.map