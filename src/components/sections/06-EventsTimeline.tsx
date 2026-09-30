"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { motion, useScroll, useSpring } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useScrollContainer } from "@/context/ScrollContainerContext";
import { LotusDivider } from "../motifs/LotusDivider";
import { MapPin, Clock, Calendar, Sparkles } from "lucide-react";

export const EventsTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const signRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathData, setPathData] = useState<string>("");
  const { containerRef: scrollContainer } = useScrollContainer();

  const days = weddingConfig.timeline.days;
  const allEvents = days.flatMap((day) => day.events);

  // Scroll Progress for active golden path drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start 65%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate dynamic SVG connecting path that weaves through each event illustration
  const calculatePath = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const coords: { x: number; y: number }[] = [];

    signRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        coords.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    });

    if (coords.length >= 2) {
      let d = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[i];
        const p1 = coords[i + 1];
        const dy = p1.y - p0.y;
        const cp1x = p0.x;
        const cp1y = p0.y + dy * 0.45;
        const cp2x = p1.x;
        const cp2y = p1.y - dy * 0.45;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      }
      setPathData(d);
    }
  }, []);

  useEffect(() => {
    calculatePath();
    const timer1 = setTimeout(calculatePath, 100);
    const timer2 = setTimeout(calculatePath, 400);

    window.addEventListener("resize", calculatePath);
    const ro = new ResizeObserver(calculatePath);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", calculatePath);
      ro.disconnect();
    };
  }, [calculatePath]);

  let globalEventCounter = 0;

  return (
    <section
      id="events-section"
      className="relative py-12 px-3 sm:px-4 bg-[#FAF3E4] paper-texture overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-lg mx-auto mb-10 sm:mb-12">
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

        <LotusDivider variant="simple" className="my-2.5 max-w-[120px]" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto leading-relaxed"
        >
          {weddingConfig.timeline.subtitle}
        </motion.p>
      </div>

      {/* Main Timeline Container with Dynamic SVG Connecting Path */}
      <div ref={containerRef} className="relative max-w-lg sm:max-w-xl mx-auto py-2">
        {/* Dynamic SVG Connecting Line Weaving Through Each Image */}
        {pathData && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="goldTimelineGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#C49A45" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F0D08A" stopOpacity="1" />
                <stop offset="100%" stopColor="#A67B28" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Faint baseline guide */}
            <path
              d={pathData}
              fill="none"
              stroke="#C49A45"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.25"
            />

            {/* Scroll-driven active golden thread */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#goldTimelineGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        )}

        {/* Days & Events */}
        <div className="space-y-12 sm:space-y-16">
          {days.map((day, dayIdx) => (
            <div key={dayIdx} className="space-y-12 sm:space-y-14">
              {/* Creative Day Banner Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center justify-center my-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E4]/95 border border-gold/40 shadow-xs backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[11px] sm:text-xs font-serif font-semibold tracking-wider text-forest uppercase">
                    {day.dayLabel}
                  </span>
                  <span className="text-gold/50">•</span>
                  <span className="text-[10px] sm:text-[11px] font-sans text-gold-dark font-medium">
                    {day.dateString}
                  </span>
                </div>
              </motion.div>

              {/* Events for this Day */}
              <div className="space-y-14 sm:space-y-18">
                {day.events.map((event) => {
                  const globalIdx = globalEventCounter++;
                  const isLeft = globalIdx % 2 === 0;

                  return (
                    <div key={event.id} className="relative w-full min-h-[150px]">
                      {/* 1. Main Event Content Block */}
                      <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col w-[58%] sm:w-[52%] max-w-[320px] ${
                          isLeft
                            ? "mr-auto items-start text-left"
                            : "ml-auto items-end text-right"
                        }`}
                      >
                        {/* Prominent Event Illustration Node */}
                        <div
                          className={`relative mb-2 flex items-center z-10 ${
                            isLeft ? "justify-start" : "justify-end"
                          }`}
                        >
                          <div
                            ref={(el) => {
                              signRefs.current[globalIdx] = el;
                            }}
                            className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
                          >
                            {/* Soft Theme Aura behind image */}
                            <div className="absolute inset-1 rounded-full bg-gold/15 blur-md pointer-events-none" />

                            <div className="relative w-full h-full">
                              <OptimizedImage
                                src={event.image || "/assets/events/event-haldi.png"}
                                alt={event.name}
                                fill
                                sizes="(max-width: 768px) 128px, 140px"
                                className="object-contain drop-shadow-[0_4px_12px_rgba(44,56,38,0.12)] select-none pointer-events-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Direct Text Layout — Tagline removed per request */}
                        <div
                          className={`w-full flex flex-col gap-1.5 z-10 py-1 ${
                            isLeft ? "items-start text-left" : "items-end text-right"
                          }`}
                        >
                          {/* Event Name */}
                          <h3
                            className="text-lg sm:text-2xl font-serif text-forest font-semibold tracking-tight text-embossed"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {event.name}
                          </h3>

                          {/* Chips: Date & Time & Venue */}
                          <div
                            className={`flex flex-wrap items-center gap-1.5 my-1 ${
                              isLeft ? "justify-start" : "justify-end"
                            }`}
                          >
                            {event.date && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF3E4]/95 text-forest text-[9.5px] sm:text-[10px] font-sans border border-gold/35 shadow-2xs">
                                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                                {event.date}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF3E4]/95 text-forest text-[9.5px] sm:text-[10px] font-sans border border-gold/35 shadow-2xs">
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                              {event.time}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF3E4]/95 text-forest text-[9.5px] sm:text-[10px] font-sans border border-gold/35 shadow-2xs">
                              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                              {event.venueName}
                            </span>
                          </div>

                          {/* Attire / Dress Code */}
                          {event.dressCode && (
                            <div className="text-[10px] sm:text-[10.5px] text-gold-dark font-sans tracking-wide">
                              <span className="font-semibold uppercase text-gold">
                                Attire:
                              </span>{" "}
                              {event.dressCode}
                            </div>
                          )}

                          {/* Directions Link */}
                          <div className="pt-0.5">
                            <a
                              href={event.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-serif uppercase tracking-widest text-forest hover:text-gold transition-colors font-semibold group"
                            >
                              <span>Get Directions</span>
                              <span className="text-gold transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </a>
                          </div>
                        </div>
                      </motion.div>

                      {/* 2. Cursive Poetic Quote floating on opposite side */}
                      {event.quote && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.8, delay: 0.15 }}
                          className={`absolute top-2 sm:top-6 w-[42%] sm:w-[46%] max-w-[220px] pointer-events-none z-10 flex flex-col ${
                            isLeft
                              ? "right-0 items-start text-left pl-2 sm:pl-4"
                              : "left-0 items-end text-right pr-2 sm:pr-4"
                          }`}
                        >
                          <p
                            className="font-script text-lg sm:text-2xl text-[#B68D4C] leading-snug tracking-wide font-normal"
                            style={{
                              fontFamily: "var(--font-script), cursive",
                              textShadow: "0 1px 2px rgba(182, 141, 76, 0.15)",
                            }}
                          >
                            {event.quote}
                          </p>
                          {/* Delicate Golden Heart & Stem Motif */}
                          <div
                            className={`mt-1 flex items-center gap-1 text-[#C49A45]/80 ${
                              isLeft ? "justify-start" : "justify-end"
                            }`}
                          >
                            <svg
                              className="w-3.5 h-3.5 text-[#C49A45]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            <span className="w-8 h-[1px] bg-gradient-to-r from-[#C49A45]/40 to-transparent" />
                          </div>
                        </motion.div>
                      )}
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
