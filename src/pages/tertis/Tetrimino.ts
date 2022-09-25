/* eslint-disable no-sparse-arrays */
import { Arr } from "@scidev5/util-h";

export default class Tetrimino {
    readonly sz:number;
    private readonly blocks:number[][];
    constructor(blocks:readonly (number|undefined)[][], n:number) {
        this.sz = blocks.length;
        if (!blocks.every(v=>v.length===this.sz)) throw new Error("non square or ragged tetrimino blocks!");
        this.blocks = blocks.map(row=>row.map(v=>v === undefined ? -1 : v+n));
    }

    rotated(rot:number) {
        const l=this.sz-1, lookups:((x:number,y:number)=>number)[] = [
            (x,y)=>this.blocks[y][x],
            (x,y)=>this.blocks[x][l-y],
            (x,y)=>this.blocks[l-y][l-x],
            (x,y)=>this.blocks[l-x][y],
        ], lookup = lookups[rot & 0b11];
        return Arr.genByI(this.sz,y=>Arr.genByI(this.sz,x=>lookup(x,y)));
    }

    static readonly SQUARE = new Tetrimino([
        [0,0,],
        [0,0,],
    ],0);
    static readonly LINE = new Tetrimino([
        [ ,0, , ,],
        [ ,0, , ,],
        [ ,0, , ,],
        [ ,0, , ,],
    ],1);
    static readonly T0 = new Tetrimino([
        [ ,0, ,],
        [ ,0,0,],
        [ ,0, ,],
    ],2);
    static readonly T1 = new Tetrimino([
        [ ,0, ,],
        [0,0, ,],
        [ ,0, ,],
    ],3);
    static readonly L0 = new Tetrimino([
        [ ,0, ,],
        [ ,0, ,],
        [ ,0,0,],
    ],4);
    static readonly L1 = new Tetrimino([
        [ ,0, ,],
        [ ,0, ,],
        [0,0, ,],
    ],5);
    static readonly S0 = new Tetrimino([
        [ ,0, ,],
        [ ,0,0,],
        [ , ,0,],
    ],6);
    static readonly S1 = new Tetrimino([
        [ ,0, ,],
        [0,0, ,],
        [0, , ,],
    ],7);
}