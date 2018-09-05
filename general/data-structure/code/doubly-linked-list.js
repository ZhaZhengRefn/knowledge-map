const Comparator = require('./Comparator')
/**
 * 双向链表节点
 */
class DoublyLinkedNode {
  constructor(value, next = null, prev = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }

  toString(callback) {
    return typeof callback === 'function' ? callback(this.value) : `${this.value}`
  }
}

/**
 * 双向链表
 */
class DoublyLinkedList {
  constructor(comparatorFunction) {
    this.head = null
    this.tail = null

    this.compare = new Comparator(comparatorFunction)
  }

  prepend(value) {
    const newNode = new DoublyLinkedNode(value, this.head)

    // 链表为空时
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
      return this
    }
    
    // 链表不为空时
    this.head.prev = newNode
    this.head = newNode
    return this
  }

  toArray() {
    const nodes = []
    let current = this.head
    while (current) {
      nodes.push(current)
      current = current.next
    }
    return nodes
  }

  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }
}

module.exports = exports = DoublyLinkedList