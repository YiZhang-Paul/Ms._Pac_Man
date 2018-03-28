export default {
    //in-game canvases
    background : null,
    food       : null,
    fruit      : null,
    player     : null,
    interface  : null,
    popUp      : null,

    create(width: number, height: number, zIndex: number): CanvasRenderingContext2D {

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