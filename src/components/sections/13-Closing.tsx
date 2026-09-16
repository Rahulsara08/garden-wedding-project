"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { CornerFlourish } from "../motifs/CornerFlourish";
import { Calendar, RotateCcw, MessageSquareHeart } from "lucide-react";

interface ClosingProps {
  onReplay: () => void;
}

export const Closing: React.FC<ClosingProps> = ({ onReplay }) => {
  const { closing, couple, date } = weddingConfig;

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
    link.setAttribute("download", `${couple.brideFirstName}_and_${couple.groomFirstName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="closing-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-sm mx-auto flex flex-col items-center text-center gap-5 py-4"
        >
          <div className="flex flex-col items-center w-full pt-1">
            <p className="text-[9px] uppercase tracking-[0.22em] text-gold font-sans font-semibold mb-0.5">
              {closing.sectionEyebrow}
            </p>

            <h2
              className="text-2xl font-serif text-forest tracking-tight text-embossed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {closing.heading}
            </h2>

            <LotusDivider variant="simple" className="my-1 max-w-[120px]" />
          </div>

          <div className="my-auto py-1 flex flex-col items-center gap-3">
            <p className="text-xs text-sage/85 font-sans leading-relaxed max-w-[240px] mx-auto">
              {closing.message}
            </p>

            {/* Add to Calendar Button */}
            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-forest text-ivory font-serif tracking-widest text-[10px] uppercase hover:bg-forest-deep transition-all shadow-md gold-glow active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>

          {/* Replay Invitation Action */}
          <div className="w-full pb-1 pt-2 border-t border-gold/20">
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-serif text-forest/75 hover:text-gold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-gold" />
              <span>{closing.replayButtonText}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
