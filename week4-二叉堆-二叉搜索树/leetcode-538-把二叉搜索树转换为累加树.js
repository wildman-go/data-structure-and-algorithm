/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  // 1. 思考1：按节点值从大到小的顺序，进行遍历，每个点的新val，等于[当前的值]+[最小后继的新值]
  // 2. 思考2：按节点值从大到小的顺序，其实是[右中左的顺序]，每次将上一次计算的结果存下来
  let last = [0]; // 用数组，是因为它是一个引用类型，可以在多次dfs递归中共享
  dfs(root, last);
  return root;
};

function dfs (root, last) {
  if (root === null) return;

  // 1. 右子树
  dfs(root.right, last);

  // 2. root
  root.val = root.val + last[0];
  last[0] = root.val;

  // 3. 左子树
  dfs(root.left, last);

}