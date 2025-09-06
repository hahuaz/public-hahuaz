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

// Remove duplicates from sorted linked list
interface SimpleNode {
  element: number;
  next: SimpleNode | null;
}

interface SimpleLinkedList {
  head: SimpleNode | null;
}

function removeDuplicates(list: SimpleLinkedList): SimpleLinkedList {
  let curr = list.head;

  while (curr?.next) {
    if (curr.element === curr.next.element) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return list;
}

const linkedList: SimpleLinkedList = {
  head: {
    element: 10,
    next: {
      element: 10,
      next: {
        element: 30,
        next: {
          element: 30,
          next: null,
        },
      },
    },
  },
};

console.log(removeDuplicates(linkedList));

export default {};
