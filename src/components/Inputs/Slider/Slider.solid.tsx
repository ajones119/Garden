// src/components/Slider.solid.tsx
import { createSignal, onCleanup } from "solid-js";

type SliderProps = {
  id: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  value: number;
  name?: string;
  onChange: (value: number) => void;
};

export default function Slider(props: SliderProps) {

  return (
    <div class="flex flex-col gap-1 w-full max-w-sm text-[var(--color-foreground)] font-epic">
      {props.label && (
        <label
          for={props.id}
          class="text-xs mb-1 text-[var(--color-muted-foreground)]"
        >
          {props.label}
        </label>
      )}

      <div
        data-type="rangeInput"
        data-unit={props.unit}
        class="flex items-center gap-3"
      >
        <input
          type="range"
          id={props.id}
          name={props.name || props.id}
          min={props.min ?? 0}
          max={props.max ?? 100}
          step={props.step ?? 1}
          value={props.value}
          onInput={(e) => props.onChange(+e.currentTarget.value)}
          class="w-full h-2 bg-[var(--color-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
        />
        <output
          for={props.id}
          class="text-xs w-10 text-left text-nowrap"
        >
          {props.value + " " + (props.unit ?? "")}
        </output>
      </div>
    </div>
  );
}
