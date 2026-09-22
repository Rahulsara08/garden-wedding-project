"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { Sun, Sparkles, Music, Flame, Heart, Clock, MapPin } from "lucide-react";

export const EventsTimeline: React.FC = () => {
  return (
    <section
      id="events-section"
      className="relative w-full py-10 px-2 sm:px-4 bg-ivory paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Background Architectural Palace Wash (Subtle & Crafted) */}
      <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none select-none z-0">
        <Image
          src="/assets/illustrations/timeline_palace_bg.png"
          alt="Palace Architectural Background"
          fill
          unoptimized
          className="object-cover object-center"
        />
      </div>

      {/* Main Canvas */}
      <div className="relative w-full max-w-[420px] mx-auto flex flex-col items-center z-10">
        {/* Top Royal Indian Mehrab Arch with Hanging Lanterns */}
        <div className="relative w-full aspect-[426/160] overflow-hidden select-none pointer-events-none mb-1">
          <Image
            src="/assets/illustrations/timeline_mehrab_top.png"
            alt="Royal Indian Mehrab Arch"
            fill
            priority
            unoptimized
            className="object-contain object-top"
          />
        </div>

        {/* Section Header framed by the Mehrab Arch */}
        <div className="text-center w-full max-w-[320px] mx-auto mb-6 px-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A67C38] font-sans font-bold mb-1">
            CELEBRATIONS &amp; RITUALS
          </p>

          <h2
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight font-semibold"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            The Wedding Festivities
          </h2>

          <p className="text-xs text-sage/85 font-sans tracking-wide mt-1.5 leading-relaxed">
            Each ritual is an invocation of love, joyous melody, and auspicious grace.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* S-SHAPED TIMELINE CONTAINER */}
        {/* ========================================================================= */}
        <div className="relative w-full py-4 flex flex-col items-center">
          {/* Continuous SVG Golden S-Curve Path connecting all stages */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
            viewBox="0 0 420 1800"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 210 50 
                 C 210 100, 70 140, 70 230 
                 C 70 320, 210 380, 210 440 
                 C 210 500, 350 560, 350 650 
                 C 350 740, 210 800, 210 870 
                 C 210 940, 70 1000, 70 1090 
                 C 70 1180, 210 1230, 210 1300 
                 C 210 1370, 350 1420, 350 1500 
                 C 350 1580, 210 1640, 210 1720 
                 C 210 1760, 210 1780, 210 1800"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeOpacity="0.75"
            />
          </svg>

          {/* ---------------- DAY I BADGE ---------------- */}
          <div className="relative z-10 my-4 inline-flex items-center px-4 py-1 rounded-full bg-ivory-light/95 border border-[#C5A358]/55 shadow-xs">
            <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8D6B2C] font-sans font-bold">
              DAY I · AUSPICIOUS BEGINNINGS · THURSDAY, 11 FEBRUARY 2027
            </span>
          </div>

          {/* ---------------- 1. HALDI UTSAV (LEFT SIDE) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full my-6 flex flex-col items-center sm:items-start px-3"
          >
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-3">
              {/* Haldi Bowl Illustration on Left */}
              <div className="relative w-32 sm:w-38 aspect-[135/145] shrink-0 filter drop-shadow-sm">
                <Image
                  src="/assets/illustrations/haldi_art.png"
                  alt="Haldi Turmeric Bowl"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Event Content */}
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-gold/70 flex items-center justify-center shadow-xs">
                    <Sun className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold">
                    Haldi Utsav
                  </h3>
                </div>
                <p className="font-script italic text-base text-gold-dark">
                  Sunshine, laughter and a touch of turmeric
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 my-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <Clock className="w-3 h-3 text-gold" />
                    10:30 AM onwards
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <MapPin className="w-3 h-3 text-gold" />
                    Courtyard of Lotuses
                  </span>
                </div>

                <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                  Wear cheerful shades of turmeric yellow &amp; sunshine gold.
                </p>
                <p className="text-[10px] text-[#8D6B2C] font-sans mt-0.5">
                  <span className="font-bold uppercase">Attire:</span> Yellow &amp; Floral Traditional
                </p>

                <a
                  href="https://maps.google.com/?q=Vrindavan+Courtyard+of+Lotuses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-serif uppercase tracking-wider text-forest font-bold hover:text-gold transition-colors"
                >
                  <span>Get Directions</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------------- 2. MEHNDI KI RAAT (RIGHT SIDE) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full my-6 flex flex-col items-center sm:items-end px-3"
          >
            <div className="w-full flex flex-col sm:flex-row-reverse items-center sm:items-start gap-3">
              {/* Henna Cones Illustration on Right */}
              <div className="relative w-32 sm:w-38 aspect-[135/140] shrink-0 filter drop-shadow-sm">
                <Image
                  src="/assets/illustrations/mehndi_art.png"
                  alt="Mehndi Henna Cones"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Event Content */}
              <div className="flex-1 text-center sm:text-right flex flex-col items-center sm:items-end">
                <div className="flex items-center gap-2 mb-1 flex-row-reverse sm:flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-gold/70 flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold">
                    Mehndi Ki Raat
                  </h3>
                </div>
                <p className="font-script italic text-base text-gold-dark">
                  Intricate henna, lively music and endless happiness
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 my-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <Clock className="w-3 h-3 text-gold" />
                    04:00 PM onwards
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <MapPin className="w-3 h-3 text-gold" />
                    The Riverside Verandah
                  </span>
                </div>

                <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                  Join us for henna artistry, fresh chai, and folk songs.
                </p>
                <p className="text-[10px] text-[#8D6B2C] font-sans mt-0.5">
                  <span className="font-bold uppercase">Attire:</span> Pastel Greens &amp; Vibrant Florals
                </p>

                <a
                  href="https://maps.google.com/?q=Vrindavan+The+Riverside+Verandah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-serif uppercase tracking-wider text-forest font-bold hover:text-gold transition-colors"
                >
                  <span>Get Directions</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------------- 3. SANGEET & MUSICAL NIGHT (LEFT SIDE) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full my-6 flex flex-col items-center sm:items-start px-3"
          >
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-3">
              {/* Sitar & Tabla Illustration on Left */}
              <div className="relative w-36 sm:w-44 aspect-[135/160] shrink-0 filter drop-shadow-sm">
                <Image
                  src="/assets/illustrations/sangeet_art.png"
                  alt="Sangeet Sitar and Tabla"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Event Content */}
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-gold/70 flex items-center justify-center shadow-xs">
                    <Music className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold">
                    Sangeet &amp; Musical Night
                  </h3>
                </div>
                <p className="font-script italic text-base text-gold-dark">
                  An evening of dance, laughter, and heartwarming tunes
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 my-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <Clock className="w-3 h-3 text-gold" />
                    07:30 PM onwards
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <MapPin className="w-3 h-3 text-gold" />
                    The Royal Lotus Ballroom
                  </span>
                </div>

                <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                  Bring your dancing shoes for non-stop celebration!
                </p>
                <p className="text-[10px] text-[#8D6B2C] font-sans mt-0.5">
                  <span className="font-bold uppercase">Attire:</span> Emerald Glam &amp; Indian Evening Couture
                </p>

                <a
                  href="https://maps.google.com/?q=Vrindavan+The+Royal+Lotus+Ballroom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-serif uppercase tracking-wider text-forest font-bold hover:text-gold transition-colors"
                >
                  <span>Get Directions</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------------- DAY II BADGE ---------------- */}
          <div className="relative z-10 my-4 inline-flex items-center px-4 py-1 rounded-full bg-ivory-light/95 border border-[#C5A358]/55 shadow-xs">
            <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8D6B2C] font-sans font-bold">
              DAY II · THE SACRED VOWS · FRIDAY, 12 FEBRUARY 2027
            </span>
          </div>

          {/* ---------------- 4. BARAAT SWAGAT (RIGHT SIDE) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full my-6 flex flex-col items-center sm:items-end px-3"
          >
            <div className="w-full flex flex-col sm:flex-row-reverse items-center sm:items-start gap-3">
              {/* Royal Horse Illustration on Right */}
              <div className="relative w-36 sm:w-44 aspect-[165/240] shrink-0 filter drop-shadow-sm">
                <Image
                  src="/assets/illustrations/baraat_art.png"
                  alt="Baraat Royal Stallion"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Event Content */}
              <div className="flex-1 text-center sm:text-right flex flex-col items-center sm:items-end">
                <div className="flex items-center gap-2 mb-1 flex-row-reverse sm:flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-gold/70 flex items-center justify-center shadow-xs">
                    <Flame className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold">
                    Baraat Swagat
                  </h3>
                </div>
                <p className="font-script italic text-base text-gold-dark">
                  The groom&apos;s royal arrival, a moment to remember
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 my-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <Clock className="w-3 h-3 text-gold" />
                    04:30 PM
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <MapPin className="w-3 h-3 text-gold" />
                    Grand Palace Archway
                  </span>
                </div>

                <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                  Let the beats of dholak herald the arrival of the groom.
                </p>
                <p className="text-[10px] text-[#8D6B2C] font-sans mt-0.5">
                  <span className="font-bold uppercase">Attire:</span> Regal Indian Heritage
                </p>

                <a
                  href="https://maps.google.com/?q=Vrindavan+Grand+Palace+Archway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-serif uppercase tracking-wider text-forest font-bold hover:text-gold transition-colors"
                >
                  <span>Get Directions</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------------- 5. VIVAH SANSKAR & SAAT PHERE (LEFT SIDE) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full my-6 flex flex-col items-center sm:items-start px-3"
          >
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-3">
              {/* Vedic Mandap Illustration on Left */}
              <div className="relative w-36 sm:w-44 aspect-[180/190] shrink-0 filter drop-shadow-sm">
                <Image
                  src="/assets/illustrations/mandap_art.png"
                  alt="Vedic Wedding Mandap"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Event Content */}
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-gold/70 flex items-center justify-center shadow-xs">
                    <Heart className="w-4 h-4 text-gold fill-gold/20" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold">
                    Vivah Sanskar &amp; Saat Phere
                  </h3>
                </div>
                <p className="font-script italic text-base text-gold-dark">
                  Sacred vows around the holy fire, a bond for eternity
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 my-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <Clock className="w-3 h-3 text-gold" />
                    06:00 PM onwards
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory-light/90 text-forest text-[10px] font-sans border border-gold/25">
                    <MapPin className="w-3 h-3 text-gold" />
                    Yamuna Ghat Mandap
                  </span>
                </div>

                <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                  Followed by a royal dinner banquet under starry skies.
                </p>
                <p className="text-[10px] text-[#8D6B2C] font-sans mt-0.5">
                  <span className="font-bold uppercase">Attire:</span> Traditional Formal / Raw Silk &amp; Gold
                </p>

                <a
                  href="https://maps.google.com/?q=Vrindavan+Yamuna+Ghat+Mandap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10.5px] font-serif uppercase tracking-wider text-forest font-bold hover:text-gold transition-colors"
                >
                  <span>Get Directions</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Base: Yamuna Ghat with Lotus Flowers, Diyas, and Blessing Quote */}
        <div className="relative w-full aspect-[426/104] overflow-hidden mt-6 filter drop-shadow-sm select-none pointer-events-none">
          <Image
            src="/assets/illustrations/timeline_lake_bottom.png"
            alt="Yamuna Ghat Lotus Pond"
            fill
            unoptimized
            className="object-contain object-bottom"
          />
        </div>

        <div className="text-center mt-3 mb-6">
          <p className="text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.26em] text-[#8D6B2C] font-sans font-bold">
            SAME TRADITIONS · BRIGHTER TOMORROWS
          </p>
        </div>
      </div>
    </section>
  );
};
