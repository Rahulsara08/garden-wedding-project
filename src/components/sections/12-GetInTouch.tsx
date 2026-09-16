"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { LotusDivider } from "../motifs/LotusDivider";
import { Phone, MessageCircle } from "lucide-react";

export const GetInTouch: React.FC = () => {
  const { contacts } = weddingConfig;

  return (
    <section id="contact-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
          >
            {contacts.sectionEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {contacts.heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-2 max-w-[120px]" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
          >
            {contacts.subtitle}
          </motion.p>
        </div>

        {/* Contacts (Direct on Background - No Boxed Cards) */}
        <div className="flex flex-col gap-6 items-center justify-center w-full max-w-sm mx-auto">
          {contacts.people.map((person, idx) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center flex flex-col items-center w-full max-w-[300px] mx-auto py-2"
            >
              <div>
                <h3 className="text-xl font-serif text-forest font-semibold">
                  {person.name}
                </h3>
                <p className="text-xs text-gold font-sans font-medium tracking-wide mt-0.5">
                  {person.relation}
                </p>
                <p className="text-sm text-forest font-sans font-semibold tracking-wider mt-1">
                  {person.phone}
                </p>
              </div>

              {/* Action Buttons: Call & WhatsApp */}
              <div className="flex items-center justify-center gap-3 pt-3 w-full">
                <a
                  href={`tel:${person.phone.replace(/[^0-9+]/g, "")}`}
                  className="p-2.5 rounded-full bg-ivory text-forest hover:text-gold border border-gold/30 transition-colors shadow-xs"
                  title={`Call ${person.name}`}
                  aria-label={`Call ${person.name}`}
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${person.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-forest text-ivory hover:bg-forest-deep text-xs font-serif tracking-wider uppercase transition-colors shadow-xs"
                  title={`WhatsApp ${person.name}`}
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
