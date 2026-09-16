"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useGuestName } from "@/hooks/useGuestName";
import { useStorageState } from "@/hooks/useStorageState";
import { fireWeddingConfetti } from "../animations/ConfettiBurst";
import { CornerFlourish } from "../motifs/CornerFlourish";
import { LotusDivider } from "../motifs/LotusDivider";
import { Heart, Check, Users, Sparkles } from "lucide-react";

import Image from "next/image";

interface RsvpEntry {
  name: string;
  guestCount: number;
  dietaryNote: string;
  timestamp: string;
}

export const Rsvp: React.FC = () => {
  const { guestName } = useGuestName();
  const [rsvps, setRsvps] = useStorageState<RsvpEntry[]>("mayura_rsvps", []);

  const [step, setStep] = useState<"initial" | "details" | "confirmed">("initial");
  const [nameInput, setNameInput] = useState(guestName || "");
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNote, setDietaryNote] = useState("");

  // Update name if guestName parameter loads
  React.useEffect(() => {
    if (guestName && !nameInput) {
      setNameInput(guestName);
    }
  }, [guestName, nameInput]);

  const handleInitialAccept = () => {
    fireWeddingConfetti();
    setStep("details");
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = nameInput.trim() || "Cherished Guest";
    const newEntry: RsvpEntry = {
      name: finalName,
      guestCount,
      dietaryNote: dietaryNote.trim(),
      timestamp: new Date().toISOString(),
    };

    setRsvps((prev) => [newEntry, ...prev]);
    fireWeddingConfetti();
    setStep("confirmed");
  };

  return (
    <section id="rsvp-section" className="relative py-12 px-3 sm:px-4 bg-ivory paper-texture">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-sm mx-auto text-center flex flex-col items-center gap-4 py-4"
        >
          {/* Section Top Heading */}
          <div className="flex flex-col items-center w-full pt-1">
            <p className="text-[9px] uppercase tracking-[0.22em] text-gold font-sans font-semibold mb-0.5">
              {weddingConfig.rsvp.sectionEyebrow}
            </p>

            <h2
              className="text-2xl sm:text-3xl font-serif text-forest tracking-tight text-embossed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {weddingConfig.rsvp.heading}
            </h2>

            <LotusDivider variant="simple" className="my-1 max-w-[120px]" />
          </div>

          {/* Animated Namaste Couple Greeting Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[240px] sm:max-w-[270px] mx-auto my-1"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 0.4, 0, -0.4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full aspect-[986/901] filter drop-shadow-[0_10px_22px_rgba(182,141,76,0.2)]"
            >
              <Image
                src="/assets/illustrations/namaste-couple.png"
                alt="Indian Couple Namaste Anjali Mudra Greeting"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 270px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <div className="w-full my-auto flex-1 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {step === "initial" && (
                <motion.div
                  key="step-initial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-3 w-full"
                >
                  <p className="text-xs text-sage/80 font-sans tracking-wide max-w-[240px] mx-auto">
                    {weddingConfig.rsvp.subtitle}
                  </p>

                  {nameInput && (
                    <p className="font-serif italic text-sm text-forest">
                      Honored Guest: <span className="font-semibold text-gold-dark">{nameInput}</span>
                    </p>
                  )}

                  {/* Primary Accept-Only CTA */}
                  <button
                    type="button"
                    onClick={handleInitialAccept}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory font-serif tracking-widest text-xs uppercase transition-all duration-300 hover:bg-forest-deep gold-glow gold-glow-hover active:scale-95 cursor-pointer mt-1"
                  >
                    <Heart className="w-3.5 h-3.5 text-gold fill-gold transition-transform duration-300 group-hover:scale-125" />
                    <span>{weddingConfig.rsvp.acceptButtonText}</span>
                    <Sparkles className="w-3 h-3 text-gold-light" />
                  </button>

                  <p className="text-[10px] text-sage/70 font-sans italic mt-1">
                    Accept-only RSVP · We cannot wait to celebrate!
                  </p>
                </motion.div>
              )}

              {step === "details" && (
                <motion.form
                  key="step-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleFinalSubmit}
                  className="text-left space-y-2.5 w-full max-w-[270px] mx-auto"
                >
                  <div>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-1.5 rounded-lg bg-ivory border border-gold/30 text-forest text-xs font-sans focus:outline-hidden focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-forest font-serif font-medium mb-1">
                      {weddingConfig.rsvp.guestCountLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((count) => (
                        <button
                          type="button"
                          key={count}
                          onClick={() => setGuestCount(count)}
                          className={`flex-1 py-1 rounded-md text-xs font-serif border transition-all ${
                            guestCount === count
                              ? "bg-forest text-ivory border-forest shadow-2xs"
                              : "bg-ivory border-gold/25 text-forest hover:border-gold"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={dietaryNote}
                      onChange={(e) => setDietaryNote(e.target.value)}
                      placeholder="Dietary preference (optional)"
                      className="w-full px-3 py-1.5 rounded-lg bg-ivory border border-gold/30 text-forest text-xs font-sans focus:outline-hidden focus:border-gold"
                    />
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-forest text-ivory font-serif tracking-widest text-[11px] uppercase transition-all duration-300 hover:bg-forest-deep gold-glow active:scale-95 cursor-pointer"
                    >
                      Confirm Attendance
                    </button>
                  </div>
                </motion.form>
              )}

              {step === "confirmed" && (
                <motion.div
                  key="step-confirmed"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative py-4 px-2 flex flex-col items-center gap-3 text-center w-full"
                >
                  {/* Expanding Golden Radiance Rings */}
                  <div className="relative flex items-center justify-center mb-1">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-12 h-12 rounded-full border border-gold/60 pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0.9 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                      className="absolute w-12 h-12 rounded-full border border-gold/40 pointer-events-none"
                    />

                    {/* Central Glowing Acceptance Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative w-12 h-12 rounded-full bg-forest text-gold flex items-center justify-center shadow-lg border-2 border-gold z-10"
                    >
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>
                  </div>

                  {/* Confirmed Heading & Sanskrit Blessing */}
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-xl sm:text-2xl text-forest font-semibold text-embossed"
                  >
                    {weddingConfig.rsvp.successHeading}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-sage/90 font-sans leading-relaxed max-w-[260px] mx-auto"
                  >
                    {weddingConfig.rsvp.successMessage}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-1 px-4 py-2 rounded-xl bg-ivory-dark/60 border border-gold/30 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-gold fill-gold animate-bounce" />
                    <span className="font-serif italic text-xs text-gold-dark font-medium">
                      See you in Vrindavan on 12 Feb 2027!
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pb-1">
            <span className="text-[9px] uppercase tracking-widest text-gold/80 font-sans">
              Shri Vrindavan Gardens
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
