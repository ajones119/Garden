import React from "react";

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
  className?: "";
};

const RadioButtons = <T,>({
  name,
  options,
  selected,
  onChange,
  className = "",
}: RadioButtonsProps<T>) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((opt) => (
        <label
          key={String(opt.value)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={String(opt.value)}
            checked={opt.value === selected}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
