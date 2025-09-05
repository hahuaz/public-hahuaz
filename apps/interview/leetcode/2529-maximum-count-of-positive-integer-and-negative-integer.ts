import { smallestPositive, largestNegative } from "@/misc/search.js";

/**
 * 2529. Maximum Count of Positive Integer and Negative Integer
 * Given an array nums sorted in non-decreasing order, return the maximum between the count of positive integers and the count of negative integers.
 * Note that 0 is neither positive nor negative.
 *
 * Example 1:
 * Input: nums = [-2,-1,-1,1,2,3]
 * Output: 3
 * Explanation: There are 3 positive integers (1, 2, 3) and 2 negative integers (-2, -1). The maximum count is 3.
 *
 */

function maximumCountLinear(nums: number[]): number {
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

function maximumCountBinary(nums: number[]): number {
  // 1. find the first index of positive numbers using binary search
  // 2. find the last index of negative numbers using binary search
  // 3. calculate the counts and return the max

  const posStart = smallestPositive(nums);
  const negEnd = largestNegative(nums);

  const positiveCount = nums.length - posStart;
  const negativeCount = negEnd + 1;

  return Math.max(positiveCount, negativeCount);
}
