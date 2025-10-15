import { BaseFilter, type FilterParam } from "./base";

export class PixelateFilter extends BaseFilter {
    pixelSize: number;
    constructor(props: {name: string, description: string, active: boolean, pixelSize: number}) {
        super(props);
        this.pixelSize = props.pixelSize;
    }
    
    getParams(): FilterParam[] {
        return [
            {
                key: 'pixelSize',
                label: 'Pixel Size',
                type: 'range',
                min: 5,
                max: 50,
                step: 1
            }
        ];
    }

    process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D {
        const { ctx } = props;
        const { width, height } = ctx.canvas;
        const { pixelSize } = this;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Sample color from top-left of each block, then fill the entire block
        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
                // Get color from top-left pixel of this block
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];
                
                // Fill entire block with that color
                for (let dy = 0; dy < pixelSize && (y + dy) < height; dy++) {
                    for (let dx = 0; dx < pixelSize && (x + dx) < width; dx++) {
                        const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
                        data[pixelIndex] = r;
                        data[pixelIndex + 1] = g;
                        data[pixelIndex + 2] = b;
                        data[pixelIndex + 3] = a;
                    }
                }
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}