class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  // add newElement to the end of the linked list
  append(newElement) {
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newElement;
    } else {
      this.head = newElement;
    }
  }

  // return the value of an element in a particular position
  getPosition(position) {
    if (this.head) {
      let current = this.head;
      for (let i = 1; i < position; i++) {
        current = current.next;
      }
      return current;
    } else {
      return null;
    }
  }

  // insert a new element at the specified position
  insert(newElement, position) {
    if (position === 1) {
      newElement.next = this.head;
      this.head = newElement;
    } else {
      let previousElement = this.getPosition(position - 1);
      newElement.next = previousElement.next;
      previousElement.next = newElement;
    }
  }

  // delete the element at the specified position
  delete(position) {
    if (position === 1) {
      this.head = this.head.next;
    } else {
      let previousElement = this.getPosition(position - 1);
      let nextElement = previousElement.next.next;
      previousElement.next = nextElement;
    }
  }

  // reverse the order of the linked list iteratively
  reverseIterative() {
    let previous = null;
    let current = this.head;
    // watch out, has to be while current or loop will go too far
    while (current) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  // reverse the order of the linked list recursively
  reverseRecursive(current = this.head, previous = null) {
    // stop condition
    if (!current.next) {
      current.next = previous;
      this.head = current;
      return;
    }
    let next = current.next;
    current.next = previous;
    this.reverseRecursive(next, current);
  }
}

// create test nodes
let e1 = new Node(1);
let e2 = new Node(2);
let e3 = new Node(3);
let e4 = new Node(4);

// create new linkedlist
let ll = new LinkedList(e1);
ll.append(e2);
ll.append(e3);
ll.insert(e4, 2);
ll.delete(3);

// test getPosition (should print 1,4,3)
console.log(ll.getPosition(1).value);
console.log(ll.getPosition(2).value);
console.log(ll.getPosition(3).value);

ll.reverseIterative();

// test getPosition (should print 3,4,1)
console.log(ll.getPosition(1).value);
console.log(ll.getPosition(2).value);
console.log(ll.getPosition(3).value);

ll.reverseRecursive();

// test getPosition (should print 1,4,3)
console.log(ll.getPosition(1).value);
console.log(ll.getPosition(2).value);
console.log(ll.getPosition(3).value);
