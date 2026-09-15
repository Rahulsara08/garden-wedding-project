"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";

export const FinalLoveNote: React.FC = () => {
  const { loveNote } = weddingConfig;

  return (
    <section className="relative min-h-[380px] flex flex-col items-center justify-center py-14 px-4 text-center overflow-hidden bg-ivory">
      {/* Background: Ganga River Watercolor Wave Wash */}
      <div className="absolute inset-0 pointer-events-none opacity-70 select-none">
        <Image
          src="/assets/watercolor/ganga-wave.jpg"
          alt="Ganga River Watercolor Wash"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-ivory/60" />
      </div>

      {/* Foreground Quiet Typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <LotusDivider variant="simple" className="mb-6 opacity-60" />

        <p className="font-serif italic text-base sm:text-lg text-sage mb-4 tracking-wide">
          {loveNote.signOff}
        </p>

        <h2
          className="text-3xl sm:text-4xl font-serif text-forest tracking-normal my-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {loveNote.names}
        </h2>

        <p className="font-script text-xl sm:text-2xl text-gold-dark mt-4 select-none max-w-xs mx-auto leading-relaxed">
          &ldquo;{loveNote.quote}&rdquo;
        </p>

        <div className="mt-8 flex justify-center">
          <span className="w-1.5 h-1.5 rotate-45 bg-gold/70" />
        </div>
      </motion.div>
    </section>
  );
};
