import React from "react";
import Bird from "./Bird";
import { css } from "@emotion/css";
import BirdJSX from "./BirdJSX";
import ObstacleJSX from "./ObstacleJSX";
import Obstacle from "./Obstacle";
import FlappyStartScreen from "./FlappyStartScreen";
import FlappyDeathScreen from "./FlappyDeathScreen";
import FlappyPauseScreen from "./FlappyPauseScreen";

export default class FlappyGame extends React.Component<{
    scrollPause:boolean,
},{
    score: number,
    lives: number,
    showDeathScreen: boolean,
    showStartScreen: boolean,
    obstacles: Obstacle[],
    explodingObstacles: Obstacle[],
}> {

    static readonly GRAVITY_POWER = -4;
    static readonly JUMP_POWER = 1;

    constructor(props:FlappyGame["props"]) {
        super(props);
        const { score, lives } = this;
        this.state = {
            showStartScreen: true,
            showDeathScreen: false,
            score,
            lives,
            obstacles: [],
            explodingObstacles: [],
        };
    }



    private readonly bird = new Bird;
    private readonly obstacles:Obstacle[] = [];
    private readonly explodingObstacles = new Set<Obstacle>;

    private _score = 0;
    private set score(score:number) {
        this._score = score;
        this.setState({ score });
    }
    private get score() {
        return this._score;
    }

    private _lives = 0;
    private set lives(lives:number) {
        this._lives = lives;
        this.setState({ lives });
    }
    private get lives() {
        return this._lives;
    }


    onPressSpace() {
        if (this.props.scrollPause)
            return;
        if (this.isPlaying)
            this.bird.flap();
        else if (this.canStart)
            this.play();
    }

    get obstacleSpeed() {
        return .5;//*this.playTime;
    }
    addNewObstacles() {
        if (this.obstacles.length === 0 || this.obstacles[0].x < 1) {
            this.obstacles.unshift(new Obstacle(this));
            this.setState({obstacles:[...this.obstacles]});
        }
    }
    removeOldObstacles() {
        // todo better x delete
        const firstOffscreenObstacleI = this.obstacles.findIndex(({x})=>x < -Obstacle.WIDTH);
        if (firstOffscreenObstacleI !== -1) {
            // cut off all obstacles after the first out of range one.
            this.obstacles.length = firstOffscreenObstacleI;
            this.setState({obstacles:[...this.obstacles]});
        }
    }
    incrementScoreIfPassedObstacles() {
        const nPassed = this.obstacles.filter(v=>v.isPassing(this.bird)).length;
        if (nPassed > 0)
            this.score += nPassed;
    }
    checkCollissions() {
        const collidingObstacles = this.obstacles.filter(v=>v.isColliding(this.bird));
        if (collidingObstacles.length > 0) {
            this.lives --;
            const explodePromises:Promise<void>[] = [];
            for (const obstacle of collidingObstacles) {
                this.explodingObstacles.add(obstacle);
                this.obstacles.splice(this.obstacles.indexOf(obstacle),1);
                explodePromises.push(obstacle.explode());
            }
            this.setState({
                obstacles: [...this.obstacles],
                explodingObstacles: [...this.explodingObstacles],
            });
            Promise.all(explodePromises).then(()=>{
                for (const obstacle of collidingObstacles)
                    this.explodingObstacles.delete(obstacle);
                this.setState({
                    explodingObstacles: [...this.explodingObstacles],
                });
            });
        }
        if (this.bird.yBottom < 0)
            this.lives = 0;
    }

    private isPlaying = false;
    private canStart = true;
    play() {
        this.score = 0;
        this.lives = 3;
        this.playStartTime = this.runTime;
        this.isPlaying = true;
        this.obstacles.length = 0;
        this.setState({obstacles:[...this.obstacles]});

        this.bird.reset();
        this.setState({
            showDeathScreen: false,
            showStartScreen: false,
        });
    }
    die() {
        this.isPlaying = false;
        this.setState({
            showDeathScreen: true,
        });
    }
    async deathAnimation() {
        await this.bird.jsx?.dieAnim();
    }

    private looping?:number;
    private lastT = 0;
    private runTime = 0;
    private playTime = 0;
    private playStartTime = 0;
    async loop() {
        await this.waitForNextFrame;
        this.runTime = 0;

        while (this.looping !== undefined) {
            const { dt } = await this.waitForNextFrame;

            if (this.props.scrollPause) continue;

            this.runTime += dt;

            if (this.isPlaying) {
                this.playTime = this.runTime-this.playStartTime;

                for (const obstacle of this.obstacles)
                    obstacle.update(dt);
                this.bird.update(dt);
                this.addNewObstacles();
                this.removeOldObstacles();

                this.checkCollissions();
                this.incrementScoreIfPassedObstacles();

                if (this.lives <= 0) {
                    this.canStart = false;
                    this.die();
                    await this.deathAnimation();
                    this.canStart = true;
                }
            }
        }
    }
    private readonly waitForNextFrame = {
        then: (res:((v:{t:number,dt:number})=>void))=>{
            this.clearLoop();
            this.looping = requestAnimationFrame(t=>{
                res({
                    t,
                    dt: (t-this.lastT)/1000,
                });
                this.lastT = t;
            });
        }
    };
    clearLoop() {
        cancelAnimationFrame(this.looping!);
        delete this.looping;
    }

    render(): React.ReactNode {
        const { score, lives, obstacles, explodingObstacles } = this.state;
        return (
            <div
                className={css({
                    overflow: "hidden",
                },{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    overflow: "clip",
                })}>
                <div className={css({
                    position: "absolute",
                    left: "5%",
                    top: "5%",
                    fontSize: "2em",
                    padding: ".2em .4em",
                    background: "#000000dd",
                    color: "#33ffdd",
                })}>{score} points</div>
                <div className={css({
                    position: "absolute",
                    right: "5%",
                    top: "5%",
                    fontSize: "3em",
                    padding: ".2em .4em",
                    background: "#000000dd",
                    color: "#ffffff",
                })}>
                    lives: <span
                        className={css({
                            color: "#ff225633",
                        })}
                    >{"␥".repeat(3-lives)}</span><span

                        className={css({
                            color: "#ff2256",
                        })}
                    >{"␥".repeat(lives)}</span>
                </div>
                <BirdJSX bird={this.bird} ref={this.bird.jsxRef} />
                {[
                    ...obstacles,
                    ...explodingObstacles,
                ].map(obstacle=>(
                    <ObstacleJSX
                        key={obstacle.id}
                        ref={obstacle.jsxRef}
                        obstacle={obstacle}
                    />
                ))}

                {this.state.showStartScreen && <FlappyStartScreen/>}
                {this.state.showDeathScreen && <FlappyDeathScreen {...{score,time:this.playTime}} />}

                {this.props.scrollPause && <FlappyPauseScreen/>}
            </div>
        );
    }

}