function _search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// binary search for the index of smallest positive number
function smallestPositive(nums: number[]) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > 0) right = mid;
    else left = mid + 1;
  }
  return left;
}

// binary search for the index of largest negative number
function largestNegative(nums: number[]) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = Math.ceil((left + right) / 2);
    if (nums[mid] < 0) left = mid;
    else right = mid - 1;
  }
  return right;
}

console.log(smallestPositive([-5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]));
console.log(largestNegative([-5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]));
