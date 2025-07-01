declare class NDArray {
    private data;
    private _shape;
    constructor(values: number[] | number[][]);
    add(value: NDArray | number): NDArray;
    get shape(): number[];
    print(): void;
}

export { NDArray };
