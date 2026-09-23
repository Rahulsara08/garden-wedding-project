"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export const GetInTouch: React.FC = () => {
  const { contacts } = weddingConfig;

  // Exact coordinates matching the visual buttons on the plate
  const contactLinks = [
    {
      name: "Rajesh Sharma",
      relation: "Father of the Bride",
      phone: "+919876543210",
      phoneDisplay: "+91 98765 43210",
      whatsapp: "919876543210",
      waText: "Hi Rajesh ji, regarding Riya and Aarav's wedding",
      callCoords: { top: "36.1%", left: "26.4%", width: "9.8%", height: "4.7%" },
      waCoords: { top: "36.1%", left: "40.0%", width: "34.0%", height: "4.7%" },
      phoneCoords: { top: "32.6%", left: "28.0%", width: "44.0%", height: "3.2%" },
    },
    {
      name: "Vikram Mehta",
      relation: "Father of the Groom",
      phone: "+919812345678",
      phoneDisplay: "+91 98123 45678",
      whatsapp: "919812345678",
      waText: "Hi Vikram ji, regarding Riya and Aarav's wedding",
      callCoords: { top: "57.6%", left: "26.4%", width: "9.8%", height: "4.7%" },
      waCoords: { top: "57.6%", left: "40.0%", width: "34.0%", height: "4.7%" },
      phoneCoords: { top: "54.1%", left: "28.0%", width: "44.0%", height: "3.2%" },
    },
    {
      name: "Ananya Kapoor",
      relation: "Wedding Hospitality Coordinator",
      phone: "+919988776655",
      phoneDisplay: "+91 99887 76655",
      whatsapp: "919988776655",
      waText: "Hi Ananya, regarding wedding hospitality and assistance",
      callCoords: { top: "78.9%", left: "26.4%", width: "9.8%", height: "4.7%" },
      waCoords: { top: "78.9%", left: "40.0%", width: "34.0%", height: "4.7%" },
      phoneCoords: { top: "75.4%", left: "28.0%", width: "44.0%", height: "3.2%" },
    },
  ];

  return (
    <section
      id="contact-section"
      className="relative w-full pt-0 pb-8 sm:pb-12 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Main Container Full Bleed Touching Phone Edges */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full px-0 mx-0"
      >
        <div className="relative w-full aspect-[492/1024] overflow-hidden">
          {/* Master High-Resolution Artwork Plate */}
          <Image
            src="/assets/watercolor/we-are-here-for-you.png"
            alt="Need Assistance? We Are Here For You - Contact Details"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-center pointer-events-none select-none"
          />

          {/* Fully Interactive Call, WhatsApp, and Phone Number Overlays */}
          {contactLinks.map((contact) => (
            <React.Fragment key={contact.name}>
              {/* 1. Clickable Phone Number Text */}
              <a
                href={`tel:${contact.phone}`}
                title={`Call ${contact.name} at ${contact.phoneDisplay}`}
                aria-label={`Call ${contact.name}`}
                style={{
                  top: contact.phoneCoords.top,
                  left: contact.phoneCoords.left,
                  width: contact.phoneCoords.width,
                  height: contact.phoneCoords.height,
                }}
                className="absolute z-20 rounded-md transition-all duration-200 hover:bg-black/5 active:scale-95 cursor-pointer"
              />

              {/* 2. Clickable Phone Call Icon Button */}
              <a
                href={`tel:${contact.phone}`}
                title={`Call ${contact.name}`}
                aria-label={`Call ${contact.name}`}
                style={{
                  top: contact.callCoords.top,
                  left: contact.callCoords.left,
                  width: contact.callCoords.width,
                  height: contact.callCoords.height,
                }}
                className="absolute z-20 rounded-full transition-all duration-200 hover:bg-[#B68D4C]/15 active:scale-90 hover:shadow-xs cursor-pointer"
              />

              {/* 3. Clickable WhatsApp Button */}
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat with ${contact.name} on WhatsApp`}
                aria-label={`WhatsApp ${contact.name}`}
                style={{
                  top: contact.waCoords.top,
                  left: contact.waCoords.left,
                  width: contact.waCoords.width,
                  height: contact.waCoords.height,
                }}
                className="absolute z-20 rounded-full transition-all duration-200 hover:bg-white/20 active:scale-95 hover:shadow-xs cursor-pointer"
              />
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Accessible semantic details for screen readers and SEO only */}
      <div className="sr-only">
        <h2>{contacts.sectionEyebrow} - {contacts.heading}</h2>
        <p>{contacts.subtitle}</p>
        <div>
          {contactLinks.map((c) => (
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
