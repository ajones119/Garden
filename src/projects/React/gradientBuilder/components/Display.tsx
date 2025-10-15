import React from "react";
import type { Color, Gradient, GradientType } from "../types";
import { $gradient, addColor, changeColor, removeColor, setGradient, setGradientPosition } from "../nanoStore";
import BasicButton from "../../../../components/React/Buttons/BasicButton";
import { useStore } from "@nanostores/react";
import RadioButtons from "../../../../components/React/Inputs/RadioButtons";


const formatColorsFromGradientColors = (colors: Color[]) => {

    const pieces = colors.map(color => {
        return `${color.color} ${color.firstPositionArg ? color.firstPositionArg + '%' : ''} ${color.secondPositionArg ? color.secondPositionArg + '%' : ''}`
    });

    return pieces.join(',')
}

const formatStyleTextFromGradient = (gradient: Gradient) => {
    let style = `${gradient.type}-gradient(`;

    switch (gradient.type) {
        case 'linear':
            style += `${gradient.angle}deg,`
            break;
        case "radial":

            break;
        case "conic":
            style += `from ${gradient.angle}deg at ${gradient.position.x}% ${gradient.position.y}%,`
            break;
        
    }

    style += formatColorsFromGradientColors(gradient.colors);

    style += `)`

    console.log('style', style)
    return style;
}

const Display = () => {
    const gradient = useStore($gradient)
    return (
        <div className="w-full h-full" style={{background: formatStyleTextFromGradient(gradient)}} />
    )
}

export default Display;