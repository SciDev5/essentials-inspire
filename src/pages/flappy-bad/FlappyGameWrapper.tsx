import React, { Keybind, useKeybind, useWindowEvent } from "@scidev5/util-h";
import { useEffect, useRef, useState } from "react";
import FlappyGame from "./FlappyGame";

export default function FlappyGameWrapper() {
    const ref = useRef<FlappyGame>(null);
    const [scrollPause, setScrollPaused] = useState(true);

    useKeybind(new Keybind(" "),()=>{
        ref.current?.onPressSpace();
    });

    useEffect(()=>{
        const game = ref.current;
        if (!game) return;
        game.loop();
        return ()=>game.clearLoop();
    },[ref.current]);

    useWindowEvent("scroll",e=>{
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
        console.log(isAtBottom);

        setScrollPaused(!isAtBottom);
    });

    return (
        <div
            onTouchStart={e=>{
                ref.current?.onPressSpace();
            }}
        >
            <FlappyGame {...{ref,scrollPause}} />
        </div>
    );
}