"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

export const FloralPageBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  // Parallax & Reveal animations as user scrolls between Page 1 and Page 2
  const leftVineX = useTransform(scrollYProgress, [0.15, 0.55], [-30, 0]);
  const leftVineOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 0.65]);

  const rightVineX = useTransform(scrollYProgress, [0.15, 0.55], [30, 0]);
  const rightVineOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 0.65]);

  const centerSealScale = useTransform(scrollYProgress, [0.2, 0.6], [0.88, 1]);
  const centerSealOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  const petalY1 = useTransform(scrollYProgress, [0, 1], [-15, 35]);
  const petalRotate1 = useTransform(scrollYProgress, [0, 1], [-12, 22]);

  const petalY2 = useTransform(scrollYProgress, [0, 1], [-10, 45]);
  const petalRotate2 = useTransform(scrollYProgress, [0, 1], [8, -25]);

  const petalY3 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const petalRotate3 = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <div
      ref={bridgeRef}
      className="relative w-full h-28 sm:h-36 bg-ivory paper-texture flex items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft Gradient Blend Masks at Top and Bottom for Seamless Integration */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />

      {/* Left Delicate Floral Vine SVG */}
      <motion.div
        style={{ x: leftVineX, opacity: leftVineOpacity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-20 sm:w-28 h-auto text-forest/40 pointer-events-none z-0"
      >
        <svg viewBox="0 0 120 160" fill="none" className="w-full h-full stroke-current" strokeWidth="1.2">
          {/* Main vine stem */}
          <path d="M-10 140 C 20 110, 40 80, 25 20 C 20 5, 15 -10, 10 -20" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M18 100 C 35 95, 45 105, 38 118 C 30 115, 22 105, 18 100 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M28 70 C 48 62, 55 75, 46 88 C 38 82, 30 75, 28 70 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M24 40 C 42 30, 48 42, 38 52 C 30 48, 25 44, 24 40 Z" fill="currentColor" fillOpacity="0.12" />
          {/* Small Gold Accent Buds */}
          <circle cx="48" cy="60" r="2.5" className="fill-gold/60 stroke-none" />
          <circle cx="38" cy="30" r="2" className="fill-gold/60 stroke-none" />
        </svg>
      </motion.div>

      {/* Right Delicate Floral Vine SVG */}
      <motion.div
        style={{ x: rightVineX, opacity: rightVineOpacity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-20 sm:w-28 h-auto text-forest/40 pointer-events-none z-0"
      >
        <svg viewBox="0 0 120 160" fill="none" className="w-full h-full stroke-current" strokeWidth="1.2">
          {/* Main vine stem */}
          <path d="M130 140 C 100 110, 80 80, 95 20 C 100 5, 105 -10, 110 -20" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M102 100 C 85 95, 75 105, 82 118 C 90 115, 98 105, 102 100 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M92 70 C 72 62, 65 75, 74 88 C 82 82, 90 75, 92 70 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M96 40 C 78 30, 72 42, 82 52 C 90 48, 95 44, 96 40 Z" fill="currentColor" fillOpacity="0.12" />
          {/* Small Gold Accent Buds */}
          <circle cx="72" cy="60" r="2.5" className="fill-gold/60 stroke-none" />
          <circle cx="82" cy="30" r="2" className="fill-gold/60 stroke-none" />
        </svg>
      </motion.div>

      {/* Floating Flower Petals with Gentle Parallax */}
      <motion.div
        style={{ y: petalY1, rotate: petalRotate1 }}
        className="absolute left-[22%] top-3 w-3 h-4 text-gold-dark/40 pointer-events-none z-1"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.65" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: petalY2, rotate: petalRotate2 }}
        className="absolute right-[25%] top-6 w-2.5 h-3.5 text-rose-800/30 pointer-events-none z-1"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.5" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: petalY3, rotate: petalRotate3 }}
        className="absolute left-[48%] top-1 w-2 h-3 text-gold/50 pointer-events-none z-1"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Center Antique Gold Ornamental Divider Motif */}
      <motion.div
        style={{ scale: centerSealScale, opacity: centerSealOpacity }}
        className="relative z-20 flex flex-col items-center justify-center px-4"
      >
        <div className="flex items-center justify-center gap-3 w-full max-w-[220px]">
          {/* Left Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />

          {/* Center Lotus / Diamond Filigree SVG Ornament */}
          <div className="relative text-gold flex items-center justify-center shrink-0">
            <svg viewBox="0 0 44 24" className="w-9 h-6 fill-current text-gold">
              {/* Outer lotus petals outline */}
              <path
                d="M 22 2 C 16 10, 8 14, 2 15 C 8 18, 16 20, 22 23 C 28 20, 36 18, 42 15 C 36 14, 28 10, 22 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
              {/* Inner lotus center diamond */}
              <polygon points="22,6 27,12 22,18 17,12" fill="currentColor" fillOpacity="0.35" />
              {/* Side accent dots */}
              <circle cx="7" cy="12" r="1.2" fill="currentColor" />
              <circle cx="37" cy="12" r="1.2" fill="currentColor" />
            </svg>
          </div>

          {/* Right Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
        </div>
      </motion.div>
    </div>
  );
};
