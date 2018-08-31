# 栈

## 概念
[栈即先进先出](https://user-gold-cdn.xitu.io/2018/5/20/1637b785d2d68735?w=640&h=460&f=png&s=6932)

## 实现
```js
class Stack {
    constructor() {
        this._size = 0
        this._stack = {}
    }
    push(ele) {
        const size = ++this._size
        this._stack[size] = ele
    }
    pop() {
        const ele = this._stack[this._size]
        delete this._stack[this._size]
        this._size--
        return ele
    }
    getCount() {
        return this._size
    }
    getStack() {
        return this._stack
    }
}
```

## 应用

### 题目
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 注意空字符串可被认为是有效字符串。

示例：
1. 输入: "()[]{}" | 输出: true
1. 输入: "()[{}]" | 输出: false

### 解答
```js
const right = `()[]{}`

const wrong = `()[{]}`

function check(input) {
  const map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3,
  }
  const stack = []
  for (let i = 0; i < input.length; i++) {
    const cur = input[i]
    if (map[cur] < 0) {
      stack.push(map[cur])
    } else {
      const isValid = map[cur] + stack.pop() === 0
      if (!isValid) {
        return false
      }
    }
  }
  return true
}

console.log(check(right))//true
console.log(check(wrong))//false
```