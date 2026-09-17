"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StoryMoment } from "@/config/weddingConfig";

interface CardStackScrollProps {
  moments: StoryMoment[];
}

export const CardStackScroll: React.FC<CardStackScrollProps> = ({ moments }) => {
  return (
    <div className="flex flex-col items-center gap-10 sm:gap-14 max-w-xl mx-auto px-2 py-4">
      {moments.map((moment, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-[320px] mx-auto flex flex-col items-center text-center"
          >
            {/* Photo merged into background with soft blend */}
            <div className="relative w-full max-w-[280px] h-48 sm:h-52 overflow-hidden rounded-2xl shadow-md border border-gold/30">
              <Image
                src={moment.photo}
                alt={moment.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Caption area directly on background */}
            <div className="w-full flex flex-col justify-center items-center px-2 pt-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold">
                  {moment.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-gold/50" />
                <span className="text-[11px] uppercase tracking-widest text-forest font-serif font-semibold">
                  {moment.title}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

