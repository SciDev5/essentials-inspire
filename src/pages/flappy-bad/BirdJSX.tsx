import { css, keyframes } from "@emotion/css";
import { EPromise } from "@scidev5/util-h";
import React from "react";
import Bird from "./Bird";
import birdImg from "./birdImg";

const dieAnim = keyframes({
    from: {
        opacity: 1,
        transform: [
            "rotate(-.3turn)",
            "translate(0vh, 0vh)",
            "scale(1)",
            "rotate(0turn)",
        ].join(" "),
    },
    to: {
        opacity: 0,
        transform: [
            "rotate(.2turn)",
            "translate(20vh, -70vh)",
            "scale(0)",
            "rotate(2turn)",
        ].join(" "),
    },
});

export default class BirdJSX extends React.Component<{bird:Bird},{pos:number,vel:number,dead:boolean}> {
    constructor(props:BirdJSX["props"]) {
        super(props);
        this.state = {
            pos: props.bird.yCenter,
            vel: 0,
            dead: false,
        };
    }

    setPosition(pos:number,vel:number) {
        this.setState({pos,vel});
    }

    setDead(dead:boolean) {
        this.setState({dead});
        if (!dead) delete this.dieAnimEnded;
    }
    private dieAnimEnded?:EPromise<void>;
    async dieAnim() {
        this.dieAnimEnded ??= new EPromise();
        this.setDead(true);
        await this.dieAnimEnded;
    }

    render(): React.ReactNode {
        return (
            <div
                style={{
                    top: `calc(${(1-this.state.pos-Bird.HEIGHT/2)*100}%)`,
                    right: (100*(1-Bird.X))+"%",
                }}
                className={css({
                    position: "absolute",
                    height: (100*Bird.HEIGHT)+"%",
                    width: (100*Bird.WIDTH)+"%",
                    border: "2px dotted #ff33cc",
                    background: `url('${birdImg}')`,
                    backgroundSize: "cover",
                    textAlign: "center",
                },this.state.dead ? {
                    animation: `${dieAnim} 1s both ease-out`,
                } : {})}
                onAnimationEnd={e=>{
                    if (e.animationName === dieAnim)
                        this.dieAnimEnded?.res();
                }}
            ></div>
        );
    }
}