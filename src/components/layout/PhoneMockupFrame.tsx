"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollContainerProvider } from "@/context/ScrollContainerContext";

interface PhoneMockupFrameProps {
  children: (scrollContainerRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
}

export const PhoneMockupFrame: React.FC<PhoneMockupFrameProps> = ({ children }) => {
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // When on an actual mobile device (< 768px), fill the screen edge-to-edge
  const showPhoneFrame = !isMobileScreen;

  return (
    <ScrollContainerProvider
      containerRef={showPhoneFrame ? phoneScrollRef : null}
      isFramed={showPhoneFrame}
    >
      <div className="relative min-h-screen w-full bg-ivory flex flex-col items-center justify-center selection:bg-gold/20 selection:text-forest overflow-x-hidden">
        {/* Desktop Ambient Wallpaper Background */}
        {showPhoneFrame && (
          <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
            <Image
              src="/assets/watercolor/desktop-ambient-wallpaper.jpg"
              alt="Vrindavan Royal Waterscape Wallpaper"
              fill
              className="object-cover object-center filter brightness-[0.99] contrast-[1.02]"
              priority
              unoptimized
            />
            {/* Soft ivory-gold tint overlay to create subtle depth behind the phone casing */}
            <div className="absolute inset-0 bg-[#F6EEDD]/20 backdrop-blur-[1px]" />
          </div>
        )}

        {/* Smartphone Chassis Container (Desktop) OR Native Full View (Mobile) */}
        {showPhoneFrame ? (
          <div className="relative z-10 my-3 md:my-5 flex items-center justify-center">
            {/* Outer Smartphone Frame (iPhone Pro style titanium casing) */}
            <div
              className="relative w-[375px] sm:w-[390px] md:w-[412px] h-[820px] sm:h-[850px] md:h-[870px] max-h-[96vh] bg-[#1E2420] rounded-[52px] p-3 shadow-2xl border-[3px] border-[#2C362F]"
              style={{
                boxShadow:
                  "0 35px 80px -15px rgba(25, 32, 26, 0.45), 0 0 45px rgba(182, 141, 76, 0.15), inset 0 0 4px rgba(255,255,255,0.15)",
              }}
            >
              {/* Left Side Buttons (Volume & Mute) */}
              <div className="absolute -left-[5px] top-28 w-[3px] h-8 bg-[#181D1A] rounded-l-xs" />
              <div className="absolute -left-[5px] top-40 w-[3px] h-12 bg-[#181D1A] rounded-l-xs" />
              <div className="absolute -left-[5px] top-56 w-[3px] h-12 bg-[#181D1A] rounded-l-xs" />

              {/* Right Side Button (Power) */}
              <div className="absolute -right-[5px] top-44 w-[3px] h-16 bg-[#181D1A] rounded-r-xs" />

              {/* Inner Screen Bezel */}
              <div className="relative w-full h-full bg-ivory rounded-[42px] overflow-hidden flex flex-col border border-gold/15">
                {/* Top Dynamic Island Pill */}
                <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-center pointer-events-none select-none">
                  <div className="flex items-center justify-between px-3 w-28 h-6 bg-black rounded-full shadow-md">
                    {/* Camera lens */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F26] border border-white/10 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#283850]" />
                    </div>
                    {/* Sensor dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A1F26]" />
                  </div>
                </div>

                {/* Inner Scrollable Website Container */}
                <div
                  ref={phoneScrollRef}
                  className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden pt-0 pb-4 select-text scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {children(phoneScrollRef)}
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-0 right-0 flex justify-center pointer-events-none select-none z-50">
                  <div className="w-32 h-1 bg-forest/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Native Full Screen View on Actual Mobile Devices */
          <div className="w-full min-h-screen flex-1 overflow-x-hidden">
            {children(phoneScrollRef)}
          </div>
        )}
      </div>
    </ScrollContainerProvider>
  );
};
