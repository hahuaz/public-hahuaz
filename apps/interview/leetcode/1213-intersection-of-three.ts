/**
 * 1213. Intersection of Three Sorted Arrays
 * Given three integer arrays arr1, arr2 and arr3 sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.
 *
 * Example 1:
 * Input: arr1 = [1,2,3], arr2 = [2,3,4], arr3 = [3,4,5]
 * Output: [3]
 */

function commonElements(
  arr1: number[],
  arr2: number[],
  arr3: number[]
): number[] {
  // use three pointers to traverse the arrays. If the elements at all three pointers are equal, add to result and move all pointers forward. If not, move the pointer(s) with the smallest value forward.

  const result: number[] = [];
  let i = 0,
    j = 0,
    k = 0;

  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    } else {
      // Move the pointer(s) with the smallest value
      const minVal = Math.min(arr1[i], arr2[j], arr3[k]);
      if (arr1[i] === minVal) i++;
      if (arr2[j] === minVal) j++;
      if (arr3[k] === minVal) k++;
    }
  }

  return result;
}
