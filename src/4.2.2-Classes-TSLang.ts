// =============================================================================
// TypeScript Classes — a reading lesson
// =============================================================================
// Based on (and paraphrased from) the official TypeScript Handbook:
// https://www.typescriptlang.org/docs/handbook/2/classes.html
//
// Read from top to bottom. Every active example in this file is valid TypeScript
// and is used, so it can be checked with `tsc --noEmit` without LSP warnings.
// Examples that WOULD cause an error are kept as comments beginning with `// ❌`.

export {}; // Makes this file a module, so its names do not pollute other lessons.

// =============================================================================
// Chapter 1 — What is a class?
// =============================================================================
// A class is a blueprint for objects. `new` creates an instance of that class.
// TypeScript supports JavaScript classes and adds type annotations and checking.

class EmptyClass {}

const emptyObject = new EmptyClass();
console.log('An instance:', emptyObject);

// =============================================================================
// Chapter 2 — Fields (properties)
// =============================================================================
// A field is data stored on each instance. Fields are public and writable unless
// a modifier says otherwise.

class Person {
  name: string;
  age: number;

  // An initializer runs whenever an instance is created.
  country = 'Estonia';

  constructor(name: string, age: number) {
    // With `strictPropertyInitialization`, every declared field must either have
    // an initializer or be assigned in the constructor.
    this.name = name;
    this.age = age;
  }
}

const danila = new Person('Danila', 28);
console.log(danila.name, danila.age, danila.country);

// A value in an initializer is used to infer a field type.
class Coordinate {
  x = 0; // inferred as number
  y = 0;
}

const coordinate = new Coordinate();
coordinate.x = 10;
console.log(coordinate);
// ❌ coordinate.x = '10'; // A string cannot be assigned to a number field.

// The `!` definite-assignment assertion means: "I promise this gets assigned
// before it is read." It silences TypeScript; it does NOT initialize a value.
// It is useful when a framework/library assigns the property later.
class ProfileLoadedByApi {
  name!: string;
}

const profile = new ProfileLoadedByApi();
profile.name = 'Loaded after construction';
console.log(profile.name);

// =============================================================================
// Chapter 3 — readonly fields
// =============================================================================
// `readonly` permits assignment in a field initializer or constructor only.

class UserAccount {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

const account = new UserAccount(101);
console.log(account.id);
// ❌ account.id = 102; // Cannot assign to a readonly property.

// =============================================================================
// Chapter 4 — Constructors
// =============================================================================
// A constructor runs when `new ClassName(...)` is called. It accepts typed
// parameters and default values like a normal function.
// Constructors cannot have a return type annotation: `new` always returns the
// instance type of the class. Constructors also cannot have their own generics.

class Point {
  constructor(
    public x = 0,
    public y = 0,
  ) {}
}

const originPoint = new Point();
const customPoint = new Point(3, 4);
console.log(originPoint, customPoint);

// Constructor overloads use signatures followed by one implementation.
class Label {
  value: string;

  constructor(value: string);
  constructor(value: number);
  constructor(value: string | number) {
    this.value = String(value);
  }
}

console.log(new Label('hello').value, new Label(42).value);

// =============================================================================
// Chapter 5 — Methods and `this`
// =============================================================================
// A method is a function property on a class. Use `this.` to access members on
// the current object. A bare name looks in the surrounding scope, not the class.

class Counter {
  private count = 0;

  increase(by: number): void {
    this.count += by;
  }

