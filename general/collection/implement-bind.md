# `bind` 的实现

## 实现要点
1. 传入第一个参数为上下文，即 `this` 指向；
2. 执行 `bind` 导出新函数；
3. `bind` 函数传入参数与新函数的参数按先后拼接之后一起调用；
4. `bind` 返回的新函数假如作为构造函数使用，其中的 `this` 指向实例，而非传入的上下文。

## 具体实现
```js
Function.prototype.bind2 = function () {
    var context = arguments[0];
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    function bindFunc() {
      var restArgs = Array.prototype.slice.call(arguments, 0);
      return self.apply(this instanceof bindFunc ? this : context, args.concat(restArgs));
    };
    // 注意原型链修改为调用者的原型链
    bindFunc.prototype = this.prototype;
    return bindFunc;
}

var obj = {
    value: 'value-tag',
}

var bar = function foo(a, b) {
    this.child = 'child';
    console.log(this.value);
    console.log(a + b);
}.bind(obj, 1);

var barInstance = new bar(2);
// undefined
// 3
console.log(barInstance.child);
// child
```