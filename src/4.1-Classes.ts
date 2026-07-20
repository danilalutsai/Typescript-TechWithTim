// Classes
// Public, Private or Protected

class Person {

  // That means that this property over here can only be accessed within this class
  public name: string;
  
  // A property is public by default.
  protected age: number;

  // A protected specifies access to class members in the member-list up to the next access
  // specifier (public or private) or the end of the class definition.
  // If it doesn't have to be private make it protected.

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  };

  public greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }

  getName(): string {
    if (this.name.length < 2) return "";
    return this.name; // Now we can access name property through the getName method.
  }

  // Now we can access the name property using the getter or the setter.
  setName(name: string) {
    if (name.length < 5) return;
    this.name = name;
  }
}

class Employee extends Person {
  callMe(): void {
    console.log(`Hey, ${this.name}`)
  }
}

const per01 = new Person('Danila', 28); // Hello, my name is Danila
const per02 = new Person('Nikita', 30); // Hello, my name is Nikita
const empl01 = new Employee('Tim', 32);

// With private I can not execute the name property as is private.
// We can not access protected properties outside of scope either.
console.log(per01.name); // Danila
console.log(per02);
console.log(per01); //.age) // 28
console.log(per02); //.age) // 30
console.log(empl01.name); // Tim
empl01.callMe(); // Hey, Tim

// If nothing is written even is private or public, it becomes public by default
// By making a method private, you tell other programmers that this method is not 
// intended to be accessed directly.

// Abstract class is a restricted class that cannot be used to create objects and designed
// to be specifically used as a base class
// We can not create instances of abstract class
// We can extend it but we cannot actually instanceate this.

// Abstract class is meant to act as a base class that will be inherited from by a subclass
abstract class Animal {

  // This is an example of abstract function or method.
  abstract makeSound(duration: number): void;
  move(duration: number): void {
    console.log("Moving along...");
    this.makeSound(duration);
    console.log(`I'm greeting during ${this.makeSound}`);
  }
}

class Dog extends Animal {
  makeSound(duration: number) {
    console.log('Woof woof. During', duration, 'second(s)');
  }
}

class Cat extends Animal {
  makeSound(duration: number) {
    console.log('Meow meow. During', duration, 'second(s)');
  }
}

// Any abstract method is typically gonna be utilized by a concrete implementation in the abstract class
//

const dog = new Dog();
const cat = new Cat();
dog.makeSound(30);
cat.move(20);

console.log(Animal.prototype);

// const animal = new Animal()
