// Type guards are a way of checking the type of a value at runtime and narrowing its type in 
// a conditional block for example the keyword "typeof", "instanceof", "in", those are the main ones.

type StringOrNumber = string | number;

function add1(value: StringOrNumber): StringOrNumber {
  if (typeof value === "string") {
    return value + "1";
  } else {
    return value + 1;
  }
}

console.log(add1('1')); // 11
console.log(add1(1)); // 2


class Dog {
  firstname: string;
  middlename?: string;
  lastname?: string;
  
  constructor(firstname: string, middlename?: string, lastname?: string) {
    this.firstname = firstname;
    this.middlename = middlename;
    this.lastname = lastname;
  }
}

class Cat {
  firstname: string;

  constructor(firstname: string) {
    this.firstname = firstname;
  }
}

function getName(animal: Cat | Dog): void {
  if (animal instanceof Cat) {
    console.log(`The name is ${animal.firstname}`);
  } else if (animal instanceof Dog) {
    console.log(`The name is ${animal.firstname} ${animal.lastname ?? ""}`);
  } else {
    console.log(`Is not instance of a Dog or a Cat`)
  }
}

// We have "in" keyword to check if the property is in the object
function getNameUsingIn(animal: Cat | Dog): void {
  if (isDog(animal)) {
    console.log(`The middlename is ${animal.middlename}`);
  } else {
    console.log(`There is no middlename`);
  }
}

// We have "is" keyword to check if the property is in the object
function isDog(pet: Dog | Cat): pet is Dog {
  return (pet as Dog).middlename !== undefined;
}

const doggy = new Dog("Michael", "Bueno", "Suarez");
const catty = new Cat("Vaselisa");

getName(doggy); // The name is Michael Suarez
getName(catty); // The name is Vaselisa
getNameUsingIn(doggy); // The middlename is Bueno
console.log(isDog(doggy)); // true
console.log(isDog(catty)); // false