  getCount(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increase(2);
console.log(counter.getCount());

// =============================================================================
// Chapter 6 — Getters and setters
// =============================================================================
// Accessors run code when a property is read (`get`) or written (`set`). Use
// them for validation or conversion; a simple public field needs no accessor.
// A getter with no setter is automatically readonly.

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
console.log(temperature.fahrenheit);

// Getter and setter types may differ. Here callers may set text, a number, or
// a boolean, but reading always gives a number.
class Size {
  private value = 0;

  get size(): number {
    return this.value;
  }

  set size(input: string | number | boolean) {
    const numberValue = Number(input);
    this.value = Number.isFinite(numberValue) ? numberValue : 0;
  }
}

const size = new Size();
size.size = '20';
console.log(size.size);

// =============================================================================
// Chapter 7 — Index signatures
// =============================================================================
// An index signature allows dynamic keys. Its value type must include the types
// of all methods too, which often makes it awkward. Prefer a separate object or
// Map for indexed data in most real programs.

class FlagStore {
  [key: string]: boolean | ((key: string) => boolean);

  has(key: string): boolean {
    return this[key] === true;
  }
}

const flags = new FlagStore();
flags.darkMode = true;
console.log(flags.has('darkMode'));

// =============================================================================
// Chapter 8 — `implements`: satisfy an interface
// =============================================================================
// `implements` checks that a class has a required shape. It does not add fields,
// change inferred method parameter types, or create optional interface members.

interface Printable {
  print(): void;
}

interface Serializable {
  toJSON(): string;
}

class Invoice implements Printable, Serializable {
  constructor(public total: number) {}

  print(): void {
    console.log(`Invoice: ${this.total}`);
  }

  toJSON(): string {
    return JSON.stringify({ total: this.total });
  }
}

const invoice = new Invoice(99);
invoice.print();
console.log(invoice.toJSON());
// ❌ class BrokenInvoice implements Printable {} // `print` is missing.

// =============================================================================
// Chapter 9 — `extends`, `super`, and overriding
// =============================================================================
// `extends` makes a derived class inherit instance fields and methods.
// In a derived constructor, call `super(...)` before any use of `this`.

class Animal {
  constructor(public name: string) {}

  move(distance = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }

  bark(times: number): void {
    console.log('Woof! '.repeat(times));
  }

  // `override` documents and checks that this replaces an inherited member.
  // Turn on `noImplicitOverride` in tsconfig.json to require this keyword.
  override move(distance = 5): void {
    super.move(distance);
    console.log(`${this.name} is a ${this.breed}.`);
  }
}

const rex = new Dog('Rex', 'German Shepherd');
rex.move();
rex.bark(2);

// An override must remain compatible with the base-class contract. For example,
// do not make an optional/base default parameter required in the subclass.
// ❌ override move(distance: number): void { ... } // Unsafe if Animal is used.

// JavaScript initialization order for inheritance:
// 1. Base fields initialize.  2. Base constructor runs.
// 3. Derived fields initialize.  4. Derived constructor runs.
// Therefore a base constructor sees base field values, not derived replacements.

// `declare` redeclares a more precise inherited field type without emitting a
// JavaScript field initializer. This avoids overwriting the parent's value.
interface Pet {
  name: string;
}

interface DogPet extends Pet {
  breed: string;
}

class PetHouse {
  constructor(public resident: Pet) {}
}

class DogHouse extends PetHouse {
  declare resident: DogPet;

  constructor(dog: DogPet) {
    super(dog);
  }
}

console.log(new DogHouse({ name: 'Rex', breed: 'Husky' }).resident.breed);

// When targeting old JavaScript (ES5), inheriting built-ins such as Error can
// need a prototype repair. Prefer ES2015+ if possible.
class MessageError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MessageError.prototype);
  }

  sayHello(): string {
    return `Hello: ${this.message}`;
  }
}

console.log(new MessageError('Something happened').sayHello());

// =============================================================================
// Chapter 10 — Visibility: public, protected, private, and #private
// =============================================================================
// `public` is the default: everyone can access it.
// `protected` is available in this class and its subclasses.
// `private` is available only in this class, but TypeScript private is a
// type-system check, not hard JavaScript runtime privacy.

class Employee {
  public name: string;
  protected department: string;
  private salary: number;

  constructor(name: string, department: string, salary: number) {
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }

