# 项目相关

## 声明空间
在`typescript`中，声明空间包括两部分:
- 类型声明空间:
如：
```js
type Foo = {
  bar: number;
}
interface InterfaceFoo {
  bar: number;
}
class Foo {}
```
- 变量声明空间
```js
let foo = 1;
let foo = function () {};
class Foo {}
```

## 模块

### 重写类型的动态查找
```js
// global.d.ts
declare module 'foo' {
  export function bar() {};
}
// ...
import * as foo from 'foo';
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```

### import/require 仅仅是引入类型
如题，假如变量命名空间并没有使用到引入的模块，那么编译之后依赖是不会存在的。
```js
// 编译前
import _foo = require('foo')

var foo: _foo = {};
```
```js
// 编译后
let foo = {};
```
在某些情况下需要确保引入模块，以保证其中的副作用会被执行，那么可能这样写。到底还是要在变量声明空间中保留其中的引用。
```js
import foo = require('foo')
import bar = require('bar')
import car = require('car')

const ensureImport: any = foo || bar || car;
```

## 命名空间
理解命名空间，理解其编译之后的代码。
```js
// before
namespace Util {
  export function log(msg: string) {
    console.log(msg);
  }
}
```
```js
// after
(function (Util){
  Util.log = function (msg) {
    console.log(msg);
  }
})(Util || Util = {})
```

## 动态引入表达式
`webpack`的`code splitting`使用了`import()`与`require.ensure()`语法。优先采用动态引入表达式`import()`。通过动态引入表达式可以异步加载某个模块。
```js
import(/* webpackChunkName: "momentjs" */ 'moment')
.then(moment => {
  const time = moment.format();
})
```
**注意**，需要将`tsconfig.json`中`compilerOptions`的`module`字段设置为`esnext`。