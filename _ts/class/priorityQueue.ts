import Utility from "_ts/object/utility";

class Item<T> {

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

export default class PriorityQueue<T> {

    private _heaps: Item<T>[];

    constructor() {

        this._heaps = new Array<Item<T>>();
    }

    get size(): number {

        return this._heaps.length;
    }

    private compare(index1: number, index2: number): number {

        if(this._heaps[index1] === undefined || this._heaps[index2] === undefined) {

            return 0;
        }

        return this._heaps[index1].key - this._heaps[index2].key;
    }

    private heapify(index: number): void {

        let smallest = index;
        const child1 = index * 2 + 1;
        const child2 = index * 2 + 2;

        if(this.compare(child1, smallest) < 0) {

            smallest = child1;
        }

        if(this.compare(child2, smallest) < 0) {

            smallest = child2;
        }

        if(index !== smallest) {

            Utility.swap(this._heaps, index, smallest);
            this.heapify(smallest);
        }
    }

    private checkParent(index: number): void {

        while(index > 0) {

            const parent = Math.floor((index - 1) / 2);

            if(this.compare(index, parent) >= 0) {

                break;
            }

            Utility.swap(this._heaps, index, parent);
            index = parent;
        }
    }

    public clear(): void {

        this._heaps = new Array<Item<T>>();
    }

    public peek(): T {

        if(this.size === 0) {

            return null;
        }

        return this._heaps[0].data;
    }

    public enqueue(priority: number, data: T): void {

        let item = new Item<T>(priority, data);
        this._heaps.push(item);
        this.checkParent(this.size - 1);
    }

    public dequeue(): T {

        if(this.size === 0) {

            return null;
        }

        let data = this.peek();
        let lastItem = this._heaps.pop();

        if(this.size > 0) {

            this._heaps[0] = lastItem;
            this.heapify(0);
        }

        return data;
    }
}