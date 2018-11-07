# 索引签名

## 背景
在`javascript`中，索引的对象将会被执行`toString`方法。索引均为字符串。

## 索引类型
在`typescript`中索引类型包括以下几种:
- string: 字符串字面量
- number: 数字字面量
- symbol

## 索引声明的几种形式
- 一组有限的字符串字面量:
```js
type Weekday = 'Monday' | 'Tuesday' | 'Wednesday';

type DayCount = {
  [key in Weekday]?: number
};
const dayCount: DayCount = {
  Monday: 1,
  Tuesday: 2,
};
```
- 字符串索引签名最为严格，所有成员必须符合字符串索引签名
```js
interface ArrStr {
  [key: string]: string | number; // 必须包括所用成员类型
  [index: number]: string; // 字符串索引类型的子级
  // example
  length: number;
}
```

## 索引签名的嵌套
- 滥用索引签名
滥用索引签名将会使属性签名的拼写错误检查失效
```js
interface NestedCSS {
  color?: string;
  [selector: string]: string | NestedCSS;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
};
const failsSilently: NestedCSS = {
  colour: 'red' // 'colour' 不会被捕捉到错误
};
```
- 应该使用嵌套的索引签名
```js
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: string | NestedCSS;
  }
}
```
- 使用交叉类型解决索引签名不兼容的问题
由于所有成员都必须符合字符串索引签名，因此有可能会出现以下问题
```js
type FieldState = {
  value: string;
};

type FromState = {
  isValid: boolean; // Error: 不符合索引签名
  [filedName: string]: FieldState;
};
```
这个时候可以用**交叉类型**来解决
```js
type FieldState = {
  value: string;
};

type FromState = { isValid: boolean } & { [filedName: string]: FieldState };
```
**注意**，使用交叉类型得出的新类型只能用于声明一个已存在的`typescript`类型，而不能用来创建对象
```js
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };

const bar: FormState = {
  // 'isValid' 不能赋值给 'FieldState'
  isValid: false,
  name: {
    value: 'aa',
  }
};
```