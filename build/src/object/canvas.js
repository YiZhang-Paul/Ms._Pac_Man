"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //in-game canvases
    background: null,
    food: null,
    fruit: null,
    player: null,
    interface: null,
    popUp: null,
    create(width, height, zIndex) {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.zIndex = String(zIndex);
        //attach canvas and return rendering context
        document.getElementById("board").appendChild(canvas);
        return canvas.getContext("2d");
    },
};
//# sourceMappingURL=canvas.js.map