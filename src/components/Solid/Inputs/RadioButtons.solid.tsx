/** @jsxImportSource solid-js */

import { For, type Component } from "solid-js";

export type Option<T> = {
  label: string;
  value: T;
};

type RadioButtonsProps<T> = {
  id: string;
  name: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
};

const RadioButtons = <T,>(props: RadioButtonsProps<T>) => {
  return (
    <div class={`flex flex-col gap-2 ${props.className || ""}`}>
      <For each={props.options}>
        {(opt) => (
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={props.name}
              value={String(opt.value)}
              checked={opt.value === props.selected}
              onChange={() => props.onChange(opt.value)}
              class="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-sm">{opt.label}</span>
          </label>
        )}
      </For>
    </div>
  );
};

export default RadioButtons;

