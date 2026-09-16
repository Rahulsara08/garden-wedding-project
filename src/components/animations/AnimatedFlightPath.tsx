"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedFlightPathProps {
  className?: string;
}

export const AnimatedFlightPath: React.FC<AnimatedFlightPathProps> = ({ className = "" }) => {
  const flightPathRef = useRef<SVGPathElement>(null);
  const maskPath1Ref = useRef<SVGPathElement>(null);
  const maskPath2Ref = useRef<SVGPathElement>(null);
  const trail1Ref = useRef<SVGPathElement>(null);
  const trail2Ref = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  // Exact trajectory: entry -> heart loop -> crossover -> destination swoop
  const fullTrailD =
    "M 25,125 C 30.0,124.2 46.7,122.2 55.0,120.0 C 63.3,117.8 69.1,115.1 75.0,112.0 C 80.9,108.9 85.9,105.5 90.6,101.5 C 95.3,97.5 99.1,92.8 103.0,88.0 C 106.9,83.3 110.8,78.3 114.0,73.0 C 117.2,67.7 120.2,62.3 122.0,56.0 C 123.8,49.7 125.8,40.8 124.8,35.0 C 123.8,29.2 119.5,23.9 116.0,21.0 C 112.5,18.1 108.2,17.2 104.0,17.5 C 99.8,17.8 95.0,19.9 91.0,23.0 C 87.0,26.1 83.7,35.3 80.0,35.8 C 76.3,36.3 73.3,28.1 69.0,26.0 C 64.7,23.9 58.5,22.5 54.0,23.5 C 49.5,24.5 44.6,28.1 42.0,32.0 C 39.4,35.9 38.3,41.5 38.6,46.8 C 38.9,52.1 41.3,59.0 44.0,64.0 C 46.7,69.0 50.7,73.0 55.0,77.0 C 59.3,81.0 64.1,83.9 70.0,88.0 C 75.9,92.1 84.6,98.2 90.6,101.5 C 96.6,104.8 100.4,105.9 106.0,108.0 C 111.6,110.1 117.5,112.5 124.0,114.0 C 130.5,115.5 137.3,117.2 145.0,117.0 C 152.7,116.8 161.2,115.8 170.0,113.0 C 178.8,110.2 189.0,105.8 198.0,100.0 C 207.0,94.2 216.2,86.0 224.0,78.0 C 231.8,70.0 239.3,59.2 245.0,52.0 C 250.7,44.8 255.8,37.8 258.0,35.0";

  // Segment 1: Entry + Complete Heart Loop up to return crossover at (90.6, 101.5)
  const trailD1 =
    "M 25,125 C 30.0,124.2 46.7,122.2 55.0,120.0 C 63.3,117.8 69.1,115.1 75.0,112.0 C 80.9,108.9 85.9,105.5 90.6,101.5 C 95.3,97.5 99.1,92.8 103.0,88.0 C 106.9,83.3 110.8,78.3 114.0,73.0 C 117.2,67.7 120.2,62.3 122.0,56.0 C 123.8,49.7 125.8,40.8 124.8,35.0 C 123.8,29.2 119.5,23.9 116.0,21.0 C 112.5,18.1 108.2,17.2 104.0,17.5 C 99.8,17.8 95.0,19.9 91.0,23.0 C 87.0,26.1 83.7,35.3 80.0,35.8 C 76.3,36.3 73.3,28.1 69.0,26.0 C 64.7,23.9 58.5,22.5 54.0,23.5 C 49.5,24.5 44.6,28.1 42.0,32.0 C 39.4,35.9 38.3,41.5 38.6,46.8 C 38.9,52.1 41.3,59.0 44.0,64.0 C 46.7,69.0 50.7,73.0 55.0,77.0 C 59.3,81.0 64.1,83.9 70.0,88.0 C 75.9,92.1 84.6,98.2 90.6,101.5";

  // Segment 2: Exit swoop from crossover to top right destination
  const trailD2 =
    "M 90.6,101.5 C 96.6,104.8 100.4,105.9 106.0,108.0 C 111.6,110.1 117.5,112.5 124.0,114.0 C 130.5,115.5 137.3,117.2 145.0,117.0 C 152.7,116.8 161.2,115.8 170.0,113.0 C 178.8,110.2 189.0,105.8 198.0,100.0 C 207.0,94.2 216.2,86.0 224.0,78.0 C 231.8,70.0 239.3,59.2 245.0,52.0 C 250.7,44.8 255.8,37.8 258.0,35.0";

  // Flat 2D airliner silhouette with 4 jet engines and swept wings
  const planeD =
    "M 0,-20 C 1.8,-20 3.2,-17 3.5,-13 L 4,-5 L 7.5,-3 L 8,-5.5 L 10,-5.5 L 10,-1.5 L 13.5,0.5 L 14,-2 L 16,-2 L 16,2 L 22,5.5 L 21.5,7.5 L 4,1.5 L 4,12 L 10,15.5 L 9.5,18 L 2.5,16.5 L 0,19 L -2.5,16.5 L -9.5,18 L -10,15.5 L -4,12 L -4,1.5 L -21.5,7.5 L -22,5.5 L -16,2 L -16,-2 L -14,-2 L -13.5,0.5 L -10,-1.5 L -10,-5.5 L -8,-5.5 L -7.5,-3 L -4,-5 L -3.5,-13 C -3.2,-17 -1.8,-20 0,-20 Z";

  useEffect(() => {
    const flightPath = flightPathRef.current;
    const maskPath1 = maskPath1Ref.current;
    const maskPath2 = maskPath2Ref.current;
    const trail1 = trail1Ref.current;
    const trail2 = trail2Ref.current;
    const plane = planeRef.current;
    if (!flightPath || !maskPath1 || !maskPath2 || !trail1 || !trail2 || !plane) return;

    const totalLength = flightPath.getTotalLength();
    const length1 = maskPath1.getTotalLength();
    const length2 = maskPath2.getTotalLength();

    maskPath1.style.strokeDasharray = String(length1);
    maskPath1.style.strokeDashoffset = String(length1);

    maskPath2.style.strokeDasharray = String(length2);
    maskPath2.style.strokeDashoffset = String(length2);
    trail2.style.opacity = "0";

    let animationFrameId: number;
    const flightDuration = 5000; // 5.0s synchronized flight
    const pauseDuration = 1000;  // 1.0s synchronized rest at destination
    const fadeDuration = 400;    // 0.4s synchronized fade reset
    const totalCycle = flightDuration + pauseDuration + fadeDuration; // 6.4s total cycle

    const animate = (timestamp: number) => {
      const elapsed = timestamp % totalCycle;

      let progress = 0;
      let opacity = 1;

      if (elapsed <= flightDuration) {
        // Smooth sinusoidal flight
        const t = elapsed / flightDuration;
        progress = -(Math.cos(Math.PI * t) - 1) / 2;
      } else if (elapsed <= flightDuration + pauseDuration) {
        // Rest at destination
        progress = 1;
        opacity = 1;
      } else {
        // Fade reset phase
        progress = 1;
        const fadeElapsed = elapsed - (flightDuration + pauseDuration);
        opacity = Math.max(0, 1 - fadeElapsed / fadeDuration);
      }

      const currentLength = Math.max(0.1, progress * totalLength);

      // Sequential segment unmasking eliminates any premature extra lines at crossover
      if (currentLength <= length1) {
        // Phase 1: Flying entry and heart loop
        maskPath1.style.strokeDashoffset = String(length1 - currentLength);
        maskPath2.style.strokeDashoffset = String(length2);
        trail2.style.opacity = "0";
      } else {
        // Phase 2: Completed loop, swooping to destination
        maskPath1.style.strokeDashoffset = "0";
        trail2.style.opacity = String(opacity);
        const progress2 = currentLength - length1;
        maskPath2.style.strokeDashoffset = String(Math.max(0, length2 - progress2));
      }

      // Exact tangent angle calculation (3-point delta prevents flattening at ends)
      let pAhead: DOMPoint;
      let pBehind: DOMPoint;
      if (currentLength >= totalLength - 2) {
        pAhead = flightPath.getPointAtLength(totalLength);
        pBehind = flightPath.getPointAtLength(totalLength - 3);
      } else if (currentLength <= 2) {
        pAhead = flightPath.getPointAtLength(3);
        pBehind = flightPath.getPointAtLength(0);
      } else {
        pAhead = flightPath.getPointAtLength(currentLength + 1.5);
        pBehind = flightPath.getPointAtLength(currentLength - 1.5);
      }

      const angleRad = Math.atan2(pAhead.y - pBehind.y, pAhead.x - pBehind.x);
      const angleDeg = (angleRad * 180) / Math.PI;

      const pt = flightPath.getPointAtLength(currentLength);
      // Plane nose points UP (-90 deg from +X), so rotate by angleDeg + 90
      plane.setAttribute(
        "transform",
        "translate(" + pt.x + ", " + pt.y + ") rotate(" + (angleDeg + 90) + ") scale(1.25)"
      );
      plane.style.opacity = String(opacity);
      trail1.style.opacity = String(opacity);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={"relative w-full max-w-[280px] mx-auto overflow-visible select-none pointer-events-none py-1 " + className}>
      <svg
        viewBox="15 5 265 130"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Reference path for physical airplane trajectory */}
          <path ref={flightPathRef} d={fullTrailD} fill="none" stroke="none" />

          {/* Mask 1: Unmasks Entry & Heart Loop */}
          <mask id="heart-mask-1">
            <path
              ref={maskPath1Ref}
              d={trailD1}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </mask>

          {/* Mask 2: Unmasks Exit Trail to destination */}
          <mask id="heart-mask-2">
            <path
              ref={maskPath2Ref}
              d={trailD2}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Segment 1 Dashed Trail (Entry & Heart Loop) */}
        <path
          ref={trail1Ref}
          d={trailD1}
          fill="none"
          stroke="#1F2921"
          strokeWidth="1.8"
          strokeDasharray="4.5 4.5"
          strokeLinecap="round"
          mask="url(#heart-mask-1)"
          className="transition-opacity duration-300"
        />

        {/* Segment 2 Dashed Trail (Exit Swoop - starts with gap to ensure zero extra line at crossover) */}
        <path
          ref={trail2Ref}
          d={trailD2}
          fill="none"
          stroke="#1F2921"
          strokeWidth="1.8"
          strokeDasharray="4.5 4.5"
          strokeDashoffset="-3"
          strokeLinecap="round"
          mask="url(#heart-mask-2)"
          className="transition-opacity duration-300"
        />

        {/* Bigger Airplane Silhouette (1.25x) */}
        <g ref={planeRef} className="transition-opacity duration-300">
          <path d={planeD} fill="#1F2921" />
        </g>
      </svg>
    </div>
  );
};
