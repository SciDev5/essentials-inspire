import CNum from "./CNum";
import LatexString, { latexStringPrecedence } from "./LatexString";
import PureNum from "./PureNum";

export default class CPureNum {
    constructor(
        readonly r:PureNum,
        readonly i:PureNum,
    ) {}

    plus(other:CPureNum) {
        const
            r = this.r.plus(other.r),
            i = this.i.plus(other.i);
        if (r === null || i === null) return null;
        return new CPureNum(r,i);
    }
    times(other:CPureNum) {
        const
            r = this.r.times(other.r).minus(this.i.times(other.i)),
            i = this.r.times(other.i).plus(this.i.times(other.r));
        if (r === null || i === null) return null;
        return new CPureNum(r,i);
    }


    toFloat():CNum {
        return new CNum(
            this.r.toFloat(),
            this.i.toFloat(),
        );
    }
    toLatex():LatexString {
        return {
            text: [
                this.r.numerator !== 0n ? this.r.toLatex().text : null,
                this.i.numerator !== 0n ? `${this.i.toLatex().text} i` : null,
            ].filter(v => v !== null).join("+").replace(/\+-/g,"-") || "0",
            precedence: latexStringPrecedence.sum,
        };
    }

    static readonly _i = new CPureNum(PureNum._0,PureNum._1);
    static readonly _1 = new CPureNum(PureNum._1,PureNum._0);
    static readonly _0 = new CPureNum(PureNum._0,PureNum._0);
    static r(n:PureNum) { return new CPureNum(n,PureNum._0) }
}