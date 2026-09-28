"use client";

import React from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
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
          <OptimizedImage
            src="/assets/watercolor/closing-save-the-date-bg.png"
            alt="Save the Date Botanical Frame"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top select-none pointer-events-none"
          />

          {/* Soft Top Dissolve into theme background #FAF3E4 */}
          <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-5 pointer-events-none" />

          {/* Animated Text & Details Layers - Positioned precisely across artwork plate */}
          {/* 1. Unified Top & Actions Block: Save the Date, Message, & Action Buttons */}
          <motion.div
            {...popFade}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mx-auto flex flex-col items-center max-w-[280px] px-3 text-center pointer-events-auto z-10"
            style={{ top: "14%" }}
          >
            <p className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B68D4C] uppercase mb-1">
              {closing.sectionEyebrow}
            </p>
            <h2
              className="text-2xl sm:text-[27px] font-serif text-[#1E2D22] font-medium tracking-tight leading-snug"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {closing.heading}
            </h2>

            {/* Diamond divider flourish */}
            <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-75 my-1.5">
              <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
              <span className="text-[8px] transform rotate-45 inline-block">◆</span>
              <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
            </div>

            <p className="text-[11px] sm:text-xs text-[#4A5D4E] font-sans leading-relaxed">
              {closing.message}
            </p>

            {/* Add to Calendar (.ICS) & Replay Invitation Buttons — Guaranteed below message with clean gap */}
            <div className="flex flex-col items-center gap-2 w-full max-w-[260px] mt-3.5 sm:mt-4">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#233829] text-[#FAF3E4] text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase shadow-md hover:bg-[#1A2C20] hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-[#B68D4C]/40"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B68D4C]" />
                <span>Add to Calendar (.ICS)</span>
              </button>

              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-[0.18em] text-[#556B5A] uppercase hover:text-[#1E2D22] active:scale-95 transition-all cursor-pointer pt-0.5"
              >
                <RotateCcw className="w-3 h-3 text-[#B68D4C]" />
                <span>{closing.replayButtonText}</span>
              </button>
            </div>
          </motion.div>

          {/* 3. Couple Gratitude & Signature Block */}
          <motion.div
            {...popFade}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mx-auto flex flex-col items-center max-w-[270px] px-3 text-center pointer-events-auto z-10"
            style={{ top: "47%" }}
          >
            {/* Golden Wax Seal Medallion */}
            <div className="relative w-12 h-12 sm:w-13 sm:h-13 mb-1.5 shadow-xs rounded-full">
              <OptimizedImage
                src="/assets/watercolor/closing-wax-seal.png"
                alt="R & A Monogram Seal"
                fill
                className="object-contain"
              />
            </div>

            {/* Heart Line Flourish */}
            <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-80 mb-1.5">
              <span className="h-[1px] w-7 bg-[#B68D4C]/40" />
              <Heart className="w-3.5 h-3.5 text-[#B68D4C] fill-[#B68D4C]/15" />
              <span className="h-[1px] w-7 bg-[#B68D4C]/40" />
            </div>

            <p className="font-serif italic text-xs sm:text-[13px] text-[#1E2D22]/90 mb-0.5">
              {loveNote.signOff}
            </p>

            <h3
              className="text-2xl sm:text-[27px] font-serif font-semibold text-[#1E2D22] tracking-tight mb-0.5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {loveNote.names}
            </h3>

            <p className="font-serif italic text-[11px] sm:text-xs text-[#B68D4C] tracking-wide">
              &ldquo;{loveNote.quote}&rdquo;
            </p>
          </motion.div>

          {/* 4. Footer Blessings & Hashtag Block (Positioned up in free space per Image 1) */}
          <motion.div
            {...popFade}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mx-auto flex flex-col items-center max-w-[280px] sm:max-w-[300px] px-2 text-center pointer-events-auto z-10"
            style={{ top: "68%" }}
          >
            <div className="flex justify-center text-[#B68D4C] mb-1.5 opacity-90">
              <Sparkles className="w-4 h-4 text-[#B68D4C]" />
            </div>

            <p className="text-[11px] sm:text-[12px] text-[#3F4F3D] font-sans leading-relaxed mb-2 font-medium">
              Thank you for being a part of our journey and for showering us with your love, blessings, and good wishes.
            </p>

            <LotusDivider variant="simple" className="my-1.5 max-w-[95px] mx-auto" />

            <p className="text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.24em] text-[#B68D4C] uppercase mt-1 mb-1">
              {footer.hashtag}
            </p>

            <div className="flex items-center justify-center gap-1.5 text-[#B68D4C] opacity-70 my-0.5">
              <span className="h-[1px] w-6 bg-[#B68D4C]/40" />
              <span className="text-[6px] transform rotate-45 inline-block">◆</span>
              <span className="h-[1px] w-6 bg-[#B68D4C]/40" />
            </div>

            <p className="text-[10px] font-sans tracking-widest text-[#556B5A]/80 uppercase mt-0.5">
              &copy; {footer.year}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
