import React, { Keybind, useKeybind } from "@scidev5/util-h";
import { useEffect, useRef } from "react";
import FlappyGame from "./FlappyGame";

export default function FlappyGameWrapper() {
    const ref = useRef<FlappyGame>(null);

    useKeybind(new Keybind(" "),()=>{
        ref.current?.onPressSpace();
    });

    useEffect(()=>{
        const game = ref.current;
        if (!game) return;
        game.loop();
        return ()=>game.clearLoop();
    },[ref.current]);

    return (
        <div
            onTouchStart={e=>{
                ref.current?.onPressSpace();
            }}
        >
            <FlappyGame {...{ref}} />
        </div>
    );
}