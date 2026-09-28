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
      className={`w-full flex items-center justify-center my-2 sm:my-3 select-none pointer-events-none ${className}`}
      style={{ maxWidth: typeof width === "number" ? `${width}px` : width }}
    >
      <svg
        viewBox="0 0 360 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[260px] sm:max-w-[300px] h-auto drop-shadow-[0_1px_2px_rgba(182,141,76,0.22)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Left Hairline Gradient */}
          <linearGradient id="goldTaperLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C49A45" stopOpacity="0" />
            <stop offset="65%" stopColor="#C49A45" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8C621E" stopOpacity="0.95" />
          </linearGradient>

          {/* Right Hairline Gradient */}
          <linearGradient id="goldTaperRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C621E" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#C49A45" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C49A45" stopOpacity="0" />
          </linearGradient>

          {/* Gold Luster Gradient for Central Lotus & Jewels */}
          <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE59E" />
            <stop offset="45%" stopColor="#C89D46" />
            <stop offset="100%" stopColor="#7E5416" />
          </linearGradient>
        </defs>

        {/* Left Tapered Line */}
        <path
          d="M20 14 Q75 13.5 124 14 Q75 14.5 20 14 Z"
          fill="url(#goldTaperLeft)"
        />

        {/* Left Micro Pearl */}
        <circle cx="131" cy="14" r="1.3" fill="url(#royalGoldGrad)" />

        {/* Left Polished Diamond */}
        <polygon
          points="141,10.5 144.5,14 141,17.5 137.5,14"
          fill="url(#royalGoldGrad)"
        />

        {/* Left Symmetrical Flourish Curl */}
        <path
          d="M149 14 C153 11.5 158 12.5 160 14.5 C157 15.2 153 14.8 149 14 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* ========================================================= */}
        {/* CENTER ROYAL BLOOMING LOTUS & JEWEL MOTIF (Simple & Pretty) */}
        {/* ========================================================= */}

        {/* Center Tallest Lotus Petal */}
        <path
          d="M180 4 C183 9.5 184 14.5 180 19 C176 14.5 177 9.5 180 4 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Inner Left Petal */}
        <path
          d="M179 18 C175 14.5 170.5 9.5 172.5 7 C176 8.5 178 12.5 179 18 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Inner Right Petal */}
        <path
          d="M181 18 C185 14.5 189.5 9.5 187.5 7 C184 8.5 182 12.5 181 18 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Outer Left Curved Wing Petal */}
        <path
          d="M177 18.5 C171 16.5 163 13.5 163 11 C167.5 11.5 173 14.5 177 18.5 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Outer Right Curved Wing Petal */}
        <path
          d="M183 18.5 C189 16.5 197 13.5 197 11 C192.5 11.5 187 14.5 183 18.5 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Bottom Floral Base Calyx Cup */}
        <path
          d="M174 19.5 C177.5 21.8 182.5 21.8 186 19.5 C184 22.8 176 22.8 174 19.5 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Small Golden Droplet Bead */}
        <circle cx="180" cy="24" r="1.4" fill="url(#royalGoldGrad)" />

        {/* ========================================================= */}
        {/* RIGHT FLANKING ORNAMENTS                                 */}
        {/* ========================================================= */}

        {/* Right Symmetrical Flourish Curl */}
        <path
          d="M211 14 C207 11.5 202 12.5 200 14.5 C203 15.2 207 14.8 211 14 Z"
          fill="url(#royalGoldGrad)"
        />

        {/* Right Polished Diamond */}
        <polygon
          points="219,10.5 222.5,14 219,17.5 215.5,14"
          fill="url(#royalGoldGrad)"
        />

        {/* Right Micro Pearl */}
        <circle cx="229" cy="14" r="1.3" fill="url(#royalGoldGrad)" />

        {/* Right Tapered Line */}
        <path
          d="M236 14 Q285 13.5 340 14 Q285 14.5 236 14 Z"
          fill="url(#goldTaperRight)"
        />
      </svg>
    </div>
  );
};
