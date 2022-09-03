import React from "react";
import BirdJSX from "./BirdJSX";
import FlappyGame from "./FlappyGame";

export default class Bird {

    static readonly HEIGHT = 0.1;
    static readonly WIDTH = 0.1;
    static readonly X = 0.3;

    private pos = 0.5;
    private vel = FlappyGame.JUMP_POWER;
    get yCenter() { return this.pos }
    get yBottom() { return this.pos - Bird.HEIGHT/2 }

    readonly jsxRef = React.createRef<BirdJSX>();
    get jsx() { return this.jsxRef.current }

    update(dt:number) {
        this.pos += dt * this.vel;
        this.vel += dt * FlappyGame.GRAVITY_POWER;

        this.jsx?.setPosition(this.pos,this.vel);
    }

    flap() {
        this.vel = FlappyGame.JUMP_POWER;
    }

    unclipGround() {
        this.pos = Bird.HEIGHT * .75;
    }

    reset() {
        this.pos = 0.5;
        this.vel = FlappyGame.JUMP_POWER;

        this.jsx?.setDead(false);
    }
}