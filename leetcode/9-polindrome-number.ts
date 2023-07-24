function isPalindrome(x: number): boolean {
  const s = String(x);
  let leftPointer = 0;
  let rightPointer = s.length - 1;

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

console.log(isPalindrome(1237321));
