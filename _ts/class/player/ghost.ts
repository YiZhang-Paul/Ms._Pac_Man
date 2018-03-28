import { IGhost, IGhostManager, IState, INode, IFindPath, IPacman, IMovable } from "_ts/interfaces";
import Locations from "_ts/object/locations";
import Utility from "_ts/object/utility";
import StateMachine from "_ts/class/stateMachine";
import Pathfinder from "_ts/class/pathfinder";
import Player from "_ts/class/player/player";
import Point from "_ts/class/point";
import Node from "_ts/class/node";
import Grid from "_ts/class/grid";

export default abstract class Ghost extends Player implements IGhost {

    protected _defaultSpeed: number;
    protected _score: number;
    protected _path: INode[];
    protected _pathfinder: IFindPath;
    protected _passiveness: number;
    private _timestamp: number;
    protected _fleeTime: number;
    protected _transitionTime: number;
    protected _dodging: boolean;
    protected _stateManager: IState;

    constructor(name: string, originator: IGhostManager) {

        super(name, originator);
        this.initialize();
    }

    get score(): number {

        return this._score;
    }

    //direction of next node on traveling path
    get nextNodeDirection(): string {
        //when current path is not available or too short
        if(this._path === null || this._path.length <= 1) {

            return this._direction;
        }

        return Grid.directions.find(direction => {

            let node = Grid.getAdjacentNode(direction, this._row, this._column);

            return this._path[1].isSame(node);
        });
    }

    get destination(): INode {

        if(this._path === null) {

            return null;
        }

        return Utility.lastElement(this._path);
    }

    //human controlled characters
    get enemy(): IPacman {

        return (<IGhostManager>this._originator).enemy;
    }

    get onFlee(): boolean {

        return this._timestamp + this._fleeTime > Utility.now;
    }

    get onTransition(): boolean {

        if(this.onFlee) {

            return false;
        }

        return this._timestamp + this._fleeTime + this._transitionTime > Utility.now;
    }

    //check if ghost should actively flee from human controlled characters
    get inFleeRange(): boolean {

        return this.distanceToMovable(this.enemy) < Grid.nodeSize * 8;
    }

    get inTunnel(): boolean {

        if(!this.withinMaze) {

            return true;
        }

        let meta = Grid.layout.getMetadata(this._row, this._column);

        if(meta === null || meta.b !== "p") {

            return false;
        }
        //check if ghost is located in tunnels inside of maze area
        return this._column < 3 || this._column > Grid.layout.columns - 4;
    }

    public initialize(): void {

        super.initialize();
        this._defaultSpeed = Math.round(Grid.height * 0.02) / 100;
        this._speed = this._defaultSpeed;
        this._score = 200;
        this._path = null;
        this._pathfinder = new Pathfinder(this);
        this._passiveness = 5;
        this._totalTicks = 2;
        this._timestamp = null;
        this._fleeTime = 10000;
        this._transitionTime = 3000;
        this._dodging = false;
        this._stateManager = new StateMachine(this, null);
        this.defaultCropXY = this.getCropXY;
    }

    public reset(): void {

        super.reset();
        this._speed = this._defaultSpeed;
        this._path = null;
        this._stateManager.reset();
        this.getCropXY = this.defaultCropXY;
    }

    protected turnAround(): void {

        if(this.toCollision === 0) {

            this._direction = this.getOpposite();
        }
    }

    //check if pacman can turn to given direction
    protected isValidDirection(direction: string): boolean {
        //can always turn around
        if(direction === this.getOpposite()) {

            return true;
        }

        return !this.hasWall(direction);
    }

    protected setDirectionInHouse(): void {
        //calculate door locations
        const doorWidth = Grid.nodeSize * 0.2;
        const left = (Grid.width - doorWidth) * 0.5;
        const right = (Grid.width + doorWidth) * 0.5;
        const centerY = (Locations.door.row + 2) * Grid.nodeSize;
        const inXRange = this._coordinate.x > left && this._coordinate.x < right;
        const inYRange = Math.round(Math.abs(this._coordinate.y - centerY)) < Grid.nodeSize * 0.5;
        //change directions to move out of ghost house
        if(new Set(["up", "down"]).has(this._direction) && !inXRange && inYRange) {

            this._direction = this._coordinate.x > Grid.width * 0.5 ? "left" : "right";
        }
        else if(new Set(["left", "right"]).has(this._direction) && inXRange) {

            this._direction = "up";
            this._stateManager.swap("exitingHouse");
        }
        else {

            this.turnAround();
        }
    }

