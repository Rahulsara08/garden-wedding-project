"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeddingIntro } from "@/components/intro/WeddingIntro";
import { PhoneMockupFrame } from "@/components/layout/PhoneMockupFrame";
import { HeroWelcome } from "@/components/sections/02-HeroWelcome";
import { Countdown } from "@/components/sections/03-Countdown";
import { OurStory } from "@/components/sections/04-OurStory";
import { FamilyUnion } from "@/components/sections/05-FamilyUnion";
import { EventsTimeline } from "@/components/sections/06-EventsTimeline";
import { Gallery } from "@/components/sections/07-Gallery";
import { Rsvp } from "@/components/sections/08-Rsvp";
import { BlessingsWall } from "@/components/sections/09-BlessingsWall";
import { Venue } from "@/components/sections/10-Venue";
import { TravelStay } from "@/components/sections/11-TravelStay";
import { GetInTouch } from "@/components/sections/12-GetInTouch";
import { Closing } from "@/components/sections/13-Closing";

import { GoldenLeafDivider } from "@/components/motifs/GoldenLeafDivider";

const SectionDivider: React.FC = () => (
  <div className="w-full py-4 sm:py-6 flex justify-center items-center bg-[#FAF3E4] z-20 pointer-events-none select-none">
    <GoldenLeafDivider />
  </div>
);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Prevent unwanted background scroll during the intro sequence
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const handleReplay = (scrollRef?: React.RefObject<HTMLDivElement | null>) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowIntro(true);
  };

  return (
    <PhoneMockupFrame
      preloader={
        <AnimatePresence>
          {showIntro && (
            <WeddingIntro
              onComplete={() => {
                window.scrollTo(0, 0);
                setShowIntro(false);
              }}
            />
          )}
        </AnimatePresence>
      }
    >
      {(scrollContainerRef) => (
        <main
          className="relative min-h-full w-full bg-[#FAF3E4] paper-texture text-sage overflow-x-hidden selection:bg-gold/20 selection:text-forest"
        >
          {/* 02: Hero / Welcome */}
          <HeroWelcome />

          {/* 03: Countdown to Forever */}
          <Countdown />

          <SectionDivider />

          {/* 04: Our Story */}
          <OurStory />

          <SectionDivider />

          {/* 05: Family Union */}
          <FamilyUnion />

          <SectionDivider />

          {/* 06: Events Timeline */}
          <EventsTimeline />

          <SectionDivider />

          {/* 07: Gallery */}
          <Gallery />

          <SectionDivider />

          {/* 08: RSVP */}
          <Rsvp />

          <SectionDivider />

          {/* 09: Blessings Wall */}
          <BlessingsWall />

          <SectionDivider />

          {/* 10: Venue */}
          <Venue />

          <SectionDivider />

          {/* 11: Travel & Stay */}
          <TravelStay />

          <SectionDivider />

          {/* 12: Get in Touch */}
          <GetInTouch />

          <SectionDivider />

          {/* 13: Closing & Final Note */}
          <Closing onReplay={() => handleReplay(scrollContainerRef)} />
        </main>
      )}
    </PhoneMockupFrame>
  );
}

