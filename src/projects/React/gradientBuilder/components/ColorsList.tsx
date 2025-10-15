import React from "react";
import type { Color } from "../types";
import { $gradient, addColor, changeColor, removeColor } from "../nanoStore";
import BasicButton from "../../../../components/React/Buttons/BasicButton";
import { useStore } from "@nanostores/react";
import ColorPicker from "../../../../components/React/Inputs/ColorPicker";
import NumberInput from "../../../../components/React/Inputs/NumberInput";

const ColorRow = ({color, index}: {color: Color, index: number}) => {
    return (
        <div className="p-4 border-b border-border flex flex-col gap-3 relative">
            <ColorPicker
                id={`color-input-${index}`}
                label="Color"
                value={color.color}
                onChange={(value) => changeColor(index, {...color, color: value})}
            />
            
            <NumberInput
                id={`first-pos-input-${index}`}
                label="First Position"
                value={color?.firstPositionArg || 0}
                min={0}
                max={100}
                onChange={(value) => changeColor(index, {...color, firstPositionArg: value || undefined})}
            />
            
            <NumberInput
                id={`second-pos-input-${index}`}
                label="Second Position"
                value={color?.secondPositionArg || 0}
                min={0}
                max={100}
                onChange={(value) => changeColor(index, {...color, secondPositionArg: value || undefined})}
            />
            
            <div className="absolute top-2 right-2">
                <BasicButton 
                    onClick={() => removeColor(index)} 
                    variant="ghost"
                    className="!p-2 !text-xs"
                >
                    ✕
                </BasicButton>
            </div>
        </div>
    );
}

const ColorsList = () => {
    const colors = useStore($gradient).colors
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {
                    colors.map((color, index) => <ColorRow color={color} index={index} key={`color-${index}`} />)
                }
            </div>
            <div className="p-4 border-t border-border">
                <BasicButton onClick={() => addColor({color: "#ffffff"})} className="w-full">
                    + Add Color
                </BasicButton>
            </div>
        </div>
    )
}

export default ColorsList;