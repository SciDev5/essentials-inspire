import { css } from "@emotion/css";
import React from "react";

export default function FlappyStartScreen() {
    return (
        <div className={css({
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "#ff88ff77",
            padding: "20%",
            textAlign: "center",
            "> *": {
                background: "#dd77ff",
                color: "#ffffff",
            },
        })}>
            <h1>Flappy burd</h1>
            <h2>
                {"ontouchend" in window ?
                    "Tap to play" :
                    "Press space to play"
                }
            </h2>
        </div>
    );
}