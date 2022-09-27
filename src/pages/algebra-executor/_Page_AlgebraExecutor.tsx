import React, { useState } from "react";
import Latex from "react-latex";
import CPureNum from "./CPureNum";
import "./PureNum";
import PureNum from "./PureNum";
import MSymbol from "./symbol/MSymbol";
import SymbolNumber from "./symbol/SymbolNumber";
import SymbolProduct from "./symbol/SymbolProduct";
import SymbolSum from "./symbol/SymbolSum";
import SymbolVar from "./symbol/SymbolVar";

export default function _Page_AlgebraExecutor() {
    const [l, setL] = useState("");

    return (
        <div>
            <h1>AlEx</h1>
            <h3>I should call this wolfram beta lol</h3>
            <button onClick={e=>{

                const toSplice = {
                    s:(k:MSymbol)=>setL(k.toLatex().text),
                    SymbolVar,
                    SymbolSum,
                    SymbolProduct,
                    SymbolNumber,
                    CPureNum,
                    PureNum,
                };


                for (const m in toSplice)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any)[m] = (toSplice as any)[m];

                console.log(toSplice);

            }}>
                logit
            </button>
            {/* <div>
                {l}
            </div> */}
            <div style={{padding: "1em"}}>
                <Latex>
                    {`$${l.replace(/\$/g,"\\$")}$`}
                </Latex>
            </div>
        </div>
    );
}