/** @jsxImportSource solid-js */

import { ImageFilterinatorContext } from "../ImageFilterinatorContext.solid";
import { useContext, Index, Show, createSignal } from "solid-js";
import { FilterSettings } from "./FilterSettings.solid";
import RadioButtons from "../../../../components/Solid/Inputs/RadioButtons.solid";
import Slider from "../../../../components/Solid/Slider/Slider.solid";
import BasicButtonSolid from "../../../../components/Solid/Buttons/BasicButton.solid";

export function Settings() {
    const { filters, toggleFilter, updateFilterParam, reorderFilters, setRendererStrategy, rendererStrategy, density, setDensity, setImg } = useContext(ImageFilterinatorContext);
    const [draggedIndex, setDraggedIndex] = createSignal<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = createSignal<number | null>(null);
    
    return (
        <div class="p-4">
            <section id="filters">
                <h1 class="text-xl font-bold mb-4">Filters</h1>
                <div class="flex flex-col gap-4">
                    <Index each={filters()}>
                        {(filterAccessor, index) => {
                            const [isHandling, setIsHandling] = createSignal(false);
                            const i = index; // index is already a number, not an accessor
                            return (
                                <div 
                                    draggable={isHandling()}
                                    onDragStart={(e) => {
                                        setDraggedIndex(i);
                                        e.dataTransfer!.effectAllowed = "move";
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.dataTransfer!.dropEffect = "move";
                                        setDragOverIndex(i);
                                    }}
                                    onDragLeave={() => {
                                        if (dragOverIndex() === i) {
                                            setDragOverIndex(null);
                                        }
                                    }}
                                    onDrop={(e) => {
                                        if (!isHandling()) {
                                            return;
                                        }
                                        e.preventDefault();
                                        const fromIndex = draggedIndex();
                                        if (fromIndex !== null && fromIndex !== i) {
                                            reorderFilters(fromIndex, i);
                                        }
                                        setDraggedIndex(null);
                                        setDragOverIndex(null);
                                        setIsHandling(false);
                                    }}
                                    onDragEnd={() => {
                                        setDraggedIndex(null);
                                        setDragOverIndex(null);
                                    }}
                                    class="flex flex-col gap-2 p-3 bg-background border rounded transition-all"
                                    classList={{
                                        "opacity-50": draggedIndex() === i,
                                        "border-primary border-2": dragOverIndex() === i && draggedIndex() !== i
                                    }}
                                >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span onMouseDown={() => setIsHandling(true)} onMouseUp={() => setIsHandling(false)} class="text-muted-foreground select-none cursor-move">⋮⋮</span>
                                        <h2 class="font-semibold">{filterAccessor().name}</h2>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={filterAccessor().active} 
                                        onChange={() => toggleFilter(filterAccessor().name)} 
                                    />
                                </div>
                                
                                    {/* Dynamically render filter settings based on getParams() */}
                                    <Show when={filterAccessor().active && filterAccessor().getParams().length > 0}>
                                        <FilterSettings 
                                            filter={filterAccessor()} 
                                            updateFilterParam={updateFilterParam}
                                        />
                                    </Show>
                                </div>
                            );
                        }}
                    </Index>
                </div>
            </section>
            <section>
                <h1 class="text-xl font-bold mb-4">Renderer Strategy</h1>
                <div class="flex flex-col gap-4">
                    <RadioButtons id="rendererStrategy" name="rendererStrategy" options={[{label: "Canvas", value: "canvas"}, {label: "ASCII", value: "ascii"}]} selected={rendererStrategy()} onChange={(value) => setRendererStrategy(value as "canvas" | "ascii")} />
                </div>
            </section>
            <section>
                <h1 class="text-xl font-bold mb-4">Density</h1>
                <div class="flex flex-col gap-4">
                    <Slider id="density" name="density" value={density()} onChange={(value) => setDensity(value)} unit="x" min={0.1} max={2} step={0.1} />
                </div>
            </section>

            <BasicButtonSolid onClick={() => {
                setDensity(1);
                setRendererStrategy("canvas");
                setImg(null);
            }}>Clear Image</BasicButtonSolid>
            <Show
                when={rendererStrategy() === "ascii"}
                fallback={<BasicButtonSolid onClick={() => {
                    const canvas = document.querySelector("#editCanvas") as HTMLCanvasElement;
                    if (canvas) {
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                const date = new Date().toISOString().split("T")[0];
                                a.download = `${date}-filterinator.png`;
                                a.click();
                            }
                        });
                    }
                }}>Download PNG</BasicButtonSolid>}
            >
                <BasicButtonSolid onClick={() => {
                    const asciiCanvas = document.querySelector("#asciiCanvas") as HTMLPreElement;
                    if (asciiCanvas) {
                        navigator.clipboard.writeText(asciiCanvas.textContent || "");
                    }
                }}>Copy Ascii</BasicButtonSolid>
            </Show>
        </div>
    );
}