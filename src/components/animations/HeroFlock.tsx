"use client";

import React, { useState, useEffect } from "react";

// Wing morph paths (identical command structure for smooth SMIL morphing)
const PATH_UP =
  "M50 21 C42 14 24 8 3 5 C22 14 38 24 50 27 C62 24 78 14 97 5 C76 8 58 14 50 21Z";
const PATH_GLIDE =
  "M50 21 C42 17 24 14 3 16 C22 20 38 25 50 27 C62 25 78 20 97 16 C76 14 58 17 50 21Z";
const PATH_DOWN =
  "M50 21 C42 20 26 20 5 30 C24 27 40 27 50 27 C60 27 76 27 95 30 C74 20 58 20 50 21Z";

interface BirdSpec {
  id: number;
  width: number; // 22-44px wide (smaller = farther = lighter opacity)
  opacity: number; // 50-85% (0.50 - 0.85)
  x: number; // position within loose diagonal V flock
  y: number;
  flapDuration: number; // 1.3 - 1.7s per flap
  flapPhase: number; // phase offset in seconds
  bobDuration: number; // unique pace for bobbing & tilting
  bobOffset: number; // ±6px
  tiltAngle: number; // ±3deg
  bobDelay: number;
}

// 6 Birds arranged in a loose diagonal V formation pointing forward-right
const BIRDS: BirdSpec[] = [
  {
    id: 0,
    width: 44, // Front Leader (closest to viewer)
    opacity: 0.85,
    x: 124,
    y: 30,
    flapDuration: 1.42,
    flapPhase: 0.0,
    bobDuration: 3.1,
    bobOffset: 5,
    tiltAngle: 2.5,
    bobDelay: 0.0,
  },
  {
    id: 1,
    width: 36, // Upper wing mid
    opacity: 0.76,
    x: 82,
    y: 14,
    flapDuration: 1.56,
    flapPhase: 0.45,
    bobDuration: 2.7,
    bobOffset: -6,
    tiltAngle: -3.0,
    bobDelay: -0.9,
  },
  {
    id: 2,
    width: 26, // Upper wing trailing tip
    opacity: 0.58,
    x: 38,
    y: 0,
    flapDuration: 1.36,
    flapPhase: 0.9,
    bobDuration: 3.5,
    bobOffset: 4,
    tiltAngle: 2.0,
    bobDelay: -1.6,
  },
  {
    id: 3,
    width: 38, // Lower wing mid
    opacity: 0.78,
    x: 78,
    y: 52,
    flapDuration: 1.64,
    flapPhase: 0.65,
    bobDuration: 2.9,
    bobOffset: 6,
    tiltAngle: -2.5,
    bobDelay: -1.2,
  },
  {
    id: 4,
    width: 30, // Lower wing mid-outer
    opacity: 0.66,
    x: 34,
    y: 74,
    flapDuration: 1.48,
    flapPhase: 1.15,
    bobDuration: 3.3,
    bobOffset: -5,
    tiltAngle: 2.8,
    bobDelay: -2.1,
  },
  {
    id: 5,
    width: 22, // Distant trailing tail (farthest from viewer)
    opacity: 0.5,
    x: 0,
    y: 92,
    flapDuration: 1.7,
    flapPhase: 0.3,
    bobDuration: 3.7,
    bobOffset: -4,
    tiltAngle: -2.0,
    bobDelay: -0.5,
  },
];

export const HeroFlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      <style>{`
        /* Drift left to right across the top 10-30% of the hero over ~30s on mobile, rising slightly, short pause before loop */
        @keyframes flockDriftMobile {
          0% {
            left: -190px;
            transform: translateY(0px) rotate(-1deg);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          87% {
            opacity: 1;
          }
          91% {
            left: calc(100% + 50px);
            transform: translateY(-22px) rotate(-1deg);
            opacity: 0;
          }
          100% {
            left: calc(100% + 50px);
            transform: translateY(-22px) rotate(-1deg);
            opacity: 0;
          }
        }

        /* Desktop: slow drift to ~45s across the top hero sky */
        @keyframes flockDriftDesktop {
          0% {
            left: -190px;
            transform: translateY(0px) rotate(-1deg);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          87% {
            opacity: 1;
          }
          91% {
            left: calc(100% + 50px);
            transform: translateY(-26px) rotate(-1deg);
            opacity: 0;
          }
          100% {
            left: calc(100% + 50px);
            transform: translateY(-26px) rotate(-1deg);
            opacity: 0;
          }
        }

        .flock-mover {
          position: absolute;
          top: 9%;
          width: 175px;
          height: 110px;
          animation: flockDriftMobile 33s linear infinite;
          will-change: left, transform;
        }

        @media (min-width: 768px) {
          .flock-mover {
            top: 10%;
            animation: flockDriftDesktop 49s linear infinite;
          }
        }

        /* Individual Bird Bobbing (±6px) and Tilting (±3°) */
        @keyframes birdBobTilt-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2.5deg); }
        }
        @keyframes birdBobTilt-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(6px) rotate(-3.0deg); }
        }
        @keyframes birdBobTilt-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2.0deg); }
        }
        @keyframes birdBobTilt-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(6px) rotate(-2.5deg); }
        }
        @keyframes birdBobTilt-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2.8deg); }
        }
        @keyframes birdBobTilt-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(4px) rotate(-2.0deg); }
        }

        .bird-bob-0 { animation: birdBobTilt-0 3.1s ease-in-out infinite 0s; }
        .bird-bob-1 { animation: birdBobTilt-1 2.7s ease-in-out infinite -0.9s; }
        .bird-bob-2 { animation: birdBobTilt-2 3.5s ease-in-out infinite -1.6s; }
        .bird-bob-3 { animation: birdBobTilt-3 2.9s ease-in-out infinite -1.2s; }
        .bird-bob-4 { animation: birdBobTilt-4 3.3s ease-in-out infinite -2.1s; }
        .bird-bob-5 { animation: birdBobTilt-5 3.7s ease-in-out infinite -0.5s; }

        /* Respect prefers-reduced-motion: stop the travel and the flapping */
        @media (prefers-reduced-motion: reduce) {
          .flock-mover {
            animation: none !important;
            left: 22% !important;
            top: 16% !important;
            transform: translateY(-8px) rotate(-1deg) !important;
            opacity: 0.85 !important;
          }
          .bird-bob-0,
          .bird-bob-1,
          .bird-bob-2,
          .bird-bob-3,
          .bird-bob-4,
          .bird-bob-5 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Drifting flock container */}
      <div className="flock-mover">
        {BIRDS.map((bird) => {
          const height = Math.round(bird.width * 0.34);
          return (
            <div
              key={bird.id}
              className={`absolute bird-bob-${bird.id}`}
              style={{
                left: `${bird.x}px`,
                top: `${bird.y}px`,
                width: `${bird.width}px`,
                height: `${height}px`,
                opacity: bird.opacity,
              }}
            >
              <svg
                viewBox="0 0 100 34"
                width={bird.width}
                height={height}
                className="overflow-visible block"
              >
                <path d={PATH_GLIDE} fill="#39402b">
                  {!isReducedMotion && (
                    <animate
                      attributeName="d"
                      dur={`${bird.flapDuration}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.25; 0.5; 0.75; 1"
                      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                      values={`${PATH_GLIDE}; ${PATH_UP}; ${PATH_GLIDE}; ${PATH_DOWN}; ${PATH_GLIDE}`}
                      begin={`-${bird.flapPhase}s`}
                    />
                  )}
                </path>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
