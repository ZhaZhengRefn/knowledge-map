/**
 * 递归法检查树是否对称
 * @param {node} r1 
 * @param {node} r2 
 */
const isMirrorWithRecursive = function(r1, r2) {
  if (r1 === null && r2 === null) return true
  
  if (r1 === null || r2 === null || r1.value !== r2.value) return false

  return isMirrorWithRecursive(r1.left, r2.right) 
    && isMirrorWithRecursive(r1.right, r2.left)
}

/**
 * 迭代检查树是否对称。使用两个栈做节点的比对
 * @param {node} r1 
 * @param {node} r2 
 */
const isMirrorIteratively = function(r1, r2) {
  const stack1 = [r1], stack2 = [r2]
  while (stack1.length > 0 || stack2.length > 0) {
    const cur1 = stack1.pop(), cur2 = stack2.pop()

    if (cur1 === null && cur2 === null) continue

    if (!cur1 || !cur2 || cur1.value !== cur2.value) return false

    stack1.push(cur1.left)
    stack1.push(cur1.right)

    stack2.push(cur2.right)
    stack2.push(cur2.left)
  }
  return true
}

module.exports = {
  isMirrorWithRecursive,
  isMirrorIteratively,
}

// demo
/**
 * 构造对称树
 */
// const root = new BinarySearchTreeNode(1)

// root.left = new BinarySearchTreeNode(2)
// root.right = new BinarySearchTreeNode(2)
// root.left.left = new BinarySearchTreeNode(3)
// root.left.right = new BinarySearchTreeNode(4)
// root.right.left = new BinarySearchTreeNode(4)
// root.right.right = new BinarySearchTreeNode(3)

// const result1 = isMirrorWithRecursive(root, root)
// const result2 = isMirrorWithRecursive(root, root)
// console.log(result1, result2)