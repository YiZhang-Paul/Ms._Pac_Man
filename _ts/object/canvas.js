System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                //in-game canvases
                background: null,
                food: null,
                fruit: null,
                player: null,
                userInterface: null,
                scorePopUp: null,
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
            });
        }
    };
});
//# sourceMappingURL=canvas.js.map