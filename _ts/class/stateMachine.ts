import { IState } from "_ts/interfaces";
import Utility from "_ts/object/utility";

//stack based finite state machine
export default class StateMachine implements IState {

    private _originator: { update(timeStep: number): void };
    private _defaultState: string;
    private _states: string[];

    constructor(originator: { update(timeStep: number): void }, defaultState: string = null) {

        this._originator = originator;
        this._defaultState = defaultState;
        this.initialize();
    }

    //current active state
    get active(): string {

        return Utility.lastElement(this._states);
    }

    public initialize(): void {

        this._states = [];
        //initialize state tracker if default state is given
        if(this._defaultState) {

            this.push(this._defaultState);
        }
    }

    public reset(): void {

        this.initialize();
    }

    public push(state: string): void {

        if(this.active !== state) {

            this._states.push(state);
        }
    }

    public pop(): string {

        return this._states.pop();
    }

    //replace current active state
    public swap(state: string): void {

        this.pop();
        this.push(state);
    }

    public update(timeStep: number): void {

        if(this.active) {

            this._originator[this.active](timeStep);
        }
    }
}