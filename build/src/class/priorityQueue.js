"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../object/utility");
//data transport unit with key-value matching
class Item {
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
}
//simple minimum binary heap implementation
class Heap {
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
    //compare node keys; returns negative number when first node is smaller
    compare(index1, index2) {
        if (index1 >= this.size || index2 >= this.size) {
            return 0;
        }
        return this._nodes[index1].key - this._nodes[index2].key;
    }
    //heapify from child to parent
    heapifyToTop(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(index, parent) >= 0) {
                break;
            }
            //swap with parent node while current node is smaller
            utility_1.default.swap(this._nodes, index, parent);
            index = parent;
        }
    }
    //heapify from parent to child
    heapifyToBottom(index) {
        let smallest = index;
        const child1 = index * 2 + 1;
        const child2 = index * 2 + 2;
        if (this.compare(child1, smallest) < 0) {
            smallest = child1;
        }
        if (this.compare(child2, smallest) < 0) {
            smallest = child2;
        }
        //swap with smaller child if either child is smaller than parent
        if (index !== smallest) {
            utility_1.default.swap(this._nodes, index, smallest);
            this.heapifyToBottom(smallest);
        }
    }
    add(data) {
        this._nodes.push(data);
        this.heapifyToTop(this.size - 1);
    }
    //remove root node
    shift() {
        if (this.size === 0) {
            return null;
        }
        let root = this.root;
        //replace root node with last node and maintain heap property
        this._nodes[0] = utility_1.default.lastElement(this._nodes);
        this._nodes.length--;
        this.heapifyToBottom(0);
        return root;
    }
}
class PriorityQueue {
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
        //lower priority value means higher priority
        this._heaps.add(new Item(priority, data));
    }
    dequeue() {
        if (this.size === 0) {
            return null;
        }
        return this._heaps.shift().data;
    }
}
exports.default = PriorityQueue;
//# sourceMappingURL=priorityQueue.js.map