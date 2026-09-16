"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

const STACKED_PETALS = Array.from({ length: 18 }, (_, i) => {
  // Horizontal positioning along the garland arc (0% to 100%)
  const posX = 10 + i * 4.8;
  // Calculate vertical Y position on the U-shaped garland arc (center is lower, sides are higher)
  const normX = (posX - 50) / 40; // -1 to 1
  const garlandCurveY = 22 + (1 - normX * normX) * 22; // Garland ledge Y percentage

  return {
    id: i,
    left: `${posX}%`,
    targetTop: `${garlandCurveY}%`,
    delay: 0.2 + (i % 6) * 0.45,
    duration: 2.4 + (i % 4) * 0.3,
    size: 10 + (i % 4) * 3,
    type: i % 3 === 0 ? "rose" : i % 3 === 1 ? "marigold" : "jasmine",
    rotation: -25 + (i * 17) % 50,
  };
});

export const FloralPageBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  // Parallax & Reveal animations as user scrolls between Page 1 and Page 2
  const imageScale = useTransform(scrollYProgress, [0.05, 0.45], [0.92, 1.04]);
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  return (
    <div
      ref={bridgeRef}
      className="relative w-full py-6 sm:py-10 bg-ivory paper-texture flex flex-col items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft Gradient Blend Masks for Seamless Transition */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-ivory via-ivory/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-ivory via-ivory/90 to-transparent z-20 pointer-events-none" />

      {/* Photorealistic Floral Garland with sway & parallax */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity, y: imageY }}
        className="relative w-full max-w-[480px] sm:max-w-[560px] mx-auto px-2 z-10"
      >
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, 0.4, 0, -0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full aspect-[1024/682] filter drop-shadow-[0_8px_16px_rgba(44,56,38,0.08)]"
        >
          <Image
            src="/assets/watercolor/floral-garland-bridge.png"
            alt="Real flower garland with pink roses, marigolds, jasmine and green leafy vines"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-contain object-top"
          />

          {/* Falling Real Flower Petals that Land & Stack on Garland Ledge */}
          {STACKED_PETALS.map((p) => (
            <motion.div
              key={p.id}
              style={{ left: p.left, width: p.size, height: p.size * 1.3 }}
              initial={{ top: "-15%", opacity: 0, rotate: 0 }}
              whileInView={{
                top: ["-10%", p.targetTop, p.targetTop],
                opacity: [0, 1, 1],
                rotate: [0, p.rotation, p.rotation + 5, p.rotation],
                y: [0, 0, -3, 0],
              }}
              viewport={{ once: true }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute z-25 pointer-events-none drop-shadow-xs"
            >
              <svg viewBox="0 0 20 28" fill="currentColor">
                <path
                  d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z"
                  className={
                    p.type === "rose"
                      ? "text-rose-600"
                      : p.type === "marigold"
                      ? "text-amber-500"
                      : "text-amber-100"
                  }
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Center Ornamental Divider below garland */}
      <motion.div
        style={{
          scale: useTransform(scrollYProgress, [0.25, 0.55], [0.85, 1]),
          opacity: useTransform(scrollYProgress, [0.25, 0.5], [0, 1]),
        }}
        className="relative z-30 flex flex-col items-center justify-center px-4 -mt-2 sm:-mt-4"
      >
        <div className="flex items-center justify-center gap-3 w-full max-w-[220px]">
          {/* Left Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />

          {/* Center Diamond Ornament */}
          <div className="relative text-gold flex items-center justify-center shrink-0">
            <svg viewBox="0 0 28 14" className="w-6 h-3.5 fill-current text-gold">
              <polygon
                points="14,1 27,7 14,13 1,7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <polygon
                points="14,4 23,7 14,10 5,7"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
          </div>

          {/* Right Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
        </div>
      </motion.div>
    </div>
  );
};
