import PathFinder from "../src/class/pathfinder";
import { INode, IMovable } from "../src/interfaces";
import { expect } from "chai";
import * as Sinon from "sinon";
import "mocha";

function getNode(key: string = ""): INode {

    let node = <INode>{ get key(): string { return key; } };

    node.isSame = Sinon.fake.returns(false);

    return node;
}

function getPath(total: number, keys: string[]): INode[] {

    if(keys.length !== total) {

        throw "Invalid Keys.";
    }

    let path = new Array<INode>();

    for(let i = 0; i < total; i++) {

        path[i] = getNode(keys[i]);
    }

    return path;
}

//test begin
context("path finder test", function() {

const pathFinder = new PathFinder(<IMovable>{});

describe("contains()", function() {

    let path: INode[];
    let node: INode;

    beforeEach("initialize path and node", function() {

        path = getPath(5, new Array<string>(5).fill(""));
        node = getNode();
    });

    it("contains node", function() {

        path[1].isSame = Sinon.fake.returns(true);
        node.isSame = Sinon.fake.returns(true);

        expect(pathFinder.contains(path, node)).to.be.true;
    });

    it("does not contain node", function() {

        expect(pathFinder.contains(path, node)).to.be.false;
    });
});

describe("coincides()", function() {

    let path1: INode[];
    let path2: INode[];

    beforeEach("initialize path and node", function() {

        path1 = getPath(5, ["1", "2", "3", "4", "5"]);
        path2 = getPath(5, ["6", "7", "8", "9", "10"]);
    });

    it("coincides", function() {

        path2 = getPath(5, ["3", "7", "8", "9", "10"]);
        path1[1].isSame = Sinon.fake.returns(true);
        path2[1].isSame = Sinon.fake.returns(true);

        expect(pathFinder.coincides(path1, path2)).to.be.true;
    });

    it("does not coincide", function() {

        expect(pathFinder.coincides(path1, path2)).to.be.false;
    });
});

//test end
});