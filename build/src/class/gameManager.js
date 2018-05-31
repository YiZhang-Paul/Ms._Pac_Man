"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("../object/control");
const canvas_1 = require("../object/canvas");
const stateMachine_1 = require("../class/stateMachine");
const grid_1 = require("../class/grid");
const maze_1 = require("../class/userInterface/maze");
const sound_1 = require("../class/sound");
const scoreBoard_1 = require("../class/userInterface/scoreBoard");
const hud_1 = require("../class/userInterface/hud");
const scorePopUp_1 = require("../class/userInterface/scorePopUp");
const pacman_1 = require("../class/player/pacman");
const ghostManager_1 = require("../class/player/ghostManager");
const foodManager_1 = require("../class/food/foodManager");
class GameManager {
    constructor() {
        this.initialize();
    }
    get id() {
        return this._id;
    }
    get life() {
        return this._life;
    }
    get score() {
        return this._score;
    }
    //current highest score
    get highest() {
        return this._highest;
    }
    get state() {
        return this._stateManager.active;
    }
    get pacman() {
        return this._pacman;
    }
    get ghosts() {
        return this._ghostManager.ghosts;
    }
    initialize() {
        this._id = 1;
        this._life = 4;
        this._score = 0;
        this._highest = this._score;
        this._foodManager = new foodManager_1.default(this);
        this._ghostManager = new ghostManager_1.default(this);
        this._lastGhostKilled = null;
        this._pacman = new pacman_1.default(this, this._foodManager);
        this._maze = new maze_1.default(grid_1.default.width, grid_1.default.height);
        this._hud = new hud_1.default(this, this._foodManager);
        this._popUps = new Set();
        this._timeout = null;
        this._interval = null;
        this._cropWidth = 32;
        this._tile = document.getElementById("tile");
        this._ctx = canvas_1.default.player;
        this._stateManager = new stateMachine_1.default(this, "loaded");
        this._stateManager.push("loading");
        this.drawReadyText();
        if (this._scoreBoard === undefined) {
            this._scoreBoard = new scoreBoard_1.default(this);
        }
        else {
            //keep previous scoreboard on game reset
            this._scoreBoard.reset();
        }
    }
    reset() {
        this._score = 0;
        this._ghostManager.reset();
        this._lastGhostKilled = null;
        this._foodManager.reset();
        this._pacman.reset();
        this._maze.reset();
        this._hud.reset();
        this._scoreBoard.reset();
        this._stateManager.reset();
        this.drawReadyText();
    }
    destroy() {
        this._ghostManager.destroy();
        this._foodManager.destroy();
    }
    //trigger ghost flee mode on power bean consumption
    startFlee() {
        this._ghostManager.startFlee();
    }
    killPacman(animationEnd) {
        //when pacman death animation finished
        if (animationEnd) {
            this._life--;
            this.checkGameState();
            return;
        }
        this._stateManager.swap("pacmanDying");
    }
    killGhost(ghost) {
        //score is doubled for every ghost killed on last power bean consumption
        const multiplier = Math.pow(2, this._pacman.killCount - 1);
        const score = ghost.score * multiplier;
        this.checkScore(score);
        this.addPopUp(ghost.coordinate, score);
        //trigger retreat mode of killed ghost
        this._lastGhostKilled = ghost;
        this._lastGhostKilled.startRetreat();
        this._stateManager.swap("ghostKilled");
    }
    checkScore(score) {
        this._score += score;
        this._highest = Math.max(this._score, this._highest);
        this._scoreBoard.draw();
    }
    checkGameState() {
        if (this._life === 0) {
            //restart entire game
            this._stateManager.swap("restarting");
        }
        else if (this._foodManager.totalBeans === 0) {
            //load next round
            this._stateManager.swap("reloading");
        }
        else if (this.state === "pacmanDying") {
            //reset current round
            this._stateManager.swap("resetting");
        }
    }
    //draw next fruits in queue
    showFruits() {
        this._hud.draw();
    }
    addPopUp(coordinate, score) {
        this._popUps.add(new scorePopUp_1.default(this, coordinate.x, coordinate.y, score));
    }
    removePopUp(popUp) {
        this._popUps.delete(popUp);
    }
    /**
     * game states
     */
    loading(timeStep) {
        if (this._timeout === null) {
            let soundTimeout = setTimeout(() => {
                clearTimeout(soundTimeout);
                sound_1.default.play(document.getElementById("intro_music"));
            }, 800);
            this._timeout = window.setTimeout(() => {
                clearTimeout(this._timeout);
                this._timeout = null;
                this._stateManager.pop();
            }, 5200);
        }
    }
    loaded(timeStep) {
        this._hud.load();
        this.startGame(timeStep);
    }
    startGame(timeStep) {
        //detect key press
        if (control_1.default.active !== null) {
            this._ghostManager.startMove();
            this._stateManager.swap("ongoing");
            this.eraseReadyText();
        }
    }
    ongoing(timeStep) {
        this._pacman.update(timeStep);
        this._ghostManager.update(timeStep);
        this._foodManager.update(timeStep);
    }
    ghostKilled(timeStep) {
        //brief pause on ghost kill
        if (this._timeout === null) {
            this._pacman.stopAnimation(0);
            this._timeout = window.setTimeout(() => {
                this._stateManager.swap("ongoing");
                clearTimeout(this._timeout);
                this._timeout = null;
            }, 400);
        }
        this.ghosts.forEach(ghost => {
            //only retreating ghosts can move during pause period
            if (ghost !== this._lastGhostKilled && ghost.state === "retreat") {
                ghost.update(timeStep);
            }
        });
    }
    //play pacman death animation
    pacmanDying(timeStep) {
        if (this._timeout === null && !this._pacman.isDying) {
            this._pacman.stopAnimation(2);
            sound_1.default.reset();
            this._timeout = window.setTimeout(() => {
                this._pacman.playDeathAnimation();
                let soundTimeout = setTimeout(() => {
                    clearTimeout(soundTimeout);
                    sound_1.default.play(document.getElementById("death"));
                }, 2000);
                clearTimeout(this._timeout);
                this._timeout = null;
            }, 1300);
        }
    }
    //start a new game
    restarting(timeStep) {
        if (this._timeout === null) {
            sound_1.default.reset();
            this._timeout = window.setTimeout(() => {
                clearTimeout(this._timeout);
                this._timeout = null;
                this.destroy();
                this.initialize();
            }, 3000);
        }
    }
    //load next round
    reloading(timeStep) {
        if (this._interval === null && this._timeout === null) {
            this._pacman.stopAnimation(2);
            sound_1.default.reset();
            //blink maze border
            this._interval = window.setInterval(() => {
                this._maze.blink();
            }, 400);
            this._timeout = window.setTimeout(() => {
                clearInterval(this._interval);
                this._interval = null;
                clearTimeout(this._timeout);
                this._timeout = null;
                this.reset();
                //repopulate food
                this._foodManager.putBeans();
            }, 3000);
        }
    }
    //reset current round
    resetting(timeStep) {
        if (this._timeout === null) {
            sound_1.default.reset();
            this._timeout = window.setTimeout(() => {
                clearTimeout(this._timeout);
                this._timeout = null;
                this.reset();
            }, 3000);
        }
    }
    update(timeStep) {
        this._stateManager.update(timeStep);
        //auto dispose pop ups
        this._popUps.forEach(popUp => {
            popUp.update();
        });
    }
    drawReadyText() {
        canvas_1.default.background.drawImage(this._tile, this._cropWidth * 5, this._cropWidth * 9, this._cropWidth * 3, this._cropWidth, grid_1.default.nodeSize * 11.8, grid_1.default.nodeSize * 16, grid_1.default.nodeSize * 5, grid_1.default.nodeSize * 2);
    }
    eraseReadyText() {
        canvas_1.default.background.clearRect(grid_1.default.nodeSize * 11.8, grid_1.default.nodeSize * 16.5, grid_1.default.nodeSize * 5, grid_1.default.nodeSize * 2);
    }
    drawPopUps() {
        this._popUps.forEach(popUp => {
            popUp.draw();
        });
    }
    draw() {
        this._ctx.clearRect(0, 0, grid_1.default.width, grid_1.default.height);
        this._foodManager.draw();
        this.drawPopUps();
        if (!new Set(["restarting", "resetting"]).has(this.state)) {
            this._pacman.draw();
        }
        if (!this._pacman.isDying && this.state !== "resetting") {
            this._ghostManager.draw();
        }
    }
}
exports.default = GameManager;
//# sourceMappingURL=gameManager.js.map