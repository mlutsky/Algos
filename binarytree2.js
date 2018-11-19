var _ = require("lodash");

// 5

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  search(start = this.root, target) {
    if(start) {
      if(start.value === target) {
        return true;
      } else {
        return this.search(start.left, target) || this.search(start.right, target);
      }
    }
    return false;
  }

  bfs(start = this.root, target) {
    let queue = [start];
    while(queue.length) {
      let node = queue.pop();
      if(node.value === target) {
        return true;
      } else {
        node.left ? queue.unshift(node.left) : _.noop();
        node.right ? queue.unshift(node.right) : _.noop();
      }
    }
    return false;
  }

  print(start = this.root, traversal = "") {
    if(start) {
      traversal += start.value;
      traversal = this.print(start.left, traversal);
      traversal = this.print(start.right, traversal);
    }
    return traversal;
  }
}

let tree = new BinaryTree(1);
tree.root.left = new Node(2);
tree.root.right = new Node(3);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(5);

console.log(tree.print());
console.log(tree.search(tree.root, 4));
console.log(tree.search(tree.root, 6));
console.log(tree.bfs(tree.root, 4));
console.log(tree.bfs(tree.root, 6));
