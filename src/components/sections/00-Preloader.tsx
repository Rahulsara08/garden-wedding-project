"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";
import { CornerFlourish } from "../motifs/CornerFlourish";

interface PreloaderProps {
  onComplete: () => void;
}

// Floating golden particles for the reveal shimmer
const SHIMMER_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: (Math.random() - 0.5) * 300,
  y: (Math.random() - 0.5) * 400,
  scale: 0.3 + Math.random() * 0.8,
  delay: Math.random() * 0.5,
  duration: 1.2 + Math.random() * 0.6,
}));

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
    }, 1800);
  };

  // Premium easing curves
  const elegantEase = [0.22, 0.68, 0.36, 1] as const;
  const smoothEase = [0.4, 0, 0.2, 1] as const;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: smoothEase } }}
        onClick={handleOpen}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ivory cursor-pointer select-none w-full h-full"
      >
        {/* Vrindavan Lotus Sanctuary Watercolor Background */}
        <motion.div
          animate={
            isOpening
              ? { scale: 1.15, opacity: 0, filter: "blur(12px)" }
              : { scale: 1, opacity: 0.95, filter: "blur(0px)" }
          }
          transition={{ duration: 1.6, ease: elegantEase }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src="/assets/watercolor/seal-cover-bg.jpg"
            alt="Vrindavan Lotus Sanctuary Watercolor"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(250,243,228,0.35) 100%)",
            }}
          />
        </motion.div>

        {/* ============================================ */}
        {/* REVEAL EFFECT: Golden Light Rays + Shimmer   */}
        {/* ============================================ */}
        {isOpening && (
          <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center">
            {/* Central golden radiance bloom */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: [0, 0.7, 0.5, 0] }}
              transition={{ duration: 1.6, ease: elegantEase }}
              className="absolute w-40 h-40 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(182,141,76,0.5) 0%, rgba(182,141,76,0.15) 40%, transparent 70%)",
              }}
            />

            {/* Dual expanding gold rings */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 1.4, ease: elegantEase, delay: 0.1 }}
              className="absolute w-32 h-32 rounded-full border border-gold/60"
            />
            <motion.div
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 1.5, ease: elegantEase, delay: 0.2 }}
              className="absolute w-24 h-24 rounded-full border border-gold/40"
            />

            {/* Shimmer particles floating outward */}
            {SHIMMER_PARTICLES.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [0, 0.9, 0],
                  scale: [0, p.scale, 0],
                }}
                transition={{
                  duration: p.duration,
                  ease: elegantEase,
                  delay: 0.15 + p.delay,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gold/80 pointer-events-none"
              />
            ))}
          </div>
        )}

        {/* ============================== */}
        {/* SEAL CARD — SPLIT DOOR REVEAL  */}
        {/* ============================== */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[300px] sm:max-w-[340px] mx-auto px-3 py-2 my-auto">
          {/* LEFT HALF of the split card */}
          <motion.div
            animate={
              isOpening
                ? {
                    x: "-110%",
                    rotateY: -45,
                    opacity: 0,
                    filter: "blur(4px)",
                  }
                : { x: 0, rotateY: 0, opacity: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: 1.4,
              ease: elegantEase,
              delay: 0.1,
            }}
            className="absolute inset-0 z-30 overflow-hidden rounded-3xl"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              transformOrigin: "left center",
              perspective: "800px",
            }}
          >
            <div className="w-full h-full bg-ivory/90 backdrop-blur-md border border-gold/40 shadow-2xl" />
          </motion.div>

          {/* RIGHT HALF of the split card */}
          <motion.div
            animate={
              isOpening
                ? {
                    x: "110%",
                    rotateY: 45,
                    opacity: 0,
                    filter: "blur(4px)",
                  }
                : { x: 0, rotateY: 0, opacity: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: 1.4,
              ease: elegantEase,
              delay: 0.1,
            }}
            className="absolute inset-0 z-30 overflow-hidden rounded-3xl"
            style={{
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
              transformOrigin: "right center",
              perspective: "800px",
            }}
          >
            <div className="w-full h-full bg-ivory/90 backdrop-blur-md border border-gold/40 shadow-2xl" />
          </motion.div>

          {/* Main visible card content (fades up after split doors start) */}
          <motion.div
            animate={
              isOpening
                ? { scale: 0.92, opacity: 0, y: -30, filter: "blur(6px)" }
                : { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{ duration: 1.3, ease: elegantEase, delay: 0.05 }}
            className="relative z-40 w-full"
          >
            {/* Handcrafted Royal Card Container */}
            <div className="relative w-full bg-ivory/88 backdrop-blur-md border border-gold/40 shadow-2xl rounded-3xl p-3 sm:p-4 flex flex-col items-center text-center overflow-hidden">
              {/* Corner Flourishes */}
              <CornerFlourish
                position="top-left"
                size={34}
                className="absolute top-1.5 left-1.5 text-gold/60 pointer-events-none"
              />
              <CornerFlourish
                position="top-right"
                size={34}
                className="absolute top-1.5 right-1.5 text-gold/60 pointer-events-none"
              />
              <CornerFlourish
                position="bottom-left"
                size={34}
                className="absolute bottom-1.5 left-1.5 text-gold/60 pointer-events-none"
              />
              <CornerFlourish
                position="bottom-right"
                size={34}
                className="absolute bottom-1.5 right-1.5 text-gold/60 pointer-events-none"
              />

              {/* Inner Antique Gold Rule Box */}
              <div className="w-full border border-gold/25 rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center">
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
                  animate={
                    isOpening
                      ? {
                          scale: [1, 1.15, 0.9],
                          rotate: [0, 5, -3],
                          opacity: [1, 1, 0],
                          transition: { duration: 0.8, ease: elegantEase },
                        }
                      : { scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 1.0, delay: 0.4, type: "spring", stiffness: 90 }}
                  className="mb-2 relative"
                >
                  <RadhaKrishnaSeal
                    size={110}
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
                  className="text-xl sm:text-2xl font-serif text-forest tracking-normal mb-1.5 flex items-center justify-center flex-wrap text-embossed"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <span>{weddingConfig.couple.brideFirstName}</span>
                  <span className="font-script italic text-gold font-normal px-2 text-xl sm:text-2xl">
                    &amp;
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
                    <polygon
                      points="14,1 27,7 14,13 1,7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <polygon
                      points="14,4 23,7 14,10 5,7"
                      fill="currentColor"
                      fillOpacity="0.25"
                    />
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
                  className="font-script text-base sm:text-lg text-gold-dark mt-2 mb-1 max-w-[220px] mx-auto text-center leading-relaxed select-none"
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
                  {isOpening ? "Opening Invitation..." : "Tap anywhere to enter"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
