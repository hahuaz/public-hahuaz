// 443. String Compression
// Given an array of characters chars, compress it using the following algorithm:
// Begin with an empty string s. For each group of consecutive repeating characters in chars:
// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.
// After you are done modifying the input array, return the new length of the array.
// You must write an algorithm that uses only constant extra space.
// Note: The characters in the array beyond the returned length do not matter and should be ignored.

// Input: chars = ["a","a","b","b","c","c","c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
function compress(chars: string[]): number {
  // question wants in-place modification for chars array
  let write = 0; // where we write the compressed output
  let read = 0; // where we scan the input

  while (read < chars.length) {
    const ch = chars[read]; // start of a group
    let runLen = 0;

    // count the length of the current run of identical chars
    while (read < chars.length && chars[read] === ch) {
      read++;
      runLen++;
    }

    // write the character
    chars[write] = ch;
    write++;

    // write the run length if > 1 (as digits)
    if (runLen > 1) {
      const s = String(runLen);
      for (let i = 0; i < s.length; i++) {
        chars[write] = s[i];
        write++;
      }
    }
  }

  console.log("chars", chars);

  return write; // new length of compressed array
}

console.log(compress(["a", "a", "b", "b", "c", "c", "c"])); // 6
