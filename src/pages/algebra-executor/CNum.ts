import LatexString, { latexStringPrecedence } from "./LatexString";

export default class CNum {
    constructor(
        readonly r:number,
        readonly i:number,
    ) {}

    plus(other:CNum) {
        return new CNum(
            this.r + other.r,
            this.i + other.i,
        );
    }
    times(other:CNum) {
        return new CNum(
            this.r * other.r - this.i * other.i,
            this.r * other.i + this.i * other.r,
        );
    }

    private nToLatex(n:number):string {
        const s = n.toString();
        if (/e/i.test(s)) {
            const [mantissa,exponent] = s.split(/e\+?/i);
            return `${mantissa} \\cdot 10^{${exponent}}`;
        }
        return s;
    }

    toLatex():LatexString {
        const r = this.nToLatex(this.r), i = this.nToLatex(this.i);
        return {
            text: [this.r !== 0 ? r : null, this.i !== 0 ? i+" i" : null].filter(v=>v !== null).join(" + ") || "0",
            precedence: latexStringPrecedence.sum,
        };
    }

    static readonly _i = new CNum(0,1);
    static readonly _1 = new CNum(1,0);
    static readonly _0 = new CNum(0,0);
    static r(n:number) { return new CNum(n,0) }
}