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

  insert(start = this.root, newValue) {
    while (start.value != newValue) {
      if (newValue < start.value) {
        if (start.left) {
          return this.insert(start.left, newValue);
        } else {
          start.left = new Node(newValue);
        }
      } else {
        if (start.right) {
          return this.insert(start.right, newValue);
        } else {
          start.right = new Node(newValue);
        }
      }
    }
  }

  search(start = this.root, value) {
    if (start.value === value) {
      return true;
    } else if (value < start.value) {
      return start.left ? this.search(start.left, value) : false;
    } else {
      return start.right ? this.search(start.right, value) : false;
    }
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