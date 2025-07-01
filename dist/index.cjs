"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  NDArray: () => NDArray
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NDArray
});
