import CNum from "../CNum";
import LatexString, { latexStringPrecedence } from "../LatexString";
import MSymbol from "./MSymbol";

export default class SymbolVar extends MSymbol {
    readonly id = Symbol();
    private readonly idN = Math.random();
    readonly variesOn = new Set<SymbolVar>;
    readonly variesIn = new Set<SymbolVar>;
    constructor(
        readonly name:string,
    ) { super() }

    eval(varMap: { [id: symbol]: CNum; } = {}): CNum {
        return varMap[this.id];
    }
    reduce(): MSymbol {
        return this;
    }
    expand(): MSymbol {
        return this;
    }
    toLatex(): LatexString {
        return {
            text: this.name,
            precedence: latexStringPrecedence.number,
        };
    }

    readonly symbolTypeIndex = 5230582395.0242;
    compareSameType(other: MSymbol): number {
        return this.idN - (other as SymbolVar).idN;
    }
}