"use client";

import React, { createContext, useContext } from "react";

interface ScrollContainerContextType {
  containerRef: React.RefObject<HTMLDivElement | null> | null;
  isFramed: boolean;
}

const ScrollContainerContext = createContext<ScrollContainerContextType>({
  containerRef: null,
  isFramed: false,
});

export const ScrollContainerProvider: React.FC<{
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null> | null;
  isFramed: boolean;
}> = ({ children, containerRef, isFramed }) => {
  return (
    <ScrollContainerContext.Provider value={{ containerRef, isFramed }}>
      {children}
    </ScrollContainerContext.Provider>
  );
};

export const useScrollContainer = () => useContext(ScrollContainerContext);
