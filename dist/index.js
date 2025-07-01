// src/core/NDArray.ts
var NDArray = class _NDArray {
  constructor(values) {
    if (Array.isArray(values[0])) {
      const flat = values.flat();
      this.data = new Float64Array(flat);
      const rows = values.length;
      const cols = values[0].length;
      this._shape = [rows, cols];
    } else {
      this.data = new Float64Array(values);
      this._shape = [this.data.length];
    }
  }
  add(value) {
    const result = new Float64Array(this.data.length);
    if (typeof value === "number") {
      for (let i = 0; i < this.data.length; i++) {
        result[i] = this.data[i] + value;
      }
    } else {
      if (this._shape.toString() !== value._shape.toString()) {
        throw new Error("Shape mismatch for element-wise addition");
      }
      for (let i = 0; i < this.data.length; i++) {
        result[i] = this.data[i] + value.data[i];
      }
    }
    const output = Object.create(_NDArray.prototype);
    output.data = result;
    output._shape = [...this._shape];
    return output;
  }
  get shape() {
    return this._shape;
  }
  print() {
    const [rows, cols] = this._shape.length === 2 ? this._shape : [1, this._shape[0]];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        row.push(this.data[idx].toFixed(2));
      }
      console.log(`[ ${row.join(", ")} ]`);
    }
  }
};
export {
  NDArray
};
