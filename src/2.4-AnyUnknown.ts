// Any means tell the compiler to ignore type check for that variable
let x: any = 1

// x.length // valid code even we can not do it to numbers
x

// You use any type typically when you are in a very complex situation and you are not
// able to predict what the type of the variables is going to be

// Is a type-safe counterpart to the 'any type'
// It provides a powerful way to handle values of uncertain types while maintaining type safety
let y: unknown = 1
y + 2

if (typeof y == "number") {
  const result = y + 1 // number
  result
} else if (typeof y == "string") {
  const result = y.length // valid code as we check for type of string
  result
} else {
  // code-here
}

const result = (y as number) + 1 // treat y as is a type of number
result

function processFeedback(input: any): void {
  // Assume we can perform any operation without explicit typechecks
  console.log(`Processing: ${input}`)

  // Further processing logic...
}

processFeedback('Great service!') // Works
processFeedback(5) // Works
processFeedback(new Blob()) // Works
