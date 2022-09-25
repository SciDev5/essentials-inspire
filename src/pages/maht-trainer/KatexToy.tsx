import { css } from "@emotion/css";
import React, { useState } from "react";
import Latex from "react-latex";

export default function KatexToy() {
    const [t,st] = useState("");

    return (
        <div className={css({
            marginInline: "2em",
        })}>

            <textarea value={t} onChange={e=>st(e.currentTarget.value)}/>
            <br/>
            <Latex throwOnError={false} errorColor="#ff0000">{t}</Latex>
        </div>
    );
}