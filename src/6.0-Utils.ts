// Modules - import / export code
// To better organize and to separate out different areas of our code so it's easier
// to locate different components

// The simpliest way of exporting is by adding export keyword - is called named export
export function add(x: number, y: number): number {
  return x + y
}

function sub(x: number, y: number): number {
  return x - y;
}

function test(): string {
  return "test";
}

// It is conventional to export in the very bottom of your file
// You can only have default export for one item
export default test;
export { sub };

