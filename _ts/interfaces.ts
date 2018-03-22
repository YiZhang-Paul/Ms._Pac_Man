export interface IGrid {

    width: number;
    height: number;

    initialize(): void;
}

export interface IMaze {


}

export interface IGameManager {

    reset(): void;
    update(timeStep: number): void;
    draw(): void;
}

export interface IGame {

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

    initialize(): void;
    run(): void;
    reset(): void;
    update(): void;
    draw(): void;
}