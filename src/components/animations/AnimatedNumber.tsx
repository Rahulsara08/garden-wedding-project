"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  padZero?: boolean;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  padZero = true,
  className = "",
}) => {
  const displayString = padZero && value < 10 ? `0${value}` : `${value}`;

  return (
    <div className={`relative inline-flex overflow-hidden h-[1.2em] leading-none ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={displayString}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums font-serif"
        >
          {displayString}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
