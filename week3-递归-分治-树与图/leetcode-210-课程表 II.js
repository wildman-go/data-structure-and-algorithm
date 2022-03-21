
/*
# leetcode 210, 课程表2
# 题意
现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。
给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，
表示在选修课程 ai 前 必须 先选修 bi 。

例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
返回你为了学完所有课程所安排的学习顺序。
可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。


1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)
prerequisites[i].length == 2
0 <= ai, bi < numCourses
ai != bi
所有[ai, bi] 互不相同
*/



/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    // 1. 这是一个有向图，求拓扑序列，用广度优先遍历，遍历所有可修的课程
    // 2. 课程的入度为0，才可被修，否则说明还有先修课程未修
    // 3. 首先用出边数组将图存下来，同时记下每个课程的入度
    // 4. 将入度为0的课程放进广度搜索队列
    // 5. 每次从队列取出一个课程放入可修列表，同时将他们的孩子节点入度-1；此时若孩子节点的入度为0，则进度队列
    
    // 1. 存图和入度
    let graph=[], inDegree=[];
    for(let i=0; i<numCourses;i++) {
        graph.push([]);
        inDegree.push(0);
    }
    for(let pair of prerequisites){
        graph[pair[1]].push(pair[0]);
        inDegree[pair[0]]++;
    }

    // 2. 取出入度为0的课程，放入队列
    let queue=[],lessons=[];
    for(let i=0;i<numCourses;i++){
        if(inDegree[i]===0) queue.push(i);
    }

    // 3. 课程依次出队
    while(queue.length>0){
        let head = queue.shift();
        lessons.push(head);
        for(let child of graph[head]){
            inDegree[child]--;
            if(inDegree[child]===0) queue.push(child);
        }
    }

    // 4. 返回结果
    if (lessons.length===numCourses) return lessons;
    else return [];
};
 


