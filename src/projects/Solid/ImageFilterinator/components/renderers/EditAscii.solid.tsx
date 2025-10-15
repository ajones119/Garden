/** @jsxImportSource solid-js */

import {
    onMount,
    onCleanup,
    createSignal,
    createEffect,
    type Accessor,
    useContext,
  } from "solid-js";
  import { ImageFilterinatorContext } from "../../ImageFilterinatorContext.solid";
import { BlackAndWhiteFilter } from "../../filters";
  
  const ASCII_CHARS_STANDARD = " .-:=+*#%@$";
  const ASCII_CHARS_ESOTERIC = " ░▒▓█▀▄■▪●◘◙☺☻♠♣♥♦";

  
  export const ImageFilterAscii = () => {
    let canvas: HTMLCanvasElement | undefined;
    const { img: imgAccessor, filters, density: densityAccessor, asciiCharSet } = useContext(ImageFilterinatorContext);
    
    createEffect(() => {
      const imageData = imgAccessor?.();
      const currentFilters = filters(); // MUST read signal HERE, not in callback!
      const density = densityAccessor();
      const charSet = asciiCharSet();
      const ASCII_CHARS = charSet === "esoteric" ? ASCII_CHARS_ESOTERIC : ASCII_CHARS_STANDARD;
  
      if (!canvas || !imageData) return;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.src = imageData.src;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        
        // For ASCII, use density to control detail level
        // Higher density = more characters (more detail), smaller font
        const baseWidth = 158;
        const asciiWidth = Math.floor(baseWidth * density); // characters wide
        const asciiHeight = Math.floor(asciiWidth / aspectRatio / 2); // divide by 2 for aspect ratio correction
        
        // Calculate font size inversely to density to keep visual size similar
        const baseFontSize = 0.5; // rem
        const fontSize = baseFontSize / density;
  
        canvas.width = asciiWidth;
        canvas.height = asciiHeight;
  
        ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);
  
        // Use currentFilters captured BEFORE the async boundary
        currentFilters.forEach(filter => {
            if (filter.active) {
                filter.process({ctx});
            }
        });

        // Process image data to ascii, first make new black and white filter and apply it
        const blackAndWhiteFilter = new BlackAndWhiteFilter({name: "blackAndWhite", description: "Black and White", active: true});
        blackAndWhiteFilter.process({ctx});

        // Then process image data to ascii
        const postFilterImageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
        const postFilterData = postFilterImageData.data;
        
        let asciiString = "";
        for (let y = 0; y < asciiHeight; y++) {
            for (let x = 0; x < asciiWidth; x++) {
                const i = (y * asciiWidth + x) * 4;
                const r = postFilterData[i];
                const g = postFilterData[i + 1];
                const b = postFilterData[i + 2];
                const brightness = (r + g + b) / 3;
                const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
                asciiString += ASCII_CHARS[charIndex];
            }
            asciiString += "\n"; // Add line break after each row
        }

        const asciiCanvas = document.querySelector("pre") as HTMLPreElement;
        if (asciiCanvas) {
            asciiCanvas.textContent = asciiString;
        }
    };
        
    });
  
    return <div class="w-full h-full flex items-center justify-center bg-black p-4">
        <canvas ref={canvas} class="hidden" />
        <pre id="asciiCanvas" class="text-white font-mono whitespace-pre overflow-hidden" style={{"font-size": `${0.5 / densityAccessor()}rem`, "line-height": `${0.5 / densityAccessor()}rem`}} />
        </div>;
  };
  
