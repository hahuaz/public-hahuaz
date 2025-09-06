// Binary Search Tree
// A binary search tree, sometimes called BST, is a type of binary tree which maintains the property that the value in each node must be greater than or equal to any value stored in the left sub-tree, and less than or equal to any value stored in the right sub-tree
// Time Complexity:
// Access: O(log(n))
// Search: O(log(n))
// Insert: O(log(n))
// Remove: O(log(n))

// A "Node" represents a single element in the tree
// Each node holds a number and has two possible branches:
// - left: for smaller numbers
// - right: for larger numbers
class Node {
  value: number;
  otherProps?: any;
  left: Node | null = null;
  right: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

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

// -------------------------

// question Tree: Height of a Binary Tree
// The height of a binary tree is the number of edges on the longest path from the root node to a leaf node. A tree with only one node has a height of 0. An empty tree has a height of -1.

function heightOfBinaryTree(root: Node | null): number {
  if (root === null) return 0;

  const queue: Node[] = [root];
  let height = 0;

  while (queue.length > 0) {
    let level = queue.length;

    // Process all nodes at the current level
    for (let i = 0; i < level; i++) {
      const node = queue.shift()!; // remove front node
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Finished one level
    height++;
  }

  return height;
}
// -------------------------

// question: level order traversal of random tree
// Given a pointer to the root of a binary tree, you need to print the level order traversal of this tree. In level-order traversal, nodes are visited level by level from left to right. Complete the function  and print the values in a single line separated by a space.
// For example:
// Given binary tree:
//        3
//      /   \
//     9     20
//          /  \
//         15   7
// The level order traversal is: 3 9 20 15 7

function levelOrderTraversal(root: Node | null): number[] {
  if (!root) return [];

  const q: Node[] = [root];
  const orderTraversal: number[] = [];

  while (q.length > 0) {
    const levelSize = q.length; // number of nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const curNode = q.shift()!;
      orderTraversal.push(curNode.value);
      if (curNode.left) q.push(curNode.left);
      if (curNode.right) q.push(curNode.right);
    }
  }

  return orderTraversal;
}

// Example
const root = new Node(3);
root.left = new Node(9);
root.right = new Node(20);
root.right.left = new Node(15);
root.right.right = new Node(7);

console.log(levelOrderTraversal(root)); // Output: [3, 9, 20, 15, 7]

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
