/** @jsxImportSource solid-js */


import { createContext, createSignal, type Accessor, type JSX } from "solid-js";

import { BlackAndWhiteFilter, PixelateFilter, BlurFilter, BaseFilter, SepiaFilter } from "./filters";
import FloatImage from "../../../assets/demoImages/mainCardImages/float-image.png";
import { DitherFilter } from "./filters/dither";

type RendererStrategy = "canvas" | "ascii";
type AsciiCharSet = "standard" | "esoteric";

const ImageFilterinatorContext = createContext<{
    filters: Accessor<BaseFilter[]>;
    toggleFilter: (name: string) => void;
    updateFilterParam: (name: string, param: string, value: any) => void;
    reorderFilters: (fromIndex: number, toIndex: number) => void;
    img: Accessor<ImageMetadata | null>;
    setImg: (img: ImageMetadata | null) => void;
    rendererStrategy: Accessor<RendererStrategy>;
    setRendererStrategy: (strategy: RendererStrategy) => void;
    density: Accessor<number>;
    setDensity: (density: number) => void;
    asciiCharSet: Accessor<AsciiCharSet>;
    setAsciiCharSet: (charSet: AsciiCharSet) => void;
}>({
    filters: () => [],
    toggleFilter: () => {},
    updateFilterParam: () => {},
    reorderFilters: () => {},
    img: () => null,
    setImg: () => {},
    rendererStrategy: () => "canvas" as RendererStrategy,
    setRendererStrategy: () => {},
    density: () => 1,
    setDensity: () => {},
    asciiCharSet: () => "standard" as AsciiCharSet,
    setAsciiCharSet: () => {}
})

const ImageFilterinatorProvider = (props: {children: JSX.Element}) => {
    const [img, setImg] = createSignal<ImageMetadata | null>({src: FloatImage.src, width: FloatImage.width, height: FloatImage.height, format: FloatImage.format});
    const [density, setDensity] = createSignal(1);
    const [asciiCharSet, setAsciiCharSet] = createSignal<AsciiCharSet>("standard");
    const [filters, setFilters] = createSignal<BaseFilter[]>([
        new PixelateFilter({
            name: "Pixelate",
            description: "Pixelate the image",
            active: false,
            pixelSize: 10
        }),
        new BlackAndWhiteFilter({
            name: "Black and White",
            description: "Black and White the image",
            active: false
        }),
        new BlurFilter({
            name: "Blur",
            description: "Blur the image",
            active: false,
            blurRadius: 5
        }),
        new SepiaFilter({
            name: "Sepia",
            description: "Sepia the image",
            active: false,
            intensity: 1
        }),
        new DitherFilter({
            name: "Dither",
            description: "Dither the image",
            active: false,
            intensity: 1,
            colorDepth: 2
        }),
    ]);
    const [rendererStrategy, setRendererStrategy] = createSignal<"canvas" | "ascii">("canvas");
    
    const toggleFilter = (name: string) => {
        setFilters(prev => {
            return prev.map(f => 
                f.name === name 
                    ? Object.assign(Object.create(Object.getPrototypeOf(f)), f, { active: !f.active })
                    : f
            );
        });
    }

    const updateFilterParam = (name: string, param: string, value: any) => {
        setFilters(prev => {
            return prev.map(f => 
                f.name === name 
                    ? Object.assign(Object.create(Object.getPrototypeOf(f)), f, { [param]: value })
                    : f
            );
        });
    }
    
    const reorderFilters = (fromIndex: number, toIndex: number) => {
        setFilters(prev => {
            const newFilters = [...prev];
            const [removed] = newFilters.splice(fromIndex, 1);
            newFilters.splice(toIndex, 0, removed);
            return newFilters;
        });
    }

    return (
        <ImageFilterinatorContext.Provider value={{filters, toggleFilter, updateFilterParam, reorderFilters, img, setImg, rendererStrategy, setRendererStrategy, density, setDensity, asciiCharSet, setAsciiCharSet}}>
            {props.children}
        </ImageFilterinatorContext.Provider>
    )
}

export { ImageFilterinatorContext, ImageFilterinatorProvider };