import { css } from "@emotion/css";
import base64 from "base-64";
import React from "react";
import { useParams } from "react-router-dom";
import B128LE from "./B128LE";
import minimalURIEncode from "./minimalURIEncode";

export default function _Page_QRDataView() {
    const {data,type,isBinary} = useParams<{data:string,type:string,isBinary:string}>();
    if (!data) return <>missing data</>;
    if (!type) return <>missing type</>;
    const binary = isBinary === "1" ? true : false, fixedType = type.replace(":","/");
    return (<iframe
        className={css({
            display:"block",
            width: "100%",
            border: "none",
            height: "calc(100vh - 2em - 1px)",
        })}
        src={binary ?
            `data:${fixedType};base64,${base64.encode([...B128LE.decode(data)].map(v=>String.fromCharCode(v)).join(""))}` :
            `data:${fixedType},${minimalURIEncode(data)}`
        }
    />);
}