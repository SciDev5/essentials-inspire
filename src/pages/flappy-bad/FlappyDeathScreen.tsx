import { css } from "@emotion/css";
import React from "react";

export default function FlappyDeathScreen(props:{score:number,time:number}) {
    return (
        <div className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "#ff777777",
            padding: "20%",
            textAlign: "center",
            "> *": {
                background: "#ff77bb",
                color: "#ffffff",
            },
        })}>
            <h1>you died</h1>
            <h2>
                score: {props.score}
            </h2>
            <h2>
                time: {
                    props.time >= 60000 ?
                        Math.floor(props.time/60000).toFixed(0)+":"+(props.time/1000).toFixed(2) :
                        (props.time/1000).toFixed(2)+"s"
                }
            </h2>
        </div>
    );
}