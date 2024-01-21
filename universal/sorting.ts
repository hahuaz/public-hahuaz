/**
 * selection sort: repeatedly find the minimum element in the unsorted portion of the array and move it to the beginning of the unsorted portion.
 *
 * time complexity: O(n^2) because we have to iterate through the array n times, and for each iteration, we have to iterate through the unsorted portion of the array n - 1 times. n * (n - 1) = n^2 - n = O(n^2)
 * (- n) is ignored in big O notation because it's insignificant compared to n^2
 * space complexity: O(1)
 *
 */
function selectionSort(arr: number[]): number[] {
  // Iterate through each element in the array
  for (let i = 0; i < arr.length - 1; i++) {
    // Find the minimum element in the unsorted portion of the array
    // pay attention to the starting index of the inner loop
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the minimum element with the first element in the unsorted portion
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
}

const selectionSortTest1 = selectionSort([5, 4, 3, 2, 1]);
if (JSON.stringify(selectionSortTest1) === JSON.stringify([1, 2, 3, 4, 5])) {
  console.log("selectionSort test 1 passed");
} else {
  console.log("selectionSort test 1 failed");
}

/**
 * bubble sort: repeatedly swap adjacent elements if they are in the wrong order.
 * it's called bubble sort because with each iteration, the largest element in the unsorted portion bubbles up to the rightmost position.
 *
 * time complexity: O(n^2) because we have to iterate through the array n times, and for each iteration, we have to iterate through the unsorted portion of the array n - 1 times. n * (n - 1) = n^2 - n = O(n^2)
 * (- n) is ignored in big O notation because it's insignificant compared to n^2
 * space complexity: O(1)
 */
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  // Iterate through each element in the array
  for (let i = 0; i < n - 1; i++) {
    // Iterate again through the unsorted portion (left side) of the array
    // and move the largest element to the rightmost position
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements arr[j] and arr[j + 1]
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

const bubleSortTest1 = bubbleSort([5, 4, 3, 2, 1]);
if (JSON.stringify(bubleSortTest1) === JSON.stringify([1, 2, 3, 4, 5])) {
  console.log("bubbleSort test 1 passed");
} else {
  console.log("bubbleSort test 1 failed");
}

const bubleSortTest2 = bubbleSort([5, 1, 4, 2, 8]);
if (JSON.stringify(bubleSortTest2) === JSON.stringify([1, 2, 4, 5, 8])) {
  console.log("bubbleSort test 2 passed");
} else {
  console.log("bubbleSort test 2 failed");
}
