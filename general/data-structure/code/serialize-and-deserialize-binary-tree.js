// BFS实现树的序列化与反序列化
const treeCoder = {
  serialize(root) {
    const wrap = []
    let str = ``
    if (root === null) return `n`

    wrap.push(root)
    while (wrap.length) {
      const node = wrap.shift()
      if (node === null) {
        str += ',n'
        continue
      }
      str += `,${node.value}`
      wrap.push(node.left)
      wrap.push(node.right)
    }
    return str.replace(/^,/, '')
  },
  deSerialize(str, fact = () => {}) {
    const values = str.split(',')
    const root = fact(values.shift())
    const nodes = [root]
    for (let i = 0; i < values.length; i++) {
      const parent = nodes.shift()
      if (values[i] !== 'n') {
        const left = fact(values[i])
        parent.left = left
        nodes.push(left)
      }
      if (values[++i] !== 'n') {
        const right = fact(values[i])
        parent.right = right
        nodes.push(right)
      }
    }
    return root
  },
}

module.exports = treeCoder