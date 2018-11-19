var _ = require("lodash");

class Node {
  constructor(value) {
    this.value = value;
    this.edges = [];
    this.visited = false;
  }
}

class Edge {
  constructor(value = null, start, end) {
    // make sure to give edges a value if the graph is weighted
    this.value = value;
    this.start = start;
    this.end = end;
  }
}

class Graph {
  constructor(nodes = null, edges = null) {
    this.nodes = nodes ? nodes : [];
    this.edges = edges ? edges : [];
    this.nodeNames = [];
  }

  // insert node
  insertNode(nodeValue) {
    const newNode = new Node(nodeValue);
    this.nodes.push(newNode);
    return newNode;
  }

  // delete node
  deleteNode(nodeValue) {
    const nodeToDelete = _.find(this.nodes, {value: nodeValue });
    this.nodes.splice(_.indexOf(this.nodes, nodeToDelete), 1);
    return nodeToDelete;
  }

  // insert edge
  insertEdge(value = null, startNodeValue, endNodeValue) {
    let startNode = _.find(this.nodes, { value: startNodeValue });
    startNode = startNode ? startNode : this.insertNode(startNodeValue);
    //console.log(startNode);
    let endNode = _.find(this.nodes, { value: endNodeValue });
    endNode = endNode ? endNode : this.insertNode(endNodeValue);
    //console.log(endNode);
    const newEdge = new Edge(value, startNode, endNode);

    endNode.edges.push(newEdge);
    startNode.edges.push(newEdge);
    this.edges.push(newEdge);
  }

  // delete edge
  deleteEdge(value, startNodeValue, endNodeValue) {
    const startNode = _.find(this.nodes, { value: startNodeValue });
    const endNode = _.find(this.nodes, { value: endNodeValue });

    startNode.edges = _.filter(startNode.edges, edge => edge.end !== endNode);
    endNode.edges = _.filter(endNode.edges, edge => edge.start !== startNode);
    this.edges = _.filter(
      this.edges,
      edge =>
        edge.end !== endNode || edge.start !== startNode || edge.value !== value
    );
  }

  // set node names
  setNodeNames(nodeNames) {
    this.nodeNames = nodeNames;
  }

  // get adjacency list (array of pairs of node values with an edge between them)
  getAdjacencyList() {
    return this.edges.map(edge => [edge.start.value, edge.end.value]);
  }

  // get adjacency list (array of pairs of node values with an edge between them)
  getAdjacencyListNames() {
    return this.edges.map(edge => [this.nodeNames[edge.start.value], this.nodeNames[edge.end.value]]);
  }

  // get adjacency matrix
  getAdjacencyMatrix() {
    let adjacencyMatrix = [];
    this.nodes.map(outerNode => {
      let row = [];
      this.nodes.map(innerNode => {
        const edge = _.find(innerNode.edges, {
          start: innerNode,
          end: outerNode
        });
        if (edge) {
          row[innerNode.value] = edge.value;
        }
      });
      adjacencyMatrix[outerNode.value] = row;
    });
    return adjacencyMatrix;
  }

  // find node
  findNode(value) {
    return _.find(this.nodes, { value: value });
  }

  // reset visited nodes
  resetVisited() {
    this.nodes.map(node => {
      node.visited = false;
    });
  }

  // DFS helper function (performs recursion)
  dfsHelperRecursive(value, startNode, retList = []) {
    retList.push(startNode.value);
    startNode.visited = true;
    if (startNode.value === value) {
      return retList;
    } else {
      startNode.edges.map(edge => {
        if (!edge.end.visited) {
          // edge.end.visited = true;
          return this.dfsHelperRecursive(value, edge.end, retList)
        }
      });
      return retList;
    }
  }

  // DFS - returns an array of visited nodes
  dfsRecursive(value, startNodeValue) {
    let startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.dfsHelperRecursive(value, startNode);
  }

  dfsNamesRecursive(value, startNodeValue) {
    return this.dfsRecursive(value, startNodeValue).map(node => this.nodeNames[node]);
  }

  // DFS helper function (iterative)
  dfsHelperIterative(value, startNode) {
    let stack = [startNode];
    let retList = [];
    while(stack.length > 0) {
      let node = stack.pop();
      // console.log(this.nodeNames[node.value]);
      if(!node.visited) {
        retList.push(node.value);
        node.visited = true;
      }
      // console.log(retList);

      if (node.value === value) {
        return retList;
      } else {
        if (!_.isEmpty(node.edges)){
          const pushList = _.filter(node.edges, edge => !edge.end.visited).map(edge => edge.end);
          // console.log(pushList);
          if (pushList.length > 0) {
            stack.push(...pushList.reverse());
          }
          // console.log(stack);
        }
      }
    }
    return false;
  }

  // DFS - returns an array of visited nodes
  dfsIterative(value, startNodeValue) {
    let startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.dfsHelperIterative(value, startNode);
  }

  dfsNamesIterative(value, startNodeValue) {
    const result = this.dfsIterative(value, startNodeValue)
    return result ? result.map(node => this.nodeNames[node]) : false;
  }

  // BFS

  // BFS helper function (performs recursion)
  bfsHelperIterative(value, startNode) {
    let queue = [startNode];
    let retList = [];
    while(queue.length > 0) {
      let node = queue.pop();
      // console.log(this.nodeNames[node.value]);
      if (!node.visited) {
        node.visited = true;
        retList.push(node.value);
      }
      if (node.value === value) {
        return retList;
      } else {
        _.filter(node.edges, edge => !edge.end.visited).map(edge => {
          queue.unshift(edge.end);
        });
      }
    }
    return retList;
  }

  // BFS - returns an array of visited nodes
  bfsIterative(value, startNodeValue) {
    let startNode = this.findNode(startNodeValue);
    this.resetVisited();
    return this.bfsHelperIterative(value, startNode);
  }

  bfsNamesIterative(value, startNodeValue) {
    return this.bfsIterative(value, startNodeValue).map(node => this.nodeNames[node]);
  }

  // Djikstra's algorithm
  djikstra(startNodeValue, endNodeValue) {

    // is there a better way to implement the min priority queue here?
    let distances = this.nodes.map(node => ({
      value: node.value,
      distance: node.value === startNodeValue ? 0 : Infinity,
    }));
    distances = _.sortBy(distances, ['distance']);

    while (_.filter(distances, distance => distance.distance < Infinity).length > 0) {
      const distanceNode = distances.shift();
      const node = this.findNode(distanceNode.value);
      const curDistance = distanceNode.distance;

      if(node.value === endNodeValue) {
        return curDistance;
      }

      _.filter(node.edges, edge => edge.start === node).map(edge => {
        const nextNode = _.find(distances, { value: edge.end.value });
        if (nextNode && (curDistance + edge.value < nextNode.distance)) {
          nextNode.distance = curDistance + edge.value;
        }
      });
      distances = _.sortBy(distances, ['distance']);
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
console.log(g.dfsNamesRecursive(6,2));
console.log(g.dfsNamesIterative(6,2));
console.log(g.bfsNamesIterative(6,2));

// test pathfinding
// 51
console.log(g.djikstra(0,1));

// 0-3-2: 19167, 0-1-4-2: 10113
console.log(g.djikstra(0,2));

// 0-3-2: 19167, 0-1-4-2: 10113
// console.log(g.djikstra(0,2));