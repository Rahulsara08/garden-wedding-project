"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PETAL_IMAGES = [
  "/assets/watercolor/pink-rose-petal-1.png",
  "/assets/watercolor/pink-rose-petal-2.png",
  "/assets/watercolor/pink-rose-petal-3.png",
  "/assets/watercolor/pink-rose-petal-4.png",
];

interface IntroParticlesProps {
  count?: number;
  className?: string;
}

export const IntroParticles: React.FC<IntroParticlesProps> = ({
  count = 9,
  className = "",
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const petals = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => {
      const src = PETAL_IMAGES[i % PETAL_IMAGES.length];
      const startX = Math.random() * 90 + 5; // % across screen
      const driftX = (Math.random() - 0.5) * 45; // gentle horizontal drift
      const startY = -12 - Math.random() * 20; // % above screen
      const endY = 106 + Math.random() * 10; // % below screen
      const size = 9 + Math.random() * 7; // Small, delicate real rose petal (9px - 16px)
      const duration = 8.5 + Math.random() * 5.5; // Very calm, slow falling speed (8.5 - 14s)
      const delay = Math.random() * 5;
      const initialRotate = Math.random() * 360;
      const targetRotate = initialRotate + (Math.random() > 0.5 ? 1 : -1) * (140 + Math.random() * 160);

      return {
        id: i,
        src,
        startX,
        driftX,
        startY,
        endY,
        size,
        duration,
        delay,
        initialRotate,
        targetRotate,
      };
    });
  }, [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            opacity: 0,
            rotate: p.initialRotate,
            scale: 0.7,
          }}
          animate={{
            top: `${p.endY}%`,
            left: `${p.startX + p.driftX}%`,
            opacity: [0, 0.45, 0.55, 0], // Subtle, gentle, not overpowering
            rotate: p.targetRotate,
            scale: [0.7, 0.95, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            width: p.size,
            height: p.size,
            transform: "translate3d(0,0,0)",
            willChange: "transform, top, left, opacity",
          }}
          className="absolute"
        >
          <div className="relative w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
            <Image
              src={p.src}
              alt=""
              fill
              unoptimized
              sizes="18px"
              className="object-contain pointer-events-none select-none opacity-85"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
