import CNum from "../CNum";
import CPureNum from "../CPureNum";
import LatexString from "../LatexString";
import MSymbol from "./MSymbol";

export default class SymbolNumber extends MSymbol {
    constructor(
        readonly value:CPureNum,
    ) { super() }

    eval(varMap?: { [id: symbol]: CNum; } | undefined): CNum {
        return this.value.toFloat();
    }
    reduce(): MSymbol {
        return this;
    }
    expand(): MSymbol {
        return this;
    }

    toLatex(): LatexString {
        return this.value.toLatex();
    }


    readonly symbolTypeIndex = 8248040042.4993;
    compareSameType(other: MSymbol): number {
        if (!(other instanceof SymbolNumber)) throw new TypeError("type mismatch");
        return Number([
            this.value.r.numerator-other.value.r.numerator,
            this.value.i.numerator-other.value.i.numerator,
            this.value.r.denominator-other.value.r.denominator,
            this.value.i.denominator-other.value.i.denominator,
        ].find(v=>v !== 0n) ?? 0n);
    }
}