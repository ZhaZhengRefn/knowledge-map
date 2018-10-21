# 函数

## 为函数添加类型
```js
function add(x: number, y: number): number {
  return x + y;
}
```

## 添加函数类型
函数类型包含了两部分: 参数类型与返回值类型。
参数可以指定名字，但只是为了增加可读性，不影响参数名。
```js
let myAdd: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y; };
```

## 可选参数与默认参数
1. 可选参数
- 在参数旁使用`?`即可启用可选参数
- 可选参数必须写在必须参数之后
```js
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```
2. 默认参数
- 默认参数语法与es6相同
- 默认参数若在必须参数之前，那么必须要传入undefined才能使用默认值
- 默认参数若在必须参数之后，则可以不传入参数，即可使用默认值。一定程度上来说，跟在必须参数之后的默认参数其实就是可选参数，并且参数类型会由默认值推断得出
```js
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
```

## 剩余参数
```js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
```

## this
`this`指向在函数被调用时才能确定。稍不注意可能会出现麻烦，因此指定`this`的类型非常关键。
```js
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
```
但是在回调函数这种场景里，指定`this`指向并不是万能的。
```js
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```
`addClickListener`要求函数带有`this: void`，因此解决方法:
- 改变`this`类型
```js
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
```
- 使用箭头函数
```js
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```

## 重载
在js中变参是一种很常见的写法，根据不同的参数类型执行不同的逻辑。
在类型系统中的表达方法是，为同一个函数提供多个函数类型定义来进行函数重载。
```js
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```