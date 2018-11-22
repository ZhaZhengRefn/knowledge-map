# 节流实现

```js
let count = 0;
const container = document.getElementById('container');

function move() {
  container.innerHTML = ++count;
  console.log(count);
}

container.onmousemove = throttle(move, 1000);
```

```js
// throttle
/**
 * 1. 使用时间戳实现立即执行：闭包保留上一次执行的时间戳。若当前时间时间戳-上一个时间戳 > 间隔，则立即执行
 * 2. 使用定时器延迟执行：若不存在定时器，则设置定时器，经过固定时间间隔后执行
 * 3. 实现立即执行与延迟执行的可配置
 *  3.1. 实现leading可配置，思路：巧妙利用剩余时间remains。若remains一直等于时间间隔，则永远不会立即执行回调
 *  3.2. 实现tailing可配置，思路：若tailing为假，则不初始化定时器
 */
function throttle (fn, interval, options = { leading: false, tailing: false }) {
  let start = 0;
  let timer = null;
  return function tFunc(...args) {
    const now = Date.now();
    if (!start && options.leading === false) {
      start = now;
    }
    const remains = interval - (now - start);
    if (remains <= 0 || remains > interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      start = now;
    } else if (!timer && options.tailing !== false) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        start = options.leading === false ? 0 : Date.now();
        timer = null;
      }, remains);
    }
  }  
}

```