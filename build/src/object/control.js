System.register(["src/object/utility"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utility_1;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                pressedKeys: new Array(),
                /**
                 * control keys
                 */
                //move up
                W: 87,
                UP: 38,
                //move down
                S: 83,
                DOWN: 40,
                //move left
                A: 65,
                LEFT: 37,
                //move right
                D: 68,
                RIGHT: 39,
                //most recent key pressed
                get active() {
                    return utility_1.default.lastElement(this.pressedKeys);
                },
                isPressed(key) {
                    return this.pressedKeys.includes(key);
                },
                add(key) {
                    if (!this.isPressed(key)) {
                        this.pressedKeys.push(key);
                    }
                },
                remove(key) {
                    if (this.isPressed(key)) {
                        utility_1.default.removeElement(this.pressedKeys, key);
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=control.js.map