# Bind是有害的

## Bind的类型注解
`bind` 在 `lib.d.ts` 的定义为:
```js
bind(thisArg: any, ...argArray: any[]): any;
```
可见，直接使用 `bind` 将会不能保证类型安全。以下几种方法可以解决裸用 `bind` 带来的问题。

## 解决方法
此处均以这个类为例子:
```js
class Adder {
  constructor(public a: string) {
    this.a = a;
  }

  public add(b: string): string {
    return this.a + b;
  }
}
```
假如直接使用 `bind` ，则不会有任何报错。
```js
const adder = new Adder('foo');

const add = adder.add.bind(this);
add(1);// 没有错误
```

1. 给返回的函数重新做类型注解
```js
const adder = new Adder('foo');

const add: typeof adder.add = adder.add.bind(this);
add(1);// Error!
```

2. 使用箭头函数，而不用 `bind`
```js
class Adder {
  constructor(public a: string) {
    this.a = a;
  }

  public add = (b: string): string => {
    return this.a + b;
  }
}
```
```js
const adder = new Adder('foo');

const add = adder.add;
add(1);
```