"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

function getTrackedElement(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>("[data-analytics-click]")
    : null;
}

export default function ClickAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = getTrackedElement(event.target);

      if (!element) return;

      track("Landing Click", {
        target: element.dataset.analyticsClick ?? "unknown",
        section: element.dataset.analyticsSection ?? "unknown",
        href: element instanceof HTMLAnchorElement ? element.href : null,
        path: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
