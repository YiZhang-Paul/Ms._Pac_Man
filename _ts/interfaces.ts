export interface IInitializable {

    initialize(): void;
}

export interface IResettable {

    reset(): void;
}

export interface IDisposable {

    dispose(): void;
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

export interface IState extends IInitializable, IResettable {

    readonly active: string;

    push(state: string): void;
    pop(): string;
    swap(state: string): void;
    update(timeStep: number): void;
}

export interface IMovable extends IInitializable, IResettable, ILocatable, IRenderable {

    speed: number;
    direction: string;
    readonly state: string;

    distanceToMovable(movable: IMovable): number;
    update(timeStep: number): void;
}

export interface IPlayer extends IMovable {

    isMoving: boolean;
    onAnimation: boolean;

    playAnimation(totalTicks: number, speed: number, endTick: number): void;
    stopAnimation(endTick: number): void;
}

export interface IGridData extends IDimension {

    readonly rows: number;
    readonly columns: number;
}

export interface IGrid extends IInitializable, IGridData {

    readonly nodeSize: number;
    readonly directions: string[];

    accessible : {

        all         : INode[],
        topLeft     : INode[],
        topRight    : INode[],
        bottomLeft  : INode[],
        bottomRight : INode[]
    },

    exists(row: number, column: number): boolean;
    getNode(point: IPoint): INode;
    getContent(layer: number, row: number, column: number): { [key: string] : string };
    setContent(layer: number, row: number, column: number, content: any): void;
    isAccessible(row: number, column: number): boolean;
    isEntrance(row: number, column: number): boolean;
    getNodeCenter(row: number, column: number): IPoint;
    getAdjacentNode(direction: string, row: number, column: number): INode;
    getAdjacentNodes(row: number, column: number): INode[];
}

export interface IUserInterface extends IInitializable, IResettable, IRenderable, IDimension {}

export interface IMaze extends IUserInterface, IBlinkable {}

export interface IScoreBoard extends IUserInterface {

    blinkId(): void;
    update(score: number): void;
}

export interface IPopUp extends IUserInterface, IDisposable {

    readonly isAlive: boolean;
}

export interface IHud extends IUserInterface {

    load(): void;
    showLife(): void;
    showFruits(): void;
}

export interface IFood extends ILocatable, IRenderable, IDisposable {

    score: number;
}

export interface IBlinkableFood extends IFood, IBlinkable {}

export interface IFruit extends IFood, IMovable {}

export interface IFoodManager extends IInitializable, IResettable, IRenderable {

    readonly totalBeans: number;
    readonly fruitQueue: number[];

    putBeans(): void;
    putFruit(): void;
    remove(food: IFood): void;
    update(timeStep: number): void;
}

export interface IGameManager extends IRenderable, IResettable {

    readonly id: number;
    readonly life: number;
    readonly score: number;
    readonly highest: number;
    readonly popUps: Set<IPopUp>;
    readonly hud: IHud;
    readonly foodManager: IFoodManager;

    checkScore(score: number): void;
    update(timeStep: number): void;
}

export interface IGame extends IInitializable, IResettable, IRenderable {

    readonly state: string;
    readonly timeStep: number;
    readonly manager: IGameManager;

    run(): void;
    update(): void;
}