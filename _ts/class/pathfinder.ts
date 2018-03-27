import { IFindPath, IMovable, INode, IPriorityQueue } from "_ts/interfaces";
import PriorityQueue from "_ts/class/priorityQueue";
import Node from "_ts/class/node";
import Grid from "_ts/class/grid";

export default class PathFinder implements IFindPath {

    private _originator: IMovable;
    private _costs: Map<string, number>;
    private _priority: IPriorityQueue<INode>;

    constructor(originator: IMovable) {

        this._originator = originator;
    }

    //setup initial travel costs and priorities to visit nodes
    private setup(start: INode): void {

        this._costs = new Map<string, number>();
        this._priority = new PriorityQueue();
        //initialize cost and priority
        this._costs.set(start.key, 0);
        this._priority.enqueue(0, start);
    }

    public contains(path: INode[], node: INode): boolean {

        return path.some(current => current.isSame(node));
    }

    //check if two paths intersect with each other
    public coincides(path1: INode[], path2: INode[]): boolean {

        let keys = new Set<string>(path1.map(node => node.key));

        return path2.some(node => keys.has(node.key));
    }

    //calculate sum of horizontal and vertical distance between nodes
    private getHeuristic(candidate: INode, destination: INode): number {

        const horizontal = Math.abs(candidate.column - destination.column);
        const vertical = Math.abs(candidate.row - destination.row);

        return horizontal + vertical;
    }

    //find all accessible neighbour nodes
    private getCandidates(node: INode): INode[] {

        let candidates = Grid.getAdjacentNodes(node.row, node.column);

        return candidates.filter(candidate => {

            const [row, column] = [candidate.row, candidate.column];
            const isRetreat = this._originator.state === "retreat";
            //can only move through doors while retreating
            if(isRetreat && Grid.isEntrance(row, column)) {

                return true;
            }

            return Grid.isAccessible(row, column);
        });
    }

    //evaluate travel costs and update priorities to visit neighbour nodes
    private evaluateCosts(current: INode, destination: INode): void {

        this.getCandidates(current).forEach(candidate => {

            const key = candidate.key;
            const cost = this._costs.get(current.key) + 1;
            //record new cost or update cost when better route is found
            if(!this._costs.has(key) || cost < this._costs.get(key)) {

                this._costs.set(key, cost);
                //update priority to visit candidate node
                const heuristic = this.getHeuristic(candidate, destination);
                this._priority.enqueue(cost + heuristic, candidate);
                candidate.parent = current;
            }
        });
    }

    private searchNode(node: INode): INode {

        let result: INode;
        const row = this._originator.row;
        const column = this._originator.column;
        this.setup(new Node(row, column));

        while(this._priority.size > 0) {

            result = this._priority.dequeue();
            //when path is found
            if(result.isSame(node)) {

                break;
            }

            this.evaluateCosts(result, node);
        }

        return result;
    }

    public find(destination: INode): INode[] {

        let path = new Array<INode>();
        let node = this.searchNode(destination);

        while(node.parent !== null) {

            path.push(node);
            node = node.parent;
        }

        return [...path, node].reverse();
    }
}