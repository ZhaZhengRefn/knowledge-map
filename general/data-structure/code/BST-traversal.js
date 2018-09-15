/**
 * 前缀遍历
 */
const preorderTraversal = function (root) {
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
const inorderTraversal = function (root) {
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
const postorderTraversal = function (root) {
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

/**
 * 层次遍历：自顶向下
 * notice: 使用队列实现
 */
const levelOrderTraversal = function (root) {
  const wrap = []
  search(root, 1)

  function search(root, level) {
    if (!root) return
    if (wrap.length < level) {
      wrap.push([])
    }
    const cur = wrap[level - 1]
    cur.push(root.value)
    search(root.left, level + 1)
    search(root.right, level + 1)
  }
  return wrap
}
/**
 * 层次遍历：自底向上
 */
const levelOrderFromBottom = function(root) {
  const wrap = []
  search(root, 1)

  function search(root, level) {
    if (!root) return 
    if (wrap.length < level) {
      wrap.unshift([])
    }
    const cur = wrap[wrap.length - level]
    cur.push(root.value)

    search(root.left, level + 1)
    search(root.right, level + 1)
  }
  return wrap
}

module.exports = exports = {
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
  levelOrderFromBottom,
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