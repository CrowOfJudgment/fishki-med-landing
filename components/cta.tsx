"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useLocale, useT } from "@/lib/i18n-context";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds?: () => void;
  };
};

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

              {/* Tally owns the form fields. Keep the live embed until an email-only form is supplied. */}
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#274D53]/5 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-white p-3 shadow-[0_24px_70px_rgba(39,77,83,0.12)] sm:p-5">
                <iframe
                  data-tally-src={tallyForm.src}
                  title={tallyForm.title}
                  width="100%"
                  height="620"
                  className="block min-h-[520px] w-full rounded-[1.35rem] bg-white sm:min-h-[560px] lg:min-h-[620px]"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  loading="lazy"
                />
              </div>
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
