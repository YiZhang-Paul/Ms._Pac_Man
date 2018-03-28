import { IGhostManager, INode } from "_ts/interfaces";
import StateMachine from "_ts/class/stateMachine";
import Node from "_ts/class/node";
import Grid from "_ts/class/grid";
import Ghost from "_ts/class/player/ghost";

export default class Sue extends Ghost {

    private _ignored: boolean;

    constructor(originator: IGhostManager) {

        super("sue", originator);
    }

    public initialize(): void {

        super.initialize();
        this._ignored = false;
        this._stateManager = new StateMachine(this, "inHouse");
    }

    protected setDirectionInHouse(): void {

        let originator = <IGhostManager>this._originator;

        if(originator.house.size > 1 || originator.onCooldown) {

            this.turnAround();

            return;
        }

        super.setDirectionInHouse();
    }

    protected getChaseDestination(): INode {

        if(this.distanceToMovable(this.enemy) >= Grid.nodeSize * 8) {

            this._ignored = false;

            return new Node(this.enemy.row, this.enemy.column);
        }

        if(!this._ignored && this._path !== null) {

            this._path = null;
            this._ignored = true;
        }

        return this.getRandomDestination();
    }
}