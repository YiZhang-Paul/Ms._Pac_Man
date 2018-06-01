"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../src/class/stateMachine");
const chai_1 = require("chai");
require("mocha");
//test begin
context("state machine test", function () {
    const defaultState = "defaultState";
    const newState = "newState";
    const originator = { update(timeStep) { } };
    let stateMachine;
    beforeEach("initialize state machine", function () {
        stateMachine = new stateMachine_1.default(originator);
    });
    describe("initialize()", function () {
        it("initialize with default state", function () {
            stateMachine = new stateMachine_1.default(originator, defaultState);
            chai_1.expect(stateMachine.active).to.equal(defaultState);
        });
        it("initialize without default state", function () {
            chai_1.expect(stateMachine.active).to.be.null;
        });
    });
    describe("push()", function () {
        it("push first state", function () {
            chai_1.expect(stateMachine.active).to.be.null;
            stateMachine.push(newState);
            chai_1.expect(stateMachine.active).to.equal(newState);
        });
        it("push state that is different from active state", function () {
            stateMachine = new stateMachine_1.default(originator, defaultState);
            chai_1.expect(stateMachine.active).to.equal(defaultState);
            stateMachine.push(newState);
            chai_1.expect(newState).to.not.equal(defaultState);
            chai_1.expect(stateMachine.active).to.equal(newState);
        });
    });
    describe("pop()", function () {
        it("pop state from empty state machine", function () {
            chai_1.expect(stateMachine.active).to.be.null;
            chai_1.expect(stateMachine.pop()).to.be.undefined;
        });
        it("pop state", function () {
            stateMachine = new stateMachine_1.default(originator, defaultState);
            chai_1.expect(stateMachine.active).to.equal(defaultState);
            chai_1.expect(stateMachine.pop()).to.equal(defaultState);
            chai_1.expect(stateMachine.active).to.be.null;
        });
    });
    describe("swap()", function () {
        it("swap state in empty state machine", function () {
            chai_1.expect(stateMachine.active).to.be.null;
            stateMachine.swap(newState);
            chai_1.expect(stateMachine.active).to.equal(newState);
        });
        it("swap state", function () {
            stateMachine = new stateMachine_1.default(originator, defaultState);
            chai_1.expect(stateMachine.active).to.equal(defaultState);
            stateMachine.swap(newState);
            chai_1.expect(stateMachine.active).to.equal(newState);
        });
    });
    //test end
});
//# sourceMappingURL=stateMachine.test.js.map