# 类型兼容性

## 变体
变体是一个非常重要的概念。变体包括如下四种情况:
- 协变(Covariant): 仅在同一方向
- 逆变(Contravariant): 仅在相反方向
- 双向协变(Bivariant): 包括同一方向与相反方向
- 不变(Invariant): 如果类型不完全相同，那么他们就是不兼容的
1. 协变简介
初始条件为，我们拥有一个基类`Base`与一个子类`Child`，那么`Child`的实例可以赋值给类型为`Base`的变量。
2. 理解协变与逆变
[理解协变与逆变](https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance)
函数参数为逆变，返回类型则是协变。因此假如`Animal`派生`Dog`，`Dog`派生`Greyhound`，那么`Animal → Greyhound`函数是`Dog → Dog`函数的子类。
(Animal → Greyhound) ≼ (Dog → Dog)
另外文章还提到不变(Invariant)的场景，如:List<Dog>
3. `typescript`中函数的兼容性
在`typescript`中，函数参数是逆变的，而返回结果是协变的。原因在于，在`javascript`中，函数参数少传的情况非常常见，因此函数参数的类型兼容可以认为是逆变的。而返回结果在正常情况下则是协变的。
注意，`typescript 2.6`之前的版本，函数参数是双向协变的，用于解决常见的事件处理方案，但后面的版本假如开启了`--strict`选项，则是逆变的。
```js
interface Event {
  timestamp: number;
}
interface MouseEvent extends Event {
  x: number;
  y: number;
}
interface KeyEvent extends Event {
  keyCode: number;
}

// 简单的事件监听
enum EventType {
  Mouse,
  Keyboard
}
function addEventListener(eventType: EventType, handler: (n: Event) => void) {
  // ...
}

// 不安全，但是有用，常见。函数参数的比较是双向协变。
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// 在安全情景下的一种不好方案
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// 仍然不允许明确的错误，对完全不兼容的类型会强制检查
addEventListener(EventType.Mouse, (e: number) => console.log(e));
```

## 兼容性需要注意的几点
1. 来自不同枚举的枚举变量互相不兼容
2. ts采用结构化类型系统，只要成员类型一致即可。但是类的兼容性需要注意两点，类的类型只会比对实例成员、私有或保护成员会影响兼容性。
3. 泛型只有在至少有一个成员使用时才会影响兼容性。
3. 数组要兼容，不变(Invariant)是唯一的选择。