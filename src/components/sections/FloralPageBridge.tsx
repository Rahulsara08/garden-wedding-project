"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

// Real wedding flower types – rendered as sized <img> (not fill) to avoid positioning issues
const FLOWER_SRCS = [
  "/assets/watercolor/rose-petal.jpg",
  "/assets/watercolor/marigold-flower.jpg",
  "/assets/watercolor/jasmine-flower.jpg",
];

/**
 * Flowers drop from above and stack on the garland rope arc.
 * The garland image (1024×682) has its rope arc in roughly the top 35-55% of the image.
 * posX spans 15%–85% to avoid clipping edges.
 * landingTop is the % from top of the garland container where petals rest on the rope.
 */
const STACKED_FLOWERS = Array.from({ length: 18 }, (_, i) => {
  // Horizontal spread: 15% → 85%
  const posX = 15 + i * 4.1;

  // Garland rope is a U-arc: center hangs lower (~52%), sides are higher (~35%)
  // normX: -1 (left edge) to 1 (right edge)
  const normX = ((posX - 50) / 35);
  const clampedNorm = Math.max(-1, Math.min(1, normX));
  // landingTop: 35% at sides → 52% at center
  const landingTop = 35 + (1 - clampedNorm * clampedNorm) * 17;

  const flowerSrc = FLOWER_SRCS[i % 3];
  // Sizes: rose 20px, marigold 24px, jasmine 16px — scaled slightly by position
  const baseSizes = [20, 24, 16];
  const size = baseSizes[i % 3] + (i % 3) * 1;

  return {
    id: i,
    posX,           // left % within garland container
    landingTop,     // top % within garland container (where it lands on rope)
    src: flowerSrc,
    size,           // px
    delay: 0.1 + (i % 6) * 0.35,
    duration: 1.6 + (i % 4) * 0.3,
    rotation: -25 + ((i * 31) % 55),   // final resting tilt
    driftX: ((i % 5) - 2) * 4,         // gentle horizontal drift (px)
  };
});

export const FloralPageBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const garlandRef = useRef<HTMLDivElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  // Gentle parallax — garland is ALWAYS visible (opacity=1), only subtle y-movement
  const imageY = useTransform(scrollYProgress, [0, 1], [-10, 15]);

  // Divider ornament fades in after garland
  const dividerOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const dividerScale = useTransform(scrollYProgress, [0.3, 0.6], [0.85, 1]);

  // Trigger flower-drop animation once garland enters viewport
  const isInView = useInView(garlandRef, { once: true, margin: "-60px" });

  return (
    <div
      ref={bridgeRef}
      className="relative w-full py-8 sm:py-12 bg-ivory paper-texture flex flex-col items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft edge blend masks */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-ivory to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-ivory to-transparent z-20 pointer-events-none" />

      {/* Garland with parallax — always fully visible */}
      <motion.div
        style={{ y: imageY }}
        className="relative w-full max-w-[440px] sm:max-w-[520px] mx-auto px-3 z-10"
      >
        {/* Gentle sway loop */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0, -0.5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full"
          style={{ aspectRatio: "1024 / 682" }}
        >
          {/* Garland base image */}
          <div
            ref={garlandRef}
            className="absolute inset-0"
          >
            <Image
              src="/assets/watercolor/floral-garland-bridge.png"
              alt="Real flower garland with pink roses, marigolds, jasmine and green leafy vines"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 440px, 520px"
              className="object-contain object-top"
            />
          </div>

          {/* Real Wedding Flowers — drop & stack on garland rope */}
          {STACKED_FLOWERS.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute pointer-events-none"
              style={{
                // Anchor point: center of flower at posX, starting above container
                left: `calc(${flower.posX}% - ${flower.size / 2}px)`,
                width: flower.size,
                height: flower.size,
                zIndex: 15,
              }}
              initial={{
                top: "-15%",
                opacity: 0,
                rotate: 0,
                x: 0,
                y: 0,
              }}
              animate={
                isInView
                  ? {
                      top: `${flower.landingTop}%`,
                      opacity: [0, 0.9, 1, 1],
                      rotate: flower.rotation,
                      x: flower.driftX,
                      // Tiny bounce on land
                      y: [0, 0, -3, 0],
                    }
                  : {
                      top: "-15%",
                      opacity: 0,
                      rotate: 0,
                      x: 0,
                      y: 0,
                    }
              }
              transition={{
                top: {
                  duration: flower.duration,
                  delay: flower.delay,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.4,
                  delay: flower.delay,
                },
                rotate: {
                  duration: flower.duration,
                  delay: flower.delay,
                  ease: "easeOut",
                },
                x: {
                  duration: flower.duration,
                  delay: flower.delay,
                  ease: "easeOut",
                },
                y: {
                  duration: 0.45,
                  delay: flower.delay + flower.duration * 0.85,
                  ease: "easeOut",
                },
              }}
            >
              {/* Use regular img with object-contain — mix-blend-mode multiply blends white bg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flower.src}
                alt="flower motif"
                width={flower.size}
                height={flower.size}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Centre ornamental divider */}
      <motion.div
        style={{ opacity: dividerOpacity, scale: dividerScale }}
        className="relative z-30 flex items-center justify-center gap-3 mt-1 px-4 max-w-[200px] mx-auto"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
        <svg viewBox="0 0 28 14" className="w-5 h-3 shrink-0 fill-current text-gold">
          <polygon points="14,1 27,7 14,13 1,7" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <polygon points="14,4 23,7 14,10 5,7" fill="currentColor" fillOpacity="0.3" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
      </motion.div>
    </div>
  );
};
