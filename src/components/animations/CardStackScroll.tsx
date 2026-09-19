"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StoryMoment } from "@/config/weddingConfig";

interface CardStackScrollProps {
  moments: StoryMoment[];
}

export const CardStackScroll: React.FC<CardStackScrollProps> = ({ moments }) => {
  const m1 = moments[0];
  const m2 = moments[1];

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-12 sm:gap-16 py-4 px-2 select-none">
      {/* Golden Vine S-Curve Line Connecting the Moments */}
      <svg
        viewBox="0 0 380 720"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 190 20 C 80 120, 30 220, 50 320 C 70 420, 330 480, 340 580 C 350 640, 280 690, 190 710"
          stroke="#B68D4C"
          strokeWidth="1.2"
          strokeOpacity="0.45"
          strokeDasharray="none"
        />

        {/* Delicate leaves attached along the golden vine */}
        <path
          d="M 72 200 C 60 190, 52 195, 58 206 C 64 217, 78 210, 72 200 Z"
          fill="#5D7354"
          opacity="0.65"
        />
        <path
          d="M 120 380 C 135 370, 142 376, 134 388 C 126 400, 112 392, 120 380 Z"
          fill="#5D7354"
          opacity="0.65"
        />
        <path
          d="M 335 520 C 350 510, 355 518, 346 528 C 337 538, 325 530, 335 520 Z"
          fill="#5D7354"
          opacity="0.65"
        />
      </svg>

      {/* MOMENT 1 */}
      {m1 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex flex-col items-center z-10"
        >
          {/* Top-Left Script Accent */}
          <div className="w-full flex justify-start pl-3 sm:pl-6 mb-2">
            <p className="font-script text-xs sm:text-sm text-gold-dark/95 -rotate-6 tracking-wide select-none">
              Some conversations change everything ♡
            </p>
          </div>

          {/* Centered Photo Frame */}
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] aspect-[4/2.85] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gold/30">
            <Image
              src={m1.photo}
              alt={m1.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Date, Title & Quote Below Photo */}
          <div className="flex flex-col items-center text-center mt-3.5 px-4 max-w-[300px]">
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-gold-dark font-sans font-bold">
              {m1.date} · {m1.title}
            </span>

            <p className="font-script text-base sm:text-lg text-forest-deep italic leading-relaxed mt-1">
              &ldquo;{m1.quote}&rdquo;
            </p>

            <span className="text-maroon/70 text-xs mt-1 select-none">♥</span>
          </div>
        </motion.div>
      )}

      {/* MOMENT 2 */}
      {m2 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full flex flex-col items-center z-10 mt-2"
        >
          {/* Centered Photo Frame */}
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] aspect-[4/2.85] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gold/30">
            <Image
              src={m2.photo}
              alt={m2.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Date, Title & Quote Below Photo */}
          <div className="flex flex-col items-center text-center mt-3.5 px-4 max-w-[300px]">
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-gold-dark font-sans font-bold">
              {m2.date} · {m2.title}
            </span>

            <p className="font-script text-base sm:text-lg text-forest-deep italic leading-relaxed mt-1">
              &ldquo;{m2.quote}&rdquo;
            </p>

            <span className="text-maroon/70 text-xs mt-1 select-none">♥</span>
          </div>

          {/* Bottom-Right Script Accent */}
          <div className="w-full flex justify-end pr-3 sm:pr-6 mt-1">
            <p className="font-script text-xs sm:text-sm text-gold-dark/95 rotate-3 tracking-wide select-none">
              Same place brighter us ♡
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
