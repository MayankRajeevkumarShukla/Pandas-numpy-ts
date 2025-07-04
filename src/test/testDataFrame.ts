import { DataFrame } from "../core/DataFrame";

const df = new DataFrame([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 },
]);

console.log("Shape:", df.shape);
console.log("Columns:", df.columnsList);
console.log("Age Column:");
(df.getColumn("age") as any).print(); // NDArray only

// df.getColumn("name").print(); // ⚠️ This would error (string[])
