import Game from "_ts/object/game";

Game.initialize();

if(Game.state === "initialized") {

    Game.run();
}