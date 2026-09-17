"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

// Real wedding flower textures
const FLOWER_SRCS = [
  "/assets/watercolor/rose-petal.jpg",
  "/assets/watercolor/marigold-flower.jpg",
  "/assets/watercolor/jasmine-flower.jpg",
];

/**
 * Mala Flower Physics:
 * 1. Stacking Flowers: Gather and accumulate strictly along the top arc curve of the mala.
 * 2. Corner Cascade Flowers: Spill over the left & right corners and fall downwards until reaching the Countdown heading, then vanish smoothly.
 */
const MALA_FLOWERS = Array.from({ length: 30 }, (_, i) => {
  const isCascade = i % 2 === 1;
  const isLeft = i % 4 === 1;
  const flowerSrc = FLOWER_SRCS[i % 3];
  const size = 18 + (i % 3) * 6; // 18px, 24px, 30px

  if (!isCascade) {
    // ACCUMULATE / STACK: Gather strictly on the top curve arc of the mala (posX 18% to 82%)
    const posX = 18 + (i * 4.5) % 64; // 18% to 82%
    const normX = (posX - 50) / 32; // -1 to 1
    // Mala top arc curve: 26% at corners, 42% at center arc
    const landingTop = 26 + (1 - normX * normX) * 16;
    const delay = 0.1 + (i % 7) * 0.3;
    const duration = 1.8 + (i % 4) * 0.4;
    const rotation = -35 + ((i * 37) % 70);

    return {
      id: i,
      type: "stack" as const,
      posX,
      landingTop,
      src: flowerSrc,
      size,
      delay,
      duration,
      rotation,
      driftX: ((i % 5) - 2) * 3,
    };
  } else {
    // CORNER CASCADE: Fall down from left & right corners extending all the way down to the Countdown section heading
    const posX = isLeft ? 5 + (i % 3) * 5 : 85 + (i % 3) * 5; // Left or Right outer corners
    const delay = 0.3 + (i % 6) * 0.4;
    const duration = 3.6 + (i % 4) * 0.5;
    const rotation = -45 + ((i * 41) % 90);
    const driftX = isLeft ? -10 - (i % 3) * 4 : 10 + (i % 3) * 4;

    return {
      id: i,
      type: "cascade" as const,
      posX,
      landingTop: 120, // Falls past the mala down towards the Countdown heading
      src: flowerSrc,
      size,
      delay,
      duration,
      rotation,
      driftX,
    };
  }
});

export const FloralPageBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const malaRef = useRef<HTMLDivElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-6, 10]);
  const dividerOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const isInView = useInView(malaRef, { once: false, margin: "-40px" });

  return (
    <section
      ref={bridgeRef}
      className="relative w-full py-6 sm:py-8 bg-ivory paper-texture flex flex-col items-center justify-center overflow-visible my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft edge blend masks */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-ivory via-ivory/90 to-transparent z-30 pointer-events-none" />

      <motion.div
        style={{ y: parallaxY }}
        className="relative w-full max-w-[420px] sm:max-w-[480px] mx-auto px-3 z-10 flex flex-col items-center"
      >
        <div
          ref={malaRef}
          className="relative w-full flex flex-col items-center justify-center"
          style={{ aspectRatio: "1024 / 680" }}
        >
          {/* Left Corner Support Rope - Tied directly to the border frame */}
          <svg
            className="absolute top-0 left-0 w-[28%] h-[42%] pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 L 100 100"
              fill="none"
              stroke="#B68D4C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="7 4"
            />
            <circle cx="2" cy="2" r="5" fill="#8F6E36" />
            <circle cx="98" cy="98" r="4.5" fill="#B68D4C" />
          </svg>

          {/* Right Corner Support Rope - Tied directly to the border frame */}
          <svg
            className="absolute top-0 right-0 w-[28%] h-[42%] pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 0 L 0 100"
              fill="none"
              stroke="#B68D4C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="7 4"
            />
            <circle cx="98" cy="2" r="5" fill="#8F6E36" />
            <circle cx="2" cy="98" r="4.5" fill="#B68D4C" />
          </svg>

          {/* Main Single Traditional Indian Flower Mala Image (Toran) */}
          <div className="relative w-full h-full z-20 pointer-events-none">
            <Image
              src="/assets/watercolor/floral-garland-bridge.png"
              alt="Traditional Indian Floral Garland Mala"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 420px, 480px"
              className="object-contain object-top drop-shadow-md"
            />
          </div>

          {/* Flowers Accumulating at Top Arc & Cascading down from Corners to Countdown Heading */}
          {MALA_FLOWERS.map((flower) => {
            if (flower.type === "stack") {
              // Gather & accumulate strictly along the top arc curve of mala
              return (
                <motion.div
                  key={flower.id}
                  className="absolute pointer-events-none rounded-full overflow-hidden"
                  style={{
                    left: `${flower.posX}%`,
                    width: flower.size,
                    height: flower.size,
                    zIndex: 25, // Rests on top edge of mala arc
                  }}
                  initial={{
                    top: "-15%",
                    opacity: 0,
                    rotate: 0,
                    x: 0,
                  }}
                  animate={
                    isInView
                      ? {
                          top: `${flower.landingTop}%`,
                          opacity: [0, 0.9, 1, 1],
                          rotate: flower.rotation,
                          x: flower.driftX,
                        }
                      : {
                          top: "-15%",
                          opacity: 0,
                          rotate: 0,
                          x: 0,
                        }
                  }
                  transition={{
                    top: {
                      duration: flower.duration,
                      delay: flower.delay,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0.4, delay: flower.delay },
                    rotate: { duration: flower.duration, delay: flower.delay },
                    x: { duration: flower.duration, delay: flower.delay },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.src}
                    alt="top arc flower"
                    width={flower.size}
                    height={flower.size}
                    className="w-full h-full object-cover rounded-full mix-blend-multiply"
                    style={{
                      filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.18))",
                    }}
                  />
                </motion.div>
              );
            } else {
              // Flowers falling down from corners extending all the way to the Countdown heading
              return (
                <motion.div
                  key={flower.id}
                  className="absolute pointer-events-none rounded-full overflow-hidden"
                  style={{
                    left: `${flower.posX}%`,
                    width: flower.size,
                    height: flower.size,
                    zIndex: 35, // Overlays above border to fall smoothly towards countdown heading
                  }}
                  initial={{
                    top: "-10%",
                    opacity: 0,
                    rotate: 0,
                    x: 0,
                  }}
                  animate={
                    isInView
                      ? {
                          top: ["-10%", "30%", "75%", "120%"],
                          opacity: [0, 1, 0.9, 0], // Smoothly vanishes as it reaches Countdown heading
                          rotate: [0, flower.rotation, flower.rotation * 1.8],
                          x: [0, flower.driftX * 0.4, flower.driftX, flower.driftX * 1.3],
                        }
                      : {
                          top: "-10%",
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.src}
                    alt="corner falling flower"
                    width={flower.size}
                    height={flower.size}
                    className="w-full h-full object-cover rounded-full mix-blend-multiply"
                    style={{
                      filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.15))",
                    }}
                  />
                </motion.div>
              );
            }
          })}
        </div>
      </motion.div>

      {/* Subtle ornamental divider */}
      <motion.div
        style={{ opacity: dividerOpacity }}
        className="relative z-30 flex items-center justify-center gap-3 mt-2 px-4 max-w-[160px] mx-auto pointer-events-none"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
        <svg viewBox="0 0 28 14" className="w-4 h-2.5 shrink-0 fill-current text-gold">
          <polygon points="14,1 27,7 14,13 1,7" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
      </motion.div>
    </section>
  );
};





