import React, { useEffect, useState } from "react";

export default function WithFile(props:{children:(file:File,text:string)=>React.ReactNode}) {
    const [file,setFile] = useState<File>(), [fileText,setFileText] = useState<string>();

    useEffect(()=>{
        if (!file) setFileText(undefined);
        else file.text().then(v=>setFileText(v));
    },[file]);

    return (
        <div>
            <input onChange={e=>{
                setFile(e.currentTarget.files![0] ?? undefined);
            }} type={"file"}/>
            {file && fileText === undefined && <p>loading...</p>}
            {file && fileText !== undefined && (
                <div>
                    <h3>
                        {file.name} {file.size}
                    </h3>
                    {props.children(file,fileText)}
                </div>
            )}
        </div>
    );
}