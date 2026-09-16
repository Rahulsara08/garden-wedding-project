"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

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
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory cursor-pointer select-none"
      >
        {/* Temple Ghat Watercolor Background — same as HeroWelcome */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/watercolor/temple-ghat.jpg"
            alt="Temple Watercolor"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/50 via-transparent to-ivory/75" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(250,243,228,0.4) 100%)" }} />
        </div>

        {/* Centered Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[340px] mx-auto px-4">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.24em] text-forest/80 font-sans font-semibold mb-3 select-none"
          >
            {weddingConfig.invitation.eyebrow}
          </motion.p>

          {/* Couple Names */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-3xl sm:text-4xl font-serif text-forest tracking-normal mb-3 flex items-center justify-center flex-wrap"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span>{weddingConfig.couple.brideFirstName}</span>
            <span className="font-script italic text-gold font-normal px-2 text-3xl sm:text-4xl">
              &
            </span>
            <span>{weddingConfig.couple.groomFirstName}</span>
          </motion.h1>

          {/* Gold Diamond Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 my-2 w-full max-w-[160px]"
          >
            <div className="flex-1 h-px bg-gold/50" />
            <svg viewBox="0 0 28 14" className="w-7 h-4 text-gold fill-current shrink-0">
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
            className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-semibold mt-1"
          >
            {weddingConfig.date.displayDate}
          </motion.p>

          {/* Venue */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[11px] text-sage/90 font-sans tracking-wide mt-0.5"
          >
            {weddingConfig.date.venue}, {weddingConfig.date.city}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="font-script text-xl sm:text-2xl text-gold-dark mt-4 mb-2 max-w-[250px] mx-auto text-center leading-relaxed select-none"
          >
            &ldquo;{weddingConfig.couple.tagline}&rdquo;
          </motion.p>

          {/* Tap Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady && !isOpening ? 0.7 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-[10px] tracking-widest uppercase text-sage/70 font-sans animate-pulse"
          >
            Tap anywhere to enter
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
