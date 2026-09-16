"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

// Real wedding flower types with their images
const FLOWER_TYPES = [
  { src: "/assets/watercolor/rose-petal.jpg", label: "rose", size: 18 },
  { src: "/assets/watercolor/marigold-flower.jpg", label: "marigold", size: 22 },
  { src: "/assets/watercolor/jasmine-flower.jpg", label: "jasmine", size: 14 },
];

// Generate flower drops — they fall from above and stack at the garland arc
const STACKED_FLOWERS = Array.from({ length: 22 }, (_, i) => {
  // Spread horizontally across the garland (10% – 90%)
  const posX = 10 + i * 3.7;
  // U-shaped garland arc: center hangs lower, sides are higher
  const normX = (posX - 50) / 40; // -1 to 1
  const stackY = 20 + (1 - normX * normX) * 24; // Landing Y% on garland

  const flowerType = FLOWER_TYPES[i % 3];

  return {
    id: i,
    left: `${posX}%`,
    landingTop: `${stackY}%`,
    delay: 0.15 + (i % 7) * 0.38,
    duration: 1.8 + (i % 5) * 0.25,
    size: flowerType.size + (i % 3) * 2,
    src: flowerType.src,
    label: flowerType.label,
    rotation: -30 + (i * 23) % 60,
    // Slight horizontal drift for natural feel
    driftX: ((i % 5) - 2) * 6,
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

  // Parallax & Reveal animations as user scrolls between Page 1 and Page 2
  const imageScale = useTransform(scrollYProgress, [0.05, 0.45], [0.92, 1.04]);
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  // Trigger flower-drop animation when garland is in view
  const isInView = useInView(garlandRef, { once: true, margin: "-50px" });

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
          ref={garlandRef}
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

          {/* Falling Real Wedding Flowers that Drop & Stack on Garland */}
          {STACKED_FLOWERS.map((flower) => (
            <motion.div
              key={flower.id}
              style={{
                left: flower.left,
                width: flower.size,
                height: flower.size,
                position: "absolute",
                zIndex: 25,
                pointerEvents: "none",
              }}
              initial={{
                top: "-20%",
                opacity: 0,
                rotate: 0,
                x: 0,
              }}
              animate={
                isInView
                  ? {
                      top: ["-18%", flower.landingTop, flower.landingTop],
                      opacity: [0, 1, 1],
                      rotate: [0, flower.rotation, flower.rotation + 3, flower.rotation],
                      x: [0, flower.driftX, flower.driftX],
                      // Tiny bounce when landing
                      y: [0, 0, -4, 0],
                    }
                  : {
                      top: "-20%",
                      opacity: 0,
                      rotate: 0,
                      x: 0,
                    }
              }
              transition={{
                duration: flower.duration,
                delay: flower.delay,
                ease: [0.22, 1, 0.36, 1],
                y: {
                  delay: flower.delay + flower.duration * 0.75,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
            >
              <Image
                src={flower.src}
                alt={flower.label}
                fill
                unoptimized
                sizes={`${flower.size}px`}
                className="object-contain drop-shadow-sm"
                style={{ mixBlendMode: "multiply" }}
              />
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
