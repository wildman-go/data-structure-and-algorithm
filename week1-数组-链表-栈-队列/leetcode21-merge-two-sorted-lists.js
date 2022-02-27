/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // 将list2中的结点向list1中合并
  // 在list1的头结点前面放一个虚拟头部结点，作用：用于在list1头部之前插入list2的结点
  // 最后返回虚拟结点的next，即为合并结果
  let fakeNode = new ListNode(0, list1);
  let preOfwalk1 = fakeNode;
  let walk1 = list1;
  let walk2 = list2;
  let swapNode;
  while (walk1 !== null && walk2 !== null) {
    if (walk2.val > walk1.val) {
      // walk2的值较大，walk1继续往后移动
      preOfwalk1 = walk1;
      walk1 = walk1.next;
    }
    else {
      // walk2的值比walk1小，要将walk2的值插在walk1之前，preOfwalk1之后
      swapNode = walk2;
      walk2 = walk2.next;
      // 将swapNode插入preOfwalk1和walk1之间
      swapNode.next = walk1;
      preOfwalk1.next = swapNode;
      preOfwalk1 = swapNode;
    }
  }
  // 如果walk2已经走完，walk1还没走到末尾，说明walk2已经全部合并至walk1
  // 如果walk2还没走完，将walk2剩余的结点，全部连到walk1的末尾
  if (walk2 !== null) preOfwalk1.next = walk2;
  return fakeNode.next;
};