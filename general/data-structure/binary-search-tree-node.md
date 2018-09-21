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

# 实现二叉搜索树的搜索节点功能
给节点增加find方法
```js
// ...
  find(value) {
    if (this.nodeValueComparator.equal(value)) {
      return this
    }

    if (this.nodeValueComparator.lessThan(value)) {
      return this.left.find(value)
    }

    if (this.nodeValueComparator.greaterThan(value)) {
      return this.right.find(value)
    }

    return null
  }
// ...
```

# 实现二叉搜索树的插入节点功能
早就实现了
```js
// ...
  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value
      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value)
      this.setLeft(newNode)
      return newNode
    }
    
    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value)
      this.setRight(newNode)
      return newNode
    }    
  }
// ...
```

# 实现二叉搜索树的删除节点功能
分三种情况：
1. 要删除的节点为叶节点: 直接删除
2. 要删除的节点具备一个子节点: 将子节点直接顶上，替换要删除的节点
3. 要删除的节点具备两个子节点: 寻找该节点右子树的最小值节点（即最左叶节点），将两者值替换，删除最小值节点
```js
  delete(value) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) return null

    // 叶节点
    if (!nodeToRemove.left && !nodeToRemove.right) {
      const parent = nodeToRemove.parent
      parent.left = parent.right = null
      return this
    }
    // 有一个子节点
    // 子节点直接替换要删除的节点
    if (!nodeToRemove.left || !nodeToRemove.right) {
      const position = nodeToRemove.left ? 'left' : 'right'
      const child = nodeToRemove.left || nodeToRemove.right
      const parent = nodeToRemove.parent
      parent[position] = child
      return this
    }
    // 有两个子节点
    // 寻找右子树中最小的节点，然后替换要删除的节点
    const successor = this.findMin(nodeToRemove.right)
    console.log(successor.value)
    nodeToRemove.value = successor.value
    const sParent = successor.parent
    sParent.left = null
    return this
  }

  findMin(node) {
    while (node && node.left) {
      node = node.left
    }
    return node
  }
```