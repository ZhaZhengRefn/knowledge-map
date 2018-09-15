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

  append(value) {
    const newNode = new DoublyLinkedNode(value)

    // 链表为空时
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
      return this
    }

    // 链表不为空时
    this.tail.next = newNode
    newNode.prev = this.tail
    this.tail = newNode
    return this
  }

  delete(value) {
    if (this.head === null) return null

    let deletedNode = null
    let currentNode = this.head

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode
        // 当删除头部时
        if (deletedNode === this.head) {
          this.head = deletedNode.next
          if (this.head) {
            this.head.prev = null
          }
          // 当从头到尾所有节点具有一样的value时，整个链表都会删除，这个时候需要更新尾节点
          if (deletedNode === this.tail) {
            this.tail = null
          }
        // 当删除尾部时
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.prev
          this.tail.next = null
        // 当删除中间节点时
        } else {
          const prevNode = deletedNode.prev
          const nextNode = deletedNode.next
          prevNode.next = nextNode
          nextNode.prev = prevNode
        }
      }

      currentNode = currentNode.next
    }
    return deletedNode
  }

  deleteTail() {
    if (this.tail === null) return null

    // 若链表只有一个节点
    if (this.head === this.tail) {
      const deletedTail = this.tail

      this.head = null
      this.tail = null
      
      return deletedTail
    }

    const deletedTail = this.tail
    this.tail = this.tail.prev
    this.tail.next = null

    return deletedTail
  }

  deleteHead() {
    if (this.head === null) return null

    const deletedHead = this.head

    // 若链表只有一个节点
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
    } else {
      // 若链表具有多个节点
      this.head = this.head.next
      this.head.prev = null      
    }

    return deletedHead
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