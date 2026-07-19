// If you provide ... before args it means we can use as many args as we want
function sum(...numbers: number[]) {
  numbers
}

sum(1, 2, 3)
sum()
sum(4, 5, 6, 7, 8, 9, 10)

// Overloaded functions - has different call signatures and can accept different types
// The idea is that there is multiple ways we can call this function
function getItemLength(name: string): number
function getItemLength(names: string[]): number
function getItemLength(nameOrNames: unknown): number {
  if (typeof nameOrNames === 'string') {
    return nameOrNames.length
  } else if (Array.isArray(nameOrNames)) {
    return nameOrNames.length
  } else {
    return 0
  }
}

getItemLength("")
getItemLength(["", ""])
