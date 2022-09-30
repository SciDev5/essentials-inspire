import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import Webunpack, { CodeShatterShard, WebunpackedProject, WebunpackedProjectFileTree } from "./Webunpack";

function WebunpackedFileJSX({file:[subFiles,moduleId],name,rootShard}:{file:WebunpackedProjectFileTree[string],name:string,rootShard:CodeShatterShard}) {
    const [code,setCode] = useState<string>();
    return (
        <div>
            FILE: {name}
            {moduleId && <button
                onClick={e=>{
                    setCode(Webunpack.moduleCode(Webunpack.resolveModuleShard(rootShard,moduleId)));
                }}
            > show code </button>}
            {moduleId && code && <button
                onClick={e=>{
                    setCode(undefined);
                }}
            > hide code </button>}
            {moduleId && code && (
                <div className={css({
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    overflowX: "clip",
                    wordBreak: "break-all",
                })}>{code}</div>
            )}
            {
                Object.keys(subFiles).length > 0 && (
                    <WebunpackedFilelistJSX files={subFiles} {...{rootShard}} />
                )
            }
        </div>
    );
}

function WebunpackedFilelistJSX({rootShard,files}:{files:WebunpackedProjectFileTree,rootShard:CodeShatterShard}) {
    return (
        <div className={css({
            padding: "1em",
        })}>
            {Object.entries(files).map(([name,data])=>(
                <WebunpackedFileJSX key={name} file={data} {...{name,rootShard}} />
            ))}
        </div>
    );
}

export default function WebunpackJSX(props:{fileText:string}) {
    const [rootShard,setRootShard] = useState<CodeShatterShard>();
    const [failed,setFailed] = useState(false);
    const [resolvedProject,setResolvedProject] = useState<WebunpackedProject>();

    useEffect(()=>{
        const shattered = Webunpack.shatter(props.fileText);

        if (shattered === undefined) {
            setFailed(true);
            return;
        } else {
            setFailed(false);
        }
        setRootShard(shattered);
        const project = Webunpack.resolveProject(shattered);
        setResolvedProject(project);
    },[props.fileText]);


    if (failed)
        return (
            <>
            failed to parse, see console
            </>
        );
    else if (!rootShard || !resolvedProject)
        return (
            <>
            parsing...
            </>
        );
    else
        return (
            <div>
                <button onClick={e=>console.log(resolvedProject)}>log</button>
                <button onClick={e=>{
                    Webunpack.downloadProject(rootShard,resolvedProject);
                }}>download</button>
                <div>
                    <button
                        onClick={e=>{
                            const project = Webunpack.resolveProject(rootShard);
                            setResolvedProject(project);
                        }}
                    >{"-> ROOT"}</button>
                    {Object.entries(resolvedProject.references).map(([name,i])=>(
                        <button
                            onClick={e=>{
                                const project = Webunpack.resolveProject(rootShard,i);
                                setResolvedProject(project);
                            }}
                            key={i}
                        >{name}</button>
                    ))}
                </div>
                <WebunpackedFilelistJSX files={resolvedProject.fileTree} {...{rootShard}}/>
            </div>
        );
}