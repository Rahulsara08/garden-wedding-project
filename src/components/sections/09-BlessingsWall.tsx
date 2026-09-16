"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useStorageState } from "@/hooks/useStorageState";
import { LotusDivider } from "../motifs/LotusDivider";
import { Feather, ChevronLeft, ChevronRight, X } from "lucide-react";

interface BlessingNote {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  colorVariant: "rose" | "cream" | "sage";
}

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useStorageState<BlessingNote[]>(
    "mayura_blessings",
    weddingConfig.blessings.initialBlessings as BlessingNote[]
  );

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<"cream" | "rose" | "sage">("rose");
  const [showForm, setShowForm] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newNote: BlessingNote = {
      id: `blessing-${Date.now()}`,
      name: name.trim() || "Well-wisher",
      message: message.trim(),
      timestamp: "Just now",
      colorVariant: selectedColor,
    };

    // Append to the right side
    setBlessings((prev) => [...prev, newNote]);
    setName("");
    setMessage("");
    setShowForm(false);

    // Smoothly scroll to the right side to display new wish
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  const getNoteBg = (variant: BlessingNote["colorVariant"]) => {
    switch (variant) {
      case "rose":
        return "bg-[#F7E7E9] border-[#E8C5C8]";
      case "sage":
        return "bg-[#EBF2E8] border-[#CADBCE]";
      case "cream":
      default:
        return "bg-[#FDF7EB] border-[#E9DFCE]";
    }
  };

  return (
    <section id="blessings-section" className="relative py-10 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold mb-1"
          >
            {weddingConfig.blessings.sectionEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {weddingConfig.blessings.heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-1.5 max-w-[120px]" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-sage/80 font-sans tracking-wide max-w-xs mx-auto"
          >
            {weddingConfig.blessings.subtitle}
          </motion.p>
        </div>

        {/* Toggleable Compact Write Blessing Area */}
        <div className="max-w-sm mx-auto mb-5 text-center">
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest text-ivory text-[11px] font-serif uppercase tracking-wider hover:bg-forest-deep transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5 text-gold" />
              <span>Write a Blessing</span>
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="p-4 rounded-2xl bg-ivory-light/90 border border-gold/30 shadow-md text-left space-y-2.5"
            >
              <div className="flex items-center justify-between pb-1 border-b border-gold/15">
                <span className="text-[11px] font-serif font-semibold text-forest uppercase tracking-wider">
                  New Blessing Note
                </span>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sage hover:text-forest p-1 cursor-pointer"
                  aria-label="Close form"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={weddingConfig.blessings.namePlaceholder}
                  className="w-full px-3 py-1.5 rounded-lg bg-ivory border border-gold/25 text-forest text-xs font-sans focus:outline-hidden focus:border-gold"
                />
              </div>

              <div>
                <textarea
                  required
                  maxLength={180}
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={weddingConfig.blessings.inputPlaceholder}
                  className="w-full px-3 py-1.5 rounded-lg bg-ivory border border-gold/25 text-forest text-xs font-sans focus:outline-hidden focus:border-gold resize-none"
                />
                <div className="flex justify-between items-center mt-1 text-[9px] text-sage/70 font-sans">
                  <span>Color variant:</span>
                  <span>{message.length} / 180</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {(["rose", "cream", "sage"] as const).map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        color === "rose"
                          ? "bg-[#F7E7E9] border-[#E8C5C8]"
                          : color === "cream"
                          ? "bg-[#FDF7EB] border-[#E8D9C0]"
                          : "bg-[#EBF2E8] border-[#CADBCE]"
                      } ${selectedColor === color ? "scale-115 ring-2 ring-forest" : "opacity-70"}`}
                      aria-label={`Select ${color} note`}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest text-ivory text-[10px] font-serif uppercase tracking-wider hover:bg-forest-deep transition-all shadow-xs cursor-pointer"
                >
                  <Feather className="w-3 h-3 text-gold" />
                  <span>Send</span>
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Carousel Header & Controls (Left to Right navigation without vertical scrolling) */}
        <div className="flex items-center justify-between max-w-sm mx-auto px-2 mb-2">
          <span
            suppressHydrationWarning
            className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold"
          >
            {blessings.length} Wishes
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous wish"
              className="w-7 h-7 rounded-full bg-ivory border border-gold/30 text-forest flex items-center justify-center hover:bg-forest hover:text-ivory transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next wish"
              className="w-7 h-7 rounded-full bg-ivory border border-gold/30 text-forest flex items-center justify-center hover:bg-forest hover:text-ivory transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Left-to-Right Carousel (Small Cards Matching Reference Image) */}
        <div
          ref={carouselRef}
          className="flex flex-row gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-3 scroll-smooth max-w-sm mx-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <AnimatePresence initial={false}>
            {blessings.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative shrink-0 w-[240px] sm:w-[250px] h-[210px] p-5 rounded-3xl border shadow-sm flex flex-col justify-between snap-center ${getNoteBg(
                  note.colorVariant
                )}`}
                style={{
                  boxShadow: "0 8px 20px -6px rgba(44, 56, 38, 0.08)",
                }}
              >
                {/* Pin Graphic (Matching reference image media_1789385359511.png) */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#7D2934] shadow-xs border border-gold/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-ivory/80" />
                </div>

                {/* Blessing Message */}
                <div className="my-auto pt-2">
                  <p className="text-xs sm:text-sm font-serif italic text-forest leading-relaxed line-clamp-4">
                    &ldquo;{note.message}&rdquo;
                  </p>
                </div>

                {/* Author & Timestamp Footer */}
                <div className="pt-2 border-t border-forest/10 flex items-center justify-between text-[11px] font-sans text-sage">
                  <span className="font-semibold text-forest text-xs">{note.name}</span>
                  <span className="text-[10px] text-sage/80">{note.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
