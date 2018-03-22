System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                roundTo(value, decimal) {
                    const power = Math.pow(10, decimal);
                    return Math.round(value * power) / power;
                },
                lastElement(array) {
                    if (array.length === 0) {
                        return null;
                    }
                    return array.slice(-1)[0];
                },
                removeElement(array, element) {
                    const index = array.indexOf(element);
                    if (index !== -1) {
                        array.splice(index, 1);
                    }
                },
                getRandom(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
            });
        }
    };
});
//# sourceMappingURL=utility.js.map