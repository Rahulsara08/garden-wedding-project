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

  // Fast & responsive scroll tracking — starts early and follows scroll instantly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer || undefined,
    offset: ["start 85%", "end 15%"],
  });

  // Ultra-responsive spring: high stiffness + low damping for immediate scroll response
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 1200,
    damping: 28,
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

      // 1. Path starts directly at the first sign (Sun icon) — NO line above cutting header text
      const firstIconRect = iconEls[0].getBoundingClientRect();
      const firstIconCenterY =
        firstIconRect.top + firstIconRect.height / 2 - containerRect.top;

      d += `M ${cx} ${firstIconCenterY}`;

      // 2. Weave through each pair of events staying strictly in outer margins (8px from edge), clearing all card text
      for (let i = 0; i < iconEls.length - 1; i++) {
        const currIcon = iconEls[i];
        const nextIcon = iconEls[i + 1];
        const card = cardEls[i];

        const currRect = currIcon.getBoundingClientRect();
        const nextRect = nextIcon.getBoundingClientRect();

        const currCenterY = currRect.top + currRect.height / 2 - containerRect.top;
        const nextCenterY = nextRect.top + nextRect.height / 2 - containerRect.top;

        // Alternate sides: Event 0 curves LEFT, Event 1 curves RIGHT...
        const isLeft = i % 2 === 0;

        let cardTop = currCenterY + 28;
        let cardBottom = nextCenterY - 28;

        if (card) {
          const cardRect = card.getBoundingClientRect();
          cardTop = cardRect.top - containerRect.top;
          cardBottom = cardRect.bottom - containerRect.top;
        }

        // Extremely safe side margin (8px from edge) — far outside any card text
        const sideX = isLeft ? 8 : cWidth - 8;

        // Transition Y bounds: reach sideX BEFORE cardTop (above title), leave sideX AFTER cardBottom
        const yOut = Math.min(cardTop - 10, currCenterY + 20);
        const yIn = Math.max(cardBottom + 10, nextCenterY - 20);

        // Segment 1: Quick sharp arc from icon center to side margin ABOVE card title
        d += ` C ${cx + (sideX - cx) * 0.9} ${currCenterY + 2}, ${sideX} ${currCenterY + 8}, ${sideX} ${yOut}`;

        // Segment 2: Vertical track down the outer margin (8px from edge) completely clear of all card text
        d += ` L ${sideX} ${yIn}`;

        // Segment 3: Sharp arc from side margin below card bottom into next icon center
        d += ` C ${sideX} ${nextCenterY - 8}, ${cx + (sideX - cx) * 0.9} ${nextCenterY - 2}, ${cx} ${nextCenterY}`;
      }

      // Path terminates right at the center of the last icon (Heart sign) behind it.
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

        {/* Fast animated flowing dashed golden line */}
        <motion.path
          d={pathD}
          stroke="url(#timelineGoldGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 9"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Active solid ultra-fast scroll-revealed gold line */}
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
