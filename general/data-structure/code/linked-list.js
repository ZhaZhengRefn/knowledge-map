class LinkedNode {
  constructor(val, next = null) {
    this.value = val
    this.next = next
  }
  toString(callback) {
    return typeof callback === 'function' ? callback(this.value) : `${this.value}`
  }
}

module.exports = exports = class LinkedList {
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