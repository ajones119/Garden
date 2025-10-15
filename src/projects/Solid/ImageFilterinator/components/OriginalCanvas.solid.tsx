/** @jsxImportSource solid-js */

import { createEffect, useContext } from "solid-js";
import type { ImageMetadata } from "astro";
import { ImageFilterinatorContext } from "../ImageFilterinatorContext.solid";

type OriginalImageProps = {
    
  };

export const OriginalImageCanvas = (props: OriginalImageProps) => {
    let canvas: HTMLCanvasElement | undefined;
    const { img: imgAccessor } = useContext(ImageFilterinatorContext);
    createEffect(() => {
      const imageData = imgAccessor?.();
  
      if (!canvas || !imageData) return;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.src = imageData.src;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth =
          (canvas.parentElement?.clientWidth || window.innerWidth) - 24;
        const maxHeight =
          (canvas.parentElement?.clientHeight || window.innerHeight) - 24;
  
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
        // No filtering applied - just the original image
      };
    });
  
    return <canvas ref={canvas} class="w-full h-full" />;
  };