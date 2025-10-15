import React from "react";
import type { Color } from "../types";
import { $gradient, addColor, changeColor, removeColor } from "../nanoStore";
import BasicButton from "../../../../components/React/Buttons/BasicButton";
import { useStore } from "@nanostores/react";

const ColorRow = ({color, index}: {color: Color, index: number}) => {
    return (
        <div className="p-2 border-b border-border flex flex-col gap-2 relative max-w-full">
            <div className="flex items-center gap-2">
                <label className="text-foreground text-md cursor-pointer" htmlFor={`color-input-${index}`}>Color</label>
                <input className="cursor-pointer" id={`color-input-${index}`} type="color" value={color.color} onChange={(e) => changeColor(index, {...color, color: e?.target?.value})} />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-foreground text-md cursor-pointer" htmlFor={`first-pos-input-${index}`}>First Positional Argument</label>
                <input className="shrink cursor-pointer border-border border rounded-md px-1" id={`first-pos-input-${index}`} type="number" value={color?.firstPositionArg} onChange={(e) => changeColor(index, {...color, firstPositionArg: Number(e?.target?.value) || undefined})} />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-foreground text-md cursor-pointer" htmlFor={`Second-pos-input-${index}`}>Second Positional Argument</label>
                <input className="shrink cursor-pointer border-border border rounded-md px-1" id={`Second-pos-input-${index}`} type="number" value={color?.secondPositionArg} onChange={(e) => changeColor(index, {...color, secondPositionArg: Number(e?.target?.value) || undefined})} />
            </div>
            <div className="absolute top-1 right-1">
                <button onClick={() => removeColor(index)} className="border-none text-foreground bg-red-400 cursor-pointer rounded-md text-sm px-2">remove</button>
            </div>
        </div>
    );
}

const ColorsList = () => {
    const colors = useStore($gradient).colors
    return (
        <div>
            {
                colors.map((color, index) => <ColorRow color={color} index={index} key={`color-${index}`} />)
            }
            <BasicButton onClick={() => addColor({color: "#ffffff"})}>+ Add Color</BasicButton>
        </div>
    )
}

export default ColorsList;