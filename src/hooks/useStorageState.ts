"use client";

import { useState, useEffect } from "react";

export function useStorageState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
    }
    setIsHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn(`Error writing localStorage key "${key}":`, e);
    }
  }, [key, state, isHydrated]);

  return [state, setState];
}
