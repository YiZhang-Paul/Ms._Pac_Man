import PriorityQueue from "../src/class/priorityQueue";
import { expect } from "chai";
import "mocha";
import { deepEqual } from "assert";
//test begin
context("priority queue test", function() {

const nameOne = "John";
const nameTwo = "Paul";
const nameThree = "James";
let queue: PriorityQueue<string>;

beforeEach("initialize priority queue", function() {

    queue = new PriorityQueue<string>();
});

describe("enqueue()", function() {

    it("add items", function() {

        expect(queue.size).to.equal(0);

        queue.enqueue(1, nameOne);

        expect(queue.size).to.equal(1);

        queue.enqueue(1, nameTwo);

        expect(queue.size).to.equal(2);

        queue.enqueue(2, nameThree);

        expect(queue.size).to.equal(3);
    });

    it("add items with same priority", function() {

        expect(queue.peek()).to.be.null;

        queue.enqueue(1, nameOne);

        expect(queue.peek()).to.equal(nameOne);

        queue.enqueue(1, nameThree);

        expect(queue.peek()).to.equal(nameOne);
    });

    it("add items with different priority", function() {

        expect(queue.peek()).to.be.null;

        queue.enqueue(2, nameOne);

        expect(queue.peek()).to.equal(nameOne);

        queue.enqueue(1, nameThree);

        expect(queue.peek()).to.equal(nameThree);
    });
});

describe("dequeue()", function() {

    it("dequeue from empty queue", function() {

        expect(queue.size).to.equal(0);
        expect(queue.peek()).to.be.null;
        expect(queue.dequeue()).to.be.null;
    });

    it("dequeue items", function() {

        expect(queue.peek()).to.be.null;

        queue.enqueue(1, nameThree);
        queue.enqueue(2, nameOne);

        expect(queue.size).to.equal(2);
        expect(queue.peek()).to.equal(nameThree);

        expect(queue.dequeue()).to.equal(nameThree);
        expect(queue.dequeue()).to.equal(nameOne);
        expect(queue.size).to.equal(0);
    });
});

//test end
});