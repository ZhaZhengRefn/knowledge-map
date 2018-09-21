# 二叉搜索树

# 二叉搜索树节点实现
<!-- TODO -->

# 验证二叉搜索树
## 实现
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
## 实现
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
## 实现
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
## 实现
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
## 实现
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

# 使用二叉搜索树储存数据流，寻找第k大元素
>设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。

>你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。

## 示例
```js
int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
```
## 实现
```js
class Node {
  constructor(val) {
    this.count = 1
    this.value = val
    this.left = this.right = null
  }
}

class KthLargest {
  constructor(kth, nums) {
    this.kth = kth
    this.root = null
    nums.forEach(num => {
      this.root = this._add(this.root, num)
    })
  }

  _add(root, val) {
    if (!root) return new Node(val)
    root.count++//count代表该节点下具有多少子节点
    if (root.value > val) {
      root.left = this._add(root.left, val)
    } else {
      root.right = this._add(root.right, val)
    }
    return root
  }

  _find() {
    let walker = this.root
    let count = this.kth
    
    if (!walker) return null

    while (count > 0) {
      // 寻找count为特定值的节点
      const position = 1 + (walker.right ? walker.right.count : 0)
      if (count === position) break
      if (count > position) {
        count -= position
        walker = walker.left
      } else {
        walker = walker.right
      }
    }
    return walker.value
  }

  add(val) {
    this._add(this.root, val)
    return this._find()
  }
}
```