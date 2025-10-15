import React from "react";

type NumberInputProps = {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: number) => void;
};

export default function NumberInput({
  id,
  name,
  label,
  placeholder,
  value,
  min,
  max,
  step = 1,
  required = false,
  disabled = false,
  className = "",
  onChange,
}: NumberInputProps) {
  return (
    <>
      <div className={`modern-input-container ${className}`}>
        {label && (
          <label htmlFor={id} className="modern-input-label">
            {label}
          </label>
        )}
        <input
          type="number"
          id={id}
          name={name || id}
          placeholder={placeholder}
          value={value}
          min={min}
          max={max}
          step={step}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(+e.currentTarget.value)}
          className="modern-input modern-number-input"
        />
      </div>

      <style>{`
        .modern-input-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 28rem;
        }

        .modern-input-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-muted-foreground);
          transition: color var(--transition-speed) ease;
        }

        .modern-input {
          width: 100%;
          padding: var(--input-padding-y) var(--input-padding-x);
          font-size: var(--input-font-size);
          font-family: inherit;
          color: var(--color-foreground);
          background: var(--color-background);
          border: var(--input-border-width) solid var(--color-border);
          border-radius: var(--input-border-radius);
          outline: none;
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--input-shadow);
        }

        .modern-input::placeholder {
          color: var(--color-muted-foreground);
          opacity: 0.6;
        }

        .modern-input:hover:not(:disabled) {
          border-color: var(--color-primary);
        }

        .modern-input:focus {
          border-color: var(--color-primary);
          box-shadow: var(--input-shadow-focus);
        }

        .modern-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--color-muted);
        }

        /* Number input specific styles */
        .modern-number-input::-webkit-inner-spin-button,
        .modern-number-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .modern-number-input {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}

