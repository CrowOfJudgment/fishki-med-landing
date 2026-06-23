"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n-context";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = useT();

  return (
    <a
      href="/#preorder"
      className={`
        fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 mx-auto flex w-fit transform-gpu items-center gap-3 rounded-full border border-[#E86860]/25 bg-[#E86860] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(232,104,96,0.2)] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:bg-[#D85A52] sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.16)]" />
      <span>{t.floatingCta.text}</span>
      <span className="text-white">→</span>
    </a>
  );
}
