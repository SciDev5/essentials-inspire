import Comparable, { compareAB } from "./Comparable";

export default class ReadonlyCommutativeArray<T extends Comparable<T>> {
    readonly storage: readonly T[];
    readonly length: number;

    constructor(init:T[]=[]) {
        this.storage = [...init].sort(compareAB);
        this.length = this.storage.length;
    }

    find(value:T) {
        let upperBound = this.storage.length;
        let lowerBound = 0;
        for (;;) {
            const i = Math.floor(upperBound-lowerBound);
            if (value === this.storage[i]) return value;
            const comp = compareAB(value,this.storage[i]);
            if (comp > 0)
                lowerBound = i+1;
            else upperBound = i;

            if (upperBound-lowerBound === 0) return null;
        }
    }
    has(value:T) {
        return this.find(value) !== null;
    }


    static compare<T extends Comparable<T>>(
        a:ReadonlyCommutativeArray<T>,
        b:ReadonlyCommutativeArray<T>,
    ) {
        if (a.length !== b.length)
            return a.length - b.length;

        for (let i = 0; i < a.length; i++) {
            const childComparison = compareAB(a.storage[i],b.storage[i]);
            if (childComparison !== 0)
                return childComparison;
        }
        return 0;
    }
}