"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

const TOTAL_FRAMES = 95;
const FRAME_BASE_PATH = "/assets/frames/namaste/frame_";
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 540;

interface NamasteScrollSequenceProps {
  className?: string;
}

export const NamasteScrollSequence: React.FC<NamasteScrollSequenceProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const currentFrameIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const { containerRef: scrollContainer } = useScrollContainer();

  // Draw a frame onto the canvas cleanly
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find the requested image or the closest loaded frame
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const lower = index - offset;
        const higher = index + offset;
        if (lower >= 0 && imagesRef.current[lower]?.complete && imagesRef.current[lower]?.naturalWidth !== 0) {
          img = imagesRef.current[lower];
          break;
        }
        if (higher < TOTAL_FRAMES && imagesRef.current[higher]?.complete && imagesRef.current[higher]?.naturalWidth !== 0) {
          img = imagesRef.current[higher];
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      currentFrameIndexRef.current = index;
    }
  }, []);

  // Preload all 95 frames in order
  useEffect(() => {
    let isCancelled = false;

    // Load first frame with high priority
    const firstImg = new Image();
    firstImg.src = `${FRAME_BASE_PATH}001.webp`;
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameReady(true);
      drawFrame(0);
    };

    // Preload remaining frames progressively
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `${FRAME_BASE_PATH}${frameNum}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
      };
    }

    return () => {
      isCancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Track scroll within viewport (from when section enters to when it centers)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start 85%", "center 38%"],
  });

  // Silky smooth spring physics to avoid frame skips and stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 34,
    mass: 0.18,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(clamped * (TOTAL_FRAMES - 1)));

      if (targetIndex !== currentFrameIndexRef.current) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetIndex);
        });
      }
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [smoothProgress, drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[240px] sm:max-w-[270px] mx-auto my-0.5 flex flex-col items-center justify-center select-none ${className}`}
    >
      <div
        className="relative w-full aspect-[640/540] flex items-center justify-center overflow-hidden"
        style={{
          // Feather sides and softly dissolve the bottom hemline into the ivory background
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.75) 76%, rgba(0,0,0,0.35) 86%, rgba(0,0,0,0.05) 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.75) 76%, rgba(0,0,0,0.35) 86%, rgba(0,0,0,0.05) 95%, transparent 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full object-contain pointer-events-none"
          style={{
            mixBlendMode: "multiply",
            opacity: isFirstFrameReady ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        />

        {/* Fallback initial frame while loading */}
        {!isFirstFrameReady && (
          <div className="absolute inset-0 bg-[#f8f2e6]/50 animate-pulse rounded-2xl" />
        )}

        {/* Bottom soft gradient wash & blur to dissolve clothing hemline into parchment */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-ivory via-ivory/75 to-transparent pointer-events-none z-10" />
      </div>

      {/* Gentle ambient glow beneath couple */}
      <div className="w-3/4 h-2 -mt-2 bg-radial from-gold/15 to-transparent blur-sm pointer-events-none" />
    </div>
  );
};
