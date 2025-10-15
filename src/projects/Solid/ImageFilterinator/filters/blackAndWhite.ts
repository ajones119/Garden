import { BaseFilter } from "./base";

export class BlackAndWhiteFilter extends BaseFilter {
    constructor(props: {name: string, description: string, active: boolean}) {
        super(props);
    }
    process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D {
        const { ctx } = props;
        const { width, height } = ctx.canvas;
        
        // Get the image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Mutate the pixels to grayscale
        for (let i = 0; i < data.length; i += 4) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = gray;     // R
            data[i + 1] = gray; // G
            data[i + 2] = gray; // B
            // data[i + 3] is alpha, leave it unchanged
        }
        
        // Put the modified data BACK on the canvas!
        ctx.putImageData(imageData, 0, 0);
        
        return ctx;
    }
}
