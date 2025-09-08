/**
 * Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
 *
 * Example 1:
 * Input: x = 121
 * Output: true
 */
function isPalindrome(x: number): boolean {
  // convert number to string to iterate
  const s = String(x);
  let leftPointer = 0;
  let rightPointer = s.length - 1;

  // since comparing left and right, only need to iterate half the string
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

console.log(isPalindrome(12321)); // true
console.log(isPalindrome(1237321)); // true
console.log(isPalindrome(123)); // false
