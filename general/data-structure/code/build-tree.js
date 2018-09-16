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

const buildTreeWithPreorder = function(inorder, preorder) {
  if (!inorder.length || !preorder.length) return []

  const rootValue = preorder[0]
  const root = new Node(rootValue)
  debugger
  const index = inorder.indexOf(rootValue)
  
  const leftInorder = inorder.slice(0, index)
  const rightInorder = inorder.slice(index + 1)

  const leftPreorder = preorder.slice(1, leftInorder.length + 1)
  const rightPreorder = preorder.slice(leftInorder.length + 1, preorder.length)

  root.left = leftInorder.length === 0 
    ? null 
    : buildTreeWithPreorder(leftInorder, leftPreorder)
  root.right = rightInorder.length === 0 
    ? null 
    : buildTreeWithPreorder(rightInorder, rightPreorder)
  return root  
}

module.exports = {
  buildTreeWithPostorder,
  buildTreeWithPreorder,
}

/**
 * demo 
 */
// const root = new BinarySearchTreeNode(13)

// root.insert(11)
// root.insert(10)
// root.insert(12)
// root.insert(14)

// const newPostTree = buildTreeWithPostorder([ 10, 11, 12, 13, 14 ],[ 10, 12, 11, 14, 13 ])
// const newPreTree = buildTreeWithPreorder([ 10, 11, 12, 13, 14 ],[ 13, 11, 10, 12, 14 ])
// console.log(levelOrderTraversal(newPostTree))
// console.log(levelOrderTraversal(newPreTree))
// console.log(inorderTraversal(newPostTree));
// console.log(inorderTraversal(newPreTree));