import { Direction } from "src/object/direction";
import { IMovable } from "src/interfaces";
import Point from "src/class/point";
import Grid from "src/class/grid";

//game object default locations
export default {
    //destination for all retreating ghosts
    retreat : {

        row    : 14,
        column : 14
    },

    door : {

        row    : 13,
        column : [14, 15],
    },

    /**
     * spawn locations
     */
    pacman : {

        row       : 23,
        column    : 14,
        direction : Direction.RIGHT
    },

    blinky : {

        row       : 11,
        column    : 14,
        direction : Direction.LEFT
    },

    pinky : {

        row       : 14,
        column    : 14,
        direction : Direction.DOWN
    },

    inky : {

        row       : 14,
        column    : 12,
        direction : Direction.UP
    },

    sue : {

        row  	  : 14,
        column    : 16,
        direction : Direction.UP
    },

    //set initial location of given movable object
    setLocation(movable: IMovable, key: string): void {

        movable.direction = this[key].direction;

        movable.coordinate = new Point(

            Grid.nodeSize * this[key].column,
            Grid.nodeSize * (this[key].row + 0.5)
        );
    }
};