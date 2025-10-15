import { BaseFilter, type FilterParam } from "./base";

export class DitherFilter extends BaseFilter {
    intensity: number;
    colorDepth: number;
    
    constructor(props: {name: string, description: string, active: boolean, intensity: number, colorDepth: number}) {
        super(props);
        this.intensity = props.intensity ?? 1;
        this.colorDepth = props.colorDepth ?? 2;
    }
    
    getParams(): FilterParam[] {
        return [
            {
                key: 'intensity',
                label: 'Intensity',
                type: 'range',
                min: 0,
                max: 1,
                step: 0.1
            },
            {
                key: 'colorDepth',
                label: 'Color Depth',
                type: 'range',
                min: 2,
                max: 16,
                step: 1
            }
        ];
    }

    process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D {
        const { ctx } = props;
        const { width, height } = ctx.canvas;
        const { intensity, colorDepth } = this;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Quantize a color value to the nearest level based on color depth
        const quantize = (value: number): number => {
            const factor = 255 / (colorDepth - 1);
            return Math.round(Math.round(value / factor) * factor);
        };
        
        // Apply Floyd-Steinberg dithering
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const currentIndex = (y * width + x) * 4;
                const oldR = data[currentIndex];
                const oldG = data[currentIndex + 1];
                const oldB = data[currentIndex + 2];
                
                // Quantize the pixel colors
                const newR = quantize(oldR);
                const newG = quantize(oldG);
                const newB = quantize(oldB);
                
                // Apply quantized values FIRST (before distributing error)
                data[currentIndex] = newR;
                data[currentIndex + 1] = newG;
                data[currentIndex + 2] = newB;
                
                // Calculate quantization errors (scaled by intensity)
                const errorR = (oldR - newR) * intensity;
                const errorG = (oldG - newG) * intensity;
                const errorB = (oldB - newB) * intensity;

                // Distribute error to neighboring pixels
                // Floyd-Steinberg pattern:     X   7/16
                //                         3/16 5/16 1/16
                
                // Right pixel (x+1, y) - 7/16 of error
                if (x + 1 < width) {
                    const nextIndex = (y * width + (x + 1)) * 4;
                    data[nextIndex] += errorR * 7/16;
                    data[nextIndex + 1] += errorG * 7/16;
                    data[nextIndex + 2] += errorB * 7/16;
                }

                // Bottom-left pixel (x-1, y+1) - 3/16 of error
                if (x > 0 && y + 1 < height) {
                    const nextIndex = ((y + 1) * width + (x - 1)) * 4;  // Note the parentheses!
                    data[nextIndex] += errorR * 3/16;
                    data[nextIndex + 1] += errorG * 3/16;
                    data[nextIndex + 2] += errorB * 3/16;
                }

                // Bottom pixel (x, y+1) - 5/16 of error
                if (y + 1 < height) {
                    const nextIndex = ((y + 1) * width + x) * 4;  // Note the parentheses!
                    data[nextIndex] += errorR * 5/16;
                    data[nextIndex + 1] += errorG * 5/16;
                    data[nextIndex + 2] += errorB * 5/16;
                }

                // Bottom-right pixel (x+1, y+1) - 1/16 of error
                if (x + 1 < width && y + 1 < height) {
                    const nextIndex = ((y + 1) * width + (x + 1)) * 4;  // Note the parentheses!
                    data[nextIndex] += errorR * 1/16;
                    data[nextIndex + 1] += errorG * 1/16;
                    data[nextIndex + 2] += errorB * 1/16;
                }
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}

