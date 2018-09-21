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

module.exports = KthLargest