function maximumWealth(accounts: number[][]): number {
  let maxWealth = 0;

  for (const moneys of accounts) {
    let currWealth = 0;
    for (const money of moneys) {
      currWealth += money;
    }
    if (currWealth > maxWealth) {
      maxWealth = currWealth;
    }
  }
  return maxWealth;
}

// console.log(
//   maximumWealth([
//     [1, 2, 3],
//     [3, 2, 1],
//   ])
// );

function fizzBuzz(n: number): string[] {
  const arr: string[] = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      arr.push('FizzBuzz');
    } else if (i % 3 == 0) {
      arr.push('Fizz');
    } else if (i % 5 == 0) {
      arr.push('Buzz');
    } else {
      arr.push(`${i}`);
    }
  }
  return arr;
}

// console.log(fizzBuzz(15));

// Number of Steps to Reduce a Number to Zero
function numberOfSteps(num: number): number {
  let numberOfSteps = 0;

  let currNum = num;

  while (currNum != 0) {
    numberOfSteps += 1;

    const isEven = currNum % 2 == 0 ? true : false;

    if (isEven) {
      currNum = currNum / 2;
    } else {
      currNum -= 1;
    }
  }

  return numberOfSteps;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// find the middle node in linked list
function middleNode(head: ListNode | null): ListNode | null {
  let currNode = head;
  let length = 1;
  while (currNode.next) {
    currNode = currNode.next;
    length++;
  }

  let nodeIndex = 0;

  if (length % 2 === 0) {
    nodeIndex = length / 2;
  } else {
    nodeIndex = Math.floor(length / 2);
  }
  console.log(nodeIndex);

  let middleNode = head;
  for (let i = 0; i < nodeIndex; i++) {
    middleNode = middleNode.next;
  }

  return middleNode;
}
