// TypeScript Classes — learning notes and examples
// Source (official Handbook): https://www.typescriptlang.org/docs/handbook/2/classes.html
//
// A class is a blueprint for creating objects. Each created object is called
// an "instance". Classes are JavaScript; TypeScript adds type checking.

// ---------------------------------------------------------------------------
// 1. Fields (data stored on every instance)
// ---------------------------------------------------------------------------

class Person {
  // These are public fields by default.
  name: string;
  public age: number;

  // A field can have an initial value. TypeScript infers `string` from it.
  country: string = "Estonia";

  constructor(name: string, age: number) {
    // With `strictPropertyInitialization`, fields without initial values must
    // be assigned in the constructor.
    this.name = name;
    this.age = age;
  }
}

const danila = new Person('Danila', 28);
console.log(danila.name); // Danila

// `readonly` allows assignment while declaring the field or in the constructor,
// but prevents changing it later.
class Account {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

const account55 = new Account(53);
console.log(account55.id);

const account = new Account(1);
console.log(account.id);
// account.id = 2; // Error: Cannot assign to a readonly property.

// `!` is a definite-assignment assertion. It means: "Trust me, this property
// will receive a value later." Use it carefully; TypeScript will not protect
// you from reading an uninitialized value at runtime.
class ProfileLoadedLater {
  name!: string;
}

const loadedProfile = new ProfileLoadedLater();
// Imagine an API or a library fills this value after the object is created.
loadedProfile.name = 'Loaded from an API';
console.log(loadedProfile.name);

// ---------------------------------------------------------------------------
// 2. Constructor and parameter properties
// ---------------------------------------------------------------------------
class Counter {
  private count = 0;
  increase(by: number): void {
    // Use `this.` to access fields and other methods on this instance.
    this.count += by;
  }

  getCount(): number {
    return this.count;
  }
}

const counter2 = new Counter();
const counter1 = new Counter();

counter2.increase(5);
counter2.increase(10);
counter2.increase(8);

counter1.increase(2);

// We cannot modify counter straight as the property is private
console.log(`The count of a counter is ${counter2.getCount()}`);
console.log(`The count of a counter is ${counter1.getCount()}`); // 2


// ---------------------------------------------------------------------------
// 3. Methods and `this`
// ---------------------------------------------------------------------------
// Constructors are similar to functions: parameters may have types and defaults.
// Constructors do NOT have return type annotations: `new Car()` returns Car.
class Point {
  constructor(
    public x?: number,
    public y?: number,
  ) {}
}

const point1 = new Point(155, 203);
const zeroPoint = new Point();

console.log(`The points are - x: ${point1.x}, y: ${point1.y}`);

// Checking if the points are undefined or null we pass them 0 of x, y properties.
console.log(`The points are - x: ${zeroPoint?.x ?? 0}, ${zeroPoint?.y ?? 0}`);

class Car extends Point {
  // `public`, `private`, `protected`, or `readonly` in a constructor parameter
  // creates and assigns a class field automatically.
  constructor(
    public brand: string,
    public model: string,
    public readonly year: number,
  ) {
    super();
  }
  drive(): void {
    console.log(`I'm driving ${this.brand} car!`);
    
  }
}

const bmw = new Car('BMW', 'i8', 2005);
const audi = new Car('Audi', 'A6', 2024);
const mercedesBenz = new Car('Mercedes Benz', 'AMG', 2026);

console.log(`Welcome back, and my car is ${bmw.brand} ${bmw.model} and it's of ${bmw.year} year.`);
console.log(`Welcome back, and my car is ${audi.brand} ${audi.model} and it's of ${audi.year} year.`);
console.log(`Welcome back, and my car is ${mercedesBenz.brand} ${mercedesBenz.model} and it's of ${mercedesBenz.year} year.`);

// audi.year = 2025; // Error: `year` is readonly.

// A method can declare the type of `this` as its first parameter. This parameter
// exists only for TypeScript checking; it is not a real runtime argument.
class Database {
  filterUsers(filter: (this: Database, name: string) => boolean): string[] {
    return ['Danila', 'Tom'].filter((name) => filter.call(this, name));
  }
}

const database = new Database();
console.log(database.filterUsers(function (name) {
  return name.startsWith('D');
}));

// ---------------------------------------------------------------------------
// 4. Getters and setters (accessors)
// ---------------------------------------------------------------------------

class Temperature {
  private celsius = 0;

