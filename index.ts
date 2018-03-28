import Game from "src/object/game";

Game.initialize();

if(Game.state === "initialized") {

    Game.run();
}