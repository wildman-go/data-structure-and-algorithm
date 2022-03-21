/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  // leftIn, rightIn(中序数组的左右边界,左开右闭)
  // leftPost, rightPost(后序数组的左右边界,左开右闭)

  // 1. 后序数组的右边界:rightPost
  // 2. 求root: postorder[rightPost-1]
  // 3. 计算root在inorder中的索引k,新建root结点
  // 4. 计算左子树的元素个数: k-leftIn
  // 5. 左子树的中序范围：[leftIn, k],后序范围：leftPost[leftPost, leftPost+k-leftIn]
  // 6. 右子树的中序范围：[k+1, rightIn], 后序范围：[leftPost+k-leftIn,rightPost-1]
  // 7. 将左子树接到root.left
  // 8. 将右子树接到root.right
  let n = inorder.length;
  return recursion(inorder, 0, n, postorder, 0, n);

};

function recursion (inorder, leftIn, rightIn, postorder, leftPost, rightPost) {
  // leftIn, rightIn(中序数组的左右边界,左开右闭)
  // leftPost, rightPost(后序数组的左右边界,左开右闭)
  if (leftIn >= rightIn) return null;
  let root = new TreeNode(postorder[rightPost - 1]);

  let k;
  for (let i = leftIn; i < rightIn; i++) {
    if (inorder[i] === postorder[rightPost - 1]) {
      k = i;
      break;
    }
  }

  root.left = recursion(inorder, leftIn, k, postorder, leftPost, leftPost + k - leftIn);
  root.right = recursion(inorder, k + 1, rightIn, postorder, leftPost + k - leftIn, rightPost - 1);

  return root;
}