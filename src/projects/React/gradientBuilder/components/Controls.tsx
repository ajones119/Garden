import React from "react";
import type { Color, GradientType } from "../types";
import { $gradient, addColor, changeColor, removeColor, setGradient, setGradientPosition } from "../nanoStore";
import BasicButton from "../../../../components/React/Buttons/BasicButton";
import { useStore } from "@nanostores/react";
import RadioButtons from "../../../../components/React/Inputs/RadioButtons";


const Controls = () => {
    const gradient = useStore($gradient)
    return (
        <div className="flex flex-col gap-4">
            <RadioButtons<GradientType>
                name="Gradient Type"
                id="gradient-type"
                selected={gradient.type}
                onChange={(value) => setGradient({...gradient, type: value})}
                options={[{value: "linear", label: "Linear"}, {value: "conic", label: "Conic"}, {value: "radial", label: "Radial"}]}
            />
            {["linear", "conic"].includes(gradient.type) && (
                <div className="flex gap-2">
                    <label htmlFor="angle-input" className="text-muted-foreground">Angle</label>
                    <input id="angle-input" className="shrink border-border border px-1 " type="number" value={gradient.angle} onChange={(e) => setGradient({...gradient, angle: Number(e?.target?.value) || 0})} />
                </div>
            )}

            {["radial", "conic"].includes(gradient.type) && (
                <div className="flex gap-2">
                    <label htmlFor="x-pos-input" className="text-muted-foreground">X</label>
                    <input id="x-pos-input" className="shrink w-10 rounded-md border-border border px-1 " type="number" value={gradient?.position?.x} onChange={(e) => setGradientPosition(Number(e.target.value), gradient?.position?.y || 0)} />
                    <label htmlFor="y-pos-input" className="text-muted-foreground">Y</label>
                    <input id="y-pos-input" className="shrink w-10 rounded-md border-border border px-1 " type="number" value={gradient?.position?.y} onChange={(e) => setGradientPosition(gradient?.position?.x || 0, Number(e.target.value))} />
                </div>
            )}
        </div>
    )
}

export default Controls;