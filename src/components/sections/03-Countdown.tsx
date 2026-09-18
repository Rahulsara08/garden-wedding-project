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
      {/* 1. Header Floral Corners Transition (Full, uncut watercolor corner bouquets) */}
      <div className="absolute top-0 left-0 w-24 sm:w-28 md:w-32 pointer-events-none z-30 drop-shadow-sm">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Handcrafted Floral Corner Left"
          width={240}
          height={210}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 pointer-events-none z-30 drop-shadow-sm">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Handcrafted Floral Corner Right"
          width={240}
          height={210}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 2. Main Jhula & Countdown Canvas - Full width to mobile screen edges */}
      <div
        className="relative w-full mx-auto flex flex-col items-center"
        style={{ aspectRatio: "923 / 1006" }}
      >
        {/* Jhula couple illustration with tall ropes hanging from corners */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Image
            src="/assets/illustrations/couple-jhula-transparent.png"
            alt="Couple on Floral Jhula Swing"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>

        {/* Countdown details layered in open space between the two floral ropes */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-5 sm:pt-7 px-6 sm:px-8 pointer-events-auto">
          {/* Header copy */}
          <div className="flex flex-col items-center text-center w-full max-w-[280px] sm:max-w-[310px]">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-gold font-sans font-semibold mb-1">
              UNTIL WE SAY I DO
            </p>

            <h2
              className="font-script text-2xl sm:text-[1.75rem] text-forest text-embossed leading-tight"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
              }}
            >
              Countdown to Our Forever
            </h2>

            <LotusDivider variant="simple" className="my-1.5 max-w-[110px] sm:max-w-[130px]" />
          </div>

          {/* Live Counter Boxes - Spacious, open & minimal */}
          <div className="w-full max-w-[280px] sm:max-w-[310px] my-2 sm:my-3">
            {isHydrated ? (
              timeLeft.isPast ? (
                <div className="py-2.5 bg-ivory/95 rounded-2xl border border-gold/30 shadow-2xs text-center">
                  <p className="font-serif text-sm text-forest font-semibold">
                    The Celebration Has Begun!
                  </p>
                  <p className="text-[9px] text-gold uppercase tracking-widest mt-0.5 font-sans">
                    Blessings & Joy All Around
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {timeUnits.map((unit) => {
                    const displayVal =
                      unit.pad && unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
                    return (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 rounded-xl sm:rounded-2xl bg-ivory/95 border border-gold/35 shadow-xs backdrop-blur-xs"
                      >
                        <span className="text-base sm:text-xl font-serif text-forest font-bold tracking-tight">
                          {displayVal}
                        </span>
                        <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-sage font-sans font-semibold mt-0.5">
                          {unit.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* Skeleton Loader */
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 sm:h-14 bg-ivory/80 rounded-xl sm:rounded-2xl border border-gold/20 animate-pulse"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Date info - positioned with ample breathing space above couple's heads */}
          <div className="mt-1 sm:mt-1.5">
            <p className="text-[8.5px] sm:text-[10px] text-sage/90 font-sans tracking-[0.22em] uppercase font-semibold">
              {weddingConfig.date.displayDate} · {weddingConfig.date.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
