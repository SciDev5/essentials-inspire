import { css, keyframes } from "@emotion/css";
import { Arr, Random } from "@scidev5/util-h";
import React from "react";

const cols = Arr.genByI(10,i=>(
    `hsl(${Math.random()*360}deg, 90%, 60%)`
));


const EMPTY = Symbol();
const FILLED = Symbol();
const FADING = Symbol();
type TetBlockType = typeof EMPTY | typeof FILLED | typeof FADING;
export default class TetBlock {
    private readonly uid = Random.strFast();
    private static readonly css = {
        common: css({
            width: "1.5em",
            height: "1.5em",
        }),
        [EMPTY](n:number) { return css() },
        [FADING](n:number) { return css({
            animationName: keyframes({
                from: {
                    background: "#ff0000dd",
                },
                to: {
                    background: "transparent",
                },
            }),
            animationFillMode: "both",
        })+" "+css({
            animationDuration: n+"s",
        }); },
        [FILLED](n:number) { return css({
            background: cols[n],
        }); },
    } as const;

    private constructor(readonly typ:TetBlockType, readonly n:number) {}

    static readonly empty = new TetBlock(EMPTY,0);
    static readonly fading = (t=.4)=>new TetBlock(FADING,t);
    static readonly filled = (n:number)=>new TetBlock(FILLED,n);

    render():React.ReactNode {
        return (
            <td
                key={this.typ === FADING ? this.uid : 0}
                className={[
                    TetBlock.css.common,
                    TetBlock.css[this.typ](this.n),
                ].join(" ")}>
            </td>
        );
    }
}