    protected getRandomDestination(): INode {

        return Utility.randomElement(Grid.accessible.all);
    }

    protected abstract getChaseDestination(): INode;

    //check if ghost and given object is moving towards each other
    private isHeadOn(direction: string, movable: IMovable): boolean {

        if(this.getOpposite(direction) === movable.direction) {

            return true;
        }
        //when ghost and given object are moving on same axis
        if(new Set(["left", "right"]).has(direction)) {

            return direction === "left" ?
                this._coordinate.x > movable.coordinate.x :
                this._coordinate.x < movable.coordinate.x;
        }

        return direction === "up" ?
            this._coordinate.y > movable.coordinate.y :
            this._coordinate.y < movable.coordinate.y;
    }

    protected isValidFleePath(fleePath: INode[], enemyPath: INode[]): boolean {

        if(!this._pathfinder.coincides(fleePath, enemyPath)) {

            return true;
        }
        //avoid short flee path or running into pacman (e.g. when pacman is holding position)
        if(fleePath.length < 3 || this._pathfinder.contains(fleePath, enemyPath[0])) {

            return false;
        }

        if(this._pathfinder.contains(enemyPath, new Node(this._row, this._column))) {
            //avoid head on collision with pacman
            return !this.isHeadOn(this.nextNodeDirection, this.enemy);
        }

        return true;
    }

    protected getFleeDestination(): INode {
        //stop fleeing actively when far away from enemy
        if(!this.inFleeRange || this._path === null) {

            this._dodging = false;

            return this.getRandomDestination();
        }

        let destination: INode;
        let fleePath: INode[];
        let enemyPath = this.enemy.pathAhead;
        //avoid running into pacman
        if(!this.inTunnel) {

            for(let i = 0; i < 30; i++) {

                destination = this.getRandomDestination();
                fleePath = this._pathfinder.find(destination);

                if(this.isValidFleePath(fleePath, enemyPath)) {

                    break;
                }
            }
        }
        //replace current path with flee path if not already dodging the enemy
        if(!this._dodging && this._path !== null) {

            this._dodging = true;
            this._path = fleePath;
        }

        return destination;
    }

    protected getRetreatDestination(): INode {
        //coordinate of ghost house
        return new Node(Locations.retreat.row, Locations.retreat.column);
    }

    private setPath(destination: INode, walkFullPath: boolean): void {

        let path = this._pathfinder.find(destination);
        this._path = walkFullPath ? path: path.slice(0, this._passiveness);
    }

    //check completion of current path
    private checkPath(destination: INode, walkFullPath: boolean): void {

        let node = this._path[0];
        let center = Grid.getNodeCenter(node.row, node.column);

        if(this._coordinate.isSame(center)) {

            this._path.shift();

            if(this._path.length === 0) {

                this.setPath(destination, walkFullPath);
            }
        }
    }

    private managePath(destination: INode, walkFullPath: boolean): void {

        if(!this.withinMaze || this.inTunnel) {

            this._path = null;

            return;
        }

        if(this._path === null) {

            this.setPath(destination, walkFullPath);
        }

        this.checkPath(destination, walkFullPath);
    }

    //set direction to move along current path
    protected setDirection(): void {

        let direction: string = null;
        let node = this._path[0];
        let center = Grid.getNodeCenter(node.row, node.column);

        if(this._coordinate.y === center.y) {

            direction = this._coordinate.x < center.x ? "right" : "left";
        }
        else if(this._coordinate.x === center.x) {

            direction = this._coordinate.y < center.y ? "down" : "up";
        }
        else {
            //correct current coordinate to prevent number precision error
            this._coordinate = Grid.getNodeCenter(this._row, this._column);
            this.setDirection();

            return;
        }

        if(this.isValidDirection(direction)) {

            this._direction = direction;
        }
    }

    private killPacman(): void {

        if(this.distanceToMovable(this.enemy) < Grid.nodeSize) {

            //(<IGhostManager>this._originator).killPacman();
        }
    }

    /**
     * tile image crop location for corresponding states
     */
    private defaultCropXY(): void {}

    private fleeCropXY(): void {

        const x = (4 + this._tick) * this._cropWidth + 1;
        const y = this._cropWidth + 1;

        this._cropXY = new Point(x, y);
    }

