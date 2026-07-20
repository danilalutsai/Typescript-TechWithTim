// Typescript utility types are built-in types that enable you to transform and manipulate
// existing types in various ways

// There is 5 types:


// 1. Partial utility type
// It takes an existing type and make all its properties optional
interface Todo {
  title: string;
  description: string;
}

const updateTodo = (todo: Partial<Todo>) => {
  // If they don't exist so they are undefined or null we pass through ?? keyword 
  console.log(
    todo.description ?? "Description doesn't exist.", 
    todo.title ?? "Title doesn't exist."
  ) // Now they are optional with ? keyword
};

updateTodo({})


// 2. Readonly
// Creates a new type where all properties are readonly.
// This means they cannot be reassigned after the object is created.
// Readonly<T> only prevents changes at TypeScript compile time.

interface ReadonlyTodo {
  title: string;
  description: string;
}

const readonlyTodo: Readonly<ReadonlyTodo> = {
  title: "Learn TypeScript.",
  description: "No description.",
};

console.log(readonlyTodo.title, readonlyTodo.description);

// This would cause a TypeScript error:
// readonlyTodo.title = "New title";


// 3. Record
// It helps define a type with property names such as id and map the values to the type of the data
interface PageInfo {
  title: string;
}

// It has string key now
const pages: Record<string, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};

// It has number key now
const pagesNumbers: Record<number, PageInfo> = {
  0: { title: "Home" },
  1: { title: "About" },
  2: { title: "Contact" },
};

console.log(pages, pagesNumbers);


// 4. Pick utility type
// Allows you to create new types by picking a set of properties from an existing type

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// We create a new type and we want all the properties in a new type that are listed after comma
type TodoPreview = Pick<Todo, "title">;

const todo: TodoPreview = {
  title: "Clean room",
}

console.log(todo);


// 5. Omit utility type
// Constructs a new type by picking all properties from an existing type but
// excluding a set of keys (in our example we omit "id")

interface OmitTodo {
  id: number;
  title: string;
  completed: boolean;
}

type TodoPreviews = Omit<OmitTodo, "id">;

const todos: TodoPreviews = {
  title: "Clean room",
  completed: false,
};

console.log(todos.title, todos.completed);

