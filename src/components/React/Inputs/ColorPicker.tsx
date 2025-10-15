import React, { useState, useEffect } from "react";

type ColorPickerProps = {
  id: string;
  name?: string;
  label?: string;
  value: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export default function ColorPicker({
  id,
  name,
  label,
  value,
  disabled = false,
  className = "",
  onChange,
}: ColorPickerProps) {
  const [textValue, setTextValue] = useState(value.toUpperCase());

  // Sync text with prop value
  useEffect(() => {
    setTextValue(value.toUpperCase());
  }, [value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTextValue(newValue.toUpperCase());
    onChange(newValue);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTextValue(newValue.toUpperCase());
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleTextBlur = () => {
    let validValue = textValue.trim();
    
    // Add # if missing
    if (validValue.length > 0 && !validValue.startsWith('#')) {
      validValue = '#' + validValue;
    }
    
    // Validate and correct
    if (/^#[0-9A-F]{6}$/i.test(validValue)) {
      setTextValue(validValue.toUpperCase());
      onChange(validValue);
    } else {
      // Reset to prop value
      setTextValue(value.toUpperCase());
    }
  };

  return (
    <>
      <div className={`modern-color-picker-container ${className}`}>
        {label && (
          <label htmlFor={id} className="modern-color-picker-label">
            {label}
          </label>
        )}
        <div className="color-picker-wrapper">
          <input
            type="color"
            id={id}
            name={name || id}
            value={value}
            disabled={disabled}
            onChange={handleColorChange}
            className="modern-color-picker"
          />
          <input
            type="text"
            value={textValue}
            disabled={disabled}
            onChange={handleTextInput}
            onBlur={handleTextBlur}
            className="modern-color-text"
            placeholder="#000000"
            maxLength={7}
          />
        </div>
      </div>

      <style>{`
        .modern-color-picker-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 28rem;
        }

        .modern-color-picker-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-muted-foreground);
          transition: color var(--transition-speed) ease;
        }

        .color-picker-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modern-color-picker {
          width: var(--color-picker-size);
          height: var(--color-picker-size);
          padding: 0;
          border: var(--color-picker-border-width) solid var(--color-border);
          border-radius: var(--color-picker-border-radius);
          cursor: pointer;
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--color-picker-shadow);
          background: transparent;
          flex-shrink: 0;
        }

        .modern-color-picker::-webkit-color-swatch-wrapper {
          padding: 0;
          border-radius: calc(var(--color-picker-border-radius) - 2px);
        }

        .modern-color-picker::-webkit-color-swatch {
          border: none;
          border-radius: calc(var(--color-picker-border-radius) - 2px);
        }

        .modern-color-picker::-moz-color-swatch {
          border: none;
          border-radius: calc(var(--color-picker-border-radius) - 2px);
        }

        .modern-color-picker:hover:not(:disabled) {
          border-color: var(--color-primary);
          box-shadow: var(--color-picker-shadow-hover);
          transform: scale(1.05);
        }

        .modern-color-picker:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: var(--color-picker-shadow-focus);
        }

        .modern-color-picker:active:not(:disabled) {
          transform: scale(0.98);
        }

        .modern-color-picker:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modern-color-text {
          flex: 1;
          padding: var(--input-padding-y) var(--input-padding-x);
          font-size: var(--input-font-size);
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          color: var(--color-foreground);
          background: var(--color-background);
          border: var(--input-border-width) solid var(--color-border);
          border-radius: var(--input-border-radius);
          outline: none;
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--input-shadow);
        }

        .modern-color-text:hover:not(:disabled) {
          border-color: var(--color-primary);
        }

        .modern-color-text:focus {
          border-color: var(--color-primary);
          box-shadow: var(--input-shadow-focus);
        }

        .modern-color-text:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--color-muted);
        }
      `}</style>
    </>
  );
}

