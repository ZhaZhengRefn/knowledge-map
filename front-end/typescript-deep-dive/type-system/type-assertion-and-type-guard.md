# 类型断言
类型断言并不完全安全。而且由于有可能与`jsx`的语法冲突，最好才有`as`语法。
但类型断言在某些场景还是比较实用的，例如当使用者了解更为具体的类型时:
```js
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}
```
但如果想要改变类型，由于存在参数注解，因此需要双重断言:
```js
function handler(event: Event) {
  const mouseEvent = (event as any) as HTMLElement;
}
```

# 类型保护
类型保护存在以下几种:
- typeof关键字
- instanceof关键字
- in操作符
- 字面量类型保护
在联合类型中，使用字面量类型时
```js
type Foo = {
  // here !!!
  kind: 'foo';
  foo: number;
}
type Bar = {
  // here !!!
  kind: 'bar';
  bar: number;
}
function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    console.log(`this is foo`);
  } else {
    console.log(arg.bar);
  }
}
```
- 自定义类型保护
```js
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}

// 用户自己定义的类型保护！
function isFoo(arg: Foo | Bar): arg is Foo {
  return (arg as Foo).foo !== undefined;
}
```