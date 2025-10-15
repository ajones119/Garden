/** @jsxImportSource solid-js */

import { createSignal, Show, useContext, type Accessor } from "solid-js";
import { ImageFilterCanvas } from "./renderers/EditCanvas.solid";
import { ImageFilterAscii } from "./renderers/EditAscii.solid";
import { OriginalImageCanvas } from "./OriginalCanvas.solid";
import Slider from "../../../../components/Solid/Slider/Slider.solid";
import FileInput from "../../../../components/Solid/FileInput/FileInput.solid";

import { ImageFilterinatorContext } from "../ImageFilterinatorContext.solid";


export const EditZone = () => {
  const [percentOriginal, setPercentOriginal] = createSignal(50);

  const { img, setImg, rendererStrategy, setRendererStrategy } = useContext(ImageFilterinatorContext);
  console.log(img());

  return (
     
      <div class="h-[90%] w-full bg-muted border-border border-solid border">
        <Show
          when={img()}
          keyed
          fallback={
            <div class="h-full flex items-center w-8/12 mx-auto justify-center">
              <FileInput
                accept="image/*"
                onFileDrop={(file) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (e.target?.result) {
                      const imgElement = new window.Image();
                      imgElement.src = e.target.result as string;
                      imgElement.onload = () => {
                        console.log(file);
                        setImg({
                          src: imgElement.src,
                          name: file.name,
                          filename: file.name,
                          size: file.size,
                          type: file.type,
                          width: imgElement.width,
                          height: imgElement.height,
                          format:
                            (file.type.split("/")[1] as
                              | "jpg"
                              | "jpeg"
                              | "png"
                              | "tiff"
                              | "webp"
                              | "gif"
                              | "svg"
                              | "avif") || "jpg",
                        });
                      };
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          }
        >
          {(imageValue) => (
            <div class="w-full h-full relative">
              {/* Filtered canvas in back - always full width */}
              <div class="absolute left-0 top-0 w-full h-full">
                <Show when={rendererStrategy() === "canvas"}>
                  <ImageFilterCanvas />
                </Show>
                <Show when={rendererStrategy() === "ascii"}>
                  <ImageFilterAscii />
                </Show>
              </div>
              {/* Original canvas on top - clipped from the right to reveal filtered below */}
              <div 
                class="absolute left-0 top-0 w-full h-full z-5" 
                style={{
                  "clip-path": `inset(0 ${100 - percentOriginal()}% 0 0)`
                }}
              >
                <OriginalImageCanvas />
              </div>
              {/* Slider on top - centered at bottom */}
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-fit max-w-[90%] pointer-events-auto">
                <Slider
                  value={percentOriginal()}
                  onChange={(value) => setPercentOriginal(value)}
                  id="percentOriginal"
                  min={0}
                  max={100}
                />
              </div>
            </div>
          )}
        </Show>
      </div>
  );
};

