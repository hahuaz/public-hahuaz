function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const headNode = new ListNode(-1);
  let prevNode = headNode;

  // while two list are not null
  while (list1 && list2) {
    if (list1.val < list2.val) {
      prevNode.next = list1;

      list1 = list1.next;
      prevNode = prevNode.next;
    } else {
      prevNode.next = list2;

      list2 = list2.next;
      prevNode = prevNode.next;
    }
  }

  // either one list is null or two list is null
  prevNode.next = list1 || list2;

  return headNode.next;
}
