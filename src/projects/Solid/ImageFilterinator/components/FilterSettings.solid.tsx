/** @jsxImportSource solid-js */

import { createSignal, createEffect, For } from "solid-js";
import Slider from "../../../../components/Solid/Slider/Slider.solid";
import { type BaseFilter, type FilterParam } from "../filters/base";

type FilterSettingsProps = {
    filter: BaseFilter;
    updateFilterParam: (name: string, param: string, value: any) => void;
};

export function FilterSettings(props: FilterSettingsProps) {
    const params = props.filter.getParams();
    
    return (
        <For each={params}>
            {(param) => {
                const [localValue, setLocalValue] = createSignal((props.filter as any)[param.key]);
                let debounceTimer: number | undefined;
                
                // Sync local state when filter changes externally
                createEffect(() => {
                    setLocalValue((props.filter as any)[param.key]);
                });
                
                return (
                    <>
                        {param.type === 'range' && (
                            <Slider
                                id={`${props.filter.name}-${param.key}`}
                                label={param.label}
                                min={param.min ?? 0}
                                max={param.max ?? 100}
                                step={param.step ?? 1}
                                value={localValue()}
                                onChange={(value) => {
                                    setLocalValue(value);
                                    clearTimeout(debounceTimer);
                                    debounceTimer = setTimeout(() => {
                                        props.updateFilterParam(props.filter.name, param.key, value);
                                    }, 100) as any;
                                }}
                            />
                        )}
                        
                        {param.type === 'checkbox' && (
                            <div class="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`${props.filter.name}-${param.key}`}
                                    checked={localValue()}
                                    onChange={(e) => {
                                        const value = e.currentTarget.checked;
                                        setLocalValue(value);
                                        props.updateFilterParam(props.filter.name, param.key, value);
                                    }}
                                />
                                <label for={`${props.filter.name}-${param.key}`}>{param.label}</label>
                            </div>
                        )}
                        
                        {param.type === 'select' && param.options && (
                            <div class="flex flex-col gap-1">
                                <label for={`${props.filter.name}-${param.key}`} class="text-sm">
                                    {param.label}
                                </label>
                                <select
                                    id={`${props.filter.name}-${param.key}`}
                                    value={localValue()}
                                    onChange={(e) => {
                                        const value = e.currentTarget.value;
                                        setLocalValue(value);
                                        props.updateFilterParam(props.filter.name, param.key, value);
                                    }}
                                    class="p-2 border rounded"
                                >
                                    <For each={param.options}>
                                        {(option) => <option value={option}>{option}</option>}
                                    </For>
                                </select>
                            </div>
                        )}
                    </>
                );
            }}
        </For>
    );
}

