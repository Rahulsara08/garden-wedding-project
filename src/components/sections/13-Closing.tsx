"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
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

  return (
    <section
      id="closing-section"
      className="relative w-full py-8 sm:py-12 px-4 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col justify-center items-center select-none min-h-[640px] sm:min-h-[680px]"
    >
      {/* Soft Top Blend into Previous Section */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-20 pointer-events-none" />

      {/* High-Definition Botanical Foliage Wreath across 4 Corners */}
      {/* Top-Left Foliage */}
      <div className="absolute -top-3 -left-3 w-36 sm:w-48 aspect-[3/4] mix-blend-multiply opacity-85 pointer-events-none select-none z-1">
        <Image
          src="/assets/watercolor/closing-foliage-left-hd.png"
          alt=""
          fill
          className="object-contain object-top-left"
          sizes="(max-width: 640px) 144px, 192px"
        />
      </div>

      {/* Top-Right Foliage */}
      <div className="absolute -top-3 -right-3 w-36 sm:w-48 aspect-[3/4] mix-blend-multiply opacity-85 pointer-events-none select-none z-1">
        <Image
          src="/assets/watercolor/closing-foliage-right-hd.png"
          alt=""
          fill
          className="object-contain object-top-right"
          sizes="(max-width: 640px) 144px, 192px"
        />
      </div>

      {/* Bottom-Left Foliage */}
      <div className="absolute -bottom-3 -left-3 w-36 sm:w-48 aspect-[3/4] mix-blend-multiply opacity-85 pointer-events-none select-none z-1 -scale-y-100">
        <Image
          src="/assets/watercolor/closing-foliage-left-hd.png"
          alt=""
          fill
          className="object-contain object-bottom-left"
          sizes="(max-width: 640px) 144px, 192px"
        />
      </div>

      {/* Bottom-Right Foliage */}
      <div className="absolute -bottom-3 -right-3 w-36 sm:w-48 aspect-[3/4] mix-blend-multiply opacity-85 pointer-events-none select-none z-1 -scale-y-100">
        <Image
          src="/assets/watercolor/closing-foliage-right-hd.png"
          alt=""
          fill
          className="object-contain object-bottom-right"
          sizes="(max-width: 640px) 144px, 192px"
        />
      </div>

      {/* Ambient Floating Rose & Jasmine Petals */}
      <div className="absolute inset-0 pointer-events-none select-none z-15 overflow-hidden">
        {[
          { left: "18%", delay: 0, duration: 11, size: 8, rotate: 20 },
          { left: "80%", delay: 3, duration: 13, size: 7, rotate: -25 },
          { left: "30%", delay: 5.5, duration: 10, size: 8.5, rotate: 40 },
          { left: "72%", delay: 8, duration: 12, size: 6, rotate: -15 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0, x: 0 }}
            animate={{
              y: ["0%", "1050%"],
              opacity: [0, 0.75, 0.85, 0.4, 0],
              x: [0, 14, -10, 8, 0],
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

      {/* Centered Unified Content Flow with Zero Big Gap */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[310px] sm:max-w-[330px] gap-5 py-2">
        {/* 1. Signature & Monogram Seal Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Master Golden Wax Seal Medallion — Pure Transparent Background */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 mb-2 filter drop-shadow-[0_4px_10px_rgba(44,56,38,0.12)]">
            <Image
              src="/assets/watercolor/closing-wax-seal-hd.png"
              alt="R & A Monogram Wax Seal"
              fill
              sizes="72px"
              className="object-contain select-none pointer-events-none"
            />
          </div>

          {/* Heart Line Flourish */}
          <div className="flex items-center justify-center gap-2.5 text-[#B68D4C] opacity-85 mb-1.5">
            <span className="h-[0.75px] w-8 bg-gradient-to-r from-transparent to-[#B68D4C]" />
            <Heart className="w-3.5 h-3.5 text-[#B68D4C] fill-[#B68D4C]/20" />
            <span className="h-[0.75px] w-8 bg-gradient-to-l from-transparent to-[#B68D4C]" />
          </div>

          {/* Sign-off */}
          <p className="font-serif italic text-[13px] sm:text-[14px] text-[#2C3826]/90 mb-0.5">
            {loveNote.signOff}
          </p>

          {/* Couple Names */}
          <h3 className="text-3xl sm:text-[34px] font-serif font-medium text-[#1E2D22] tracking-tight mb-1 text-embossed">
            {loveNote.names}
          </h3>

          {/* Quote */}
          <p className="font-serif italic font-medium text-[12px] sm:text-[13px] text-[#B68D4C] tracking-wide">
            &ldquo;{loveNote.quote}&rdquo;
          </p>
        </motion.div>

        {/* 2. Action Buttons Block — Positioned IMMEDIATELY BELOW the quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col items-center gap-2.5 w-full max-w-[260px] my-1"
        >
          {/* ADD TO CALENDAR (.ICS) Button */}
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#213527] text-[#FAF3E4] text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.16em] uppercase shadow-md hover:bg-[#18281D] hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-[#B68D4C]/45 gold-glow-hover"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Add to Calendar (.ICS)</span>
          </button>

          {/* REPLAY INVITATION EXPERIENCE Button */}
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-[0.2em] text-[#4A5D4E] uppercase hover:text-[#1E2D22] active:scale-95 transition-all cursor-pointer pt-0.5"
          >
            <RotateCcw className="w-3 h-3 text-[#B68D4C]" />
            <span>{closing.replayButtonText}</span>
          </button>
        </motion.div>

        {/* 3. Gratitude & Footer Block — Positioned at the Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="flex flex-col items-center w-full"
        >
          {/* Sparkle Icon */}
          <div className="flex justify-center text-[#B68D4C] mb-1.5 opacity-90">
            <Sparkles className="w-4.5 h-4.5 text-[#B68D4C]" />
          </div>

          {/* Thank You Message */}
          <p className="text-[11.5px] sm:text-[12px] text-[#3F4F3D] font-sans leading-relaxed mb-2.5 font-medium">
            Thank you for being a part of our journey and for showering us with your love, blessings, and good wishes.
          </p>

          {/* Diamond Flourish Line */}
          <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-80 my-1">
            <span className="h-[0.75px] w-8 bg-gradient-to-r from-transparent to-[#B68D4C]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B68D4C]" />
            <span className="h-[0.75px] w-8 bg-gradient-to-l from-transparent to-[#B68D4C]" />
          </div>

          {/* Wedding Hashtag */}
          <p className="text-[12.5px] sm:text-[13px] font-sans font-bold tracking-[0.26em] text-[#B68D4C] uppercase mt-2 mb-1">
            {footer.hashtag}
          </p>

          {/* Tiny Square Dot */}
          <div className="w-1 h-1 bg-[#B68D4C]/60 my-1 mx-auto" />

          {/* Copyright */}
          <p className="text-[10px] font-sans tracking-widest text-[#556B5A]/80 uppercase mt-0.5">
            &copy; {footer.year}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
