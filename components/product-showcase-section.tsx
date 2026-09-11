"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
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
  number: string;
  label: string;
  title: string;
  description: string;
};

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 48;

export default function ProductShowcaseSection() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const screens = (t.demo.fixedScreens as ShowcaseScreen[]).flatMap(
    (screen) => {
      const src = screenshotPaths[locale][screen.key];
      return src ? [{ ...screen, src }] : [];
    },
  );
  const controls = t.demo.carouselControls;
  const screen = screens[active] ?? screens[0];

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const startAutoplay = () => {
    if (intervalRef.current || screens.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActive((current) => (current + 1) % screens.length);
    }, AUTOPLAY_INTERVAL_MS);
  };

  const goToSlide = (index: number) => {
    setActive((index + screens.length) % screens.length);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [screens.length]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    stopAutoplay();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (touchStartX.current !== null && endX !== null) {
      const delta = touchStartX.current - endX;
      if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
        goToSlide(delta > 0 ? active + 1 : active - 1);
      }
    }
    touchStartX.current = null;
    startAutoplay();
  };

  if (!screen) return null;

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

        <div
          className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-[#E7F1EE] shadow-[0_28px_70px_rgba(39,77,83,0.12)]"
          style={{ touchAction: "pan-y" }}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onFocusCapture={stopAutoplay}
          onBlurCapture={startAutoplay}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label={t.demo.showcaseHeading}
        >
          <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#B9DDD5]/55 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#78C2B7]/20 blur-3xl" />

          <div className="relative flex items-center justify-center gap-3 px-5 pt-6 sm:px-9 sm:pt-8 lg:justify-start lg:px-14">
            <button
              type="button"
              onClick={() => goToSlide(active - 1)}
              aria-label={controls.previous}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-2xl leading-none text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {screens.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`${controls.goTo} ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === active
                      ? "w-7 bg-[#0F766E]"
                      : "w-2 bg-[#78C2B7]/45 hover:bg-[#78C2B7]"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToSlide(active + 1)}
              aria-label={controls.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-2xl leading-none text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
            >
              ›
            </button>
          </div>

          <div className="relative grid items-center gap-8 px-5 pb-8 pt-5 sm:px-9 sm:pb-10 lg:min-h-[760px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-14 lg:pb-12">
            <div
              key={`copy-${screen.number}`}
              className="order-2 pb-2 text-center motion-safe:animate-[demo-in_280ms_ease-out] lg:order-1 lg:pb-0 lg:text-left"
            >
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#F4F7F5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                {screen.number} · {screen.label}
              </span>
              <h3 className="mx-auto mt-5 max-w-md font-display text-3xl font-semibold leading-tight text-[#002838] sm:text-4xl lg:mx-0">
                {screen.title}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#274D53] lg:mx-0">
                {screen.description}
              </p>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2">
              <div
                key={`image-${screen.number}`}
                className="w-full max-w-[27rem] overflow-hidden rounded-[1.75rem] border border-[#D8E8E4] bg-[#F4F7F5] shadow-[0_24px_60px_rgba(0,40,56,0.16)] motion-safe:animate-[demo-in_280ms_ease-out]"
              >
                <Image
                  src={screen.src}
                  alt={`${screen.label}: ${screen.title}`}
                  width={1206}
                  height={2622}
                  sizes="(min-width: 1024px) 432px, (min-width: 640px) 432px, calc(100vw - 72px)"
                  className="h-auto w-full select-none"
                  draggable={false}
                  unoptimized
                  priority={active === 0}
                />
              </div>
            </div>
          </div>
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
