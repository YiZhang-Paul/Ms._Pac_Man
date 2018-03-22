export interface IInitializable {

    initialize(): void;
}

export interface IComparable<T> {

    isSame(object: T): boolean;
}

export interface IDimension {

    width: number;
    height: number;
}

export interface IGridData extends IDimension {

    rows: number;
    columns: number;
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

export interface IMaze {


}

export interface IGameManager {

    reset(): void;
    update(timeStep: number): void;
    draw(): void;
}

export interface IGame extends IInitializable {

    state: string;
    timeStep: number;
    maze: IMaze;
    manager: IGameManager;

    canvas: {

        background: CanvasRenderingContext2D;
        food: CanvasRenderingContext2D;
        fruit: CanvasRenderingContext2D;
        player: CanvasRenderingContext2D;
        userInterface: CanvasRenderingContext2D;
        scorePopUp: CanvasRenderingContext2D;
    };

    run(): void;
    reset(): void;
    update(): void;
    draw(): void;
}