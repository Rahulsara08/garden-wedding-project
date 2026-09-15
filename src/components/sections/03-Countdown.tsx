"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { AnimatedNumber } from "../animations/AnimatedNumber";
import { CornerFlourish } from "../motifs/CornerFlourish";
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
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown-section"
      className="relative py-10 px-3 flex flex-col items-center justify-center bg-ivory paper-texture overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-sm mx-auto text-center flex flex-col items-center gap-5 py-4"
      >
        {/* Section Top Heading */}
        <div className="flex flex-col items-center w-full pt-1">
          <p className="text-[9px] uppercase tracking-[0.22em] text-gold font-sans font-semibold mb-0.5">
            UNTIL WE SAY I DO
          </p>

          <h2 className="font-script text-2xl sm:text-[1.7rem] text-forest">
            Countdown to Our Forever
          </h2>

          <LotusDivider variant="simple" className="my-1 max-w-[120px]" />
        </div>

        {/* Live Counters */}
        <div className="w-full my-auto px-1">
          {isHydrated ? (
            timeLeft.isPast ? (
              <div className="py-2">
                <p className="font-serif text-lg text-forest">
                  The Celebration Has Begun!
                </p>
                <p className="text-[10px] text-gold uppercase tracking-widest mt-1 font-sans">
                  Blessings & Joy All Around
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-1.5">
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-ivory border border-gold/25 shadow-2xs"
                  >
                    <AnimatedNumber
                      value={unit.value}
                      padZero={unit.label !== "Days"}
                      className="text-lg sm:text-xl font-serif text-forest font-semibold"
                    />
                    <span className="text-[8px] uppercase tracking-wider text-sage font-sans mt-0.5">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Skeleton Loader */
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-ivory rounded-xl animate-pulse border border-gold/15"
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pb-1">
          <p className="text-[10px] text-sage/85 font-sans tracking-widest uppercase font-medium">
            {weddingConfig.date.displayDate} · {weddingConfig.date.city}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
