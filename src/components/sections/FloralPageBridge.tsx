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
 * Flowers stack gracefully at the top arc of the mala,
 * then fly outward from the left & right edges, cascading down and vanishing seamlessly.
 */
const FLOWER_PETALS = Array.from({ length: 26 }, (_, i) => {
  const isFlyOut = i % 2 === 1;
  const isLeft = i % 4 === 1;
  const flowerSrc = FLOWER_SRCS[i % 3];
  const size = 18 + (i % 3) * 6; // 18px, 24px, 30px

  if (!isFlyOut) {
    // STACKING FLOWERS: Land and rest gracefully along the top arc curve of the mala
    const posX = 20 + (i * 4.8) % 60; // 20% to 80% along top arc
    const normX = (posX - 50) / 30; // -1 to 1
    const landingTop = 26 + (1 - normX * normX) * 16; // 26% sides to 42% center arc pile
    const delay = 0.1 + (i % 6) * 0.35;
    const duration = 2.0 + (i % 4) * 0.4;
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
      driftX: ((i % 5) - 2) * 4,
    };
  } else {
    // FLY OUT FLOWERS: Stack at top arc then fly outward from left/right edges & cascade down
    const startX = 28 + (i % 5) * 11; // Starts near top mala arc
    const flyOutX = isLeft ? -25 - (i % 4) * 12 : 25 + (i % 4) * 12; // Flies outward past left/right edges
    const delay = 0.3 + (i % 6) * 0.45;
    const duration = 3.8 + (i % 4) * 0.5;
    const rotation = -45 + ((i * 43) % 90);

    return {
      id: i,
      type: "flyout" as const,
      posX: startX,
      landingTop: 100, // Cascades past bottom
      src: flowerSrc,
      size,
      delay,
      duration,
      rotation,
      flyOutX,
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
      className="relative w-full py-8 sm:py-10 bg-ivory paper-texture flex flex-col items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft edge blend masks */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-ivory via-ivory/90 to-transparent z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-ivory via-ivory/90 to-transparent z-30 pointer-events-none" />

      <motion.div
        style={{ y: parallaxY }}
        className="relative w-full max-w-[420px] sm:max-w-[480px] mx-auto px-3 z-10 flex flex-col items-center"
      >
        <div
          ref={malaRef}
          className="relative w-full flex flex-col items-center justify-center"
          style={{ aspectRatio: "1024 / 680" }}
        >
          {/* Left Corner Support Rope */}
          <svg
            className="absolute top-0 left-[6%] w-[24%] h-[38%] pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 Q 40 45, 100 100"
              fill="none"
              stroke="#B68D4C"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <circle cx="2" cy="2" r="4" fill="#8F6E36" />
          </svg>

          {/* Right Corner Support Rope */}
          <svg
            className="absolute top-0 right-[6%] w-[24%] h-[38%] pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 0 Q 60 45, 0 100"
              fill="none"
              stroke="#B68D4C"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <circle cx="98" cy="2" r="4" fill="#8F6E36" />
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

          {/* Pouring, Stacking & Edge Flying-out Flowers */}
          {FLOWER_PETALS.map((petal) => {
            if (petal.type === "stack") {
              // Flowers landing & stacking along the top arc curve of mala
              return (
                <motion.div
                  key={petal.id}
                  className="absolute pointer-events-none rounded-full overflow-hidden"
                  style={{
                    left: `${petal.posX}%`,
                    width: petal.size,
                    height: petal.size,
                    zIndex: 25, // Directly on top edge of mala arc
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
                          top: `${petal.landingTop}%`,
                          opacity: [0, 0.9, 1, 1],
                          rotate: petal.rotation,
                          x: petal.driftX,
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
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0.4, delay: petal.delay },
                    rotate: { duration: petal.duration, delay: petal.delay },
                    x: { duration: petal.duration, delay: petal.delay },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={petal.src}
                    alt="stacking flower"
                    width={petal.size}
                    height={petal.size}
                    className="w-full h-full object-cover rounded-full mix-blend-multiply"
                    style={{
                      filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.18))",
                    }}
                  />
                </motion.div>
              );
            } else {
              // Flowers stacking at top arc then flying out from left/right edges
              return (
                <motion.div
                  key={petal.id}
                  className="absolute pointer-events-none rounded-full overflow-hidden"
                  style={{
                    left: `${petal.posX}%`,
                    width: petal.size,
                    height: petal.size,
                    zIndex: 15,
                  }}
                  initial={{
                    top: "-12%",
                    opacity: 0,
                    rotate: 0,
                    x: 0,
                  }}
                  animate={
                    isInView
                      ? {
                          top: ["-12%", "28%", "68%", "100%"],
                          opacity: [0, 1, 0.9, 0], // Smooth fade out
                          rotate: [0, petal.rotation, petal.rotation * 1.8],
                          x: [0, petal.flyOutX * 0.4, petal.flyOutX, petal.flyOutX * 1.3],
                        }
                      : {
                          top: "-12%",
                          opacity: 0,
                          rotate: 0,
                          x: 0,
                        }
                  }
                  transition={{
                    duration: petal.duration,
                    delay: petal.delay,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={petal.src}
                    alt="flying out flower"
                    width={petal.size}
                    height={petal.size}
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



