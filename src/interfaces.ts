export interface IInitializable {

    initialize(): void;
}

export interface IResettable {

    reset(): void;
}

export interface IDisposable {

    dispose(auto?: boolean): void;
}

export interface IComparable<T> {

    isSame(object: T): boolean;
}

export interface ILocatable {

    row: number;
    column: number;
    coordinate: IPoint;
}

export interface IDimension {

    readonly width: number;
    readonly height: number;
}

export interface IUpdatable {

    update(timeStep?: number): void;
}

export interface IRenderable {

    draw(): void;
}

export interface IBlinkable {

    blink(): void;
}

export interface IFindPath {

    contains(path: INode[], node: INode): boolean;
    coincides(path1: INode[], path2: INode[]): boolean;
    find(destination: INode): INode[];
}

export interface IData<T> {

    readonly key: number;
    readonly data: T;
}

export interface IHeap<T> {

    readonly size: number;
    readonly root: IData<T>;

    add(data: IData<T>): void;
    shift(): IData<T>;
}

export interface IPriorityQueue<T> {

    readonly size: number;

    peek(): T;
    enqueue(priority: number, data: T): void;
    dequeue(): T;
}

export interface IPoint extends IComparable<IPoint> {

    x: number;
    y: number;

    distanceTo(point: IPoint): number;
}

export interface INode extends IComparable<INode> {

    readonly row: number;
    readonly column: number;
    readonly key: string;
    parent: INode;
}

export interface IState extends IInitializable, IResettable, IUpdatable {

    readonly active: string;

    push(state: string): void;
    pop(): string;
    swap(state: string): void;
}

export interface IMovable extends IInitializable, IResettable, ILocatable, IUpdatable, IRenderable {

    speed: number;
    direction: string;
    readonly state: string;

    distanceToMovable(movable: IMovable): number;
}

/**
 * player objects
 */
export interface IPlayer extends IMovable {

    isMoving: boolean;
    onAnimation: boolean;
    pathAhead: INode[];

    nodeAhead(direction: string, total: number): INode;
    playAnimation(totalTicks: number, speed: number, endTick: number): void;
    stopAnimation(endTick: number): void;
}

export interface IGhost extends IPlayer {

    readonly score: number;
    readonly inTunnel: boolean;
    readonly onFlee: boolean;
    readonly onTransition: boolean;

    startFlee(): void;
    startRetreat(): void;
}

export interface IPacman extends IPlayer {

    readonly isDying: boolean;
    readonly killCount: number;

    killGhost(): void;
    consume(): void;
    playDeathAnimation(): void;
}

/**
 * game grid
 */
export interface IGridData extends IDimension {

    readonly rows: number;
    readonly columns: number;
    readonly nodeSize: number;
}

export interface IGridLayout extends IInitializable, IGridData {

    layers: any[][][];

    exists(row: number, column: number): boolean;
    getObject(row: number, column: number): any;
    getMetadata(row: number, column: number): { [key: string] : string };
    setObject(row: number, column: number, object: any): void;
}

export interface IGrid extends IInitializable, IDimension {

    readonly nodeSize: number;
    readonly directions: string[];
    readonly layout: IGridLayout;

    readonly accessible: {

        all         : INode[],
        topLeft     : INode[],
        topRight    : INode[],
        bottomLeft  : INode[],
        bottomRight : INode[]
    },

    isAccessible(row: number, column: number): boolean;
    isEntrance(row: number, column: number): boolean;
    getNode(point: IPoint): INode;
    getNodeCenter(row: number, column: number): IPoint;
    getAdjacentNode(direction: string, row: number, column: number): INode;
    getAdjacentNodes(row: number, column: number): INode[];
}

/**
 * user interface
 */
export interface IUserInterface extends IInitializable, IResettable, IRenderable, IDimension {}

export interface IMaze extends IUserInterface, IBlinkable {}

export interface IScoreBoard extends IUserInterface {

    blinkId(): void;
}

export interface IPopUp extends IUserInterface, IDisposable, IUpdatable {

    readonly isAlive: boolean;
}

export interface IHud extends IUserInterface {

    load(): void;
    showLife(): void;
    showFruits(): void;
}

/**
 * food objects
 */
export interface IFood extends ILocatable, IRenderable, IDisposable {

    score: number;
}

export interface IBlinkableFood extends IFood, IBlinkable {}

export interface IFruit extends IFood, IMovable {}

/**
 * game asset manager
 */
export interface IManager extends IInitializable, IResettable, IUpdatable, IRenderable {}

export interface IFoodManager extends IManager {

    readonly totalBeans: number;
    readonly fruitQueue: number[];
    readonly fruit: IFruit;

    isBean(row: number, column: number): boolean;
    isPowerBean(row: number, column: number): boolean;
    getBean(row: number, column: number): IFood;
    putBeans(): void;
    putFruit(): void;
    removeBean(bean: IFood): void;
    removeFruit(auto: boolean): void;
}

export interface IGhostManager extends IManager {

    readonly names: string[];
    readonly ghosts: Set<IGhost>;
    readonly blinky: IGhost;
    readonly pinky: IGhost;
    readonly inky: IGhost;
    readonly sue: IGhost;
    readonly house: Set<IGhost>;
    readonly enemy: IPacman;
    readonly onCooldown: boolean;

    startMove(): void;
    stopMove(): void;
    getInHouse(ghost: IGhost): void;
    getOutHouse(ghost: IGhost): void;
    startFlee(): void;
    killPacman(): void;
    killGhost(ghost: IGhost): void;
}

export interface IGameManager extends IManager {

    readonly id: number;
    readonly life: number;
    readonly score: number;
    readonly highest: number;
    readonly pacman: IPacman;
    readonly ghosts: Set<IGhost>;

    startFlee(): void;
    killPacman(animationEnd: boolean): void;
    killGhost(ghost: IGhost): void;
    checkScore(score: number): void;
    checkGameState(): void;
    showFruits(): void;
    addPopUp(coordinate: IPoint, score: number): void;
    removePopUp(popUp: IPopUp): void;
}

/**
 * main game object
 */
export interface IGame extends IInitializable, IResettable, IUpdatable, IRenderable {

    readonly state: string;
    readonly timeStep: number;
    readonly manager: IGameManager;

    run(): void;
}