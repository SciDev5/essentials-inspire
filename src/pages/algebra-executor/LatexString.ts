export default interface LatexString {
    text: string;
    /** PEMDAS Precedence for the symbol represented by this string. Higher -> evaluates earlier */
    precedence: number;
}
export const latexStringPrecedence = {
    sum: 0,
    product: 10,
    exponent: 20,
    function: 40,
    number: 50,
    parenthesis: -Infinity,
} as const;