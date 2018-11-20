# 防抖实现

```js
let count = 0;
const container = document.getElementById('container');

function move() {
  container.innerHTML = ++count;
  console.log(count);
}

container.onmousemove = debounce(move, 1000, true);
```

```js
// debounce
/**
 * 1. 以每次操作为基准点，延迟m秒后执行。
 * 2. 新操作取消之前的定时器。
 * 3. 增加立即执行的逻辑。若立即执行则先执行，后定时。
 * 4. 立即执行情况希望有返回值。
 * 5. 增加cancel接口，可以提前终止等待。
 */
function debounce(fn, interval, immediate = false) {
  let timer = null;

  const dFunc = function (...args) {
    let result;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      let shouldCall = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, interval);
      if (shouldCall) {
        result = fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
    return result;
  }

  dFunc.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }

  return dFunc;
}

```