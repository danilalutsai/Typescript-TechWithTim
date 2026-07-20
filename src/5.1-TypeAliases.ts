// Type aliases allow you to create custom names for complex
// types, making your code more readable and maintainable.

// With type we create our own type alias
type Coordinate = [number, number];
type CoordinateReturn = number[][];
type List = string[][];

const list: List = [['dog']]
console.log(list);

// If you are working with classes you should implement interfaces
// But when you are making you own custom type you working with a type alias

// There are many differences between interfaces and types but one of them is that
// We cannot implement or extend type

// We don't need to make that a Type we can keep it as an interface because it is a type of object
// And when we are working with no objects like arrays or tuples we create custom type
type DeveloperType = {
  name: string;
  age?: number;
  isDeveloper?: boolean;
}

interface DeveloperInterface {
  name: string;
  age?: number;
  isDeveloper?: boolean;
}


// See, nothing changes from DeveloperType to DeveloperInterface
// It makes more sence when we are working with object to use Interface instead of Type
function getDeveloper(developer1: DeveloperType, developer2: DeveloperInterface): void {
  console.log(developer1, developer2);
}

getDeveloper({ name: 'Danila' }, { name: 'Nikita' }) // { name: "Danila" }, { name: "Nikita" }

// It allow us to create our own custom type for non-object base types
function compareCoords(p1?: Coordinate, p2?: Coordinate): CoordinateReturn {

  // We include if is undefined process to 0 with ?? that means undefined or null
  return [[p1?.[0] ?? 0, p1?.[1] ?? 0], [p2?.[0] ?? 0, p2?.[1] ?? 0]];
}

const coords: Coordinate[] = [[2, 3], [3, 1]];
const coordsDefault: [number, number][] = [[3, 1], [2, 5]];

console.log(compareCoords([1, 3], [2, 4]), coords, coordsDefault);
