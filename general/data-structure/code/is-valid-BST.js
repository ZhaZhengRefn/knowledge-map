// 中序遍历过程中判断当前节点是否比上一个节点的值要大，否则无效
const isValidBST = function(root) {
  const wrap = []
  function validate(node) {
    if (node.left && !validate(node.left)) {
      return false
    }

    wrap.push(node)
    if (wrap.length > 1) {
      const pre = wrap[wrap.length - 2], last = wrap[wrap.length - 1]
      if (last.value < pre.value) {
        return false
      }
    }

    if (node.right && !validate(node.right)) {
      return false
    }
    return true
  }
  return validate(root)
}

module.exports = isValidBST