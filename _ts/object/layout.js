System.register(["_ts/object/monitor"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var monitor_1;
    return {
        setters: [
            function (monitor_1_1) {
                monitor_1 = monitor_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                _rows: this._layers[0].length,
                _columns: this._layers[0][0].length,
                _nodeSize: null,
                _width: null,
                _height: null,
                _layers: [
                    [
                        //logic layer
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
                    ],
                    [
                        //meta layer
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "l" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "l" }, { w: "w" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ b: "p" }, { b: "p" }, { b: "p" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { b: "p" }, { b: "p" }, { b: "p" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { d: "d" }, { d: "d" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { b: "b" }, { b: "b" }, { b: "s" }, { b: "s" }, { b: "b" }, { b: "b" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { b: "p" }, { b: "p" }, { b: "p" }, { w: "w" }, { c: "b" }, { c: "b" }, { c: "b" }, { c: "b" }, { c: "b" }, { c: "b" }, { w: "w" }, { b: "p" }, { b: "p" }, { b: "p" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { b: "b" }, { b: "b" }, { b: "b" }, { b: "b" }, { b: "b" }, { b: "b" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ b: "p" }, { b: "p" }, { b: "p" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { b: "p" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { b: "p" }, { b: "p" }, { b: "p" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { b: "p" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ b: "b" }, { b: "b" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { b: "b" }, { b: "b" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "l" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "l" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { f: "s" }, { w: "w" }],
                        [{ w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }, { w: "w" }]
                    ]
                ],
                get rows() {
                    return this._rows;
                },
                get columns() {
                    return this._columns;
                },
                get nodeSize() {
                    return this._nodeSize;
                },
                get width() {
                    return this._width;
                },
                get height() {
                    return this._height;
                },
                get layers() {
                    return this._layers;
                },
                //calculate node size base on monitor dimensions
                setNodeSize() {
                    this._nodeSize = monitor_1.default.width > monitor_1.default.height ?
                        Math.floor(monitor_1.default.height * 0.8 / this._rows) :
                        Math.floor(monitor_1.default.width * 0.8 / this._columns);
                },
                setDimension() {
                    this._width = this._nodeSize * this._columns;
                    this._height = this._nodeSize * this._rows;
                },
                initialize() {
                    this.setNodeSize();
                    this.setDimension();
                },
                //check if given row and column are within the grid boundaries
                exists(row, column) {
                    if (this._layers[0][row] === undefined) {
                        return false;
                    }
                    return this._layers[0][row][column] !== undefined;
                },
                //retrieve objects on logic layer
                getObject(row, column) {
                    if (!this.exists(row, column)) {
                        return null;
                    }
                    return this._layers[0][row][column];
                },
                //retrieve metadata on meta layer
                getMetadata(row, column) {
                    if (!this.exists(row, column)) {
                        return null;
                    }
                    return this._layers[1][row][column];
                },
                //register objects on logic layer
                setObject(row, column, object) {
                    if (this.exists(row, column)) {
                        this._layers[0][row][column] = object;
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=layout.js.map