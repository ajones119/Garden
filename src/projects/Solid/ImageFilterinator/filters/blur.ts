import { BaseFilter, type FilterParam } from "./base";

export class BlurFilter extends BaseFilter {
    blurRadius: number;
    
    constructor(props: {name: string, description: string, active: boolean, blurRadius: number}) {
        super(props);
        this.blurRadius = props.blurRadius;
    }
    
    getParams(): FilterParam[] {
        return [
            {
                key: 'blurRadius',
                label: 'Blur Radius',
                type: 'range',
                min: 1,
                max: 20,
                step: 1
            }
        ];
    }

    process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D {
        const { ctx } = props;
        const { width, height } = ctx.canvas;
        const { blurRadius } = this;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const output = new Uint8ClampedArray(data);
        
        // Simple box blur algorithm
        const radius = Math.floor(blurRadius);
        const kernelSize = radius * 2 + 1;
        const kernelArea = kernelSize * kernelSize;
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, a = 0;
                
                // Sample surrounding pixels
                for (let ky = -radius; ky <= radius; ky++) {
                    for (let kx = -radius; kx <= radius; kx++) {
                        const px = Math.min(width - 1, Math.max(0, x + kx));
                        const py = Math.min(height - 1, Math.max(0, y + ky));
                        const index = (py * width + px) * 4;
                        
                        r += data[index];
                        g += data[index + 1];
                        b += data[index + 2];
                        a += data[index + 3];
                    }
                }
                
                const outIndex = (y * width + x) * 4;
                output[outIndex] = r / kernelArea;
                output[outIndex + 1] = g / kernelArea;
                output[outIndex + 2] = b / kernelArea;
                output[outIndex + 3] = a / kernelArea;
            }
        }
        
        // Copy blurred data back
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
        
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}

