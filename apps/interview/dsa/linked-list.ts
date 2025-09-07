// Linked List
// A Linked List is a linear collection of data elements, called nodes, each pointing to the next node by means of a pointer. It is a data structure consisting of a group of nodes which together represent a sequence.
// Singly-linked list: linked list in which each node points to the next node and the last node points to null
// Doubly-linked list: linked list in which each node has two pointers, p and n, such that p points to the previous node and n points to the next node; the last node's n pointer points to null
// Time Complexity:
// Access: O(n)
// Search: O(n)
// Insert: O(1)
// Remove: O(1)
class Node {
  public next?: Node;
  public value: unknown;
  constructor(value: unknown) {
    this.value = value;
  }
}

class LinkedList {
  public head?: Node;
  public tail?: Node;
  public length = 0;

  constructor(value: unknown) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  /** Add element at the end in O(1) */
  public append(value: unknown): Node {
    const node = new Node(value);

    if (!this.length) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;
    return node;
  }

  /** Add element at the start in O(1) */
  public prepend(value: unknown): Node {
    const node = new Node(value);

    if (!this.length) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
    return node;
  }

  /** Remove first node in O(1) */
  public shift(): Node | undefined {
    if (!this.head) return undefined;
    const node = this.head;
    this.head = this.head.next;
    this.length--;
    if (!this.length) this.tail = undefined;
    return node;
  }

  /** Remove last node in O(n) */
  public pop(): Node | undefined {
    if (!this.head) return undefined;

    let prev: Node = this.head;
    let curr: Node = this.head;

    // find the node before the tail
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    this.tail = prev;
    this.tail!.next = undefined;
    this.length--;

    if (!this.length) this.head = this.tail = undefined;

    return curr;
  }

  /** Insert node at index in O(n) */
  public insert(index: number, value: unknown): Node | undefined {
    if (index < 0 || index > this.length) return;

    if (index === 0) return this.prepend(value);
    if (index === this.length) return this.append(value);

    let prevNode = this.head!;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode.next!;
    }

    const node = new Node(value);
    node.next = prevNode.next;
    prevNode.next = node;
    this.length++;

    return node;
  }

  /** Remove node at index in O(n) */
  public remove(index: number): Node | undefined {
    if (index < 0 || index >= this.length) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let prevNode = this.head!;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode.next!;
    }

    const removed = prevNode.next!;
    prevNode.next = removed.next;
    this.length--;

    return removed;
  }

  /** Get node value by index in O(n) */
  public get(index: number): unknown {
    if (index < 0 || index >= this.length) return undefined;

    let node = this.head!;
    for (let i = 0; i < index; i++) node = node.next!;
    return node.value;
  }

  /** Set node value by index in O(n) */
  public set(index: number, value: unknown): Node | undefined {
    if (index < 0 || index >= this.length) return undefined;

    let node = this.head!;
    for (let i = 0; i < index; i++) node = node.next!;
    node.value = value;
    return node;
  }
}

// Example usage
const myLinkedList = new LinkedList(2);
myLinkedList.append(1);
myLinkedList.append(1);
myLinkedList.append(2);
myLinkedList.remove(2);
console.dir(myLinkedList, { depth: null });

// -------------------------

// given a sorted linked list, remove duplicates such that each element appear only once
function removeDuplicates(list: any): any {
  let curNode = list.head;

  while (curNode?.next) {
    if (curNode.value === curNode.next.value) {
      // point current node's next to the node after next
      curNode.next = curNode.next.next;
    } else {
      curNode = curNode.next;
    }
  }

  return list;
}

const duplicateList = {
  head: {
    value: 10,
    next: {
      value: 10,
      next: {
        value: 30,
        next: {
          value: 30,
          next: undefined,
        },
      },
    },
  },
};

console.log(removeDuplicates(duplicateList));

// -------------------------

// Convert the given array of numbers into a singly linked list
const arrToList = (arr: number[]): Node | undefined => {
  if (!arr.length) return undefined;

  const dummyHead = new Node(0);
  let curNode = dummyHead;

  for (const [i, el] of arr.entries()) {
    curNode.next = new Node(el);
    curNode = curNode.next;
  }

  return dummyHead.next;
};

// Convert the given linked list to an array of numbers
function listToArr(headNode: Node): number[] {
  const arr: number[] = [];
  let curNode: Node | undefined = headNode;

  while (curNode) {
    arr.push(curNode.value as number);
    curNode = curNode.next;
  }

  return arr;
}

// -------------------------
