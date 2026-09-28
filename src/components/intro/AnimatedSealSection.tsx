"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedSealSectionProps {
  onSealComplete: () => void;
  className?: string;
}

export const AnimatedSealSection: React.FC<AnimatedSealSectionProps> = ({
  onSealComplete,
  className = "",
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Prevent accidental skip from clicks during video transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCardTap = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!isReady || isTapped) return;
    setIsTapped(true);

    // Smooth transition into celebration
    setTimeout(() => {
      onSealComplete();
    }, 600);
  };

  const elegantEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      onClick={handleCardTap}
      role="button"
      tabIndex={0}
      aria-label="Tap card to open wedding celebration"
      className={`relative w-full h-full flex items-center justify-center p-3 sm:p-6 overflow-hidden cursor-pointer select-none bg-[#FAF3E4] paper-texture ${className}`}
    >
      {/* Background Soft Golden Ambient Radiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />

      {/* 1. ROYAL INVITATION CARD (Easy, Small & Smooth Animation) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={
          isTapped
            ? {
                scale: 1.025,
                opacity: 0,
                filter: "blur(4px)",
                transition: { duration: 0.55, ease: elegantEase },
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.75,
                  ease: elegantEase, // Easy, small, and smooth
                },
              }
        }
        className="relative w-[82vw] max-w-[315px] sm:max-w-[335px] max-h-[580px] sm:max-h-[610px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-[#FAF3E4] border-2 border-[#D4AF37]/75 shadow-[0_22px_60px_rgba(44,56,38,0.22),0_6px_20px_rgba(212,175,55,0.14)] flex flex-col items-center justify-between text-center overflow-hidden"
      >
        {/* Inset Golden Border Line */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-[#D4AF37]/45 pointer-events-none" />

        {/* Ornate Gold Filigree Corner Motifs */}
        <svg className="absolute top-2.5 left-2.5 w-5 h-5 text-[#C49A45] opacity-80 pointer-events-none" viewBox="0 0 40 40">
          <path d="M0,0 L16,0 C8,0 0,8 0,16 Z M0,0 L0,24 C0,12 12,0 24,0 L40,0 L40,4 L4,4 L4,40 L0,40 Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-2.5 right-2.5 w-5 h-5 text-[#C49A45] opacity-80 pointer-events-none transform rotate-90" viewBox="0 0 40 40">
          <path d="M0,0 L16,0 C8,0 0,8 0,16 Z M0,0 L0,24 C0,12 12,0 24,0 L40,0 L40,4 L4,4 L4,40 L0,40 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-2.5 left-2.5 w-5 h-5 text-[#C49A45] opacity-80 pointer-events-none transform -rotate-90" viewBox="0 0 40 40">
          <path d="M0,0 L16,0 C8,0 0,8 0,16 Z M0,0 L0,24 C0,12 12,0 24,0 L40,0 L40,4 L4,4 L4,40 L0,40 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-2.5 right-2.5 w-5 h-5 text-[#C49A45] opacity-80 pointer-events-none transform rotate-180" viewBox="0 0 40 40">
          <path d="M0,0 L16,0 C8,0 0,8 0,16 Z M0,0 L0,24 C0,12 12,0 24,0 L40,0 L40,4 L4,4 L4,40 L0,40 Z" fill="currentColor" />
        </svg>

        {/* TOP SECTION: DEAR GUEST & INVITATION MESSAGE */}
        <div className="pt-0.5 z-10 flex flex-col items-center gap-0.5 max-w-[260px]">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-sans font-bold text-[#B68D4C]">
            DEAR GUEST
          </p>
          <p className="font-serif italic text-forest/90 text-[11px] sm:text-xs leading-snug my-0.5">
            &ldquo;With joyous hearts, we warmly invite you to step into our wedding celebration.&rdquo;
          </p>
          <p className="font-serif font-semibold text-[#C49A45] text-[10.5px] tracking-wider">
            ॥ श्री राधे कृष्ण ॥
          </p>
        </div>

        {/* CENTER SECTION: 3D REALISTIC GOLDEN WAX SEAL MEDALLION (Steady & Serene) */}
        <div className="relative z-20 my-auto flex items-center justify-center">
          {/* Gentle, Slow Ambient Golden Sunburst Halo */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none opacity-60"
            viewBox="0 0 120 120"
          >
            <circle cx="60" cy="60" r="56" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 5" />
            <circle cx="60" cy="60" r="51" fill="none" stroke="#B68D4C" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.65" />
          </motion.svg>

          {/* 3D Golden Wax Seal Body (Steady, No scale oscillation) */}
          <div
            className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-[#FFE08A] via-[#C49A45] to-[#8C621E] shadow-[0_10px_26px_rgba(196,154,69,0.45),inset_0_2px_10px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center border-2 border-[#FFF0AA] p-1.5"
          >
            {/* Scalloped Wax Border Detail */}
            <div className="absolute inset-1 rounded-full border border-[#8C621E]/30 pointer-events-none" />

            {/* Top Curving Devanagari Script */}
            <span className="text-[7.5px] sm:text-[8px] font-serif text-[#FAF3E4] tracking-widest font-semibold opacity-90 -mt-0.5">
              ॥ श्री राधे कृष्ण ॥
            </span>

            {/* Monogram R & A in Golden Center */}
            <div className="my-0.5 flex flex-col items-center justify-center">
              <span className="font-serif font-bold text-base sm:text-lg text-[#FAF3E4] tracking-wider text-embossed leading-none drop-shadow-xs">
                R & A
              </span>
              <span className="w-5 h-[1px] bg-[#FAF3E4]/60 my-0.5" />
            </div>

            {/* Bottom Curving Location Text */}
            <span className="text-[6.5px] sm:text-[7.5px] font-sans uppercase text-[#FAF3E4] tracking-[0.2em] font-medium opacity-90">
              VRINDAVAN · 2027
            </span>
          </div>

          {/* User Tap Golden Light Bloom */}
          <AnimatePresence>
            {isTapped && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 1, 0.85, 0],
                  scale: [0.2, 2.2, 3.5, 4.8],
                }}
                transition={{ duration: 0.95, ease: elegantEase }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 w-80 h-80 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 245, 210, 1) 0%, rgba(223, 195, 134, 0.95) 35%, rgba(182, 141, 76, 0.5) 60%, transparent 78%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM SECTION: COUPLE NAMES, DATE & TAP PROMPT */}
        <div className="pb-0.5 z-10 flex flex-col items-center gap-1 w-full">
          {/* Couple Names */}
          <h1
            className="text-xl sm:text-2xl font-serif text-forest font-bold tracking-tight text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Riya <span className="font-script text-gold font-normal">&amp;</span> Aarav
          </h1>

          {/* Diamond Motif Divider */}
          <div className="flex items-center justify-center gap-2 text-[#C49A45] my-0.5">
            <span className="h-[1px] w-6 bg-[#C49A45]/40" />
            <span className="text-[6.5px] transform rotate-45 inline-block">◆</span>
            <span className="h-[1px] w-6 bg-[#C49A45]/40" />
          </div>

          {/* Date & Location */}
          <p className="text-[10px] sm:text-[10.5px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B68D4C]">
            12 FEBRUARY 2027
          </p>
          <p className="text-[9.5px] sm:text-[10px] font-sans text-forest/75">
            Shri Vrindavan Gardens, Vrindavan
          </p>

          {/* Romantic Tagline */}
          <p className="font-script text-xs sm:text-[13px] text-gold-dark mt-0.5">
            &ldquo;Two souls, one journey — under the peacock sky.&rdquo;
          </p>

          {/* TAP TO OPEN BUTTON (Steady, peaceful, no jitter/ping) */}
          <div
            className="mt-1.5 px-4 py-1.5 rounded-full bg-[#1A120B]/85 backdrop-blur-md border border-[#D4AF37]/75 shadow-md flex items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] font-sans font-bold text-[#FAF3E4]">
              {isTapped ? "Opening Celebration..." : "Tap Card to Open"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

