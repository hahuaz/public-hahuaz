class Node {
  public value: unknown;
  public next: Node | undefined = undefined;

  constructor(value: unknown) {
    this.value = value;
    this.next = undefined;
  }
}

class LinkedList {
  public head: Node | undefined;
  public tail: Node | undefined;
  public length: number;

  constructor(value?: unknown) {
    if (!value) {
      this.head = undefined;
      this.tail = undefined;
      this.length = 0;
      return;
    }
    const node = new Node(value);
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  // add an element at the end of list in O(1) time complexity
  public append(value: unknown): Node {
    const node: Node = new Node(value);

    if (!this.length) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;

    return node;
  }

  // add an element at the start of list in O(1) time complexity
  public prepend(value: unknown): Node {
    const node: Node = new Node(value);

    if (!this.length) {
      this.tail = node;
    } else {
      node.next = this.head;
    }

    this.head = node;
    this.length++;

    return node;
  }

  // get and remove the very first node in O(1) time complexity
  public shift(): Node | undefined {
    if (!this.head) return undefined;

    const node = this.head;

    this.head = this.head.next;
    this.length--;

    if (!this.length) {
      this.tail = undefined;
    }

    return node;
  }

  // get and remove the very last node in O(n) time complexity
  public pop(): Node | undefined {
    if (!this.head) return undefined;

    let prev: Node = this.head;
    let current: Node = this.head;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    this.tail = prev;
    this.tail.next = undefined;
    this.length--;

    if (!this.length) {
      this.head = undefined;
      this.tail = undefined;
    }

    return current;
  }

  // add a new node at a specified index in O(n) time complexity
  public insert(index: number, value: unknown): Node | undefined {
    if (index < 0 || index == undefined || index > this.length) return;

    if (index === 0) {
      return this.prepend(value);
    }

    const newNode: Node = new Node(value);

    let prevNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode?.next;
    }

    newNode.next = prevNode!.next;
    prevNode!.next = newNode;

    this.length++;

    return newNode;
  }

  // remove the node at a specified index in O(n) time complexity
  public remove(index: number): Node | undefined {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index < 0 || index >= this.length) return;

    let prevNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode?.next;
    }

    const removedNode = prevNode!.next;

    prevNode!.next = removedNode!.next;

    this.length--;

    return removedNode;
  }

  // get the node value by index in O(n) time complexity
  public get(index: number): unknown {
    if (index < 0 || !this.length || index >= this.length) return undefined;

    let node = this.head;

    for (let i = 0; i < index; i++) {
      node = node?.next;
    }

    return node!.value;
  }

  // set the node value by index in O(n) time complexity
  public set(index: number, value: unknown): Node | undefined {
    if (index < 0 || !this.length || index >= this.length) return undefined;

    let node = this.head;

    for (let i = 0; i < index; i++) {
      node = node?.next;
    }

    if (!node) return;

    node.value = value;

    return node;
  }
}

const myLinkedList = new LinkedList(2);
myLinkedList.append(1);
myLinkedList.append(1);
myLinkedList.append(2);
myLinkedList.remove(2);
console.dir(myLinkedList, { depth: null });

export = {};
