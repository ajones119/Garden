import { BaseFilter, type FilterParam } from "./base";

export class SepiaFilter extends BaseFilter {
    intensity: number;
    constructor(props: {name: string, description: string, active: boolean, intensity: number}) {
        super(props);
        this.intensity = props.intensity;
    }

    getParams(): FilterParam[] {
        return [
            {
                key: 'intensity',
                label: "Intensity",
                type: 'range',
                min: 0,
                max: 1,
                step: 0.01
            }
        ]
    }

    process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D {
        const { ctx } = props;
        const { width, height } = ctx.canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            const sepiaR = r * 0.393 + g * 0.769 + b * 0.189;
            const sepiaG = r * 0.349 + g * 0.686 + b * 0.168;
            const sepiaB = r * 0.272 + g * 0.534 + b * 0.131;

            data[i] = Math.min(255, r + (sepiaR - r) * this.intensity);
            data[i + 1] = Math.min(255, g + (sepiaG - g) * this.intensity);
            data[i + 2] = Math.min(255, b + (sepiaB - b) * this.intensity);
            data[i + 3] = a;
        }
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}