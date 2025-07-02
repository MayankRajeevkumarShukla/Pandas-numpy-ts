// src/core/NDArray.ts

export class NDArray {
  private data: Float64Array;
  private _shape: number[];

  constructor(values: number[] | number[][]) {
    if (Array.isArray(values[0])) {
      // 2D array
      const flat = (values as number[][]).flat();
      this.data = new Float64Array(flat);
      const rows = (values as number[][]).length;
      const cols = (values as number[][])[0].length;
      this._shape = [rows, cols];
    } else {
      // 1D array
      this.data = new Float64Array(values as number[]);
      this._shape = [this.data.length];
    }
  }
  add(value :NDArray |number):NDArray{
    const result = new Float64Array(this.data.length)
    if(typeof value === "number"){
      for(let i = 0;i<this.data.length;i++){
        result[i] = this.data[i]+value
      }
    }else{
       if (this._shape.toString() !== value._shape.toString()) {
        throw new Error("Shape mismatch for element-wise addition");
      }for(let i=0;i<this.data.length;i++){
        result[i]=this.data[i] + value.data[i]
      }
    }
    const output = Object.create(NDArray.prototype)
    output.data = result
    output._shape=[...this._shape]
    return output;
  }
  map(fn:(values:number,index:number)=>number):NDArray{
    const result = new Float64Array(this.data.length)
    for(let i = 0;i< this.data.length;i++){
      result[i] = fn(this.data[i],i)
    }
    const output = Object.create(NDArray.prototype)
    output.data = result
    output._shape = [...this._shape]
    return output;
  }
  reshape(newShape:number[]):NDArray{
    const totalSize = newShape.reduce((a,b)=>a*b,1)
    if(totalSize != this.data.length){
      throw new Error(
        `Cannot reshape array of size ${this.data.length} into shape ${newShape.join("x")}`
      )
    }
    const output = Object.create(NDArray.prototype)
    output.data = this.data
    output._shape = [...newShape]
    return output;
  }
  get shape(): number[] {
    return this._shape;
  }

  print(): void {
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
}
