"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { Calendar } from "lucide-react";

export const OurStory: React.FC = () => {
  return (
    <section
      id="story-section"
      className="relative py-12 sm:py-16 px-4 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Decorative Crafted Frame Borders */}
      <div className="absolute top-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent pointer-events-none" />

      {/* Organic Botanical Plant Stem Vine Connecting the 3 Moments */}
      <svg
        viewBox="0 0 400 1300"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Botanical Stem Path */}
        <path
          d="M 200 40 C 60 200, 40 380, 200 500 C 360 620, 340 820, 200 940 C 60 1060, 100 1200, 200 1260"
          stroke="#5A6E57"
          strokeWidth="2.2"
          strokeOpacity="0.45"
          strokeDasharray="4 3"
        />
        {/* Primary Handcrafted Golden Vine Stem */}
        <path
          d="M 200 40 C 60 200, 40 380, 200 500 C 360 620, 340 820, 200 940 C 60 1060, 100 1200, 200 1260"
          stroke="#B68D4C"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        {/* Real Botanical Leaves & Buds along the Connecting Vine */}
        <path d="M 85 240 C 70 230, 62 236, 70 248 C 78 260, 92 252, 85 240 Z" fill="#5D7354" opacity="0.7" />
        <circle cx="88" cy="242" r="3" fill="#D4AF37" opacity="0.9" />
        <path d="M 125 380 C 140 368, 148 375, 138 388 C 128 401, 114 392, 125 380 Z" fill="#5D7354" opacity="0.7" />
        <circle cx="135" cy="385" r="3" fill="#E88B96" opacity="0.9" />
        <path d="M 260 560 C 275 550, 280 558, 270 568 C 260 578, 248 570, 260 560 Z" fill="#5D7354" opacity="0.7" />
        <path d="M 310 720 C 325 710, 332 718, 322 730 C 312 742, 298 732, 310 720 Z" fill="#5D7354" opacity="0.7" />
        <circle cx="320" cy="725" r="3" fill="#D4AF37" opacity="0.9" />
        <path d="M 230 880 C 215 870, 208 878, 218 888 C 228 898, 242 890, 230 880 Z" fill="#5D7354" opacity="0.7" />
        <circle cx="220" cy="885" r="3" fill="#E88B96" opacity="0.9" />
        <path d="M 110 1080 C 95 1070, 88 1076, 96 1088 C 104 1100, 118 1092, 110 1080 Z" fill="#5D7354" opacity="0.7" />
        <circle cx="100" cy="1085" r="3" fill="#D4AF37" opacity="0.9" />
      </svg>

      {/* Section Header */}
      <div className="relative z-10 text-center w-full max-w-[340px] mx-auto mb-8">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[#A67C38] font-sans font-bold mb-1">
          {weddingConfig.story.sectionEyebrow}
        </p>

        <h2
          className="text-2xl sm:text-3xl font-serif text-forest tracking-tight font-semibold text-embossed"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {weddingConfig.story.heading}
        </h2>

        <div className="my-2 flex justify-center">
          <LotusDivider variant="simple" className="max-w-[120px]" />
        </div>

        <p className="text-xs text-sage/85 font-sans tracking-wide leading-relaxed">
          {weddingConfig.story.subtitle}
        </p>
      </div>

      {/* Story Moments Journey — Rounded Crafted Images Connected by Plant Vine */}
      <div className="relative z-10 w-full max-w-[380px] mx-auto space-y-12 sm:space-y-14">
        {weddingConfig.story.moments.map((moment, idx) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative flex flex-col items-center text-center py-2"
          >
            {/* Date Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#FFFDF9]/90 border border-[#C5A358]/45 shadow-2xs backdrop-blur-xs mb-2">
              <Calendar className="w-3 h-3 text-[#A67C38]" />
              <span className="text-[9.5px] uppercase font-sans font-bold tracking-widest text-[#8D6B2C]">
                {moment.dateDetail || moment.date}
              </span>
              {moment.iconEmoji && (
                <span className="text-xs select-none">{moment.iconEmoji}</span>
              )}
            </div>

            {/* Moment Title */}
            <h3
              className="text-xl sm:text-2xl font-serif text-forest font-semibold tracking-tight mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {moment.title}
            </h3>

            {/* Crafted Rounded Image Container with Real Botanical Plant Accents */}
            <div className="relative w-64 sm:w-72 aspect-square flex items-center justify-center my-2">
              {/* Real Botanical Plant Leaves — Top Left Leaf Accent */}
              <div className="absolute -top-3 -left-3 w-16 sm:w-20 aspect-square z-20 pointer-events-none select-none">
                <Image
                  src="/assets/illustrations/jhula-rope-flower-left.png"
                  alt="Botanical Leaf Accent"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Real Botanical Plant Leaves — Bottom Right Leaf Accent */}
              <div className="absolute -bottom-3 -right-3 w-16 sm:w-20 aspect-square z-20 pointer-events-none select-none rotate-180">
                <Image
                  src="/assets/illustrations/jhula-rope-flower-right.png"
                  alt="Botanical Leaf Accent"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Handcrafted Golden Ring Frame */}
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/50 shadow-md pointer-events-none z-10" />
              <div className="absolute inset-1 rounded-full border border-[#D4AF37]/25 pointer-events-none z-10" />

              {/* Rounded Image with Soft Background Blending */}
              <div className="relative w-full h-full rounded-full overflow-hidden p-2 bg-[#FFFDF9]/30">
                <Image
                  src={moment.photo}
                  alt={moment.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover rounded-full transition-transform duration-700 hover:scale-105"
                  style={{
                    mixBlendMode: "multiply",
                    filter: "contrast(1.02) brightness(0.98)",
                  }}
                />
              </div>
            </div>

            {/* Script Quote */}
            <p className="font-script italic text-base sm:text-lg text-gold-dark mt-3 max-w-[290px] leading-relaxed">
              &ldquo;{moment.quote}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
