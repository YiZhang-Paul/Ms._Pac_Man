import Utility from "../src/object/utility";
import { expect } from "chai";
import "mocha";
//test begin
context("utility test", function() {

describe("capitalize()", function() {

    it("capitalize lowercased word", function() {

        expect(Utility.capitalize("lowercase")).to.equal("Lowercase");
    });

    it("capitalize uppercased word", function() {

        expect(Utility.capitalize("UPPERCASE")).to.equal("UPPERCASE");
    });
});

describe("roundTo()", function() {

    it("round to 2 decimal places", function() {

        expect(Utility.roundTo(5.333333, 2)).to.equal(5.33);
    });

    it("round integer", function() {

        expect(Utility.roundTo(5, 2)).to.equal(5);
    });
});

describe("swap()", function() {

    let array: number[];

    beforeEach("initialize array", function() {

        array = [1, 2, 3];
    });

    it("swap valid indexes", function() {

        Utility.swap(array, 0, 2);

        expect(array).to.deep.equal([3, 2, 1]);
    });

    it("swap invalid indexes", function() {

        expect(Utility.swap.bind(Utility, array, -1, 2)).to.throw();
        expect(Utility.swap.bind(Utility, array, 0, 3)).to.throw();
    });
});

describe("randomElement<T>()", function() {

    it("get random value", function() {

        let array = [1, 2, 3];

        for(let i = 0; i < 50; i++) {

            expect(array).to.include(Utility.randomElement(array));
        }
    });
});

describe("lastElement<T>()", function() {

    let array: number[];

    it("last element of non-empty array", function() {

        array = [1, 2, 3];

        expect(Utility.lastElement(array)).to.equal(3);
    });

    it("last element of empty array", function() {

        array = new Array<number>();

        expect(Utility.lastElement(array)).to.be.null;
    });
});

describe("removeElement<T>()", function() {

    let array: number[];

    it("remove element without duplicate from array", function() {

        array = [1, 2, 3];

        expect(array).to.deep.equal([1, 2, 3]);

        Utility.removeElement(array, 2);

        expect(array).to.deep.equal([1, 3]);
    });

    it("remove element with duplicate from array", function() {

        array = [1, 2, 3, 2];

        expect(array).to.deep.equal([1, 2, 3, 2]);

        Utility.removeElement(array, 2);

        expect(array).to.deep.equal([1, 3, 2]);
    });

    it("remove element that is not in array", function() {

        array = [1, 2, 3];

        expect(array).to.deep.equal([1, 2, 3]);

        Utility.removeElement(array, 4);

        expect(array).to.deep.equal([1, 2, 3]);
    });
});

describe("getRandom()", function() {

    it("get random value", function() {

        for(let i = 0; i < 50; i++) {

            expect(Utility.getRandom(5, 7)).to.be.within(5, 7);
        }
    });
});

describe("getRangeCenter()", function() {

    it("get middle of a range with even number of values", function() {

        expect(Utility.getRangeCenter(6)).to.be.equal(3);
    });

    it("get middle of a range with odd number of values", function() {

        expect(Utility.getRangeCenter(5)).to.be.equal(3);
    });
});

//test end
});