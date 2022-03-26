/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  // 法1：超时了
  // 法1怎么做的？--求图中每个连通域，如果一个连通域中所有O都不在边界，将这些O的坐标存下来，最后统一将这些位置赋值为X

  // 法2(法1改进版，看了题解) -- 只求边界处的连通域，并将边界处的连通域用其他字符，例如"A"代替；那么剩下的O就都是需要变为X的；
  // 所以，最后，遍历整个矩阵，将O变为X，将A变为O
  let X = "X", O = "O", A = "A";

  let m = board.length;
  let n = board[0].length;

  // 1. 方向数组，上、左、右、下
  let dx = [-1, 0, 0, 1];
  let dy = [0, -1, 1, 0];

  // 2. 将位于边界的连通O区，暂时全部替换成A字符
  let queue = [];
  // 2.1 第一行和最后一行
  for (let i = 0; i < n; i++) {
    if (board[0][i] === O) queue.push([0, i]);
    if (board[m - 1][i] === O) queue.push([m - 1, i]);
  }
  // 2.2 第一列和最后一列
  for (let i = 0; i < m; i++) {
    if (board[i][0] === O) queue.push([i, 0]);
    if (board[i][n - 1] === O) queue.push([i, n - 1]);
  }

  // 2.3 bfs
  while (queue.length > 0) {
    let head = queue.shift();
    board[head[0]][head[1]] = A;

    for (let i = 0; i < 4; i++) {
      let ni = head[0] + dx[i];
      let nj = head[1] + dy[i];

      // 什么情况下绕过这个点？1. 点的坐标不合法；2. 点不是O；3. 点已经走过
      if (!validPos(ni, nj, m, n) || board[ni][nj] !== O) continue;

      queue.push([ni, nj]);
    }
  }

  // 3. 将剩余O全部换成X，将A全部换成O
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === O) board[i][j] = X;
      if (board[i][j] === A) board[i][j] = O;
    }
  }
  return board;
};

// 坐标是否是边界
function isBorder (x, y, m, n) {
  return x === 0 || x === m - 1 || y === 0 || y === n - 1;
}

// 坐标是否越界
function validPos (x, y, m, n) {
  return x >= 0 && x < m && y >= 0 && y < n;
}