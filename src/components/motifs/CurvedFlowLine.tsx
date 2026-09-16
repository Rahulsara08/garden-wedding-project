"use client";

import React from "react";
import { motion } from "framer-motion";

interface CurvedFlowLineProps {
  className?: string;
}

export const CurvedFlowLine: React.FC<CurvedFlowLineProps> = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none my-4 flex justify-center items-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[360px] sm:max-w-[440px] h-12 text-gold/60"
      >
        {/* Animated Curved Dotted Line */}
        <motion.path
          d="M 10,30 Q 100,5 200,30 T 390,30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Animated Gold Diamond Ornaments along the curve */}
        <motion.circle
          cx="200"
          cy="30"
          r="3"
          fill="#B68D4C"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="105"
          cy="18"
          r="2"
          fill="#B68D4C"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle
          cx="295"
          cy="42"
          r="2"
          fill="#B68D4C"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
};
