"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CornerFlourish } from "../motifs/CornerFlourish";
import { LotusDivider } from "../motifs/LotusDivider";

export const PhotoFrameGap: React.FC = () => {
  return (
    <section className="relative py-10 px-3 bg-ivory paper-texture overflow-hidden flex flex-col items-center justify-center">
      {/* Curved Animated Flow Line at top of section */}
      <div className="w-full flex justify-center max-w-xs mx-auto mb-4">
        <LotusDivider variant="simple" />
      </div>

      {/* Handcrafted Romantic Couple Portrait Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto p-3 sm:p-4 bg-ivory/95 backdrop-blur-sm border border-gold/40 shadow-xl rounded-3xl"
      >
        {/* Corner Flourishes */}
        <CornerFlourish
          position="top-left"
          size={36}
          className="absolute top-2 left-2 text-gold/60 pointer-events-none z-10"
        />
        <CornerFlourish
          position="top-right"
          size={36}
          className="absolute top-2 right-2 text-gold/60 pointer-events-none z-10"
        />
        <CornerFlourish
          position="bottom-left"
          size={36}
          className="absolute bottom-2 left-2 text-gold/60 pointer-events-none z-10"
        />
        <CornerFlourish
          position="bottom-right"
          size={36}
          className="absolute bottom-2 right-2 text-gold/60 pointer-events-none z-10"
        />

        {/* Inner Frame Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-gold/30 shadow-inner">
          <Image
            src="/assets/watercolor/temple-ghat.jpg"
            alt="Romantic Couple Moments of Wonder"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center filter contrast-[1.03] saturate-[1.05]"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-ivory/30 pointer-events-none" />

          {/* Center Quote Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-center z-10 bg-ivory/85 backdrop-blur-md py-2.5 px-3 rounded-xl border border-gold/30">
            <p className="font-script text-base sm:text-lg text-gold-dark select-none">
              &ldquo;Moments of Wonder &amp; Eternal Joy&rdquo;
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-forest/80 font-sans font-semibold mt-0.5">
              Riya &amp; Aarav
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Flow Line */}
      <div className="w-full flex justify-center max-w-xs mx-auto mt-4">
        <LotusDivider variant="simple" />
      </div>
    </section>
  );
};
