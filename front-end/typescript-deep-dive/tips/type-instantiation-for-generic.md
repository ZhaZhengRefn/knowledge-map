# 泛型的实例化类型
有时候我们想在类中传入一个泛型，并且复用传入泛型后的某个类。这个思路有点像 `currying` 。这里有两种方法。
我们以这个类为例子讨论:
```js
class Foo<T> {
  public foo: T;
}
```

1. 类型断言
```js
// 派生类
const FooNumber = Foo as { new(): Foo<number> };

// 验证
const _foo = new FooNumber();
const n: typeof _foo.foo = '1';// Error! 类型为 number
```

2. 继承
```js
class FooNumber extends Foo<number> {}

// 验证
const _foo = new FooNumber();
const n: typeof _foo.foo = '1';// Error! 类型为 number
```