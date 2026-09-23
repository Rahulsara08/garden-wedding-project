"use client";

import React from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";
import { GoldenLeafDivider } from "../motifs/GoldenLeafDivider";

export const FamilyUnion: React.FC = () => {
  const { bride, groom, heading, sectionEyebrow, subtitle } = weddingConfig.family;

  return (
    <section
      id="family-section"
      className="relative w-full pt-4 pb-4 sm:pb-6 bg-[#FAF3E4] paper-texture overflow-hidden flex flex-col items-center select-none"
    >
      {/* Seamless Soft Top & Bottom Blends to Adjacent Sections */}
      <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-[#FAF3E4] via-[#FAF3E4]/80 to-transparent z-10 pointer-events-none" />

      {/* Main Family Union Card: Touches the absolute edges of the phone layout with zero side padding */}
      <div className="relative w-full px-0 mx-0">
        <div className="relative w-full aspect-[522/1024]">
          <Image
            src="/assets/watercolor/family-union-scroll.png"
            alt="The Union of Two Families - Riya Sharma & Aarav Mehta"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Section Breaker Divider Motif (Image 5) between Family and Wedding Festivities */}
      <div className="w-full pt-4 pb-2 flex justify-center z-20">
        <GoldenLeafDivider />
      </div>

      {/* Accessible semantic details for screen readers and SEO only */}
      <div className="sr-only">
        <h2>{sectionEyebrow} - {heading}</h2>
        <p>{subtitle}</p>
        <div>
          <h3>{bride.sideLabel}: {bride.childName}</h3>
          <p>Daughter of {bride.parentsNames}</p>
          {bride.grandparentsNames && <p>{bride.grandparentsNames}</p>}
          <p>{bride.blessingLine}</p>
        </div>
        <div>
          <h3>{groom.sideLabel}: {groom.childName}</h3>
          <p>Son of {groom.parentsNames}</p>
          {groom.grandparentsNames && <p>{groom.grandparentsNames}</p>}
          <p>{groom.blessingLine}</p>
        </div>
      </div>
    </section>
  );
};
