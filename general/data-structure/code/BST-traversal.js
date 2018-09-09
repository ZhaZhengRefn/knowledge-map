/**
 * 前缀遍历
 */
const preorderTraversal = function(root) {
  let traverse = []

  traverse.push(root.value)

  if (root.left) {
    traverse = traverse.concat(preorderTraversal(root.left))
  }

  if (root.right) {
    traverse = traverse.concat(preorderTraversal(root.right))
  }

  return traverse
}

/**
 * 中缀遍历
 */
const inorderTraversal = function(root) {
  let traverse = []

  if (root.left) {
    traverse = traverse.concat(preorderTraversal(root.left))
  }

  traverse.push(root.value)

  if (root.right) {
    traverse = traverse.concat(preorderTraversal(root.right))
  }

  return traverse  
}

/**
 * 后缀遍历
 */
const postorderTraversal = function(root) {
  let traverse = []

  if (root.left) {
    traverse = traverse.concat(preorderTraversal(root.left))
  }

  if (root.right) {
    traverse = traverse.concat(preorderTraversal(root.right))
  }

  traverse.push(root.value)

  return traverse  
}

module.exports = exports = {
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
}

/**
 * demo
 * 
 */

// const BinarySearchTreeNode = require('./binary-search-tree-node')
// const {
//   preorderTraversal,
//   inorderTraversal,
//   postorderTraversal,
// } = require('./BST-traversal')

// const root = new BinarySearchTreeNode(3)
// const arr = [1, 2, 4]
// arr.forEach(key => {
//   root.insert(key)
// })

// const pre_res = preorderTraversal(root)
// const in_res = inorderTraversal(root)
// const post_res = postorderTraversal(root)

// console.log(pre_res, in_res, post_res);