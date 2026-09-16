"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { CornerFlourish } from "../motifs/CornerFlourish";
import { LotusDivider } from "../motifs/LotusDivider";
import { MapPin, Clock, Compass, ExternalLink } from "lucide-react";

export const Venue: React.FC = () => {
  const { venue } = weddingConfig;

  return (
    <section id="venue-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
          >
            {venue.sectionEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {venue.heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-2 max-w-[120px]" />
        </div>

        {/* Venue Content (No Boxed Card - Merged with Background) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-sm mx-auto flex flex-col items-center text-center gap-4 py-2"
        >
          {/* Watercolor Venue Illustration Merged with Background */}
          <div className="relative w-full max-w-[300px] h-44 sm:h-48 overflow-hidden rounded-2xl border border-gold/25 shadow-md bg-ivory">
            <Image
              src={venue.artworkImage}
              alt={venue.heading}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Details & Location */}
          <div className="w-full flex flex-col justify-center items-center px-2">
            <p className="text-xs text-sage/90 font-sans leading-relaxed max-w-[280px] mx-auto">
              {venue.description}
            </p>

            {/* Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ivory/80 text-forest text-[10px] font-sans border border-gold/30">
                <MapPin className="w-3 h-3 text-gold" />
                {venue.location}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ivory/80 text-forest text-[10px] font-sans border border-gold/30">
                <Clock className="w-3 h-3 text-gold" />
                {venue.operatingHours}
              </span>
            </div>
          </div>

          {/* Get Directions CTA */}
          <div className="pt-2">
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-forest text-ivory font-serif tracking-widest text-[10px] uppercase transition-all duration-300 hover:bg-forest-deep gold-glow active:scale-95 shadow-md"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-gold" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
