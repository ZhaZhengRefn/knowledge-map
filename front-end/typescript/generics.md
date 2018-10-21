# 泛型

## 应用场景
当参数类型未知时，我们可能想要这样的效果: 获取某类型的参数，并且返回该类型的参数。
在没有使用泛型时，可能会这样做：
```js
function echo (arg: any): any {
  return arg;
}
```
而使用`any`的明显缺陷是，输入与输出的类型并不一致，完全可以输入`string`输出`number`
但使用类型变量`<T>`，泛型函数后:
```js
function echo <T>(arg: T): T {
  return arg;
}
```

## 泛型类型
```js
function echo <T>(arg: T): T {
  return arg;
}
let myEcho: <T>(arg: T) => T = echo;
```

## 泛型接口
泛型接口有两种写法，一种将类型变量应用于某成员，一种抽离类型变量至整个接口从而使所有成员均可以使用该泛型接口
```js
interface genericEcho {
  <T>(arg: T) => T;
}
function echo <T>(arg: T): T {
  return arg;
}
let myEcho: genericEcho = echo;
```

```js
interface GenericEcho<T> {
  (arg: T) => T;
}
function echo <T>(arg: T): T {
  return arg;
}
let myEcho: GenericEcho<number> = echo;
```

## 泛型类
与泛型接口类似
```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型约束
假如echo函数添加一局语句读取参数的`length`属性
```js
function echo <T>(arg: T): T {
  alert(arg.length);
  return arg;
}
```
那么必然是有问题的，因为不是任何类型都具有`length`属性。这个时候需要添加泛型约束
```js
interface Lengthwise {
  length: number;
}
function echo <T extends Lengthwise>(arg: T): T {
  alert(arg.length);
  return arg;
}
```