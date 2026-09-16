"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollContainerProvider } from "@/context/ScrollContainerContext";

interface PhoneMockupFrameProps {
  children: (scrollContainerRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
  preloader?: React.ReactNode;
}

export const PhoneMockupFrame: React.FC<PhoneMockupFrameProps> = ({ children, preloader }) => {
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // When on an actual mobile device (< 768px), fill the screen edge-to-edge
  const showPhoneFrame = !isMobileScreen;

  return (
    <ScrollContainerProvider
      containerRef={showPhoneFrame ? phoneScrollRef : null}
      isFramed={showPhoneFrame}
    >
      <div className="relative min-h-screen w-full bg-ivory flex flex-col items-center justify-center selection:bg-gold/20 selection:text-forest overflow-x-hidden">
        {/* Desktop Ambient Animated Flowers & Birds Wallpaper Background */}
        {showPhoneFrame && (
          <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
            {/* Animated Floating Wallpaper */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                x: [0, -14, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/assets/watercolor/flowers-birds-wallpaper.jpg"
                alt="Royal Vrindavan Flowers and Birds Watercolor Wallpaper"
                fill
                className="object-cover object-center filter brightness-[0.99] contrast-[1.02]"
                priority
                unoptimized
              />
            </motion.div>

            {/* Subtle Overlay Tint */}
            <div className="absolute inset-0 bg-[#F6EEDD]/15 backdrop-blur-[0.5px]" />

            {/* Animated Drifting Songbird 1 (Top Left to Right) */}
            <motion.div
              initial={{ x: "-10vw", y: "15vh", opacity: 0 }}
              animate={{
                x: ["-5vw", "105vw"],
                y: ["15vh", "22vh", "12vh"],
                opacity: [0, 0.65, 0.7, 0],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute pointer-events-none z-1 text-forest/40"
            >
              <svg viewBox="0 0 40 25" className="w-8 h-5 fill-current">
                <path d="M0 12 C 10 5, 20 12, 25 10 C 30 8, 35 2, 40 0 C 36 8, 30 18, 22 20 C 14 22, 5 18, 0 12 Z" />
              </svg>
            </motion.div>

            {/* Animated Drifting Songbird 2 (Top Right to Left) */}
            <motion.div
              initial={{ x: "105vw", y: "35vh", opacity: 0 }}
              animate={{
                x: ["105vw", "-10vw"],
                y: ["35vh", "28vh", "38vh"],
                opacity: [0, 0.5, 0.6, 0],
              }}
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 10,
              }}
              className="absolute pointer-events-none z-1 text-forest/35 -scale-x-100"
            >
              <svg viewBox="0 0 40 25" className="w-7 h-4 fill-current">
                <path d="M0 12 C 10 5, 20 12, 25 10 C 30 8, 35 2, 40 0 C 36 8, 30 18, 22 20 C 14 22, 5 18, 0 12 Z" />
              </svg>
            </motion.div>

            {/* Floating Petals Drifting Downward */}
            {[
              { left: "12%", delay: 0, duration: 18, scale: 0.8 },
              { left: "32%", delay: 6, duration: 22, scale: 1.1 },
              { left: "68%", delay: 3, duration: 20, scale: 0.9 },
              { left: "86%", delay: 9, duration: 24, scale: 1.0 },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
                animate={{
                  y: ["-5vh", "110vh"],
                  x: [0, idx % 2 === 0 ? 40 : -40, 0],
                  rotate: [0, idx % 2 === 0 ? 180 : -180],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                }}
                style={{ left: p.left }}
                className="absolute top-0 text-gold-dark/40 pointer-events-none z-1"
              >
                <svg viewBox="0 0 20 28" className="w-3.5 h-5 fill-current">
                  <path d="M10 0 C 18 10, 20 20, 10 28 C 0 20, 2 10, 10 0 Z" opacity="0.6" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}

        {/* Smartphone Chassis Container (Desktop) OR Native Full View (Mobile) */}
        {showPhoneFrame ? (
          <div className="relative z-10 my-3 md:my-5 flex items-center justify-center">
            {/* Outer Smartphone Frame (iPhone Pro style titanium casing) */}
            <div
              className="relative w-[375px] sm:w-[390px] md:w-[412px] h-[820px] sm:h-[850px] md:h-[870px] max-h-[96vh] bg-[#1E2420] rounded-[52px] p-3 shadow-2xl border-[3px] border-[#2C362F]"
              style={{
                boxShadow:
                  "0 35px 80px -15px rgba(25, 32, 26, 0.45), 0 0 45px rgba(182, 141, 76, 0.15), inset 0 0 4px rgba(255,255,255,0.15)",
              }}
            >
              {/* Left Side Buttons (Volume & Mute) */}
              <div className="absolute -left-[5px] top-28 w-[3px] h-8 bg-[#181D1A] rounded-l-xs" />
              <div className="absolute -left-[5px] top-40 w-[3px] h-12 bg-[#181D1A] rounded-l-xs" />
              <div className="absolute -left-[5px] top-56 w-[3px] h-12 bg-[#181D1A] rounded-l-xs" />

              {/* Right Side Button (Power) */}
              <div className="absolute -right-[5px] top-44 w-[3px] h-16 bg-[#181D1A] rounded-r-xs" />

              {/* Inner Screen Bezel */}
              <div className="relative w-full h-full bg-ivory rounded-[42px] overflow-hidden flex flex-col border border-gold/15">
                {/* Preloader / Seal Screen Overlay inside Phone Chassis */}
                {preloader}

                {/* Top Dynamic Island Pill */}
                <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-center pointer-events-none select-none">
                  <div className="flex items-center justify-between px-3 w-28 h-6 bg-black rounded-full shadow-md">
                    {/* Camera lens */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F26] border border-white/10 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#283850]" />
                    </div>
                    {/* Sensor dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A1F26]" />
                  </div>
                </div>

                {/* Inner Scrollable Website Container */}
                <div
                  ref={phoneScrollRef}
                  className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden pt-0 pb-4 select-text scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {children(phoneScrollRef)}
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-0 right-0 flex justify-center pointer-events-none select-none z-50">
                  <div className="w-32 h-1 bg-forest/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Native Full Screen View on Actual Mobile Devices */
          <div className="relative w-full min-h-screen flex-1 overflow-x-hidden">
            {preloader}
            {children(phoneScrollRef)}
          </div>
        )}
      </div>
    </ScrollContainerProvider>
  );
};
