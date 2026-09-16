"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/sections/00-Preloader";
import { PhoneMockupFrame } from "@/components/layout/PhoneMockupFrame";
import { InvitationCard } from "@/components/sections/01-InvitationCard";
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
    <>
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>

      <PhoneMockupFrame>
        {(scrollContainerRef) => (
          <main className="relative min-h-full w-full bg-ivory text-sage overflow-x-hidden selection:bg-gold/20 selection:text-forest">
            {/* 02: Hero / Welcome (Pic 1 at the top of the application) */}
          <HeroWelcome />

          {/* 03: Countdown to Forever */}
          <Countdown />

          {/* 04: Our Story (Card Stack Scroll with Polaroid Photos) */}
          <OurStory />

          {/* 05: Family Union (Two Square Cards) */}
          <FamilyUnion />

          {/* 06: Events Timeline (Day-wise Celebrations) */}
          <EventsTimeline />

          {/* 07: Gallery (Photo Cards with Lightbox) */}
          <Gallery />

          {/* 08: RSVP (Accept-only with Confetti) */}
          <Rsvp />

          {/* 09: Blessings Wall (Notebook Input with Sticky Notes) */}
          <BlessingsWall />

          {/* 10: Venue (Framed Watercolor Art & Directions) */}
          <Venue />

          {/* 11: Travel & Stay (Airports, Stations & Hotels) */}
          <TravelStay />

          {/* 12: Get in Touch (Call & WhatsApp Quick Actions) */}
          <GetInTouch />

          {/* 13: Closing (Save the Date & Replay) */}
          <Closing onReplay={() => handleReplay(scrollContainerRef)} />

          {/* 14: Final Love Note (Ganga River Watercolor Wash) */}
          <FinalLoveNote />

          {/* 15: Footer */}
          <Footer />
        </main>
      )}
    </PhoneMockupFrame>
    </>
  );
}
