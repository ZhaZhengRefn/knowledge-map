const BinaryTreeNode = require('./binary-tree-node')
const Comparator = require('./Comparator');

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value, compareFunction) {
    super(value)
    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
  }

  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value
      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value)
      this.setLeft(newNode)
      return newNode
    }
    
    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value)
      this.setRight(newNode)
      return newNode
    }    
  }
}

module.exports = exports = BinarySearchTreeNode