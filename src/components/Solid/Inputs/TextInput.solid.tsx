/** @jsxImportSource solid-js */

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
  onInput: (value: string) => void;
};

export default function TextInput(props: TextInputProps) {
  return (
    <>
      <div class={`modern-input-container ${props.className || ""}`}>
        {props.label && (
          <label for={props.id} class="modern-input-label">
            {props.label}
          </label>
        )}
        <input
          type={props.type || "text"}
          id={props.id}
          name={props.name || props.id}
          placeholder={props.placeholder}
          value={props.value}
          required={props.required}
          disabled={props.disabled}
          onInput={(e) => props.onInput(e.currentTarget.value)}
          class="modern-input"
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

