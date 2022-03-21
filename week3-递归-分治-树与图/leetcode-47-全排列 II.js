/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  // 1. n个位置,考虑每个位置放什么数,第1个位置有n种可能性,第2个位置就是n-1种可能性,n的阶乘种情况
  // 2. 在遍历这些可能性的同时,对于那些"还没有用过,但是重复了"的元素,跳过

  // 1.. 记录结果
  let a = []; // 一种排列的数组
  let results = []; // 总的结果

  // 2. 记录每个数用没用过,初始化为false
  let used = [];
  for (let num of nums) used.push(false); // 初始化


  // 3. 从索引0开始考虑
  recursion(nums, 0, used, a, results);
  return results;


};

function recursion (nums, pos, used, a, results) {
  if (pos === nums.length) {
    // 说明0到n-1个位置都排完了
    results.push([...a]);
    return;
  }

  // 1. 将用过的数放进这个重复集合
  let duplicated = new Set();
  for (let i = 0; i < nums.length; i++) {

    // 2. 在pos位置遍历元素时,跳过"没用过,但是重复"了的元素
    if (!used[i] && duplicated.has(nums[i])) continue;

    if (!used[i]) {
      // 3. 每使用一个元素,将它add进重复集合
      duplicated.add(nums[i]);

      // 4. 递归下一个位置:pos+1
      a.push(nums[i]);
      used[i] = true;
      recursion(nums, pos + 1, used, a, results);
      a.pop();
      used[i] = false;
    }
  }

}