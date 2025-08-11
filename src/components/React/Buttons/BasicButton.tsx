import React, { type PropsWithChildren } from "react";

type BasicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const BasicButton = ({
  className,
  children,
  ...rest
}: PropsWithChildren<BasicButtonProps>) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-bold text-foreground transition-colors bg-muted hover:bg-accent hover:cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BasicButton;
