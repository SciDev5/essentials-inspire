/**
 * may or may not work as inteneded, though it will mostly work
 */

export default class RPath {
    readonly path:readonly string[];
    constructor(...pathIn:string[]) {
        pathIn = pathIn.flatMap(v=>v.split(/[/\\]/)).map(v=>v.trim()).filter(v=>v&&v!==".");
        for (let i = pathIn.length-1; i >= 1; i--)
            if (pathIn[i] === ".." && pathIn[i-1] !== "..")
                pathIn.splice(i-1,2);
        this.path = pathIn;
    }

    static join(rPath:RPath,...paths:string[]):RPath {
        return new RPath(...rPath.path,...paths);
    }
}