import Utility from "../src/object/utility";
import { expect } from "chai";
import "mocha";

describe("capitalizeWord", () => {

    it("return capitalized word", () => {

        expect(Utility.capitalize("word")).to.equal("Word");
    });
});