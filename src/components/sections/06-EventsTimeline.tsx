"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useScrollContainer } from "@/context/ScrollContainerContext";
import { LotusDivider } from "../motifs/LotusDivider";
import { GoldenLeafDivider } from "../motifs/GoldenLeafDivider";
import { MapPin, Clock, Sparkles, Sun, Music, Flame, Heart } from "lucide-react";

interface EventSignBadgeProps {
  iconType: string;
  isLeft: boolean;
  index: number;
}

const EventSignBadge: React.FC<EventSignBadgeProps> = ({ iconType, index }) => {
  const renderIcon = () => {
    switch (iconType) {
      case "haldi":
        return (
          <motion.div
            animate={{ rotate: [0, 14, 0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sun className="w-5 h-5 text-gold transition-colors" />
          </motion.div>
        );
      case "mehndi":
        return (
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-gold transition-colors" />
          </motion.div>
        );
      case "sangeet":
        return (
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Music className="w-5 h-5 text-gold transition-colors" />
          </motion.div>
        );
      case "pheras":
        return (
          <motion.div
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5 text-gold fill-gold/20 transition-colors" />
          </motion.div>
        );
      case "wedding":
      default:
        return (
          <motion.div
            animate={{ scale: [1, 1.12, 1], y: [0, -1.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="w-5 h-5 text-gold fill-gold/20 transition-colors" />
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-12 h-12 flex items-center justify-center select-none">
      {/* Outer Ethereal Ripple Ring (Emits when entering view) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{
          scale: [0.9, 1.45, 1.6],
          opacity: [0.75, 0.35, 0],
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: index * 0.15,
        }}
        className="absolute inset-0 rounded-full border border-gold/40 pointer-events-none"
      />

      {/* Subtle Ambient Golden Glow Behind Sign */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.45, scale: 1.15 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="absolute -inset-1 rounded-full bg-gold/20 blur-xs pointer-events-none"
      />

      {/* Main Circular Sign Container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20,
          delay: 0.05,
        }}
        className="relative w-11 h-11 rounded-full bg-[#FAF3E4] border-[1.5px] border-gold/75 flex items-center justify-center shadow-md overflow-hidden z-10"
      >
        {/* Animated Radial Golden Veil Covering the Sign on Scroll */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1.3, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(235, 195, 105, 0.45) 0%, rgba(196, 154, 69, 0.22) 65%, transparent 100%)",
          }}
        />

        {/* Diagonal Light Shimmer Sweep Across the Sign Disc */}
        <motion.div
          initial={{ x: "-120%" }}
          whileInView={{ x: "120%" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none -skew-x-12"
        />

        {/* Animated Perimeter Golden Stroke Covering the Border */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10"
          viewBox="0 0 44 44"
        >
          <motion.circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeDasharray="125.6"
            initial={{ strokeDashoffset: 125.6 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          />
        </svg>

        {/* The Sign Icon */}
        <div className="relative z-20 flex items-center justify-center">
          {renderIcon()}
        </div>
      </motion.div>
    </div>
  );
};

export const EventsTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const signRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathData, setPathData] = useState<string>("");
  const { containerRef: scrollContainer } = useScrollContainer();

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

  // Calculate dynamic SVG connecting path that weaves behind each sign
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
    const timer1 = setTimeout(calculatePath, 80);
    const timer2 = setTimeout(calculatePath, 350);

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

  // Flatten events with alternating left/right layout:
  // Event 1 (Haldi) -> Left
  // Event 2 (Mehndi) -> Right
  // Event 3 (Sangeet) -> Left
  // Event 4 (Baraat) -> Right
  // Event 5 (Vivah) -> Left

  return (
    <section
      id="events-section"
      className="relative py-8 px-2 sm:px-4 bg-[#FAF3E4] paper-texture overflow-hidden select-none"
    >
      {/* Section Header Card: User Provided Image 1 replacing Wedding Festivities heading and Day 1 heading */}
      <div className="relative w-full max-w-lg mx-auto mb-2 px-0">
        <div className="relative w-full aspect-[1024/668] overflow-hidden">
          <Image
            src="/assets/watercolor/wedding-festivities-header.png"
            alt="Celebrations & Rituals - The Wedding Festivities - Day 1 Auspicious Beginnings"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 540px"
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Main Timeline Container with Dynamic SVG Connecting Line */}
      <div ref={containerRef} className="relative max-w-md mx-auto py-2">
        {/* Dynamic SVG Connecting Thread Behind the Signs */}
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
                <stop offset="0%" stopColor="#C49A45" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#F0D08A" stopOpacity="1" />
                <stop offset="100%" stopColor="#A67B28" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Faint baseline guide */}
            <path
              d={pathData}
              fill="none"
              stroke="#C49A45"
              strokeWidth="1.5"
              strokeDasharray="3 5"
              opacity="0.22"
            />

            {/* Scroll-driven active golden path */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#goldTimelineGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        )}

        {/* Days and Events */}
        <div className="space-y-12">
          {weddingConfig.timeline.days.map((day, dayIndex) => {
            const dayOffset =
              dayIndex === 0
                ? 0
                : weddingConfig.timeline.days
                    .slice(0, dayIndex)
                    .reduce((acc, d) => acc + d.events.length, 0);

            return (
              <div key={day.dayLabel} className="relative">
                {/* Day Header - Only for Day 2 onwards (Day 1 is already in the header card) */}
                {dayIndex > 0 && (
                  <div className="flex justify-center mb-6 relative z-10">
                    <div className="px-4 py-1 rounded-full bg-[#FAF3E4]/95 border border-[#C5A358]/40 shadow-2xs backdrop-blur-xs text-center">
                      <span className="text-xs font-serif tracking-widest uppercase text-forest font-semibold">
                        {day.dayLabel}
                      </span>
                      <span className="mx-1.5 text-gold">·</span>
                      <span className="text-xs text-gold-dark font-sans font-medium">
                        {day.dateString}
                      </span>
                    </div>
                  </div>
                )}

                {/* Events in this day */}
                <div className="space-y-12">
                  {day.events.map((event, eventIdx) => {
                    const globalIdx = dayOffset + eventIdx;
                    // Left / Right alternation:
                    // 0 (Haldi): Left
                    // 1 (Mehndi): Right
                    // 2 (Sangeet): Left
                    // 3 (Baraat): Right
                    // 4 (Vivah): Left
                    const isLeft = globalIdx % 2 === 0;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.55 }}
                      className={`relative flex flex-col w-[86%] sm:w-[82%] max-w-[310px] ${
                        isLeft
                          ? "mr-auto pl-2 pr-1 items-start text-left"
                          : "ml-auto pr-2 pl-1 items-end text-right"
                      }`}
                    >
                      {/* Event Sign Badge (Positioned Left or Right) */}
                      <div
                        className={`relative mb-2 flex items-center z-10 ${
                          isLeft ? "justify-start pl-1" : "justify-end pr-1"
                        }`}
                      >
                        <div
                          ref={(el) => {
                            signRefs.current[globalIdx] = el;
                          }}
                        >
                          <EventSignBadge
                            iconType={event.iconType}
                            isLeft={isLeft}
                            index={globalIdx}
                          />
                        </div>
                      </div>

                      {/* Event Content (Left-aligned or Right-aligned, completely uncovered) */}
                      <div
                        className={`w-full flex flex-col gap-1.5 ${
                          isLeft
                            ? "items-start text-left pl-1"
                            : "items-end text-right pr-1"
                        }`}
                      >
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif text-forest font-semibold tracking-tight text-embossed">
                            {event.name}
                          </h3>

                          <p className="font-script text-base sm:text-lg text-gold-dark -mt-0.5">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Chips */}
                        <div
                          className={`flex flex-wrap items-center gap-1.5 my-1 ${
                            isLeft ? "justify-start" : "justify-end"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory/90 text-forest text-[10px] font-sans border border-gold/25 shadow-2xs">
                            <Clock className="w-3 h-3 text-gold" />
                            {event.time}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ivory/90 text-forest text-[10px] font-sans border border-gold/25 shadow-2xs">
                            <MapPin className="w-3 h-3 text-gold" />
                            {event.venueName}
                          </span>
                        </div>

                        {/* Note */}
                        <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[260px]">
                          {event.note}
                        </p>

                        {/* Dress Code */}
                        {event.dressCode && (
                          <div className="text-[10px] text-gold-dark font-sans tracking-wide">
                            <span className="font-semibold uppercase text-gold">
                              Attire:
                            </span>{" "}
                            {event.dressCode}
                          </div>
                        )}

                        {/* Directions Link */}
                        <div className="pt-1">
                          <a
                            href={event.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-serif uppercase tracking-widest text-forest hover:text-gold transition-colors font-semibold group"
                          >
                            <span>Get Directions</span>
                            <span
                              className={`text-gold transition-transform ${
                                isLeft
                                  ? "group-hover:translate-x-0.5"
                                  : "group-hover:translate-x-0.5"
                              }`}
                            >
                              →
                            </span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Section Breaker Divider Motif (Image 5) */}
      <div className="w-full pt-6 pb-2 flex justify-center z-20">
        <GoldenLeafDivider />
      </div>
    </section>
  );
};
