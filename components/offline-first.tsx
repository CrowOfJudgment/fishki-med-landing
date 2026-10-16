"use client";

import { useT } from "@/lib/i18n-context";

export default function OfflineFirst() {
  const t = useT();
  const offline = t.features.offlineHighlight;

  return (
    <section id="offline" className="scroll-mt-28 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[#78C2B7] bg-[#0F766E] p-6 text-white shadow-[0_28px_80px_rgba(15,118,110,0.24)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#78C2B7]/25 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-3">
              <svg
                aria-hidden="true"
                className="h-7 w-7 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="m2 2 20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.6M16 11.6a10 10 0 0 1 3 1.4M2 9a16 16 0 0 1 4-2.3M10 5.2A16 16 0 0 1 22 9M12 20h.01" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.22em]">
                {offline.badge}
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {offline.heading}
            </h2>
            <p className="mt-3 text-base leading-7 text-white">
              {offline.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
