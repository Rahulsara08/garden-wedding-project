"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LotusDivider } from "../motifs/LotusDivider";
import { weddingConfig } from "@/config/weddingConfig";

export const NamasteCoupleGreeting: React.FC = () => {
  return (
    <section className="relative py-10 px-3 bg-ivory paper-texture overflow-hidden flex flex-col items-center justify-center select-none">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center">
        {/* Soft Decorative Top Divider */}
        <LotusDivider variant="simple" className="my-2 max-w-[140px]" />

        {/* Animated Couple Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto my-2"
        >
          {/* Central Golden Aura Radiance */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-x-8 top-12 bottom-4 rounded-full bg-radial from-gold/30 via-gold/10 to-transparent pointer-events-none z-0"
          />

          {/* Couple Image with Breathing & Sway Animation */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 0.5, 0, -0.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full aspect-[986/901] z-10 filter drop-shadow-[0_12px_28px_rgba(182,141,76,0.22)]"
          >
            <Image
              src="/assets/illustrations/namaste-couple.png"
              alt="Indian Wedding Couple Namaste Anjali Mudra Greeting"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

        {/* Caption & Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-2 text-center"
        >
          <h4 className="font-script text-2xl sm:text-3xl text-forest font-semibold text-embossed">
            Namaste &amp; Welcome
          </h4>
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-sans font-bold mt-1">
            With Open Hearts &amp; Warmest Blessings
          </p>
          <p className="font-serif italic text-xs text-sage/90 mt-1 max-w-[260px] mx-auto">
            {weddingConfig.couple.brideFirstName} &amp; {weddingConfig.couple.groomFirstName} await your presence in Vrindavan
          </p>
        </motion.div>

        {/* Bottom Lotus Divider */}
        <LotusDivider variant="simple" className="mt-3 my-2 max-w-[140px]" />
      </div>
    </section>
  );
};
