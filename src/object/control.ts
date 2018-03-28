import Utility from "src/object/utility";

//in-game control
export default {

    pressedKeys : new Array<number>(),
    /**
	 * control keys
	 */
    //move up
	W     : 87,
	UP    : 38,
	//move down
	S     : 83,
	DOWN  : 40,
	//move left
	A     : 65,
	LEFT  : 37,
	//move right
	D     : 68,
    RIGHT : 39,

    //most recent key pressed
    get active(): number {

        return Utility.lastElement(this.pressedKeys);
    },

    isPressed(key): boolean {

        return this.pressedKeys.includes(key);
    },

    add(key): void {

        if(!this.isPressed(key)) {

            this.pressedKeys.push(key);
        }
    },

    remove(key): void {

        if(this.isPressed(key)) {

            Utility.removeElement(this.pressedKeys, key);
        }
    }
};