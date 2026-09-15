"use client";

import React from "react";

interface CornerFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}

export const CornerFlourish: React.FC<CornerFlourishProps> = ({
  position = "top-left",
  className = "",
  size = 40,
}) => {
  const getRotation = () => {
    switch (position) {
      case "top-right":
        return "rotate-90";
      case "bottom-right":
        return "rotate-180";
      case "bottom-left":
        return "-rotate-90";
      default:
        return "rotate-0";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-gold/70 select-none ${getRotation()} ${className}`}
    >
      {/* Outer corner frame */}
      <path
        d="M2 38V12C2 6.47715 6.47715 2 12 2H38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Inner decorative arch */}
      <path
        d="M6 30V14C6 9.58172 9.58172 6 14 6H30"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      {/* Lotus petal flourish in the corner */}
      <path
        d="M12 12C16 14 20 18 20 22C16 22 14 18 12 12Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};
