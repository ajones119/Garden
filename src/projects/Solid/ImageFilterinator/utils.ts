export type FilterType = "pixelate" | "blackAndWhite";
export interface Filter {
    name: string;
    type: FilterType;
    description: string;
    filterFunc: (props: {ctx: CanvasRenderingContext2D}) => void;
    active: boolean;
}

type PixelFilter = Filter & {
    pixelSize: number;
}

export function PixelateFilter(
    props: {
        ctx: CanvasRenderingContext2D;
    }
) {
    const { ctx } = props;
    const { data } = ctx.getImageData(0, 0, width, height);
    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        ctx.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }

    return ctx;
}

export function BlackAndWhiteFilter(ctx: CanvasRenderingContext2D, height: number, width: number) {
    const { data } = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        const gray = (r + g + b) / 3;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }
}