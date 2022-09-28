import React from "react";
import WithFile from "./WithFile";
import "./WebUnpack";

export default function _Page_CTool() {
    return (<div>
        lmao webunpack

        <WithFile>{(file,content)=>{
            (window as unknown as {v:string}).v = content;
            return (
                <>
                    {content.slice(0,1000)}
                </>
            );
        }}</WithFile>
    </div>);
}