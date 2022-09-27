import SymbolX from "./SymbolX";

export default interface Comparable<T> {
    /** Compare two things, return positive if this is bigger, negative if other is bigger, and 0 otherwise */
    [SymbolX.compare](other:T):number;
}

export function compareAB<T extends Comparable<T>>(a:T,b:T) {
    return a[SymbolX.compare](b);
}