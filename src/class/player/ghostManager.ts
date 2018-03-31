import { IGhostManager, IGhost, IPacman, IGameManager } from "src/interfaces";
import Utility from "src/object/utility";
import Blinky from "src/class/player/blinky";
import Pinky from "src/class/player/pinky";
import Inky from "src/class/player/inky";
import Sue from "src/class/player/sue";

export default class GhostManager implements IGhostManager {

    private _originator: IGameManager;
    private _names: string[];
    private _blinky: IGhost;
    private _pinky: IGhost;
    private _inky: IGhost;
    private _sue: IGhost;
    private _ghosts: Set<IGhost>;
    private _house: Set<IGhost>;
    private _cooldown: number;
    private _timestamp: number;

    constructor(originator: IGameManager) {

        this._originator = originator;
        this.initialize();
    }

    get names(): string[] {

        return this._names;
    }

    get ghosts(): Set<IGhost> {

        return this._ghosts;
    }

    get blinky(): IGhost {

        return this._blinky;
    }

    get pinky(): IGhost {

        return this._pinky;
    }

    get inky(): IGhost {

        return this._inky;
    }

    get sue(): IGhost {

        return this._sue;
    }

    //all ghosts currently in ghost house
    get house(): Set<IGhost> {

        return this._house;
    }

    //human controlled characters
    get enemy(): IPacman {

        return this._originator.pacman;
    }

    //cooldown to allow leaving ghost house
    get onCooldown(): boolean {

        return this._timestamp + this._cooldown > Utility.now;
    }

    public initialize(): void {

        this._names = ["blinky", "pinky", "inky", "sue"];
        this._blinky = new Blinky(this);
        this._pinky = new Pinky(this);
        this._inky = new Inky(this);
        this._sue = new Sue(this);
        this._ghosts = new Set([this._blinky, this._pinky, this._inky, this._sue]);
        this._house = new Set([this._pinky, this._inky, this._sue]);
        this._cooldown = 2000;
        this._timestamp = 0;
    }

    public reset(): void {

        this._ghosts.forEach(ghost => {

            ghost.reset();
        });

        this._house = new Set([this._pinky, this._inky, this._sue]);
    }

    public destroy(): void {

        this._ghosts.clear();
        this._house.clear();
    }

    //record timestamp when ghost enter ghost house
    private setCooldown(): void {

        this._timestamp = Utility.now;
    }

    private startAnimation(): void {

        this._ghosts.forEach(ghost => {

            ghost.onAnimation = true;
        });
    }

    public startMove(): void {

        this.startAnimation();

        this._ghosts.forEach(ghost => {
            //allow ghosts to move one by one
            let timeout = setTimeout(() => {

                clearTimeout(timeout);
                ghost.isMoving = true;

            }, ghost.state === "chasing" ? 1000 : this._cooldown);
        });
    }

    public stopMove(): void {

        this._ghosts.forEach(ghost => {

            ghost.isMoving = false;
        });
    }

    public getInHouse(ghost: IGhost): void {

        this._house.add(ghost);
        this.setCooldown();
    }

    public getOutHouse(ghost: IGhost): void {

        this._house.delete(ghost);
        this.setCooldown();
    }

    //all ghosts outside of ghost house will enter flee state
    public startFlee(): void {

        let states = ["chasing", "flee", "transition"];

        this._ghosts.forEach(ghost => {

            if(new Set(states).has(ghost.state)) {

                ghost.startFlee();
            }
        });
    }

    public killPacman(): void {

        this._originator.killPacman(false);
    }

    public killGhost(ghost: IGhost): void {

        ghost.startRetreat();
    }

    public update(timeStep: number): void {

        this._ghosts.forEach(ghost => {

            ghost.update(timeStep);
        });
    }

    public draw(): void {

        this._ghosts.forEach(ghost => {

            ghost.draw();
        });
    }
}