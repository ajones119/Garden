import React from "react";

type TextInputProps = {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export default function TextInput({
  id,
  name,
  label,
  placeholder,
  value,
  type = "text",
  required = false,
  disabled = false,
  className = "",
  onChange,
}: TextInputProps) {
  return (
    <>
      <div className={`modern-input-container ${className}`}>
        {label && (
          <label htmlFor={id} className="modern-input-label">
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          name={name || id}
          placeholder={placeholder}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="modern-input"
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

        /* Autofill styling */
        .modern-input:-webkit-autofill,
        .modern-input:-webkit-autofill:hover,
        .modern-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px var(--color-background) inset;
          -webkit-text-fill-color: var(--color-foreground);
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </>
  );
}