  get fahrenheit(): number {
    return (this.celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = ((value - 32) * 5) / 9;
  }
}

const temperature = new Temperature();
temperature.fahrenheit = 68;
console.log(temperature.fahrenheit); // 68

// A getter without a setter is automatically readonly.
// Do not add getters/setters when a public field is enough; accessors are useful
// when reading or writing needs validation, conversion, or other logic.

// ---------------------------------------------------------------------------
// 5. `implements`: check a class against an interface
// ---------------------------------------------------------------------------

interface Printable {
  print(): void;
}

interface Serializable {
  toJSON(): string;
}

class Invoice implements Printable, Serializable {
  constructor(public total: number) {}

  print(): void {
    console.log(`Invoice total: ${this.total}`);
  }

  toJSON(): string {
    return JSON.stringify({ total: this.total });
  }
}

const invoice = new Invoice(99);
invoice.print();
console.log(invoice.toJSON());

// `implements` only checks the class shape. It does not add properties or infer
// parameter types inside the class. Still write types in your method definitions.
// Optional interface members also are NOT created automatically on the class.

// ---------------------------------------------------------------------------
// 6. `extends`: inherit from another class
// ---------------------------------------------------------------------------

class Animal {
  constructor(public name: string) {}

  move(distance = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    // In a derived constructor, call `super()` before using `this`.
    super(name);
  }

  bark(): void {
    console.log('Woof!');
  }

  // This overrides the method inherited from Animal.
  override move(distance = 5): void {
    super.move(distance); // Call the parent implementation when useful.
    console.log(`${this.name} ran happily.`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.move();
dog.bark();

// An overridden method must still be usable wherever the base class is expected.
// For example, do not change `move(distance = 0)` to require a distance argument.
// Enable `noImplicitOverride` in tsconfig.json to require the `override` keyword.

// Initialization order for inherited classes:
// 1. Base fields initialize
// 2. Base constructor runs
// 3. Derived fields initialize
// 4. Derived constructor runs
// Therefore, avoid depending on derived field values in a base constructor.

// ---------------------------------------------------------------------------
// 7. Visibility: public, protected, and private
// ---------------------------------------------------------------------------

class Employee {
  public name: string; // Accessible anywhere (the default).
  protected department: string; // This class and subclasses can access it.
  private salary: number; // Only this class can access it.

  constructor(name: string, department: string, salary: number) {
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }
}

class Developer extends Employee {
  introduceDepartment(): void {
    console.log(this.department); // Allowed: Developer is a subclass.
  }
}

const developer = new Developer('Tom', 'Engineering', 5000);
console.log(developer.name); // Allowed: public.
// console.log(developer.department); // Error: protected.
// console.log(developer.salary); // Error: private.

// TypeScript `private` is checked by TypeScript. JavaScript `#private` fields
// are enforced at runtime too, but have different JavaScript syntax:
class SecureToken {
  #value = 'secret';

  reveal(): string {
    return this.#value;
  }
}

const token = new SecureToken();
console.log(token.reveal());

// ---------------------------------------------------------------------------
// 8. Static members belong to the class itself, not each instance
// ---------------------------------------------------------------------------

class MathHelper {
  static readonly pi = 3.14159;

  static square(value: number): number {
    return value * value;
  }
}

console.log(MathHelper.pi);
console.log(MathHelper.square(4));
// const helper = new MathHelper();
// helper.square(4); // Error: static members are accessed through the class.

// ---------------------------------------------------------------------------
// 9. Generic classes
// ---------------------------------------------------------------------------

class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
const nameBox = new Box('Danila'); // TypeScript infers Box<string>.
console.log(numberBox.getValue(), nameBox.getValue());

// The type parameter belongs on the class, not its constructor.

// ---------------------------------------------------------------------------
// 10. Abstract classes: a base blueprint that cannot be created directly
// ---------------------------------------------------------------------------

abstract class Shape {
  abstract getArea(): number; // Every subclass must implement this method.

  describe(): void {
    console.log(`Area: ${this.getArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// const shape = new Shape(); // Error: abstract classes cannot be instantiated.
const circle = new Circle(3);
circle.describe();

// Key idea:
// - Use an interface to describe a shape/contract.
// - Use a class when you need actual data, methods, construction, or shared code.
