"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";

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
      className="relative w-full bg-ivory paper-texture pt-0 pb-8 px-0 flex flex-col items-center select-none overflow-visible"
    >
      {/* Main Jhula & Countdown Canvas - Full width to mobile screen */}
      <div
        className="relative w-full max-w-[440px] mx-auto flex flex-col items-center"
        style={{ aspectRatio: "923 / 1006" }}
      >
        {/* Top-Left Real Watercolor Floral Corner (Attaches seamlessly to top left swing rope) */}
        <div className="absolute -top-3 -left-3 sm:-left-5 w-28 sm:w-36 aspect-square z-15 pointer-events-none select-none">
          <Image
            src="/assets/illustrations/floral-corner-left.png"
            alt="Top Left Floral Corner"
            fill
            className="object-contain object-top-left"
          />
        </div>

        {/* Top-Right Real Watercolor Floral Corner (Attaches seamlessly to top right swing rope) */}
        <div className="absolute -top-3 -right-3 sm:-right-5 w-28 sm:w-36 aspect-square z-15 pointer-events-none select-none">
          <Image
            src="/assets/illustrations/floral-corner-right.png"
            alt="Top Right Floral Corner"
            fill
            className="object-contain object-top-right"
          />
        </div>

        {/* Clean Jhula Swing Couple (High-res original with floral ropes) */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Image
            src="/assets/illustrations/couple-jhula-transparent.png"
            alt="Couple on Floral Jhula Swing"
            fill
            priority
            className="object-contain object-top"
          />
        </div>

        {/* Bottom Flowers matching Reference Image 2 (Bottom Left & Right Watercolor Botanical Sprigs) */}
        <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 z-15 pointer-events-none select-none flex justify-between items-end px-0">
          {/* Bottom Left Watercolor Wildflowers Sprig */}
          <div className="relative w-36 sm:w-48 aspect-[220/214] -ml-2 sm:-ml-4 -mb-1">
            <Image
              src="/assets/illustrations/bottom-flower-left.png"
              alt="Bottom Left Watercolor Flowers"
              fill
              unoptimized
              className="object-contain object-bottom-left"
            />
          </div>

          {/* Bottom Right Watercolor Wildflowers Sprig */}
          <div className="relative w-40 sm:w-52 aspect-[250/184] -mr-2 sm:-mr-4 -mb-1">
            <Image
              src="/assets/illustrations/bottom-flower-right.png"
              alt="Bottom Right Watercolor Flowers"
              fill
              unoptimized
              className="object-contain object-bottom-right"
            />
          </div>
        </div>

        {/* Countdown details layered in open space between the two floral ropes with ample margin */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-7 sm:pt-9 px-4 pointer-events-auto">
          {/* Header copy */}
          <div className="flex flex-col items-center text-center w-full max-w-[230px] sm:max-w-[250px]">
            <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] text-gold font-sans font-semibold mb-0.5">
              UNTIL WE SAY I DO
            </p>

            <h2
              className="font-script text-xl sm:text-2xl text-forest text-embossed leading-tight"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
              }}
            >
              Countdown to Our Forever
            </h2>

            <LotusDivider variant="simple" className="my-1 max-w-[95px] sm:max-w-[115px]" />
          </div>

          {/* Live Counter Boxes - Perfectly sized with generous clearance from the ropes */}
          <div className="w-full max-w-[216px] sm:max-w-[236px] my-1.5 sm:my-2">
            {isHydrated ? (
              timeLeft.isPast ? (
                <div className="py-2 bg-ivory/95 rounded-xl border border-gold/30 shadow-2xs text-center">
                  <p className="font-serif text-xs text-forest font-semibold">
                    The Celebration Has Begun!
                  </p>
                  <p className="text-[8px] text-gold uppercase tracking-widest mt-0.5 font-sans">
                    Blessings & Joy All Around
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                  {timeUnits.map((unit) => {
                    const displayVal =
                      unit.pad && unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
                    return (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-0.5 rounded-xl bg-ivory/95 border border-gold/35 shadow-xs backdrop-blur-xs"
                      >
                        <span className="text-sm sm:text-base font-serif text-forest font-bold tracking-tight">
                          {displayVal}
                        </span>
                        <span className="text-[6.5px] sm:text-[7.5px] uppercase tracking-wider text-sage font-sans font-semibold mt-0.5">
                          {unit.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* Skeleton Loader */
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-11 sm:h-12 bg-ivory/80 rounded-xl border border-gold/20 animate-pulse"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Date info - clean and airy above couple's heads */}
          <div className="mt-0.5 sm:mt-1">
            <p className="text-[8px] sm:text-[9px] text-sage/90 font-sans tracking-[0.20em] uppercase font-semibold">
              {weddingConfig.date.displayDate} · {weddingConfig.date.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
