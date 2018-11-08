# `export default` 被认为是有害的

## 背景
常见的`default`场景如下:
```js
class Foo {}
export default Foo;
```
```js
import Foo from './foo'
```

## 带来的问题
1. 重构之后的变量，在引入的时候并不会警告使用者**重命名**；
2. 假如没有默认导出，导入的脚本也不会报错。因此**无法获知是否有导出**；
3. 导入变量名不统一；
```js
// 有的导入者可能这样命名
import foo from './foo'
// 有的可能这样命名
import Foo from './foo'
```
4. 与 `commonjs` 互用时，会造成一些习惯上的差异；
```js
const { default } = require('./foo')
```
5. 动态导入时同理；
```js
// ...
const HighChart = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
Highcharts.default.chart('container', { ... }); // Notice `.default`
```