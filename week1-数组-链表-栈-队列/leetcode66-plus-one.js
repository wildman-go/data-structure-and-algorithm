/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // 将"+1"操作看作是来自后一位的进位处理;
  // 从数组的末尾开始遍历，初始要+1,所以认为初始时，shouldCarry为true；
  // 如果某一位+1后，和没有超过9，shouldCarry要置为false，并退出循环；
  // 如果遍历完之后，shouldCarry依然为true，说明最高位也要进1，则在数组的首位插入1。
  let length = digits.length;
  let shouldCarry = true;
  let computed;

  for (let i = length - 1; i >= 0; i--) {
    if (shouldCarry) {
      computed = digits[i] + 1;
      if (computed < 10) {
        digits[i] = computed;
        shouldCarry = false;
        break;
      } else {
        digits[i] = computed % 10;
        shouldCarry = true;
      }
    }
  }
  if (shouldCarry) digits.unshift(1);

  return digits;
};