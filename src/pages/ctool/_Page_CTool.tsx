import React from "react";
import WithFile from "./WithFile";
import "./Webunpack";
import { css } from "@emotion/css";
import WebunpackJSX from "./WebunpackJSX";
import JSZip from "jszip";
import downloadZip from "./downloadZip";


export default function _Page_CTool() {
    return (<div>
        lmao webunpack

        <button
            onClick={e=>{
                const zip = JSZip();
                zip.file("hello.txt","yeet lol");

                downloadZip(zip,"lmao");

            }}
        >test lol</button>


        <WithFile>{(file,content)=>{
            (window as unknown as {v:string}).v = content;
            return (
                <>
                    <div className={css({
                        whiteSpace: "pre",
                    })}>
                        {content.slice(0,100)}
                    </div>
                    <div>
                        <WebunpackJSX fileText={content}/>
                    </div>
                </>
            );
        }}</WithFile>
    </div>);
}