import { IGhostManager, INode } from "_ts/interfaces";
import StateMachine from "_ts/class/stateMachine";
import Node from "_ts/class/node";
import Grid from "_ts/class/grid";
import Ghost from "_ts/class/player/ghost";

export default class Inky extends Ghost {

    constructor(originator: IGhostManager) {

        super("inky", originator);
    }

    public initialize(): void {

        super.initialize();
        this._aggressiveness = 25;
        this._stateManager = new StateMachine(this, "inHouse");
    }

    protected setDirectionInHouse(): void {

        let originator = <IGhostManager>this._originator;

        if(originator.house.has(originator.blinky) ||
           originator.house.has(originator.pinky) ||
           originator.onCooldown) {

            this.turnAround();

            return;
        }

        super.setDirectionInHouse();
    }

    protected getChaseDestination(): INode {

        let nodeAhead: INode;

        for(let i = 2; i <= 5; i++) {

            nodeAhead = this.nodeAhead(this.enemy.direction, i);

            if(nodeAhead !== null) {

                break;
            }
        }

        if(nodeAhead === null) {

            return this.getRandomDestination();
        }

        let blinky = (<IGhostManager>this._originator).blinky;
        const row = nodeAhead.row * 2 - blinky.row;
        const column = nodeAhead.column * 2 - blinky.column;

        if(!Grid.isAccessible(row, column)) {

            return this.getRandomDestination();
        }

        return new Node(row, column);
    }
}