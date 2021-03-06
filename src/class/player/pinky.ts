import { IGhostManager, INode } from "../../interfaces";
import StateMachine from "../../class/stateMachine";
import Node from "../../class/node";
import Grid from "../../class/grid";
import Ghost from "../../class/player/ghost";

/**
 * pinky will always try to stay 3 nodes ahead and ambush pacman
 */
export default class Pinky extends Ghost {

    constructor(originator: IGhostManager) {

        super("pinky", originator);
    }

    public initialize(): void {

        super.initialize();
        this._passiveness = 15;
        this._stateManager = new StateMachine(this, "inHouse");
    }

    protected setDirectionInHouse(): void {

        let originator = <IGhostManager>this._originator;
        //pinky will not leave ghost house when blinky is inside
        if(originator.house.has(originator.blinky) || originator.onCooldown) {

            this.turnAround();

            return;
        }

        super.setDirectionInHouse();
    }

    protected getChaseDestination(): INode {
        //move to 3 nodes ahead of pacman
        let nodeAhead = this.nodeAhead(this.enemy.direction, 3);

        if(nodeAhead !== null) {

            return nodeAhead;
        }

        return this.getRandomDestination();
    }
}