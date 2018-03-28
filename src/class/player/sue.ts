import { IGhostManager, INode } from "src/interfaces";
import StateMachine from "src/class/stateMachine";
import Node from "src/class/node";
import Grid from "src/class/grid";
import Ghost from "src/class/player/ghost";

/**
 * sue will move towards pacman when getting too far away,
 * but will ignore pacman when getting too close
 */
export default class Sue extends Ghost {

    private _ignored: boolean;

    constructor(originator: IGhostManager) {

        super("sue", originator);
    }

    public initialize(): void {

        super.initialize();
        this._ignored = false;
        this._passiveness = 35;
        this._stateManager = new StateMachine(this, "inHouse");
    }

    protected setDirectionInHouse(): void {

        let originator = <IGhostManager>this._originator;
        //sue will always be the last one to leave ghost house
        if(originator.house.size > 1 || originator.onCooldown) {

            this.turnAround();

            return;
        }

        super.setDirectionInHouse();
    }

    protected getChaseDestination(): INode {
        //move to pacman when getting too far
        if(this.distanceToMovable(this.enemy) >= Grid.nodeSize * 8) {

            this._ignored = false;

            return new Node(this.enemy.row, this.enemy.column);
        }
        //move to elsewhere when getting too close to pacman
        if(!this._ignored && this._path !== null) {

            this._path = null;
            this._ignored = true;
        }

        return this.getRandomDestination();
    }
}