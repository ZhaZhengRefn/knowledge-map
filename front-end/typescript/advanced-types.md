# 高级类型

## 交叉类型
通常在混入模式中可以会使用到交叉类型
```js
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}
```

## 联合类型
注意一点，联合类型只能用其中共有的成员。
```js
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```

## 类型保护
1. 权宜之计--类型断言
如联合类型之上那部分代码，假如我们迫切希望知道该类型为`Fish`并使用`swim`接口，那就需要使用**类型断言**了。
```js
let pet = getSmallPet();

// 每一个成员访问都会报错
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
```
使用类型断言后
```js
let pet = getSmallPet();

if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
}
else {
  (<Bird>pet).fly();
}
```
2. 自定义类型保护
假如我们想**一旦判断出当前类型之后**其他每个分支都知道对象的类型呢？
那么就需要借助*类型保护*机制了。
自定义一个类型保护，需要定义一个函数，其返回值为**类型谓词**。
```js
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
```
其中的`pet is Fish`即类型谓词，结构如`parameterName is Type`。`parameterName`为函数签名的一个参数名。
```js
if (isFish(pet)) {
  pet.swim();
}
else {
  // 一旦做过类型保护，其他分支就能知道该对象为什么类型
  // 在这里，非Fish即Bird，因此这里可以调用fly接口
  pet.fly();
}
```
3. `typeof`类型保护
`typescript`会在如下情况将`typeof`操作符识别为类型保护，方便用户操作。
- 表现形式: `typeof v === "typename"` || `typeof v !== "typename"`
- typename必须为: `number` || `string` || `boolean` || `symbol`
```js
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```
4. `instanceof`类型保护
```js
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

## Nullable类型
默认情况下，编辑器认为`null`与`undefined`可以赋值给任何类型。在开启`--strictNullChecks`标记的情况下，声明一个变量将不会自动包含`null`与`undefined`。`typescript`会对`null`与`undefined`当作不同的类型来对待。
- 可选参数与可选属性
可选参数与可选属性会自动被添加`| undefined`
```js
function f(x: number, y?: number) {
  return x + (y || 0);
}
```
- 类型保护
`nullable`的类型保护与js语法一致:
```js
function f(sn: string | null): string {
  if (sn == null) {
      return "default";
  }
  else {
      return sn;
  }
}
```
或使用短路操作符
```js
function f(sn: string | null): string {
    return sn || "default";
}
```
- 类型断言
若嵌套函数引用了上一级作用域的变量，`typescript`是无法跟踪嵌套函数的调用，因此也不能捕捉其类型保护的。类似的情况需要**类型断言**。
`nullable`的类型断言语法为，在标识符后添加`!`号，即`identifier!`，以去除`null`与`undefined`
```js
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

## 类型别名
类型别名与接口很像。但是类型别名可以支持*原始值*、*联合类型*与*元祖*。
- 基本使用
```js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  }
  else {
    return n();
  }
}
```
- 泛型
类型别名也可以是泛型
```js
type Container<T> {
  value: T;
}
```
- 引用自己
如树节点
```js
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}
```
- 跟交叉类型一起使用
如链表节点
```js
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string;
}
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```
- 类型别名与接口的区别
1. 接口会创建一个新名字，而接口不会。
```js
type Alias = { num: number };
interface Interface {
  num: number;
}
```
如上代码，`Alias`只是代表对象字面量，而`Interface`切实是接口`Interface`
2. 类型别名不能被`extends`或`implements`
3. 若需要使用联合类型和元祖，那么应该使用类型别名

## 字符串字面量类型
- 与联合类型、类型别名与类型保护的配合
```js
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
```
- 区分函数重载:
```js
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```

## 数字字面量类型
与字符串字面量类型类似

## 可辨识联合(Discriminated Unions)
（不知道有什么卵用，为啥定义这个类型）
可辨识联合必须具备三个要素:
1. 可辨识的特征: 普通的单例属性类型;
2. 联合: 使用类型别名来联合多个类型;
3. 类型保护;
```js
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
```
其中`kind`即可辨识的特征
```js
type Shape = Square | Rectangle | Circle;
```
使用类型别名配合联合类型
```js
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```
类型保护

## this类型
有了`this`类型，可以很方便地实现链式调用
```js
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```

## 索引类型
```js
interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
```
- 索引类型查询操作符
`keyOf`: `keyof T`表示`T`上已知的公共属性名的联合，如:
```js
let personProps: keyof Person; // 'name' | 'age'
```
索引类型查询操作符比起直接写联合类型的好处，就好比遍历`key`跟硬编码`key`
- 索引访问操作符
`T[K]`: 类型语法反映了表达式语法，即访问其索引对应的值

以下代码结合两种操作符来使用:
```js
// 改写以下这段代码
function pluck(o, names) {
    return names.map(n => o[n]);
}
```
```js
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```
- 字符串索引签名
```js
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```

## 映射类型
映射类型的目的在于，在旧类型中映射出新类型。
1. 语法:
其内部使用了`for...in`
```js
// 从简单的映射类型看语法
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```
其中包括了三部分:
  1. 类型变量`K`，依次绑定每个属性;
  2. *字符串字面量*联合的Keys，包含了所有要被迭代的属性名;
  3. 属性的结果类型;
2. 常见用途:
当我们拥有基本的`Person`类型:
```js
interface Person {
  name: string;
  age: number;
}
```
需要转换为`readonly`的属性时:
```js
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
type ReadonlyPerson = Readonly<Person>;
```
同理，转换为可选属性时:
```js
type Partial<T> = {
  [P in keyof T]?: T[P];
}
type PersonPartial = Partial<Person>;
```
3. 另外还有更多预定义的有条件类型，如:
```js
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void
```