import { IData, IHeap, IPriorityQueue } from "_ts/interfaces";
import Utility from "_ts/object/utility";

//data transport unit with key-value matching
class Item<T> implements IData<T> {

    private _key: number;
    private _data: T;

    constructor(key: number, data: T) {

        this._key = key;
        this._data = data;
    }

    get key(): number {

        return this._key;
    }

    get data(): T {

        return this._data;
    }
}

//simple minimum binary heap implementation
class Heap<T> implements IHeap<T> {

    private _nodes: IData<T>[];

    constructor() {

        this._nodes = new Array<IData<T>>();
    }

    get size(): number {

        return this._nodes.length;
    }

    get root(): IData<T> {

        if(this.size === 0) {

            return null;
        }

        return this._nodes[0];
    }

    //compare node keys; returns negative number when first node is smaller
    private compare(index1: number, index2: number): number {

        if(index1 >= this.size || index2 >= this.size) {

            return 0;
        }

        return this._nodes[index1].key - this._nodes[index2].key;
    }

    //heapify from child to parent
    private heapifyToTop(index: number): void {

        while(index > 0) {

            const parent = Math.floor((index - 1) / 2);

            if(this.compare(index, parent) >= 0) {

                break;
            }
            //swap with parent node while current node is smaller
            Utility.swap(this._nodes, index, parent);
            index = parent;
        }
    }

    //heapify from parent to child
    private heapifyToBottom(index: number): void {

        let smallest = index;
        const child1 = index * 2 + 1;
        const child2 = index * 2 + 2;

        if(this.compare(child1, smallest) < 0) {

            smallest = child1;
        }

        if(this.compare(child2, smallest) < 0) {

            smallest = child2;
        }
        //swap with smaller child if either child is smaller than parent
        if(index !== smallest) {

            Utility.swap(this._nodes, index, smallest);
            this.heapifyToBottom(smallest);
        }
    }

    public add(data: IData<T>): void {

        this._nodes.push(data);
        this.heapifyToTop(this.size - 1);
    }

    //remove root node
    public shift(): IData<T> {

        if(this.size === 0) {

            return null;
        }

        let root = this.root;
        //replace root node with last node and maintain heap property
        this._nodes[0] = Utility.lastElement(this._nodes);
        this._nodes.length--;
        this.heapifyToBottom(0);

        return root;
    }
}

export default class PriorityQueue<T> implements IPriorityQueue<T> {

    private _heaps: IHeap<T>;

    constructor() {

        this._heaps = new Heap<T>();
    }

    get size(): number {

        return this._heaps.size;
    }

    public peek(): T {

        if(this.size === 0) {

            return null;
        }

        return this._heaps.root.data;
    }

    public enqueue(priority: number, data: T): void {
        //lower priority value means higher priority
        this._heaps.add(new Item<T>(priority, data));
    }

    public dequeue(): T {

        if(this.size === 0) {

            return null;
        }

        return this._heaps.shift().data;
    }
}