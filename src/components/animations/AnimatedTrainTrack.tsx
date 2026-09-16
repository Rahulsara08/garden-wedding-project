"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedTrainTrackProps {
  className?: string;
}

export const AnimatedTrainTrack: React.FC<AnimatedTrainTrackProps> = ({ className = "" }) => {
  const trainGroupRef = useRef<SVGGElement>(null);
  
  // Wheel refs for Engine
  const eW1Ref = useRef<SVGGElement>(null);
  const eW2Ref = useRef<SVGGElement>(null);
  const eW3Ref = useRef<SVGGElement>(null);
  const eRearW1Ref = useRef<SVGGElement>(null);
  const eRearW2Ref = useRef<SVGGElement>(null);
  const eRearW3Ref = useRef<SVGGElement>(null);

  // Wheel refs for Cart 1
  const c1W1Ref = useRef<SVGGElement>(null);
  const c1W2Ref = useRef<SVGGElement>(null);

  // Wheel refs for Cart 2
  const c2W1Ref = useRef<SVGGElement>(null);
  const c2W2Ref = useRef<SVGGElement>(null);

  // Engine Body & Cutout (exact contour from Image 1)
  const engineBodyD =
    "M 0,0 L 0,169 L 18,169 L 19,170 L 66,170 L 128,170 L 175,170 L 237,170 L 284,170 L 331,169 L 336,168 L 341,167 L 348,165 L 360,161 L 367,158 L 375,154 L 380,151 L 383,149 L 387,146 L 394,139 L 396,136 L 397,134 L 398,132 L 398,129 L 399,128 L 399,126 L 398,125 L 398,122 L 397,120 L 395,117 L 392,113 L 384,105 L 384,104 L 377,97 L 365,86 L 357,79 L 351,74 L 345,69 L 340,65 L 328,56 L 322,52 L 313,46 L 308,43 L 303,40 L 292,34 L 290,33 L 288,32 L 275,26 L 268,23 L 263,21 L 258,19 L 240,13 L 233,11 L 217,7 L 202,4 L 195,3 L 188,2 L 179,1 L 164,0 Z M 26,25 L 164,25 L 177,26 L 185,27 L 192,28 L 198,29 L 203,30 L 208,31 L 213,33 L 213,66 L 214,70 L 215,73 L 217,76 L 221,80 L 224,82 L 226,83 L 230,84 L 323,84 L 327,87 L 331,90 L 337,95 L 344,101 L 354,111 L 25,111 Z M 154,54 L 155,85 L 187,84 L 187,55 L 185,53 Z M 101,54 L 102,85 L 133,85 L 133,53 Z M 48,54 L 48,85 L 80,85 L 79,53 Z";

  // Passenger Cart Body with cutout and 4 passenger windows matching engine style
  const cartBodyD =
    "M 4,0 L 216,0 C 218,0 220,2 220,4 L 220,170 L 0,170 L 0,4 C 0,2 2,0 4,0 Z M 14,25 L 206,25 L 206,111 L 14,111 Z M 24,54 L 24,85 L 56,85 L 56,53 Z M 72,54 L 72,85 L 104,85 L 104,53 Z M 120,54 L 120,85 L 152,85 L 152,53 Z M 168,54 L 168,85 L 200,85 L 200,53 Z";

  useEffect(() => {
    const trainGroup = trainGroupRef.current;
    const ew1 = eW1Ref.current;
    const ew2 = eW2Ref.current;
    const ew3 = eW3Ref.current;
    const c1w1 = c1W1Ref.current;
    const c1w2 = c1W2Ref.current;
    const erw1 = eRearW1Ref.current;
    const erw2 = eRearW2Ref.current;
    const erw3 = eRearW3Ref.current;
    const c2w1 = c2W1Ref.current;
    const c2w2 = c2W2Ref.current;

    if (!trainGroup || !ew1 || !ew2 || !ew3 || !erw1 || !erw2 || !erw3 || !c1w1 || !c1w2 || !c2w1 || !c2w2) return;

    let animationFrameId: number;

    const travelDuration = 5000; // 5.0s synchronized travel across screen
    const pauseDuration = 1000;  // 1.0s synchronized rest at destination
    const fadeDuration = 400;    // 0.4s synchronized fade reset
    const totalCycle = travelDuration + pauseDuration + fadeDuration; // 6.4s total cycle

    // Train length = Engine(400) + 2 Carts(220 each) + Rear Engine(400) + Couplers ~ 1300 in local coords
    const scale = 0.28;
    const startX = -150; // Starts right before entering screen on the left
    const endX = 600;    // Ends fully off-screen to the right
    const wheelRadius = 23 * scale; // in viewBox units

    const animate = (timestamp: number) => {
      const elapsed = timestamp % totalCycle;

      let x = startX;
      let opacity = 1;

      if (elapsed <= travelDuration) {
        // Phase 1: Travel across track
        const t = elapsed / travelDuration;
        x = startX + t * (endX - startX);
        opacity = 1;
      } else if (elapsed <= travelDuration + pauseDuration) {
        // Phase 2: Hold at destination
        x = endX;
        opacity = 1;
      } else {
        // Phase 3: Fade out reset
        x = endX;
        const fadeElapsed = elapsed - (travelDuration + pauseDuration);
        opacity = Math.max(0, 1 - fadeElapsed / fadeDuration);
      }

      trainGroup.setAttribute("transform", "translate(" + x + ", 21) scale(" + scale + ")");
      trainGroup.style.opacity = String(opacity);

      // Wheel rotation angle directly proportional to physical distance traveled
      const dist = x - startX;
      const rotDeg = (dist / wheelRadius) * (180 / Math.PI);

      // Rotate engine wheels
      ew1.setAttribute("transform", "translate(42.5, 161) rotate(" + rotDeg + ")");
      ew2.setAttribute("transform", "translate(151.5, 161) rotate(" + rotDeg + ")");
      ew3.setAttribute("transform", "translate(260.5, 161) rotate(" + rotDeg + ")");

      // Rotate Cart 1 wheels
      c1w1.setAttribute("transform", "translate(48, 161) rotate(" + rotDeg + ")");
      c1w2.setAttribute("transform", "translate(172, 161) rotate(" + rotDeg + ")");

      // Rotate Cart 2 wheels
      c2w1.setAttribute("transform", "translate(48, 161) rotate(" + rotDeg + ")");
      c2w2.setAttribute("transform", "translate(172, 161) rotate(" + rotDeg + ")");

      // Rotate rear engine wheels (mirrored, so we invert the rotation angle to maintain visual clockwise rotation)
      erw1.setAttribute("transform", "translate(42.5, 161) rotate(" + (-rotDeg) + ")");
      erw2.setAttribute("transform", "translate(151.5, 161) rotate(" + (-rotDeg) + ")");
      erw3.setAttribute("transform", "translate(260.5, 161) rotate(" + (-rotDeg) + ")");

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={"relative w-full max-w-[300px] mx-auto overflow-hidden select-none pointer-events-none py-1 " + className}>
      <svg
        viewBox="0 0 300 80"
        className="w-full h-auto overflow-hidden"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slimmer Track Line (thinner width matching Image 1: 3.5px height) */}
        <path
          d="M 0,72 L 292,72 C 295,72 295,75.5 292,75.5 L 0,75.5 Z"
          fill="#1F2921"
        />

        {/* Full Train: Cart 2 + Coupler + Cart 1 + Coupler + Engine */}
        <g ref={trainGroupRef} transform="translate(-270, 21) scale(0.28)">
          
          {/* --- REAR ENGINE (facing backward, mirrored) --- */}
          {/* translate(-504, 0) puts the flat back at -504, extending left to -904 */}
          <g transform="translate(-504, 0) scale(-1, 1)">
            {/* Rear Engine Wheels */}
            <g ref={eRearW1Ref} transform="translate(42.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={eRearW2Ref} transform="translate(151.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={eRearW3Ref} transform="translate(260.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            {/* Rear Engine Body */}
            <path d={engineBodyD} fill="#1F2921" fillRule="evenodd" />
          </g>

          {/* Coupler between Rear Engine and Cart 2 */}
          <rect x="-504" y="146" width="20" height="12" rx="2" fill="#1F2921" />

          {/* --- PASSENGER CART 2 (REAR) --- */}
          <g transform="translate(-484, 0)">
            {/* Coupler between Cart 2 and Cart 1 */}
            <rect x="220" y="146" width="24" height="12" rx="2" fill="#1F2921" />

            {/* Cart 2 Wheels */}
            <g ref={c2W1Ref} transform="translate(48, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={c2W2Ref} transform="translate(172, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>

            {/* Cart 2 Body */}
            <path d={cartBodyD} fill="#1F2921" fillRule="evenodd" />
          </g>

          {/* --- PASSENGER CART 1 (MIDDLE) --- */}
          <g transform="translate(-240, 0)">
            {/* Coupler between Cart 1 and Engine */}
            <rect x="220" y="146" width="20" height="12" rx="2" fill="#1F2921" />

            {/* Cart 1 Wheels */}
            <g ref={c1W1Ref} transform="translate(48, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={c1W2Ref} transform="translate(172, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>

            {/* Cart 1 Body */}
            <path d={cartBodyD} fill="#1F2921" fillRule="evenodd" />
          </g>

          {/* --- ENGINE / LOCOMOTIVE (FRONT) --- */}
          <g transform="translate(0, 0)">
            {/* Engine Wheels */}
            <g ref={eW1Ref} transform="translate(42.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={eW2Ref} transform="translate(151.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>
            <g ref={eW3Ref} transform="translate(260.5, 161)">
              <circle r="23" fill="#1F2921" />
              <circle r="18" fill="none" stroke="#FAF3E4" strokeWidth="2.2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#FAF3E4" strokeWidth="2.4" strokeLinecap="round" />
              <circle r="6" fill="#1F2921" stroke="#FAF3E4" strokeWidth="1.8" />
            </g>

            {/* Engine Body & Windows */}
            <path d={engineBodyD} fill="#1F2921" fillRule="evenodd" />
          </g>

        </g>
      </svg>
    </div>
  );
};
