const pathSum = function(root, sum) {
  if (!root) return false

  if (!root.left && !root.right && root.value === sum) return true

  return pathSum(root.left, sum - root.value) || pathSum(root.right, sum - root.value)
}

module.exports = pathSum

/**
 * demo
 */
// const root = new BinarySearchTreeNode(5)

// root.left = new BinarySearchTreeNode(4)
// root.right = new BinarySearchTreeNode(8)
// root.left.left = new BinarySearchTreeNode(11)
// root.left.left.right = new BinarySearchTreeNode(2)
// root.right.left = new BinarySearchTreeNode(12)
// root.right.right = new BinarySearchTreeNode(8)

// console.log(pathSum(root, 22));