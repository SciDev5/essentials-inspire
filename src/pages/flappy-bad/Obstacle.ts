import { Random } from "@scidev5/util-h";
import React from "react";
import Bird from "./Bird";
import FlappyGame from "./FlappyGame";
import ObstacleJSX from "./ObstacleJSX";

export default class Obstacle {
    static readonly WIDTH = 0.1;

    readonly id = Random.strFast();

    readonly jsxRef = React.createRef<ObstacleJSX>();
    private get jsx() { return this.jsxRef.current }


    readonly yCenter = Random.floatInRange(.2,.8);
    readonly yHeight = Random.floatInRange(.3,.4);

    private _x = Random.floatInRange(1.5,1.8);
    public get x():number {
        return this._x;
    }
    public set x(x) {
        this._x = x;
        this.jsx?.setX(x);
    }


    constructor(readonly game:FlappyGame) {}

    update(dt:number) {
        this.x -= dt * this.game.obstacleSpeed;
    }

    isColliding(bird:Bird) {
        const dx = this.x - Bird.X;
        if (dx > 0 || dx < -(Obstacle.WIDTH+Bird.WIDTH))
            return false;

        return (
            bird.yCenter+Bird.HEIGHT/2 > this.yCenter+this.yHeight/2 || // top of bird is above top of opening
            bird.yCenter-Bird.HEIGHT/2 < this.yCenter-this.yHeight/2    // bottom of bird is below bottom of opening.
        );
    }
    passed = false;
    isPassing(bird:Bird) {
        if (this.passed) return false;
        const dx = this.x - Bird.X;

        if (dx < -(Obstacle.WIDTH+Bird.WIDTH)) {
            this.passed = true;
            return true;
        } else {
            return false;
        }
    }

    async explode() {
        await this.jsx?.explode();
    }
}