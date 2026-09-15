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
          className="relative w-full max-w-sm mx-auto text-center flex flex-col items-center gap-5 py-4"
        >
          {/* Section Top Heading */}
          <div className="flex flex-col items-center w-full pt-1">
            <p className="text-[9px] uppercase tracking-[0.22em] text-gold font-sans font-semibold mb-0.5">
              {weddingConfig.rsvp.sectionEyebrow}
            </p>

            <h2
              className="text-2xl font-serif text-forest tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {weddingConfig.rsvp.heading}
            </h2>

            <LotusDivider variant="simple" className="my-1 max-w-[120px]" />
          </div>

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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-2 flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center shadow-md border border-gold">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-forest font-semibold">
                    {weddingConfig.rsvp.successHeading}
                  </h3>
                  <p className="text-[11px] text-sage/85 font-sans leading-relaxed max-w-[240px]">
                    {weddingConfig.rsvp.successMessage}
                  </p>
                  <p className="font-serif italic text-xs text-gold-dark mt-1">
                    See you in Vrindavan on 12 Feb 2027!
                  </p>
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
