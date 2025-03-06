function maximumCount(nums: number[]): number {
  let positiveCount = 0;
  let negativeCount = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      positiveCount++;
    } else if (nums[i] < 0) {
      negativeCount++;
    }
  }

  return Math.max(positiveCount, negativeCount);
}

function maximumCountImproved(nums: number[]): number {
  let positiveCount = 0;
  let negativeCount = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      positiveCount = nums.length - i;
      break;
    } else if (nums[i] < 0) {
      negativeCount++;
    }
  }

  return Math.max(positiveCount, negativeCount);
}

// using binary search
function maximumCountBinary(nums: number[]) {
  // if nums contains all positive or negative return the length
  if (nums[0] > 0 || nums[nums.length - 1] < 0) return nums.length;

  // binary search for the index of smallest positive number
  function smallestPositive(nums: any) {
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
  function largestNegative(nums: any) {
    let left = 0,
      right = nums.length - 1;
    while (left < right) {
      const mid = Math.ceil((left + right) / 2);
      if (nums[mid] < 0) left = mid;
      else right = mid - 1;
    }
    return right;
  }

  return Math.max(
    nums.length - smallestPositive(nums),
    largestNegative(nums) + 1
  );
}

maximumCountBinary([-5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]);
