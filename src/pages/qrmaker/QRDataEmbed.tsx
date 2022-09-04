import { css } from "@emotion/css";
import base64 from "base-64";
import * as qrcode from "qrcode";
import React, { useEffect, useRef, useState } from "react";
import Checkbox from "../../componet/Checkbox";
import { baseURI, routes } from "../_routing/AllRoutes";

import "./B128LE";
import B128LE from "./B128LE";
import minimalURIEncode from "./minimalURIEncode";
import QREditor from "./QREditor";


export default function QRDataEmbed() {
    const cnvRef = useRef<HTMLCanvasElement>(null);

    const [file,setFile] = useState<File|undefined>(undefined);

    const [useBinary,setUseBinary] = useState(true);
    const [useRaw,setUseRaw] = useState(false);

    const [codeReady,setCodeReady] = useState(false);

    const [dataLen,setDataLen] = useState(0);
    const [strData,setStrData] = useState("");

    useEffect(()=>{
        setCodeReady(false);
        const timeoutId = setTimeout(async ()=>{
            if (!file)
                return;

            if (file.size > 10000)
                return; // don't bother with files that will definitely never fit.

            const u = new URL(baseURI);
            u.pathname += routes.qrDataViewLink;

            const dataStr = useRaw ? (
                useBinary ?
                    `http://data:${file.type};base64,${base64.encode([...new Uint8Array(await file.arrayBuffer())].map(v=>String.fromCharCode(v)).join(""))}` :
                    `http://data:${file.type},${minimalURIEncode(await file.text())}`
            ) : (
                u.toString()
                    .replace(/:type/,file.type.replace("/",":"))
                    .replace(/:data/,useBinary?(
                        B128LE.encode(new Uint8Array(await file.arrayBuffer()))
                    ):(
                        minimalURIEncode(await file.text())
                    ))
                    .replace(/:isBinary/,useBinary?"1":"0")
            );



            const data = new TextEncoder().encode(dataStr);
            setDataLen(data.length);
            setStrData(dataStr);

            const cnv = cnvRef.current!;
            try {
                const qr = qrcode.create([
                    {
                        mode:"byte",
                        data,
                    }
                ],{errorCorrectionLevel:"L"});
                await qrcode.toCanvas(cnv,qr.segments);
                cnv.style.width = "";
                cnv.style.height = "";
                setCodeReady(true);
            } catch (e) {
                cnv.style.width = "0";
                cnv.style.height = "0";
            }
        });
        return ()=>clearTimeout(timeoutId);
    },[file,useBinary,useRaw]);

    return (
        <QREditor
            cnvRef={cnvRef}
            codeReady={codeReady}
        >
            <div
                className={css({
                    display:"flex",
                    flexDirection:"column",
                    "> *": {
                        padding:".2em .5em",
                    },
                })}
            >
                <input
                    type={"file"}
                    onChange={e=>{
                        setFile(e.currentTarget.files?.[0] ?? undefined);
                    }}
                />
                <Checkbox value={useBinary} onChange={setUseBinary} label="binary mode?" />
                <Checkbox value={useRaw} onChange={setUseRaw} label="raw data url?" />
                <span>encoded to {dataLen} bytes [{((dataLen/2331)*100).toFixed(2)}% QRCode capacity]</span>
                <span className={css({
                    maxHeight: 50,
                    overflowY: "auto",
                    overflowX: "clip",
                    overflowWrap: "anywhere",
                })}>{strData}</span>
                {/* <a href={z} target="_blank" rel="noreferrer">link</a> */}
            </div>
        </QREditor>

    );
}