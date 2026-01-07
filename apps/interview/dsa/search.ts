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

    if (arr[mid] === target) return mid;

    // target is in the left half.
    if (target < arr[mid]) {
      right = mid - 1; // search left half
    } else {
      left = mid + 1; // search right half
    }
  }

  return -1; // not found
}

// ----------------------------------------------------------------
// What’s a “rotated sorted array”?
// Start with a normally sorted (ascending) array and “rotate” it by cutting at some pivot and swapping the parts.
// Example (sorted):
// [1, 3, 5, 7, 9, 11]
// rotate at index 1 → [3, 5, 7, 9, 11, 1]
// rotate at index 2 → [5, 7, 9, 11, 1, 3]
// rotate at index 3 → [7, 9, 11, 1, 3, 5]
// It’s still made of two sorted runs, but it “wraps around” at the pivot.

// Given a sorted & rotated array of distinct numbers and a target, return its index or -1 if not found.

function searchRotatedArr(arr: number[], target: number): number {
  let left = 0,
    right = arr.length - 1;
  // modified binary search
  // At each step, at least one half is sorted:
  // If arr[left] <= arr[mid], the left half is sorted. Check if target lies in [left, mid).
  // Else the right half is sorted. Check if target lies in (mid, right].
  // Move left/right accordingly.

  // you have three pointers moving toward each other and target is in one of the halves
  // left ............. mid .............. right

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    // Left half is sorted
    if (arr[left] <= arr[mid]) {
      // target is in the left half
      if (arr[left] <= target && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted

      // target is in the right half
      if (arr[mid] < target && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
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

    // smallest positive is in the left half (inclusive of mid)
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

    // largest negative is in the right half (inclusive of mid)
    if (nums[mid] <= 0) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return right;
}
