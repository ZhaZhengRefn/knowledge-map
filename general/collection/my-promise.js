/**
 * promise编写思路
 * 1. 构造函数：
 *  1.1. 三大状态，扭转后不可变
 *  1.2. 终值 | 据因
 *  1.3. 类可被传入一个executor，executor会传入两个参数--`resolve`与`reject`。但`executor`执行出错时直接`reject`
 *  1.4. `resolve`会将`pending`状态扭转为`fulfilled`，且获取终值
 *  1.4. `reject`会将`pending`状态扭转为`rejected`，且获取据因
 * 2. then方法：
 *  2.1. 传入两个参数`onFulfilled`与`onRejected`回调
 *  2.2. 当`state`为`fulfilled`时执行`onFulfilled`
 *  2.3. 当`state`为`rejected`时执行`onRejected`
 * 3. 使用广播-订阅模式，适配异步更新state
 * 4. 链式调用: then方法必须返回一个新`promise`
 *  4.1. 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
 * 5. resolvePromise
 *  5.1. 此步骤本意是为了展开`promise`，让`promise`可以不断地套用`promise`
 *  5.2. 关键步骤是，遇到`thenable`对象时，执行`then`函数，并在其`onFulfilled`和`onRejected`回调中递归实现resolvePromise
 *  5.3. 注意一个细节是，`onFulfilled`和`onRejected`回调的`resolve`结果优先取最先完成的。因此需要一个变量作为锁。
 * 6. 其他细节
 *  6.1. 当`onFulfilled`回调不为函数时，值要传递下去。`onRejected`同理，`reason`也要传递下去
 *  6.2. 规定`onFulfilled`与`onRejected`必须异步执行
 */

function resolvePromise(promise, x, resolve, reject) {
  // x 不能等于 promise 自身，否则为循环引用
  if (x === promise) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 防止多次调用
  let called = false;

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise, y, resolve, reject);
        }, e => {
          if (called) return;
          called = true;
          reject(e);
        })
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
class MyPromise {
  constructor(executor) {

    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';

        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';

        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }      
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = val => val;
    }
    if (typeof onRejected !== 'function') {
      onRejected = e => {throw e};
    }
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    // onRejected = typeof onRejected === 'function' ? ;

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);   
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
  
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);                 
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
  
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);                
            } catch (error) {
              reject(error);
            }
          }, 0);
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);                  
            } catch (error) {
              reject(error);
            }
          }, 0);
        })      
      }
    })

    return promise2;
  }
}
MyPromise.resolve = function(val){
  return new MyPromise((resolve,reject)=>{
    resolve(val)
  });
}
MyPromise.reject = function(val){
  return new MyPromise((resolve,reject)=>{
    reject(val)
  });
}
// const foo = new MyPromise(function(resolve, reject){
//   const a = 1, b = 2;
//   setTimeout(() => {
//     resolve(a + b);
//   }, 1000);
// })

// foo.then(result => {
//   console.log(result);
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(result * 2);
//     }, 1000);
//   })
// })
// .then(result => {
//   console.log(result);
// })

/**
 * 测试脚本
 * npm i -g promises-aplus-tests
 * promises-aplus-tests m-promise.js
 */

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = MyPromise;