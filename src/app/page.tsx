"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/sections/00-Preloader";
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
import { FinalLoveNote } from "@/components/sections/14-FinalLoveNote";
import { Footer } from "@/components/sections/15-Footer";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleReplay = (scrollRef?: React.RefObject<HTMLDivElement | null>) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowPreloader(true);
  };

  return (
    <PhoneMockupFrame
      preloader={
        <AnimatePresence>
          {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
        </AnimatePresence>
      }
    >
      {(scrollContainerRef) => (
        <main className="relative min-h-full w-full bg-ivory text-sage overflow-x-hidden selection:bg-gold/20 selection:text-forest">
          {/* 02: Hero / Welcome */}
            <HeroWelcome />

            {/* 03: Countdown to Forever */}
            <Countdown />

            {/* 04: Our Story */}
            <OurStory />

            {/* 05: Family Union */}
            <FamilyUnion />

            {/* 06: Events Timeline */}
            <EventsTimeline />

            {/* 07: Gallery */}
            <Gallery />

            {/* 08: RSVP */}
            <Rsvp />

            {/* 09: Blessings Wall */}
            <BlessingsWall />

            {/* 10: Venue */}
            <Venue />

            {/* 11: Travel & Stay */}
            <TravelStay />

            {/* 12: Get in Touch */}
            <GetInTouch />

            {/* 13: Closing */}
            <Closing onReplay={() => handleReplay(scrollContainerRef)} />

            {/* 14: Final Love Note */}
            <FinalLoveNote />

            {/* 15: Footer */}
            <Footer />
          </main>
        )}
      </PhoneMockupFrame>
  );
}
