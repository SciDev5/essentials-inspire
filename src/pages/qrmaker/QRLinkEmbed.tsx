import { css } from "@emotion/css";
import * as qrcode from "qrcode";
import React, { useRef, useState } from "react";
import QREditor from "./QREditor";

export default function QRLinkEmbed() {
    const cnvRef = useRef<HTMLCanvasElement>(null);
    const [outImgUrl,setOutImgUrl] = useState("");
    const [updateTimer,setUpdateTimer] = useState<NodeJS.Timeout|undefined>(undefined);
    return (
        <QREditor
            codeReady={!!outImgUrl && !updateTimer}
            cnvRef={cnvRef}
        >
            <textarea
                className={css({
                    display: "block",
                    width: "calc(100% - 1em)",
                    resize: "vertical",
                })}
                onChange={e=>{
                    const cnv = cnvRef.current, value = e.currentTarget.value;
                    if (!cnv) return;
                    setOutImgUrl("");

                    if (updateTimer !== undefined)
                        clearTimeout(updateTimer);
                    setUpdateTimer(setTimeout(async ()=>{
                        console.log(value,cnv);
                        try {
                            await qrcode.toCanvas(cnv,value,{width:1000});
                            setOutImgUrl(cnv.toDataURL("image/png"));
                            cnv.style.width = "";
                            cnv.style.height = "";
                        } catch(e) {
                            cnv.width = 0;
                            cnv.height = 0;
                        }
                        setUpdateTimer(undefined);
                    },200));
                }}
            />
            {outImgUrl && <a download={"qrcode.png"} href={outImgUrl}>download</a>}
        </QREditor>
    );
}