# 名义化类型
`typescript` 是结构化类型系统，但是有些时候我们需要区分开结构相同的类型，这时候需要一些技巧。

## 使用字面量类型
通过泛型与字面量类型来解决。实际的结构仅仅为 `{ value: string }`。
优点是不需要类型断言，但坏处是需要特殊的结构 `{ type, value }`。
```js
type Id<T extends string> = {
  type: T;
  value: string;
}
// 特殊的类型
type FooId = Id<'foo'>;
type BarId = Id<'bar'>;

let foo: FooId;
let bar: BarId;

// 类型安全
foo = bar;// Error
bar = foo;// Error
```

## 使用枚举
因为枚举是与`number`在结构上兼容的，因此`number`无法应用上面的技巧。由于枚举在命名上有区别，则不兼容。因此可以利用这个特性来打破结构上的类型兼容。
步骤包括:
- 创建一个有命名含义的枚举
- 以这个枚举与实际的结构体，创建一个交叉类型
```js
enum FooIdBrand = {}
type FooId = FooIdBrand & string;

enum BarIdBrand = {}
type BarId = BarIdBrand & string;

let foo: FooId;
let bar: BarId;

// 赋值
fooId = 'foo' as FooId;
barId = 'bar' as BarId;
```

## 使用接口
使用接口需要将变量断言为`any`，个人觉得不妥。
```js
// FOO
interface FooId extends String {
  _fooIdBrand: string; // To prevent type errors
}

// BAR
interface BarId extends String {
  _barIdBrand: string; // To prevent type errors
}

let fooId: FooId;
let barId: BarId;

fooId = 'foo' as any;
barId = 'bar' as any;
```