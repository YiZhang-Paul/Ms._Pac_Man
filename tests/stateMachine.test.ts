import StateMachine from "../src/class/stateMachine";
import { expect } from "chai";
import "mocha";
//test begin
context("state machine test", function() {

const defaultState = "defaultState";
const newState = "newState";
const originator = { update(timeStep: number): void {} };
let stateMachine: StateMachine;

beforeEach("initialize state machine", function() {

    stateMachine = new StateMachine(originator);
});

describe("initialize()", function() {

    it("initialize with default state", function() {

        stateMachine = new StateMachine(originator, defaultState);

        expect(stateMachine.active).to.equal(defaultState);
    });

    it("initialize without default state", function() {

        expect(stateMachine.active).to.be.null;
    });
});

describe("push()", function() {

    it("push first state", function() {

        expect(stateMachine.active).to.be.null;

        stateMachine.push(newState);

        expect(stateMachine.active).to.equal(newState);
    });

    it("push state that is different from active state", function() {

        stateMachine = new StateMachine(originator, defaultState);

        expect(stateMachine.active).to.equal(defaultState);

        stateMachine.push(newState);

        expect(newState).to.not.equal(defaultState);
        expect(stateMachine.active).to.equal(newState);
    });
});

describe("pop()", function() {

    it("pop state from empty state machine", function() {

        expect(stateMachine.active).to.be.null;
        expect(stateMachine.pop()).to.be.undefined;
    });

    it("pop state", function() {

        stateMachine = new StateMachine(originator, defaultState);

        expect(stateMachine.active).to.equal(defaultState);
        expect(stateMachine.pop()).to.equal(defaultState);
        expect(stateMachine.active).to.be.null;
    });
});

describe("swap()", function() {

    it("swap state in empty state machine", function() {

        expect(stateMachine.active).to.be.null;

        stateMachine.swap(newState);

        expect(stateMachine.active).to.equal(newState);
    });

    it("swap state", function() {

        stateMachine = new StateMachine(originator, defaultState);

        expect(stateMachine.active).to.equal(defaultState);

        stateMachine.swap(newState);

        expect(stateMachine.active).to.equal(newState);
    });
});

//test end
});