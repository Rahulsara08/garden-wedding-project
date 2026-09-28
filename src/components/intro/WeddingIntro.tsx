"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OpeningVideo } from "./OpeningVideo";
import { AnimatedSealSection } from "./AnimatedSealSection";
import { IntroParticles } from "./IntroParticles";

interface WeddingIntroProps {
  onComplete: () => void;
  className?: string;
}

export const WeddingIntro: React.FC<WeddingIntroProps> = ({
  onComplete,
  className = "",
}) => {
  const [currentStage, setCurrentStage] = useState<"video" | "seal">("video");

  // Called only AFTER the video has fully run its entire duration
  const handleVideoComplete = () => {
    setCurrentStage("seal");
  };

  // Called when user taps on the seal invitation card
  const handleSealComplete = () => {
    onComplete();
  };

  const smoothEase = [0.22, 0.68, 0.36, 1] as const;

  return (
    <div
      className={`fixed md:absolute inset-0 z-[9999] md:z-50 flex items-center justify-center overflow-hidden bg-[#FAF3E4] paper-texture select-none ${className}`}
    >
      <AnimatePresence>
        {/* STAGE 1: FULL ROYAL DOORS VIDEO RUN */}
        {currentStage === "video" && (
          <motion.div
            key="stage-video"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <OpeningVideo onVideoComplete={handleVideoComplete} />
          </motion.div>
        )}

        {/* STAGE 2: EASY, SMALL & SMOOTH SEAL CARD REVEAL */}
        {currentStage === "seal" && (
          <motion.div
            key="stage-seal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full z-20 flex items-center justify-center bg-[#FAF3E4]"
          >
            <AnimatedSealSection onSealComplete={handleSealComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Pink Rose Petals Falling Gently Across the Experience */}
      <IntroParticles count={9} className="z-30 pointer-events-none" />
    </div>
  );
};
