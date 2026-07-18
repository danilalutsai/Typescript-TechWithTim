// Literal is a textual representation (notation) of a value as it is written in source code
// Is an instance of a primitive type. 'str', 23, true all those are literals of different type

let direction: string
direction = 'string'

let liretalDirection: 'north' | 'south' | 'east' | 'west'
liretalDirection = 'north'

let responseCode: number
responseCode = 404

let literalResponseCode: 200 | 201 | 404
literalResponseCode = 200

// Now the value of this variable can only be true
let literalResponseCodeTrue: true
literalResponseCodeTrue = true

// enums stands for enumeration - they enable developers to establish a colletcion of named
// constants (enumerators), each linked with an integer value
enum Size {
  Small = 0,
  Medium = 5,
  Large = 10,
}

Size.Small
let size: Size = 5
size // Medium

if (size === Size.Medium) {
  // code here
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const left: Direction = Direction.Left
left

let dir: Direction
dir = Direction.Right

// Enums are treated as data types, and you can use them to create sets of constants
// for use with variables and properties.
