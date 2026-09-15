"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/config/weddingConfig";

export function useGuestName() {
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const guestParam =
        searchParams.get("guest") ||
        searchParams.get("to") ||
        searchParams.get("name");

      if (guestParam) {
        setGuestName(decodeURIComponent(guestParam).trim());
      }
    }
  }, []);

  return {
    guestName,
    displayGreeting: guestName
      ? `Dearest ${guestName},`
      : weddingConfig.invitation.defaultGuestGreeting,
    hasPersonalizedName: Boolean(guestName),
  };
}
