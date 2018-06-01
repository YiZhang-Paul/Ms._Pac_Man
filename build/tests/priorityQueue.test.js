"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priorityQueue_1 = require("../src/class/priorityQueue");
const chai_1 = require("chai");
require("mocha");
//test begin
context("priority queue test", function () {
    const nameOne = "John";
    const nameTwo = "Paul";
    const nameThree = "James";
    let queue;
    beforeEach("initialize priority queue", function () {
        queue = new priorityQueue_1.default();
    });
    describe("enqueue()", function () {
        it("add items", function () {
            chai_1.expect(queue.size).to.equal(0);
            queue.enqueue(1, nameOne);
            chai_1.expect(queue.size).to.equal(1);
            queue.enqueue(1, nameTwo);
            chai_1.expect(queue.size).to.equal(2);
            queue.enqueue(2, nameThree);
            chai_1.expect(queue.size).to.equal(3);
        });
        it("add items with same priority", function () {
            chai_1.expect(queue.peek()).to.be.null;
            queue.enqueue(1, nameOne);
            chai_1.expect(queue.peek()).to.equal(nameOne);
            queue.enqueue(1, nameThree);
            chai_1.expect(queue.peek()).to.equal(nameOne);
        });
        it("add items with different priority", function () {
            chai_1.expect(queue.peek()).to.be.null;
            queue.enqueue(2, nameOne);
            chai_1.expect(queue.peek()).to.equal(nameOne);
            queue.enqueue(1, nameThree);
            chai_1.expect(queue.peek()).to.equal(nameThree);
        });
    });
    describe("dequeue()", function () {
        it("dequeue from empty queue", function () {
            chai_1.expect(queue.size).to.equal(0);
            chai_1.expect(queue.peek()).to.be.null;
            chai_1.expect(queue.dequeue()).to.be.null;
        });
        it("dequeue items", function () {
            chai_1.expect(queue.peek()).to.be.null;
            queue.enqueue(1, nameThree);
            queue.enqueue(2, nameOne);
            chai_1.expect(queue.size).to.equal(2);
            chai_1.expect(queue.peek()).to.equal(nameThree);
            chai_1.expect(queue.dequeue()).to.equal(nameThree);
            chai_1.expect(queue.dequeue()).to.equal(nameOne);
            chai_1.expect(queue.size).to.equal(0);
        });
    });
    //test end
});
//# sourceMappingURL=priorityQueue.test.js.map