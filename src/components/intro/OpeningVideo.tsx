"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningVideoProps {
  onVideoComplete: () => void;
  className?: string;
}

export const OpeningVideo: React.FC<OpeningVideoProps> = ({
  onVideoComplete,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const completedRef = useRef(false);

  // Initialize video paused at first frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Play video smoothly from start to finish on user tap
  const handleTapToEnter = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isPlaying || completedRef.current) return;
    setIsPlaying(true);

    const video = videoRef.current;
    if (!video) {
      setTimeout(onVideoComplete, 5000);
      return;
    }

    video.playbackRate = 1.0;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Video playback interrupted, continuing:", err);
      });
    }

    const triggerComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onVideoComplete();
    };

    const handleEnded = () => {
      triggerComplete();
    };

    const handleTimeUpdate = () => {
      if (!video) return;
      const duration = video.duration || 7.98;
      // Complete when the gate doors are fully opened
      if (video.currentTime >= duration - 0.2) {
        triggerComplete();
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Fallback safety timer
    const safetyTimer = setTimeout(() => {
      triggerComplete();
    }, 9000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      clearTimeout(safetyTimer);
    };
  }, [isPlaying, onVideoComplete]);

  return (
    <div
      onClick={handleTapToEnter}
      role="button"
      tabIndex={0}
      aria-label="Tap anywhere to enter royal doors"
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer bg-black flex items-center justify-center ${className}`}
      style={{
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
      }}
    >
      {/* 9:16 Adaptive Video Player — Perfectly fills every screen dimension */}
      <video
        ref={videoRef}
        src="/assets/video/royal-doors-opening.mp4"
        poster="/assets/video/royal-doors-poster.jpg"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover object-center pointer-events-none"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* "TAP ANYWHERE TO ENTER" Interactive Prompt */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-12 inset-x-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none text-center"
          >
            <div className="px-5 py-2.5 rounded-full bg-black/55 backdrop-blur-md border border-[#DFC386]/45 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <p
                className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-serif text-[#FAF3E4] font-medium"
                style={{
                  textShadow: "0 0 12px rgba(212, 175, 55, 0.8), 0 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                Tap Anywhere to Enter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
