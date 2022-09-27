import CNum from "../CNum";
import flatIf from "../flatIf";
import LatexString, { latexStringPrecedence } from "../LatexString";
import ReadonlyCommutativeArray from "../ReadonlyCommutativeArray";
import MSymbol from "./MSymbol";


export default class SymbolSum extends MSymbol {
    readonly symbols:ReadonlyCommutativeArray<MSymbol>;
    constructor(
        symbolsIn: MSymbol[],
    ) {
        super();
        this.symbols = new ReadonlyCommutativeArray(
            flatIf(
                symbolsIn,
                v=>(v instanceof SymbolSum) ? [...v.symbols.storage] : null
            ));
    }

    readonly symbolTypeIndex = 81304882.459180;
    compareSameType(other:MSymbol) {
        if (!(other instanceof SymbolSum)) throw new TypeError("type mismatch");

        return ReadonlyCommutativeArray.compare(this.symbols,other.symbols);
    }


    eval(varMap?: { [id: symbol]: CNum; } | undefined): CNum {
        return this.symbols.storage.map(v=>v.eval(varMap)).reduce((a,b)=>a.plus(b));
    }
    reduce(): MSymbol {
        throw new Error("Method not implemented.");
    }
    expand(): MSymbol {
        throw new Error("Method not implemented.");
    }

    toLatex(): LatexString {
        return {
            text: this.symbols.storage.map(v=>v.toLatex()).map(v=>latexStringPrecedence.sum >= v.precedence ? `( ${v.text} )` : v.text).join(" + ").replace(/\+-/g,"-"),
            precedence: latexStringPrecedence.sum,
        };
    }


}