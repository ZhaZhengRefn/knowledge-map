// 要求空间复杂度为树的高度
/**
 * 实现思路:
 * 1. 中序遍历可以得出递增的一个节点队列
 * 2. 可以认为左叶节点、节点本身、右子树为一个循环
 * 3. 将左叶节点推入栈内。依次进行遍历左节点，根节点，递归右子树的左叶节点、根节点……
 * 4. 直到遍历至根节点为止
 */
const iterator = function(root) {
  const stack = []
  function pushAll(node) {
    while (node) {
      stack.push(node)
      node = node.left
    }
  }
  pushAll(root)
  return {
    next() {
      const node = stack.pop()
      if (node.right) {
        pushAll(node.right)
      }
      return node
    }
  }
}

module.exports = iterator

/**
 * demo
 */

// const root = new BinarySearchTreeNode(13)

// root.insert(11)
// root.insert(10)
// root.insert(12)
// root.insert(14)

// const i = iterator(root)
// Array.from({ length: 5 }).forEach(() => {
//   const node = i.next()
//   console.log(node ? node.value : null);
// })