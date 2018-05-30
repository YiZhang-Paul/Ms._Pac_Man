"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../src/object/game");
game_1.default.initialize();
if (game_1.default.state === "initialized") {
    game_1.default.run();
}
//# sourceMappingURL=index.js.map