import LatexString, { latexStringPrecedence } from "./LatexString";

export default class PureNum {
    constructor(
        readonly numerator: bigint,
        readonly denominator: bigint,
        readonly piPower: bigint = 0n,
        readonly ePower: bigint = 0n,
    ) {}

    plus(other:PureNum,lazy=false) {
        if (
            this.piPower !== other.piPower ||
            this.ePower !== other.ePower
        ) return null;
        const sum = new PureNum(
            this.numerator*other.denominator + other.numerator*this.denominator,
            this.denominator*other.denominator,
            this.piPower,
            this.ePower,
        );
        return lazy ? sum : sum.simplified();
    }
    minus(other:PureNum,lazy=false) {
        return this.plus(other.times(new PureNum(-1n,1n),true),lazy);
    }
    times(other:PureNum, lazy=false) {
        const product = new PureNum(
            this.numerator * other.numerator,
            this.denominator * other.denominator,
            this.piPower + other.piPower,
            this.ePower + other.ePower,
        );
        return lazy ? product : product.simplified();
    }

    simplified() {
        const gcf = PureNum.euclidGCF(this.numerator,this.denominator);
        const isNegative = this.numerator*this.denominator < 0;
        return new PureNum(
            this.numerator/gcf * (this.numerator<0n ? -1n : 1n) * (isNegative ? -1n : 1n),
            this.denominator/gcf * (this.denominator<0n ? -1n : 1n),
            this.piPower,
            this.ePower,
        );
    }

    /** Greatest common factor with Euclid's method */
    static euclidGCF(a:bigint,b:bigint) {
        if (a < 0n) a = -a;
        if (b < 0n) b = -b;
        while (a !== 0n && b !== 0n)
            if (a > b)
                a %= b;
            else
                b %= a;
        return a+b;
    }

    toFloat() {
        return Number(this.numerator)/Number(this.denominator)*(Math.PI**Number(this.piPower))*Math.exp(Number(this.ePower));
    }
    toLatex():LatexString {
        return {
            text: (this.denominator === 1n ? `${this.numerator}` : `\\frac{${this.numerator}}{${this.denominator}}`)
            + (this.piPower === 0n ? "" : this.piPower === 1n ? "\\pi " : `\\pi^{${this.piPower}}`)
            + (this.ePower === 0n ? "" : this.ePower === 1n ? "e " : `e^{${this.ePower}}`),
            precedence: this.denominator === 1n ? latexStringPrecedence.number : latexStringPrecedence.product,
        };
    }

    static readonly _0 = new PureNum(0n,1n);
    static readonly _1 = new PureNum(1n,1n);
    static readonly n1 = new PureNum(-1n,1n);
    static readonly _pi = new PureNum(1n,1n,1n,0n);
    static readonly _e = new PureNum(1n,1n,0n,1n);
}
