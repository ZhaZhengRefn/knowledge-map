# `call` 与 `apply` 的实现

## `call` 
需要实现以下几个特性
1. 实现 `this` 指向为第一个参数
2. 可以传入多个参数
3. 第一个参数为null，则指向全局
4. 返回执行结果
```js
// 使 `member expression` 返回 `Reference`
// `base value` 指向第一个参数
Function.prototype.call2 = function() {
  var g = typeof window !== 'undefined' ? window : global;
  var context = arguments[0] || g;
  var args = '';
  for (var i = 1; i < arguments.length; i++) {
    var cur = arguments[i];
    args = args + cur + ',';
  }
  var uid = 0;
  while (context.hasOwnProperty('__' + uid)) {
    uid++;
  }
  context['__' + uid] = this;
  var result = eval("context['__' + uid](" + args + ")");
  delete context['__' + uid];
  return result;
}

var value = 2;

var foo = {
  value: 1,
}

function bar(a, b) {
  console.log(a + b);
  console.log(this.value);
}

bar.call2(null, 1, 2);//1
```

## `apply`
`apply` 很类似，只是参数为数组
```js
Function.prototype.apply2 = function() {
  var g = typeof window !== 'undefined' ? window : global;
  var context = arguments[0] || g;
  var args = '';
  var originArgs = arguments[1];
  for (var i = 0; i < originArgs.length; i++) {
    var cur = originArgs[i];
    args = args + cur + ',';
  }
  var uid = 0;
  while (context.hasOwnProperty('__' + uid)) {
    uid++;
  }
  context['__' + uid] = this;
  var result = eval("context['__' + uid](" + args + ")");
  delete context['__' + uid];
  return result;
}
```