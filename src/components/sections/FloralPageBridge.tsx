"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

export const FloralPageBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  // Parallax & Reveal animations as user scrolls between Page 1 and Page 2
  const ropeScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0.88, 1]);
  const ropeOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  const centerSealScale = useTransform(scrollYProgress, [0.2, 0.6], [0.85, 1]);
  const centerSealOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  const petalY1 = useTransform(scrollYProgress, [0, 1], [-15, 35]);
  const petalRotate1 = useTransform(scrollYProgress, [0, 1], [-12, 22]);

  const petalY2 = useTransform(scrollYProgress, [0, 1], [-10, 45]);
  const petalRotate2 = useTransform(scrollYProgress, [0, 1], [8, -25]);

  return (
    <div
      ref={bridgeRef}
      className="relative w-full h-36 sm:h-44 bg-ivory paper-texture flex flex-col items-center justify-center overflow-hidden my-0 select-none z-10"
      aria-hidden="true"
    >
      {/* Soft Gradient Blend Masks at Top and Bottom for Seamless Integration */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />

      {/* Main Floral Rope Garland Container */}
      <motion.div
        style={{ scaleX: ropeScaleX, opacity: ropeOpacity }}
        className="relative w-full max-w-[420px] mx-auto px-2 flex flex-col items-center justify-center z-20"
      >
        <svg
          viewBox="0 0 400 120"
          fill="none"
          className="w-full h-auto overflow-visible pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* --- 1. BRAIDED RUSTIC GOLD ROPE GARLAND WITH NATURAL CURVE (Image 2 style) --- */}
          {/* Base Rope Shadow */}
          <path
            d="M 0,22 Q 100,36 200,28 Q 300,36 400,22"
            stroke="#1F2921"
            strokeWidth="3.5"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
          {/* Primary Braided Gold Rope Strand */}
          <path
            d="M 0,20 Q 100,34 200,26 Q 300,34 400,20"
            stroke="#B68D4C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Twisted Secondary Rope Accent */}
          <path
            d="M 0,20 Q 100,34 200,26 Q 300,34 400,20"
            stroke="#FAF3E4"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* --- 2. TIED FLOWERS & LEAVES WRAPPED ALONG THE ROPE (Image 2 style) --- */}
          {/* Left Flower Bunch (At x=70) */}
          <g transform="translate(70, 24)">
            {/* Cluster Green Leaves */}
            <path d="M-18,-8 C-30,-22 -14,-32 0,-16 Z" fill="#1F2921" fillOpacity="0.75" />
            <path d="M-8,-16 C10,-30 24,-12 6,-6 Z" fill="#2E4232" fillOpacity="0.8" />
            <path d="M-22,6 C-34,-4 -28,14 -12,12 Z" fill="#1F2921" fillOpacity="0.65" />
            
            {/* Soft Cream Blossom */}
            <circle cx="-10" cy="-10" r="9" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="-10" cy="-10" r="3.5" fill="#E5A93C" />
            
            {/* Marigold Amber Blossom */}
            <circle cx="8" cy="-6" r="11" fill="#E5A93C" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="8" cy="-6" r="4" fill="#B68D4C" />
            
            {/* Rose Pink Blossom */}
            <circle cx="-2" cy="4" r="10" fill="#D98880" stroke="#FAF3E4" strokeWidth="0.8" />
            <circle cx="-2" cy="4" r="3.5" fill="#900C3F" />
          </g>

          {/* Right Flower Bunch (At x=330) */}
          <g transform="translate(330, 24)">
            {/* Cluster Green Leaves */}
            <path d="M18,-8 C30,-22 14,-32 0,-16 Z" fill="#1F2921" fillOpacity="0.75" />
            <path d="M8,-16 C-10,-30 -24,-12 -6,-6 Z" fill="#2E4232" fillOpacity="0.8" />
            <path d="M22,6 C34,-4 28,14 12,12 Z" fill="#1F2921" fillOpacity="0.65" />
            
            {/* Soft Cream Blossom */}
            <circle cx="10" cy="-10" r="9" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="10" cy="-10" r="3.5" fill="#E5A93C" />
            
            {/* Marigold Amber Blossom */}
            <circle cx="-8" cy="-6" r="11" fill="#E5A93C" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="-8" cy="-6" r="4" fill="#B68D4C" />
            
            {/* Rose Pink Blossom */}
            <circle cx="2" cy="4" r="10" fill="#D98880" stroke="#FAF3E4" strokeWidth="0.8" />
            <circle cx="2" cy="4" r="3.5" fill="#900C3F" />
          </g>

          {/* Center Flanking Flower Ties (At x=140 and x=260) */}
          <g transform="translate(138, 27)">
            <path d="M-12,-10 C-22,-18 -8,-24 0,-12 Z" fill="#2E4232" fillOpacity="0.75" />
            <circle cx="0" cy="0" r="8" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#D98880" />
          </g>

          <g transform="translate(262, 27)">
            <path d="M12,-10 C22,-18 8,-24 0,-12 Z" fill="#2E4232" fillOpacity="0.75" />
            <circle cx="0" cy="0" r="8" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#D98880" />
          </g>

          {/* --- 3. HANGING REAL FLOWER STRANDS & VINES WITH CURVE (Image 3 style) --- */}
          {/* Hanging Strand 1 (Far Left, x=50) */}
          <g transform="translate(50, 24)">
            {/* Vertical Rope Cord */}
            <path d="M 0,0 C -4,25 6,55 0,85" stroke="#B68D4C" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            {/* Dangling Flower Buds & Beads */}
            <circle cx="-2" cy="20" r="3.5" fill="#E5A93C" />
            <circle cx="2" cy="40" r="4.5" fill="#D98880" />
            <path d="M -4,58 C -12,50 -2,42 2,58 Z" fill="#1F2921" fillOpacity="0.7" />
            <circle cx="0" cy="65" r="5" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="-2" cy="85" r="4" fill="#900C3F" />
          </g>

          {/* Hanging Strand 2 (Mid-Left, x=110) */}
          <g transform="translate(110, 26)">
            {/* Vertical Rope Cord */}
            <path d="M 0,0 C 5,30 -5,65 2,98" stroke="#B68D4C" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            {/* Dangling Cascading Leaves & Lotus Buds */}
            <circle cx="2" cy="18" r="4" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <path d="M 6,32 C 14,24 4,16 0,32 Z" fill="#2E4232" fillOpacity="0.8" />
            <circle cx="-2" cy="45" r="5.5" fill="#E5A93C" />
            <path d="M -6,62 C -14,54 -4,46 0,62 Z" fill="#1F2921" fillOpacity="0.75" />
            <circle cx="2" cy="78" r="4.5" fill="#D98880" />
            <circle cx="2" cy="98" r="3.5" fill="#B68D4C" />
          </g>

          {/* Hanging Strand 3 (Mid-Right, x=290) */}
          <g transform="translate(290, 26)">
            {/* Vertical Rope Cord */}
            <path d="M 0,0 C -5,30 5,65 -2,98" stroke="#B68D4C" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            {/* Dangling Cascading Leaves & Lotus Buds */}
            <circle cx="-2" cy="18" r="4" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <path d="M -6,32 C -14,24 -4,16 0,32 Z" fill="#2E4232" fillOpacity="0.8" />
            <circle cx="2" cy="45" r="5.5" fill="#E5A93C" />
            <path d="M 6,62 C 14,54 4,46 0,62 Z" fill="#1F2921" fillOpacity="0.75" />
            <circle cx="-2" cy="78" r="4.5" fill="#D98880" />
            <circle cx="-2" cy="98" r="3.5" fill="#B68D4C" />
          </g>

          {/* Hanging Strand 4 (Far Right, x=350) */}
          <g transform="translate(350, 24)">
            {/* Vertical Rope Cord */}
            <path d="M 0,0 C 4,25 -6,55 0,85" stroke="#B68D4C" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            {/* Dangling Flower Buds & Beads */}
            <circle cx="2" cy="20" r="3.5" fill="#E5A93C" />
            <circle cx="-2" cy="40" r="4.5" fill="#D98880" />
            <path d="M 4,58 C 12,50 2,42 -2,58 Z" fill="#1F2921" fillOpacity="0.7" />
            <circle cx="0" cy="65" r="5" fill="#FAF3E4" stroke="#B68D4C" strokeWidth="0.8" />
            <circle cx="2" cy="85" r="4" fill="#900C3F" />
          </g>
        </svg>
      </motion.div>

      {/* Floating Flower Petals with Parallax */}
      <motion.div
        style={{ y: petalY1, rotate: petalRotate1 }}
        className="absolute left-[18%] top-5 w-3 h-4 text-gold-dark/45 pointer-events-none z-1"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.65" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: petalY2, rotate: petalRotate2 }}
        className="absolute right-[20%] top-8 w-2.5 h-3.5 text-rose-800/35 pointer-events-none z-1"
      >
        <svg viewBox="0 0 20 28" fill="currentColor">
          <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Center Antique Gold Lotus / Diamond Ornamental Divider Seal */}
      <motion.div
        style={{ scale: centerSealScale, opacity: centerSealOpacity }}
        className="relative z-30 flex flex-col items-center justify-center px-4 -mt-16 sm:-mt-20"
      >
        <div className="flex items-center justify-center gap-3 w-full max-w-[220px] bg-ivory/90 backdrop-blur-xs py-1 px-3 rounded-full border border-gold/30 shadow-xs">
          {/* Left Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />

          {/* Center Lotus / Diamond Filigree SVG Ornament */}
          <div className="relative text-gold flex items-center justify-center shrink-0">
            <svg viewBox="0 0 44 24" className="w-9 h-6 fill-current text-gold">
              {/* Outer lotus petals outline */}
              <path
                d="M 22 2 C 16 10, 8 14, 2 15 C 8 18, 16 20, 22 23 C 28 20, 36 18, 42 15 C 36 14, 28 10, 22 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
              {/* Inner lotus center diamond */}
              <polygon points="22,6 27,12 22,18 17,12" fill="currentColor" fillOpacity="0.35" />
              {/* Side accent dots */}
              <circle cx="7" cy="12" r="1.2" fill="currentColor" />
              <circle cx="37" cy="12" r="1.2" fill="currentColor" />
            </svg>
          </div>

          {/* Right Decorative Line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
        </div>
      </motion.div>
    </div>
  );
};
