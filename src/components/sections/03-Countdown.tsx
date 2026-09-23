"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";
import { SwingScrollOverlay } from "../animations/SwingScrollOverlay";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const calculateTime = () => {
      const target = new Date(weddingConfig.date.isoDateTime).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days, pad: false },
    { label: "Hours", value: timeLeft.hours, pad: true },
    { label: "Minutes", value: timeLeft.minutes, pad: true },
    { label: "Seconds", value: timeLeft.seconds, pad: true },
  ];

  return (
    <section
      id="countdown-section"
      className="relative w-full bg-ivory paper-texture pt-2 pb-10 sm:pb-14 px-0 flex flex-col items-center select-none overflow-hidden"
    >
      {/* Main Jhula & Countdown Canvas */}
      <div
        className="relative w-full mx-auto flex flex-col items-center bg-ivory overflow-hidden"
        style={{ aspectRatio: "1080 / 1920" }}
      >
        {/* Top Corner Floral Bouquets - positioned seamlessly to completely cover rope origins */}
        <div className="absolute -top-1 left-0 w-36 sm:w-44 aspect-[425/470] z-20 pointer-events-none select-none">
          <Image
            src="/assets/illustrations/jhula_corner_flower_left.png"
            alt="Top Left Corner Flowers"
            fill
            unoptimized
            className="object-contain object-top-left"
          />
        </div>

        <div className="absolute -top-1 right-0 w-36 sm:w-44 aspect-[425/470] z-20 pointer-events-none select-none">
          <Image
            src="/assets/illustrations/jhula_corner_flower_right.png"
            alt="Top Right Corner Flowers"
            fill
            unoptimized
            className="object-contain object-top-right"
          />
        </div>

        {/* Animated Jhula Swing Video Overlay - masked top and bottom so it seamlessly blends with zero hard border lines */}
        <div
          className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 35px, black calc(100% - 65px), transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 35px, black calc(100% - 65px), transparent 100%)",
          }}
        >
          <SwingScrollOverlay
            src="/assets/videos/swing-overlay.mp4"
            poster="/assets/videos/swing-overlay-poster.png"
            blendMode="normal"
            objectFit="cover"
            loops={1}
          />
        </div>

        {/* Soft Top & Bottom Seamless Blending Overlays */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-ivory to-transparent z-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-12 pointer-events-none" />

        {/* Bottom Flowers matching Reference Image (Authentic clean watercolor botanicals) */}
        <div className="absolute bottom-0 left-0 right-0 z-15 pointer-events-none select-none flex justify-between items-end px-1 sm:px-2">
          {/* Bottom Left Watercolor Wildflowers Sprig */}
          <div className="relative w-28 sm:w-36 aspect-[280/394]">
            <Image
              src="/assets/illustrations/bottom-flower-left.png"
              alt="Bottom Left Watercolor Flowers"
              fill
              unoptimized
              className="object-contain object-bottom-left"
            />
          </div>

          {/* Bottom Right Watercolor Wildflowers Sprig */}
          <div className="relative w-28 sm:w-36 aspect-[292/304]">
            <Image
              src="/assets/illustrations/bottom-flower-right.png"
              alt="Bottom Right Watercolor Flowers"
              fill
              unoptimized
              className="object-contain object-bottom-right"
            />
          </div>
        </div>

        {/* Countdown details centered in middle of swing section, right above the couple swinging */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[28%] sm:pt-[30%] px-4 pointer-events-auto">
          {/* Header copy */}
          <div className="flex flex-col items-center text-center w-full max-w-[250px] sm:max-w-[270px]">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#A67C38] font-sans font-bold mb-0.5 select-none">
              UNTIL WE SAY I DO
            </p>

            <h2
              className="font-serif italic text-xl sm:text-2xl text-forest tracking-tight leading-tight select-none"
              style={{
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              Countdown to Our Forever
            </h2>

            {/* Date info in clean golden pill badge (Image 3) */}
            <div className="my-1 sm:my-1.5">
              <div className="inline-flex items-center px-3.5 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#FFFDF9]/95 border border-[#C5A358]/55 shadow-2xs backdrop-blur-xs">
                <span className="text-[8.5px] sm:text-[9.5px] text-[#8D6B2C] font-sans tracking-[0.20em] uppercase font-bold">
                  {weddingConfig.date.displayDate} · {weddingConfig.date.city}
                </span>
              </div>
            </div>

            {/* Diamond Motif Divider (Image 3) */}
            <div className="flex items-center justify-center gap-2 my-1 w-full max-w-[130px] sm:max-w-[150px] select-none">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#B68D4C]/70" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#B68D4C] shrink-0" />
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#B68D4C]/70" />
            </div>
          </div>

          {/* Live Counter Boxes (Image 3 rounded cards) */}
          <div className="w-full max-w-[220px] sm:max-w-[245px] mt-0.5">
            {isHydrated ? (
              timeLeft.isPast ? (
                <div className="py-2 bg-[#FFFDF9]/95 rounded-2xl border border-gold/30 shadow-2xs text-center">
                  <p className="font-serif text-xs text-forest font-semibold">
                    The Celebration Has Begun!
                  </p>
                  <p className="text-[8px] text-gold uppercase tracking-widest mt-0.5 font-sans">
                    Blessings &amp; Joy All Around
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {timeUnits.map((unit) => {
                    const displayVal =
                      unit.pad && unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
                    return (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center py-2 px-1 sm:py-2.5 sm:px-1.5 rounded-2xl bg-[#FFFDF9]/95 border border-[#D4AF37]/45 shadow-xs backdrop-blur-xs"
                      >
                        <span className="text-sm sm:text-base font-serif font-bold text-forest tracking-tight leading-none">
                          {displayVal}
                        </span>
                        <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.16em] text-[#6A7862] font-sans font-bold mt-1">
                          {unit.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* Skeleton Loader */
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-11 sm:h-12 bg-ivory/80 rounded-2xl border border-gold/20 animate-pulse"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
