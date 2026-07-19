function sumTwoNum(x: number, y: number): number | string {
  return x + y
}

sumTwoNum(5, 10)

const result = sumTwoNum(2, 4)
result

function makeName(firstname: string, lastname: string, middlename?: string) {
  if (middlename) return firstname + ' ' + middlename + ' ' + lastname
  return firstname + ' ' + lastname
}

makeName('Danila', 'Lutsai')

// If we need a function as a parameter we can declare it in different ways
function callFunc(
  // Arrow function
  func: (f: string, l: string, m?: string) => string, 
  param01: string, 
  param02: string
) {
  return func + param01 + param02
}

callFunc

function mul(x: number, y: number): number {
  return x * y
}

function div(x: number, y: number): number {
  return x / y
}

function applyFunc(funcs: ((a: number, b: number) => number)[], values: [number, number][]): number[] {
  const results: number[] = []

  for (let i = 0; i < funcs.length; i++) {
    const args = values[i]
    const result = funcs[i](args[0], args[1])
    results.push(result)
  }

  return results
}

applyFunc([mul, div], [[1, 2], [3, 4]])
