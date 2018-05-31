import Control from "../src/object/control";
import { expect } from "chai";
import "mocha";
//test begin
context("control test", function() {

beforeEach("initialize key pressed", function() {

    Control.pressedKeys = new Array<number>();
});

describe("active() getter", function() {

    it("get active key when no key pressed", function() {

        expect(Control.active).to.be.null;
    });

    it("get active key", function() {

        Control.pressedKeys = [33, 67];

        expect(Control.active).to.equal(67);
    });
});

describe("isPressed()", function() {

    it("when key is pressed", function() {

        expect(Control.isPressed(67)).to.be.false;

        Control.pressedKeys = [33, 67, 122, 96];

        expect(Control.isPressed(67)).to.be.true;
    });

    it("when key is not pressed", function() {

        Control.pressedKeys = [33, 67, 122];

        expect(Control.isPressed(96)).to.be.false;
    });
});

describe("add()", function() {

    it("add new key", function() {

        Control.pressedKeys = [33, 67];

        expect(Control.pressedKeys).to.deep.equal([33, 67]);

        Control.add(122);

        expect(Control.pressedKeys).to.deep.equal([33, 67, 122]);
    });

    it("add duplicate key", function() {

        Control.pressedKeys = [33, 67];

        expect(Control.pressedKeys).to.deep.equal([33, 67]);

        Control.add(33);
        Control.add(67);

        expect(Control.pressedKeys).to.deep.equal([33, 67]);
    });
});

describe("remove()", function() {

    it("remove pressed key", function() {

        Control.pressedKeys = [33, 67, 122];

        expect(Control.pressedKeys).to.deep.equal([33, 67, 122]);

        Control.remove(67);

        expect(Control.pressedKeys).to.deep.equal([33, 122]);
    });

    it("remove not pressed key", function() {

        Control.pressedKeys = [33, 67, 122];

        expect(Control.pressedKeys).to.deep.equal([33, 67, 122]);

        Control.remove(96);

        expect(Control.pressedKeys).to.deep.equal([33, 67, 122]);
    });
});

//test end
});