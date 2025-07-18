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
console.log("\n➡️ df.select(['name', 'age']):");
const selected = df.select(["name", "age"]);
selected.print();
console.log("\n➡️ Mean of 'age':");
console.log("Mean age:", df.mean("age"));
console.log("\n➡️ Sum of 'age':");
console.log("Total age:", df.sum("age"));
console.log("\n➡️ Filter: age > 28");
const filtered = df.filter(row => row.age > 28);
filtered.print();
console.log("\n➡️ Map: increase all ages by 1");
const aged = df.map(row => ({
  ...row,
  age: row.age + 1
}));
aged.print();
console.log("\n➡️ Sorted by age (asc):");
df.sortBy("age").print();

console.log("\n➡️ Sorted by name (desc):");
df.sortBy("name", false).print();
