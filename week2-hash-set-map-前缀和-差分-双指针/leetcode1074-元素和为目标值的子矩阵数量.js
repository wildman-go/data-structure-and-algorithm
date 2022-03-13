/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  // 1. 首先忽略列，遍历所有可能的i、j，i<=j，第i行到第j行每一列的和；形成一个数组，存起来
  // 2. 遍历步骤1中的每个数组，求数组中和为target的连续子数组的数量
  // 3. 将二维求target，降到了1维

  let ans = 0;
  let rows = matrix.length;
  let cols = matrix[0].length;
  let colsSums = [];

  // 1. 计算所有可能的开始结尾行，每一列和的数组
  for (let i = 0; i < rows; i++) {
    // i为起始行，j为结尾行
    for (let j = i; j < rows; j++) {
      // 计算第i行至第j行，每一列的和，存为数组colsSum
      let colsSum;
      if (i === j) {
        colsSum = matrix[i];
        colsSums.push(colsSum);
      } else {
        colsSum = [];
        for (let k = 0; k < cols; k++) {
          colsSum.push(colsSums[colsSums.length - 1][k] + matrix[j][k]);
        }
        colsSums.push(colsSum);
      }
    }
  }

  // 2. 计算每一种[i,j]下，连续子数组和为target的数量
  for (let colsSum of colsSums) {
    ans += subarraySum(colsSum, target);
  }
  return ans;
};

// 560. 和为 K 的子数组
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