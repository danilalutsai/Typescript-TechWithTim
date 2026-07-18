// Primitive types: number, strings, booleans, null, undefined
let a: number = 1;
let b: string = 'str';
let c: boolean = true;

// Use null when you want to explicitly define something as empty or non-existent
let d: null = null;

// Is more used as a "placeholder" that means a variable has been declared but 
// has not yet been assigned the value
let e: undefined = undefined;
let f: any = 'anything'
f = 3
f = true
let g: number | string = 5

// type void
// Is used whenever we don't return nothing from a function

// type never
// Is used whenever we explicitly define that a function never returns
const arr01: number[] = [3, 4, 5]
const arr02: (number | string)[] = [1, 'string', 3]
const arr03 = [1, 2, 'string']

// Nested array
const arr04: number[][] = [[1], [2], [3]]

// Tuple is a fixed length array that has defined values for each position in the array
const coord: [number, string] = [5, '10']

// Array of tuples
const coords: [number, number][] = [
  [1, 2],
  [3, 4]
]

// Input variables so tsc don't get angry on us
a
b
c
d
e
f
g

arr01
arr02
arr03
arr04
coord
coords
