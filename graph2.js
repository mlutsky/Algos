var _ = require("lodash");
var mpq = require("./minpriorityqueue.js");

class Node {
  constructor(value) {
    this.value = value;
    this.edges = [];
    this.visited = false;
  }
}

class Edge {
  constructor(value = null, start, end) {
    this.value = value;
    this.start = start;
    this.end = end;
  }
}

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.nodeNames = [];
  }

  insertNode(value) {
    const newNode = new Node(value);
    this.nodes.push(newNode);
    return newNode;
  }

  deleteNode(nodeValue) {
    const nodeToDelete = _.find(this.nodes, { value: nodeValue });
    if (nodeToDelete) {
      this.nodes.splice(_.findIndex(this.nodes, { value: nodeValue }), 1);
      return nodeToDelete;
    }
  }

  insertEdge(value, startNodeValue, endNodeValue) {
    let startNode = _.find(this.nodes, { value: startNodeValue });
    startNode = startNode ? startNode : this.insertNode(startNodeValue);

    let endNode = _.find(this.nodes, { value: endNodeValue });
    endNode = endNode ? endNode : this.insertNode(endNodeValue);

    const newEdge = new Edge(value, startNode, endNode);
    [this, startNode, endNode].map(object => object.edges.push(newEdge));

    return newEdge;
  }

  deleteEdge(value, startNodeValue, endNodeValue) {
    // remove from the main object
    const start = _.find(this.nodes, { value: startNodeValue });
    const end = _.find(this.nodes, { value: endNodeValue });
    [this, start, end].map(
      object =>
        object.edges.splice(_.findIndex(object.edges, { value, start, end })),
      1
    );
  }

  setNodeNames(nodeNames) {
    this.nodeNames = nodeNames;
  }

  getAdjacencyList() {
    return this.edges.map(edge => [edge.start.value, edge.end.value]);
  }

  getAdjacencyListNames() {
    return this.edges.map(edge => [
      this.nodeNames[edge.start.value],
      this.nodeNames[edge.end.value]
    ]);
  }

  getAdjacencyMatrix() {
    const adjacencyMatrix = [];
    this.nodes.map(outerNode => {
      const row = [];
      this.nodes.map(innerNode => {
        const edge = _.find(innerNode.edges, {
          start: innerNode,
          end: outerNode
        });
        edge ? (row[innerNode.value] = edge.value) : _.noop();
      });
      adjacencyMatrix[outerNode.value] = row;
    });
    return adjacencyMatrix;
  }

  findNode(value) {
    return _.find(this.nodes, { value });
  }

  resetVisited() {
    this.nodes.map(node => {
      node.visited = false;
    });
  }

  dfsRecursive(value, startNodeValue) {
    const startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.dfsHelperRecursive(value, startNode);
  }

  dfsNamesRecursive(value, startNodeValue) {
    const result = this.dfsRecursive(value, startNodeValue);
    return result
      ? this.dfsRecursive(value, startNodeValue).map(
          node => this.nodeNames[node]
        )
      : false;
  }

  dfsHelperRecursive(value, startNode, retList = []) {
    retList.push(startNode.value);
    startNode.visited = true;

    if (startNode.value === value) {
      return retList;
    } else {
      // note - have to return if any of these are true, not just one
      for (let edge of startNode.edges) {
        if (!edge.end.visited) {
          const result = this.dfsHelperRecursive(value, edge.end, retList);
          if (result) {
            return result;
          }
        }
      }
      return false;
    }
  }

  dfsIterative(value, startNodeValue) {
    const startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.dfsHelperIterative(value, startNode);
  }

  dfsNamesIterative(value, startNodeValue) {
    const result = this.dfsIterative(value, startNodeValue);
    return result ? result.map(node => this.nodeNames[node]) : false;
  }

  dfsHelperIterative(value, startNode) {
    const retList = [];
    const stack = [startNode];

    while (stack.length > 0) {
      const node = stack.pop();
      retList.push(node.value);
      node.visited = true;

      if (node.value === value) {
        return retList;
      } else {
        const toPush = [];
        for (let edge of node.edges) {
          if (!edge.end.visited) {
            toPush.unshift(edge.end);
          }
        }
        stack.push(...toPush);
      }
    }

    return false;
  }

  bfsIterative(value, startNodeValue) {
    const startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.bfsIterativeHelper(value, startNode);
  }

  bfsNamesIterative(value, startNodeValue) {
    const result = this.bfsIterative(value, startNodeValue);
    return result ? result.map(node => this.nodeNames[node]) : false;
  }

  bfsIterativeHelper(value, startNode) {
    const retList = [];
    const queue = [startNode];

    while (queue.length > 0) {
      const node = queue.pop();
      node.visited = true;
      retList.push(node.value);

      if (node.value === value) {
        return retList;
      } else {
        for (let edge of node.edges) {
          if (!edge.end.visited) {
            queue.unshift(edge.end);
          }
        }
      }
    }
    return false;
  }

  djikstra(value, startNodeValue) {
    const priorityQueue = new mpq.PriorityQueue();
    const startNode = this.findNode(startNodeValue);
    const traversal = [];
    const distances = this.nodes.map(node => Infinity);
    distances[startNodeValue] = 0;

    priorityQueue.insert(startNode, 0);

    while (priorityQueue.heap.length > 1) {
      const node = priorityQueue.remove();
      traversal.push(node.value.value);

      if (node.value.value === value) {
        return node.priority;
      }

      for (let edge of node.value.edges) {
        if (node.priority + edge.value < distances[edge.end.value]) {
          priorityQueue.insert(edge.end, node.priority + edge.value);
          distances[edge.end.value] = node.priority + edge.value;
        }
      }
    }
  }

  djikstra2(value, startNodeValue) {
    let priorityQueue = new mpq.PriorityQueue();
    const startNode = this.findNode(startNodeValue);
    const traversal = [];
    const distances = [];
    this.nodes.map(node => {
      distances[node.value] = Infinity;
    });
    distances[startNodeValue] = 0;

    priorityQueue.insert(startNode, 0);

    while (priorityQueue.heap.length > 1) {
      const node = priorityQueue.remove();
      traversal.push(node.value);

      if (node.value.value === value) {
        return node.priority;
      } else {
        for (let edge of node.value.edges) {
          if (node.priority + edge.value < distances[edge.end.value]) {
            priorityQueue.insert(edge.end, node.priority + edge.value);
            distances[edge.end.value] = node.priority + edge.value;
          }
        }
      }
    }
  }
}

