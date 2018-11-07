# 迁移
## 几个方法
1. 使用any减少错误
2. 面对第三方库，可以引入模块声明文件`yarn add @types/jquery`或者直接声明某个模块`declare module 'jquery'`
3. 一旦安装`@types/jquery`后，就可以:
  - 全局引用
  - 模块引用: `import * as $ from 'jquery'`
  - 在`compilerOptions.types`中控制全局`@types`
3. 引入额外资源
```js
declare module '*.css';
declare module '*.html';
```

## 环境声明
环境声明的用意在于，告诉`typescript`，我正在表述一个在其他地方已经存在的代码。
环境声明可以在`.ts`文件或者`.d.ts`文件中使用，但推荐后者。
在使用`.d.ts`文件时，意味着每个顶级声明必须使用`declare`关键字为前缀。这有利于向作者说明，在这里 TypeScript 将不会把它编译成任何代码，同时他需要确保这些在编译时存在。