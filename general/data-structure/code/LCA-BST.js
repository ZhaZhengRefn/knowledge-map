const LCA = function(root, p, q) {
  if (!root) return null

  if (root.value < p && root.value < q) {
    return LCA(root.right, p, q)
  }
  if (root.value > p && root.value > q) {
    return LCA(root.left, p, q)
  }
  return root
}

module.exports = LCA