import React from "react";

export type CheckboxOption<T> = {
  label: string;
  value: T;
};

type CheckboxGroupProps<T> = {
  id: string;
  name: string;
  options: CheckboxOption<T>[];
  selectedValues: T[];
  onChange: (value: T, checked: boolean) => void;
  className?: string;
};

const CheckboxGroup = <T,>({
  name,
  options,
  selectedValues,
  onChange,
  className = "",
}: CheckboxGroupProps<T>) => {
  const isChecked = (value: T) => {
    return selectedValues.some((v) => v === value);
  };

  return (
    <>
      <div className={`modern-checkbox-group ${className}`}>
        {options.map((opt) => (
          <label
            key={String(opt.value)}
            className="modern-checkbox-label"
          >
            <input
              type="checkbox"
              name={name}
              value={String(opt.value)}
              checked={isChecked(opt.value)}
              onChange={(e) => onChange(opt.value, e.currentTarget.checked)}
              className="modern-checkbox-input"
            />
            <span className="modern-checkbox-custom"></span>
            <span className="modern-checkbox-text">{opt.label}</span>
          </label>
        ))}
      </div>

      <style>{`
        .modern-checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modern-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          position: relative;
          user-select: none;
          transition: all var(--transition-speed) ease;
        }

        .modern-checkbox-label:hover .modern-checkbox-custom {
          border-color: var(--color-primary);
          box-shadow: var(--checkbox-shadow-hover);
        }

        /* Hide default checkbox */
        .modern-checkbox-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* Custom checkbox */
        .modern-checkbox-custom {
          position: relative;
          width: var(--checkbox-size);
          height: var(--checkbox-size);
          border: var(--checkbox-border-width) solid var(--color-border);
          border-radius: var(--checkbox-border-radius);
          background: var(--color-background);
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--checkbox-shadow);
          flex-shrink: 0;
        }

        /* Checkmark (when checked) */
        .modern-checkbox-custom::after {
          content: '';
          position: absolute;
          top: 20%;
          left: 50%;
          width: 30%;
          height: 60%;
          border: solid var(--color-accent);
          border-width: 0 var(--checkbox-checkmark-width) var(--checkbox-checkmark-width) 0;
          transform: translate(-50%, -10%) rotate(45deg) scale(0);
          transform-origin: center;
          transition: transform var(--transition-speed) cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        /* Checked state */
        .modern-checkbox-input:checked + .modern-checkbox-custom {
          border-color: var(--color-primary);
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        }

        .modern-checkbox-input:checked + .modern-checkbox-custom::after {
          transform: translate(-50%, -10%) rotate(45deg) scale(1);
          border-color: var(--color-accent-foreground);
        }

        /* Focus state */
        .modern-checkbox-input:focus + .modern-checkbox-custom {
          box-shadow: var(--checkbox-shadow-focus);
        }

        /* Active state */
        .modern-checkbox-label:active .modern-checkbox-custom {
          transform: scale(0.95);
        }

        /* Label text */
        .modern-checkbox-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-foreground);
          transition: color var(--transition-speed) ease;
        }

        .modern-checkbox-input:checked ~ .modern-checkbox-text {
          color: var(--color-primary);
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default CheckboxGroup;

