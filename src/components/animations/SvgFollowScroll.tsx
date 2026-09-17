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

      // 2. Weave through each pair of events in a smooth, continuous fluid arc (like "(" and ")")
      for (let i = 0; i < iconEls.length - 1; i++) {
        const currIcon = iconEls[i];
        const nextIcon = iconEls[i + 1];

        const currRect = currIcon.getBoundingClientRect();
        const nextRect = nextIcon.getBoundingClientRect();

        const currCenterY = currRect.top + currRect.height / 2 - containerRect.top;
        const nextCenterY = nextRect.top + nextRect.height / 2 - containerRect.top;

        // Alternate sides: Event 0 arcs LEFT, Event 1 arcs RIGHT...
        const isLeft = i % 2 === 0;

        // Peak outer margin (10px from edge) — clear of all card text
        const sideX = isLeft ? 10 : cWidth - 10;
        const bellyX = isLeft ? 4 : cWidth - 4;

        const dy = nextCenterY - currCenterY;
        const midY = currCenterY + dy * 0.5;

        // Top Arc: leaves icon center (cx, currCenterY) bowing gracefully outward to outer margin (sideX, midY)
        const cp1x = cx + (sideX - cx) * 0.65;
        const cp1y = currCenterY + dy * 0.14;
        const cp2x = bellyX;
        const cp2y = midY - dy * 0.16;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${sideX} ${midY}`;

        // Bottom Arc: sweeps smoothly from outer margin (sideX, midY) inward into next icon center (cx, nextCenterY)
        const cp3x = bellyX;
        const cp3y = midY + dy * 0.16;
        const cp4x = cx + (sideX - cx) * 0.65;
        const cp4y = nextCenterY - dy * 0.14;

        d += ` C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${cx} ${nextCenterY}`;
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
