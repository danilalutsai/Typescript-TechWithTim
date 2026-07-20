// Between angular brackets and T is a variable of type we will be using
class DataStore<T> {
  items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T {
    return this.items[index];
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

interface User {
  name: string;
  id: number;
}

// When creating an instance of a class we specify data type we will be using in that instance
const data = new DataStore<string>();

// We can extensionate the interface within the type of data we going to use
const dataUser = new DataStore<User>();

data.addItem('Boxers');
console.log(data.getItem(0));

dataUser.addItem({name: 'Boxers', id: 1512})
dataUser.addItem({name: 'T-Shirt', id: 8882})
dataUser.addItem({name: 'Hat', id: 3204})
dataUser.addItem({name: 'Trousers', id: 8461})
dataUser.addItem({name: 'Mask', id: 1802})
console.log(dataUser.getAllItems());


// This is a generic function that takes two types K, V.
function getValue<K, V>(key: K, value1: V, value2: V): V {
  if (key) {
    return value1;
  }
  return value2;
}

const n1: number = 1;
const n2: number = 2;

// Here we use <string, number> as two generics types for our function
// It allows us to have more flexible functions, methods, classes, etc. that can accept any different data types
console.log(getValue<string, number>("", n1, n2)); // 2 as we don't have key
console.log(getValue<string, number>("key", n1, n2)); // 1 as we have key

