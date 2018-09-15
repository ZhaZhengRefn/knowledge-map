const Comparator = require('./Comparator')

class BinaryTreeNode {
  constructor(value) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value

    this.nodeComparator = new Comparator()
  }

  setValue(value) {
    this.value = value
    return this
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null
    }

    this.left = node

    if (node) {
      this.left.parent = this
    }
    return this
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null
    }

    this.right = node

    if (node) {
      this.right.parent = this
    }
    return this
  }

  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }

    return false
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }

    return false    
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }
  
  traverseInOrder() {
    let traverse = []

    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder())
    }

    traverse.push(this.value)

    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder())
    }

    return traverse
  }

  toString() {
    return this.traverseInOrder().toString()
  }
}

module.exports = BinaryTreeNode