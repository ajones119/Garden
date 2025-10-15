import React, { type PropsWithChildren } from "react";

type BasicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const BasicButton = ({
  className,
  children,
  variant = "primary",
  ...rest
}: PropsWithChildren<BasicButtonProps>) => {
  const variantClass = 
    variant === "primary" ? "modern-button-primary" :
    variant === "secondary" ? "modern-button-secondary" :
    "modern-button-ghost";

  return (
    <>
      <button
        className={`modern-button ${variantClass} ${className || ""}`}
        {...rest}
      >
        {children}
      </button>
      <style>{`
        .modern-button {
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: var(--button-radius);
          box-shadow: var(--button-shadow);
        }

        .modern-button:hover {
          transform: var(--button-transform-hover);
          box-shadow: var(--button-shadow-hover);
        }

        .modern-button:active {
          transform: scale(0.98);
        }

        .modern-button-primary {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: var(--color-accent-foreground);
        }

        .modern-button-primary:hover {
          background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
        }

        .modern-button-secondary {
          background: var(--color-muted);
          color: var(--color-foreground);
          border: 2px solid var(--color-border);
        }

        .modern-button-secondary:hover {
          background: var(--color-background);
          border-color: var(--color-primary);
        }

        .modern-button-ghost {
          background: transparent;
          color: var(--color-foreground);
          border: 2px solid transparent;
        }

        .modern-button-ghost:hover {
          background: var(--color-muted);
          border-color: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export default BasicButton;
