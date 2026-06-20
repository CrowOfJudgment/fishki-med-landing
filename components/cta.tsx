"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useLocale, useT } from "@/lib/i18n-context";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds?: () => void;
  };
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="m3 7.25 2.25 2.25L11 3.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Cta() {
  const t = useT();
  const locale = useLocale();
  const tallyForm =
    locale === "pl"
      ? {
          src: "https://tally.so/embed/2ERGxA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
          title: "Fishki PL",
        }
      : {
          src: "https://tally.so/embed/pbzpW8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
          title: "Fishki",
        };
  const loadEmbeds = () => {
    (window as TallyWindow).Tally?.loadEmbeds?.();
  };

  useEffect(() => {
    loadEmbeds();
  }, []);

  return (
    <section
      id="waitlist-form"
      className="scroll-mt-28 pb-16 pt-10 sm:pb-20 sm:pt-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#B9DDD5] bg-[#E7F1EE] p-4 shadow-[0_30px_90px_rgba(39,77,83,0.1)] sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,221,213,0.8),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,194,183,0.18),transparent_28%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-12 h-48 w-48 rounded-full bg-[#78C2B7]/15 blur-3xl motion-safe:animate-float"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-[#B9DDD5]/40 blur-3xl motion-safe:animate-float"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <div className="p-4 sm:p-6 lg:p-8">
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#F4F7F5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.cta.badge}
              </span>

              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-[#274D53]">
                {t.cta.subtitle}
              </p>

              <ul className="mt-8 space-y-4">
                {t.cta.benefits.map((benefit: string) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B9DDD5] text-[#0F766E]">
                      <CheckIcon />
                    </span>
                    <span className="text-sm leading-7 text-[#274D53]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-[#B9DDD5] bg-[#F4F7F5] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                  {t.cta.cta}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#274D53]">
                  {t.cta.formNote}
                </p>
                <a
                  href="#preorder"
                  aria-label={t.cta.preorderAria}
                  className="mt-4 inline-flex rounded-full bg-[#E86860] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(232,104,96,0.18)] transition hover:bg-[#D85A52]"
                >
                  {t.cta.preorderLink}
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#274D53]/5 blur-2xl"
              />
              <iframe
                data-tally-src={tallyForm.src}
                title={tallyForm.title}
                width="100%"
                height="620"
                className="relative block min-h-[520px] w-full rounded-[2rem] border border-[#B9DDD5] bg-white shadow-[0_24px_70px_rgba(39,77,83,0.12)] sm:min-h-[560px] lg:min-h-[620px]"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
      />
    </section>
  );
}
