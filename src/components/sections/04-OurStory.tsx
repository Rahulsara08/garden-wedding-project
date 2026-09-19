"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { CardStackScroll } from "../animations/CardStackScroll";
import { LotusDivider } from "../motifs/LotusDivider";

export const OurStory: React.FC = () => {
  return (
    <section id="story-section" className="relative py-12 px-3 bg-ivory paper-texture overflow-hidden">
      {/* Top Left Botanical Foliage Accent */}
      <div className="absolute -top-6 -left-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-85">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Top Left Botanical Accent"
          fill
          className="object-contain object-top-left"
        />
      </div>

      {/* Top Right Botanical Foliage Accent */}
      <div className="absolute -top-6 -right-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-85">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Top Right Botanical Accent"
          fill
          className="object-contain object-top-right"
        />
      </div>

      {/* Bottom Left Botanical Foliage Accent */}
      <div className="absolute -bottom-6 -left-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-85 transform scale-y-[-1]">
        <Image
          src="/assets/illustrations/floral-corner-right.png"
          alt="Bottom Left Botanical Accent"
          fill
          className="object-contain object-bottom-left"
        />
      </div>

      {/* Bottom Right Botanical Foliage Accent */}
      <div className="absolute -bottom-6 -right-6 w-32 sm:w-40 aspect-square z-10 pointer-events-none select-none opacity-85 transform scale-y-[-1]">
        <Image
          src="/assets/illustrations/floral-corner-left.png"
          alt="Bottom Right Botanical Accent"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-20 text-center max-w-lg mx-auto mb-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
        >
          {weddingConfig.story.sectionEyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.story.heading}
        </motion.h2>

        <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
        >
          {weddingConfig.story.subtitle}
        </motion.p>
      </div>

      {/* Story Moment Cards Crafted to Match Reference Image */}
      <div className="relative z-20">
        <CardStackScroll moments={weddingConfig.story.moments} />
      </div>
    </section>
  );
};
