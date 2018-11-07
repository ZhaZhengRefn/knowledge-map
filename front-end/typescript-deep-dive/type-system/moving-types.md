# 流动的类型
类型系统的类型非常灵活，有点类似于`javascript`中的引用类型。
明确变量命名空间与类型命名空间，那么就可以灵活捕获各种类型了。

- 捕获类的类型
利用`declare`关键字将类`Foo`引入至类型命名空间，才可以捕获类的类型。
```js
class Foo {
  public add() {
    console.log(1);
  }
}
declare let _foo: Foo;
const bar: typeof _foo = {
  add() {
    console.log(1);
  },
};

export default bar;
```

- 捕获类成员的类型
同上也可以捕获类的成员的类型。
```js
class Foo {
  public add() {
    console.log(1);
  }
}
declare let _foo: Foo;
const bar: typeof _foo.add = function add() {
  console.log(1);
};

export default bar;
```

- 捕获变量的类型
使用`typeof`操作符可以捕获变量的类型。
```js
let foo = 123;
const bar: typeof foo = 345;
```
但是需要注意的是，使用`let`或者`const`会给变量带来不同的类型；
```js
const foo = 123;//类型为123
const foo: number = 123;//类型为number
let foo = 123;//类型为number
```

- 捕获键的名称
```js
const foo = {
  red: 1,
  blue: 2,
};
type Colors = keyof typeof foo;
let bar: Colors = 'red';
bar = 'pink';//error，类型为'red' | 'blue'

export default bar;
```