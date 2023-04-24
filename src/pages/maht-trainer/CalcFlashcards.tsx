import { css } from "@emotion/css";
import { Random } from "@scidev5/util-h";
import React, { useState } from "react";
import Latex from "react-latex";

interface Card {
    front: string,
    back: string,
}

const tests: Card[] = [];

function derivCard(y:string,yPrime:string):Card {
    return {
        front: `What is the derivative? $$y'=\\frac{d}{dx} ${y} $$`,
        back: `$y'= ${yPrime} $`,
    };
}
tests.push(...[
    derivCard("cos (x)","-sin (x)"),
    derivCard("sin (x)","cos (x)"),
    derivCard("tan (x) ","sec^2 (x)"),
    derivCard("sec (x)","sec (x) tan (x)"),
    derivCard("csc (x)","-csc (x) cot (x)"),
    derivCard("cot (x)","-csc^2 (x)"),

    derivCard("a x^n","an x^{n-1}"),
]);

function maclaurenCard(
    fn: string,
    sum: string,
    converge: string,
):Card[] {
    return [
        {
            front: `Sum for function $$ ${fn} $$`,
            back: `$$ \\sum_{n=0}^{\\infty} ${sum} $$`
        },
        // {
        //     front: `Interval of convergence for function $$ ${fn} $$`,
        //     back: `$$ ${converge} $$`
        // },
        {
            front: `Function for sum $$ \\sum_{n=0}^{\\infty} ${sum} $$`,
            back: `$$ ${fn} $$`
        }
    ];
}
tests.push(...[
    ...maclaurenCard("\\frac{1}{1-x}","x^n","(-1,1)"),


    ...maclaurenCard("\\frac{1}{1-x}","x^n","(-1,1)"),
    ...maclaurenCard("\\frac{1}{1+x}","(-1)^n x^n","(-1,1)"),

    ...maclaurenCard("e^x","\\frac{x^n}{n!}","(-\\infty,\\infty)"),
    ...maclaurenCard("ln(1+x)","(-1)^n \\frac{x^{n+1}}{n+1}","(-1,1]"),


    ...maclaurenCard("arctan(x)","(-1)^n \\frac{x^{2n+1}}{2n+1}","[-1,1]"),
    ...maclaurenCard("sin(x)","(-1)^n \\frac{x^{2n+1}}{(2n+1)!}","(-\\infty,\\infty)"),
    ...maclaurenCard("cos(x)","(-1)^n \\frac{x^{2n}}{(2n)!}","(-\\infty,\\infty)"),
]);

function seriesErrorCard(
    name: string,
    err: string,
    condition: string[],
):Card {
    return {
        front: `${name} error formula`,
        back: `$$ \\left| R_n \\right| \\le ${err} $$ if $$ ${condition.join(" $$ and $$")} $$`
    };
}
tests.push(...[
    seriesErrorCard("geometric","\\left|\\frac{a_{n+1}}{1-r}\\right|",["a_n=ar^n"]),
    seriesErrorCard("alternating","\\left| a_{n+1} \\right|",["\\left| a_{n+1} \\right| < \\left| a_n \\right|"]),
    seriesErrorCard("lagrange","max_c \\left|f^{(n+1)}(c) \\frac{\\left(x-a\\right)^{n+1}}{(n+1)!}\\right|",["c \\in [x,a]"]),
]);

export default function CalcFlashcards() {
    const [{front,back},setCard] = useState(Random.sample(tests));
    const randomizeCard = ()=>setCard(Random.sample(tests));
    const [showBack,setShowBack] = useState(false);

    return (
        <div className={css({
            margin: ".5em .7em",
            border: "1px solid",
            "> div, button": {
                border: "1px solid",
                padding: ".5em .7em",
                margin: ".5em .7em",
            },
        })}>
            <div>
                <p>
                    <Latex>
                        {front}
                    </Latex>
                </p>
            </div>
            {showBack ? (
                <div>
                    <p>
                        <Latex>
                            {back}
                        </Latex>
                    </p>
                    <button onClick={e=>{
                        setShowBack(false);
                        randomizeCard();
                    }}>next</button>
                </div>
            ) : (
                <button onClick={e=>{
                    setShowBack(true);
                }}>
                    showBack
                </button>
            )
            }
        </div>
    );
}