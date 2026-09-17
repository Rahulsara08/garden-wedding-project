"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollContainer } from "@/context/ScrollContainerContext";

interface SvgFollowScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const SvgFollowScroll: React.FC<SvgFollowScrollProps> = ({
  containerRef,
  className = "",
}) => {
  const { containerRef: scrollContainer } = useScrollContainer();
  const [pathD, setPathD] = useState<string>("");
  const [svgDimensions, setSvgDimensions] = useState<{ width: number; height: number }>({
    width: 400,
    height: 1200,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  useEffect(() => {
    const calculatePath = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const cWidth = containerRect.width;
      const cHeight = containerRect.height;
      if (cWidth <= 0 || cHeight <= 0) return;

      const iconEls = Array.from(
        container.querySelectorAll<HTMLElement>("[data-timeline-icon]")
      );
      const cardEls = Array.from(
        container.querySelectorAll<HTMLElement>("[data-timeline-card]")
      );

      if (iconEls.length === 0) return;

      const cx = cWidth / 2;
      let d = "";

      // 1. Entry line from top down behind the very first icon (Sun)
      const firstIconRect = iconEls[0].getBoundingClientRect();
      const firstIconCenterY =
        firstIconRect.top + firstIconRect.height / 2 - containerRect.top;

      d += `M ${cx} 0 L ${cx} ${firstIconCenterY}`;

      // 2. Weave through each pair of events
      for (let i = 0; i < iconEls.length - 1; i++) {
        const currIcon = iconEls[i];
        const nextIcon = iconEls[i + 1];
        const card = cardEls[i];

        const currRect = currIcon.getBoundingClientRect();
        const nextRect = nextIcon.getBoundingClientRect();

        const currCenterY =
          currRect.top + currRect.height / 2 - containerRect.top;
        const nextCenterY =
          nextRect.top + nextRect.height / 2 - containerRect.top;

        // Alternate sides: Event 0 (Haldi) curves LEFT, Event 1 (Mehndi) curves RIGHT, Event 2 curves LEFT...
        const isLeft = i % 2 === 0;

        let sideX: number;
        let cardTop = currCenterY + 35;
        let cardBottom = nextCenterY - 35;

        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cLeft = cardRect.left - containerRect.left;
          const cRight = cardRect.right - containerRect.left;
          cardTop = cardRect.top - containerRect.top;
          cardBottom = cardRect.bottom - containerRect.top;

          // Push safely to the outer side (at least 26px outside all text and chips)
          if (isLeft) {
            sideX = Math.max(14, cLeft - 26);
          } else {
            sideX = Math.min(cWidth - 14, cRight + 26);
          }
        } else {
          sideX = isLeft ? Math.max(14, cx - 145) : Math.min(cWidth - 14, cx + 145);
        }

        // Key heights for smooth S-curve transition
        const yLeave = currCenterY + 12; // leaves icon circle bottom
        const yReachSide = Math.min(cardTop + 5, yLeave + (nextCenterY - yLeave) * 0.22);
        const yLeaveSide = Math.max(cardBottom + 5, nextCenterY - (nextCenterY - yLeave) * 0.25);

        // Arc outward from icon center behind the icon to sideX before the text starts
        const cp1_y = yLeave + (yReachSide - yLeave) * 0.45;
        const cp2_y = yReachSide - (yReachSide - yLeave) * 0.25;
        d += ` C ${cx} ${cp1_y}, ${sideX} ${cp2_y}, ${sideX} ${yReachSide}`;

        // Straight path along the safe outer margin completely clear of all text
        d += ` L ${sideX} ${yLeaveSide}`;

        // Arc smoothly inward below the text into the exact center of the next icon
        const cp3_y = yLeaveSide + (nextCenterY - yLeaveSide) * 0.35;
        const cp4_y = nextCenterY - (nextCenterY - yLeaveSide) * 0.45;
        d += ` C ${sideX} ${cp3_y}, ${cx} ${cp4_y}, ${cx} ${nextCenterY}`;
      }

      // The path terminates right at the center of the last icon (Heart sign) behind it.
      // It does NOT continue down past the last icon, keeping all bottom text clean.

      setSvgDimensions({ width: cWidth, height: cHeight });
      setPathD(d);
    };

    // Calculate immediately and after short delay for fonts and dynamic layouts
    calculatePath();
    const timer1 = setTimeout(calculatePath, 60);
    const timer2 = setTimeout(calculatePath, 350);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", calculatePath);
    }

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(calculatePath);
      observer.observe(containerRef.current);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(calculatePath);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", calculatePath);
      }
      observer?.disconnect();
    };
  }, [containerRef]);

  if (!pathD) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="timelineGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B68D4C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8F6E36" />
          </linearGradient>
        </defs>

        {/* Faint background golden guideline track passing behind signs and along margins */}
        <path
          d={pathD}
          stroke="#B68D4C"
          strokeWidth="2"
          strokeDasharray="5 7"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Animated flowing dashed golden line */}
        <motion.path
          d={pathD}
          stroke="url(#timelineGoldGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 9"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Active solid scroll-revealed gold line */}
        <motion.path
          d={pathD}
          stroke="url(#timelineGoldGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};
