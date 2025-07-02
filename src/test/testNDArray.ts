import { NDArray } from "../core/NDArray";
const arr1D = new NDArray([1,2,3,4])
arr1D.print()
const arr2D = new NDArray([
  [1, 2],
  [3, 4],
  [5, 6]
])
console.log("Shape:", arr2D.shape);
arr2D.print();
console.log("\n➡️ Add scalar:");
const addedScalar = arr1D.add(10);
addedScalar.print();

console.log("\n➡️ Add arrays:");
const another1D = new NDArray([9, 8, 7, 6]);
const addedArr = arr1D.add(another1D);
addedArr.print();
console.log("\n➡️ Map (square each element):");
const mapped = arr1D.map(x => x * x);
mapped.print();
