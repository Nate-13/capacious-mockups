"use client";

import { forwardRef, InputHTMLAttributes } from "react";

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, required, className = "", disabled, ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="text-[14px] font-bold mb-2 text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`
            h-[44px] px-4 py-3
            text-[15px] text-gray-900
            border rounded-[6px]
            transition-colors
            ${error ? "border-red-500" : "border-[#E0E0E0] focus:border-[#999]"}
            ${
              disabled
                ? "bg-gray-100 opacity-60 cursor-not-allowed"
                : "bg-white"
            }
            outline-none
            placeholder:text-gray-400
          `}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
