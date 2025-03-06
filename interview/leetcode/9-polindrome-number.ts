/**
 * Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
 *
 * Example 1:
 *
 * Input: x = 121
 * Output: true
 *
 */
function isPalindrome(x: number): boolean {
  // reason for converting to string is to be able to access the characters by index
  const s = String(x);
  let leftPointer = 0;
  let rightPointer = s.length - 1;

  // only need to iterate half of the string because we are comparing characters from the left and right
  for (let i = 0; i < s.length / 2; i++) {
    if (s[leftPointer] != s[rightPointer]) {
      return false;
    }

    // move pointers for next iteration
    leftPointer += 1;
    rightPointer -= 1;
  }
  return true;
}

const test1 = isPalindrome(12321);
if (test1 === true) {
  console.log("test1 passed");
} else {
  console.error("test1 failed");
}

const test2 = isPalindrome(1237321);
if (test2 === true) {
  console.log("test2 passed");
} else {
  console.error("test2 failed");
}

const test3 = isPalindrome(123);
if (test3 === false) {
  console.log("test3 passed");
} else {
  console.error("test3 failed");
}
