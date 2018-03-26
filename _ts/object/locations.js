System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                //destination for all retreating ghosts
                retreat: {
                    row: 14,
                    column: 14
                },
                door: {
                    row: 13,
                    column: [14, 15],
                },
                /**
                 * spawn locations
                 */
                pacman: {
                    row: 23,
                    column: 14,
                    direction: "right"
                },
                blinky: {
                    row: 11,
                    column: 14,
                    direction: "left"
                },
                pinky: {
                    row: 14,
                    column: 14,
                    direction: "down"
                },
                inky: {
                    row: 14,
                    column: 12,
                    direction: "up"
                },
                sue: {
                    row: 14,
                    column: 16,
                    direction: "up"
                },
            });
        }
    };
});
//# sourceMappingURL=locations.js.map