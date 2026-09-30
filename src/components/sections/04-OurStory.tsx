"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

// Delicate Hand-drawn Heart Doodle
const HandDrawnHeart: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#8C7A68]",
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 26.5 C14.5 23 5.5 17 4.5 11.5 C3.8 6 9.5 4.5 13.5 7.5 C14.8 8.6 16 10.5 16 10.5 C16 10.5 17.2 8.6 18.5 7.5 C22.5 4.5 28.2 6 27.5 11.5 C26.5 17 17.5 23 16 26.5 Z" />
  </svg>
);

// Antique Botanical Blossom Flourish Icon
const FloralFlourishIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5 text-[#B68D4C]",
}) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="3.2" fill="#B68D4C" />
    <path
      d="M16 4 C17.5 9 17.5 11 16 12.8 C14.5 11 14.5 9 16 4 Z"
      fill="#B68D4C"
      opacity="0.9"
    />
    <path
      d="M16 28 C17.5 23 17.5 21 16 19.2 C14.5 21 14.5 23 16 28 Z"
      fill="#B68D4C"
      opacity="0.9"
    />
    <path
      d="M4 16 C9 17.5 11 17.5 12.8 16 C11 14.5 9 14.5 4 16 Z"
      fill="#B68D4C"
      opacity="0.9"
    />
    <path
      d="M28 16 C23 17.5 21 17.5 19.2 16 C21 14.5 23 14.5 28 16 Z"
      fill="#B68D4C"
      opacity="0.9"
    />
    <path
      d="M7.5 7.5 C11.5 10.5 12.5 12 13.5 13.5 C12 12.5 10.5 11.5 7.5 7.5 Z"
      fill="#B68D4C"
      opacity="0.75"
    />
    <path
      d="M24.5 7.5 C20.5 10.5 19.5 12 18.5 13.5 C20 12.5 21.5 11.5 24.5 7.5 Z"
      fill="#B68D4C"
      opacity="0.75"
    />
    <path
      d="M7.5 24.5 C11.5 21.5 12.5 20 13.5 18.5 C12 19.5 10.5 20.5 7.5 24.5 Z"
      fill="#B68D4C"
      opacity="0.75"
    />
    <path
      d="M24.5 24.5 C20.5 21.5 19.5 20 18.5 18.5 C20 19.5 21.5 20.5 24.5 24.5 Z"
      fill="#B68D4C"
      opacity="0.75"
    />
  </svg>
);

// Milestone Divider with Warm Terracotta Heart
const MilestoneDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 my-7 sm:my-8 pointer-events-none select-none">
    <div className="h-[0.75px] w-12 bg-gradient-to-r from-transparent via-[#C6B6A0] to-[#B8A68E]" />
    <svg className="w-3.5 h-3.5 text-[#B85D43] fill-current opacity-85" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <div className="h-[0.75px] w-12 bg-gradient-to-l from-transparent via-[#C6B6A0] to-[#B8A68E]" />
  </div>
);

