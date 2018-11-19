var _ = require("lodash");

class Heap {
  constructor() {
    this.heap = [null];
  }

  getParentIndex(currentIndex) {
    return Math.floor(currentIndex / 2);
  }

  getChildIndex(currentIndex) {
    let [left, right] = [2 * currentIndex, 2 * currentIndex + 1];
    let childIndex;
    if (this.heap[left] && this.heap[right]) {
      childIndex = this.heap[left] > this.heap[right] ? left : right;
    } else if (!this.heap[left] && this.heap[right]) {
      childIndex = right;
    } else if (this.heap[left] && !this.heap[right]) {
      childIndex = left;
    }

    return childIndex;
  }

  swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  insert(value) {
    console.log(this.heap);
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);

    while (
      this.heap[parentIndex] &&
      this.heap[currentIndex] > this.heap[parentIndex]
    ) {
      console.log(`parent: ${this.heap[parentIndex]}`);
      console.log(`current: ${this.heap[currentIndex]}`);

      this.swap(this.heap, parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  remove() {
    if (this.heap.length < 3) {
      let returnNode = this.heap.pop();
      this.heap[0] = null;
      return returnNode;
    }

    let returnNode = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let childIndex = this.getChildIndex(currentIndex);
    while (
      this.heap[childIndex] &&
      this.heap[childIndex] > this.heap[currentIndex]
    ) {
      this.swap(this.heap, childIndex, currentIndex);
      currentIndex = childIndex;
      childIndex = this.getChildIndex(currentIndex);
    }

    return returnNode;
  }

  populate(array) {
    array.map(element => this.insert(element));
  }

  sort() {
    const sorted = [];

    // watch out for this, heap length changes as you remove items
    const max = this.heap.length;
    for (let i = 1; i < max; i++) {
      sorted.push(this.remove());
    }

    return sorted;
  }
}

let heap = new Heap();

heap.populate([6, 5, 3, 1, 8, 7, 2, 4]);

console.log(heap.heap);

console.log(heap.sort());

console.log(heap.heap);
