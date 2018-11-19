// 5

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

  append(newElement) {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newElement;
  }

  getPosition(position) {
    let current = this.head;
    for(let i = 1; i < position; i++) {
      current = current.next;
    }
    return current;
  }

  insert(newElement, position) {
    if (position === 1) {
      newElement.next = this.head;
      this.head = newElement;
    } else {
      let previous = this.getPosition(position - 1);
      newElement.next = previous.next;
      previous.next = newElement;
    }
  }

  delete(position) {
    if (position === 1) {
       this.head = this.head.next;
    } else {
      let previous = this.getPosition(position - 1);
      previous.next = previous.next.next;
    }
  }

  reverseIterative() {
    let previous = null;
    let current = this.head;
    while (current) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  reverseRecursive(previous = null, current = this.head) {
    if(!current.next) {
      current.next = previous;
      this.head = current;
    } else {
      let next = current.next;
      current.next = previous;
      this.reverseRecursive(current, next);
    }
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
