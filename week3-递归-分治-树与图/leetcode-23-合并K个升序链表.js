/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 1. 用分治,第一次,将lists分为两半,每一半先算merge的结果,最后算合并两半的链表(merge2List)
  // 2. merge的终止条件:分出来的一半只剩下一个list,直接返回;或者分出来的一半为空,返回null
  // 3. 用merge2List,将两半合并
  let n = lists.length;
  return merge(lists, 0, n - 1);
};

function merge (lists, lpos, rpos) {
  // 分治,从中间分成两半,分别合并,最小分割单元为(0个或1个链表)
  // 用merge2List将两半合并
  if (lpos === rpos) return lists[lpos];
  if (lpos > rpos) return null;
  let mid = Math.floor((lpos + rpos) / 2);
  let left = merge(lists, lpos, mid);
  let right = merge(lists, mid + 1, rpos);
  return merge2List(left, right);
}

function merge2List (list1, list2) {
  // 此处,在第一周的作业里,经助教提醒,修改了做法
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  let result;
  if (list1.val < list2.val) {
    result = list1;
    result.next = merge2List(list1.next, list2);
  } else {
    result = list2;
    result.next = merge2List(list2.next, list1);
  }
  return result;
}