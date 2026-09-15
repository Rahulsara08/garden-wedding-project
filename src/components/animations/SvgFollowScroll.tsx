"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

interface SvgFollowScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const SvgFollowScroll: React.FC<SvgFollowScrollProps> = ({
  containerRef,
  className = "",
}) => {
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  // Calculate height-based path or standard vertical path
  return (
    <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 32 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldStrokeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B68D4C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B68D4C" />
          </linearGradient>
        </defs>

        {/* Faint dashed preview track ahead */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="1000"
          stroke="#B68D4C"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.3"
        />

        {/* Solid gold drawn path up to current scroll position */}
        <motion.line
          x1="16"
          y1="0"
          x2="16"
          y2="1000"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.5"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};