    private retreatCropXY(): void {

        const index = Grid.directions.indexOf(this._direction);
        const x = (4 + index) * this._cropWidth + 1;
        const y = this._cropWidth * 7;

        this._cropXY = new Point(x, y);
    }

    //default tile image crop location
    protected getCropXY(): void {

        let names = (<IGhostManager>this._originator).names;
        const index = Grid.directions.indexOf(this._direction);
        const x = (index * 2 + this._tick) * this._cropWidth;
        const y = (names.indexOf(this._name) + 2) * this._cropWidth;

        this._cropXY = new Point(x, y);
    }

    /**
     * trigger state transition
     */
    public startFlee(): void {

        this.getCropXY = this.fleeCropXY;
        this.stopAnimation(0);
        this._path = null;
        this._timestamp = Utility.now;
        this._stateManager.swap("flee");
    }

    private startTransition(): void {

        if(!this.onFlee) {

            this.stopAnimation(0);
            this.playAnimation(4);
            this._stateManager.swap("transition");
        }
    }

    private endTransition(): void {

        if(!this.onTransition) {

            this.getCropXY = this.defaultCropXY;
            this.stopAnimation(0);
            this._path = null;
            this._stateManager.swap("chasing");
        }
    }

    public startRetreat(): void {

        this.getCropXY = this.retreatCropXY;
        this.stopAnimation(0);
        this._path = null;
        this._stateManager.swap("retreat");
    }

    private getInHouse(): void {

        let meta = Grid.layout.getMetadata(this._row, this._column);

        if(meta !== null && meta.hasOwnProperty("c")) {

            (<IGhostManager>this._originator).getInHouse(this);
            //move to left or right upon entering
            this._direction = this._coordinate.x < Grid.width * 0.5 ? "left" : "right";
            //restore default appearance
            this.getCropXY = this.defaultCropXY;
            this.stopAnimation(0);
            this._path = null;
            this._stateManager.swap("inHouse");
        }
    }

    private getOutHouse(): void {

        if(this._direction === "up" && this.hasDoor("down")) {

            (<IGhostManager>this._originator).getOutHouse(this);
            this._stateManager.swap("exitedHouse");
        }
    }

    //ghost action inside ghost house
    private insideActions(timeStep: number, modifier: number, stateChanger: () => void): void {

        this._speed = this._defaultSpeed * modifier;

        if(this._isMoving) {

            if(stateChanger !== null) {

                stateChanger.bind(this)();
            }

            this.move(timeStep);
            this.getOutHouse();
        }

        this.playAnimation();
    }

    //ghost action outside of ghost house
    private outsideActions(

        timeStep: number,
        modifier: number,
        pathFinder: () => INode,
        stateChanger: () => void,
        walkFullPath: boolean

    ): void {

        this._speed = this._defaultSpeed * modifier;

        if(this._isMoving) {

            if(this.canTurn) {

                this.managePath(pathFinder.bind(this)(), walkFullPath);
            }

            if(this._path !== null) {

                this.setDirection();
            }

            this.move(timeStep);
        }

        this.playAnimation();
        stateChanger.bind(this)();
    }

    /**
     * ghost states
     */
    private inHouse(timeStep: number): void {

        this.insideActions(timeStep, 0.65, this.setDirectionInHouse);
    }

    private exitingHouse(timeStep: number): void {

        this.insideActions(timeStep, 0.65, null);
    }

    private exitedHouse(timeStep: number): void {

        this.move(timeStep);

        if(this.toCollision === 0) {
            //pick random direction upon exiting ghost house
            this._direction = Math.random() < 0.5 ? "left" : "right";
            this._stateManager.swap("chasing");
        }
    }

    private chasing(timeStep: number): void {

        this.outsideActions(timeStep, 1, this.getChaseDestination, this.killPacman, false);
    }

    private flee(timeStep: number): void {

        this.outsideActions(timeStep, 0.8, this.getFleeDestination, this.startTransition, true);
    }

    private transition(timeStep: number): void {

        this.outsideActions(timeStep, 0.8, this.getFleeDestination, this.endTransition, true);
    }

    private retreat(timeStep: number): void {

        this.outsideActions(timeStep, 1.4, this.getRetreatDestination, this.getInHouse, true);
    }

    public update(timeStep: number): void {

        this._stateManager.update(timeStep);
    }
}