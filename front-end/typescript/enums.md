# 枚举

## 数字枚举
数字会以`1`自增长
- 带初始化器
```js
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```
- 不带初始化器时，以`0`为初始化值
```js
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

## 字符串枚举
字符串枚举没有
```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

## 异构枚举
可以混合字符串与数字，但不建议
```js
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

## 计算成员与常量成员
```js
enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}
```

## 字面量枚举成员
字面量枚举成员即:
1. 不带有初始值的常量枚举成员;
2. 任何字符串字面量，如:`foo`;
3. 任何数字字面量，如:`1`;
4. 应用了一元`-`符号的数字字面量，如:`-1`;

字面量枚举成员有以下两种表现:
- 枚举成员成为了类型
```js
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
  //    ~~~~~~~~~~~~~~~~ Error!
  radius: 100,
}
```
- 枚举类型变成了枚举成员的类型的联合
通过联合枚举，编译器可以避免一些错误
```js
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
      //             ~~~~~~~~~~~
      // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
  }
}
```

## 运行时枚举
- 枚举对象是存在于运行时的
```js
enum E {
  X, Y, Z,
}
function echoX(obj: { X: number }) {
  return obj.X;
}
echoX(E);// works
```
- 数字枚举成员会具有**反向映射**的特性，从枚举值到枚举成员。注意，字符串枚举成员不存在**反向映射**。
```js
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```
以上代码会编译成
```js
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```

## 常量枚举
常量枚举不同于运行时枚举。因为常量枚举不包含**计算成员**，常量枚举可以在编译后删除。
```js
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```
会编译为
```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## 外部枚举
```js
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```