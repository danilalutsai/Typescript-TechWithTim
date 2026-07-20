// A field declaration creates a public variable property on a class
// We declare coordinates in constructor methods
class Point {
  // There are just a few differences between class constructor signatures and function signatures:
  // Constructors can't have their parameters - these belong on the outer class declaration, which we'll learn about later
  // Constructors can't have return type annotations - the class instance type is always what's returned
  constructor(
    public x: number = 0,
    public y: number = 0
  ) {
    this.x = x;
    this.y = y;
  }
}

// If you have a base class, you'll need to call super(); in your constructor body before using any this. members:
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    super();
    this.k = 0;
  }
}

const derived = new Derived();
derived.k = 5;
console.log(`k: ${derived.k}`);

const pt = new Point(5, 10);
pt.x = 8;
pt.y = 19;

const pt2 = new Point()
console.log(`pt2 - x: ${pt2.x}, y: ${pt2.y}`)

console.log(
  `
The points coordinates are:
x:${JSON.stringify(pt.x) ?? 'Maybe undefined'}
y:${JSON.stringify(pt.y) ?? 'Maybe undefined'}
`) // 8, 19

class GoodGreeter {
  name: string;

  // If you intend to definitely initialize a field through means other than constructor (for example 
  // maybe an external library is fillit in part of your class for you), you can use the definite assignment assertion operator, !
  constructor(name: string) {
    this.name! = name;
  }
}

const persGreeter = new GoodGreeter('Danila');
const anotPersGreeter = new GoodGreeter('Nikita');
console.log(`Hi everyone, and my name is ${persGreeter.name}`);
console.log(`Hi everyone, and my name is ${anotPersGreeter.name}`);

class OKGreeter {
  name!: string;
}

const okGreeter = new OKGreeter();
console.log(okGreeter);

class Greeter {
  readonly name: string = 'Name';

  constructor(otherName?: string) {
    if (otherName === undefined) {
      // this.name = otherName;
    } else {

    }
  }

  err() {
    // this.name = 'not ok';
  }
}

const g = new Greeter('Aleksey');
console.log(g.name);

// Getters and Setters
// Classes can also have accessors
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

const c = new C();
console.log(c._length);

class Thing {
  private _size = Infinity;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow Nan, Infinity, etc.
    if (!Number.isFinite(num)) {
      this._size = 0;
      return
    } 

    this._size = num;
  }
}

const thingy = new Thing();
console.log(thingy.size);

class Animal {
  move() {
    console.log('Moving along!');
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log('Woof!');
    }
  }
}

const doggy = new Dog();
doggy.woof(5);
doggy.move();

class Basement {
  greet(): void {
    console.log('Hello, world');
  }
}

class Deriveded extends Basement {
  greet(name?: string): void {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d = new Deriveded();
d.greet('Aleksander');

