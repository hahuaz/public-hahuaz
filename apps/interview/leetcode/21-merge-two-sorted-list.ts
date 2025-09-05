/**
 * 21. Merge Two Sorted Lists
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The new list should be made
 * by splicing together the nodes of the first two lists.
 *
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const dummyHead = new ListNode(-1);
  let curNode = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curNode.next = new ListNode(list1.val);
      list1 = list1.next;
    } else {
      curNode.next = new ListNode(list2.val);
      list2 = list2.next;
    }
    curNode = curNode.next;
  }

  // if one of the list is not null, append it to the end
  curNode.next = list1 !== null ? list1 : list2;

  return dummyHead.next;
}
