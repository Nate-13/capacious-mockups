"use client";

import { forwardRef, HTMLAttributes } from "react";

type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  hoverable?: boolean;
  onClick?: () => void;
}

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-3", // 12px
  md: "p-5", // 20px
  lg: "p-8", // 32px
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = "md",
      hoverable = false,
      onClick,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "bg-white border border-[#E0E0E0] rounded-[8px] transition-shadow";

    const hoverStyles = hoverable
      ? "hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      : "";

    const clickableStyles = onClick ? "cursor-pointer" : "";

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${clickableStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
