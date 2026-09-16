"use client";

import React, { useRef } from "react";
import Image from "next/image";
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
  const imageScale = useTransform(scrollYProgress, [0.05, 0.45], [0.92, 1.04]);
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  // Floating petal parallax
  const petalY1 = useTransform(scrollYProgress, [0, 1], [-16, 45]);
  const petalRotate1 = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const petalY2 = useTransform(scrollYProgress, [0, 1], [-10, 50]);
  const petalRotate2 = useTransform(scrollYProgress, [0, 1], [10, -30]);

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
            y: [0, -5, 0],
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
        </motion.div>
      </motion.div>

      {/* Floating Flower Petals with Parallax */}
      <motion.div
        style={{ y: petalY1, rotate: petalRotate1 }}
        className="absolute left-[12%] top-8 w-3.5 h-5 text-gold-dark/40 pointer-events-none z-5"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.65" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: petalY2, rotate: petalRotate2 }}
        className="absolute right-[14%] top-12 w-3 h-4 text-rose-800/35 pointer-events-none z-5"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.5" />
        </svg>
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
