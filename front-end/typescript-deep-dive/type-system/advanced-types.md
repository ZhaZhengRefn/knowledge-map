# 高级类型

## 接口
- 可调用的接口
可以结合函数重载，举个例子:
```js
interface Overload {
  (source: string): string;
  (source: string[]): string[];
}
// 重载
function format(source: string): string;
function format(source: string[]): string[];
function format(source: any): any {
  if (typeof source === 'string') {
    return source.replace(/\*/g, '');
  }
  if (Array.isArray(source)) {
    return source.map((s: string) => s.replace(/\*/g, ''));
  }
  return source;
}
// 使用接口
const formatFunc: Overload = format;
```
- 可实例化的接口
```js
interface Ctor {
  new (): string;
}
```

## 枚举
- 有静态方法的枚举
有静态方法的枚举可以通过`enum`关键字与`namespace`关键字构造出来。
```js
enum Foo {
  bar,
  bas,
}
namespace Foo {
  export function getValue(value: Foo) {
    if (value === Foo.bar) {
      console.log(`this is bar`);
    } else {
      console.log(`this is bas`);
    }
  }
}
```
- 枚举具有反向映射的特性
```js
// before
enum Weekday {
  Monday,
  Tuseday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
```
```js
// after
var Weekday;
(function(Weekday){
  Weekday[(Weekday['Monday'] = 0)] = `Monday`;
  Weekday[(Weekday['Tuseday'] = 1)] = `Tuseday`;
  Weekday[(Weekday['Wednesday'] = 2)] = `Wednesday`;
  Weekday[(Weekday['Thursday'] = 3)] = `Thursday`;
  Weekday[(Weekday['Friday'] = 4)] = `Friday`;
  Weekday[(Weekday['Saturday'] = 5)] = `Saturday`;
  Weekday[(Weekday['Sunday'] = 6)] = `Sunday`;
})(Weekday || Weekday = {})
```

## 函数
函数基本的类型注解包括:
- 参数注解
- 返回类型注解
- 重载:
一个比较重要的特性是**重载**。其常见场景是某个函数具有变参的特性，即按不同格式的参数执行不同的逻辑甚至返回不同的参数。需要注意的是，重载的类型需要有一种实现兼容其他各种的实现。
```js
function format(source: string): string;
function format(source: string[]): string[];
// 注意兼容
function format(source: any): any {
  if (typeof source === 'string') {
    return source.replace(/\*/g, '');
  }
  if (Array.isArray(source)) {
    return source.map((s: string) => s.replace(/\*/g, ''));
  }
  return source;
}
```

## 字面量类型
字面量也能作为一种类型，如:
```js
let foo: 'Hello';
foo = 'Bar'; // Error: 'bar' 不能赋值给类型 'Hello'
```
单个使用的场景不多，但是可以结合联合类型使用：
```js
type CardinalDirection = 'North' | 'East' | 'South' | 'West';
```

## 泛型
泛型的意义在于**给成员提供约束**，假如没有想清楚泛型是为了解决什么，往往使用泛型是有问题的。
举例子，实现一个队列:
```js
class Queue {
  private data = [];
  push = item => this.data.push(item);
  pop = this.data.shift;
}
```
使用泛型后
```js
class Queue <T> {
  private data: T[] = [];
  public push = (item: T) => this.data.push(item);
  public pop = (): T | undefined => this.data.shift();
}
```