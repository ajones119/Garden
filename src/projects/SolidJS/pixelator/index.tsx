import { createSignal, Show, type Accessor } from "solid-js";
import { PixelatorCanvas, PixelateCanvas } from "./components/PixelCanvas";
import Slider from "../../../components/Inputs/Slider/Slider.solid";
import FileInput from "../../../components/Inputs/FileInput/FileInput.solid";

import TEMP_IMG from "../../../assets/mainBackgroundFull.jpeg"
import BasicButton from "../../../components/Buttons/BasicButton.solid";

const PixelateAndDownloadImage = (imageData: ImageMetadata, pixelSize: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
        if (!ctx) return ;
        const img = new Image();
        img.src = imageData.src;
        img.onload = () => {
            
            const width = img.width;
            const height = img.height;
            

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            PixelateCanvas(ctx, pixelSize, height, width);

            const link = document.createElement('a');

            link.download = `${new Date().toISOString()}-pixelated-${pixelSize}px.${imageData.format}`;
            link.href = canvas.toDataURL(`image/${imageData.format}`);

            link.click();
        };
}

export const Pixelator = () => {
    const [pixelSize, setPixelSize] = createSignal(5);
    const [img, setImg] = createSignal<ImageMetadata | null>(null)

    return (
        <div class="w-full h-full p-1">
            <div id="controls" class="p-2 bg-background rounded-sm border-border border-1 border-solid mx-auto my-4 w-fit min-w-[250px] md:fixed md:bottom-2 md:right-2">
                <h6 class="text-xl font-bolt">Controls</h6>
                <Slider
                    value={pixelSize()}
                    onChange={(value) => setPixelSize(value)}
                    id="pixelSize"
                    min={1}
                    max={20}
                    step={1}
                    label="Pixel Size"
                    unit="px"
                />
                <Show when={img()} keyed fallback={<BasicButton onClick={() => setImg(null)}>Reset File</BasicButton>}>
                    {(image) => <BasicButton onClick={() => PixelateAndDownloadImage(image, pixelSize())}>Download</BasicButton>}
                </Show>
                
            </div>
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
                                        setImg({
                                        src: imgElement.src,
                                        name: file.name,
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
                    {(imageValue) => <PixelatorCanvas img={imageValue} pixelSize={pixelSize} />}
                </Show>
                
            </div>
        </div>
    )
}