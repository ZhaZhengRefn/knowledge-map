# 深克隆

## 一些会用到的util
```js
// 判断是否对象
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

// 传入深度与广度得出结果
const createData = function(deep, breath) {
  const root = {}
  let pointer = root
  for (let i = 0; i < deep; i++) {
    pointer = pointer.data = {}
    for (let j = 0; j < breath; j++) {
      pointer[j] = j
    }
  }
  return root
}
```


## 最初级解决方法-递归
```js
const clone = function(origin) {
  if (!isObject(origin)) return origin

  const root = {}
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      if (!isObject(origin[k])) {
        root[k] = origin[k]
      } else {
        root[k] = clone(origin[k])
      }
    }
  }
  return root
}
```
众所周知，递归容易爆栈🙂

## 迭代法-破解爆栈
对象其实竖着来看，就是一棵树。
我们可以用迭代树的思想去深克隆对象。
需要几个初始条件:
- 源对象、克隆对象
- 定义树节点: 包含父级对象、键、源对象值。由于键可能不存在，所以父级对象与键一并传入。
- 栈: 但目标值为对象时，构造一个节点对象，推入栈中。当栈长度不为零，则克隆。直到栈为空，克隆过程完成。
```js
const cloneLoop = function(origin) {
  const root = {}
  const stack = []
  const createNode = (parent, key, data) => ({ parent, key, data })
  stack.push(createNode(root, '', origin))

  while (stack.length) {
    const node = stack.pop()
    const { parent, key, data } = node
    // 扩展深度
    let pointer = key ? (parent[key] = {}) : parent
    // 遍历并复制当层键值对
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (!isObject(data[k])) {
          pointer[k] = data[k]
        } else {
          stack.push(createNode(pointer, k, data[k]))
        }
      }
    }
  }
  return root
}
```

## 缓存引用-破解循环引用
什么是循环引用：
```js
const target = {foo: 'bar'}
target.target = target
console.log(target)//{ foo: 'bar', target: [Circular] }
```

优化迭代法以解决循环引用，还需要点初始条件:
- 缓存对象引用的栈
- 当找到已被缓存的对象后，不作复制，直接返回缓存对象的引用

```js
const find => (list, data) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].source === data) {
      return list[i]
    }
  }
  return null
}

const cloneForce = function(origin) {
  const root = {}
  const stack = []
  const uniqueList = []//缓存已被复制过的数据
  const createNode = (parent, key, data) => ({ parent, key, data })
  stack.push(createNode(root, '', origin))

  while (stack.length) {
    const node = stack.pop()
    const { parent, key, data } = node
    // 扩展深度
    let pointer = key ? (parent[key] = {}) : parent

    const preserve = find(uniqueList, data)
    if (preserve) {
      parent[key] = preserver.target
      continue
    }
    uniqueList.push({
      source: data,//源数据，用于比对源数据是否相同，相同则返回target引用
      target: pointer,//保留当前引用，以留到后期赋值
    })

    // 遍历并复制当层键值对
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (!isObject(data[k])) {
          pointer[k] = data[k]
        } else {
          stack.push(createNode(pointer, k, data[k]))
        }
      }
    }
  }
  return root
}
```