# lib.d.ts
`lib.d.ts`是在全局命名空间中给一些常见的变量定义接口的文件。基本结构如下，以`window`对象为例子:
```js
declare var window: Window;
interface Window {
  // ...
  helloWorld(): void;
}
```
```js
// 运行时文件
window.helloWorld = () => {
  console.log('hello world.')
}
```

同理，通过在全局命名空间，为某些特定接口添加成员，可以扩展某些预设的对象。而进入全局命名空间有两种方法:
- 通过global.d.ts
- 声明全局命名空间:
```js
// 如：
// 确保文件是模块
export {};

declare global {
  interface Date {
    today(): number;
  }
}
```