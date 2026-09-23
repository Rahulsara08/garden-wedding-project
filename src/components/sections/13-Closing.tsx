"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { Calendar, RotateCcw, Heart, Sparkles } from "lucide-react";

interface ClosingProps {
  onReplay: () => void;
}

export const Closing: React.FC<ClosingProps> = ({ onReplay }) => {
  const { closing, couple, loveNote, footer } = weddingConfig;

  // Generate .ics calendar download
  const handleDownloadIcs = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mayura Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${closing.calendarSummary}`,
      `DESCRIPTION:${closing.calendarDetails}`,
      `LOCATION:${closing.calendarLocation}`,
      // 12 Feb 2027 17:00 IST = 11:30 UTC
      "DTSTART:20270212T113000Z",
      "DTEND:20270212T183000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${couple.brideFirstName}_and_${couple.groomFirstName}_Wedding.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pop-up and fade-in animation variant for text and details
  const popFade = {
    initial: { opacity: 0, y: 18, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section
      id="closing-section"
      className="relative w-full py-0 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Main Full-Bleed Artwork Container Touching Phone Mockup Edges */}
      <div className="relative w-full mx-auto px-0">
        <div className="relative w-full aspect-[392/1024] overflow-hidden">
          {/* Static Background Plate with Botanical Plants - NO ANIMATION */}
          <Image
            src="/assets/watercolor/closing-save-the-date-bg.png"
            alt="Save the Date Botanical Frame"
            fill
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top select-none pointer-events-none"
          />

          {/* Animated Text & Details Layer - Pops Up and Fades In */}
          <div className="absolute inset-0 flex flex-col items-center justify-between px-5 py-7 sm:py-9 text-center z-10">
            {/* Top Block: Save the Date & Invitation Heading */}
            <motion.div
              {...popFade}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center max-w-[270px] pt-4 sm:pt-6"
            >
              <p className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B68D4C] uppercase mb-1.5">
                {closing.sectionEyebrow}
              </p>
              <h2
                className="text-2xl sm:text-[27px] font-serif text-[#1E2D22] font-medium tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {closing.heading}
              </h2>

              {/* Diamond divider flourish */}
              <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-75 my-2">
                <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
                <span className="text-[8px] transform rotate-45 inline-block">◆</span>
                <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
              </div>

              <p className="text-[11px] sm:text-xs text-[#4A5D4E] font-sans leading-relaxed">
                {closing.message}
              </p>
            </motion.div>

            {/* Actions Block: Add to Calendar & Replay Buttons */}
            <motion.div
              {...popFade}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 w-full max-w-[260px] my-1"
            >
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#233829] text-[#FAF3E4] text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase shadow-md hover:bg-[#1A2C20] hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B68D4C]" />
                <span>Add to Calendar (.ICS)</span>
              </button>

              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-[0.18em] text-[#556B5A] uppercase hover:text-[#1E2D22] active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#B68D4C]" />
                <span>{closing.replayButtonText}</span>
              </button>
            </motion.div>

            {/* Couple Gratitude & Signature Block */}
            <motion.div
              {...popFade}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center max-w-[270px] my-1"
            >
              {/* Golden Wax Seal Medallion */}
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 mb-2 shadow-xs rounded-full">
                <Image
                  src="/assets/watercolor/closing-wax-seal.png"
                  alt="R & A Monogram Seal"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Heart Line Flourish */}
              <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-80 mb-2">
                <span className="h-[1px] w-7 bg-[#B68D4C]/40" />
                <Heart className="w-3.5 h-3.5 text-[#B68D4C] fill-[#B68D4C]/15" />
                <span className="h-[1px] w-7 bg-[#B68D4C]/40" />
              </div>

              <p className="font-serif italic text-xs sm:text-[13px] text-[#1E2D22]/90 mb-1">
                {loveNote.signOff}
              </p>

              <h3
                className="text-2xl sm:text-[28px] font-serif font-semibold text-[#1E2D22] tracking-tight mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {loveNote.names}
              </h3>

              <p className="font-serif italic text-[11px] sm:text-xs text-[#B68D4C] tracking-wide">
                &ldquo;{loveNote.quote}&rdquo;
              </p>
            </motion.div>

            {/* Footer Blessings & Hashtag Block */}
            <motion.div
              {...popFade}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center max-w-[260px] pb-4 sm:pb-6"
            >
              <div className="flex justify-center text-[#B68D4C] mb-1.5 opacity-80">
                <Sparkles className="w-3.5 h-3.5 text-[#B68D4C]" />
              </div>

              <p className="text-[10px] sm:text-[10.5px] text-[#4A5D4E] font-sans leading-relaxed mb-2.5">
                Thank you for being a part of our journey and for showering us with your love, blessings, and good wishes.
              </p>

              <LotusDivider variant="simple" className="my-1.5 max-w-[90px] mx-auto" />

              <p className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] text-[#B68D4C] uppercase mt-1 mb-1">
                {footer.hashtag}
              </p>

              <div className="flex items-center justify-center gap-1.5 text-[#B68D4C] opacity-60 my-1">
                <span className="h-[1px] w-5 bg-[#B68D4C]/40" />
                <span className="text-[6px] transform rotate-45 inline-block">◆</span>
                <span className="h-[1px] w-5 bg-[#B68D4C]/40" />
              </div>

              <p className="text-[9px] font-sans tracking-widest text-[#556B5A]/70 uppercase">
                &copy; {footer.year}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
