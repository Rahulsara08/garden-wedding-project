"use client";

import React from "react";

interface LotusDividerProps {
  className?: string;
  variant?: "diamond" | "lotus" | "simple";
}

export const LotusDivider: React.FC<LotusDividerProps> = ({
  className = "",
  variant = "diamond",
}) => {
  if (variant === "simple") {
    return (
      <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold to-gold/40" />
        <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-gold to-gold/40" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-2 my-4 select-none ${className}`}>
      {/* Left hairline */}
      <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
      
      {/* Center geometric knot / diamond flourish (per screenshot) */}
      <svg
        width="44"
        height="16"
        viewBox="0 0 44 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold flex-shrink-0"
      >
        {/* Outer diamond */}
        <path
          d="M22 1L28 8L22 15L16 8L22 1Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        {/* Left accent ring/loop */}
        <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1" />
        {/* Right accent ring/loop */}
        <circle cx="34" cy="8" r="4" stroke="currentColor" strokeWidth="1" />
        {/* Center dot */}
        <circle cx="22" cy="8" r="1.5" fill="currentColor" />
        {/* Side connects */}
        <line x1="0" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1" />
        <line x1="38" y1="8" x2="44" y2="8" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Right hairline */}
      <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
    </div>
  );
};
