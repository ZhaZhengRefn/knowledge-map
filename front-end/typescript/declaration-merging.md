# 声明合并

## 基础概念
ts的声明将会创建三种实体：命名空间、类型、值
| Declaration Type | Namespace | Type | Value |
|------------------|-----------|------|-------|
| Namespace        | X         |      | X     |
| Class            |           | X    | X     |
| Enum             |           | X    | X     |
| Interface        |           | X    |       |
| Type Alias       |           | X    |       |
| Function         |           |      | X     |
| Variable         |           |      | X     |

## 合并接口
合并接口非常简单，因为只存在类型，因此只是将成员合并。假如存在类型不同的成员将会合并失败。

## 合并命名空间
命名空间创建了命名空间和值。
- 命名空间的合并: 模块导出的同名接口将会合并
- 值的合并: 导出成员将会被合并
以上均是导出成员。
**注意**，其他命名空间无法访问非导出成员。
```js
namespace Animal {
    let haveMuscles = true;

    export function animalsHaveMuscles() {
      return haveMuscles;
    }
}

namespace Animal {
    export function doAnimalsHaveMuscles() {
      return haveMuscles;  // Error, because haveMuscles is not accessible here
    }
}
```

## 命名空间与类的合并
可以做出内部类
```js
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel { }
}
```

## 命名空间与函数的合并
可以扩展函数成员并保证类型安全
```js
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));
```

## 命名空间与枚举合并
```js
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}
```

## 模块扩展
- 补丁扩展模块
```js
import { Observable } from "./observable";
declare module "./observable" {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}
Observable.prototype.map = function (f) {
    // ... another exercise for the reader
}
```
- 全局扩展模块
```js
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}

Array.prototype.toObservable = function () {
    // ...
}
```