"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

// Flower assets for falling petal animation
const FLOWER_SRCS = [
  "/assets/watercolor/rose-petal.jpg",
  "/assets/watercolor/marigold-flower.jpg",
  "/assets/watercolor/jasmine-flower.jpg",
];

// Generate dropping flower data
const DROPPING_FLOWERS = Array.from({ length: 16 }, (_, i) => {
  const posX = 10 + i * 5.3; // Spread evenly horizontally 10% to 90%
  const flowerSrc = FLOWER_SRCS[i % 3];
  const size = 18 + (i % 3) * 6; // Sizes 18px to 30px
  const delay = 0.2 + (i * 0.4) % 3.5;
  const duration = 4.0 + (i % 5) * 0.6; // Soft, graceful fall speed
  const rotation = -30 + ((i * 47) % 60);
  const driftX = ((i % 5) - 2) * 12; // Gentle horizontal oscillation

  return {
    id: i,
    posX,
    src: flowerSrc,
    size,
    delay,
    duration,
    rotation,
    driftX,
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

  // Parallax y transform for video and header element
  const videoY = useTransform(scrollYProgress, [0, 1], [-8, 12]);

  // Divider ornament fade in
  const dividerOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const dividerScale = useTransform(scrollYProgress, [0.3, 0.6], [0.85, 1]);

  // Trigger drop animation when in view
  const isInView = useInView(garlandRef, { once: false, margin: "-40px" });

  return (
    <div
      ref={bridgeRef}
      className="relative w-full py-8 sm:py-12 bg-ivory paper-texture flex flex-col items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft edge blend masks for smooth integration with background theme */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-ivory via-ivory/80 to-transparent z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-30 pointer-events-none" />

      {/* Main Bridge Container */}
      <motion.div
        style={{ y: videoY }}
        className="relative w-full max-w-[440px] sm:max-w-[520px] mx-auto px-3 z-10 flex flex-col items-center"
      >
        <div
          ref={garlandRef}
          className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-gold/15 bg-ivory/60 backdrop-blur-sm"
          style={{ aspectRatio: "1024 / 682" }}
        >
          {/* Traditional Indian Floral Video Background (4th Section Video) */}
          <video
            src="/assets/video/floral-garland.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 pointer-events-none z-0"
          />

          {/* Header Garland Overlay Image (z-20) - Flowers come from behind this */}
          <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 z-20 pointer-events-none">
            <Image
              src="/assets/watercolor/floral-garland-bridge.png"
              alt="Real flower garland header"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 440px, 520px"
              className="object-contain object-top drop-shadow-md"
            />
          </div>

          {/* Dropping Flowers Layer (z-10, coming from behind main header image and vanishing cleanly) */}
          {DROPPING_FLOWERS.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute pointer-events-none rounded-full overflow-hidden"
              style={{
                left: `${flower.posX}%`,
                width: flower.size,
                height: flower.size,
                zIndex: 10, // Behind top header image (z-20)
              }}
              initial={{
                top: "5%",
                opacity: 0,
                rotate: 0,
                x: 0,
              }}
              animate={
                isInView
                  ? {
                      top: ["5%", "40%", "85%", "100%"],
                      // Clean vanish: opacity fades to 0 before bottom edge
                      opacity: [0, 1, 0.85, 0],
                      rotate: [0, flower.rotation, flower.rotation * 1.5],
                      x: [0, flower.driftX, flower.driftX * -0.5, flower.driftX],
                    }
                  : {
                      top: "5%",
                      opacity: 0,
                      rotate: 0,
                      x: 0,
                    }
              }
              transition={{
                duration: flower.duration,
                delay: flower.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }}
            >
              {/* Flower motif with round border clipping & blend mode */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flower.src}
                alt="dropping flower"
                width={flower.size}
                height={flower.size}
                className="w-full h-full object-cover rounded-full mix-blend-multiply"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Centre ornamental divider */}
      <motion.div
        style={{ opacity: dividerOpacity, scale: dividerScale }}
        className="relative z-30 flex items-center justify-center gap-3 mt-4 px-4 max-w-[200px] mx-auto pointer-events-none"
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

