"use client";

import React from "react";
import { motion } from "framer-motion";

interface RadhaKrishnaSealProps {
  className?: string;
  size?: number;
  initials?: string;
  animated?: boolean;
  onClick?: () => void;
  showRays?: boolean;
}

export const RadhaKrishnaSeal: React.FC<RadhaKrishnaSealProps> = ({
  className = "",
  size = 140,
  initials = "R & A",
  animated = false,
  onClick,
  showRays = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        onClick ? "cursor-pointer transition-transform hover:scale-105 active:scale-95" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Subtle gold metallic gradient */}
          <radialGradient id="sealGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9EB" />
            <stop offset="70%" stopColor="#F5E8C7" />
            <stop offset="100%" stopColor="#DFC386" />
          </radialGradient>
          <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B68D4C" />
            <stop offset="100%" stopColor="#8F6E36" />
          </linearGradient>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(182, 141, 76, 0.15)" strokeWidth="4" />

        {/* Outer rays / scalloped edge */}
        {showRays && (
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#B68D4C"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.6"
          />
        )}

        {/* Main Seal Body */}
        <circle cx="100" cy="100" r="82" fill="url(#sealGold)" stroke="url(#goldBorder)" strokeWidth="2.5" />

        {/* Inner concentric ring */}
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="#B68D4C"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.8"
        />

        {/* Sanskrit Inscription along top arc */}
        <path
          id="topArc"
          d="M 40 100 A 60 60 0 0 1 160 100"
          fill="none"
          stroke="none"
        />
        <text className="text-[10px] tracking-widest fill-forest font-serif select-none" textAnchor="middle">
          <textPath href="#topArc" startOffset="50%">
            ॥ श्री राधे कृष्ण ॥
          </textPath>
        </text>

        {/* Sanskrit Date / Location along bottom arc */}
        <path
          id="bottomArc"
          d="M 160 100 A 60 60 0 0 1 40 100"
          fill="none"
          stroke="none"
        />
        <text className="text-[9px] tracking-widest fill-forest font-serif select-none" textAnchor="middle">
          <textPath href="#bottomArc" startOffset="50%">
            VRINDAVAN · 2027
          </textPath>
        </text>

        {/* Center decorative Peacock Feather motif */}
        <g transform="translate(100, 75) scale(0.35) translate(-50, -60)">
          <ellipse cx="50" cy="40" rx="20" ry="24" stroke="#2C3826" strokeWidth="2" fill="#3F4F3D" fillOpacity="0.1" />
          <ellipse cx="50" cy="42" rx="10" ry="12" stroke="#B68D4C" strokeWidth="2" fill="#B68D4C" />
          <circle cx="50" cy="44" r="4" fill="#2C3826" />
          <path d="M50 64V120" stroke="#3F4F3D" strokeWidth="2" />
        </g>

        {/* Center Initials */}
        <text
          x="100"
          y="126"
          textAnchor="middle"
          fill="#2C3826"
          className="font-serif font-bold text-2xl tracking-wider select-none"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {initials}
        </text>

        {/* Decorative underline */}
        <path
          d="M75 136C88 138 112 138 125 136"
          stroke="#B68D4C"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="100" cy="137" r="1.5" fill="#B68D4C" />
      </svg>
    </div>
  );
};