  sameSalaryAs(other: Employee): boolean {
    // TypeScript permits private access to another instance of the SAME class.
    return this.salary === other.salary;
  }
}

class Developer extends Employee {
  introduceDepartment(): string {
    return this.department; // Allowed: it is protected.
  }
}

const tom = new Developer('Tom', 'Engineering', 5000);
console.log(tom.name, tom.introduceDepartment(), tom.getSalary());
console.log(tom.sameSalaryAs(new Employee('Sam', 'Design', 5000)));
// ❌ console.log(tom.department); // protected is not public.
// ❌ console.log(tom.salary); // private is not accessible outside Employee.

// A subclass can accidentally make a protected member public if it redeclares it
// without `protected`. Repeat the modifier when you do not want exposure.

// JavaScript `#private` fields are hard runtime private fields. They cannot be
// accessed with dot notation OR bracket notation outside the class.
class SecureToken {
  #value = 'secret';

  reveal(): string {
    return this.#value;
  }
}

console.log(new SecureToken().reveal());

// =============================================================================
// Chapter 11 — Static members and static blocks
// =============================================================================
// Static members belong to the class itself, not to each instance. Access them
// as `ClassName.member`, not `new ClassName().member`. Static members inherit.

class MathHelper {
  static readonly pi = 3.14159;
  private static calls = 0;

  static square(value: number): number {
    MathHelper.calls += 1;
    return value * value;
  }

  static getCallCount(): number {
    return MathHelper.calls;
  }
}

console.log(MathHelper.pi, MathHelper.square(4), MathHelper.getCallCount());
// ❌ static name = 'bad'; // `name`, `length`, and `call` conflict with Function.

// TypeScript has no `static class`. If you need one shared helper, a top-level
// function or object is commonly simpler than a class containing only statics.
const helperObject = {
  double(value: number): number {
    return value * 2;
  },
};
console.log(helperObject.double(5));

// A static block runs once when the class is evaluated. It has its own scope and
// can access private static fields.
class InstanceCounter {
  static #nextId: number;

  static {
    InstanceCounter.#nextId = 1;
  }

  readonly id = InstanceCounter.#nextId++;
}

console.log(new InstanceCounter().id, new InstanceCounter().id);

// =============================================================================
// Chapter 12 — Generic classes
// =============================================================================
// A generic class works with a type chosen when it is created. TypeScript can
// infer that type from the constructor argument. Generics may have constraints
// and defaults just like generic interfaces/functions.

class Box<Type> {
  constructor(public contents: Type) {}

  get(): Type {
    return this.contents;
  }
}

const numberBox = new Box<number>(42);
const nameBox = new Box('Danila'); // inferred as Box<string>
console.log(numberBox.get(), nameBox.get());

// A static member cannot use the class type parameter: at runtime there is only
// one static property slot for all Box<Type> instances.
// ❌ class BadBox<T> { static defaultValue: T; }

// =============================================================================
// Chapter 13 — `this` at runtime, `this` parameters, and `this` types
// =============================================================================
// In JavaScript, `this` depends on HOW a normal method is called. An arrow field
// captures the instance's `this`, so it remains safe when passed as a callback.
// Trade-off: every instance creates its own arrow function.

class SafeNameReader {
  name = 'SafeNameReader';

  getName = (): string => this.name;
}

const reader = new SafeNameReader();
const detachedReader = reader.getName;
console.log(detachedReader());

// A `this: ClassName` parameter exists only for TypeScript checking and is erased
// from JavaScript. It prevents TypeScript callers from losing the method context.
class CheckedNameReader {
  name = 'CheckedNameReader';

  getName(this: CheckedNameReader): string {
    return this.name;
  }
}

const checkedReader = new CheckedNameReader();
console.log(checkedReader.getName());
// ❌ const detached = checkedReader.getName; detached(); // wrong `this` context.

