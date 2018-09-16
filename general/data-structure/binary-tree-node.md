# 二叉树节点

## 二叉树节点的实现
<!-- TODO: -->

## 树的遍历
树的遍历主要运用的方法是递归。由于遍历的顺序有其特性，因为可以根据其中某个遍历找出根节点。已知根节点后根据其他一种遍历方式便可以知道左右子树是哪部分。三种遍历自有其用处。
1. 前序遍历
前序遍历首先访问*根节点*，然后遍历左子树，最后遍历右子树。
具体实现如下:
```js
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
```
2. 中序遍历
中序遍历首先访问左子树，再访问根节点，最后遍历右子树。
实现:
```js
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
```
3. 后序遍历
后序遍历首先遍历左子树，再遍历右子树，最后访问根节点。
实现:
```js
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
```

## 树的层序遍历
层序遍历主要运用到了队列这个数据结构
1. 自顶向下
实现:
```js
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
```
2. 自底向上
实现:
```js
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
```


## 若干问题

1. 求树的最大深度
> 给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。说明: 叶子节点是指没有子节点的节点。
实现思路与树的层序遍历类似:
```js
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
```

2. 判断树是否对称
> 给定一个二叉树，检查它是否是镜像对称的。例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
判断树是否对称，本质上仍然是判断节点是否相等，但判断的路线需要设计。
实现思路有两种:
- 递归法
两个参数均为树的根节点
```js
const isMirrorWithRecursive = function(r1, r2) {
  if (r1 === null && r2 === null) return true
  
  if (r1 === null || r2 === null || r1.value !== r2.value) return false

  return isMirrorWithRecursive(r1.left, r2.right) 
    && isMirrorWithRecursive(r1.right, r2.left)
}
```
- 迭代法
使用栈缓存所有需要比对的节点，当栈成功清空，则二叉树是对称的。
```js
const isMirrorIteratively = function(r1, r2) {
  const stack1 = [r1], stack2 = [r2]
  while (stack1.length > 0 || stack2.length > 0) {
    const cur1 = stack1.pop(), cur2 = stack2.pop()

    if (cur1 === null && cur2 === null) continue

    if (!cur1 || !cur2 || cur1.value !== cur2.value) return false

    stack1.push(cur1.left)
    stack1.push(cur1.right)

    stack2.push(cur2.right)
    stack2.push(cur2.left)
  }
  return true
}
```

3. 路径总和
计算出树的路径总和。
>给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。说明: 叶子节点是指没有子节点的节点。
本质上是比对最后衰减的值与叶节点的值是否相等
```js
const pathSum = function(root, sum) {
  if (!root) return false

  if (!root.left && !root.right && root.value === sum) return true

  return pathSum(root.left, sum - root.value) || pathSum(root.right, sum - root.value)
}
```

4. 根据中序遍历、后序遍历构造二叉树
> 根据一棵树的中序遍历与后序遍历构造二叉树。
实现思路主要是找出根节点、左子树、右子树。
- 根节点显然是后序遍历的最后一个节点。
- 左子树所有节点、右子树所有节点，可以以根节点为临界点。显然为中序遍历的左半部分与右半部分。
- 遍历至中序遍历数组长度为零为止
实现:
```js
const buildTreeWithPostorder = function(inorder, postorder) {
  if (!inorder.length || !postorder.length) return []

  const rootValue = postorder.slice(-1)[0]
  const root = new Node(rootValue)
  
  const index = inorder.indexOf(rootValue)
  
  const leftInorder = inorder.slice(0, index)
  const rightInorder = inorder.slice(index + 1)

  const leftPostorder = postorder.slice(0, leftInorder.length)
  const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1)

  root.left = leftInorder.length === 0 
    ? null 
    : buildTreeWithPostorder(leftInorder, leftPostorder)
  root.right = rightInorder.length === 0 
    ? null 
    : buildTreeWithPostorder(rightInorder, rightPostorder)
  return root
}
```