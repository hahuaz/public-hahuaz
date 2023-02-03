function twoSum(nums: number[], target: number): number[] {
  const hash: any = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in hash) {
      return [hash[complement], i];
    }

    // save the index in hash for the number
    hash[nums[i]] = i;
  }
  return hash;
}
