# 类型兼容性

## 开始
`typescript`的类型兼容性是基于结构子类型，只使用成员来描述类型。
其基本规则是，如果`x`要兼容`y`，那么`y`至少具有`x`上的相同属性。
```js
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```

## 从参数看比较两个函数
`typescript`允许忽略参数这种行为。因为这在js中非常常见。
```js
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

## 从返回值看比较两个函数
源函数的返回值必须是目标函数返回值的子类型
```js
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // OK
y = x; // Error, because x() lacks a location property
```

## 枚举
枚举类型与数字类型兼容。但不同枚举类型互相不兼容。
```js
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  // Error
```

## 类
比较两个类类型时，只会比较其实例成员，不包括静态部分和构造函数。
```js
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}
class Size {
    feet: number;
    constructor(numFeet: number) { }
}
let a: Animal;
let s: Size;
a = s;  // OK
s = a;  // OK
```
但需要注意的是，**私有成员和受保护成员会使两个类不兼容**。

## 泛型
比较泛型时，只会比较其结构使用类型参数。
```js
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```
```js
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible
```