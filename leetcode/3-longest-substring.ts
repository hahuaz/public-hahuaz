function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let maxLength = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    const currentChar = s[right];

    if (!charSet.has(currentChar)) {
      charSet.add(currentChar);
      maxLength = Math.max(maxLength, right - left + 1);
      right++;
    } else {
      // Delete characters from the left side of the window until the
      // first occurrence of the current character is removed from the set
      charSet.delete(s[left]);
      left++;
    }
  }

  return maxLength;
}
