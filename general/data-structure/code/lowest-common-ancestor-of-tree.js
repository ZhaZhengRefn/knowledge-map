const LCA = function(root, p, q) {
  if (root === null || root.value === p || root.value === q) {
    return root
  }
  const left = LCA(root.left, p, q)
  const right = LCA(root.right, p, q)
  // 节点不在左子树，LCA必定在右子树
  if (left === null) {
    return right
  }
  // 节点不在右子树，LCA必定在左子树
  if (right === null) {
    return left
  }
  // 节点位于左右子树，root为LCA
  return root
}

module.exports = LCA