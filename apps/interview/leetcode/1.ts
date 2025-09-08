/**
 * given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 */
function twoSum(nums: number[], target: number): number[] | undefined {
  const numToIndex = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    const diff = target - curNum;

    if (numToIndex.has(diff)) {
      return [numToIndex.get(diff)!, i];
    }

    numToIndex.set(curNum, i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
