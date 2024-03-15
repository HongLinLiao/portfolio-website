---
title: 'Typescript 5.0'
date: '2024-02-09'
summary: 'Typescript 5.0 Introduction'
banner: '/articles/typescript5/banner.jpg'
---

> 在vscode，記得要`shift+cmd+P` > `Select Typescript version` > 換成workspace的typescript版本，不然你還是會看到一大堆type error唷!
> 

## Decorator

以下定義一個Person class，實體化並呼叫裡面的function。

```tsx
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Leo");
p.greet();
```

當function內變的複雜時，我們會需要在function裡的前後加上一些`log`做tracing，如下:

```tsx
greet() {
    console.log("LOG: Entering method.");
    console.log(`Hello, my name is ${this.name}.`);
    console.log("LOG: Exiting method.")
}
```

但這不符合AOP(Aspect-Oriented Programming)的設計概念，會影響到原本的程式邏輯，且當你需要大量`log`時會在各個地方都這樣使用，非常費時費工，在typescript裡的解決方法就是使用[Decorator](https://www.typescriptlang.org/docs/handbook/decorators.html)。

只要宣告decorator function掛在需要的層級上，以橫切的角度介入，就可以不影響既有的程式邏輯，如下:

```tsx
function loggedMethod(originalMethod: any, _context: any) {
    function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.")
        const result = originalMethod.call(this, ...args);
        console.log("LOG: Exiting method.")
        return result;
    }
    return replacementMethod;
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Leo");
p.greet();
```

以上是既有的typescript knowledge，仔細看會發現decorator function裡充斥著any型別，typescript不是為了要解決javascript的無型別問題才存在的嗎，所以在Typescript 5.0裡修正了這個問題。

### context

context裡存放的是關於這個target的metadata，可以透過類似`const methodName = String(context.name);`的方式拿到相對應的資訊。

回到剛剛的example，如果把最下面呼叫greet的地方稍做修改，你會發現產生錯誤:

```tsx
const greet = new Person('Leo').greet;
greet();

// TypeError: Cannot read properties of undefined (reading 'name')
```

這個錯誤是`this`指向了錯誤的位置，所以通常會有兩種做法:

1. 把這個method binding到這個class上
    
    ```tsx
    constructor(name: string) {
    		this.name = name;
    		this.greet = this.greet.bind(this);
    }
    ```
    
2. 把function改為arrow function，防止`this`被重新綁定
    
    ```tsx
    greet = () => {
    				console.log(`Hello, my name is ${this.name}.`);
    }
    ```
    

這個問題透過這兩個方式就可以解決了，但不覺得在constructor裡binding function感覺不太好嗎？

在Typescript 5.0裡提供了第三個方法，讓你直接以decorator處理掉這個問題，你可以先把剛剛調整的constructor binding或arrow function復原。

Typescript 5.0先對`context`提供了interface`ClassMethodDecoratorContext`，這個interface內有一個function `addInitializer`，可以提供一個callback當作參數給這個function讓它在初始化後執行。透過這個`addInitializer`綁定`this`到原本的class上，如下:

```tsx
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
    }
    context.addInitializer(function () {
        this[methodName] = this[methodName].bind(this);
    });
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @bound
    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const greet = new Person("Ron").greet;
greet();
```

在Typescript 5.0以前，如果要使用Decorator需要在`tsconfig.json`裡開啟`experimentalDecorators`。
如果在Typescript 5.0這麼做會沿用舊版的Decorator機制，如果要使用新版的直接取消`experimentalDecorators`配置即可，並且新的Decorator機制不兼容`--emitDecoratorMetadata`。

另外除了可以在`export`前綴掛上Decorator之外，也支援後綴的作法，但目前不支援兩種混用，如下:

```tsx
//  allowed
@register export default class Foo {
    // ...
}

//  also allowed
export default @register class Bar {
    // ...
}

//  error - before *and* after is not allowed
@before export @after class Bar {
    // ...
}
```

以上的code並不是完整的Decorator強型別解決方案，請參考以下的強型別寫法:

```tsx
function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
```

## Const Type Refer

在typescript會做基本的型別推斷，下面這段code，會將`names`的型別推斷為`string[]`。

```tsx
type HasNames = { readonly names: string[] };
function getNamesExactly<T extends HasNames>(arg: T): T["names"] {
    return arg.names;
}

// Inferred type: string[]
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });
```

如果要推斷為更具體的型別如`["Alice", "Bob", "Eve"]`，Typescript 4.x提供針對參數轉換型別為`const`。

```tsx
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] } as const);
```

在Typescript 5.0給出另一個解決方法，在宣告時可以針對泛型推斷為const，如下:

```tsx
interface HasNames { names: readonly string[] }
function getNamesExactly<const T extends HasNames>(arg: T): T['names'] {
  return arg.names;
}

// Inferred type: ['Alice', 'Bob', 'Eve']
const names = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] })
```

但要注意的是，目前`const`無法推斷可變的值，必須是`readonly`，如下:

```tsx
declare function fnBad<const T extends string[]>(args: T): void;
// 'T' is still 'string[]' since 'readonly ["a", "b", "c"]' is not assignable to 'string[]'
fnBad(["a", "b" ,"c"]);

declare function fnGood<const T extends readonly string[]>(args: T): void;
// T is readonly ["a", "b", "c"]
fnGood(["a", "b" ,"c"]);

declare function fnBad2<const T extends readonly string[]>(args: T): void;
const arr = ["a", "b" ,"c"];

// 'T' is still 'string[]'-- the 'const' modifier has no effect here
fnBad2(arr);
```

## Mutiple extention config

Typescript 5.0支援多個extention config，當config裡設置欄位衝突時，由排序較後者優先(後蓋前)，如下:

```json
{
    "extends": ["t", "b", "c"], // c > b > a
    "compilerOptions": {
        // ...
    }
}
```

## Initialize Enum Value

在`enum` 可以透過function initialize value.

```tsx
enum E {
    Blah = Math.random()
}

const prefix = '/data';

enum DateEnum {
    User = `${prefix}/user`,
    File = `${prefix}/file`
}
```

## [moduleResolution bundler](https://github.com/microsoft/TypeScript/pull/51669)

> `moduleResolution`是指定typescript在解析module相對路徑的策略。
> 

在Typescript 4.7中，針對`tsconfig`的`module`與`moduleResolution`屬性新增了`node16`與`nodenext`，雖然提供了兩種新的作法，但在bundler上`node16`與`nodenext`的設置還是太麻煩，所以大部分情境還是適合原本的`node`。

如果是使用Vite、esbuild、swc、Webpack與Parcel，在這些打包工具都有自己的import strategy，Typescript 5.0提出新的`bundler`策略會更適合這些工具，在打包時不會去不會去執行ESM的strict resolution rules，並且多了`allowImportingTsExtensions`、`resolvePackageJsonExports`、`resolvePackageJsonImports`、`allowArbitraryExtensions`、`customConditions`幾個參數的配置。

```tsx
{
    "compilerOptions": {
        "target": "esnext",
        "moduleResolution": "bundler"
    }
}
```

## `--verbatimModuleSyntax`

Typescript預設會做import elision，在轉換成Javascript時，會將引入的型別省略掉，如下：

```tsx
import { Car } from "./car";

export function drive(car: Car) {
    // ...
}

// JS
export function drive(car) {
    // ...
}
```

Typescript 5.0新增了一個新的`--verbatimModuleSyntax`選項，只要使用type關鍵字的import，最後都會被elision，如下：

```tsx
// Erased away entirely.
import type { A } from "a";

// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";

// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
```

棄用了`--importsNotUsedAsValues`與`—-preserveValueImports`兩種配置。

## Support export type *

支援export一個檔案的所有type，如下：

```tsx
// models/vehicles.ts
export class Spaceship {
  // ...
}

// models/index.ts
export type * as vehicles from "./vehicles";

// main.ts
import { vehicles } from "./models";

function takeASpaceship(s: vehicles.Spaceship) {
  //  ok - `vehicles` only used in a type position
}

function makeASpaceship() {
  return new vehicles.Spaceship();
  //         ^^^^^^^^
  // 'vehicles' cannot be used as a value because it was exported using 'export type'.
}
```

## `@satisfies` in JSDoc

在Typescript 4.9提供`satisfies`，用來定義兼容某個類型，且satisfies能自動推斷類型：

```tsx
interface CompilerOptions {
    strict?: boolean;
    outDir?: string;
    // ...
}

interface ConfigSettings {
    compilerOptions?: CompilerOptions;
    extends?: string | string[];
    // ...
}

let myConfigSettings = {
    compilerOptions: {
        strict: true,
        outDir: "../lib",
        // ...
    },

    extends: [
        "@tsconfig/strictest/tsconfig.json",
        "../../../tsconfig.base.json"
    ],

} satisfies ConfigSettings;

interface IConfig {
	a: string | number;
}

const value = { a: 2 } satisfies IConfig;
// value.a is number type
```

在Typescript 5.0將`satisfies`也放入JSDoc的參數中，可以用來推斷是否符合剛型別:

```tsx
// @ts-check

/**
 * @typedef CompilerOptions
 * @prop {boolean} [strict]
 * @prop {string} [outDir]
 */

/**
 * @satisfies {CompilerOptions}
 */
let myCompilerOptions = {
    outdir: "../lib",
//  ~~~~~~ oops! we meant outDir
};
```

## `@overload` in JSDoc

原本在Typescript可以像以下方式定義函式的多型:

```tsx
function printValue(str: string): void;
function printValue(num: number, maxFractionDigits?: number): void;
function printValue(value: string | number, maximumFractionDigits?: number) {
    if (typeof value === "number") {
        const formatter = Intl.NumberFormat("en-US", {
            maximumFractionDigits,
        });
        value = formatter.format(value);
    }

    console.log(value);
}
```

在Typescript 5.0，在JSDoc中也可以依據`overload`去定義多型的type check:

```tsx
// @ts-check

/**
 * @overload
 * @param {string} value
 * @return {void}
 */

/**
 * @overload
 * @param {number} value
 * @param {number} [maximumFractionDigits]
 * @return {void}
 */

/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
    if (typeof value === "number") {
        const formatter = Intl.NumberFormat("en-US", {
            maximumFractionDigits,
        });
        value = formatter.format(value);
    }

    console.log(value);
}
```

## Pass Flag to tsc —build

增加以下五種參數可以在typescript build的時候配置。

- `--declaration`
- `--emitDeclarationOnly`
- `--declarationMap`
- `--sourceMap`
- `--inlineSourceMap`

## Switch/case Completions

針對switch, 在寫case時，可以可以補全未完成的case。

![截圖 2023-03-22 上午2.56.04.png](Typescript%205%200%20357b896923ec4dd09f57384fc0793426/%25E6%2588%25AA%25E5%259C%2596_2023-03-22_%25E4%25B8%258A%25E5%258D%25882.56.04.png)

![截圖 2023-03-22 下午3.55.32.png](Typescript%205%200%20357b896923ec4dd09f57384fc0793426/%25E6%2588%25AA%25E5%259C%2596_2023-03-22_%25E4%25B8%258B%25E5%258D%25883.55.32.png)

## Speed, Memory, and Package size Optimization

Typescript 5.0針對code structure, data structure, algorithm都進行了優化，下圖是各項情境以Typescript 4.9作為基礎的比較數據。

![截圖 2023-03-22 上午2.58.46.png](Typescript%205%200%20357b896923ec4dd09f57384fc0793426/%25E6%2588%25AA%25E5%259C%2596_2023-03-22_%25E4%25B8%258A%25E5%258D%25882.58.46.png)

![Untitled](Typescript%205%200%20357b896923ec4dd09f57384fc0793426/Untitled.png)

![Untitled](Typescript%205%200%20357b896923ec4dd09f57384fc0793426/Untitled%201.png)

## Breaking Changes

### Runtime Requirements

Node.js版本最低要求版本為12.20。

### lib.d.ts

修改產生DOM時用到的一些type，詳細可以參考以下變更。

[https://github.com/microsoft/TypeScript/pull/52328/files#diff-2d6840937a16179b34b257d0e458eeb5d5ef94043f3888c1679ba3d891aa78b2L119](https://github.com/microsoft/TypeScript/pull/52328/files#diff-2d6840937a16179b34b257d0e458eeb5d5ef94043f3888c1679ba3d891aa78b2L119)

### API Breaking Changes

Typescript 5.0整體朝向模組化，移除了一些不需要的interface，和一些錯誤的修正，可以參考以下變更。

[https://github.com/microsoft/TypeScript/wiki/API-Breaking-Changes](https://github.com/microsoft/TypeScript/wiki/API-Breaking-Changes)

### Forbidden Implicit Coercions in Relational Operators

在Typescript 5.0以前只會檢查，`+-*/`。

```tsx
function func(ns: number | string) {
  return ns * 4; // Error, possible implicit coercion
}
```

Typescript 5.0也會檢查`><≤≥`。

```tsx
function func(ns: number | string) {
  return ns > 4; // Now also an error
}
```

### Enum

Typescript 5.0針對Enum提供了以下改善:

定義超出Enum value的變數時，會報錯:

```tsx
enum Test {
  Zero = 0,
  Two = 2,
  Four = 4,
}

// In Typescript 4.9, not error
// In Typescript 5.0, show error
const test: Test = 1;
```

```tsx
enum Letters {
    A = "a"
}
enum Numbers {
    one = 1,
    two = Letters.A
}

// In Typescript 4.9, not error
// In Typescript 5.0, show error
// Type 'Numbers' is not assignable to type 'number'.ts(2322)
const t: number = Numbers.two;
```

## Deprecations and Default Changes

### Deprecations

在Typescript 5.0決定棄用以下參數或設定值

- `--target: ES3`
- `--out`
- `--noImplicitUseStrict`
- `--keyofStringsOnly`
- `--suppressExcessPropertyErrors`
- `--suppressImplicitAnyIndexErrors`
- `--noStrictGenericChecks`
- `--charset`
- `--importsNotUsedAsValues`
- `--preserveValueImports`

這些配置目前是允許的，直到Typescript 5.5，這些配置將會被完全刪除。

### Default Changes

`—-newLine`控制檔案的結束符號，default調整為`LF`。

`--forceConsistentCasingInFileNames`控制對同一個檔案的大小寫不一致的引用，default調整為`true`。