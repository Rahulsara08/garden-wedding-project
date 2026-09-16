"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Small delay before allowing interaction so it feels deliberate
    const readyTimer = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(readyTimer);
  }, []);

  const handleOpen = () => {
    if (!isReady || isOpening) return;
    setIsOpening(true);
    // Break seal and fade out after short delay
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-forest select-none"
      >
        {/* Background Watercolor Wrap */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/watercolor/desktop-ambient-wallpaper.jpg"
            alt="Envelope Background"
            className="w-full h-full object-cover opacity-30 blur-[4px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/90 via-forest/80 to-[#121813]" />
        </div>

        {/* Floating Envelope Flap / Card */}
        <motion.div
          animate={
            isOpening
              ? { scale: 1.15, opacity: 0, y: -60 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full px-6 py-12 cursor-pointer"
          onClick={handleOpen}
        >
          {/* Frosted Glass Envelope Backing */}
          <div className="absolute inset-0 bg-ivory/5 backdrop-blur-md rounded-[2rem] border border-gold/20 shadow-2xl overflow-hidden">
            {/* Top flap illusion */}
            <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-ivory/5 rounded-full border-b border-gold/10" />
          </div>

          <div className="relative z-20 flex flex-col items-center w-full">
            {/* Sanskrit Invocation */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-[9px] uppercase tracking-[0.3em] text-gold/80 font-serif mb-8 text-center"
            >
              {weddingConfig.couple.sanskritInvocation}
            </motion.p>

            {/* Tap-to-break Seal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              whileHover={isReady && !isOpening ? { scale: 1.05, rotate: 5 } : {}}
              whileTap={isReady && !isOpening ? { scale: 0.95 } : {}}
              transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
              <div className={isOpening ? "animate-ping opacity-0 transition-opacity duration-700" : ""}>
                <RadhaKrishnaSeal
                  size={150}
                  initials={weddingConfig.couple.coupleInitials}
                  animated={false}
                  showRays={true}
                />
              </div>
            </motion.div>

            {/* Formal Names */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60 font-sans mb-3">
                The Wedding Of
              </p>
              <h1
                className="text-3xl sm:text-4xl font-serif text-ivory tracking-wide mb-1 flex items-center justify-center flex-wrap gap-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span>{weddingConfig.couple.brideFirstName}</span>
                <span className="font-script italic text-gold font-normal text-4xl sm:text-5xl -mt-2">
                  &
                </span>
                <span>{weddingConfig.couple.groomFirstName}</span>
              </h1>
            </motion.div>

            {/* Interaction Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isReady && !isOpening ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="mt-12"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/80 font-sans border-b border-gold/30 pb-1 animate-pulse">
                Tap to break the seal
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
