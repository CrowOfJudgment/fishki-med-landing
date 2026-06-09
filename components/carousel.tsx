"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { useT } from "@/lib/i18n-context";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path
        d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const t = useT();
  const slides = t.carousel.slides;

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
      setRevealed(false);
    }, 5000);
  };

  const goToSlide = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setRevealed(false);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    stopAutoplay();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (touchStartX.current !== null && endX !== null) {
      const delta = touchStartX.current - endX;
      if (Math.abs(delta) > 48) goToSlide(delta > 0 ? active + 1 : active - 1);
    }
    touchStartX.current = null;
    startAutoplay();
  };

  const slide = slides[active];

  return (
    <section id="preview" className="w-full scroll-mt-28">
      <div
        className="mx-auto max-w-6xl px-4 pb-6 sm:px-6"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[#073b3a] shadow-[0_30px_80px_rgba(6,78,75,0.22)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.2),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(251,191,36,0.12),transparent_28%)]" />
          <div className="relative grid items-center gap-8 px-5 py-8 sm:px-10 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
            <div className="text-white">
              <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-100">
                {t.header.preview}
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-teal-200/80">
                {slide.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-teal-50/75">
                {slide.meta}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goToSlide(active - 1)}
                  aria-label="Previous slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/15"
                >
                  <Chevron direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(active + 1)}
                  aria-label="Next slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/15"
                >
                  <Chevron direction="right" />
                </button>
                <div className="ml-2 flex gap-2">
                  {slides.map((item: { title: string }, index: number) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        index === active ? "w-7 bg-amber-300" : "w-2 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -inset-8 rounded-full bg-teal-300/10 blur-3xl" />
              <div className="relative rounded-[2.5rem] border-[6px] border-slate-900 bg-slate-900 p-2 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                <div className="overflow-hidden rounded-[2rem] bg-[#f7f6ef]">
                  <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">
                        Fishki
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">{slide.eyebrow}</p>
                    </div>
                    <div className="rounded-full bg-teal-700 px-3 py-1.5 text-[10px] font-bold text-white">
                      {active + 1}/{slides.length}
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${((active + 1) / slides.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex min-h-[300px] flex-col justify-between rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:min-h-[340px] sm:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                          {slide.title}
                        </p>
                        <p className="mt-8 font-display text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
                          {slide.question}
                        </p>
                      </div>
                      <div>
                        {revealed ? (
                          <div className="rounded-2xl bg-teal-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
                              Odpowiedź / Answer
                            </p>
                            <p className="mt-2 text-lg font-semibold text-teal-950">{slide.answer}</p>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setRevealed(true)}
                            className="w-full rounded-2xl bg-teal-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-teal-800"
                          >
                            Pokaż odpowiedź / Reveal answer
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {["Jeszcze raz", "Trudne", "Umiem"].map((label, index) => (
                        <div
                          key={label}
                          className={`rounded-xl px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide ${
                            index === 2 ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
