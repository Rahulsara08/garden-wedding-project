"use client";

import React from "react";
import Image from "next/image";
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
    <motion.div
      style={{ width: size, height: size * 1.1 }}
      className={`relative select-none pointer-events-none filter drop-shadow-[0_4px_12px_rgba(182,141,76,0.15)] ${className}`}
      animate={
        animated
          ? {
              rotate: [-3, 3, -3],
              y: [0, -3, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : undefined
      }
    >
      <Image
        src="/assets/watercolor/royal-peacock-feather.png"
        alt="Royal Peacock Feather"
        fill
        unoptimized
        sizes={`${size}px`}
        className="object-contain"
      />
    </motion.div>
  );
};
