import { Arr, Random } from "@scidev5/util-h";
import React from "react";
import TetBlock from "./TetBlock";
import TetBoard from "./TetBoard";
import Tetrimino from "./Tetrimino";

const WIDTH = 10, HEIGHT = 15;

export default class TertisGame extends React.Component<{_?:never},{blocks:TetBlock[][]}> {
    constructor(props:TertisGame["props"]) {
        super(props);

        this.state = {blocks:this.renderBlocksCombined};
    }

    inputMoveX(amt:number) {
        // todo
    }
    inputMoveDown() {
        // todo
    }
    inputMoveSlam() {
        // todo
    }



    private readonly renderBlocks = Arr.genByI(HEIGHT,y=>Arr.genFill(WIDTH,TetBlock.fading(.3)));
    private readonly renderBlocksFalling:(TetBlock|null)[][] = Arr.genByI(HEIGHT,y=>Arr.genFill(WIDTH,null));
    private get renderBlocksCombined() {
        return this.renderBlocks.map((row,y)=>row.map((block,x)=>this.renderBlocksFalling[y][x] ?? block));
    }
    private readonly placedBlocks = Arr.genByI(HEIGHT,y=>Arr.genFill(WIDTH,-1));
    updateVisibleBlockState() {
        this.setState({blocks:this.renderBlocksCombined});
    }
    removeRow(y:number,h=1) {
        this.placedBlocks.splice(y,h);
        this.placedBlocks.push(...Arr.genByI(h,y=>Arr.genFill(WIDTH,-1)));
    }
    getBlock(x:number) {
        ///
    }

    private fallingTetrimino = Tetrimino.LINE;
    private fallingTetriminoBottom = HEIGHT-1;
    private fallingTetriminoX = Math.floor((WIDTH-this.fallingTetrimino.sz)/2);
    private fallingTetriminoRotation = 0;

    private updateBlocksFalling() {
        this.renderBlocksFalling.length = 0;
        this.renderBlocksFalling.length = HEIGHT;
        this.renderBlocksFalling.fill(Arr.genFill(WIDTH,null));
        const tetBlocks = this.fallingTetrimino.rotated(this.fallingTetriminoRotation);
        for (let i = 0; i < this.fallingTetrimino.sz; i++) {
            const y = i+this.fallingTetriminoBottom-(this.fallingTetrimino.sz-1);
            this.renderBlocksFalling[y] = Arr.genFill(WIDTH,null);
            for (let j = 0; j < this.fallingTetrimino.sz; j++) {
                const x = j+this.fallingTetriminoX;
                if (tetBlocks[i][j] >= 0)
                    this.renderBlocksFalling[y][x] = TetBlock.filled(tetBlocks[i][j]);
            }
        }
    }


    private loop = ()=>{
        this.fallingTetriminoBottom += 1;
        this.fallingTetriminoBottom %= HEIGHT;
        if (Math.random() < .3)
            this.fallingTetriminoRotation ++;

        if (Math.random() < .05)
            this.fallingTetrimino = Random.sample([Tetrimino.LINE,Tetrimino.SQUARE,Tetrimino.L0,Tetrimino.L1,Tetrimino.S0,Tetrimino.S1,Tetrimino.T0,Tetrimino.T1]);

        this.updateBlocksFalling();
        this.updateVisibleBlockState();
    };
    private loopId?:NodeJS.Timer;

    componentDidMount() {
        this.loopId = setInterval(this.loop,50);
    }
    componentWillUnmount() {
        clearInterval(this.loopId);
    }

    render(): React.ReactNode {
        const blocks = this.state.blocks;
        return (
            <div>
                <TetBoard {...{ blocks }}/>
            </div>
        );
    }
}