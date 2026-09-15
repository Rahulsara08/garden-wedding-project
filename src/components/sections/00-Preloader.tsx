"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Enable skip after 800ms
    const skipTimer = setTimeout(() => setCanSkip(true), 800);
    // Auto-advance after 2.4s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onClick={() => canSkip && onComplete()}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory cursor-pointer select-none overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#b68d4c10 1px, #FAF3E4 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Sanskrit invocation */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.25em] text-forest/70 font-serif mb-6"
        >
          {weddingConfig.couple.sanskritInvocation}
        </motion.p>

        {/* Animated Seal */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <RadhaKrishnaSeal
            size={160}
            initials={weddingConfig.couple.coupleInitials}
            animated
          />
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-2xl sm:text-3xl font-serif text-forest tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.couple.coupleNames}
        </motion.h1>

        {/* Date and City */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-2 text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium"
        >
          {weddingConfig.date.displayDate} · {weddingConfig.date.city}
        </motion.p>

        {/* Subtle tap to enter hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canSkip ? 0.7 : 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 text-[10px] tracking-widest uppercase text-sage/70 font-sans"
        >
          Tap anywhere to unfold
        </motion.div>
      </div>
    </motion.div>
  );
};
