// bool
let isDone: boolean = false;

// nubmer
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b10101;
let octalLiteral: number = 0o744;

// string
let str: string = "hello world";

let name1: string = "Gene";
let age: number = 36;
let sentence: string = `${name}, ${age + 1}`;

// array
let list: number[] = [1, 2, 3, 4];
let list1: Array<number> = list;

// Tuple 元组
let x: [string, number];
x = ["hello", 3];
// x = [3, "hello"]; // error

// Enum
enum Color {
  Red,
  Green,
  Blue
}

Color.Red; // 1

enum ColorWithValue {
  Red = 4,
  Green,
  Blue
}

ColorWithValue.Red; // 4
ColorWithValue.Green; // 5
ColorWithValue.Blue; // 6

enum ColorWithStringValue {
  Green,
  Blue,
  Red = "RED"
}

ColorWithStringValue.Green; // 0
ColorWithStringValue.Blue; // 1
ColorWithStringValue.Red; // RED

// 反查
let colorName: string = ColorWithStringValue[0]; // Green

// any
let arr: Array<any> = [1, false, "aaa"];
// void
function warnUser(): void {
  alert("This is my warning message");
}
let u: undefined = undefined;
let n: null = null;

// never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
function err(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// Type assertions
let someValue: any = "this is a string";
let strLength: number;
// form 1
strLength = (<string>someValue).length;
// form 2
strLength = (someValue as string).length;
// 在jsx中只能使用form 2

// 必须在后面写上完整的模式
let { a: newName1, b: newName2 }: { a: string; b: string } = { a: "a", b: "b" };

interface LabelledValue {
  label: string;
  size?: number;
}

function printLabel(labelledObj: LabelledValue): void {
  console.log(labelledObj.label);
}

let myObj: LabelledValue = { label: "size 10 object", size: 10 };
printLabel(myObj);

// ? 代表可选参数
interface SquareConfig {
  color?: string;
  width?: number;
  // 兼容其他参数，否则ts会报错
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

// 只读属性
interface ReadOnlyPoint {
  readonly x: number;
  readonly y: number;
}

// 只读数组
let a: Array<number> = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// 函数 interface
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > 1;
};

interface StringArray {
  [index: number]: string;
}

let myStringArray: StringArray = ["foo", "bar"];

// class implements interface

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// interface define constructor, create class instance

interface ClockInterfaceWithTick {
  tick();
}

interface ClockWithTickConstructor {
  new (hour: number, minute: number): ClockInterfaceWithTick;
}

function createClock(
  ctor: ClockWithTickConstructor,
  hour: number,
  minute: number
): ClockInterfaceWithTick {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterfaceWithTick {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep");
  }
}

class AnalogClock implements ClockInterfaceWithTick {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 17);

// extends interfaces

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// mixed type
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// class extends
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

// function
function add(x: number, y: number): number {
  return x + y;
}

// 完整约束
let myAdd: (baseValue: number, increment: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};

function identity<S>(args: S): S {
  // console.log(args.length);
  return args;
}

function identityArray<S>(args: S[]): S[] {
  console.log(args.length);
  return args;
}

function identityArray2<B>(args: Array<B>): Array<B> {
  console.log(args.length);
  return args;
}

// 泛型 函数
let myIdentity1: { <T>(args: T): T } = identity;
let myIdentity2: <T>(args: T) => T = identity;

interface GenericIdentityFn {
  <T>(args: T): T;
}

interface GenericIdentityFnWithType<T> {
  (args: T): T;
}

let myIdentity3: GenericIdentityFn = identity;
let myIdentity4: GenericIdentityFnWithType<number> = identity;

// 泛型 类
class GenericNumber<T> {
  zeroValue: T;
  add: { (x: T, y: T): T };
}

// function getProperty(obj: T, key: K) {
//   return obj[key];
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a"); // okay
// getProperty(x, "m");
