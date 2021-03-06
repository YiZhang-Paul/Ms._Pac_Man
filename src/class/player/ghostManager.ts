import { IGhostManager, IGhost, IPacman, IGameManager } from "../../interfaces";
import Utility from "../../object/utility";
import Sound from "../../class/sound";
import Blinky from "../../class/player/blinky";
import Pinky from "../../class/player/pinky";
import Inky from "../../class/player/inky";
import Sue from "../../class/player/sue";

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

        this.clearSound();
        Sound.play(<HTMLAudioElement>document.getElementById("ghost_flee"), 0, 1, true);
    }

    public killPacman(): void {

        this._originator.killPacman(false);
    }

    public killGhost(ghost: IGhost): void {

        ghost.startRetreat();
    }

    private clearSound(): void {

        Sound.clear(<HTMLAudioElement>document.getElementById("ghost_chase"));
        Sound.clear(<HTMLAudioElement>document.getElementById("ghost_flee"));
        Sound.clear(<HTMLAudioElement>document.getElementById("ghost_retreat"));
    }

    private checkSound(): void {

        let ghosts = Array.from(this._ghosts);
        let sound: HTMLAudioElement = null;

        if(ghosts.some(ghost => ghost.state === "retreat")) {

            sound = <HTMLAudioElement>document.getElementById("ghost_retreat");
        }
        else if(ghosts.some(ghost => new Set<string>(["flee", "transition"]).has(ghost.state))) {

            sound = <HTMLAudioElement>document.getElementById("ghost_flee");
        }
        else {

            sound = <HTMLAudioElement>document.getElementById("ghost_chase");
        }

        if(!Sound.isPlaying(sound)) {

            this.clearSound();
            Sound.play(sound, 0, 1, true);
        }
    }

    public update(timeStep: number): void {

        this._ghosts.forEach(ghost => {

            ghost.update(timeStep);
        });

        this.checkSound();
    }

    public draw(): void {

        this._ghosts.forEach(ghost => {

            ghost.draw();
        });
    }
}