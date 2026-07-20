// The static keyword is a non-access modifier used for methods and attributes
// Variables and methods that are associated with the class rather than with each instance of a class

class Dog {
  // With static keyword we gonna create an attribute asociated with the class rather than with its instances
  // Now the variable instanceCount is associated with class itself
  static instanceCount: number = 0;
  name: string;

  // We also use static variables when you have some variables that belongs inside of the class
  static legs: number = 4;

  // We also can have static methods (functions).
  static decreaseCount = (): number => {
    return this.instanceCount -= 1;
  }

  static increaseCount = (): number => {
    return this.instanceCount += 1;
  }

  constructor(name: string) {
    // Now with this variable we can track the number of instances of a Dog class
    Dog.increaseCount();
    this.name = name;
  }
}

const dog1 = new Dog("Tim");
const dog2 = new Dog("Josh");
const dog3 = new Dog("Nyusha");

console.log(`The dogs names are: ${dog1.name}, ${dog2.name}, ${dog3.name}`);

// We access the static variable using the name of the Class not the name of the instance of a Class
let instancesOfDog: number = Dog.instanceCount;

instancesOfDog = Dog.decreaseCount();
instancesOfDog = Dog.decreaseCount();
instancesOfDog = Dog.increaseCount();

const legsOfDog: number = Dog.legs;

console.log(`The dogs count is ${instancesOfDog} and each dog has ${legsOfDog} legs.`);
