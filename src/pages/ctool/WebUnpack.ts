import RPath from "./RPath";
import JSZip from "jszip";
import downloadZip from "./downloadZip";

/**
 * >>>>>>>>>>>>>>> WARNING!!!! <<<<<<<<<<<
 *
 * THIS IS SOME OF THE MOST HORRIFFIC CODE YOU WILL EVER
 * LAY EYES ON.
 *
 * Programmed in 1 afternoon (~5-6 hours maybe). It works
 * like 50%-60% of the time.
 *
 *
 */

export class CodeShatterShard {
    readonly inside:CodeShatterShard[] = [];
    constructor(
        private readonly textFull: readonly [string],
        readonly openedWith: string,
        public from: number,
        public to = Infinity,
    ) {}
    text_ = "";
    get text() {
        if (this.textFull.length)
            return this.text_ = this.textFull[0].substring(this.from,this.to);
        else return this.text_;
    }
    index(...i:number[]):CodeShatterShard {
        let t = this as CodeShatterShard;
        for (const index of i)
            t = t.inside[((index % t.inside.length) + t.inside.length) % t.inside.length];
        return t;
    }
}

export type WebunpackedProjectFileTree = {[key:string]:[WebunpackedProjectFileTree,number]|[WebunpackedProjectFileTree]};
export type WebunpackedProjectReferences = {[key:string]:number};
export interface WebunpackedProject {
    fileTree: WebunpackedProjectFileTree;
    references: WebunpackedProjectReferences;
}



