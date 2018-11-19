class Queue {
  constructor(head = null) {
    this.elements = [head];
  }

  // add an element to the queue
  enqueue(newElement) {
    this.elements.push(newElement);
  }

  // remove an element from the queue
  dequeue() {
    return this.elements.shift();
  }

  // return the value of the next element in the queue
  peek() {
    return this.elements[0];
  }
}

// Setup
let q = new Queue(1);
q.enqueue(2);
q.enqueue(3);

// Test peek
// Should be 1
console.log(q.peek());

//Test dequeue
//Should be 1
console.log(q.dequeue());

//Test enqueue
q.enqueue(4);
//Should be 2
console.log(q.dequeue());
//Should be 3
console.log(q.dequeue());
//Should be 4
console.log(q.dequeue());
q.enqueue(5);
//Should be 5
console.log(q.peek());

