"use client";

import React from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { Phone, MessageCircle } from "lucide-react";

export const GetInTouch: React.FC = () => {
  const { contacts } = weddingConfig;

  const contactList = [
    {
      name: "Rajesh Sharma",
      relation: "Father of the Bride",
      phone: "+919876543210",
      phoneDisplay: "+91 98765 43210",
      whatsapp: "919876543210",
      waText: "Hi Rajesh ji, regarding Riya and Aarav's wedding",
    },
    {
      name: "Vikram Mehta",
      relation: "Father of the Groom",
      phone: "+919812345678",
      phoneDisplay: "+91 98123 45678",
      whatsapp: "919812345678",
      waText: "Hi Vikram ji, regarding Riya and Aarav's wedding",
    },
    {
      name: "Ananya Kapoor",
      relation: "Wedding Hospitality Coordinator",
      phone: "+919988776655",
      phoneDisplay: "+91 99887 76655",
      whatsapp: "919988776655",
      waText: "Hi Ananya, regarding wedding hospitality and assistance",
    },
  ];

  return (
    <section
      id="contact-section"
      className="relative w-full pt-0 pb-6 sm:pb-8 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* 1. Main Full Bleed Artwork Plate Container using Image 3 background */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full px-0 mx-0"
      >
        <div className="relative w-full aspect-[557/1024] min-h-[720px] overflow-hidden">
          {/* Clean Background Artwork (Image 3) */}
          <OptimizedImage
            src="/assets/watercolor/contact-clean-bg.png"
            alt="Need Assistance Background Artwork"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-center pointer-events-none select-none"
          />

          {/* Top & Bottom Blur & Gradient Dissolve into App Theme #FAF3E4 */}
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/70 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#FAF3E4] via-[#FAF3E4]/70 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />

          {/* 2. Interactive Live Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-10 px-3 pointer-events-auto">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center max-w-[280px]">
              {/* Top Flourish */}
              <div className="flex items-center justify-center gap-1.5 text-[#B68D4C] opacity-80 mb-1">
                <span className="h-[1px] w-5 bg-[#B68D4C]/40" />
                <span className="text-[9px]">✤</span>
                <span className="h-[1px] w-5 bg-[#B68D4C]/40" />
              </div>

              <p className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.28em] font-sans font-semibold text-[#B68D4C] mb-0.5">
                {contacts.sectionEyebrow}
              </p>

              <h2
                className="text-2xl sm:text-[27px] font-serif text-[#1E2D22] font-semibold tracking-tight text-embossed mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {contacts.heading}
              </h2>

              {/* Diamond Divider */}
              <div className="flex items-center justify-center gap-2 text-[#B68D4C] opacity-75 my-1">
                <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
                <span className="text-[7px] transform rotate-45 inline-block">◆</span>
                <span className="h-[1px] w-6 bg-[#B68D4C]/50" />
              </div>

              <p className="text-[11px] sm:text-xs text-[#4A5D4E] font-sans leading-relaxed">
                {contacts.subtitle}
              </p>

              {/* Small Leaves Icon */}
              <div className="text-[#8F6E36] text-[10px] mt-1 opacity-70">🍃</div>
            </div>

            {/* Contact Cards Container */}
            <div className="w-full flex flex-col items-center gap-3.5 my-auto max-w-[320px]">
              {contactList.map((contact, idx) => (
                <React.Fragment key={contact.name}>
                  {/* Single Contact Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative w-full p-3.5 sm:p-4 rounded-[26px] bg-[#FAF3E4]/85 border border-[#B68D4C]/35 shadow-xs backdrop-blur-[2px] flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-[#B68D4C]/50"
                  >
                    {/* Name */}
                    <h3
                      className="text-base sm:text-lg font-serif font-semibold text-[#1E2D22] tracking-tight mb-0.5"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {contact.name}
                    </h3>

                    {/* Relation */}
                    <p className="text-[10.5px] sm:text-[11px] font-sans font-medium text-[#8F6E36] mb-1">
                      {contact.relation}
                    </p>

                    {/* Clickable Phone Number Display */}
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-[12.5px] sm:text-[13.5px] font-sans font-bold text-[#1E2D22] tracking-wide hover:text-[#B68D4C] transition-colors mb-2.5 cursor-pointer"
                    >
                      {contact.phoneDisplay}
                    </a>

                    {/* Working Call and WhatsApp Buttons */}
                    <div className="flex items-center justify-center gap-2.5 w-full max-w-[240px]">
                      {/* Call Icon Button */}
                      <a
                        href={`tel:${contact.phone}`}
                        title={`Call ${contact.name}`}
                        aria-label={`Call ${contact.name}`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] border border-[#B68D4C]/40 flex items-center justify-center text-[#1E2D22] shadow-2xs hover:bg-[#FAF3E4] hover:border-[#B68D4C] active:scale-95 transition-all cursor-pointer shrink-0"
                      >
                        <Phone className="w-4 h-4 text-[#2C3826]" />
                      </a>

                      {/* WhatsApp Button */}
                      <a
                        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.waText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Chat with ${contact.name} on WhatsApp`}
                        aria-label={`WhatsApp ${contact.name}`}
                        className="flex-1 flex items-center justify-center gap-2 h-9 sm:h-10 px-4 rounded-full bg-[#384A3B] text-[#FAF3E4] text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase shadow-xs hover:bg-[#2A382C] active:scale-95 transition-all border border-[#B68D4C]/30 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                        <span>WHATSAPP</span>
                      </a>
                    </div>
                  </motion.div>

                  {/* Inter-card ornament */}
                  {idx < contactList.length - 1 && (
                    <div className="flex items-center justify-center gap-1.5 text-[#B68D4C] opacity-60">
                      <span className="h-[1px] w-4 bg-[#B68D4C]/40" />
                      <span className="text-[7px]">❖</span>
                      <span className="h-[1px] w-4 bg-[#B68D4C]/40" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom Spacer clearance */}
            <div className="w-full h-2" />
          </div>
        </div>
      </motion.div>

      {/* Accessible semantic details for screen readers and SEO */}
      <div className="sr-only">
        <h2>{contacts.sectionEyebrow} - {contacts.heading}</h2>
        <p>{contacts.subtitle}</p>
        <div>
          {contactList.map((c) => (
            <div key={c.name}>
              <h3>{c.name} ({c.relation})</h3>
              <p>Phone: <a href={`tel:${c.phone}`}>{c.phoneDisplay}</a></p>
              <p><a href={`https://wa.me/${c.whatsapp}`}>WhatsApp</a></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

