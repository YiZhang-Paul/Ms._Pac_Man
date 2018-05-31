//helper functions
export default {

    //current time in milliseconds
    get now(): number {

        return new Date().getTime();
    },

    capitalize(text: string): string {

        return text[0].toUpperCase() + text.slice(1);
    },

    //round number to given decimal place
    roundTo(value: number, decimal: number): number {

        const power = Math.pow(10, decimal);

        return Math.round(value * power) / power;
    },

    swap(array: any[], index1: number, index2: number): void {

        let indexes = [index1, index2];

        if(indexes.some(index => index < 0 || index > array.length - 1)) {

            throw "Invalid Index";
        }

        [array[index1], array[index2]] = [array[index2], array[index1]];
    },

    //pick random element from a collection
    randomElement<T>(array: T[]): T {

        return array[this.getRandom(0, array.length - 1)];
    },

    lastElement<T>(array: T[]): T {

        if(array.length === 0) {

            return null;
        }

        return array.slice(-1)[0];
    },

    //remove first occurrence of given element from array
    removeElement<T>(array: T[], element: T): void {

        const index = array.indexOf(element);

        if(index !== -1) {

            array.splice(index, 1);
        }
    },

    //retrieve random integer value between given range (inclusive)
    getRandom(min: number, max: number): number {

        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    //retrieve integer in middle of given range
    getRangeCenter(range: number): number {

        return (range + range % 2) * 0.5;
    }
};