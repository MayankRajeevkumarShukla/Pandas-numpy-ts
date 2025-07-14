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
  print(): void {
    const keys = this.columnsList;
    const rows: string[][] = [];

    for (let i = 0; i < this._length; i++) {
      const row: string[] = [];
      for (const key of keys) {
        const col = this.columns[key];
        if (col instanceof NDArray) {
          row.push(col.data[i].toString());
        } else {
          row.push(col[i]?.toString() ?? "");
        }
      }
      rows.push(row);
    }

    // Calculate column widths
    const colWidths = keys.map((key, idx) => {
      const maxContentWidth = Math.max(
        key.length,
        ...rows.map(row => row[idx].length)
      );
      return maxContentWidth;
    });

    // Build header row
    const header = keys.map((key, i) => key.padEnd(colWidths[i])).join(" | ");
    const separator = keys.map((_, i) => "-".repeat(colWidths[i])).join("-|-");

    console.log(header);
    console.log(separator);

    for (const row of rows) {
      const line = row.map((cell, i) => cell.padEnd(colWidths[i])).join(" | ");
      console.log(line);
    }
  }
  head(n: number = 5): void {
    const sliceCount = Math.min(n, this._length)
    this._printSlice(0, sliceCount)
  }
  tail(n: number = 5): void {
    const sliceCount = Math.min(n, this._length)
    const start = this._length - sliceCount
    this._printSlice(start, this._length)
  }
  private _printSlice(start: number, end: number): void {
    const keys = this.columnsList
    const rows: string[][] = []
    for (let i = start; i < end; i++) {
      const row: string[] = []
      for (const key of keys) {
        const col = this.columns[key]
        if (col instanceof NDArray) {
          row.push(col.data[i].toString())
        } else {
          row.push(col[i]?.toString() ?? "");
        }
      }
      rows.push(row)
    }
    // column width
    const colWidths = keys.map((key, idx) => {
      const maxContent = Math.max(
        key.length,
        ...rows.map(row => row[idx].length)
      )
      return maxContent
    })
    //Header
    const header = keys.map((key, i) => key.padEnd(colWidths[i])).join(" | ");
    const separator = keys.map((_, i) => "-".repeat(colWidths[i])).join("-|-");
    console.log(header);
    console.log(separator);

    for (const row of rows) {
      const line = row.map((cell, i) => cell.padEnd(colWidths[i])).join(" | ");
      console.log(line);
    }
  }
  select(columnNames:string[]) :DataFrame{
    const selected :Record<string,any[]> = {}
    for(const name of columnNames){
      if(!(name in this.columns)){
        throw new Error(`Column "${name}" not found`)
      }
      const col = this.columns[name]
      if(col instanceof NDArray){
        selected[name] = Array.from(col.data)
      }else{
        selected[name] =[...col]
      }
    }
    return new DataFrame(selected)
  }
  mean(columnName:string):number{
    const col = this.getColumn(columnName)
    if(!(col instanceof NDArray)){
           throw new Error(`Column "${columnName}" is not numeric`);

    }
    return col.mean();
  }
  sum(columnName:string):number{
    const col = this.getColumn(columnName)
    if(!(col instanceof NDArray)){
           throw new Error(`Column "${columnName}" is not numeric`);

    }
    return col.sum();
  }
   filter(predicate: (row: Record<string, any>) => boolean): DataFrame {
    const keys = this.columnsList;
    const resultRows: Record<string, any>[] = [];

    for (let i = 0; i < this._length; i++) {
      const row: Record<string, any> = {};

      for (const key of keys) {
        const col = this.columns[key];
        if (col instanceof NDArray) {
          row[key] = col.data[i];
        } else {
          row[key] = col[i];
        }
      }

      if (predicate(row)) {
        resultRows.push(row);
      }
    }

    return new DataFrame(resultRows);
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
