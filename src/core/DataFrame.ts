import { NDArray } from "./NDArray";

type DataValue = string | number;
type DataInput =
  | Record<string, DataValue[]>
  | Array<Record<string, DataValue>>;

export class DataFrame {
  private columns: Record<string, NDArray | any[]>;
  private _length: number;

  constructor(data: DataInput) {
    this.columns = {};
    this._length = 0;

    if (Array.isArray(data)) {
      // Array of objects
      if (data.length === 0) throw new Error("Cannot create DataFrame from empty array");

      const keys = Object.keys(data[0]);
      for (const key of keys) {
        const colValues = data.map(row => row[key]);

        // Handle numeric columns via NDArray, others as raw array
        const isNumeric = colValues.every(v => typeof v === "number");

        if (isNumeric) {
          this.columns[key] = new NDArray(colValues as number[]);
        } else {
          this.columns[key] = colValues;
        }
      }

      this._length = data.length;

    } else {
      // Object of arrays
      const keys = Object.keys(data);
      const lengthSet = new Set(Object.values(data).map(col => col.length));
      if (lengthSet.size !== 1) throw new Error("All columns must have the same length");

      for (const key of keys) {
        const colValues = data[key];
        const isNumeric = colValues.every(v => typeof v === "number");

        if (isNumeric) {
          this.columns[key] = new NDArray(colValues as number[]);
        } else {
          this.columns[key] = colValues;
        }
      }

      this._length = Object.values(data)[0].length;
    }
  }

  get length() {
    return this._length;
  }

  get shape(): [number, number] {
    return [this._length, Object.keys(this.columns).length];
  }

  getColumn(name: string): NDArray | any[] {
    if (!(name in this.columns)) throw new Error(`Column "${name}" not found`);
    return this.columns[name];
  }

  get columnsList(): string[] {
    return Object.keys(this.columns);
  }
}
