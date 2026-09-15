"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GalleryPhoto } from "@/config/weddingConfig";
import { X, ZoomIn } from "lucide-react";
import { useScrollContainer } from "@/context/ScrollContainerContext";

interface OliverParallaxProps {
  photos: GalleryPhoto[];
}

export const OliverParallax: React.FC<OliverParallaxProps> = ({ photos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const { containerRef: scrollContainer } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  // Dual speeds: Column 1 drifts slightly slower, Column 2 drifts faster
  const yCol1 = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [-20, 60]);

  // Split photos into two columns
  const col1 = photos.filter((_, idx) => idx % 2 === 0);
  const col2 = photos.filter((_, idx) => idx % 2 !== 0);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto px-1 py-4">
      <div className="grid grid-cols-2 gap-2.5 items-start">
        {/* Column 1 */}
        <motion.div style={{ y: yCol1 }} className="flex flex-col gap-3">
          {col1.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl aspect-[4/5] border border-gold/25"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-2.5">
                  <span className="flex items-center gap-1 text-[11px] text-ivory font-serif tracking-wider">
                    <ZoomIn className="w-3 h-3 text-gold" />
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: yCol2 }} className="flex flex-col gap-3">
          {col2.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl aspect-[4/5] border border-gold/25"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-2.5">
                  <span className="flex items-center gap-1 text-[11px] text-ivory font-serif tracking-wider">
                    <ZoomIn className="w-3 h-3 text-gold" />
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] bg-ivory p-4 rounded-lg border border-gold shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-ivory-dark text-forest hover:text-gold transition-colors z-10"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full aspect-[3/4] max-h-[75vh] overflow-hidden rounded-md bg-ivory-dark">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-forest font-serif tracking-widest text-center">
                {activePhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
