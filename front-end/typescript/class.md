# 类

## super
1. 派生类在构造函数中访问this之前，必须调用`super`
2. 派生类重写父类时，可以调用`super`以调用父类方法

## 修饰符
1. public:
  `typescript`中所有成员默认修饰符均为`public`
2. private:
  - 当成员被声明为`private`，那么就不能在类之外调用，包括实例
  - ts采用结构性类型系统，也即是**鸭子类型**。当比较两个类型时，假如所有成员都是兼容的，那么ts就会认为两个类型是兼容的。但是！假如两个类包含了`private`成员，那么两个类型铁定是不兼容的。
3. protected:
  `protected`与`private`行为很类似，除了可以在派生类（子类）中调用。需要注意的是，若基类的构造函数`constructor`被声明为`protected`，那么基类就不可以直接实例化，只能被派生类的构造函数调用（`super`）
4. readonly:
  顾名思义为只读，**只能**在声明时或构造函数中被初始化
5. 参数属性:
  有时候需要设置实例属性时我们会这样做:
  ```js
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
  }
  ```
  事实上有更简便的语法糖:
  通过在构造函数中添加修饰符即可
  ```js
  class Octopus {
    readonly numberOfLegs: number = 8;
    constructor (readonly name: string) { }
  }  
  ```

## 存取器
存取器可以截取对对象成员的访问。注意，只带`getter`的属性会被推断为`readonly`
```js
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
```js
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

## 静态属性
```js
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}
```

## 抽象类
抽象类可以作为其他子类的基类使用，不同于接口，抽象类可以实现成员的细节。但也可以不实现细节。
**抽象方法**
- 抽象方法即在成员前添加`abstract`修饰符（注意`public`等修饰符仍然可以用）
- 抽象方法，定义方法签名而不包含方法体
- 抽象方法必须要被派生类实现
```js
abstract class Department {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public printName(): void {
    alert('Department name: ' + this.name);
  }
  public abstract printMeeting(): void;
}

class MyDepartment extends Department {
  constructor(public name: string) {
    super(name);
  }
  public printMeeting() {
    alert(`printMeeting`);
  }
}
```