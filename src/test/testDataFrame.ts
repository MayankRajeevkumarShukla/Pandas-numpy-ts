import { DataFrame } from "../core/DataFrame";

const df = new DataFrame([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 },
]);

df.print();
