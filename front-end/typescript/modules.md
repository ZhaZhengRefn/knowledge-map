# 模块

## 导出
- 导出声明
```js
export interface Clock {
  tick(count: number): void;
}
```
- 导出语句
```js
export { ZipCodeValidator };
// 还可以对导出对象重命名
export { ZipCodeValidator as mainValidator };
```
- 重新导出
有时候我们需要扩展原有类（派生新类并以同样名称导出），可以使用重命名的导出语句。
```js
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
```
- 导出一个模块中的包裹的所有模块
```js
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator
```

## 导入
- 导入语句
```js
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```
- 重命名
```js
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```
- 以某命名空间导入
```js
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```
- 导入具有副作用的模块
```js
import "./my-module.js";
```

## 默认导出
```js
const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
  return s.length === 5 && numberRegexp.test(s);
}
```

## 支持commonjs的export
```js
// 导出语句
export = ZipCodeValidator;
```
```js
// 导入语句
import zip = require("./ZipCodeValidator");
```

## 动态模块加载
```js
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}
```