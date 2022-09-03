import { css } from "@emotion/css";
import { Random, Vec } from "@scidev5/util-h";
import React from "react";
import Obstacle from "./Obstacle";

class ExplodeDir {
    readonly displace:Vec;
    readonly displaceRot:number;
    constructor(top:boolean) {
        this.displace = new Vec(Random.floatInRange(.1,.4),(top?1:-1)*Random.floatBetween0And(.5));
        this.displaceRot = (top?-1:1)*Random.floatBetween0And(.5);
    }

    private displaceAtPercent(percent:number) {
        return this.displace.times(percent).plus(new Vec(0,-.5*(percent**2)));
    }
    private rotationAtPercent(percent:number) {
        return this.displaceRot * percent;
    }

    transformAtPercent(percent:number) {
        const rot = this.rotationAtPercent(percent),
            {x,y} = this.displaceAtPercent(percent).times(500);
        return [
            `translate(${x}px, ${-y}px)`,
            `rotate(${rot}turn)`,
            `scale(${Math.max(0,1-percent)**.5})`
        ].join(" ");
    }
}

export default class ObstacleJSX extends React.Component<{obstacle:Obstacle},{x:number, explodePercent:number}> {
    readonly explodeDirs = [new ExplodeDir(true), new ExplodeDir(false)];


    constructor(props:ObstacleJSX["props"]) {
        super(props);
        this.state = {
            x: props.obstacle.x,
            explodePercent: 0,
        };
    }
    setX(x:number) {
        this.setState({x});
    }
    private stillMounted = false;
    componentDidMount() { this.stillMounted = true }
    componentWillUnmount() { this.stillMounted = false }
    async explode() {
        const tStart = await this.nextAnimationFrame, endT = 1000;
        let t = 0;
        while (this.stillMounted && t < endT) {
            this.setState({explodePercent: t/endT});
            t = (await this.nextAnimationFrame) - tStart;
        }
    }
    readonly nextAnimationFrame = {then(res:(t:number)=>void){requestAnimationFrame(res)}};
    render(): React.ReactNode {
        const {
            state: {
                x,
                explodePercent,
            },
            props: {
                obstacle,
            },
        } = this;
        return (
            <div
                style={{
                    left: (100*x)+"%",
                }}
                className={css({
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    width: (100*Obstacle.WIDTH)+"%",
                    "> *": {
                        margin: 0,
                    },
                })}
            >
                <div
                    style={{
                        flexGrow: 2-obstacle.yCenter*2-obstacle.yHeight,
                        transform: this.explodeDirs[0].transformAtPercent(explodePercent),
                    }}
                    className={css({
                        background: "linear-gradient(to top, #ff44dd, transparent)",
                    })}
                ></div>
                <div
                    style={{
                        flexGrow: obstacle.yHeight*2,
                    }}
                    className={css({
                    })}
                ></div>
                <div
                    style={{
                        flexGrow: obstacle.yCenter*2-obstacle.yHeight,
                        transform: this.explodeDirs[1].transformAtPercent(explodePercent),
                    }}
                    className={css({
                        background: "linear-gradient(to bottom, #44ffdd, transparent)",
                    })}
                ></div>
            </div>
        );
    }
}