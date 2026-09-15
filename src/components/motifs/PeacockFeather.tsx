"use client";

import React from "react";
import { motion } from "framer-motion";

interface PeacockFeatherProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const PeacockFeather: React.FC<PeacockFeatherProps> = ({
  className = "",
  size = 80,
  animated = true,
}) => {
  return (
    <motion.svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      animate={
        animated
          ? {
              rotate: [-2, 2, -2],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : undefined
      }
    >
      {/* Central quill spine */}
      <path
        d="M50 145C48 110 46 65 50 15"
        stroke="#3F4F3D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Peacock Eye - Concentric ellipses */}
      {/* Outer gold glow ring */}
      <ellipse
        cx="50"
        cy="40"
        rx="26"
        ry="30"
        stroke="#B68D4C"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />

      {/* Middle sage ring */}
      <ellipse
        cx="50"
        cy="40"
        rx="18"
        ry="22"
        stroke="#3F4F3D"
        strokeWidth="1.2"
        fill="#3F4F3D"
        fillOpacity="0.08"
      />

      {/* Inner deep forest ring */}
      <ellipse
        cx="50"
        cy="42"
        rx="11"
        ry="14"
        stroke="#2C3826"
        strokeWidth="1.2"
        fill="#2C3826"
        fillOpacity="0.15"
      />

      {/* Center pupil / heart */}
      <circle cx="50" cy="44" r="5" fill="#B68D4C" />

      {/* Delicate radiating barb lines */}
      <path
        d="M48 65C30 70 15 85 10 105M52 65C70 70 85 85 90 105"
        stroke="#3F4F3D"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <path
        d="M48 85C32 92 18 108 14 125M52 85C68 92 82 108 86 125"
        stroke="#3F4F3D"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <path
        d="M49 105C36 112 25 125 22 138M51 105C64 112 75 125 78 138"
        stroke="#3F4F3D"
        strokeWidth="0.7"
        strokeOpacity="0.3"
      />

      {/* Crown filaments */}
      <path
        d="M50 15C42 8 36 2 32 0M50 15C58 8 64 2 68 0M50 15C50 6 50 2 50 0"
        stroke="#B68D4C"
        strokeWidth="0.8"
      />
    </motion.svg>
  );
};
