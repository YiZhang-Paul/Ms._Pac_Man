System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Direction;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["UP"] = 0] = "UP";
                Direction[Direction["LEFT"] = 1] = "LEFT";
                Direction[Direction["DOWN"] = 2] = "DOWN";
                Direction[Direction["RIGHT"] = 3] = "RIGHT";
            })(Direction || (Direction = {}));
            exports_1("Direction", Direction);
            ;
        }
    };
});
//# sourceMappingURL=direction.js.map