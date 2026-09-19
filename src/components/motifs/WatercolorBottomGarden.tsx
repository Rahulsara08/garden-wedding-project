"use client";

import React from "react";

interface WatercolorBottomGardenProps {
  className?: string;
}

export const WatercolorBottomGarden: React.FC<WatercolorBottomGardenProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes gardenSwayLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-1.8deg) translateY(-1px);
          }
        }
        @keyframes gardenSwayRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(1.8deg) translateY(-1px);
          }
        }
        @keyframes petalFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(4deg);
          }
        }
        .sway-left {
          transform-origin: bottom center;
          animation: gardenSwayLeft 5.5s ease-in-out infinite;
        }
        .sway-right {
          transform-origin: bottom center;
          animation: gardenSwayRight 6.2s ease-in-out infinite;
        }
        .sway-slow {
          transform-origin: bottom center;
          animation: gardenSwayLeft 7s ease-in-out infinite;
        }
        .petal-soft {
          animation: petalFloat 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sway-left, .sway-right, .sway-slow, .petal-soft {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 540 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Gradients for soft watercolor landscape mounds */}
          <linearGradient id="wash-back" x1="270" y1="30" x2="270" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9D6C3" stopOpacity="0" />
            <stop offset="35%" stopColor="#C2D1BC" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#A3B89D" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8DA386" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="wash-mid" x1="270" y1="50" x2="270" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B3C4AC" stopOpacity="0" />
            <stop offset="30%" stopColor="#96AB8E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6C8363" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="wash-fore" x1="270" y1="70" x2="270" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#84997C" stopOpacity="0" />
            <stop offset="40%" stopColor="#5E7456" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3F5238" stopOpacity="0.85" />
          </linearGradient>

          {/* Floral Petal Gradients */}
          <linearGradient id="lotus-rose-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D46A78" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#EA95A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FCECEE" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="marigold-gold-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#B6822E" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#E5A335" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FDF2D4" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="jasmine-cream-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E2D4BF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="stem-olive-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2A3824" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5D7354" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="leaf-sage-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3F5238" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8FA885" stopOpacity="0.65" />
          </linearGradient>

          {/* Soft Watercolor filter */}
          <filter id="soft-bleed" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. LAYER 1: Distant Watercolor Meadow Mounds */}
        <g opacity="0.8" filter="url(#soft-bleed)">
          <path
            d="M-20 155 C 50 110, 110 95, 180 115 C 240 130, 300 125, 360 110 C 430 92, 490 108, 560 155 Z"
            fill="url(#wash-back)"
          />
          <path
            d="M-20 155 C 40 120, 95 105, 150 118 C 220 135, 320 132, 390 115 C 460 98, 510 112, 560 155 Z"
            fill="url(#wash-mid)"
            opacity="0.85"
          />
        </g>

        {/* 2. LAYER 2: Foreground Soft Earth Wash */}
        <path
          d="M-20 155 C 60 132, 130 126, 200 135 C 270 144, 340 142, 410 130 C 470 120, 520 128, 560 155 Z"
          fill="url(#wash-fore)"
          opacity="0.85"
        />

        {/* 3. LAYER 3: Botanical Watercolor Flora - Left Cluster */}
        <g className="sway-left">
          {/* Graceful Wild Grass Stems */}
          <path
            d="M 45 155 C 43 118, 32 82, 18 55 C 17 53, 19 53, 21 56 C 36 84, 48 119, 49 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.75"
          />
          <path
            d="M 68 155 C 69 110, 60 70, 42 38 C 41 36, 43 36, 45 39 C 64 72, 74 111, 72 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.8"
          />
          <path
            d="M 88 155 C 92 120, 86 85, 72 58 C 71 56, 73 56, 75 59 C 90 87, 96 121, 92 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.7"
          />

          {/* Eucalyptus Leaf Pairs on Left Stem */}
          {[
            { cx: 34, cy: 92, rx: 9, ry: 4.5, rot: -32 },
            { cx: 48, cy: 98, rx: 8, ry: 4, rot: 25 },
            { cx: 28, cy: 75, rx: 8, ry: 4, rot: -38 },
            { cx: 40, cy: 80, rx: 7.5, ry: 3.8, rot: 22 },
            { cx: 22, cy: 60, rx: 6.5, ry: 3.2, rot: -42 },
          ].map((leaf, idx) => (
            <ellipse
              key={`euca-left-${idx}`}
              cx={leaf.cx}
              cy={leaf.cy}
              rx={leaf.rx}
              ry={leaf.ry}
              transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
              fill="url(#leaf-sage-grad)"
              opacity="0.82"
            />
          ))}

          {/* Watercolor Lotus Blossom (Left Anchor) */}
          <g transform="translate(68, 98)">
            {/* Outer Petals */}
            <path
              d="M 0 16 C -20 8, -26 -12, 0 -24 C 26 -12, 20 8, 0 16 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.75"
            />
            {/* Side Petals Left */}
            <path
              d="M -5 14 C -28 4, -30 -14, -12 -20 C -4 -12, 2 0, -5 14 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            {/* Side Petals Right */}
            <path
              d="M 5 14 C 28 4, 30 -14, 12 -20 C 4 -12, -2 0, 5 14 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            {/* Inner Heart Petal */}
            <path
              d="M 0 12 C -11 0, -12 -16, 0 -21 C 12 -16, 11 0, 0 12 Z"
              fill="#FDF0F2"
              opacity="0.9"
            />
            {/* Golden Core Accent */}
            <circle cx="0" cy="-4" r="3" fill="#E5A335" opacity="0.9" />
          </g>

          {/* Warm Marigold Flower (Left Mid) */}
          <g transform="translate(108, 112)">
            {[0, 30, 60, 90, 120, 150].map((deg, i) => (
              <ellipse
                key={`mari-left-${i}`}
                cx="0"
                cy="0"
                rx="14"
                ry="6"
                transform={`rotate(${deg})`}
                fill="url(#marigold-gold-grad)"
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="5" fill="#8F6218" opacity="0.85" />
            <circle cx="0" cy="0" r="3" fill="#FDF2D4" opacity="0.9" />
          </g>

          {/* Delicate Jasmine Floret (Left Low) */}
          <g transform="translate(36, 122)">
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <ellipse
                key={`jas-left-${i}`}
                cx="0"
                cy="-6"
                rx="3.5"
                ry="7"
                transform={`rotate(${deg})`}
                fill="url(#jasmine-cream-grad)"
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#E5A335" />
          </g>
        </g>

        {/* 4. LAYER 4: Center Ground (Subtle, delicate flora under jhula base) */}
        <g className="sway-slow">
          {/* Soft central water-lily leaves lying gently flat */}
          <ellipse cx="230" cy="144" rx="22" ry="5.5" fill="#5D7354" opacity="0.6" />
          <ellipse cx="310" cy="143" rx="24" ry="5.5" fill="#5D7354" opacity="0.55" />
          <ellipse cx="270" cy="148" rx="26" ry="6" fill="#4B5E46" opacity="0.65" />

          {/* Gentle Central Lotus in full serenity */}
          <g transform="translate(270, 134)">
            <path
              d="M 0 10 C -14 4, -18 -8, 0 -16 C 18 -8, 14 4, 0 10 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.8"
            />
            <path
              d="M -4 9 C -18 2, -18 -10, -7 -14 C -2 -8, 2 0, -4 9 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            <path
              d="M 4 9 C 18 2, 18 -10, 7 -14 C 2 -8, -2 0, 4 9 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            <circle cx="0" cy="-2" r="2.5" fill="#E5A335" opacity="0.9" />
          </g>

          {/* Tiny companion marigold buds around center */}
          <circle cx="242" cy="136" r="4.5" fill="url(#marigold-gold-grad)" opacity="0.85" />
          <circle cx="298" cy="135" r="4" fill="url(#marigold-gold-grad)" opacity="0.8" />
          <circle cx="218" cy="142" r="3" fill="#FFFDF9" opacity="0.85" />
          <circle cx="322" cy="140" r="3" fill="#FFFDF9" opacity="0.85" />
        </g>

        {/* 5. LAYER 5: Botanical Watercolor Flora - Right Cluster */}
        <g className="sway-right">
          {/* Graceful Wild Grass Stems (Right side arching inward/outward) */}
          <path
            d="M 495 155 C 497 118, 508 82, 522 55 C 523 53, 521 53, 519 56 C 504 84, 492 119, 491 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.75"
          />
          <path
            d="M 472 155 C 471 110, 480 70, 498 38 C 499 36, 497 36, 495 39 C 476 72, 466 111, 468 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.8"
          />
          <path
            d="M 452 155 C 448 120, 454 85, 468 58 C 469 56, 467 56, 465 59 C 450 87, 444 121, 448 155 Z"
            fill="url(#stem-olive-grad)"
            opacity="0.7"
          />

          {/* Eucalyptus Leaf Pairs on Right Stem */}
          {[
            { cx: 506, cy: 92, rx: 9, ry: 4.5, rot: 32 },
            { cx: 492, cy: 98, rx: 8, ry: 4, rot: -25 },
            { cx: 512, cy: 75, rx: 8, ry: 4, rot: 38 },
            { cx: 500, cy: 80, rx: 7.5, ry: 3.8, rot: -22 },
            { cx: 518, cy: 60, rx: 6.5, ry: 3.2, rot: 42 },
          ].map((leaf, idx) => (
            <ellipse
              key={`euca-right-${idx}`}
              cx={leaf.cx}
              cy={leaf.cy}
              rx={leaf.rx}
              ry={leaf.ry}
              transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
              fill="url(#leaf-sage-grad)"
              opacity="0.82"
            />
          ))}

          {/* Watercolor Lotus Blossom (Right Anchor) */}
          <g transform="translate(472, 98)">
            {/* Outer Petals */}
            <path
              d="M 0 16 C -20 8, -26 -12, 0 -24 C 26 -12, 20 8, 0 16 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.75"
            />
            {/* Side Petals Left */}
            <path
              d="M -5 14 C -28 4, -30 -14, -12 -20 C -4 -12, 2 0, -5 14 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            {/* Side Petals Right */}
            <path
              d="M 5 14 C 28 4, 30 -14, 12 -20 C 4 -12, -2 0, 5 14 Z"
              fill="url(#lotus-rose-grad)"
              opacity="0.85"
            />
            {/* Inner Heart Petal */}
            <path
              d="M 0 12 C -11 0, -12 -16, 0 -21 C 12 -16, 11 0, 0 12 Z"
              fill="#FDF0F2"
              opacity="0.9"
            />
            {/* Golden Core */}
            <circle cx="0" cy="-4" r="3" fill="#E5A335" opacity="0.9" />
          </g>

          {/* Warm Marigold Flower (Right Mid) */}
          <g transform="translate(432, 112)">
            {[0, 30, 60, 90, 120, 150].map((deg, i) => (
              <ellipse
                key={`mari-right-${i}`}
                cx="0"
                cy="0"
                rx="14"
                ry="6"
                transform={`rotate(${deg})`}
                fill="url(#marigold-gold-grad)"
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="5" fill="#8F6218" opacity="0.85" />
            <circle cx="0" cy="0" r="3" fill="#FDF2D4" opacity="0.9" />
          </g>

          {/* Delicate Jasmine Floret (Right Low) */}
          <g transform="translate(504, 122)">
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <ellipse
                key={`jas-right-${i}`}
                cx="0"
                cy="-6"
                rx="3.5"
                ry="7"
                transform={`rotate(${deg})`}
                fill="url(#jasmine-cream-grad)"
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#E5A335" />
          </g>
        </g>

        {/* 6. LAYER 6: Scattered Petals floating gently in the breeze */}
        <g className="petal-soft">
          <ellipse cx="152" cy="116" rx="4.5" ry="2.2" transform="rotate(-18 152 116)" fill="#EA95A0" opacity="0.75" />
          <ellipse cx="178" cy="132" rx="3.5" ry="1.8" transform="rotate(24 178 132)" fill="#E5A335" opacity="0.8" />
          <ellipse cx="362" cy="120" rx="4.5" ry="2.2" transform="rotate(20 362 120)" fill="#EA95A0" opacity="0.75" />
          <ellipse cx="388" cy="134" rx="3.5" ry="1.8" transform="rotate(-15 388 134)" fill="#E5A335" opacity="0.8" />
        </g>

        {/* 7. Bottom Edge Feathered Ivory Fade into next section */}
        <rect x="0" y="146" width="540" height="9" fill="url(#bottom-fade)" />
        <defs>
          <linearGradient id="bottom-fade" x1="0" y1="146" x2="0" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF3E4" stopOpacity="0" />
            <stop offset="100%" stopColor="#FAF3E4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
