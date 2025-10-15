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
    <>
      <div class={`modern-radio-group ${props.className || ""}`}>
        <For each={props.options}>
          {(opt) => (
            <label class="modern-radio-label">
              <input
                type="radio"
                name={props.name}
                value={String(opt.value)}
                checked={opt.value === props.selected}
                onChange={() => props.onChange(opt.value)}
                class="modern-radio-input"
              />
              <span class="modern-radio-custom"></span>
              <span class="modern-radio-text">{opt.label}</span>
            </label>
          )}
        </For>
      </div>

      <style>{`
        .modern-radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modern-radio-label {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          position: relative;
          user-select: none;
          transition: all var(--transition-speed) ease;
        }

        .modern-radio-label:hover .modern-radio-custom {
          border-color: var(--color-primary);
          box-shadow: var(--radio-shadow-hover);
        }

        /* Hide default radio */
        .modern-radio-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* Custom radio button */
        .modern-radio-custom {
          position: relative;
          width: var(--radio-size);
          height: var(--radio-size);
          border: var(--radio-border-width) solid var(--color-border);
          border-radius: var(--radio-border-radius);
          background: var(--color-background);
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--radio-shadow);
          flex-shrink: 0;
        }

        /* Radio dot (when checked) */
        .modern-radio-custom::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: var(--radio-dot-size);
          height: var(--radio-dot-size);
          border-radius: var(--radio-border-radius);
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Checked state */
        .modern-radio-input:checked + .modern-radio-custom {
          border-color: var(--color-primary);
          background: var(--color-muted);
        }

        .modern-radio-input:checked + .modern-radio-custom::after {
          transform: translate(-50%, -50%) scale(1);
        }

        /* Focus state */
        .modern-radio-input:focus + .modern-radio-custom {
          box-shadow: var(--radio-shadow-focus);
        }

        /* Active state */
        .modern-radio-label:active .modern-radio-custom {
          transform: scale(0.95);
        }

        /* Label text */
        .modern-radio-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-foreground);
          transition: color var(--transition-speed) ease;
        }

        .modern-radio-input:checked ~ .modern-radio-text {
          color: var(--color-primary);
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default RadioButtons;

