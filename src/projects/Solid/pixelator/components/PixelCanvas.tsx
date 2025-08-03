/** @jsxImportSource solid-js */

import { onMount, onCleanup, createSignal, createEffect, type Accessor } from 'solid-js'

type Props = {
    pixelSize: Accessor<number>,
    img: ImageMetadata
}

export function PixelateCanvas (ctx: CanvasRenderingContext2D, pixelSize: number, height: number, width: number) {
    const {data} = ctx.getImageData(0, 0, width, height);
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
}

export const PixelatorCanvas = (props: Props) => {

    let canvas: HTMLCanvasElement | undefined;

    createEffect(() => {
        const pixelSize = props.pixelSize();
        const imageData = props.img;

        if (!canvas || !imageData) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return ;
        const img = new Image();
        img.src = imageData.src;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const maxWidth = (canvas.parentElement?.clientWidth || window.innerWidth) - 24;
            const maxHeight = (canvas.parentElement?.clientHeight || window.innerHeight) - 24;

            if (img.width > maxWidth || img.height > maxHeight) {
                if (img.width > img.height) {
                    img.width = maxWidth;
                    img.height = maxWidth / aspectRatio;
                } else {
                    img.height = maxHeight;
                    img.width = maxHeight * aspectRatio;
                }
            }
            const width = img.width;
            const height = img.height;

            canvas.width = maxWidth;
            canvas.height = maxHeight;

            const xOffset = (maxWidth - width) / 2;
            const yOffset = (maxHeight - height) / 2;

            ctx.drawImage(img, xOffset, yOffset, width, height);

            PixelateCanvas(ctx, pixelSize, maxHeight, maxWidth);
        };

    })


    return (
        <canvas ref={canvas} class="w-full h-full" />
    )
}