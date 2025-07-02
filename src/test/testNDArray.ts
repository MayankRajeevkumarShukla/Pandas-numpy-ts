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
console.log("\n➡️ Reshape:");
const reshaped = arr1D.reshape([2, 2]);
reshaped.print();
console.log("\n➡️ Sum and Mean:");
console.log("Sum:", arr1D.sum());
console.log("Mean:", arr1D.mean());
console.log("\n➡️ Multiply:");
const mulScalar = arr1D.multiply(3);
mulScalar.print();
const mulArr = arr1D.multiply(new NDArray([1, 0, 1, 0]));
mulArr.print();
console.log("\n➡️ Subtract scalar:");
const subScalar = arr1D.subtract(2);
subScalar.print();
console.log("\n➡️ Subtract array:");
const otherArr = new NDArray([-1, 1, 1, 1]);
const subArr = arr1D.subtract(otherArr);
subArr.print();



