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

    width: number;
    height: number;
}

export interface IRenderable {

    draw(): void;
}

export interface IPoint extends IComparable<IPoint> {

    x: number;
    y: number;

    distanceTo(point: IPoint): number;
}

export interface INode extends IComparable<INode> {

    row: number;
    column: number;
    key: string;
}

export interface IMovable extends IInitializable, IResettable, ILocatable, IRenderable {

    speed: number;
    direction: string;

    distanceToMovable(movable: IMovable): number;
    update(timeStep: number): void;
}

export interface IGridData extends IDimension {

    rows: number;
    columns: number;
}

export interface IGrid extends IInitializable, IGridData {

    nodeSize: number;
    directions: string[];

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
    getNodeCenter(row: number, column: number): IPoint;
    getAdjacentNode(direction: string, row: number, column: number): INode;
    getAdjacentNodes(row: number, column: number): INode[];
}

export interface IUserInterface extends IInitializable, IResettable, IRenderable, IDimension {}

export interface IMaze extends IUserInterface {

    blink(): void;
}

export interface IScoreBoard extends IUserInterface {

    blinkId(): void;
    update(score: number): void;
}

export interface IPopUp extends IUserInterface, IDisposable {

    isAlive: boolean;
}

export interface IHud extends IUserInterface {

    load(): void;
    enqueue(type: number): void;
    dequeue(): void;
}

export interface IFood extends ILocatable, IRenderable, IDisposable {

    score: number;
}

export interface IFoodManager extends IInitializable, IResettable {

    remove(food: IFood): void;
}

export interface IGameManager extends IRenderable, IResettable {

    id: number;
    life: number;
    score: number;
    highest: number;
    popUps: Set<IPopUp>;

    checkScore(score: number): void;
    update(timeStep: number): void;
}

export interface IGame extends IInitializable, IResettable, IRenderable {

    state: string;
    timeStep: number;
    maze: IMaze;
    manager: IGameManager;

    run(): void;
    update(): void;
}