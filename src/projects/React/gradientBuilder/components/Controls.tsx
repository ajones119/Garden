import React from "react";
import type { Color, GradientType } from "../types";
import { $gradient, addColor, changeColor, removeColor, setGradient, setGradientPosition } from "../nanoStore";
import BasicButton from "../../../../components/React/Buttons/BasicButton";
import { useStore } from "@nanostores/react";
import RadioButtons from "../../../../components/React/Inputs/RadioButtons";
import NumberInput from "../../../../components/React/Inputs/NumberInput";


const Controls = () => {
    const gradient = useStore($gradient)
    return (
        <div className="flex flex-col gap-4 p-4">
            <RadioButtons<GradientType>
                name="Gradient Type"
                id="gradient-type"
                selected={gradient.type}
                onChange={(value) => setGradient({...gradient, type: value})}
                options={[{value: "linear", label: "Linear"}, {value: "conic", label: "Conic"}, {value: "radial", label: "Radial"}]}
            />
            {["linear", "conic"].includes(gradient.type) && (
                <NumberInput
                    id="angle-input"
                    label="Angle"
                    value={gradient.angle}
                    min={0}
                    max={360}
                    onChange={(value) => setGradient({...gradient, angle: value})}
                />
            )}

            {["radial", "conic"].includes(gradient.type) && (
                <div className="flex gap-4">
                    <NumberInput
                        id="x-pos-input"
                        label="X Position"
                        value={gradient?.position?.x || 0}
                        min={0}
                        max={100}
                        onChange={(value) => setGradientPosition(value, gradient?.position?.y || 0)}
                        className="flex-1"
                    />
                    <NumberInput
                        id="y-pos-input"
                        label="Y Position"
                        value={gradient?.position?.y || 0}
                        min={0}
                        max={100}
                        onChange={(value) => setGradientPosition(gradient?.position?.x || 0, value)}
                        className="flex-1"
                    />
                </div>
            )}
        </div>
    )
}

export default Controls;