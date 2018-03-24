System.register(["_ts/object/utility"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1, Item, PriorityQueue;
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
            PriorityQueue = class PriorityQueue {
                constructor() {
                    this._heaps = new Array();
                }
                get size() {
                    return this._heaps.length;
                }
                compare(index1, index2) {
                    if (this._heaps[index1] === undefined || this._heaps[index2] === undefined) {
                        return 0;
                    }
                    return this._heaps[index1].key - this._heaps[index2].key;
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
                        utility_1.default.swap(this._heaps, index, smallest);
                        this.heapify(smallest);
                    }
                }
                checkParent(index) {
                    while (index > 0) {
                        const parent = Math.floor((index - 1) / 2);
                        if (this.compare(index, parent) >= 0) {
                            break;
                        }
                        utility_1.default.swap(this._heaps, index, parent);
                        index = parent;
                    }
                }
                clear() {
                    this._heaps = new Array();
                }
                peek() {
                    if (this.size === 0) {
                        return null;
                    }
                    return this._heaps[0].data;
                }
                enqueue(priority, data) {
                    let item = new Item(priority, data);
                    this._heaps.push(item);
                    this.checkParent(this.size - 1);
                }
                dequeue() {
                    if (this.size === 0) {
                        return null;
                    }
                    let data = this.peek();
                    let lastItem = this._heaps.pop();
                    if (this.size > 0) {
                        this._heaps[0] = lastItem;
                        this.heapify(0);
                    }
                    return data;
                }
            };
            exports_1("default", PriorityQueue);
        }
    };
});
//# sourceMappingURL=priorityQueue.js.map