"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useScrollContainer } from "@/context/ScrollContainerContext";
import { HeroFlock } from "../animations/HeroFlock";

export const HeroWelcome: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start start", "end start"],
  });

  // Smooth parallax transformations
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={containerRef}
      id="welcome-hero"
      className="relative w-full flex flex-col items-center justify-start overflow-hidden bg-ivory paper-texture pt-0 pb-2 px-0 select-none"
    >
      {/* Main Container - flush with top edge */}
      <motion.div
        style={{ y: templeY, scale: templeScale }}
        className="relative w-full max-w-[420px] mx-auto flex flex-col items-center"
      >
        <div className="relative w-full aspect-[521/780] overflow-hidden">
          {/* Pristine Handcrafted Vrindavan Temple Ghat Watercolor Artwork */}
          <Image
            src="/assets/watercolor/hero-header-perfect.png"
            alt="Riya and Aarav Wedding Invitation Header Art"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top"
          />

          {/* Animated Flying Birds Flock in the Sky */}
          <div className="absolute inset-0 pointer-events-none select-none z-10">
            <HeroFlock />
          </div>

          {/* Accessible Typography for screen readers & SEO */}
          <h1 className="sr-only">
            {weddingConfig.invitation.eyebrow} - {weddingConfig.couple.brideFirstName} &amp; {weddingConfig.couple.groomFirstName} Wedding Invitation, {weddingConfig.date.displayDate} at {weddingConfig.date.venue}, {weddingConfig.date.city}. {weddingConfig.couple.tagline}
          </h1>
        </div>
      </motion.div>
    </section>
  );
};
