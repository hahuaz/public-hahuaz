// for unweighted edges or static edges, BREADTH FIRST SEARCH (BFS) is used to find the shortest path
// Time Complexity: O(V + E) where V is number of vertices and E is number of edges

// there can be multiple type of inputs to represent a graph structure:
// 1. edges list: [[0,1], [0,2], [1,2], [1,3], ...] where each pair [u,v] represents an undirected edge between node u and v. you need to build adjacency list from this first
// 2. adjacency list: [[1,2], [0,2,3], [0,1], [1], ...] where index represents node and value at that index is a list of its neighbors. For example, node 1 has neighbors 0, 2, and 3

function bfsShortestPath(
  edges: number[][],
  start: number,
  destination: number
): number[] {
  // build adjacency list: [[n1,n2],[]]
  // init parent(to build path)
  //      queue(to visit neighbors)
  //      visited(not to calculate again) array.
  // build parent with loop
  // build path with parent

  // Each number in edges[][] represents a node value. Taking the maximum node value and adding 1 gives the total number of nodes
  const V = Math.max(...edges.flat()) + 1;

  const adj: number[][] = Array(V)
    .fill(false)
    .map(() => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u); // undirected
  }

  const parent: number[] = Array(V).fill(-1);
  const queue: number[] = [];
  const visited: boolean[] = Array(V).fill(false);
  visited[start] = true;
  queue.push(start);

  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);

        parent[neighbor] = node;
      }
    }
  }

  // path from destination to start using parent values
  const path: number[] = [];
  let curNode = destination;
  while (curNode !== -1) {
    path.push(curNode);
    curNode = parent[curNode];
  }

  // no path found
  if (path[path.length - 1] !== start) return [];

  return path.reverse();
}

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

function dijkstraShortestPath(
  edges: [number, number, number][], // [u, v, weight]
  start: number,
  destination: number
): number[] {
  // build adjacency list: [ [ [neighbor, weight], ... ], ... ]
  // init parent(to build path)
  //      priority queue(to visit neighbors)
  //      distance(to track shortest known distance) array.
  // build parent with loop
  // build path with parent

  // find number of vertices
  const V = Math.max(...edges.map((e) => Math.max(e[0], e[1]))) + 1;

  // build adjacency list with weights
  const adj: [number, number][][] = Array(V)
    .fill(false)
    .map(() => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]); // undirected
  }

  // distance array and parent tracking
  const parent: number[] = Array(V).fill(-1);
  const pq: [number, number][] = []; // [distance, node]
  const dist: number[] = Array(V).fill(Infinity);
  dist[start] = 0;
  pq.push([0, start]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // simple min-heap via sort
    const [d, node] = pq.shift()!;

    for (const [neighbor, weight] of adj[node]) {
      const newDist = d + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push([newDist, neighbor]);

        parent[neighbor] = node;
      }
    }
  }

  // reconstruct path
  const path: number[] = [];
  let curNode = destination;
  while (curNode !== -1) {
    path.push(curNode);
    curNode = parent[curNode];
  }

  if (path[path.length - 1] !== start) return []; // no path
  return path.reverse();
}

// Example usage
const weightedEdges: [number, number, number][] = [
  [0, 1, 5],
  [1, 2, 2],
  [0, 3, 3],
  [3, 4, 6],
  [4, 7, 2],
  [3, 7, 4],
  [6, 7, 1],
  [4, 5, 3],
  [4, 6, 5],
  [5, 6, 2],
];

console.log(dijkstraShortestPath(weightedEdges, 1, 5)); // [ 1, 0, 3, 7, 6, 5 ] cost 15
console.log(dijkstraShortestPath(weightedEdges, 3, 6)); // [ 3, 7, 6 ] cost 5