// create a test graph
let g = new Graph();

// set node names
g.setNodeNames([
  "Mountain View",
  "San Francisco",
  "London",
  "Shanghai",
  "Berlin",
  "Sao Paolo",
  "Bangalore"
]);

// insert nodes
g.insertEdge(51, 0, 1);
g.insertEdge(51, 1, 0);
g.insertEdge(9950, 0, 3);
g.insertEdge(9950, 3, 0);
g.insertEdge(10375, 0, 5);
g.insertEdge(10375, 5, 0);
g.insertEdge(9900, 1, 3);
g.insertEdge(9900, 3, 1);
g.insertEdge(9130, 1, 4);
g.insertEdge(9130, 4, 1);
g.insertEdge(9217, 2, 3);
g.insertEdge(9217, 3, 2);
g.insertEdge(932, 2, 4);
g.insertEdge(932, 4, 2);
g.insertEdge(9471, 2, 5);
g.insertEdge(9471, 5, 2);

// test adjacency methods
console.log(g.getAdjacencyList());
console.log(g.getAdjacencyListNames());
console.log(g.getAdjacencyMatrix());

// test search methods
console.log(g.dfsNamesRecursive(5, 2));
console.log(g.dfsNamesIterative(5, 2));
console.log(g.bfsNamesIterative(5, 2));

// test pathfinding
// 51
console.log(g.djikstra2(1, 0));

// 0-3-2: 19167, 0-1-4-2: 10113
console.log(g.djikstra2(2, 0));

// 0-3-2: 19167, 0-1-4-2: 10113
console.log(g.djikstra2(2, 0));
