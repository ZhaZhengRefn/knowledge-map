// 遍历每一层节点，以左子树节点为链表头，生产每个节点的右向指针
const nextRight = function(root) {
  let start = root
  while (start != null) {
    let cur = start
    if (start.next == null) start.next = null
    while (cur != null) {
      if (cur.left != null) {
        cur.left.next = cur.right
      }
      if (cur.right != null) {
        cur.right.next = cur.next != null ? cur.next.left : null
      }
      cur = cur.next
    }
    start = start.left
  }
  return root
}

module.exports = nextRight

/**
 * demo
 */

// const root = new BinarySearchTreeNode(13)

// root.insert(11)
// root.insert(10)
// root.insert(12)
// root.insert(14)

// nextRight(root)

// console.log(inorderTraversal(root, node => node.next ? node.next.value : null)); 