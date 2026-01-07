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

    // loop arr
    // fill left i++
    // fill right i++
    // push new nodes into q to fill later

    const root = new Node(arr[0]!);
    const q: Node[] = [];

    q.push(root);

    let i = 1;
    while (i < arr.length) {
      const node = q.shift()!;
      // fill left
      if (i < arr.length && arr[i] !== null) {
        const newNode = new Node(arr[i]!);
        node.left = newNode;
        q.push(newNode);
      }
      i++;

      // fill right
      if (i < arr.length && arr[i] !== null) {
        const newNode = new Node(arr[i]!);
        node.right = newNode;
        q.push(newNode);
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

    const orderTraversal: number[] = [];
    const q: Node[] = [];

    q.push(root);

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
    const q: Node[] = [];

    q.push(this.root);

    while (q.length > 0) {
      // process all nodes at the current level (breadth-first traversal)
      let levelSize = q.length;
      for (let i = 0; i < levelSize; i++) {
        const node = q.shift()!;
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
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
console.log(tree.height()); // Output: 2

// ----------------------------------------------------------------
// Binary Search Tree (BST) stores numbers in sorted order
// A binary search tree, sometimes called BST, is a type of binary tree which maintains the property that the value in each node must be greater than or equal to any value stored in the left sub-tree, and less than or equal to any value stored in the right sub-tree
// Time Complexity:
// Access: O(log(n))
// Search: O(log(n))
// Insert: O(log(n))
// Remove: O(log(n))

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

    let curNode = this.root;

    while (true) {
      // If the new value is smaller go left
      if (value < curNode.value) {
        // if no left child insert else go left
        if (!curNode.left) {
          curNode.left = newNode;
          break;
        } else {
          curNode = curNode.left;
        }
      } else {
        // if no right child insert else go right
        if (!curNode.right) {
          curNode.right = newNode;
          break;
        } else {
          curNode = curNode.right;
        }
      }
    }
  }

  // Search for a number in the tree
  find(value: number): { value: number; otherProps?: any } | false {
    let curNode = this.root;

    // Keep moving left or right until found or null
    while (curNode) {
      if (value === curNode.value) {
        return {
          value: curNode.value,
          otherProps: curNode.otherProps,
        };
      }
      if (value < curNode.value) {
        curNode = curNode.left; // go left if smaller
      } else {
        curNode = curNode.right; // go right if larger
      }
    }

    return false;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(20);
bst.insert(15);
bst.insert(17);
bst.insert(5);
//        10
//       /  \
//      5    20
//          /
//        15
//          \
//           17
console.log(bst.find(15)); // { value: 15, otherProps: undefined }
console.log(bst.find(99)); // false

// ----------------------------------------------------------------

// Prefix tree (Trie)
// A prefix tree (trie) is a tree data structure used to store and search strings efficiently, especially when dealing with prefixes.
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

class PrefixTreeNode {
  // multiple sub-nodes (more than two children)
  children: Map<string, PrefixTreeNode>;
  isEndOfWord?: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class PrefixTree {
  root: PrefixTreeNode;
  constructor() {
    this.root = new PrefixTreeNode();
  }

  // Insert a word into the tree
  insert(word: string): void {
    let node = this.root;

    // insert each and move down the tree
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new PrefixTreeNode());
      }
      node = node.children.get(char)!;
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

    return node.isEndOfWord === true;
  }

  // Return all words that start with a prefix
  wordsWithPrefix(prefix: string): string[] {
    let node = this.root;

    // find the node that represents the end of the prefix
    for (const char of prefix) {
      if (!node.children.has(char)) return []; // prefix not found
      node = node.children.get(char)!;
    }

    const results: string[] = [];

    // use BFS to find all words starting from this node
    const q: {
      node: PrefixTreeNode;
      path: string;
    }[] = [];

    q.push({ node, path: prefix });

    while (q.length > 0) {
      const { node, path } = q.shift()!;
      if (node.isEndOfWord) results.push(path);

      for (const [char, childNode] of node.children) {
        q.push({ node: childNode, path: path + char });
      }
    }

    return results;
    // Time: O(m + k) m = prefix.length, k = number of words with the prefix
    // Space: O(m + k) for the queue and results array
    // same solution apply if they ask
    // count of words with the prefix
    // longest word with the prefix
    // shortest word with the prefix
  }
}

const prefixTree = new PrefixTree();
prefixTree.insert("cat");
prefixTree.insert("car");
prefixTree.insert("dog");
console.log(prefixTree.search("car")); // true
console.log(prefixTree.wordsWithPrefix("ca")); // ['cat', 'car']

const trieObject = {
  children: {
    c: {
      children: {
        a: {
          children: {
            t: { children: {}, isEndOfWord: true },
            r: { children: {}, isEndOfWord: true },
          },
          isEndOfWord: false,
        },
      },
      isEndOfWord: false,
    },
    d: {
      children: {
        o: {
          children: {
            g: { children: {}, isEndOfWord: true },
          },
          isEndOfWord: false,
        },
      },
      isEndOfWord: false,
    },
  },
  isEndOfWord: false,
};

// ----------------------------------------------------------------
// You’re given the root of a binary tree, and you need to determine if it is symmetric around its center (i.e., the left subtree is a mirror reflection of the right subtree).

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3   → Symmetric

function isSymmetricIterative(root: Node | null): boolean {
  if (!root) return true;

  const queue: (Node | null)[] = [];
  queue.push(root.left, root.right);

  while (queue.length) {
    // take two nodes to compare
    const t1 = queue.shift()!;
    const t2 = queue.shift()!;

    if (!t1 && !t2) continue;
    if (!t1 || !t2) return false;
    if (t1.value !== t2.value) return false;

    // push children in opposite order for next comparsion to be mirror
    queue.push(t1.left, t2.right);
    queue.push(t1.right, t2.left);
  }

  return true;
}

// ----------------------------------------------------------------
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

// given two nodes p and q in a binary tree, find their lowest common ancestor (LCA).

// LCA in a general binary tree (NOT assuming BST), BFS only, no recursion.
function lowestCommonAncestorBFS(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (!root || !p || !q) return null;
  if (p === q) return p;

  // 1) Build parent pointers level-by-level (BFS)
  const parent = new Map<TreeNode, TreeNode | null>();
  parent.set(root, null);
  const queue: TreeNode[] = [root];

  while (queue.length && (!parent.has(p) || !parent.has(q))) {
    const node = queue.shift()!;
    if (node.left && !parent.has(node.left)) {
      parent.set(node.left, node);
      queue.push(node.left);
    }
    if (node.right && !parent.has(node.right)) {
      parent.set(node.right, node);
      queue.push(node.right);
    }
  }

  // If either p or q was never discovered, they’re not in the tree
  if (!parent.has(p) || !parent.has(q)) return null;

  // 2) Mark all ancestors of p (including p)
  const seen = new Set<TreeNode>();

  let cur: TreeNode | null = p;
  while (cur !== null) {
    seen.add(cur);
    cur = parent.get(cur) ?? null; // Map.get may be undefined; coalesce to null
  }

  // 3. Climb from q until we hit a seen ancestor
  cur = q;
  while (cur !== null) {
    if (seen.has(cur)) return cur;
    cur = parent.get(cur) ?? null;
  }
  return null; // should not happen if both are in the same tree
}

const p = new TreeNode(6);
const q = new TreeNode(4);

//       3
//     /
//   5
//  / \
// 6   2
//    / \
//   7   4

const root = new TreeNode(
  3,
  new TreeNode(5, p, new TreeNode(2, new TreeNode(7), q))
);

console.log("LCA(6,4) =", lowestCommonAncestorBFS(root, p, q)?.val);
// → 5
