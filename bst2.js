// 5

var _ = require("lodash");

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  insert(start = this.root, value) {
    if(start.value === value) {
      return;
    }

    if(value < start.value) {
      start.left ? this.insert(start.left, value) : start.left = new Node(value);
    } else {
      start.right ? this.insert(start.right, value) : start.right = new Node(value);
    }
  }

  search(start = this.root, value) {
    if(start) {
      if(start.value === value) {
        return true;
      } else {
        return value < start.value ? this.search(start.left, value) : this.search(start.right, value);
      }
    }
    return false;
  }
}

let tree = new BST(4);
tree.insert(tree.root, 1);
tree.insert(tree.root, 2);
tree.insert(tree.root, 3);
tree.insert(tree.root, 5);

console.log(tree.search(tree.root, 2));
console.log(tree.search(tree.root, 5));
console.log(tree.search(tree.root, 60));

tree.insert(tree.root, 60);
console.log(tree.search(tree.root, 60));