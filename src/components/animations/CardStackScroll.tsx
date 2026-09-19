"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StoryMoment } from "@/config/weddingConfig";

interface CardStackScrollProps {
  moments: StoryMoment[];
}

export const CardStackScroll: React.FC<CardStackScrollProps> = ({ moments }) => {
  return (
    <div className="flex flex-col items-center gap-12 sm:gap-16 max-w-xl mx-auto px-2 py-4">
      {moments.map((moment, index) => {
        const isFirst = index === 0;

        return (
          <div key={moment.id} className="relative w-full max-w-[400px] sm:max-w-[460px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0"
            >
              {/* Organic Pebble Photo Shape (Left / Main) */}
              <div
                className="relative w-[240px] sm:w-[270px] h-[210px] sm:h-[240px] shadow-lg overflow-hidden border-2 border-ivory-light z-10"
                style={{
                  borderRadius: isFirst
                    ? "42% 58% 62% 38% / 46% 54% 46% 54%"
                    : "56% 44% 42% 58% / 52% 48% 52% 48%",
                  boxShadow:
                    "0 14px 30px -8px rgba(35, 45, 33, 0.18), 0 0 15px rgba(182, 141, 76, 0.12)",
                }}
              >
                <Image
                  src={moment.photo}
                  alt={moment.title}
                  fill
                  priority={isFirst}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Overlapping Parchment Note Card (Right / Accent) */}
              <div
                className="relative z-20 w-[240px] sm:w-[250px] bg-ivory-light/95 border border-gold/30 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xs sm:-ml-12 -mt-10 sm:mt-4 text-center sm:text-left flex flex-col items-center sm:items-start"
                style={{
                  boxShadow:
                    "0 12px 28px -6px rgba(182, 141, 76, 0.22), 0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Washi Tape & Dried Flower Branch Accent */}
                <div className="absolute -top-3 right-4 w-10 flex flex-col items-center pointer-events-none select-none z-30">
                  <div className="w-8 h-3 bg-[#E6D8BF]/80 border border-gold/30 shadow-2xs rotate-[-8deg] rounded-xs" />
                  <svg viewBox="0 0 24 50" className="w-8 h-12 fill-none stroke-gold-dark/70 -mt-1">
                    <path d="M 12 45 C 11 30 10 16 12 4" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 11 28 C 6 22 3 17 2 12" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 12 20 C 18 14 21 9 22 4" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="12" cy="3" r="2" fill="#B68D4C" opacity="0.85" />
                    <circle cx="2" cy="11" r="1.5" fill="#B68D4C" opacity="0.85" />
                    <circle cx="22" cy="3" r="1.5" fill="#B68D4C" opacity="0.85" />
                  </svg>
                </div>

                {/* Date */}
                <span className="text-[9.5px] uppercase tracking-[0.24em] text-gold-dark font-sans font-bold mb-1">
                  {moment.date}
                </span>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-serif text-forest font-semibold tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {moment.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-[1px] bg-gold/35 my-1.5 flex items-center justify-center">
                  <span className="w-1 h-1 rotate-45 bg-gold" />
                </div>

                {/* Quote */}
                {moment.quote && (
                  <p className="font-script text-sm sm:text-base text-forest-deep italic leading-relaxed mt-0.5">
                    &ldquo;{moment.quote}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>

            {/* Handwritten Script Accents matching reference image */}
            {isFirst ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-3 sm:mt-1 ml-4 sm:ml-6 text-left"
              >
                <p className="font-script text-base sm:text-lg text-gold-dark/90 -rotate-3 select-none">
                  Some conversations change everything ♡
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-4 sm:mt-2 text-right mr-4 sm:mr-6"
              >
                <p className="font-script text-base sm:text-lg text-gold-dark/90 rotate-2 select-none">
                  And the best is yet to come... ♡
                </p>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};