// The special type `this` means the current (most-derived) class type. Returning
// `this` enables fluent method chains while preserving a subclass's type.
class FluentBox {
  contents = '';

  set(value: string): this {
    this.contents = value;
    return this;
  }
}

class ClearableBox extends FluentBox {
  clear(): this {
    this.contents = '';
    return this;
  }
}

console.log(new ClearableBox().set('hello').clear().contents);

// `this is SomeType` is a type guard: inside a successful `if`, TypeScript knows
// the object has the promised type. This is useful for lazily validated fields.
class MaybeBox<Type> {
  value?: Type;

  hasValue(): this is { value: Type } {
    return this.value !== undefined;
  }
}

const maybeBox = new MaybeBox<string>();
maybeBox.value = 'Gameboy';
if (maybeBox.hasValue()) {
  console.log(maybeBox.value.toUpperCase()); // `value` is string here, not string | undefined.
}

// =============================================================================
// Chapter 14 — Parameter properties, class expressions, constructors as types
// =============================================================================
// Prefixing a constructor parameter with public/private/protected/readonly both
// declares the field and assigns the argument. This is a parameter property.

class ParametersExample {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number,
  ) {}

  sum(): number {
    return this.x + this.y + this.z;
  }
}

const parametersExample = new ParametersExample(1, 2, 3);
console.log(parametersExample.x, parametersExample.sum());

// A class expression can be anonymous and assigned to a variable.
const StringContainer = class<Type> {
  constructor(public content: Type) {}
};

const message = new StringContainer('Hello, world!');
console.log(message.content);

// `typeof ClassName` is the constructor/static side of a class.
// `InstanceType<typeof ClassName>` gives the type created by `new ClassName()`.
class TimedPoint {
  createdAt = Date.now();

  constructor(
    public x: number,
    public y: number,
  ) {}
}

type TimedPointInstance = InstanceType<typeof TimedPoint>;

function moveRight(point: TimedPointInstance): void {
  point.x += 5;
}

const timedPoint = new TimedPoint(3, 4);
moveRight(timedPoint);
console.log(timedPoint.x, timedPoint.createdAt);

// =============================================================================
// Chapter 15 — Abstract classes and abstract constructors
// =============================================================================
// An abstract class is a base blueprint. You cannot create it directly. Abstract
// fields/methods have no implementation and concrete subclasses must implement
// every abstract member.

abstract class Shape {
  abstract getArea(): number;

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

// ❌ const shape = new Shape(); // Abstract classes cannot be instantiated.
const circle = new Circle(3);
circle.describe();

// Use `new () => Shape` when a function must accept a constructor that creates a
// concrete Shape. `typeof Shape` could also be the abstract Shape constructor.
function describeNewShape(ctor: new () => Shape): void {
  new ctor().describe();
}

class UnitSquare extends Shape {
  getArea(): number {
    return 1;
  }
}

describeNewShape(UnitSquare);
// ❌ describeNewShape(Shape); // Shape itself is abstract and cannot be `new`.

// =============================================================================
// Chapter 16 — Relationships between classes
// =============================================================================
// TypeScript usually compares class instances structurally: if shapes match,
// values may be assignable even without `extends`.

class PointOne {
  x = 0;
  y = 0;
}

class PointTwo {
  x = 0;
  y = 0;
}

const pointOne: PointOne = new PointTwo(); // Same public structure: allowed.
console.log(pointOne);

// An empty class has no required members, so almost any value matches it. Avoid
// using an empty class as a meaningful type; it tells TypeScript nothing useful.
class EmptyType {}

function acceptAnything(_: EmptyType): void {
  console.log('An empty class accepts any object-shaped value.');
}

acceptAnything({});

// =============================================================================
// End — Practical reminder
// =============================================================================
// Use an interface when you only need a shape/contract.
// Use a class when you need construction, instance data, methods, inheritance,
// or shared runtime behavior. TypeScript types disappear at runtime; classes do
// exist at runtime because they are JavaScript.
