# 对象字面量的惰性初始化

## 背景
在 `javascript` 中，以下惰性初始化的写法非常多。
```js
let foo = {};
foo.bar = 123;
foo.bas = 'Hello World';
```
但是显然由于 `foo` 的类型为 `{}`，因此在 `typescript` 中会报错。

## 解决方案
- 在初始化的时候就已经带上本该有的 `key`，避免追加 `key-value`
- 将 `foo` 类型断言为 `any`
- 将 `foo` 断言为某个接口（推荐）。
```js
interface Foo {
  bar: number;
  bas: string;
}
let foo = {} as Foo;
foo.bar = 123;
foo.bas = 'Hello World';
```
使用接口可以方便撰写文档，还具备类型安全的特性。