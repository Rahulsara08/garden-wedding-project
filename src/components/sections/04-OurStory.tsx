"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const OurStory: React.FC = () => {
  return (
    <section id="story-section" className="relative py-8 sm:py-14 px-2 bg-ivory paper-texture overflow-hidden flex justify-center items-center">
      {/* Full Our Story Elements directly on Application Theme Background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-[580/1024] select-none"
      >
        <Image
          src="/assets/illustrations/our-story-full.png"
          alt="Our Journey - How Love Unfolded"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-contain"
        />
      </motion.div>
    </section>
  );
};


