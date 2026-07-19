// Question mark ? and explanation point ! operators allows us to check and deal with
// undefined values within Typescript.

const arr = [{ name: 'Tim' }, { name: 'Joe' }, { name: 'Jane' }]

// Pop removes and returns last element from an array
// Question mark looks for the result of the statement to the left of question mark
// and it first checks if it is undefined or not. If is undefined it stops and assign
// undefined to this variable as a value. If it's not undefined it will continue going.
const el = arr.pop()?.name
el

const arr02 = [[{ name: 'Tim' }]]
const el02 = arr02.pop()?.pop()?.name
el02

const arr03 = [[{ name: 'Joe' }]]
const el03 = arr03.pop()!.pop()!.name
el03

// Exclamation poing ! is known as a Bang in typescript. 
// It tells the compiler to ignore the possibility of it being undefined.
// The difference with question mark is that the ? stops the code if is undefined but ! mark
// keeps going and assign a type to a variable even is undefined.
// We gonna get an error in our example as we want to acces the property of undefinned it
// returns an error. But we force the code to execute .name even if the value of previous state is undefined.

