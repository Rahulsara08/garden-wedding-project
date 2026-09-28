"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { Plane, Train, Hotel } from "lucide-react";
import { AnimatedFlightPath } from "../animations/AnimatedFlightPath";
import { AnimatedTrainTrack } from "../animations/AnimatedTrainTrack";

export const TravelStay: React.FC = () => {
  const { travel } = weddingConfig;

  return (
    <section id="travel-section" className="relative pt-12 pb-6 px-3 sm:px-4 bg-[#FAF3E4] paper-texture select-none">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
          >
            {travel.sectionEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {travel.heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
          >
            {travel.subtitle}
          </motion.p>
        </div>

        {/* Getting There & Accommodations Container */}
        <div className="flex flex-col gap-6 items-center justify-center w-full max-w-sm mx-auto">
          {/* Part 1: Getting to Vrindavan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[340px] mx-auto flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-base sm:text-lg font-serif text-forest font-semibold flex items-center gap-2">
                <span>Getting to Vrindavan</span>
                <span className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shadow-2xs shrink-0">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                </span>
              </h3>
            </div>

            {/* Animated Airplane Flying Along Heart Dashed Trail */}
            <AnimatedFlightPath className="my-0.5" />

            {/* Airport & Train Info — Direct Text without Card Containers */}
            <div className="space-y-4 pt-1">
              <div className="py-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gold uppercase font-serif tracking-wider mb-0.5">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  <span>By Air</span>
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-forest font-sans">
                  {travel.nearestAirport.name}
                </p>
                <p className="text-[10.5px] text-sage/80 font-sans mt-0.5">
                  Approx. {travel.nearestAirport.distance} · {travel.nearestAirport.driveTime}
                </p>
              </div>

              {/* Train Station Info */}
              {travel.nearestStation && (
                <div className="py-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gold uppercase font-serif tracking-wider mb-1">
                    <Train className="w-3.5 h-3.5 text-gold" />
                    <span>By Train</span>
                  </div>
                  <AnimatedTrainTrack className="my-1.5" />
                  <p className="text-xs sm:text-[13px] font-semibold text-forest font-sans">
                    {travel.nearestStation.name}
                  </p>
                  <p className="text-[10.5px] text-sage/80 font-sans mt-0.5">
                    {travel.nearestStation.distance} · {travel.nearestStation.driveTime}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Section Divider between Getting There and Accommodations */}
          <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-75 my-1">
            <span className="h-[1px] w-10 bg-[#B68D4C]/40" />
            <span className="text-[8px] transform rotate-45 inline-block">◆</span>
            <span className="h-[1px] w-10 bg-[#B68D4C]/40" />
          </div>

          {/* Part 2: Accommodations with Accommodation Icon right after the written heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-[340px] mx-auto flex flex-col gap-3"
          >
            {/* Heading with Accommodation Icon placed IMMEDIATELY after the written heading */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-serif text-forest font-semibold flex items-center gap-2">
                <span>Accommodations</span>
                <span className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shadow-2xs shrink-0">
                  <Hotel className="w-3.5 h-3.5 text-gold" />
                </span>
              </h3>
            </div>

            {/* Hotel Information rendered directly without Card Containers */}
            <div className="w-full flex flex-col gap-3 pt-1">
              {travel.accommodations.map((hotel) => (
                <div
                  key={hotel.name}
                  className="w-full py-2 border-b border-gold/20 last:border-b-0 flex flex-col gap-1"
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <h4
                      className="text-xs sm:text-[13px] font-semibold text-forest font-serif"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {hotel.name}
                    </h4>
                    <span className="text-[10px] text-gold-dark font-sans font-semibold tracking-wide shrink-0 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/25">
                      {hotel.distanceFromVenue}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-sage/85 font-sans">{hotel.area}</p>
                  {hotel.note && (
                    <p className="text-[10px] text-forest/75 font-sans italic pt-0.5 mt-0.5">
                      {hotel.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[10px] text-sage/75 text-center font-sans pt-1">
              {travel.transportNote || "Pre-arranged shuttles will run between selected partner hotels and the venue."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
