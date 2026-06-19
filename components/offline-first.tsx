"use client";

import { useT } from "@/lib/i18n-context";

export default function OfflineFirst() {
  const t = useT();
  const offline = t.features.offlineHighlight;

  return (
    <section id="offline" className="scroll-mt-28 bg-[#E7F1EE] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-8 rounded-full bg-[#B9DDD5]/50 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#78C2B7] bg-[#0F766E] p-6 text-white shadow-[0_28px_80px_rgba(15,118,110,0.24)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#78C2B7]/25 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
                  {offline.badge}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-2xl font-light ring-1 ring-white/15">
                  ↓
                </span>
              </div>

              <h2 className="mt-8 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {offline.heading}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                {offline.text}
              </p>

              <div className="mt-7 space-y-3">
                {offline.downloads.map((item: string, index: number) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-lg font-light">
                      {index === 2 ? "✓" : "↓"}
                    </span>
                    <span className="text-sm font-semibold">{item}</span>
                    <span className="ml-auto text-xs font-semibold text-white/45">
                      {index === 0 ? "38 MB" : index === 1 ? "126 MB" : "420 MB"}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-7 border-t border-white/15 pt-5 text-xs font-semibold leading-6 text-white/65">
                {offline.places}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
