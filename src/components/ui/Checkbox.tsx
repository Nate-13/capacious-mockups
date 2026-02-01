"use client";

import { forwardRef, InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> {
  label?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", disabled, checked, ...props }, ref) => {
    return (
      <label
        className={`
          inline-flex items-center gap-3
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
          ${className}
        `}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div
            className={`
              w-5 h-5
              border rounded
              flex items-center justify-center
              transition-colors
              ${
                checked
                  ? "bg-gray-800 border-gray-800"
                  : "bg-white border-[#E0E0E0]"
              }
              ${disabled ? "" : "peer-focus:border-[#999]"}
            `}
          >
            {checked && (
              <span className="text-white text-sm leading-none">✓</span>
            )}
          </div>
        </div>
        {label && <span className="text-[15px] text-gray-900">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
