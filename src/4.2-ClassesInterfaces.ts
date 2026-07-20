// When we extend a class with a keyword extends we inherit functionality from another class
// Interface doesn't actually define any functionality or behaviour.

// We define it, we write it out, we declare its existence, we don't implement
// all of the functionality.

// We can use it for objects or can use it for classes.
// Implement means define any of the methods or properties that exist on the interface.
// The interface we do not extends we implements it.

// You use interface when there's no functionality that you want to define concretely.
// By using abstract class, you are going to be writing a behavior that will be reuse by one of the concrete classes.
// It simplifies our program and it allows us to treat different objects as they were the same type.
// Making things quite a bit more flexible.
interface Animal {
  raceName: string;
  legs: 2 | 4;
  speak?(): void;
}

class Cat implements Animal {
  name?: string;
  color?: string;

  speak(): void {
    // some code
  }
}

class Dog implements Animal {
  private name?: string;
  public color?: string;

  bark?(): void {
    console.log(`I am ${this.name} and my color is ${this.color}`);
  }

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  speak(): void {
    console.log(`Am I speaking and my color is ${this.color}?`);
  }

  test?(): number {
    return 1;
  }
}

const doggy01 = new Dog('Husky', 'brown');
const doggy02 = new Dog('Tiapeutin', 'black');

doggy01.bark?.();
doggy01.speak();

doggy02.bark?.();
doggy02.speak();

console.log(`My color is ${doggy01.color}`);

const dog: Animal = {
  raceName: 'Husky',
  legs: 4,
  speak() {
    console.log(`Wof, I am ${this.raceName}.`);
  }
}

dog.speak?.();
console.log(`I have ${dog.legs} legs.`);
