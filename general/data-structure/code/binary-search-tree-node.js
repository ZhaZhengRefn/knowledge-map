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

  find(value) {
    if (this.value === value) {
      return this
    }

    if (this.value > value && this.left) {
      return this.left.find(value)
    }

    if (this.value < value && this.right) {
      return this.right.find(value)
    }

    return null
  }

  delete(value) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) return null

    // 叶节点
    if (!nodeToRemove.left && !nodeToRemove.right) {
      const parent = nodeToRemove.parent
      parent.left = parent.right = null
      return this
    }
    // 有一个子节点
    // 子节点直接替换要删除的节点
    if (!nodeToRemove.left || !nodeToRemove.right) {
      const position = nodeToRemove.left ? 'left' : 'right'
      const child = nodeToRemove.left || nodeToRemove.right
      const parent = nodeToRemove.parent
      parent[position] = child
      return this
    }
    // 有两个子节点
    // 寻找右子树中最小的节点，然后替换要删除的节点
    const successor = this.findMin(nodeToRemove.right)
    console.log(successor.value)
    nodeToRemove.value = successor.value
    const sParent = successor.parent
    sParent.left = null
    return this
  }

  findMin(node) {
    while (node && node.left) {
      node = node.left
    }
    return node
  }
}

module.exports = exports = BinarySearchTreeNode