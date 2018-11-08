# 单例模式

结合两个步骤可以做出单例模式
- 构造函数私有化
- 暴露获取单例的方法
```js
class Foo {
  // 暴露获取单例的方法
  public static getInstance(name: string): Foo {
    if (!Foo.instance) {
      Foo.instance = new Foo(name);
    }
    return Foo.instance;
  }
  // 储存单例的静态属性
  private static instance: Foo;
  private name: string;
  // 构造函数私有化
  private constructor(name) {
    this.name = name;
  }
}
```

使用时:
```js
const foo = new Foo('foo');// Error!
const foo = Foo.getInstance('foo');// ok!
```

使用命名空间或者模块也可以做出单例。

但单例被认为是不好的，因为单例看上去[有点像是全局](https://stackoverflow.com/questions/137975/what-is-so-bad-about-singletons/142450#142450)，甚至可以称为全局的别称。