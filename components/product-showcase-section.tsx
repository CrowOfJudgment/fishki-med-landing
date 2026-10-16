"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { useT } from "@/lib/i18n-context";

import type { PricingRegion } from "@/lib/pricing-region";

import {
  LANDING_SCREENSHOTS,
  SCREENSHOT_WIDTH,
  SCREENSHOT_HEIGHT,
} from "@/lib/landing-screenshots";

type ShowcaseScreen = {
  key: keyof typeof LANDING_SCREENSHOTS;
  number: string;
  label: string;
  title: string;
  description: string;
};

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 48;

export default function ProductShowcaseSection({
  pricingRegion,
}: {
  pricingRegion: PricingRegion;
}) {
  const t = useT();
  const [active, setActive] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const screens = (t.demo.fixedScreens as ShowcaseScreen[]).map((screen) => {
    return { ...screen, images: LANDING_SCREENSHOTS[screen.key] };
  });
  const controls = t.demo.carouselControls;
  const screen = screens[active] ?? screens[0];
  const screenshot = screen?.images[activeView] ?? screen?.images[0];

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current || screens.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActive((current) => (current + 1) % screens.length);
      setActiveView(0);
    }, AUTOPLAY_INTERVAL_MS);
  }, [screens.length]);

  const goToSlide = (index: number) => {
    setActive((index + screens.length) % screens.length);
    setActiveView(0);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

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

  if (!screen || !screenshot) return null;

  return (
    <section id="how-it-works" className="scroll-mt-28 py-10 sm:py-16">
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
              {screen.images.length > 1 ? (
                <div className="mt-5">
                  <p className="text-xs font-medium text-[#274D53]">
                    {t.demo.screenshotViews}
                  </p>
                  <div
                    role="group"
                    aria-label={t.demo.screenshotViews}
                    className="mt-2 flex flex-wrap justify-center gap-2 lg:justify-start"
                  >
                    {screen.images.map((item, index) => (
                      <button
                        key={item.view}
                        type="button"
                        aria-pressed={activeView === index}
                        onClick={() => setActiveView(index)}
                        className={`min-h-10 rounded-full border px-3 py-2 text-xs font-semibold transition ${activeView === index ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#B9DDD5] bg-white/70 text-[#0F766E] hover:bg-white"}`}
                      >
                        {t.demo.screenshotViewLabels[item.view]}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2">
              <div
                key={`image-${screen.number}-${screenshot.view}`}
                className="w-full max-w-[27rem] overflow-hidden rounded-[4.5rem] border-[10px] border-[#0B1418] bg-[#0B1418] shadow-[0_24px_60px_rgba(0,40,56,0.2)] motion-safe:animate-[demo-in_280ms_ease-out]"
              >
                <Image
                  src={screenshot.src}
                  alt={`${screen.label}: ${t.demo.screenshotViewLabels[screenshot.view]}`}
                  width={SCREENSHOT_WIDTH}
                  height={SCREENSHOT_HEIGHT}
                  sizes="(min-width: 640px) 432px, calc(100vw - 72px)"
                  className="h-auto w-full select-none rounded-[3.75rem]"
                  draggable={false}
                  unoptimized
                  priority={active === 0}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center">
          <a
            href="#preorder"
            data-analytics-click="screens_preorder"
            data-analytics-section="screens_cta"
            className="text-sm font-semibold text-[#0F766E] underline underline-offset-4 hover:text-[#002838]"
          >
            {t.demo.postDemoLink.replace(
              "{price}",
              t.preorder.pricing[pricingRegion].value,
            )}
          </a>
        </p>
      </div>
    </section>
  );
}
