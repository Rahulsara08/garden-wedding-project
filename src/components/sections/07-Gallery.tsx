"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { OliverParallax } from "../animations/OliverParallax";
import { LotusDivider } from "../motifs/LotusDivider";

export const Gallery: React.FC = () => {
  return (
    <section id="gallery-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-lg mx-auto mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
        >
          {weddingConfig.gallery.sectionEyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-serif text-forest tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.gallery.heading}
        </motion.h2>

        <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
        >
          {weddingConfig.gallery.subtitle}
        </motion.p>
      </div>

      {/* Multi-column Parallax Gallery */}
      <OliverParallax photos={weddingConfig.gallery.photos} />
    </section>
  );
};
