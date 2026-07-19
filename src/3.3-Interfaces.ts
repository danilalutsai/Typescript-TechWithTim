// Interfaces is a programming structure/syntax that allows the computer to enforce
// certain properties on an object.

// Interfaces allow us to view different objects as a specific type
// They allow us to interact with more complex objects and understand what properties they have

// Use an interface when you want to type in object that has different properties

interface Person {
  name: string
  age: number
  height?: number
  hello?: () => string
}

function testFunc(firstName: string, lastName: string): void {
  console.log(`Welcome, on board Mr/mrs ${firstName}, ${lastName}`)
}

function getFaceDetails(eyes: number, nouse: string, mouth: string, teeth?: number ): (string | number)[] {
  const numbersCount = eyes + (teeth ?? 0)
  const arrTotCount = []
  arrTotCount.push(nouse, mouth, numbersCount)
  return arrTotCount
}

getFaceDetails(2, 'big nouse', 'small mouth')

function example(
  firstName: string,
  lastName: string,
  numberValue: number,
  noUse: string,
  mouth: 'small mouth' | 'big mouth',
  teeth?: number
) { return 
  `
Hey, my name is ${firstName} ${lastName}. 
I am under number ${numberValue}, I have a ${noUse}, and 
very ${mouth} with ${teeth}
`
}

console.log(example('Danila', 'Lutsai', 10, 'small nouse', 'big mouth', 32))
console.log(example('Nikita', 'Popovich', 1, 'big nouse', 'big mouth', 32))

console.log(testFunc("Danila", "Lutsai"))

interface Employee extends Person {
  employeeId: number
}

interface Manager extends Person, Employee {
  employees?: Person[]
}

const manager: Manager = {
  name: 'Danila',
  age: 28,
  employeeId: 10,
}
manager

const person: Person = {
  name: "Tim",
  age: 23,
}

person.height
person.hello?.()

function getPerson(p: Person): Person {
  console.log(`My name is ${p.name}`)
  return {
    name: "Zack",
    age: 30,
  }
}
getPerson(person)

const worker: Employee = {
  name: "Tim",
  age: 28,
  employeeId: 185,
}

worker.hello?.()
worker.employeeId
