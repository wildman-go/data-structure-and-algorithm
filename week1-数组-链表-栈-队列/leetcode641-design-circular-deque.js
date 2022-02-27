/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  // 这一题要注意“循环”两个字，循环意味着 队列的头和尾不一定是数组的0和n-1，所以head和tail是变化的
  // 为什么实际数组的长度多1？因为判空和判满的条件一样，无法区分是空还是满，多出的一个位置什么都不存放，被tail标记
  this.array = new Array(k + 1);
  this.head = 0; // head为头部元素的索引值
  this.tail = 0; // tail为尾部元素的索引值+1
  this.n = k + 1; // 实际数组长度
  this.k = k; // 实际元素个数
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertFront = function (value) {
  // 不满时才可以insert，1.front索引往前移一个，2.为新的front索引赋值
  if (!this.isFull()) {
    this.head = (--this.head + this.n) % this.n; // 处理索引越界的问题，例如索引 -1,实际是索引n-1
    this.array[this.head] = value;
    return true;
  }
  return false;
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertLast = function (value) {
  // 不满时才可以insert，1.在tail处赋值，2.tail往后移一个
  if (!this.isFull()) {
    this.array[this.tail] = value;
    this.tail = (++this.tail) % this.n; // 处理索引越界的问题，例如索引n,实际是索引0
    return true;
  }
  return false;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteFront = function () {
  // head索引往后移一个
  if (!this.isEmpty()) {
    this.head = (++this.head) % this.n;
    return true;
  }
  return false;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteLast = function () {
  // tail索引往前移一个
  if (!this.isEmpty()) {
    this.tail = (--this.tail + this.n) % this.n;
    return true;
  }
  return false;
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getFront = function () {
  return this.isEmpty() ? -1 : this.array[this.head];
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getRear = function () {
  return this.isEmpty() ? -1 : this.array[(this.tail - 1 + this.n) % this.n];
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isEmpty = function () {
  return this.head === this.tail;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isFull = function () {
  return (this.tail + 1) % this.n === this.head;
};

/**
* Your MyCircularDeque object will be instantiated and called as such:
* var obj = new MyCircularDeque(k)
* var param_1 = obj.insertFront(value)
* var param_2 = obj.insertLast(value)
* var param_3 = obj.deleteFront()
* var param_4 = obj.deleteLast()
* var param_5 = obj.getFront()
* var param_6 = obj.getRear()
* var param_7 = obj.isEmpty()
* var param_8 = obj.isFull()
*/
