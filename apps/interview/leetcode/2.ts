class ListNode {
  // declare prop types
  val: number;
  next: ListNode | null;

  // initialize props
  constructor(val: number, next?: ListNode | null) {
    this.val = val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * You are given two non-empty linked lists representing two non-negative
 * integers. The digits are stored in reverse order, and each of their nodes
 * contains a single digit. Add the two numbers and return the sum as a linked
 * list.
 *
 * You may assume the two numbers do not contain any leading zero, except the
 * number 0 itself.
 *
 * example:
 *
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807
 */

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummyHead = new ListNode(0);
  let cur = dummyHead;
  let carry = 0;

  while (l1 || l2 || carry) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;

    const sum = x + y + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummyHead.next;
}

const test1 = addTwoNumbers(
  new ListNode(2, new ListNode(4, new ListNode(3))),
  new ListNode(5, new ListNode(6, new ListNode(4)))
);

if (
  test1?.val === 7 &&
  test1?.next?.val === 0 &&
  test1?.next?.next?.val === 8
) {
  console.log("test1 passed");
  console.dir(test1, { depth: null });
} else {
  console.log("test1 failed");
}
