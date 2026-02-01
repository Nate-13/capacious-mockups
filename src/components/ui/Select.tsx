"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="text-[14px] font-bold mb-2 text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
              w-full h-[44px] px-4 py-3 pr-10
              text-[15px] text-gray-900
              border rounded-[6px]
              transition-colors
              appearance-none
              ${
                error
                  ? "border-red-500"
                  : "border-[#E0E0E0] focus:border-[#999]"
              }
              ${
                disabled
                  ? "bg-gray-100 opacity-60 cursor-not-allowed"
                  : "bg-white cursor-pointer"
              }
              outline-none
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            className={`
              absolute right-4 top-1/2 -translate-y-1/2
              text-gray-500 text-xs pointer-events-none
              ${disabled ? "opacity-60" : ""}
            `}
          >
            ▼
          </span>
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
