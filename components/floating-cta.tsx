"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n-context";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let collapseTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      const shouldShow = window.scrollY > 100;
      setVisible(shouldShow);
      setExpanded(shouldShow);

      if (collapseTimer) clearTimeout(collapseTimer);
      if (shouldShow) {
        collapseTimer = setTimeout(() => setExpanded(false), 900);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (collapseTimer) clearTimeout(collapseTimer);
    };
  }, []);

  const t = useT();

  return (
    <a
      href="/#preorder"
      data-analytics-click="floating_preorder"
      data-analytics-section="floating_cta"
      aria-label={t.floatingCta.text}
      className={`
        fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-12 transform-gpu items-center justify-center overflow-hidden rounded-full border border-[#E86860]/25 bg-[#E86860] text-sm font-semibold text-white shadow-[0_18px_50px_rgba(232,104,96,0.2)] transition-[width,opacity,transform,background-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:bg-[#D85A52] motion-reduce:transition-none sm:bottom-6 sm:right-6
        ${expanded ? "w-[min(18rem,calc(100vw-2rem))] px-4" : "w-12 px-0"}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <span className="h-3 w-3 shrink-0 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.16)]" />
      <span
        aria-hidden={!expanded}
        className={`overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "ml-3 max-w-[13rem] opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        {t.floatingCta.text}
      </span>
      <span
        aria-hidden="true"
        className={`overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "ml-3 max-w-4 opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        →
      </span>
    </a>
  );
}
