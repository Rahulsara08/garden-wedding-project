"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { PeacockFeather } from "../motifs/PeacockFeather";

export const FamilyUnion: React.FC = () => {
  const { bride, groom, heading, sectionEyebrow, subtitle } = weddingConfig.family;

  return (
    <section id="family-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
          >
            {sectionEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Two Family Branches (Direct on Background - No Boxed Cards) */}
        <div className="flex flex-col gap-8 items-center justify-center w-full max-w-sm mx-auto">
          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[320px] mx-auto text-center flex flex-col items-center gap-2 py-2"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                {bride.sideLabel}
              </span>
              <h3
                className="text-2xl font-serif text-forest font-normal mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {bride.childName}
              </h3>
            </div>

            <div className="py-1">
              <p className="text-sm font-sans text-forest font-medium tracking-wide">
                Daughter of {bride.parentsNames}
              </p>

              {bride.grandparentsNames && (
                <p className="text-xs text-sage/80 font-sans italic mt-1 max-w-[260px] mx-auto">
                  {bride.grandparentsNames}
                </p>
              )}
            </div>

            <p className="text-xs text-sage/85 font-serif italic max-w-[260px] mx-auto leading-relaxed pt-1">
              &ldquo;{bride.blessingLine}&rdquo;
            </p>
          </motion.div>

          {/* Center Divider: Delicate Peacock Feather Line Art */}
          <div className="flex items-center justify-center opacity-45 py-2">
            <PeacockFeather size={48} animated={false} />
          </div>

          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-[320px] mx-auto text-center flex flex-col items-center gap-2 py-2"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                {groom.sideLabel}
              </span>
              <h3
                className="text-2xl font-serif text-forest font-normal mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {groom.childName}
              </h3>
            </div>

            <div className="py-1">
              <p className="text-sm font-sans text-forest font-medium tracking-wide">
                Son of {groom.parentsNames}
              </p>

              {groom.grandparentsNames && (
                <p className="text-xs text-sage/80 font-sans italic mt-1 max-w-[260px] mx-auto">
                  {groom.grandparentsNames}
                </p>
              )}
            </div>

            <p className="text-xs text-sage/85 font-serif italic max-w-[260px] mx-auto leading-relaxed pt-1">
              &ldquo;{groom.blessingLine}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
