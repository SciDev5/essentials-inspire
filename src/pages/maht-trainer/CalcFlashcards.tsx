import { css } from "@emotion/css";
import { Random } from "@scidev5/util-h";
import React, { useState } from "react";
import Latex from "react-latex";

interface Card {
    front: string,
    back: string,
}

function derivCard(y:string,yPrime:string):Card {
    return {
        front: `What is the derivative? $$y'=\\frac{d}{dx} ${y} $$`,
        back: `$y'= ${yPrime} $`,
    };
}

const tests:Card[] = [
    derivCard("cos (x)","-sin (x)"),
    derivCard("sin (x)","cos (x)"),
    derivCard("tan (x) ","sec^2 (x)"),
    derivCard("sec (x)","sec (x) tan (x)"),
    derivCard("csc (x)","-csc (x) cot (x)"),
    derivCard("cot (x)","-csc^2 (x)"),

    derivCard("a x^n","an x^{n-1}"),
];

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