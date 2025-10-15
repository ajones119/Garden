import { BaseFilter, type FilterParam } from "./base";

export class DitherFilter extends BaseFilter {
    ditherRadius: number;
    
    constructor(props: {name: string, description: string, active: boolean, ditherRadius: number}) {
        super(props);
        this.ditherRadius = props.ditherRadius;
    }
    
    getParams(): FilterParam[] {
        return [
            {
                key: 'ditherRadius',
                label: 'Dither Radius',
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
        const { ditherRadius } = this;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const output = new Uint8ClampedArray(data);
        
        // Apply dithering
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                const findClosestColor = (r: number, g: number, b: number) => {
                    const colors = [
                        [0, 0, 0],
                        [255, 255, 255]
                    ];
                    const distances = colors.map(color => Math.sqrt(Math.pow(r - color[0], 2) + Math.pow(g - color[1], 2) + Math.pow(b - color[2], 2)));
                    return colors[distances.indexOf(Math.min(...distances))];
                }
                const [newR, newG, newB] = findClosestColor(r, g, b);
                const quantErrorR = r - newR;
                const quantErrorG = g - newG;
                const quantErrorB = b - newB;

                //apply new pixel values
                output[index] = newR;
                output[index + 1] = newG;
                output[index + 2] = newB;
                output[index + 3] = a;

                //apply error to surrounding pixels
                const surroundingPixels = [
                    [x - 1, y - 1],
                    [x, y - 1],
                    [x + 1, y - 1],
                    [x - 1, y],
                    [x + 1, y],
                ];
                surroundingPixels.forEach(([px, py]) => {
                    const index = (py * width + px) * 4;
                    data[index] += quantErrorR * 7/16;
                    data[index + 1] += quantErrorG * 7/16;
                    data[index + 2] += quantErrorB * 7/16;
                });
            }
        }
        // Copy dither data back
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
        
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}



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
                const index = (y * width + x) * 4;
                const oldR = data[index];
                const oldG = data[index + 1];
                const oldB = data[index + 2];

                // Quantize the pixel
                const newR = quantize(oldR);
                const newG = quantize(oldG);
                const newB = quantize(oldB);
                
                // Apply new pixel values
                data[index] = newR;
                data[index + 1] = newG;
                data[index + 2] = newB;
                
                // Calculate quantization errors
                const errorR = (oldR - newR) * intensity;
                const errorG = (oldG - newG) * intensity;
                const errorB = (oldB - newB) * intensity;

                // Distribute error to neighboring pixels (Floyd-Steinberg pattern)
                // Pattern:     X   7/16
                //         3/16 5/16 1/16
                
                // Right pixel (x+1, y) - 7/16 of error
                if (x + 1 < width) {
                    const idx = (y * width + (x + 1)) * 4;
                    data[idx] += errorR * 7/16;
                    data[idx + 1] += errorG * 7/16;
                    data[idx + 2] += errorB * 7/16;
                }
                
                // Bottom-left pixel (x-1, y+1) - 3/16 of error
                if (x > 0 && y + 1 < height) {
                    const idx = ((y + 1) * width + (x - 1)) * 4;
                    data[idx] += errorR * 3/16;
                    data[idx + 1] += errorG * 3/16;
                    data[idx + 2] += errorB * 3/16;
                }
                
                // Bottom pixel (x, y+1) - 5/16 of error
                if (y + 1 < height) {
                    const idx = ((y + 1) * width + x) * 4;
                    data[idx] += errorR * 5/16;
                    data[idx + 1] += errorG * 5/16;
                    data[idx + 2] += errorB * 5/16;
                }
                
                // Bottom-right pixel (x+1, y+1) - 1/16 of error
                if (x + 1 < width && y + 1 < height) {
                    const idx = ((y + 1) * width + (x + 1)) * 4;
                    data[idx] += errorR * 1/16;
                    data[idx + 1] += errorG * 1/16;
                    data[idx + 2] += errorB * 1/16;
                }
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return ctx;
    }
}

