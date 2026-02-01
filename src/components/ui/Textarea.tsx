"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, required, className = "", disabled, rows = 4, ...props },
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
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={`
            min-h-[120px] px-4 py-3
            text-[15px] text-gray-900
            border rounded-[6px]
            transition-colors
            resize-y
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

Textarea.displayName = "Textarea";

export default Textarea;
