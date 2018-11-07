# 混入
由于`javascript`只能实现单向继承，因此不可以这样做:
```js
class User extends Tagged, Timestamped { // ERROR : 不能多重继承
  // ..
}
```
另一种方法即是混入，换句话说，以基类为基础混入新特性来构建出新类。
混入包括三个步骤:
- 传入一个构造函数
- 基于构造函数派生一个新类
- 输出新类

```js
// 构造函数类型
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor<{ name: string }>>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  }
}

class Foo {
  public name = 'foo';
}

const TimestampFoo = Timestamped(Foo);

const timestampFoo = new TimestampFoo();
console.log(timestampFoo.name);// foo
console.log(timestampFoo.timestamp);// such as: 1541584079467
```