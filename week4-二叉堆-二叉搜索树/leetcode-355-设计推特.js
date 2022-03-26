var twitter = function (twitterId, timestamp, next) {
  this.twitterId = twitterId;
  this.val = timestamp; // 用于作为大根堆的key，时间戳靠前的，排在堆顶，用于取出最新的twitterId
  this.next = next || null;
}

var Twitter = function () {
  // 1. follow与unfollow只需关注[记录被关注人]还是[记录关注的人]？
  // 2. postTweet关系到tweetId和userId如何被关联和存储，这是由getNewsFeed决定的
  // 3. getNewsFeed只需取关注人中最近的10条推文
  // 4. 因此每发一条推文，需要记录一下推文的发布时间
  // 5. getNewsFeed时，获取n个关注人(包括自己)发布过的所有推文，按照时间从小到大取10条

  // 1. 关于存储：关注关系(key(userId):value(hashSet<userId>));
  // 2. 关于存储：推文信息(key(userId):linkedList((tweetId,timestamp,next)));每个链表至多存10个即可
  // 3. getNewsFeed时，对userId和关注人的多个链表进行合并，合并到元素==10个为止(k个链表合并，用大根堆)

  this.timestamp = 0;//从0开始记录twitter发布的时间戳，每发布一次，+1
  this.followMap = new Map(); // 用户关注信息
  this.twittersMap = new Map(); // 每个用户关注的twitter 链表

};

/** 
* @param {number} userId 
* @param {number} tweetId
* @return {void}
*/
Twitter.prototype.postTweet = function (userId, tweetId) {
  let newTwitter = new twitter(tweetId, this.timestamp++);
  if (!this.twittersMap.has(userId)) this.twittersMap.set(userId, new twitter());

  // 将新发布的twitter插入userId的链表头部
  let head = this.twittersMap.get(userId);
  newTwitter.next = head.next;
  head.next = newTwitter;
};

/** 
* @param {number} userId
* @return {number[]}
*/
Twitter.prototype.getNewsFeed = function (userId) {
  // 1. 存放结果：最新10条twitterId
  let result = [];

  // 2. 开一个大根堆，维护最新的twitterId
  let heap = new BinaryHeap();

  // 3. 将userId自己发布的twitters，和关注人的发布的twitters一起排序
  if (this.twittersMap.has(userId)) heap.push(this.twittersMap.get(userId).next);
  if (this.followMap.has(userId)) {
    for (let userid of this.followMap.get(userId)) {
      if (this.twittersMap.has(userid)) heap.push(this.twittersMap.get(userid).next);
    }
  }

  // 4. 取10条最新的返回
  while (result.length < 10 && !heap.empty()) {
    let recent = heap.getRecent();
    result.push(recent.twitterId);
    heap.pop();

    if (recent.next !== null) heap.push(recent.next);
  }

  // 5. 返回结果
  return result;
};

/** 
* @param {number} followerId 
* @param {number} followeeId
* @return {void}
*/
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.followMap.has(followerId)) this.followMap.set(followerId, new Set());
  this.followMap.get(followerId).add(followeeId);
};

/** 
* @param {number} followerId 
* @param {number} followeeId
* @return {void}
*/
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (!this.followMap.has(followerId)) return;
  this.followMap.get(followerId).delete(followeeId);

};

// 大根堆
class BinaryHeap {
  // 从1开始记录二叉堆，0位置放一个空node
  // 二叉堆的接口:getMax();push();pop();empty()
  constructor() {
    this.heap = [new ListNode(0)];
  }
  empty () {
    return this.heap.length === 1;
  }

  getRecent () {
    return this.heap[1];
  }

  push (node) {
    // 1. 首先放在堆尾
    this.heap.push(node)
    // 2. 然后向上交换
    let pos = this.heap.length - 1;
    let swap;

    while (Math.floor(pos / 2) > 0) {
      if (this.heap[pos].val <= this.heap[Math.floor(pos / 2)].val) break;
      swap = this.heap[pos];
      this.heap[pos] = this.heap[Math.floor(pos / 2)];
      this.heap[Math.floor(pos / 2)] = swap;
      pos = Math.floor(pos / 2);
    }
  }

  pop () {
    if (this.empty()) return;
    // 1. 首先把堆顶重新赋值为堆尾
    this.heap[1] = this.heap[this.heap.length - 1];
    // 2. 删除队尾
    this.heap.pop();
    // 3. 堆顶元素向下交换,将左右子孩子较大的那个换上来
    let swap; // 用于交换的临时变量
    let pos = 1; // 待交换的点的坐标
    let child = pos * 2; // 较大的左右孩子的坐标
    while (child < this.heap.length) {
      if (child + 1 < this.heap.length && this.heap[child + 1].val > this.heap[child].val) child = child + 1;

      // 比 较大的孩子节点 还大，交换停止
      if (this.heap[pos].val >= this.heap[child].val) break;
      // 交换
      swap = this.heap[pos];
      this.heap[pos] = this.heap[child];
      this.heap[child] = swap;

      // 更新位置
      pos = child;
      child = pos * 2;
    }
  }
}

/**
* Your Twitter object will be instantiated and called as such:
* var obj = new Twitter()
* obj.postTweet(userId,tweetId)
* var param_2 = obj.getNewsFeed(userId)
* obj.follow(followerId,followeeId)
* obj.unfollow(followerId,followeeId)
*/