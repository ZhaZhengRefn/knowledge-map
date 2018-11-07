# Freshness/更严格的对象字面量检查

## 背景
结构类型非常方便，当没有`freshness`时，类型检查是这样的:
```js
function logName(something: { name: string }) {
  console.log(something.name);
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' };
const randow = { note: `I don't have a name property` };

logName(person); // ok
logName(animal); // ok
logName(randow); // Error: 没有 `name` 属性
```

## 对象字面量会触发更严格的检查
```js
function logName(something: { name: string }) {
  console.log(something.name);
}

logName({ name: 'matt' }); // ok
logName({ name: 'matt', job: 'being awesome' }); // Error: 对象字面量只能指定已知属性，`job` 属性在这里并不存在。
```
另外结合可选成员的语法，可以检验参数拼写错误:
```js
function logIfHasName(something: { name?: string }) {
  if (something.name) {
    console.log(something.name);
  }
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay

logIfHasName({ neme: 'I just misspelled name to neme' }); // Error: 对象字面量只能指定已知属性，`neme` 属性不存在。
```
注意，这类错误**只会发生在对象字面量上**。
`freshness`的**意义**在于，那些没有被使用的参数有可能是拼写错误或者会被误用。