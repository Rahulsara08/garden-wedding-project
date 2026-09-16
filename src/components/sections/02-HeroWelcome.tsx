"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { PeacockFeather } from "../motifs/PeacockFeather";
import { useScrollContainer } from "@/context/ScrollContainerContext";

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
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative min-h-screen sm:min-h-full h-full w-full flex flex-col items-center justify-center overflow-hidden bg-ivory paper-texture pb-6 px-3"
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
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-ivory/40" />
        </div>
      </motion.div>



      {/* Layer 3: Delicate Watermark Peacock Feather on Top-Right */}
      <div className="absolute top-4 right-3 pointer-events-none select-none opacity-35 z-10">
        <PeacockFeather size={68} animated />
      </div>

      {/* Center Foreground Content (No Card Box - Merged with Background) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[340px] mx-auto px-4 pt-6 pb-6 my-auto"
      >
        {/* Top Eyebrow */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.24em] text-forest/80 font-sans font-semibold mb-1 select-none"
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
            className="text-2xl sm:text-3xl font-serif text-forest tracking-normal my-1 flex items-center justify-center flex-wrap"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span>{weddingConfig.couple.brideFirstName}</span>
            <span className="font-script italic text-gold font-normal px-2 text-2xl sm:text-3xl">
              &
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

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-semibold mt-1"
          >
            {weddingConfig.date.displayDate}
          </motion.p>

          {/* Venue */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[11px] text-sage/90 font-sans tracking-wide mt-0.5 max-w-[240px] mx-auto"
          >
            {weddingConfig.date.venue}, {weddingConfig.date.city}
          </motion.p>

          {/* Script Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-script text-lg sm:text-xl text-gold-dark mt-3 mb-2 max-w-[250px] mx-auto text-center leading-relaxed select-none"
          >
            &ldquo;{weddingConfig.couple.tagline}&rdquo;
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
