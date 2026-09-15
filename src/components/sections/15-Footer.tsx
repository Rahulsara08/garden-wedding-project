"use client";

import React from "react";
import { weddingConfig } from "@/config/weddingConfig";
import { RadhaKrishnaSeal } from "../motifs/RadhaKrishnaSeal";

export const Footer: React.FC = () => {
  const { footer, couple } = weddingConfig;

  return (
    <footer className="relative py-8 px-4 bg-ivory text-center border-t border-gold/15 select-none">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        {/* Sized down monogram mark */}
        <RadhaKrishnaSeal
          size={50}
          initials={couple.coupleInitials}
          showRays={false}
        />

        {/* Wedding Hashtag */}
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium mt-1">
          {footer.hashtag}
        </p>

        {/* Credit & Year */}
        <p className="text-[11px] text-sage/70 font-sans tracking-wide">
          {footer.credit} · © {footer.year}
        </p>
      </div>
    </footer>
  );
};
