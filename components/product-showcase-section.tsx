"use client";

import Image from "next/image";
import { useLocale, useT } from "@/lib/i18n-context";

const screenshotPaths: Record<"pl" | "en", Record<string, string>> = {
  pl: {
    decks: "/images/app-screenshots/01-decks.png",
    deckContents: "/images/app-screenshots/02-deck-contents.png",
    editor: "/images/app-screenshots/03-card-editor.png",
    smartReview: "/images/app-screenshots/04-smart-review.png",
    plannerToday: "/images/app-screenshots/06-study-plan.png",
  },
  en: {
    decks: "/images/app-screenshots/en/01-decks.png",
    deckContents: "/images/app-screenshots/en/02-deck-contents.png",
    editor: "/images/app-screenshots/en/03-card-editor.png",
    smartReview: "/images/app-screenshots/en/04-smart-review.png",
    plannerToday: "/images/app-screenshots/en/06-study-plan.png",
  },
};

type ShowcaseScreen = {
  key: string;
  label: string;
  title: string;
  description: string;
};

export default function ProductShowcaseSection() {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="how-it-works" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.demo.showcaseBadge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.demo.showcaseHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.demo.showcaseIntro}
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-8 sm:gap-12">
          {t.demo.fixedScreens.flatMap(
            (screen: ShowcaseScreen, index: number) => {
              const src = screenshotPaths[locale][screen.key];
              if (!src) return [];

              return (
                <article
                  key={screen.key}
                  className={`flex flex-col items-center gap-7 rounded-[2rem] border border-[#B9DDD5] bg-white/80 p-4 shadow-[0_22px_60px_rgba(39,77,83,0.11)] backdrop-blur-xl sm:p-6 lg:gap-12 lg:p-8 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  <div className="w-full max-w-[25rem] shrink-0 overflow-hidden rounded-[1.75rem] border border-[#D8E8E4] bg-[#F4F7F5] sm:max-w-[27rem] lg:w-[44%] lg:max-w-none">
                    <Image
                      src={src}
                      alt={`${screen.label}: ${screen.title}`}
                      width={1206}
                      height={2622}
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 432px, calc(100vw - 64px)"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="w-full px-2 pb-4 text-center lg:flex-1 lg:px-0 lg:pb-0 lg:text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                      {screen.label}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#002838] sm:text-3xl">
                      {screen.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#274D53] lg:mx-0 lg:text-lg lg:leading-8">
                      {screen.description}
                    </p>
                  </div>
                </article>
              );
            },
          )}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-[#B9DDD5] bg-white/75 px-6 py-8 text-center shadow-[0_22px_60px_rgba(39,77,83,0.1)] backdrop-blur-xl sm:px-10 sm:py-10">
          <h3 className="font-display text-2xl font-semibold leading-tight text-[#002838] sm:text-3xl">
            {t.demo.postDemoCta.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#274D53]">
            {t.demo.postDemoCta.text}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#waitlist-form"
              aria-label={t.demo.postDemoCta.waitlistAria}
              data-analytics-click="screens_waitlist"
              data-analytics-section="screens_cta"
              className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
            >
              {t.demo.postDemoCta.waitlist}
            </a>
            <a
              href="#preorder"
              aria-label={t.demo.postDemoCta.preorderAria}
              data-analytics-click="screens_preorder"
              data-analytics-section="screens_cta"
              className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(232,104,96,0.22)] transition hover:-translate-y-0.5 hover:bg-[#D85A52]"
            >
              {t.demo.postDemoCta.preorder}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
