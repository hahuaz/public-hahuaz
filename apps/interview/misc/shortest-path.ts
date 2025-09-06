// for unweighted edges or static edges, BREADTH FIRST SEARCH (BFS) is used to find the shortest path
// Time Complexity: O(V + E) where V is number of vertices and E is number of edges

// It starts from a chosen start node.
// Visits all its neighbors first (breadth), before going deeper.
// Uses a queue to keep track of which node to visit next.
// When it visits a node, marks it as visited and records its parent node to reconstruct the path later.
// Stops when it reaches the destination node or when all reachable nodes have been visited.

// there can be multiple type of inputs to represent a graph in questions:
// 1. edges list: [[0,1], [0,2], [1,2], [1,3], ...] where each pair [u,v] represents an undirected edge between node u and v. you need to build adjacency list from this first
// 2. adjacency list: [[1,2], [0,2,3], [0,1], [1], ...] where index represents node and value at that index is a list of its neighbors. For example, node 1 has neighbors 0, 2, and 3

function bfsShortestPath(
  edges: number[][],
  start: number,
  destination: number
): number[] {
  // since number in the edges[][] is node value, max + 1 will give us number of nodes
  const V = Math.max(...edges.flat()) + 1;

  // build adjacency list
  const adj: number[][] = Array(V)
    .fill(false)
    .map(() => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u); // undirected
  }

  // BFS initialization
  const queue: number[] = [start];
  const visited: boolean[] = Array(V).fill(false);
  const parent: number[] = Array(V).fill(-1);

  visited[start] = true;

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (node === destination) break;

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        parent[neighbor] = node;
        queue.push(neighbor);
      }
    }
  }

  // reconstruct path from start to destination
  const destinationToStartPath: number[] = [];
  let cur = destination;
  while (cur !== -1) {
    destinationToStartPath.push(cur);
    cur = parent[cur];
  }

  // no path found
  if (destinationToStartPath[destinationToStartPath.length - 1] !== start)
    return [];

  return destinationToStartPath.reverse();
}

// Example usage
const edges = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 7],
  [3, 7],
  [6, 7],
  [4, 5],
  [4, 6],
  [5, 6],
];

console.log(bfsShortestPath(edges, 0, 7)); // [0, 3, 7]
console.log(bfsShortestPath(edges, 2, 6)); // [2, 1, 0, 3, 4, 6]

// ----------------------------------------------------------------

// for weighted edges, dijkstra's algorithm is used to find the shortest path
// time complexity: O((V + E) log(V)) where V is number of vertices and E is number of edges

// It starts from a chosen start node.
// Maintains a priority queue (min-heap) to always expand the least costly node next.
// Keeps track of the shortest known distance from the start to each node.
// When it visits a node, it updates the distances to its neighbors if a shorter path is found through the current node.
// Stops when it reaches the destination node or when all reachable nodes have been visited.

function dijkstraShortestPath(
  edges: [number, number, number][], // [u, v, w]
  start: number,
  destination: number
): number[] {
  // find number of vertices
  const V = Math.max(...edges.map((e) => Math.max(e[0], e[1]))) + 1;

  // build adjacency list with weights
  const adj: [number, number][][] = Array(V)
    .fill(0)
    .map(() => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]); // undirected
  }

  // distance array and parent tracking
  const dist: number[] = Array(V).fill(Infinity);
  const parent: number[] = Array(V).fill(-1);
  dist[start] = 0;

  // priority queue (min-heap)
  const pq: [number, number][] = [[0, start]]; // [distance, node]

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // simple min-heap via sort
    const [d, node] = pq.shift()!;

    if (node === destination) break;

    for (const [neighbor, weight] of adj[node]) {
      const newDist = d + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        parent[neighbor] = node;
        pq.push([newDist, neighbor]);
      }
    }
  }

  // reconstruct path
  const path: number[] = [];
  let cur = destination;
  while (cur !== -1) {
    path.push(cur);
    cur = parent[cur];
  }

  if (path[path.length - 1] !== start) return []; // no path
  return path.reverse();
}

// Example usage
const weightedEdges: [number, number, number][] = [
  [0, 1, 4],
  [1, 2, 1],
  [0, 3, 2],
  [3, 4, 3],
  [4, 7, 1],
  [3, 7, 5],
  [6, 7, 2],
  [4, 5, 2],
  [4, 6, 3],
  [5, 6, 1],
];

console.log(dijkstraShortestPath(weightedEdges, 0, 7)); // [0, 3, 4, 7]
console.log(dijkstraShortestPath(weightedEdges, 2, 6)); // [2, 1, 0, 3, 4, 6]
