/**
 * Given a string s, find the length of the longest substring without repeating
 * characters.
 *
 * Example 1:
 *
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3
 *
 * Example 2:
 *
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1
 */

function lengthOfLongestSubstring(s: string): number {
  // {char: lastSeenCharIndex}
  const map: Record<string, number> = {};

  let max = 0;
  let leftPointer = 0;
  let rightPointer = 0;

  for (let i = 0; i < s.length; i++) {
    const curChar = s[i];

    // If the character is seen before and it is in the current substring, move the leftPointer to right of last seen index.
    if (map[curChar] !== undefined && map[curChar] >= leftPointer) {
      leftPointer = map[curChar] + 1;
    }

    map[curChar] = i;
    rightPointer = i;

    max = Math.max(max, rightPointer - leftPointer + 1);
  }

  return max;
}

const test1 = lengthOfLongestSubstring("abcabcbb");
if (test1 === 3) {
  console.log("test1 passed");
} else {
  console.error("test1 failed");
}

const test2 = lengthOfLongestSubstring("bbbbb");

if (test2 === 1) {
  console.log("test2 passed");
} else {
  console.error("test2 failed");
}

const test3 = lengthOfLongestSubstring("abcbaabcd");
if (test3 === 4) {
  console.log("test3 passed");
} else {
  console.error("test3 failed");
}
