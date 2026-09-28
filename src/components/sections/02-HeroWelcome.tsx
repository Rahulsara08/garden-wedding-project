"use client";

import React, { useRef } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
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

  // Smooth subtle parallax transformation on scroll
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative w-full min-h-[794px] sm:min-h-[824px] md:min-h-[844px] max-md:min-h-[100dvh] h-full flex flex-col justify-between items-center overflow-hidden bg-[#FAF3E4] paper-texture select-none"
    >
      {/* 1. Full-Bleed Handcrafted Temple Ghat Watercolor Artwork */}
      <motion.div
        style={{ y: templeY, scale: templeScale }}
        className="absolute inset-0 pointer-events-none select-none z-0"
      >
        <OptimizedImage
          src="/assets/watercolor/hero-header-bg-clean.jpg"
          alt="Riya and Aarav Wedding Celebration Header Art"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover object-center"
        />

        {/* Soft top and bottom dissolves into the theme ivory paper texture */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/60 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF3E4] via-[#FAF3E4]/70 to-transparent pointer-events-none z-1" />
      </motion.div>

      {/* 2. Animated Flying Birds Flock in the Sky */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        <HeroFlock />
      </div>

      {/* 3. Top Spacer / Dynamic Island Clearance */}
      <div className="w-full h-12 sm:h-14 flex-shrink-0 z-20 pointer-events-none" />

      {/* ======================================================== */}
      {/* 4. OPTICALLY CENTERED ROYAL TYPOGRAPHY (Bold, Cursive & Visible) */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center px-4 py-2 text-center pointer-events-none select-none">
        {/* Soft radiant ambient glow behind text to ensure 100% legibility */}
        <div
          className="absolute inset-x-3 top-1/2 -translate-y-1/2 h-[72%] max-h-[380px] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(250, 243, 228, 0.76) 0%, rgba(250, 243, 228, 0.45) 55%, transparent 80%)",
          }}
        />

        {/* Eyebrow: TOGETHER WITH THEIR FAMILIES */}
        <p
          className="text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-bold text-[#1C2C1E] mb-2"
          style={{
            fontFamily: "var(--font-cormorant), var(--font-playfair), serif",
            textShadow:
              "0 1px 2px rgba(255, 255, 255, 0.98), 0 0 12px rgba(250, 243, 228, 0.95)",
          }}
        >
          {weddingConfig.invitation.eyebrow}
        </p>

        {/* Couple Names: Bold Royal Serif & Flowing Cursive Ampersand */}
        <h1
          className="flex items-center justify-center gap-1.5 sm:gap-2.5 my-0.5 select-none"
          style={{
            filter: "drop-shadow(0 1px 3px rgba(255,255,255,0.9))",
          }}
        >
          <span
            className="text-[36px] sm:text-[44px] text-[#121F14] font-bold tracking-tight text-embossed leading-none"
            style={{
              fontFamily: "var(--font-playfair), serif",
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(18, 31, 20, 0.28)",
            }}
          >
            {weddingConfig.couple.brideFirstName}
          </span>
          <span
            className="text-[48px] sm:text-[58px] text-[#C29640] font-normal px-0.5 drop-shadow-sm -translate-y-1 sm:-translate-y-2 inline-block"
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(194, 150, 64, 0.45)",
            }}
          >
            &amp;
          </span>
          <span
            className="text-[36px] sm:text-[44px] text-[#121F14] font-bold tracking-tight text-embossed leading-none"
            style={{
              fontFamily: "var(--font-playfair), serif",
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(18, 31, 20, 0.28)",
            }}
          >
            {weddingConfig.couple.groomFirstName}
          </span>
        </h1>

        {/* Gold Diamond Ornament Divider */}
        <div className="flex items-center justify-center gap-2 my-2.5 w-full max-w-[200px] sm:max-w-[230px]">
          <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C29640]/75 to-[#C29640]" />
          <div className="flex items-center gap-1.5 text-[#C29640]">
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C29640] bg-[#C29640]/30 shadow-2xs" />
            <div className="w-2.5 h-2.5 rotate-45 border-2 border-[#C29640] bg-[#FAF3E4] shadow-xs flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#C29640]" />
            </div>
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C29640] bg-[#C29640]/30 shadow-2xs" />
          </div>
          <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C29640]/75 to-[#C29640]" />
        </div>

        {/* Date Line: Bold, Rich Antique Gold */}
        <p
          className="text-[13px] sm:text-[14.5px] font-bold uppercase tracking-[0.28em] text-[#9E7428] my-0.5"
          style={{
            fontFamily: "var(--font-playfair), var(--font-cormorant), serif",
            textShadow:
              "0 1px 2px rgba(255, 255, 255, 0.98), 0 1px 8px rgba(158, 116, 40, 0.3)",
          }}
        >
          {weddingConfig.date.displayDate}
        </p>

        {/* Venue Location: Deep Regal Green */}
        <p
          className="text-[12.5px] sm:text-[14px] font-semibold tracking-wide text-[#223122] mt-0.5 mb-3"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            textShadow:
              "0 1px 2px rgba(255, 255, 255, 0.98), 0 1px 4px rgba(34, 49, 34, 0.2)",
          }}
        >
          {weddingConfig.date.venue}, {weddingConfig.date.city}
        </p>

        {/* Romantic Tagline: Flowing, Slanted, Ultra-Cursive Calligraphy */}
        <div className="mt-1 max-w-[320px] sm:max-w-[350px] px-2">
          <p
            className="text-[23px] sm:text-[27px] text-[#6F4B18] font-normal leading-[1.3] select-none"
            style={{
              fontFamily: "'Pinyon Script', var(--font-great-vibes), cursive",
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.98), 0 2px 8px rgba(111, 75, 24, 0.28)",
            }}
          >
            &ldquo;Two souls, one journey &mdash;
            <br />
            <span className="block mt-0.5">under the peacock sky.&rdquo;</span>
          </p>
        </div>
      </div>

      {/* 5. Bottom Cue: Subtle Scroll Cue */}
      <div className="relative z-20 w-full flex-shrink-0 flex flex-col items-center pb-3 pt-1">
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 mb-1 pointer-events-none select-none"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#8F6E36]/80 font-medium">
            Scroll to Explore
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#C29640]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

