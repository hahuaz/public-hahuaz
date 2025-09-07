/**
 * linear search: iterate through each element of the array until the target value is found.
 * time complexity: O(n) because in the worst case we may have to check every element.
 */
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

/**
 * binary search: repeatedly divide the sorted array in half to find the target value.
 * time complexity: O(log n) because with each comparison, we reduce the search space by half.
 */
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      // make left closer to target
      left = mid + 1;
    } else {
      // make right closer to target
      right = mid - 1;
    }
  }

  return -1;
}

// binary search for the index of smallest positive number
export function smallestPositive(nums: number[]) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// binary search for the index of largest negative number
export function largestNegative(nums: number[]) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = Math.ceil((left + right) / 2);

    if (nums[mid] <= 0) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return right;
}
