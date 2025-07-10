import { DataFrame } from "../core/DataFrame";

const df = new DataFrame([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 },
  { name: "David", age: 35 },
  { name: "Eve", age: 22 },
  { name: "Frank", age: 27 },
]);

console.log("\n➡️ df.head(3):");
df.head(3);

console.log("\n➡️ df.tail(2):");
df.tail(4);
