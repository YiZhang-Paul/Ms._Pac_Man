"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//helper functions
exports.default = {
    //current time in milliseconds
    get now() {
        return new Date().getTime();
    },
    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    },
    //round number to given decimal place
    roundTo(value, decimal) {
        const power = Math.pow(10, decimal);
        return Math.round(value * power) / power;
    },
    swap(array, index1, index2) {
        let indexes = [index1, index2];
        if (indexes.some(index => index < 0 || index > array.length - 1)) {
            throw "Invalid Index";
        }
        [array[index1], array[index2]] = [array[index2], array[index1]];
    },
    //pick random element from a collection
    randomElement(array) {
        return array[this.getRandom(0, array.length - 1)];
    },
    lastElement(array) {
        if (array.length === 0) {
            return null;
        }
        return array.slice(-1)[0];
    },
    //remove first occurrence of given element from array
    removeElement(array, element) {
        const index = array.indexOf(element);
        if (index !== -1) {
            array.splice(index, 1);
        }
    },
    //retrieve random integer value between given range (inclusive)
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    //retrieve integer in middle of given range
    getRangeCenter(range) {
        return (range + range % 2) * 0.5;
    }
};
//# sourceMappingURL=utility.js.map