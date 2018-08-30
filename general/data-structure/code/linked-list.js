class LinkedNode {
  constructor(val, next) {
    this.value = val
    this.next = next
  }
}

export default class LinkedList {
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
    return this
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
}