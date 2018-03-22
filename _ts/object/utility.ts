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

    lastElement(array: any[]): any {

        if(array.length === 0) {

            return null;
        }

        return array.slice(-1)[0];
    },

    removeElement(array: any[], element: any): void {

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