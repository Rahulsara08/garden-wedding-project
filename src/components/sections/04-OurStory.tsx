"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig, StoryMoment } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { X, Sparkles, Calendar, Heart } from "lucide-react";

export const OurStory: React.FC = () => {
  const [selectedMoment, setSelectedMoment] = useState<StoryMoment | null>(null);

  return (
    <section
      id="story-section"
      className="relative py-12 sm:py-16 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Top Left Botanical Foliage Accent */}
      <div className="absolute -top-6 -left-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-80">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Top Left Botanical Accent"
          fill
          unoptimized
          className="object-contain object-top-left"
        />
      </div>

      {/* Top Right Botanical Foliage Accent */}
      <div className="absolute -top-6 -right-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-80">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Top Right Botanical Accent"
          fill
          unoptimized
          className="object-contain object-top-right"
        />
      </div>

      {/* Bottom Left Botanical Foliage Accent */}
      <div className="absolute -bottom-6 -left-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-80 transform scale-y-[-1]">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Bottom Left Botanical Accent"
          fill
          unoptimized
          className="object-contain object-bottom-left"
        />
      </div>

      {/* Bottom Right Botanical Foliage Accent */}
      <div className="absolute -bottom-6 -right-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-80 transform scale-y-[-1]">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Bottom Right Botanical Accent"
          fill
          unoptimized
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Organic Botanical Plant Rope / Vine Connecting the 3 Moments */}
      <svg
        viewBox="0 0 400 1200"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Botanical Shadow / Stem Path */}
        <path
          d="M 200 40 C 60 180, 40 320, 180 440 C 320 560, 340 720, 200 840 C 60 960, 100 1080, 200 1160"
          stroke="#5A6E57"
          strokeWidth="1.8"
          strokeOpacity="0.4"
          strokeDasharray="4 3"
        />
        {/* Primary Handcrafted Golden Stem Vine */}
        <path
          d="M 200 40 C 60 180, 40 320, 180 440 C 320 560, 340 720, 200 840 C 60 960, 100 1080, 200 1160"
          stroke="#B68D4C"
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />
        {/* Watercolor Leaves and Delicate Floral Buds along the Vine */}
        <path d="M 85 240 C 70 230, 62 236, 70 248 C 78 260, 92 252, 85 240 Z" fill="#5D7354" opacity="0.6" />
        <circle cx="88" cy="242" r="2.5" fill="#D4AF37" opacity="0.8" />
        <path d="M 125 380 C 140 368, 148 375, 138 388 C 128 401, 114 392, 125 380 Z" fill="#5D7354" opacity="0.6" />
        <circle cx="135" cy="385" r="2.5" fill="#E88B96" opacity="0.8" />
        <path d="M 260 520 C 275 510, 280 518, 270 528 C 260 538, 248 530, 260 520 Z" fill="#5D7354" opacity="0.6" />
        <path d="M 310 660 C 325 650, 332 658, 322 670 C 312 682, 298 672, 310 660 Z" fill="#5D7354" opacity="0.6" />
        <circle cx="320" cy="665" r="2.5" fill="#D4AF37" opacity="0.8" />
        <path d="M 230 780 C 215 770, 208 778, 218 788 C 228 798, 242 790, 230 780 Z" fill="#5D7354" opacity="0.6" />
        <circle cx="220" cy="785" r="2.5" fill="#E88B96" opacity="0.8" />
        <path d="M 110 980 C 95 970, 88 976, 96 988 C 104 1000, 118 992, 110 980 Z" fill="#5D7354" opacity="0.6" />
        <circle cx="100" cy="985" r="2.5" fill="#D4AF37" opacity="0.8" />
      </svg>

      {/* Section Header */}
      <div className="relative z-10 text-center w-full max-w-[340px] mx-auto mb-10">
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

      {/* Story Moments Journey (3 Curvy Images) */}
      <div className="relative z-10 w-full max-w-[400px] mx-auto space-y-12 sm:space-y-14">
        {weddingConfig.story.moments.map((moment, idx) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Curvy Artistic Image Frame (Tap to Open Card) */}
            <div
              onClick={() => setSelectedMoment(moment)}
              className="relative w-full max-w-[320px] aspect-square rounded-[32px] sm:rounded-[38px] p-2 bg-[#FFFDF9]/90 border-2 border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]"
              style={{
                transform: `rotate(${moment.rotation}deg)`,
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${moment.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedMoment(moment);
              }}
            >
              {/* Inner Image Container with Smooth Curvy Corners */}
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[30px] overflow-hidden">
                <Image
                  src={moment.photo}
                  alt={moment.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 group-hover:from-black/70 transition-colors" />

                {/* Top Corner Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-ivory/90 border border-gold/40 shadow-xs backdrop-blur-xs">
                  <span className="text-[9px] font-sans font-bold text-[#8D6B2C] tracking-wider uppercase">
                    {moment.date}
                  </span>
                </div>

                {/* Bottom Overlay Info matching User Handwritten Details (Tap button removed) */}
                <div className="absolute bottom-3 left-0 right-0 px-4 flex flex-col items-start text-white/95 drop-shadow-sm">
                  <span className="text-sm sm:text-base font-serif font-semibold tracking-wide leading-tight">
                    {moment.title}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] font-sans text-[#FAF3E4]/90 tracking-wider">
                    <span className="font-medium">{moment.dateDetail || moment.date}</span>
                    {moment.iconEmoji && (
                      <span className="text-xs select-none">{moment.iconEmoji}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Caption Below Image */}
            <p className="font-script italic text-base sm:text-lg text-gold-dark mt-4 max-w-[280px] leading-relaxed">
              &ldquo;{moment.quote}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE POP-UP DETAIL CARD MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedMoment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMoment(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
            />

            {/* Pop-up Memory Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-[380px] bg-[#FFFDF9] rounded-[32px] border-2 border-gold/50 shadow-2xl overflow-hidden z-10 p-5 sm:p-6 flex flex-col items-center text-center select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMoment(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ivory border border-gold/40 flex items-center justify-center text-forest hover:text-gold hover:bg-gold/10 transition-colors shadow-xs z-20 cursor-pointer"
                aria-label="Close memory details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo inside Pop-up */}
              <div className="relative w-full aspect-square max-w-[260px] rounded-[24px] overflow-hidden border border-gold/35 shadow-sm mb-4">
                <Image
                  src={selectedMoment.photo}
                  alt={selectedMoment.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Date Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 mb-2">
                <Calendar className="w-3 h-3 text-gold" />
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#8D6B2C]">
                  {selectedMoment.dateDetail || selectedMoment.date}
                </span>
                {selectedMoment.iconEmoji && (
                  <span className="text-xs select-none">{selectedMoment.iconEmoji}</span>
                )}
              </div>

              {/* Moment Title */}
              <h3
                className="text-2xl font-serif text-forest font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {selectedMoment.title}
              </h3>

              {/* Script Quote */}
              <p className="font-script italic text-base sm:text-lg text-gold-dark my-1.5 leading-snug">
                &ldquo;{selectedMoment.quote}&rdquo;
              </p>

              {/* Heartfelt Narrative Story */}
              {selectedMoment.extraText && (
                <p className="text-xs text-sage/90 font-sans leading-relaxed mt-2 max-w-[300px] border-t border-gold/20 pt-3">
                  {selectedMoment.extraText}
                </p>
              )}

              {/* Decorative Bottom Divider */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-gold/60">
                <Heart className="w-3 h-3 text-gold fill-gold/20" />
                <span className="text-[10px] font-sans uppercase tracking-widest font-semibold text-gold-dark">
                  Forever Begins
                </span>
                <Heart className="w-3 h-3 text-gold fill-gold/20" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
