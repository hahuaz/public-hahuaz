class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null) {
  const headNode = new ListNode(0);
  let prevNode = headNode;

  let carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    sum > 9 ? (carry = 1) : (carry = 0);
    const digit = sum % 10;
    prevNode.next = new ListNode(digit);
    prevNode = prevNode.next;

    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }

  return headNode.next;
}

console.dir(
  addTwoNumbers(
    { val: 1, next: { val: 1, next: { val: 1, next: null } } },
    { val: 1, next: { val: 1, next: { val: 9, next: null } } }
  ),
  { depth: 'unlimited' }
);
