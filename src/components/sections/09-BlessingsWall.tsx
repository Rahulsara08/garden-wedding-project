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

    setBlessings((prev) => [...prev, newNote]);
    setName("");
    setMessage("");
    setShowForm(false);

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
        return "bg-gradient-to-b from-[#FFF5F6] to-[#FBE3E6] border-2 border-[#ECA6AC]/60";
      case "sage":
        return "bg-gradient-to-b from-[#F6FAF5] to-[#E2EFE0] border-2 border-[#B4D3B0]/60";
      case "cream":
      default:
        return "bg-gradient-to-b from-[#FFFDF5] to-[#FFF3DC] border-2 border-[#E8C580]/60";
    }
  };

  return (
    <section id="blessings-section" className="relative py-10 px-3 sm:px-4 bg-ivory paper-texture overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-bold mb-1 block"
          >
            {weddingConfig.blessings.sectionEyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-forest tracking-tight font-semibold text-embossed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {weddingConfig.blessings.heading}
          </motion.h2>

          <LotusDivider variant="simple" className="my-1.5 max-w-[110px]" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-sage/90 font-sans tracking-wide max-w-xs mx-auto"
          >
            {weddingConfig.blessings.subtitle}
          </motion.p>
        </div>

        {/* Toggleable Write Blessing Button / Form */}
        <div className="max-w-sm mx-auto mb-4 text-center">
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-forest text-ivory text-[11px] font-serif uppercase tracking-wider font-semibold hover:bg-forest-deep transition-all shadow-md border border-gold/40 active:scale-95 cursor-pointer"
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
              className="p-4 rounded-3xl bg-gradient-to-b from-[#FFFDF7] to-[#FFF7E8] border-2 border-gold/40 shadow-xl text-left space-y-2.5"
            >
              <div className="flex items-center justify-between pb-1 border-b border-gold/20">
                <span className="text-[11px] font-serif font-bold text-forest uppercase tracking-wider">
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
                  className="w-full px-3 py-1.5 rounded-xl bg-ivory border border-gold/30 text-forest text-xs font-sans focus:outline-none focus:border-gold shadow-inner"
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
                  className="w-full px-3 py-1.5 rounded-xl bg-ivory border border-gold/30 text-forest text-xs font-sans focus:outline-none focus:border-gold resize-none shadow-inner"
                />
                <div className="flex justify-between items-center mt-1 text-[9px] text-sage/80 font-sans">
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
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        color === "rose"
                          ? "bg-[#F7E7E9] border-[#E8C5C8]"
                          : color === "cream"
                          ? "bg-[#FDF7EB] border-[#E8D9C0]"
                          : "bg-[#EBF2E8] border-[#CADBCE]"
                      } ${selectedColor === color ? "scale-125 ring-2 ring-gold" : "opacity-75"}`}
                      aria-label={`Select ${color} note`}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-forest text-ivory text-[10px] font-serif uppercase tracking-wider font-semibold border border-gold/30 hover:bg-forest-deep transition-all shadow-xs cursor-pointer"
                >
                  <Feather className="w-3 h-3 text-gold" />
                  <span>Send</span>
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Carousel Header & Controls */}
        <div className="flex items-center justify-between max-w-sm mx-auto px-2 mb-2">
          <span
            suppressHydrationWarning
            className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold"
          >
            {blessings.length} Wishes
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous wish"
              className="w-7 h-7 rounded-full bg-ivory border border-gold/40 text-forest flex items-center justify-center hover:bg-forest hover:text-ivory transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next wish"
              className="w-7 h-7 rounded-full bg-ivory border border-gold/40 text-forest flex items-center justify-center hover:bg-forest hover:text-ivory transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Left-to-Right Carousel Cards */}
        <div
          ref={carouselRef}
          className="flex flex-row gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-3 px-2 scroll-smooth max-w-sm mx-auto"
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
                className={`relative shrink-0 w-[240px] sm:w-[250px] h-[200px] p-5 rounded-3xl shadow-md flex flex-col justify-between snap-center ${getNoteBg(
                  note.colorVariant
                )}`}
                style={{
                  boxShadow: "0 10px 24px -6px rgba(186, 141, 60, 0.2), 0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                {/* Shiny Golden Pin Graphic */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold-dark shadow-sm border border-ivory flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-forest" />
                </div>

                {/* Blessing Message */}
                <div className="my-auto pt-2">
                  <p className="text-xs sm:text-sm font-serif italic text-forest font-medium leading-relaxed line-clamp-4">
                    &ldquo;{note.message}&rdquo;
                  </p>
                </div>

                {/* Author & Timestamp Footer */}
                <div className="pt-2 border-t border-forest/15 flex items-center justify-between text-[11px] font-sans text-sage">
                  <span className="font-bold text-forest text-xs">{note.name}</span>
                  <span className="text-[10px] text-sage/80 italic">{note.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

