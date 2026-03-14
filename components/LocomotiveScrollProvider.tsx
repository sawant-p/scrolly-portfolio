"use client";

import { useEffect, ReactNode } from "react";

export default function LocomotiveScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Dynamically import to avoid server-side rendering issues
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      
      return () => {
        locomotiveScroll.destroy();
      };
    })();
  }, []);

  return <>{children}</>;
}
