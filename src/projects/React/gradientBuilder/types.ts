export type Color = {
    color: string,
    firstPositionArg?: number,
    secondPositionArg?: number
}

export type Gradient = {
    colors: Color[],
    type: GradientType,
    size: number,
    angle: number,
    position: {
        x: number,
        y: number
    }
}

export type GradientType = "linear" | "conic" | "radial";

export type LinearGradient = Gradient & {
    angle: number
}

export type RadialGradient = Gradient & {
    size?: number,
    position: {
        x: number,
        y: number
    }
}

export type ConicGradient = Gradient & {
    angle?: number,
    position: {
        x: number,
        y: number
    }
}