# 队列

## 概念
[队列即先进后出](https://user-gold-cdn.xitu.io/2018/5/20/1637cba2a6155793?w=640&h=419&f=png&s=15737)
队列实现主要分顺序队列与循环队列。循环队列主要是为了解决[假溢出](http://blog.longjiazuo.com/archives/4203)的问题。

## 实现

### 顺序队列
实现非常简单，带数组的shift与push方法即可

### 循环队列
1. 未带扩容功能的循环队列实现
```js
class SqQueue {
  constructor(length) {
    this.queue = new Array(length)
    this.first = 0
    this.last = 0
    this.size = 0
  }
  enQueue(item) {
    this.queue[this.last] = item
    this.last = (this.last + 1) % this.getLength()
    this.size++
  }
  deQueue(item) {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }    
    const r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.getLength()
    this.size--
    return r
  }
  isEmpty() {
    return this.first === this.last
  }  
  getSize() {
    return this.size
  }
  getLength() {
    return this.queue.length
  }
}
```
循环队列的特点在于储存单元的循环利用。
```js
const q = new SqQueue(3)
q.enQueue('a')
q.enQueue('b')
q.enQueue('c')
// [ 'a', 'b', 'c' ]
q.enQueue('d')
// [ 'd', 'b', 'c' ]
```
2. 增加扩容与缩容功能的循环队列
```js
class SqQueue {
  constructor(length) {
    this.queue = new Array(length)
    this.first = 0
    this.last = 0
    this.size = 0
  }
  enQueue(item) {
    // 扩容
    // 为了防止数组越界而做这样的操作 % this.queue.length
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2)
    }    
    this.queue[this.last] = item
    this.last = (this.last + 1) % this.getLength()
    this.size++
  }
  deQueue(item) {
    const r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.getLength()
    this.size--
    // 缩容: 在队列空间等于总长度四分之一时
    // 且不为 2 时缩小总长度为当前的一半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }    
    return r
  }
  getSize() {
    return this.size
  }
  getLength() {
    return this.queue.length
  }
}
```