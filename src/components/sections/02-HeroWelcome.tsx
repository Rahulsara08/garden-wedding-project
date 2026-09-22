"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
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

  // Smooth parallax transformations
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative w-full flex flex-col items-center justify-start overflow-hidden bg-ivory paper-texture pt-0 pb-2 px-0 select-none"
    >
      {/* Main Container - flush with top edge */}
      <motion.div
        style={{ y: templeY, scale: templeScale }}
        className="relative w-full max-w-[420px] mx-auto flex flex-col items-center"
      >
        <div className="relative w-full aspect-[521/830] overflow-hidden">
          {/* Pristine Handcrafted Vrindavan Temple Ghat Watercolor Artwork */}
          <Image
            src="/assets/watercolor/hero-header-bg-clean.png"
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

          {/* Live Crafted Typography Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-7 sm:pt-9 px-4 text-center pointer-events-none">
            {/* Eyebrow */}
            <p
              className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-[#4A5D47] font-bold mb-1.5 select-none"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {weddingConfig.invitation.eyebrow}
            </p>

            {/* Couple Names: Riya & Aarav in Cinzel Decorative & Great Vibes Calligraphy */}
            <h1 className="flex items-center justify-center gap-1.5 my-1 sm:my-1.5 select-none">
              <span
                className="text-2xl sm:text-3xl text-[#1F2921] font-semibold tracking-wide drop-shadow-xs"
                style={{ fontFamily: "var(--font-cinzel-deco), serif" }}
              >
                {weddingConfig.couple.brideFirstName}
              </span>
              <span
                className="text-3xl sm:text-4xl text-[#B68D4C] font-normal px-0.5 drop-shadow-xs"
                style={{ fontFamily: "var(--font-great-vibes), cursive" }}
              >
                &amp;
              </span>
              <span
                className="text-2xl sm:text-3xl text-[#1F2921] font-semibold tracking-wide drop-shadow-xs"
                style={{ fontFamily: "var(--font-cinzel-deco), serif" }}
              >
                {weddingConfig.couple.groomFirstName}
              </span>
            </h1>

            {/* Diamond Motif Ornament Line */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[170px] sm:max-w-[190px] select-none">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#B68D4C]/70 to-[#B68D4C]" />
              <div className="flex items-center gap-1 text-[#B68D4C]">
                <div className="w-1 h-1 rounded-full border border-[#B68D4C]" />
                <div className="w-2 h-2 rotate-45 border border-[#B68D4C] bg-[#FAF3E4]" />
                <div className="w-1 h-1 rounded-full border border-[#B68D4C]" />
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#B68D4C]/70 to-[#B68D4C]" />
            </div>

            {/* Date Badge / Date Line */}
            <p
              className="text-sm sm:text-base font-bold text-[#8A6729] tracking-[0.24em] uppercase my-0.5 select-none"
              style={{ fontFamily: "var(--font-cinzel-deco), serif" }}
            >
              {weddingConfig.date.displayDate}
            </p>

            {/* Venue */}
            <p
              className="text-xs sm:text-sm text-[#3F4F3D] tracking-wider font-medium mt-0.5 mb-2 select-none"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {weddingConfig.date.venue}, {weddingConfig.date.city}
            </p>

            {/* Tagline / Script Quote */}
            <p
              className="font-script italic text-base sm:text-lg text-[#8F6E36] max-w-[280px] leading-snug mt-1 select-none"
              style={{ fontFamily: "var(--font-great-vibes), cursive" }}
            >
              &ldquo;{weddingConfig.couple.tagline}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
