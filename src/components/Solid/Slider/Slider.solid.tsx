/** @jsxImportSource solid-js */

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
    <>
      <div class="modern-slider-container">
        {props.label && (
          <label for={props.id} class="slider-label">
            {props.label}
          </label>
        )}

        <div class="slider-wrapper">
          <input
            type="range"
            id={props.id}
            name={props.name || props.id}
            min={props.min ?? 0}
            max={props.max ?? 100}
            step={props.step ?? 1}
            value={props.value}
            onInput={(e) => props.onChange(+e.currentTarget.value)}
            class="modern-slider"
          />
          <output for={props.id} class="slider-output">
            {props.value + " " + (props.unit ?? "")}
          </output>
        </div>
      </div>

      <style>{`
        .modern-slider-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 28rem;
          color: var(--color-foreground);
          font-family: var(--font-epic);
        }

        .slider-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-muted-foreground);
          margin-bottom: 0.25rem;
        }

        .slider-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .slider-output {
          font-size: 0.875rem;
          font-weight: 600;
          min-width: 3.5rem;
          text-align: left;
          white-space: nowrap;
          color: var(--color-foreground);
        }

        .modern-slider {
          width: 100%;
          height: var(--slider-track-height);
          -webkit-appearance: none;
          appearance: none;
          background: var(--color-muted);
          border-radius: var(--slider-track-radius);
          outline: none;
          cursor: pointer;
          box-shadow: var(--slider-track-shadow);
          transition: all var(--transition-speed) ease;
          position: relative;
        }

        .modern-slider:hover {
          opacity: 0.9;
        }

        /* Webkit browsers (Chrome, Safari, Edge) */
        .modern-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: var(--slider-thumb-size);
          height: var(--slider-thumb-size);
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: var(--slider-thumb-radius);
          cursor: pointer;
          box-shadow: var(--slider-thumb-shadow);
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid var(--color-background);
        }

        .modern-slider::-webkit-slider-thumb:hover {
          box-shadow: var(--slider-thumb-shadow-hover);
          transform: scale(1.1);
        }

        .modern-slider::-webkit-slider-thumb:active {
          transform: scale(0.95);
        }

        /* Firefox */
        .modern-slider::-moz-range-thumb {
          width: var(--slider-thumb-size);
          height: var(--slider-thumb-size);
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: var(--slider-thumb-radius);
          cursor: pointer;
          box-shadow: var(--slider-thumb-shadow);
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid var(--color-background);
        }

        .modern-slider::-moz-range-thumb:hover {
          box-shadow: var(--slider-thumb-shadow-hover);
          transform: scale(1.1);
        }

        .modern-slider::-moz-range-thumb:active {
          transform: scale(0.95);
        }

        /* Firefox track */
        .modern-slider::-moz-range-track {
          background: var(--color-muted);
          border-radius: var(--slider-track-radius);
          box-shadow: var(--slider-track-shadow);
        }
      `}</style>
    </>
  );
}
