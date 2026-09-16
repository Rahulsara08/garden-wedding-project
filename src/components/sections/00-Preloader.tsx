"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";
import { CornerFlourish } from "../motifs/CornerFlourish";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(readyTimer);
  }, []);

  const handleOpen = () => {
    if (!isReady || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        onClick={handleOpen}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-ivory cursor-pointer select-none h-full w-full"
      >
        {/* Vrindavan Lotus Sanctuary Watercolor Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/watercolor/seal-cover-bg.jpg"
            alt="Vrindavan Lotus Sanctuary Watercolor"
            className="w-full h-full object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/60" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(250,243,228,0.35) 100%)" }} />
        </div>

        {/* Centered Content Card */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[340px] mx-auto px-3.5 py-2 my-auto">
          {/* Handcrafted Royal Card Container */}
          <div className="relative w-full bg-ivory/88 backdrop-blur-md border border-gold/40 shadow-2xl rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center overflow-hidden">
            {/* Corner Flourishes */}
            <CornerFlourish position="top-left" size={34} className="absolute top-1.5 left-1.5 text-gold/60 pointer-events-none" />
            <CornerFlourish position="top-right" size={34} className="absolute top-1.5 right-1.5 text-gold/60 pointer-events-none" />
            <CornerFlourish position="bottom-left" size={34} className="absolute bottom-1.5 left-1.5 text-gold/60 pointer-events-none" />
            <CornerFlourish position="bottom-right" size={34} className="absolute bottom-1.5 right-1.5 text-gold/60 pointer-events-none" />

            {/* Inner Antique Gold Rule Box */}
            <div className="w-full border border-gold/25 rounded-2xl p-3 flex flex-col items-center justify-center">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[10px] uppercase tracking-[0.24em] text-forest/80 font-sans font-semibold mb-2 select-none"
              >
                {weddingConfig.couple.sanskritInvocation}
              </motion.p>

              {/* Animated Seal */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.4, type: "spring", stiffness: 90 }}
                className="mb-2"
              >
                <RadhaKrishnaSeal
                  size={128}
                  initials={weddingConfig.couple.coupleInitials}
                  animated
                  showRays
                />
              </motion.div>

              {/* Couple Names */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="text-2xl sm:text-3xl font-serif text-forest tracking-normal mb-2 flex items-center justify-center flex-wrap"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span>{weddingConfig.couple.brideFirstName}</span>
                <span className="font-script italic text-gold font-normal px-2 text-2xl sm:text-3xl">
                  &
                </span>
                <span>{weddingConfig.couple.groomFirstName}</span>
              </motion.h1>

              {/* Gold Diamond Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center justify-center gap-2 my-1.5 w-full max-w-[150px]"
              >
                <div className="flex-1 h-px bg-gold/50" />
                <svg viewBox="0 0 28 14" className="w-6 h-3.5 text-gold fill-current shrink-0">
                  <polygon points="14,1 27,7 14,13 1,7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <polygon points="14,4 23,7 14,10 5,7" fill="currentColor" fillOpacity="0.25" />
                </svg>
                <div className="flex-1 h-px bg-gold/50" />
              </motion.div>

              {/* Date */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-sans font-semibold mt-0.5"
              >
                {weddingConfig.date.displayDate}
              </motion.p>

              {/* Venue */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-[10px] text-sage/90 font-sans tracking-wide mt-0.5"
              >
                {weddingConfig.date.venue}, {weddingConfig.date.city}
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="font-script text-lg sm:text-xl text-gold-dark mt-2.5 mb-1 max-w-[240px] mx-auto text-center leading-relaxed select-none"
              >
                &ldquo;{weddingConfig.couple.tagline}&rdquo;
              </motion.p>

              {/* Tap Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady && !isOpening ? 0.7 : 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-[9.5px] tracking-widest uppercase text-sage/80 font-sans animate-pulse"
              >
                Tap anywhere to enter
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
