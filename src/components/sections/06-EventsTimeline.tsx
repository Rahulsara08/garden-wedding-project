"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { weddingConfig, EventCeremony } from "@/config/weddingConfig";
import { SvgFollowScroll } from "../animations/SvgFollowScroll";
import { LotusDivider } from "../motifs/LotusDivider";
import { MapPin, Clock, Sparkles, Sun, Music, Flame, Heart } from "lucide-react";

export const EventsTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "haldi":
        return <Sun className="w-5 h-5 text-gold" />;
      case "mehndi":
        return <Sparkles className="w-5 h-5 text-gold" />;
      case "sangeet":
        return <Music className="w-5 h-5 text-gold" />;
      case "pheras":
        return <Heart className="w-5 h-5 text-gold fill-gold/20" />;
      case "wedding":
      default:
        return <Flame className="w-5 h-5 text-gold fill-gold/20" />;
    }
  };

  return (
    <section
      id="events-section"
      className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-lg mx-auto mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
        >
          {weddingConfig.timeline.sectionEyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.timeline.heading}
        </motion.h2>

        <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
        >
          {weddingConfig.timeline.subtitle}
        </motion.p>
      </div>

      {/* Main Timeline Container with Golden Line */}
      <div ref={containerRef} className="relative max-w-3xl mx-auto py-4">
        {/* Scroll-scrubbed SVG follow line */}
        <SvgFollowScroll containerRef={containerRef} />

        {/* Days and Events */}
        <div className="space-y-12">
          {weddingConfig.timeline.days.map((day) => (
            <div key={day.dayLabel} className="relative space-y-8">
              {/* Day Header (Card Removed - Direct on Background) */}
              <div className="flex justify-center mb-3 relative z-20">
                <div className="text-center text-xs font-serif tracking-widest uppercase text-forest font-semibold">
                  {day.dayLabel} · <span className="text-gold-dark font-sans font-medium">{day.dateString}</span>
                </div>
              </div>

              {/* Events in this day */}
              <div className="space-y-8">
                {day.events.map((event) => {
                  return (
                    <div
                      key={event.id}
                      className="relative flex flex-col items-center justify-center"
                    >
                      {/* Event Node Center Icon */}
                      <div data-timeline-icon className="w-10 h-10 mb-3 flex items-center justify-center relative z-20">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="w-10 h-10 rounded-full bg-ivory-light border-2 border-gold flex items-center justify-center shadow-md"
                        >
                          {getEventIcon(event.iconType)}
                        </motion.div>
                      </div>

                      {/* Event Content (No Boxed Card) */}
                      <div data-timeline-card className="w-full max-w-[300px] sm:max-w-[325px] mx-auto text-center">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{ duration: 0.5 }}
                          className="w-full flex flex-col items-center gap-2 py-1"
                        >
                        <div>
                          <h3 className="text-xl font-serif text-forest font-semibold">
                            {event.name}
                          </h3>

                          <p className="font-script text-base text-gold-dark mt-0.5">
                            {event.subtitle}
                          </p>
                        </div>

                        <div className="py-1">
                          {/* Chips */}
                          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory/80 text-forest text-[10px] font-sans border border-gold/25">
                              <Clock className="w-3 h-3 text-gold" />
                              {event.time}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory/80 text-forest text-[10px] font-sans border border-gold/25">
                              <MapPin className="w-3 h-3 text-gold" />
                              {event.venueName}
                            </span>
                          </div>

                          {/* Note & Dress Code */}
                          <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px] mx-auto">
                            {event.note}
                          </p>

                          {event.dressCode && (
                            <div className="mt-1 text-[10px] text-gold-dark font-sans tracking-wide">
                              <span className="font-semibold uppercase">Attire:</span> {event.dressCode}
                            </div>
                          )}
                        </div>

                        {/* Map Link */}
                        <div className="pt-1">
                          <a
                            href={event.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-serif uppercase tracking-widest text-forest hover:text-gold transition-colors font-semibold"
                          >
                            <span>Get Directions</span>
                            <span className="text-gold">→</span>
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
