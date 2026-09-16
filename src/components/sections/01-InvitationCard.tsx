"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useGuestName } from "@/hooks/useGuestName";
import { LotusDivider } from "../motifs/LotusDivider";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";

interface InvitationCardProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onOpen, isOpen }) => {
  const { displayGreeting, hasPersonalizedName } = useGuestName();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 350);
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] h-full flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none bg-ivory paper-texture">
      {/* Soft Ambient Background Glows & Botanical Details */}
      <div className="absolute top-1/4 -left-10 w-64 h-64 rounded-full bg-[#E5EEDF]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 rounded-full bg-[#F5E8C7]/50 blur-3xl pointer-events-none" />

      {/* Main Square Acceptance Card (inspired by union-loom-web.lovable.app) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{
          opacity: isOpening ? 0 : 1,
          scale: isOpening ? 1.03 : 1,
          y: isOpening ? -8 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[325px] sm:max-w-[340px] aspect-square px-5 py-5 text-center flex flex-col justify-between items-center overflow-hidden rounded-[28px] bg-gradient-to-b from-[#FDFCF9] via-[#FAF5EF] to-[#F6ECE5] border border-gold/40 shadow-[0_16px_40px_-12px_rgba(77,104,79,0.2),0_4px_16px_-4px_rgba(182,141,76,0.15)]"
      >
        {/* Floating Confetti Flakes (per union-loom) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20 select-none" aria-hidden="true">
          <div className="absolute top-[14%] left-[10%] w-1.5 h-1 bg-[#4D684F]/60 rounded-xs rotate-12" />
          <div className="absolute top-[22%] right-[10%] w-1 h-2 bg-[#B68D4C]/70 rounded-xs -rotate-45" />
          <div className="absolute top-[38%] left-[7%] w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
          <div className="absolute top-[52%] right-[8%] w-1 h-2.5 bg-[#4D684F]/50 rounded-xs rotate-35" />
          <div className="absolute top-[68%] left-[10%] w-2 h-1 bg-[#B68D4C]/60 rounded-xs -rotate-25" />
        </div>

        {/* Inner Arched Double Hairline Border Frame */}
        <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-gold/30" />
        <div className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-gold/20 border-dashed" />

        {/* Leafy Branch Corner Accents */}
        <svg
          viewBox="0 0 140 140"
          className="pointer-events-none absolute -top-1 -left-1 w-16 h-16 text-[#4D684F]/25 fill-none stroke-current"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 10 C 40 10, 80 25, 110 60 C 125 80, 130 110, 130 130" />
          <path d="M25 14 C 18 6, 28 2, 35 10 C 40 16, 30 22, 25 14 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M48 20 C 42 10, 52 5, 60 14 C 65 20, 54 27, 48 20 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>
        <svg
          viewBox="0 0 140 140"
          className="pointer-events-none absolute -top-1 -right-1 w-16 h-16 text-[#4D684F]/25 fill-none stroke-current scale-x-[-1]"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 10 C 40 10, 80 25, 110 60 C 125 80, 130 110, 130 130" />
          <path d="M25 14 C 18 6, 28 2, 35 10 C 40 16, 30 22, 25 14 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M48 20 C 42 10, 52 5, 60 14 C 65 20, 54 27, 48 20 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>

        {/* Lake Palace / Ghat Water Reflection Line Art at Bottom of Card */}
        <svg
          viewBox="0 0 400 100"
          className="pointer-events-none absolute bottom-0 left-0 h-14 w-full text-[#4D684F]/15 fill-none stroke-current"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M0 60 Q 50 45, 100 52 T 200 40 T 300 50 T 400 45 V 100 H 0 Z" fill="currentColor" fillOpacity="0.04" />
          <path d="M160 65 V 45 H 240 V 65 M200 45 V 30 M192 30 C 192 22, 208 22, 208 30 Z" />
          <path d="M40 75 H 360" />
          <path d="M60 85 Q 100 82, 140 85 T 220 85 T 300 85" strokeDasharray="3 3" />
        </svg>

        {/* Top Header: Monogram & Couple Dancing Line Art */}
        <div className="relative z-10 flex flex-col items-center w-full pt-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[8px] uppercase tracking-[0.24em] text-forest/70 font-serif select-none">
              {weddingConfig.couple.sanskritInvocation}
            </span>
          </div>

          {/* Seal / Monogram */}
          <div className="my-1">
            <RadhaKrishnaSeal
              size={80}
              initials={weddingConfig.couple.coupleInitials}
              animated={false}
              showRays={false}
            />
          </div>

          <p className="text-[9px] uppercase tracking-[0.22em] text-gold font-sans font-medium">
            {weddingConfig.invitation.eyebrow}
          </p>
        </div>

        {/* Center: Couple Names & Date */}
        <div className="relative z-10 flex flex-col items-center w-full my-auto">
          {hasPersonalizedName && (
            <p className="font-serif italic text-[11px] text-forest/90 mb-0.5">
              {displayGreeting}
            </p>
          )}

          <h1
            className="font-serif text-2xl sm:text-[1.75rem] leading-tight text-forest font-normal"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span>{weddingConfig.couple.brideFirstName}</span>
            <span className="mx-1.5 font-script italic text-gold text-xl sm:text-2xl">
              &
            </span>
            <span>{weddingConfig.couple.groomFirstName}</span>
          </h1>

          <LotusDivider variant="diamond" className="my-1 max-w-[120px] mx-auto" />

          <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
            {weddingConfig.date.displayDate}
          </p>

          <p className="text-[9px] text-sage/80 font-sans tracking-wide mt-0.5">
            {weddingConfig.date.venue}, {weddingConfig.date.city}
          </p>
        </div>

        {/* Bottom CTA Action Button */}
        <div className="relative z-10 flex flex-col items-center w-full pb-1">
          <button
            onClick={handleOpenClick}
            className="w-full max-w-[210px] rounded-full bg-[#4D684F] hover:bg-[#3D543E] px-5 py-2.5 text-[10px] font-serif font-medium tracking-[0.2em] uppercase text-ivory transition-transform duration-300 active:scale-[0.97] shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5 gold-glow"
          >
            <span>{weddingConfig.invitation.actionButtonText}</span>
            <span className="text-gold text-xs">→</span>
          </button>

          <p className="mt-1 text-[10px] italic font-serif text-gold-dark tracking-wide select-none">
            Tap to begin our story
          </p>
        </div>
      </motion.div>
    </section>
  );
};
