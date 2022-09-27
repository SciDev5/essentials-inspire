import CNum from "../CNum";
import Comparable from "../Comparable";
import LatexString from "../LatexString";
import SymbolX from "../SymbolX";

export default abstract class MSymbol implements Comparable<MSymbol> {
    abstract eval(varMap?:{[id:symbol]:CNum}):CNum;
    abstract reduce():MSymbol;
    abstract expand():MSymbol;

    abstract readonly symbolTypeIndex:number;
    [SymbolX.compare](other:MSymbol) {
        const relIndex = this.symbolTypeIndex - other.symbolTypeIndex;
        if (relIndex !== 0)
            return relIndex;
        return this.compareSameType(other);
    }
    abstract compareSameType(other:MSymbol):number;

    abstract toLatex():LatexString;
}