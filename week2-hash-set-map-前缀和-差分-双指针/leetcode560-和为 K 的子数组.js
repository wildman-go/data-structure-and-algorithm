/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  // 1. 计算连续子数组和为k：子序和，考虑用前缀和解题
  // 2. 前缀和数组，两数之差为k 的个数

  let ans = 0;

  // 1. 计算前缀和
  // 2. 边计算前缀和，边计算两数之差(优化，少了一次遍历)
  // 3. 再次优化，preSum数组似乎不需要，只需要记录pre即可
  let num2countMap = new Map();
  let pre, sum;
  for (let i = 0; i < nums.length + 1; i++) {
    // 1. 计算前缀和
    if (i === 0) sum = 0, pre = sum;
    else sum = pre + nums[i - 1], pre = sum;

    // 2. 计算两数之差
    if (num2countMap[sum - k]) ans += num2countMap[sum - k];
    if (!num2countMap[sum]) num2countMap[sum] = 0;
    num2countMap[sum]++;
  }

  return ans;

};