"use client";

import React from "react";

interface GoldenLeafDividerProps {
  className?: string;
  width?: string | number;
}

export const GoldenLeafDivider: React.FC<GoldenLeafDividerProps> = ({
  className = "",
  width = "100%",
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center my-3 sm:my-5 select-none pointer-events-none ${className}`}
      style={{ maxWidth: typeof width === "number" ? `${width}px` : width }}
    >
      <svg
        viewBox="0 0 400 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] sm:max-w-[340px] h-auto drop-shadow-2xs"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="goldLineLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A358" stopOpacity="0" />
            <stop offset="40%" stopColor="#C5A358" stopOpacity="0.75" />
            <stop offset="90%" stopColor="#A67C38" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8D6B2C" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="goldLineRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8D6B2C" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#A67C38" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#C5A358" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C5A358" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5C77E" />
            <stop offset="50%" stopColor="#B68D4C" />
            <stop offset="100%" stopColor="#8C6629" />
          </linearGradient>
        </defs>

        {/* Left Tapered Hairline */}
        <path
          d="M30 20 Q110 18.5 170 19 Q172 20 170 21 Q110 21.5 30 20 Z"
          fill="url(#goldLineLeft)"
        />

        {/* Center 3-Leaf Lotus Motif matching Image 5 */}
        {/* Center Leaf (Tallest) */}
        <path
          d="M200 6 C205 12 207 19 203 26 C201.5 28 198.5 28 197 26 C193 19 195 12 200 6 Z"
          fill="url(#goldLeafGrad)"
        />

        {/* Left Leaf (Angled) */}
        <path
          d="M197 25 C192 23 183 18 181 12 C186 12 193 17 197 25 Z"
          fill="url(#goldLeafGrad)"
        />

        {/* Right Leaf (Angled) */}
        <path
          d="M203 25 C208 23 217 18 219 12 C214 12 207 17 203 25 Z"
          fill="url(#goldLeafGrad)"
        />

        {/* Small Bottom Stem Anchor */}
        <ellipse cx="200" cy="27" rx="3.5" ry="1.2" fill="url(#goldLeafGrad)" />

        {/* Right Tapered Hairline */}
        <path
          d="M230 19 Q290 18.5 370 20 Q290 21.5 230 21 Q228 20 230 19 Z"
          fill="url(#goldLineRight)"
        />
      </svg>
    </div>
  );
};
