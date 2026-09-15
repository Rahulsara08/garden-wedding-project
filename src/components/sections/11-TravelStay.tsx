"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { Plane, Train, Hotel, Clock } from "lucide-react";
import { AnimatedFlightPath } from "../animations/AnimatedFlightPath";
import { AnimatedTrainTrack } from "../animations/AnimatedTrainTrack";

export const TravelStay: React.FC = () => {
  const { travel } = weddingConfig;

  return (
    <section id="travel-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture">
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
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight"
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

        {/* Getting There vs Where to Stay (Direct on Background - No Boxed Cards) */}
        <div className="flex flex-col gap-8 items-center justify-center w-full max-w-sm mx-auto">
          {/* Part 1: Getting There */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] mx-auto flex flex-col gap-3 py-1"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                <Plane className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-serif text-forest font-semibold">
                Getting to Vrindavan
              </h3>
            </div>

            {/* Animated Airplane Flying Along Heart Dashed Trail */}
            <AnimatedFlightPath className="my-1" />

            {/* Airport & Train Info (No Boxed Cards - Direct on Background) */}
            <div className="space-y-3 pt-1">
              <div className="py-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-forest uppercase font-serif tracking-wider mb-1">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  <span>By Air</span>
                </div>
                <p className="text-xs font-medium text-forest font-sans">
                  {travel.nearestAirport.name}
                </p>
                <p className="text-[10px] text-sage/80 font-sans mt-0.5">
                  {travel.nearestAirport.distance} · {travel.nearestAirport.driveTime}
                </p>
              </div>

              {/* Train Station Info */}
              {travel.nearestStation && (
                <div className="py-1 border-t border-gold/15 pt-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-forest uppercase font-serif tracking-wider mb-1">
                    <Train className="w-3.5 h-3.5 text-gold" />
                    <span>By Train</span>
                  </div>
                  <AnimatedTrainTrack className="my-1.5" />
                  <p className="text-xs font-medium text-forest font-sans">
                    {travel.nearestStation.name}
                  </p>
                  <p className="text-[10px] text-sage/80 font-sans mt-0.5">
                    {travel.nearestStation.distance} · {travel.nearestStation.driveTime}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Part 2: Where to Stay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-[320px] mx-auto flex flex-col gap-3 py-1"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                <Hotel className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-serif text-forest font-semibold">
                Accommodations
              </h3>
            </div>

            {/* Single Unique Heritage Fort / Hotel Artwork below Accommodations heading */}
            <div className="relative w-full h-36 sm:h-40 overflow-hidden rounded-2xl border border-gold/25 shadow-md bg-ivory my-1">
              <Image
                src="/assets/watercolor/royal-palace-suite.jpg"
                alt="Royal Palace Suites Accommodations in Vrindavan"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clean Hotel Information Cards (Same as before, zero duplicate photos) */}
            <div className="space-y-2">
              {travel.accommodations.map((hotel) => (
                <div key={hotel.name} className="p-2.5 rounded-xl bg-ivory/80 border border-gold/20 shadow-xs">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-semibold text-forest font-serif">
                      {hotel.name}
                    </h4>
                    <span className="text-[9px] text-gold font-sans font-medium px-1.5 py-0.5 rounded-full bg-gold/10">
                      {hotel.distanceFromVenue}
                    </span>
                  </div>
                  <p className="text-[10px] text-sage/80 font-sans mt-0.5">{hotel.area}</p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-sage/75 text-center font-sans pt-1">
              Assistance needed? Reach out to our hospitality desk.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
