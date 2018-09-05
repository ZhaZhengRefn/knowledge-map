# 链表

## 概念
链表是一种类似于数组的线性结构，由链表节点组成。节点包含两个属性: value、next。next属性指向下一个节点。
[链表结构](https://user-gold-cdn.xitu.io/2018/5/22/16388487759b1152?w=1060&h=178&f=png&s=20820)

## 实现

### 单向链表

1. 规范
此处为leetcode中explore的链表章节的实现，其规范为:
> Design your implementation of the linked list. You can choose to use the singly linked list or the doubly linked list. A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node. If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

> Implement these functions in your linked list class:

- get(index) : Get the value of the index-th node in the linked list. If the index is invalid, return -1.
- addAtHead(val) : Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
- addAtTail(val) : Append a node of value val to the last element of the linked list.
- addAtIndex(index, val) : Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
- deleteAtIndex(index) : Delete the index-th node in the linked list, if the index is valid.

2. 链表节点
```js
class LinkedNode {
  constructor(val, next = null) {
    this.value = val
    this.next = next
  }
  toString(callback) {
    return typeof callback === 'function' ? callback(this.value) : `${this.value}`
  }
}
```
3. 链表
```js
class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  addAtHead(val) {
    const newNode = new LinkedNode(val, this.head)

    this.head = newNode

    if (!this.tail) {
      this.tail = newNode
    }
    return newNode
  }

  addAtTail(val) {
    const newNode = new LinkedNode(val, null)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return newNode
    }

    this.tail.next = newNode
    this.tail = newNode
    return newNode
  }

  addAtIndex(index, val) {
    if (index === 0) {
      return this.addAtHead(val)
    }

    const newNode = new LinkedNode(val, null)

    let i = 0
    let currentNode = this.head
    while (i < index - 1 && currentNode) {
      currentNode = currentNode.next
    }
    if (!currentNode) return -1

    newNode.next = currentNode.next.next
    currentNode.next = newNode
    return newNode
  }

  deleteAtIndex(index) {
    const beforeNode = this.get(index - 1)

    if (!this.head) return -1

    if (beforeNode === -1) {
      if (index === 0) {
        const temp = this.head
        this.head = this.head.next
        temp.next = null
        return temp
      }
      return -1
    }

    if (!beforeNode.next) return -1

    const temp = beforeNode.next
    beforeNode.next = beforeNode.next.next
    temp.next = null
    return temp
  }

  get(index) {
    if (index < 0) return -1

    let i = 0
    let currentNode = this.head
    
    while (i < index && currentNode) {
      currentNode = currentNode.next
      i++
    }
    return currentNode ? currentNode : -1
  }

  toArray() {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    
    return nodes
  }

  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }
}
```

## 若干问题
> 以下问题均来自与[leetcode.com](https://leetcode.com/explore/learn/card/linked-list/)

1. 判断链表是否有环
> Given a linked list, determine if it has a cycle in it.

*快慢指针法*
想象有环的链表如一个跑道，若两个人同时起步跑，一人快一人慢，快跑的人则迟早会追上慢跑的人。按照这个原理，使用双指针遍历可以有效地判断出链表是否有环。
> If there is no cycle, the fast pointer will stop at the end of the linked list.
> If there is a cycle, the fast pointer will eventually meet with the slow pointer.

实现
```js
function hasCycle(head) {
  if (!head || !head.next) return false
  
  let fast = head
  let slow = head

  while (fast.next && fast.next.next) {
    // 快指针每次都多跑一步
    fast = fast.next.next
    slow = slow.next

    // 两者相遇则判断出有环
    if (fast === slow) {
      return true
    }
  }
  return false
}
```

2. 找出环入口
> Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

结合上一步的快慢指针法。假设已经找到快慢指针在环中重合的节点，那么将快指针步长与慢指针步长均设置为*1*。然后将慢指针指向head，从head开始跑。此时快慢指针均按统一的速度遍历，假如遇到环的入口，二者必将重合。

[canvas示意图](https://codepen.io/huiwang/pen/RjLORZ)

实现: 
```js
function detectCycle(head) {
  if (!head || !head.next) return null
  
  let fast = head
  let slow = head

  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) break
  }

  if (!fast || !fast.next) return null

  slow = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }
  return fast
}
```

3. 寻找链表节点

两链表有交点，则将第二个链表接在第一个链表尾部，必然会形成一个环。环的入口就是交点

实现
```js
const detectCycle = require('./detect-cycle')

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null

  let tailA = headA
  while (tailA && tailA.next) {
    tailA = tailA.next
  }
  tailA.next = headB

  // 从headA开始寻找环入口
  return detectCycle(headA)
}
```

4. 删除倒数第k个节点
设置双指针，第二个指针先走k步。以同样的步长循环链表，到后者指针到达链表尾节点，则前者即是所求

```js
function removeNode(head, n) {
  let first = head
  let second = head
  let count = 0

  while (count < n) {
    second = second.next
    count ++
  }
  
  while (second.next) {
    first = first.next
    second = second.next
  }

  let temp = first.next
  first.next = first.next.next
  temp.next = null
}
```

5. 反转单链表
核心是循环链表，将节点的next指向前一个节点

```js
function reverseList(head) {
  let prev = null
  let current = head

  while (current !== null) {
    let temp = current.next//缓存下一个节点
    current.next = prev//next指针指向上一个节点
    prev = current//更新上一个节点为当前节点，待下个循环读取
    current = temp//待下一个循环读取
  }

  return prev
}
```