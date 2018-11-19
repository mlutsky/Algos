var _ = require("lodash");

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  getParentIndex(currentIndex) {
    // return Math.floor((currentIndex - 1)/2);
    return Math.floor((currentIndex)/2);
  }

  // inserts a new node with a value and priority into the correct place in the queue
  insert(value, priority) {
    let newNode = new Node(value, priority);
    this.heap.push(newNode);
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);
    // console.log(`parent index: ${parentIndex}`);
    // console.log(`current index priority: ${this.heap[currentIndex].priority}`);

    // this.heap[parentIndex] ? console.log(`parent index priority: ${this.heap[parentIndex].priority}`) : _.noop();

    while(this.heap[parentIndex] && (this.heap[currentIndex].priority < this.heap[parentIndex].priority)) {
      // console.log(`current index priority: ${this.heap[currentIndex].priority}`);
      // console.log(`parent index priority: ${this.heap[parentIndex].priority}`);

      let temp = this.heap[parentIndex];
      this.heap[parentIndex] = newNode;
      this.heap[currentIndex] = temp;
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  // removes an element from the priority queue and re-adjusts the priority
  remove() {
    if(this.heap.length < 3) {
      const poppedNode = this.heap.pop();
      this.heap[0] = null;
      return poppedNode;
    }

    const returnNode = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIndex = 1;
    let [left, right] = [2*currentIndex, 2*currentIndex + 1];
    // need to check that these even exist here
    let childIndex = this.heap[left].priority < this.heap[right].priority ? left : right;
    console.log(`child index: ${childIndex}`);

    while(this.heap[childIndex] && this.heap[currentIndex].priority > this.heap[childIndex].priority) {
      // console.log(`current index priority: ${this.heap[currentIndex].priority}`);
      // console.log(`child index priority: ${this.heap[childIndex].priority}`);
      const temp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[childIndex];
      this.heap[childIndex] = temp;
      currentIndex = childIndex;
      [left, right] = [2*currentIndex, 2*currentIndex + 1];

      if(this.heap[left] && this.heap[right]) {
        childIndex = this.heap[left].priority < this.heap[right].priority ? left : right;
      } else if (this.heap[left] && !this.heap[right]) {
        childIndex = left;
      } else if (!this.heap[left] && this.heap[right]) {
        childIndex = right;
      } else {
        break;
      }
      // console.log(`current index priority 2: ${this.heap[currentIndex].priority}`);
      // console.log(`child index priority 2: ${this.heap[childIndex].priority}`);
    }
    return returnNode;
  }
}

// test cases
let queue = new PriorityQueue;
queue.insert(9,9);
queue.insert(3,5);
queue.insert(1,7);
queue.insert(2,8);
queue.insert(17,4);
queue.insert(36,3);
queue.insert(25,6);
queue.insert(100,1);
queue.insert(19,2);
console.log(queue.heap);
console.log(queue.remove());
console.log(queue.heap);