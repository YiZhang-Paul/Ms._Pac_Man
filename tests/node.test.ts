import Node from "../src/class/node";
import { expect } from "chai";
import "mocha";
//test begin
context("node test", function() {

const node = new Node(5, 8);
let otherNode: Node;

describe("key() getter", function() {

    it("get key", function() {

        expect(node.key).to.equal("5,8");
    });
});

describe("isSame()", function() {

    it("is same node", function() {

        otherNode = new Node(node.row, node.column);

        expect(node.isSame(otherNode)).to.be.true;
    });

    it("is different node", function() {

        otherNode = new Node(node.row + 1, node.column + 1);

        expect(node.isSame(otherNode)).to.be.false;
    });
});

//test end
});