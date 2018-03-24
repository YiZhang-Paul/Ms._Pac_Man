//helper functions
export default {

    get now(): number {

        return new Date().getTime();
    },

    capitalize(text: string): string {

        return text[0].toUpperCase() + text.slice(1);
    },

    roundTo(value: number, decimal: number): number {

        const power = Math.pow(10, decimal);

        return Math.round(value * power) / power;
    },

    swap(array: any[], index1: number, index2: number): void {

        [array[index1], array[index2]] = [array[index2], array[index1]];
    },

    randomElement<T>(array: T[]): T {

        return array[this.getRandom(0, array.length - 1)];
    },

    lastElement<T>(array: T[]): T {

        if(array.length === 0) {

            return null;
        }

        return array.slice(-1)[0];
    },

    removeElement<T>(array: T[], element: T): void {

        const index = array.indexOf(element);

        if(index !== -1) {

            array.splice(index, 1);
        }
    },

    getRandom(min: number, max: number): number {

        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRangeCenter(range: number): number {

        return (range + range % 2) * 0.5;
    }
};