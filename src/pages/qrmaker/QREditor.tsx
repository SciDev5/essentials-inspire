import { css } from "@emotion/css";
import React from "react";

export default function QREditor(props:{cnvRef:React.RefObject<HTMLCanvasElement>,codeReady:boolean,children:React.ReactNode}) {
    return (
        <div className={css({
            display: "flex",
            flexWrap: "wrap",
        })}>
            <div
                className={css({
                    flexBasis: 200,
                    flexGrow: 1,
                    display: "block",
                })}
            >
                {props.children}
            </div>
            <div className={css({
                flexGrow: 1.5,
                textAlign: "center",
                "canvas": {
                    width: "min(90vh,50vw)",
                    opacity: props.codeReady ? 1 : .3,
                },
            })}>
                <canvas ref={props.cnvRef}/>
            </div>
        </div>
    );
}