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
      className="relative w-full overflow-hidden bg-ivory paper-texture pt-2 pb-6 px-2 sm:px-4 flex flex-col items-center select-none"
    >
      {/* 1. Header Floral Corners Transition (Header of Countdown / Footer of Main Header) */}
      <div className="absolute top-0 left-0 w-28 sm:w-36 md:w-44 -translate-x-2 -translate-y-2 pointer-events-none z-30 drop-shadow-sm">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Handcrafted Floral Corner Left"
          width={320}
          height={280}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="absolute top-0 right-0 w-28 sm:w-36 md:w-44 translate-x-2 -translate-y-2 pointer-events-none z-30 drop-shadow-sm">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Handcrafted Floral Corner Right"
          width={320}
          height={280}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 2. Main Jhula & Countdown Canvas */}
      <div className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto flex flex-col items-center">
        {/* Jhula Illustration (Couple on swing) with ropes extending to top corners */}
        <div
          className="relative w-full"
          style={{ aspectRatio: "923 / 766" }}
        >
          {/* Jhula couple background image */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <Image
              src="/assets/illustrations/couple-jhula-transparent.png"
              alt="Couple on Floral Jhula Swing"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>

          {/* Countdown details layered between the two floral ropes above the couple */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-3 sm:pt-5 px-8 sm:px-10 pointer-events-auto">
            {/* Header copy */}
            <div className="flex flex-col items-center text-center w-full max-w-[280px]">
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

              <LotusDivider variant="simple" className="my-1 max-w-[100px] sm:max-w-[120px]" />
            </div>

            {/* Live Counter Boxes */}
            <div className="w-full max-w-[270px] sm:max-w-[290px] my-1 sm:my-1.5">
              {isHydrated ? (
                timeLeft.isPast ? (
                  <div className="py-2 bg-ivory/95 rounded-2xl border border-gold/30 shadow-2xs text-center">
                    <p className="font-serif text-sm text-forest font-semibold">
                      The Celebration Has Begun!
                    </p>
                    <p className="text-[9px] text-gold uppercase tracking-widest mt-0.5 font-sans">
                      Blessings & Joy All Around
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
                          className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl sm:rounded-2xl bg-ivory/95 border border-gold/30 shadow-2xs backdrop-blur-xs"
                        >
                          <span className="text-base sm:text-lg font-serif text-forest font-bold tracking-tight">
                            {displayVal}
                          </span>
                          <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-sage font-sans font-semibold mt-0.5">
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
                      className="h-11 sm:h-12 bg-ivory/80 rounded-xl sm:rounded-2xl border border-gold/20 animate-pulse"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Date info */}
            <div className="mt-0.5">
              <p className="text-[8px] sm:text-[9.5px] text-sage/90 font-sans tracking-[0.20em] uppercase font-semibold">
                {weddingConfig.date.displayDate} · {weddingConfig.date.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
