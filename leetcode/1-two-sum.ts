/**
 * given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * example:
 *
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 */

function twoSum(nums: number[], target: number): number[] | undefined {
  // { number: numberIndex }
  const map: Record<number, number> = {};

  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    const diff = target - curNum;

    // if diff is seen before, return the indices
    if (map[diff] !== undefined) {
      return [map[diff], i];
    }

    // store the curNum in map to look for its pair in the next iterations
    map[curNum] = i;
  }
}

const test1 = twoSum([2, 7, 11, 15], 9);
if (test1?.[0] === 0 && test1?.[1] === 1) {
  console.log("test1 passed");
} else {
  console.error("test1 failed");
}

const test2 = twoSum([3, 2, 4], 6);
if (test2?.[0] === 1 && test2?.[1] === 2) {
  console.log("test2 passed");
} else {
  console.error("test2 failed");
}
