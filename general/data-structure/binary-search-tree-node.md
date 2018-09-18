# 二叉搜索树

# 二叉搜索树节点实现
<!-- TODO -->

# 验证二叉搜索树
```js
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
```

# 实现二叉搜索树的迭代器
> 实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。

> 调用 ```next()``` 将返回二叉搜索树中的下一个最小的数。

> 注意: ```next()``` 和```hasNext()``` 操作的时间复杂度是O(1)，并使用 O(h) 内存，其中 h 是树的高度。
```js
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
```