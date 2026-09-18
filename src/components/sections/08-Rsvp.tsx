"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { useGuestName } from "@/hooks/useGuestName";
import { useStorageState } from "@/hooks/useStorageState";
import { fireWeddingConfetti } from "../animations/ConfettiBurst";
import { LotusDivider } from "../motifs/LotusDivider";
import { Heart, Check, Sparkles } from "lucide-react";
import Image from "next/image";

interface RsvpEntry {
  name: string;
  guestCount: number;
  dietaryNote: string;
  timestamp: string;
}

export const Rsvp: React.FC = () => {
  const { guestName } = useGuestName();
  const [, setRsvps] = useStorageState<RsvpEntry[]>("mayura_rsvps", []);

  const [step, setStep] = useState<"initial" | "details" | "confirmed">("initial");
  const [nameInput, setNameInput] = useState(guestName || "");
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNote, setDietaryNote] = useState("");

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
    <section id="rsvp-section" className="relative py-10 px-3 sm:px-4 bg-ivory paper-texture">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-sm mx-auto text-center flex flex-col items-center gap-4 py-2"
        >

          {/* Section Top Heading */}
          <div className="flex flex-col items-center w-full pt-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-bold mb-0.5">
              {weddingConfig.rsvp.sectionEyebrow}
            </span>

            <h2
              className="text-2xl sm:text-3xl font-serif text-forest tracking-tight font-semibold text-embossed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {weddingConfig.rsvp.heading}
            </h2>

            <LotusDivider variant="simple" className="my-1 max-w-[110px]" />
          </div>

          {/* Animated Namaste Couple Greeting Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative w-full max-w-[210px] sm:max-w-[240px] mx-auto my-0.5"
          >
            <div className="relative w-full aspect-[986/901] filter drop-shadow-[0_8px_18px_rgba(186,141,60,0.28)]">
              <Image
                src="/assets/illustrations/namaste-couple.png"
                alt="Indian Couple Namaste Anjali Mudra Greeting"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="w-full flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {step === "initial" && (
                <motion.div
                  key="step-initial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-3 w-full"
                >
                  <p className="text-xs text-sage/90 font-sans tracking-wide max-w-[240px] mx-auto">
                    {weddingConfig.rsvp.subtitle}
                  </p>

                  {nameInput && (
                    <p className="font-serif italic text-xs text-forest">
                      Honored Guest: <span className="font-semibold text-gold-dark">{nameInput}</span>
                    </p>
                  )}

                  {/* Vibrant Primary Accept CTA */}
                  <button
                    type="button"
                    onClick={handleInitialAccept}
                    className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-forest via-forest-deep to-forest text-ivory font-serif tracking-widest text-xs uppercase shadow-md border border-gold/40 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer mt-1"
                  >
                    <Heart className="w-3.5 h-3.5 text-gold fill-gold transition-transform duration-300 group-hover:scale-125" />
                    <span className="font-semibold text-ivory">{weddingConfig.rsvp.acceptButtonText}</span>
                    <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  </button>

                  <p className="text-[10px] text-sage/75 font-sans italic mt-0.5">
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
                      className="w-full px-3 py-2 rounded-xl bg-ivory border-2 border-gold/35 text-forest text-xs font-sans focus:outline-none focus:border-gold shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-forest font-serif font-semibold mb-1">
                      {weddingConfig.rsvp.guestCountLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((count) => (
                        <button
                          type="button"
                          key={count}
                          onClick={() => setGuestCount(count)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-serif border-2 transition-all ${
                            guestCount === count
                              ? "bg-forest text-ivory border-gold shadow-sm font-bold scale-105"
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
                      className="w-full px-3 py-2 rounded-xl bg-ivory border-2 border-gold/35 text-forest text-xs font-sans focus:outline-none focus:border-gold shadow-inner"
                    />
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-forest text-ivory font-serif tracking-widest text-xs uppercase font-semibold border border-gold/40 shadow-md transition-all duration-300 hover:scale-102 active:scale-95 cursor-pointer"
                    >
                      Confirm Attendance
                    </button>
                  </div>
                </motion.form>
              )}

              {step === "confirmed" && (
                <motion.div
                  key="step-confirmed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative py-3 px-2 flex flex-col items-center gap-2.5 text-center w-full"
                >
                  <div className="relative flex items-center justify-center my-1">
                    <div className="w-12 h-12 rounded-full bg-forest text-gold flex items-center justify-center shadow-lg border-2 border-gold">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-forest font-semibold">
                    {weddingConfig.rsvp.successHeading}
                  </h3>

                  <p className="text-xs text-sage/90 font-sans leading-relaxed max-w-[250px] mx-auto">
                    {weddingConfig.rsvp.successMessage}
                  </p>

                  <div className="mt-1 px-4 py-2 rounded-xl bg-ivory-dark/70 border border-gold/40 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gold fill-gold animate-bounce" />
                    <span className="font-serif italic text-xs text-gold-dark font-semibold">
                      See you in Vrindavan on 12 Feb 2027!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-1">
            <span className="text-[9px] uppercase tracking-widest text-gold/90 font-sans font-semibold">
              Shri Vrindavan Gardens
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

