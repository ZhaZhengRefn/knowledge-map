const Node = require('./binary-search-tree-node')

const buildTreeWithPostorder = function(inorder, postorder) {
  if (!inorder.length || !postorder.length) return []

  const rootValue = postorder.slice(-1)[0]
  const root = new Node(rootValue)
  
  const index = inorder.indexOf(rootValue)
  
  const leftInorder = inorder.slice(0, index)
  const rightInorder = inorder.slice(index + 1)

  const leftPostorder = postorder.slice(0, leftInorder.length)
  const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1)

  root.left = leftInorder.length === 0 
    ? null 
    : buildTreeWithPostorder(leftInorder, leftPostorder)
  root.right = rightInorder.length === 0 
    ? null 
    : buildTreeWithPostorder(rightInorder, rightPostorder)
  return root
}

module.exports = {
  buildTreeWithPostorder,
}

/**
 * demo 
 */
// const root = new BinarySearchTreeNode(13)

// root.insert(11)
// root.insert(10)
// root.insert(12)
// root.insert(14)

// const newTree = buildTreeWithPostorder([ 10, 11, 12, 13, 14 ],[ 10, 12, 11, 14, 13 ])
// console.log(levelOrderTraversal(newTree))
// console.log(inorderTraversal(newTree));