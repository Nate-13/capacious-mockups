"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#333] text-white font-bold hover:bg-[#222] border border-transparent",
  secondary: "bg-white text-[#333] border border-[#333] hover:bg-gray-50",
  destructive:
    "bg-[#666] text-[#333] border border-transparent hover:bg-[#555]",
  ghost: "bg-transparent text-[#333] border-none hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "rounded-[6px] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400";

    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
