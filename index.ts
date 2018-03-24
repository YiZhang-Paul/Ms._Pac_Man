// import Game from "_ts/object/game";

// Game.initialize();

// if(Game.state === "initialized") {

//     Game.run();
// }

import PriorityQueue from "_ts/class/priorityQueue";

let queue = new PriorityQueue<string>();

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