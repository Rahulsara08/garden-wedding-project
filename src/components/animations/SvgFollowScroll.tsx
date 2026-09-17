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

  // Winding golden path weaving around each event card, hitting each node circle center (Image 2 reference)
  const pathD = "M 50,0 L 50,60 C 10,130 10,200 50,270 C 90,340 90,410 50,480 C 10,550 10,620 50,690 C 90,755 90,825 50,890 L 50,1000";

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000"
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

        {/* Faint background snake-like S-curve track weaving left and right */}
        <path
          d={pathD}
          stroke="#B68D4C"
          strokeWidth="1.8"
          strokeDasharray="4 6"
          strokeOpacity="0.35"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated flowing dashed golden snake curve */}
        <motion.path
          d={pathD}
          stroke="url(#goldStrokeGrad)"
          strokeWidth="2.2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Active solid scroll-revealed gold snake curve */}
        <motion.path
          d={pathD}
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};
