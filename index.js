// import Game from "_ts/object/game";
System.register(["_ts/class/priorityQueue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var priorityQueue_1, queue;
    return {
        setters: [
            function (priorityQueue_1_1) {
                priorityQueue_1 = priorityQueue_1_1;
            }
        ],
        execute: function () {// import Game from "_ts/object/game";
            queue = new priorityQueue_1.default();
            queue.enqueue(3, "jim");
            queue.enqueue(9, "hi");
            queue.enqueue(1, "hiya");
            queue.enqueue(10, "yo");
            queue.enqueue(2, "gogo");
            queue.enqueue(1, "hey");
            queue.enqueue(8, "yes");
            console.log(queue);
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
            console.log(queue.dequeue());
        }
    };
});
//# sourceMappingURL=index.js.map