export default class Webunpack {
    static shatter(textFull:string) {
        // let k = 0;

        // DEMONIC/MALBOLGE REGEX: Regex so terrifying and incomprehensible to the human mind
        // that it is best ridded from code with an exorcism.

        // textFull = textFull
        //     // .replace(/(?<!\w *)\/(.+?(?<!(?<!\\)\\)(?<!\[[^\]]*))\//g,(_,v)=>`_${"-".repeat(v.length)}_`)
        //     // .replace(/"(.*?(?<!(?<!\\)\\))"/g,(_,v)=>`"${"-".repeat(v.length)}"`)
        //     // .replace(/'(.*?(?<!(?<!\\)\\))'/g,(_,v)=>`'${"-".repeat(v.length)}'`)
        //     // NO USE .replace(/\/\/(.*?)\n/g,(_,v)=>`//${"-".repeat(v.length)}\n`)
        //     .replace(/(?<!\w *)\/(.+?(?<!(?<!\\)\\)(?<!(?<!\\)\[[^\]]*))\/|"(.*?(?<!(?<!\\)\\))"|'(.*?(?<!(?<!\\)\\))'/g,(_,a,b,c)=>`_${"-".repeat((a??b??c).length)}_`)
        //     .replace(/\/\*([^]*?)\*\//g,(_,v)=>`/*${"-".repeat(v.length)}*/`)
        //     .replace(/`([^]*?)(?<!\\)`/g,(_,v)=>`_${"-".repeat(v.length)}_`);

        const textFullRef = [textFull] as const;

        const w = new CodeShatterShard(textFullRef,"",0,textFull.length), wc = [w];

        let n = 0, k = 0, li = 0;
        for (const i of textFull
            .replace(/(?<!\w *)\/(.+?(?<!(?<!\\)\\)(?<!(?<!\\)\[[^\]]*))\/|"(.*?(?<!(?<!\\)\\))"|'(.*?(?<!(?<!\\)\\))'/g,(_,a,b,c)=>`_${"-".repeat((a??b??c).length)}_`)
            .replace(/\/\*([^]*?)\*\//g,(_,v)=>`/*${"-".repeat(v.length)}*/`)
            .replace(/`([^]*?)(?<!\\)`/g,(_,v)=>`_${"-".repeat(v.length)}_`)
            .replace(/(?<!\w *)\/(.+?(?<!(?<!\\)\\)(?<!(?<!\\)\[[^\]]*))\/|"(.*?(?<!(?<!\\)\\))"|'(.*?(?<!(?<!\\)\\))'/g,(_,a,b,c)=>`_${"-".repeat((a??b??c).length)}_`)
            .replace(/\/\*([^]*?)\*\//g,(_,v)=>`/*${"-".repeat(v.length)}*/`)
            .replace(/`([^]*?)(?<!\\)`/g,(_,v)=>`_${"-".repeat(v.length)}_`)
            .matchAll(
                // /({)|(})/g
                /([([{])|([)\]}])/g
            )
        ) {
            li = i.index!;
            n++;
            const [char,opening,closing] = i, kLim = Infinity; // disabled because it makes the bugs worse
            if (opening) {
                k++;
                if (k < kLim) {
                    const data = new CodeShatterShard(textFullRef, char, i.index!+1);
                    wc[wc.length-1].inside.push(data);
                    wc.push(data);
                }
            }
            if (closing) {
                if (k < kLim) {
                    const l = wc.pop()!;
                    // if (l === undefined) throw new Error();
                    l.to = i.index!;
                    l.text;
                    if (({")":"(","]":"[","}":"{"})[char] !== l.openedWith) {
                        console.log(textFull.substring(l.from -200, l.from) +"<FROM>"+textFull.substring(l.from, l.from+200));
                        console.log(textFull.substring(l.to -200, l.to) +"<!>"+textFull.substring(l.to, l.to+200));

                        console.log(l);

                        console.log(l.text);

                        return;
                    }
                }
                k--;
            }

            // if (k === 0)
            //     break;
        }
        console.log(n, k);
        console.log(textFull.substring(li-100,li)+"<X>"+textFull.substring(li,li+100));

        while (wc.length > 1)
            console.log(wc.pop());


        (textFullRef as never as unknown[]).length = 0;

        console.log(w);


        return w;
    }

    static entryModuleIndex(shatteredRoot:CodeShatterShard) {
        return parseInt(shatteredRoot.index(1,2).text);
    }
    static resolveModuleShard(shatteredRoot:CodeShatterShard, i:number) {
        return shatteredRoot.index(1,0,i-1);
    }

    static moduleDependencies(moduleShard:CodeShatterShard) {
        return JSON.parse(`{${
            moduleShard.index(2).text
                .replace(/(['"])?(\S*?)(['"])?:/g, "\"$2\": ")
                .replace(/,\s*$/,"")
        }}`) as {[name:string]:number};
    }
    static moduleCode(moduleShard:CodeShatterShard) {
        const [requireVarName,moduleVarName,moduleExportsVarName] = moduleShard.index(0).text.split(",").map(v=>v.trim());
        const rawCode = moduleShard.index(1).text;

        return (
            rawCode // not perfect but more than good enough
                .replace(new RegExp(`(?<!\\w)${requireVarName}\\(`,"g"),"require(")
                .replace(new RegExp(`(?<!\\w)${moduleVarName}\\.exports(\\W)`,"g"),"module.exports$1")
                .replace(new RegExp(`(?<!\\w)${moduleExportsVarName}\\.(\\w)`,"g"),"module.exports.$1")
        );
    }

    static resolveProject(shatteredRoot:CodeShatterShard, specifiedEntryIndex?:number):WebunpackedProject {
        const entryIndex = specifiedEntryIndex ?? this.entryModuleIndex(shatteredRoot);

        const modules:RPath[] = [], modulesToResolve:number[] = [entryIndex];
        modules[entryIndex] = new RPath("./$index$");

        const references:WebunpackedProjectReferences = {};

        while (modulesToResolve.length > 0) {
            const i = modulesToResolve.shift()!;
            const pathCurrent = modules[i];

            const deps = this.moduleDependencies(this.resolveModuleShard(shatteredRoot,i));
            for (const depName in deps) {
                const j = deps[depName];

                if (!depName.startsWith("./") && !depName.startsWith("../")) {
                    // only look at relative paths.
                    references[depName] = j;
                    continue;
                }
                if (j in modules)
                    continue; // skip modules we've already seen.

                modulesToResolve.push(j);
                modules[j] = new RPath(...pathCurrent.path,"/../",depName);
            }
        }

        const fileTreeRoot:WebunpackedProjectFileTree[string] = [{}] as WebunpackedProjectFileTree[string];

        for (const i in modules) {
            const path = modules[i];
            let t = fileTreeRoot;
            for (const entry of path.path)
                t = t[0][entry] ??= [{}];
            t[1] = parseInt(i);
        }

        return {
            fileTree: fileTreeRoot[0],
            references,
        };
    }

    static async downloadProject(shatteredRoot:CodeShatterShard,specifiedEntry?:number|WebunpackedProject,explicitResolutions?:{[moduleId:string]:string}) {
        const project = typeof specifiedEntry === "object" ? specifiedEntry : this.resolveProject(shatteredRoot,specifiedEntry);
        const zip = JSZip();

        this.populateFolderWithProject(shatteredRoot,project,zip,"__entry",new Set<string>,explicitResolutions);

        await downloadZip(zip,"webunpacked");
    }
    private static populateFolderWithProject(shatteredRoot:CodeShatterShard,{fileTree,references}:WebunpackedProject,zip:JSZip,folderName:string,createdFolders:Set<string>,explicitResolutions?:{[moduleId:string]:string}) {
        if (createdFolders.has(folderName)) return;
        createdFolders.add(folderName);
        const folder = zip.folder(folderName)!;
        folder.file("package.json",JSON.stringify({
            main:"src/$index$.js",
            private: true,
            dependencies: Object.fromEntries(Object.keys(references).map(v=>v==="_process"?"process":v).map(depName=>[
                depName,
                !explicitResolutions || (depName in explicitResolutions) ? `file:../${depName}` : `${depName}@latest`,
            ] as const))
        }));

        if (explicitResolutions) {
            for (const moduleName in explicitResolutions)
                if (moduleName in references)
                    this.populateFolderWithProject(shatteredRoot,this.resolveProject(shatteredRoot,references[moduleName]),zip,moduleName,createdFolders,explicitResolutions);
        } else {
            for (const moduleName in references)
                this.populateFolderWithProject(shatteredRoot,this.resolveProject(shatteredRoot,references[moduleName]),zip,moduleName,createdFolders,explicitResolutions);
        }

        this.populateFolderWithFileTree(shatteredRoot,fileTree,folder.folder("src")!,v=>v.replace(/require\("_process"\)/g,"require(\"process\")"));
    }
    private static populateFolderWithFileTree(shatteredRoot:CodeShatterShard,fileTree:WebunpackedProjectFileTree,folder:JSZip,fileFormatter:(v:string)=>string) {
        for (const name in fileTree) {
            const [subFileTree,fileShardIndex] = fileTree[name];


            if (fileShardIndex)
                folder.file(name+".js",fileFormatter(this.moduleCode(this.resolveModuleShard(shatteredRoot,fileShardIndex))));
            if (Object.keys(subFileTree).length > 0)
                this.populateFolderWithFileTree(shatteredRoot,subFileTree,folder.folder(name)!,fileFormatter);
        }
    }
}

(window as never as {Webunpack: typeof Webunpack}).Webunpack = Webunpack;