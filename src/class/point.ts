import { IPoint } from "../interfaces";

export default class Point implements IPoint {

    private _x: number = null;
    private _y: number = null;

    constructor(x: number, y: number) {

        this._x = x;
        this._y = y;
    }

    get x(): number {

        return this._x;
    }

    get y(): number {

        return this._y;
    }

    set x(value: number) {

        this._x = value;
    }

    set y(value: number) {

        this._y = value;
    }

    public isSame(point: IPoint): boolean {

        return this._x === point.x && this._y === point.y;
    }

    public distanceTo(point: IPoint): number {

        return Math.hypot((this._x - point.x), (this._y - point.y));
    }
}