import { IGhostManager, INode } from "_ts/interfaces";
import StateMachine from "_ts/class/stateMachine";
import Node from "_ts/class/node";
import Ghost from "_ts/class/player/ghost";

/**
 * blinky will chase pacman for entire game duration
 */
export default class Blinky extends Ghost {

    constructor(originator: IGhostManager) {

        super("blinky", originator);
    }

    public initialize(): void {

        super.initialize();
        //set to chasing mode on default
        this._stateManager = new StateMachine(this, "chasing");
    }

    protected setDirectionInHouse(): void {

        let originator = <IGhostManager>this._originator;
        //will leave ghost house as soon as cooldown is off
        if(!originator.onCooldown) {

            super.setDirectionInHouse();

            return;
        }

        this.turnAround();;
    }

    protected getChaseDestination(): INode {

        return new Node(this.enemy.row, this.enemy.column);
    }
}