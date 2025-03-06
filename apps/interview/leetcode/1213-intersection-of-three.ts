/**
 * This solution uses three pointers, one for each input array, and moves the
 * pointer of the array with the smallest current element. If the current elements
 * of the three arrays are equal, it means they are a common element, so it gets
 * added to the result array. This process continues until one of the arrays has
 * been fully processed.
 * The time complexity of this solution is O(n), where n is the total number of elements in all three arrays.
 */
function commonElements(arr1: number[], arr2: number[], arr3: number[]) {
  let i = 0,
    j = 0,
    k = 0;
  const result = [];

  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr2[j] < arr3[k]) {
      j++;
    } else {
      k++;
    }
  }

  return result;
}

console.log(
  commonElements(
    [1, 5, 10, 20, 40, 80],
    [6, 7, 20, 80, 100],
    [3, 4, 15, 20, 30, 70, 80, 120]
  )
);
