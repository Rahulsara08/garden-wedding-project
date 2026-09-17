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

  // Fast & responsive scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start 75%", "end 25%"],
  });

  // High stiffness + tuned damping for fast, instant scroll-following animation
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 800,
    damping: 35,
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

      // 1. Path starts directly at the first sign (Sun icon) — NO vertical line above cutting header text
      const firstIconRect = iconEls[0].getBoundingClientRect();
      const firstIconCenterY =
        firstIconRect.top + firstIconRect.height / 2 - containerRect.top;

      d += `M ${cx} ${firstIconCenterY}`;

      // 2. Weave through each pair of events in a wide, fluid sweeping arc that completely clears all text
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

        // Alternate sides: Event 0 (Haldi) curves LEFT, Event 1 (Mehndi) curves RIGHT...
        const isLeft = i % 2 === 0;

        let sideX: number;
        let cardTop = currCenterY + 36;
        let cardBottom = nextCenterY - 36;

        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cLeft = cardRect.left - containerRect.left;
          const cRight = cardRect.right - containerRect.left;
          cardTop = cardRect.top - containerRect.top;
          cardBottom = cardRect.bottom - containerRect.top;

          // Push widely to the outer margin (36px clear of title, subtitle & chips)
          if (isLeft) {
            sideX = Math.max(10, cLeft - 36);
          } else {
            sideX = Math.min(cWidth - 10, cRight + 36);
          }
        } else {
          sideX = isLeft ? Math.max(10, cx - 152) : Math.min(cWidth - 10, cx + 152);
        }

        // Transition Y points:
        // yOut: reaches sideX BEFORE cardTop (above title)
        // yIn: leaves sideX AFTER cardBottom (below "Get Directions →")
        const yOut = Math.min(cardTop - 4, currCenterY + (nextCenterY - currCenterY) * 0.2);
        const yIn = Math.max(cardBottom + 8, nextCenterY - (nextCenterY - currCenterY) * 0.22);
        const dyMid = Math.max(10, yIn - yOut);

        // Belly bulge X for a wide, fluid, rounded arc
        const sideBellyX = isLeft
          ? Math.max(6, sideX - 8)
          : Math.min(cWidth - 6, sideX + 8);

        // Arc 1: Outward from icon center to sideX before reaching cardTop (above title)
        d += ` C ${cx} ${currCenterY + 16}, ${sideX} ${yOut - 12}, ${sideX} ${yOut}`;

        // Arc 2: Wide, continuous bowed curve down outer margin clearing all card text & chips
        d += ` C ${sideBellyX} ${yOut + dyMid * 0.3}, ${sideBellyX} ${yIn - dyMid * 0.3}, ${sideX} ${yIn}`;

        // Arc 3: Inward below cardBottom into next icon center
        d += ` C ${sideX} ${yIn + 12}, ${cx} ${nextCenterY - 16}, ${cx} ${nextCenterY}`;
      }

      // The path terminates right at the center of the last icon (Heart sign) behind it.
      setSvgDimensions({ width: cWidth, height: cHeight });
      setPathD(d);
    };

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

        {/* Animated fast flowing dashed golden line */}
        <motion.path
          d={pathD}
          stroke="url(#timelineGoldGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 9"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Active solid fast scroll-revealed gold line */}
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
