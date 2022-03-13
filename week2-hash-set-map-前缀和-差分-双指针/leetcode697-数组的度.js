/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  // 看了题解
  // 1. 找到在nums中出现次数最多的数，（可能不止一个）
  // 2. 那么最短连续子数组，一定包含上述中一个数的全部
  // 3. 记录每个数第一次出现和最后一次出现的index，距离最小的即为答案
  // 4. 准备一个map，记录每个数的出现次数，第一次出现index，最后一次出现的index

  // 1. 统计map {2:[2,1,5],...}表示，数字2出现了2次，第一次出现在索引1，最后一次出现在索引5
  let countMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (countMap[nums[i]]) {
      countMap[nums[i]][0]++;
      countMap[nums[i]][2] = i;
    } else {
      countMap[nums[i]] = [1, i, i];
    }
  }

  // 2. 计算出现最多的次数，和长度最小的子数组
  let maxCount = 0, minLen = 0;
  for (let num in countMap) {
    // 出现次数比maxCount小的，直接忽略
    if (countMap[num][0] < maxCount) continue;

    // 出现次数比maxCount大的，maxCount和minLen都要更新
    if (countMap[num][0] > maxCount) {
      maxCount = countMap[num][0];
      minLen = countMap[num][2] - countMap[num][1] + 1;
    } else {
      // 出现次数也为最大出现次数的，取长度更小的子数组
      minLen = Math.min(minLen, countMap[num][2] - countMap[num][1] + 1);
    }
  }

  // 3. 返回结果
  return minLen;

};