"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
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

  // Independent multi-layer parallax transformations
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const birdsY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative min-h-screen sm:min-h-full h-full w-full flex flex-col items-center justify-center overflow-hidden bg-ivory paper-texture pt-12 pb-6 px-3"
    >
      {/* Background Layer 1: Vrindavan Temple Ghat Watercolor */}
      <motion.div
        style={{ y: templeY, scale: templeScale }}
        className="absolute inset-0 pointer-events-none select-none opacity-90 z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/watercolor/temple-ghat.jpg"
            alt="Vrindavan Temple Ghat Watercolor"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-center"
          />
          {/* Gentle edge blend to merge watercolor naturally into warm ivory paper */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/50 via-transparent to-ivory/75" />
        </div>
      </motion.div>

      {/* Background Layer 1.5: Flying Birds Flock (Loose Diagonal V, Morphing Wings, Drifting Across Top Sky) */}
      <motion.div
        style={{ y: birdsY }}
        className="absolute inset-0 pointer-events-none select-none z-10"
      >
        <HeroFlock />
      </motion.div>

      {/* Bottom Soft Gradient Mask for Seamless Integration (No Sharp Blur Lines) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory via-ivory/70 to-transparent pointer-events-none z-15" />

      {/* Center Foreground Content (No Card Box - Merged with Background) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[340px] mx-auto px-4 pt-12 pb-6 my-auto"
      >
        {/* Top Eyebrow */}
        <div className="pt-3">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.25em] text-forest font-sans font-bold mb-1 select-none drop-shadow-2xs"
          >
            {weddingConfig.invitation.eyebrow}
          </motion.p>
        </div>

        {/* Center: Names, Divider, Date, Venue */}
        <div className="my-auto py-1 flex flex-col items-center w-full">
          {/* Couple Names */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest font-semibold tracking-normal my-1 flex items-center justify-center flex-wrap text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span>{weddingConfig.couple.brideFirstName}</span>
            <span className="font-script italic text-gold-dark font-semibold px-2 text-2xl sm:text-3xl">
              &amp;
            </span>
            <span>{weddingConfig.couple.groomFirstName}</span>
          </motion.h1>

          {/* Antique Gold Knot Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center max-w-[150px] mx-auto my-1"
          >
            <LotusDivider variant="diamond" className="my-1" />
          </motion.div>

          {/* Date - Bright, Bold & Easy to See */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.22em] text-gold-dark font-sans font-bold mt-1 text-embossed-gold"
          >
            {weddingConfig.date.displayDate}
          </motion.p>

          {/* Venue - Crisp & Easy to Read */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs text-forest font-sans font-medium tracking-wide mt-1 max-w-[250px] mx-auto"
          >
            {weddingConfig.date.venue}, {weddingConfig.date.city}
          </motion.p>

          {/* Script Tagline - Vibrant & Distinct */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-script text-xl sm:text-2xl text-forest-deep font-medium mt-3 mb-2 max-w-[260px] mx-auto text-center leading-relaxed select-none drop-shadow-2xs"
          >
            &ldquo;{weddingConfig.couple.tagline}&rdquo;
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