export const OurStory: React.FC = () => {
  const { moments } = weddingConfig.story;

  return (
    <section
      id="story-section"
      className="relative w-full pt-4 pb-8 sm:pb-12 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Seamless Soft Top & Bottom Blends to Adjacent Sections */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-t from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-20 pointer-events-none" />

      {/* Decorative Botanical Foliage in Ambient Background */}
      <div className="absolute top-2 right-0 w-32 h-44 opacity-25 pointer-events-none select-none z-0">
        <Image
          src="/assets/illustrations/bottom-flower-right.png"
          alt=""
          fill
          className="object-contain object-top-right filter blur-[0.3px]"
          sizes="128px"
        />
      </div>
      <div className="absolute top-[35%] -left-6 w-32 h-44 opacity-20 pointer-events-none select-none z-0 -scale-x-100">
        <Image
          src="/assets/illustrations/bottom-flower-left.png"
          alt=""
          fill
          className="object-contain object-top-left filter blur-[0.3px]"
          sizes="128px"
        />
      </div>
      <div className="absolute bottom-6 right-0 w-32 h-44 opacity-20 pointer-events-none select-none z-0">
        <Image
          src="/assets/illustrations/bottom-flower-right.png"
          alt=""
          fill
          className="object-contain object-bottom-right filter blur-[0.3px]"
          sizes="128px"
        />
      </div>

      {/* Ambient Floating Rose & Jasmine Petals Micro-Animation */}
      <div className="absolute inset-0 pointer-events-none select-none z-15 overflow-hidden">
        {[
          { left: "10%", delay: 0, duration: 10, size: 9, rotate: 25 },
          { left: "84%", delay: 2.5, duration: 12, size: 7, rotate: -35 },
          { left: "25%", delay: 4.8, duration: 11, size: 8, rotate: 45 },
          { left: "75%", delay: 7.2, duration: 13, size: 6.5, rotate: -20 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0, x: 0 }}
            animate={{
              y: ["0%", "1200%"],
              opacity: [0, 0.75, 0.85, 0.4, 0],
              x: [0, 15, -12, 10, 0],
              rotate: [petal.rotate, petal.rotate + 180],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            style={{ left: petal.left }}
            className="absolute top-0 pointer-events-none"
          >
            <div
              style={{ width: petal.size, height: petal.size * 1.5 }}
              className="rounded-full bg-gradient-to-br from-[#EBB1B8]/80 to-[#D48993]/50 blur-[0.4px] shadow-xs"
            />
          </motion.div>
        ))}
      </div>

      {/* Section Top Header: Handcrafted Master Quote */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4 pt-6 sm:pt-8 pb-4 max-w-[340px] sm:max-w-md mx-auto"
      >
        <h2 className="font-serif italic font-semibold text-[17px] sm:text-[19px] leading-[1.35] text-[#2C3826] tracking-tight text-embossed">
          Some stories are known...,
          <br />
          <span className="font-bold text-[#232D1E]">
            but ours is our endless favorite.
          </span>
        </h2>

        {/* Golden Botanical Blossom Motif */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <FloralFlourishIcon className="w-5 h-5 text-gold/90 animate-pulse duration-1000" />
        </div>
      </motion.div>

      {/* Chronological Love Story Milestones */}
      <div className="relative z-10 w-full max-w-[390px] sm:max-w-[420px] px-2 sm:px-4 flex flex-col items-center">
        {moments.map((moment, index) => (
          <React.Fragment key={moment.id}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full flex flex-col items-center mt-2"
            >
              {/* 1. Date & Milestone Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D5C4AD] bg-[#FAF3E4]/95 shadow-[0_1px_4px_rgba(44,56,38,0.06)] backdrop-blur-xs">
                <Calendar className="w-3 h-3 text-[#9E6746]" />
                <span className="text-[10px] sm:text-[10.5px] font-sans font-medium tracking-[0.16em] uppercase text-[#5C4D3F]">
                  {moment.badgeMonth || moment.date}
                  <span className="opacity-40 mx-1.5">•</span>
                  {moment.badgeLabel || "MOMENT"}
                </span>
                <svg
                  className="w-2.5 h-2.5 text-[#B85D43] fill-current ml-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* 2. Milestone Heading Title */}
              <h3 className="font-serif text-[23px] sm:text-[26px] font-normal text-[#2C3826] tracking-tight mt-2 mb-3 text-center text-embossed">
                {moment.title}
              </h3>

              {/* 3. Circular Art Medallion & Handwritten Journal Notes */}
              <div className="relative w-full flex items-center justify-center my-1">
                {/* Organic Handwritten Script Note (Left) */}
                {moment.notes?.left && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, rotate: -9 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="absolute left-1 sm:left-3 top-8 sm:top-12 z-20 pointer-events-none select-none text-left max-w-[85px] sm:max-w-[100px]"
                  >
                    <p className="font-journal text-[#827464] text-[17px] sm:text-[19px] leading-[1.15] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {moment.notes.left.map((line, lIdx) => (
                        <span key={lIdx} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </p>
                    <div className="mt-1 ml-2.5">
                      <HandDrawnHeart className="w-4 h-4 text-[#8C7A68]" />
                    </div>
                  </motion.div>
                )}

                {/* Organic Handwritten Script Note (Right) — e.g. for Chai Moment */}
                {moment.notes?.right && (
                  <motion.div
                    initial={{ opacity: 0, x: 12, rotate: 9 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="absolute right-1 sm:right-3 top-20 sm:top-24 z-20 pointer-events-none select-none text-right max-w-[90px] sm:max-w-[105px]"
                  >
                    <p className="font-journal text-[#827464] text-[17px] sm:text-[19px] leading-[1.15] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {moment.notes.right.map((line, rIdx) => (
                        <span key={rIdx} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </p>
                    <div className="mt-1 mr-2.5 flex justify-end">
                      <HandDrawnHeart className="w-4 h-4 text-[#8C7A68]" />
                    </div>
                  </motion.div>
                )}

                {/* High-Definition Master Watercolor Circular Medallion */}
                <div className="relative w-[285px] h-[285px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
                  <div className="relative w-full h-full mix-blend-multiply [mask-image:radial-gradient(circle_at_center,black_64%,transparent_72%)]">
                    <Image
                      src={moment.photo}
                      alt={moment.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 320px, 360px"
                      className="object-contain select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Poetic Quote Caption */}
              <p className="font-serif italic font-medium text-[13px] sm:text-[14px] text-[#344030] text-center max-w-[280px] sm:max-w-xs mx-auto mt-2 leading-relaxed">
                {moment.quote}
              </p>
            </motion.div>

            {/* Separator Divider between moments */}
            {index < moments.length - 1 && <MilestoneDivider />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
