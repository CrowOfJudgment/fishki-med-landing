"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import type {
  CardTypeKey,
  DemoDeck,
  DemoStepKey,
  ReviewMode,
  ReviewResult,
  SavedCard,
} from "./app-demo";
import DemoAppScreen from "./demo-app-screen";
import PhoneMockup from "./phone-mockup";

type StaticScreen = {
  number: string;
  label: string;
  title: string;
  description: string;
};

const slideSteps: DemoStepKey[] = ["decks", "editor", "preview", "review"];

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path
        d={
          direction === "left"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StaticDemoShowcase({
  screens,
  ui,
  controls,
}: {
  screens: StaticScreen[];
  ui: Record<string, string>;
  controls: {
    previous: string;
    next: string;
    goTo: string;
  };
}) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const decks: DemoDeck[] = [
    {
      id: "anatomy",
      title: ui.deckAnatomy,
      cards: 7,
      due: 0,
      accent: "#0F766E",
    },
    {
      id: "pharmacology",
      title: ui.deckPharmacology,
      cards: 7,
      due: 0,
      accent: "#78C2B7",
    },
    {
      id: "pathophysiology",
      title: ui.deckPathology,
      cards: 7,
      due: 0,
      accent: "#E86860",
    },
  ];
  const studyCard: SavedCard = {
    id: "static-study-card",
    title: ui.question,
    studyFront: ui.question,
    back: ui.answer,
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const startAutoplay = () => {
    if (intervalRef.current || screens.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActive((current) => (current + 1) % screens.length);
    }, 5000);
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
      if (Math.abs(delta) > 48) {
        goToSlide(delta > 0 ? active + 1 : active - 1);
      }
    }
    touchStartX.current = null;
    startAutoplay();
  };

  const screen = screens[active];
  const noop = () => {};
  const noopDeck = (_deck: string) => {};
  const noopAddDeck = (_name: string) => {};
  const noopSaveCard = (_front: string, _back: string, _studyFront: string) => {};
  const noopCard = (_card: SavedCard) => {};
  const noopCardId = (_cardId: string) => {};
  const noopMode = (_mode: ReviewMode) => {};
  const noopResult = (_result: ReviewResult) => {};

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-[#E7F1EE] shadow-[0_28px_70px_rgba(39,77,83,0.12)]"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#B9DDD5]/55 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#78C2B7]/20 blur-3xl" />

      <div className="relative grid min-h-[760px] items-center gap-10 px-5 py-9 sm:px-9 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-12">
        <div className="order-2 lg:order-1">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#F4F7F5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0F766E]">
            {screen.number} · {screen.label}
          </span>
          <h3 className="mt-5 max-w-md font-display text-3xl font-semibold leading-tight text-[#002838] sm:text-4xl">
            {screen.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-7 text-[#274D53]">
            {screen.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToSlide(active - 1)}
              aria-label={controls.previous}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(active + 1)}
              aria-label={controls.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
            >
              <Chevron direction="right" />
            </button>
            <div className="ml-2 flex gap-2">
              {screens.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`${controls.goTo} ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === active
                      ? "w-7 bg-[#0F766E]"
                      : "w-2 bg-[#78C2B7]/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 flex min-h-[660px] items-center justify-center lg:order-2">
          <div className="pointer-events-none select-none">
            <PhoneMockup>
              <div
                key={screen.number}
                className="h-full motion-safe:animate-[demo-in_280ms_ease-out]"
              >
                <DemoAppScreen
                  step={slideSteps[active]}
                  ui={ui}
                  decks={decks}
                  selectedDeck="anatomy"
                  selectedDeckName={ui.deckAnatomy}
                  selectedCardType={"basic" as CardTypeKey}
                  isAnswerRevealed={false}
                  reviewMode="quick"
                  selectedReviewResult={null}
                  savedCards={[]}
                  editingCard={null}
                  studyCard={studyCard}
                  studyIndex={0}
                  studyTotal={3}
                  studyKnowCount={0}
                  studyRepeatCount={0}
                  onEditDeck={noopDeck}
                  onStudyDeck={noopDeck}
                  onAddDeck={noopAddDeck}
                  onShowCardTypes={noop}
                  onSaveCard={noopSaveCard}
                  onDeleteCard={noopCardId}
                  onEditCard={noopCard}
                  onCloseEditor={noop}
                  onRevealAnswer={noop}
                  onReviewModeChange={noopMode}
                  onChooseReviewResult={noopResult}
                  onNext={noop}
                  onBack={noop}
                  onBackToDecks={noop}
                  onRepeatUnknown={noop}
                  onReset={noop}
                />
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </div>
  );
}
