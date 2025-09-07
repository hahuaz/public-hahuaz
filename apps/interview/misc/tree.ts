// binary tree has root node and each node has at most two children referred to as left child and right child

class Node {
  value: number;
  otherProps?: any;
  left: Node | null = null;
  right: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }
}
class BinaryTree {
  root: Node | null = null;

  constructor(rootValue?: number) {
    if (rootValue !== undefined) this.root = new Node(rootValue);
  }

  // Build tree from level-order array
  build(arr: (number | null)[]): void {
    if (arr.length === 0 || arr[0] === null) return;

    const root = new Node(arr[0]!);
    const queue: Node[] = [root];

    let i = 1;
    while (i < arr.length) {
      const node = queue.shift()!;
      // left child
      if (i < arr.length && arr[i] !== null) {
        const leftNode = new Node(arr[i]!);
        node.left = leftNode;
        queue.push(leftNode);
      }
      i++;

      // right child
      if (i < arr.length && arr[i] !== null) {
        const rightNode = new Node(arr[i]!);
        node.right = rightNode;
        queue.push(rightNode);
      }
      i++;
    }

    this.root = root;
  }

  /**
   * Level Order traversal is visiting nodes level by level from left to right
   * it's breadth-first traversal (BFS)
   */
  levelOrderTraversal(root: Node | null): number[] {
    if (!root) return [];

    const q: Node[] = [root];
    const orderTraversal: number[] = [];

    while (q.length > 0) {
      const curNode = q.shift()!;
      orderTraversal.push(curNode.value);

      if (curNode.left) q.push(curNode.left);
      if (curNode.right) q.push(curNode.right);
    }

    return orderTraversal;
  }

  /**
   * In Order traversal is visiting left subtree, then node, then right subtree
   * it's depth-first traversal (DFS)
   */
  inOrderTraversal(): number[] {
    const result: number[] = [];

    // stack (push/pop) is used since LIFO is needed to backtrack
    const stack: Node[] = [];

    // go as left as possible and push all left nodes onto stack
    const goLeftMost = (node: Node | null) => {
      let curr = node;
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
    };

    goLeftMost(this.root);

    // process stack
    while (stack.length > 0) {
      const node = stack.pop()!;
      result.push(node.value);

      // left already processed, only subNode is right
      goLeftMost(node.right);
    }

    return result;
  }

  // Height of the tree is the number of edges on the longest path from the root node to a leaf node. empty tree has height of -1, tree with only root node has height of 0
  height(): number {
    if (this.root === null) return -1;

    let maxLevel = 0;
    const queue: Node[] = [this.root];

    while (queue.length > 0) {
      // breadth-first traversal to process all nodes at the current level
      let levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      maxLevel++;
    }
    return maxLevel - 1; // subtract 1 to convert level count to height
  }
}

const tree = new BinaryTree();
//       1
//     /   \
//    2     3
//     \   / \
//      4 5   6
tree.build([1, 2, 3, null, 4, 5, 6]);
console.log(tree.levelOrderTraversal(tree.root)); // Output: [1, 2, 3, 4, 5, 6]
console.log(tree.inOrderTraversal()); // Output: [2, 4, 1, 5, 3, 6]

// ----------------------------------------------------------------
// Binary Search Tree
// A binary search tree, sometimes called BST, is a type of binary tree which maintains the property that the value in each node must be greater than or equal to any value stored in the left sub-tree, and less than or equal to any value stored in the right sub-tree
// Time Complexity:
// Access: O(log(n))
// Search: O(log(n))
// Insert: O(log(n))
// Remove: O(log(n))

// Binary Search Tree (BST) stores numbers in sorted order
class BinarySearchTree {
  root: Node | null = null;

  // Insert a new number into the tree
  insert(value: number): void {
    const newNode = new Node(value);

    // If tree is empty, this new node becomes the root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      // If the new value is smaller go left
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode; // Place it here
          return;
        }
        current = current.left;
      } else {
        // If the new value is larger or equal go right
        if (!current.right) {
          current.right = newNode; // Place it here
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a number in the tree
  find(value: number): { value: number; otherProps?: any } | false {
    let current = this.root;

    // Keep moving left or right until found or null
    while (current) {
      if (value === current.value) {
        return {
          value: current.value,
          otherProps: current.otherProps,
        };
      }
      if (value < current.value) {
        current = current.left; // Look left if smaller
      } else {
        current = current.right; // Look right if larger
      }
    }

    return false;
  }
}

// ----------------------------------------------------------------

// Prefix tree (Trie)
// A trie, or prefix tree, is a tree data structure used to store and search strings efficiently, especially when dealing with prefixes.
// Each node represents a single character of a string, and the path from the root to a node represents a prefix of the string.
// A special marker (like isEndOfWord = true) indicates if a word ends at that node.
// Time Complexity:
// Access: O(m) where m is the length of the key
// Search: O(m)
// Insert: O(m)
// Remove: O(m)

// example
// (root)
//  ├── c
//  │    └── a
//  │         ├── t  (end of "cat")
//  │         └── r  (end of "car")
//  └── d
//       └── o
//            └── g  (end of "dog")

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word: string): void {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!; // move to child node
    }

    node.isEndOfWord = true; // mark the end of a word
  }

  // Search for a complete word
  search(word: string): boolean {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }

    return node.isEndOfWord; // last node must mark end of a word
  }

  // Check if any word starts with the given prefix
  startsWith(prefix: string): boolean {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }

    return true; // path exists, so prefix is valid
  }
}
