"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";
import { HeroFlock } from "../animations/HeroFlock";

export const HeroWelcome: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start start", "end start"],
  });

  // Smooth subtle parallax transformation
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative w-full flex flex-col items-center justify-start overflow-hidden bg-ivory paper-texture pt-0 pb-2 px-0 select-none"
    >
      {/* Main Container */}
      <motion.div
        style={{ y: templeY, scale: templeScale }}
        className="relative w-full mx-auto flex flex-col items-center px-0"
      >
        <div className="relative w-full aspect-[521/810] overflow-hidden">
          {/* Handcrafted Royal Invitation Header Card with Temple Ghat Artwork */}
          <Image
            src="/assets/watercolor/hero-header-card.png"
            alt="Riya and Aarav Wedding Invitation Header Art"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top"
          />

          {/* Animated Flying Birds Flock in the Sky */}
          <div className="absolute inset-0 pointer-events-none select-none z-10">
            <HeroFlock />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
