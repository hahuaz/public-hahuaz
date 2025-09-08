/**
 * Given a string s, find the length of the longest substring without repeating
 * characters.
 *
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3
 */
function lengthOfLongestSubstring(s: string): number {
  const charToIndex = new Map<string, number>();

  let max = 0;
  let leftPointer = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (charToIndex.has(ch) && charToIndex.get(ch)! >= leftPointer) {
      // move left pointer to the right of the last occurrence
      leftPointer = charToIndex.get(ch)! + 1;
    }

    charToIndex.set(ch, i);
    max = Math.max(max, i - leftPointer + 1);
  }

  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
