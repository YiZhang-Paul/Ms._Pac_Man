interface IInitializable {

    initialize(): void;
}

interface IGridData {

    rows: number;
    columns: number;
    width: number;
    height: number;
}

export interface IPoint {

    x: number;
    y: number;

    isSame(point: IPoint): boolean;
    distanceTo(point: IPoint): number;
}

export interface INode {

    row: number;
    column: number;
    key: string;

    isSame(node: INode): boolean;
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