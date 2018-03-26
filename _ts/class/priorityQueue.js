System.register(["_ts/object/utility"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, Item, Heap, PriorityQueue;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }
        ],
        execute: function () {
            Item = class Item {
                constructor(key, data) {
                    this._key = key;
                    this._data = data;
                }
                get key() {
                    return this._key;
                }
                get data() {
                    return this._data;
                }
            };
            Heap = class Heap {
                constructor() {
                    this._nodes = new Array();
                }
                get size() {
                    return this._nodes.length;
                }
                get root() {
                    if (this.size === 0) {
                        return null;
                    }
                    return this._nodes[0];
                }
                compare(index1, index2) {
                    if (index1 >= this.size || index2 >= this.size) {
                        return 0;
                    }
                    return this._nodes[index1].key - this._nodes[index2].key;
                }
                checkParent(index) {
                    while (index > 0) {
                        const parent = Math.floor((index - 1) / 2);
                        if (this.compare(index, parent) >= 0) {
                            break;
                        }
                        utility_1.default.swap(this._nodes, index, parent);
                        index = parent;
                    }
                }
                heapify(index) {
                    let smallest = index;
                    const child1 = index * 2 + 1;
                    const child2 = index * 2 + 2;
                    if (this.compare(child1, smallest) < 0) {
                        smallest = child1;
                    }
                    if (this.compare(child2, smallest) < 0) {
                        smallest = child2;
                    }
                    if (index !== smallest) {
                        utility_1.default.swap(this._nodes, index, smallest);
                        this.heapify(smallest);
                    }
                }
                add(data) {
                    this._nodes.push(data);
                    this.checkParent(this.size - 1);
                }
                shift() {
                    if (this.size === 0) {
                        return null;
                    }
                    let root = this.root;
                    this._nodes[0] = utility_1.default.lastElement(this._nodes);
                    this._nodes.length--;
                    this.heapify(0);
                    return root;
                }
            };
            PriorityQueue = class PriorityQueue {
                constructor() {
                    this._heaps = new Heap();
                }
                get size() {
                    return this._heaps.size;
                }
                peek() {
                    if (this.size === 0) {
                        return null;
                    }
                    return this._heaps.root.data;
                }
                enqueue(priority, data) {
                    this._heaps.add(new Item(priority, data));
                }
                dequeue() {
                    if (this.size === 0) {
                        return null;
                    }
                    return this._heaps.shift().data;
                }
            };
            exports_1("default", PriorityQueue);
        }
    };
});
//# sourceMappingURL=priorityQueue.js.map