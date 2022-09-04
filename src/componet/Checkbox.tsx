import React, { useId } from "react";

export default function Checkbox(props:{value:boolean,label?:string,onChange:(value:boolean,e:React.ChangeEvent<HTMLInputElement>)=>void}) {
    const id = useId();
    const theInput = (
        <input
            id={id}
            onChange={e=>props.onChange(e.currentTarget.checked,e)}
            type={"checkbox"}
            checked={props.value}
        />
    );
    if (props.label !== undefined)
        return (
            <label
                htmlFor={id}
            >
                {props.label}
                {theInput}
            </label>
        );
    else return (
        theInput
    );
}