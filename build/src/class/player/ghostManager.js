"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../../object/utility");
const sound_1 = require("../../class/sound");
const blinky_1 = require("../../class/player/blinky");
const pinky_1 = require("../../class/player/pinky");
const inky_1 = require("../../class/player/inky");
const sue_1 = require("../../class/player/sue");
class GhostManager {
    constructor(originator) {
        this._originator = originator;
        this.initialize();
    }
    get names() {
        return this._names;
    }
    get ghosts() {
        return this._ghosts;
    }
    get blinky() {
        return this._blinky;
    }
    get pinky() {
        return this._pinky;
    }
    get inky() {
        return this._inky;
    }
    get sue() {
        return this._sue;
    }
    //all ghosts currently in ghost house
    get house() {
        return this._house;
    }
    //human controlled characters
    get enemy() {
        return this._originator.pacman;
    }
    //cooldown to allow leaving ghost house
    get onCooldown() {
        return this._timestamp + this._cooldown > utility_1.default.now;
    }
    initialize() {
        this._names = ["blinky", "pinky", "inky", "sue"];
        this._blinky = new blinky_1.default(this);
        this._pinky = new pinky_1.default(this);
        this._inky = new inky_1.default(this);
        this._sue = new sue_1.default(this);
        this._ghosts = new Set([this._blinky, this._pinky, this._inky, this._sue]);
        this._house = new Set([this._pinky, this._inky, this._sue]);
        this._cooldown = 2000;
        this._timestamp = 0;
    }
    reset() {
        this._ghosts.forEach(ghost => {
            ghost.reset();
        });
        this._house = new Set([this._pinky, this._inky, this._sue]);
    }
    destroy() {
        this._ghosts.clear();
        this._house.clear();
    }
    //record timestamp when ghost enter ghost house
    setCooldown() {
        this._timestamp = utility_1.default.now;
    }
    startAnimation() {
        this._ghosts.forEach(ghost => {
            ghost.onAnimation = true;
        });
    }
    startMove() {
        this.startAnimation();
        this._ghosts.forEach(ghost => {
            //allow ghosts to move one by one
            let timeout = setTimeout(() => {
                clearTimeout(timeout);
                ghost.isMoving = true;
            }, ghost.state === "chasing" ? 1000 : this._cooldown);
        });
    }
    stopMove() {
        this._ghosts.forEach(ghost => {
            ghost.isMoving = false;
        });
    }
    getInHouse(ghost) {
        this._house.add(ghost);
        this.setCooldown();
    }
    getOutHouse(ghost) {
        this._house.delete(ghost);
        this.setCooldown();
    }
    //all ghosts outside of ghost house will enter flee state
    startFlee() {
        let states = ["chasing", "flee", "transition"];
        this._ghosts.forEach(ghost => {
            if (new Set(states).has(ghost.state)) {
                ghost.startFlee();
            }
        });
        this.clearSound();
        sound_1.default.play(document.getElementById("ghost_flee"), 0, 1, true);
    }
    killPacman() {
        this._originator.killPacman(false);
    }
    killGhost(ghost) {
        ghost.startRetreat();
    }
    clearSound() {
        sound_1.default.clear(document.getElementById("ghost_chase"));
        sound_1.default.clear(document.getElementById("ghost_flee"));
        sound_1.default.clear(document.getElementById("ghost_retreat"));
    }
    checkSound() {
        let ghosts = Array.from(this._ghosts);
        let sound = null;
        if (ghosts.some(ghost => ghost.state === "retreat")) {
            sound = document.getElementById("ghost_retreat");
        }
        else if (ghosts.some(ghost => new Set(["flee", "transition"]).has(ghost.state))) {
            sound = document.getElementById("ghost_flee");
        }
        else {
            sound = document.getElementById("ghost_chase");
        }
        if (!sound_1.default.isPlaying(sound)) {
            this.clearSound();
            sound_1.default.play(sound, 0, 1, true);
        }
    }
    update(timeStep) {
        this._ghosts.forEach(ghost => {
            ghost.update(timeStep);
        });
        this.checkSound();
    }
    draw() {
        this._ghosts.forEach(ghost => {
            ghost.draw();
        });
    }
}
exports.default = GhostManager;
//# sourceMappingURL=ghostManager.js.map