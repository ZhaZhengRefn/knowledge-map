const maxDepth = function(root) {
  let depth = 0

  detect(root, 0)

  function detect(root, preDepth) {
    if (!root) return 

    if (depth < preDepth + 1) {
      depth = preDepth + 1
    }
    
    detect(root.left, preDepth + 1)
    detect(root.right, preDepth + 1)
  }
  return depth
}

module.exports = maxDepth