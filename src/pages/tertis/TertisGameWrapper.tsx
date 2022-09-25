import { Keybind, useKeybind } from "@scidev5/util-h";
import React, { useRef } from "react";
import TertisGame from "./TertisGame";

export default function TertisGameWrapper() {
    const ref = useRef<TertisGame>(null);

    useKeybind(new Keybind(" "),()=>{
        ref.current?.inputMoveSlam();
    });
    useKeybind(new Keybind("DownArrow"),()=>{
        ref.current?.inputMoveDown();
    });
    useKeybind(new Keybind("LeftArrow").strict(),()=>{
        ref.current?.inputMoveX(-1);

    });
    useKeybind(new Keybind("RightArrow").strict(),()=>{
        ref.current?.inputMoveX(1);
    });

    return (
        <TertisGame
            {...{ref}}
        />
    );
}