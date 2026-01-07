// 28. Find the Index of the First Occurrence in a String
// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0.

// sliding window approach:
// we're looking for occurrences of arr2 within arr1
// arr2 is window and we slide it over arr1. As we slide, we compare the elements in the window with arr2

// questions that can be solved with this approach:
// - occurrence of array sequence within another array
// - occurrence of substring within another string

function countOccurrences(arr1: number[], arr2: number[]): number {
  let matchCount = 0;
  for (let i = 0; i <= arr1.length - arr2.length; i++) {
    let match = true;
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] !== arr1[i + j]) {
        match = false;
        break;
      }
    }
    if (match) matchCount++;
  }
  return matchCount;
}

console.log(countOccurrences([1, 2, 1, 2, 3], [1, 2])); // 2

// return the starting index of the first occurrence of needle in haystack
function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (needle.length === 1) return haystack.indexOf(needle);

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return i;
  }
  return -1;
}

console.log(strStr("sadbutsad", "sad")); // 0
