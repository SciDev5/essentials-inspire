import { css } from "@emotion/css";
import React from "react";
import TetBlock from "./TetBlock";

export default function TetBoard(props:{blocks:TetBlock[][]}) {
    return (
        <table className={css({
            borderSpacing: 0,
        })}>
            <tbody>
                {props.blocks.reverse().map((row,i)=>(
                    <tr key={i}>
                        {row.map((block,j)=>(
                            <React.Fragment key={j}>
                                {block.render()}
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}