"use client";

import React, { useRef, useEffect } from "react";

interface SwingScrollOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  poster?: string;
  loops?: number;
  blendMode?: "multiply" | "screen" | "normal";
  objectFit?: "cover" | "contain";
}

export const SwingScrollOverlay: React.FC<SwingScrollOverlayProps> = ({
  className = "",
  style = {},
  src = "/assets/videos/swing-overlay.mp4",
  poster = "/assets/videos/swing-overlay-poster.png",
  blendMode = "normal",
  objectFit = "cover",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback in case browser requires user interaction
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
          window.removeEventListener("scroll", handleInteraction);
        };
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("touchstart", handleInteraction, { once: true });
        window.addEventListener("scroll", handleInteraction, { once: true });
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`w-full h-full pointer-events-none select-none ${className}`}
      style={{
        mixBlendMode: blendMode,
        objectFit: objectFit,
        ...style,
      }}
      aria-label="Couple enjoying swing with floral garlands"
    />
  );
};
