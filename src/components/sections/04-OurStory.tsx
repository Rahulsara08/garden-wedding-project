"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoldenLeafDivider } from "../motifs/GoldenLeafDivider";

export const OurStory: React.FC = () => {
  return (
    <section
      id="story-section"
      className="relative w-full pt-0 pb-4 sm:pb-6 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Gentle Soft Top & Bottom Blends to Adjacent Sections */}
      <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/70 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-[#FAF3E4] via-[#FAF3E4]/70 to-transparent z-20 pointer-events-none" />

      {/* Ambient Floating Rose & Jasmine Petals Micro-Animation */}
      <div className="absolute inset-0 pointer-events-none select-none z-15 overflow-hidden">
        {[
          { left: "12%", delay: 0, duration: 9, size: 10, rotate: 25 },
          { left: "82%", delay: 2.5, duration: 11, size: 8, rotate: -35 },
          { left: "28%", delay: 4.8, duration: 10, size: 9, rotate: 45 },
          { left: "72%", delay: 7.2, duration: 12, size: 7, rotate: -20 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0, x: 0 }}
            animate={{
              y: ["0%", "1050%"],
              opacity: [0, 0.75, 0.85, 0.4, 0],
              x: [0, 15, -12, 10, 0],
              rotate: [petal.rotate, petal.rotate + 180],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            style={{ left: petal.left }}
            className="absolute top-0 pointer-events-none"
          >
            <div
              style={{ width: petal.size, height: petal.size * 1.5 }}
              className="rounded-full bg-gradient-to-br from-[#EBB1B8]/80 to-[#D48993]/50 blur-[0.4px] shadow-xs"
            />
          </motion.div>
        ))}
      </div>

      {/* Main Love Story Journey Artwork - Full Bleed Edge-to-Edge */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full mx-auto flex flex-col items-center px-0"
      >
        {/* The Master Handcrafted Love Story Artwork Scroll */}
        <div className="relative w-full aspect-[686/2048] overflow-hidden">
          <Image
            src="/assets/watercolor/love-story-journey.png"
            alt="Our Love Story - The First Hello, A Shared Cup of Chai, and The Proposal"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-top select-none pointer-events-none"
          />
        </div>
      </motion.div>

      {/* Section Breaker Divider Motif (Image 5) between Story and Family */}
      <div className="w-full pt-4 pb-1 flex justify-center z-20">
        <GoldenLeafDivider />
      </div>
    </section>
  );
};
