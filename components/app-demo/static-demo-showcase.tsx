"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import type {
  CardTypeKey,
  DemoDeck,
  DemoStepKey,
  ReviewMode,
  ReviewResult,
  SavedCard,
  StudyDirection,
} from "./app-demo";
import DemoAppScreen from "./demo-app-screen";
import PhoneMockup from "./phone-mockup";

type StaticScreen = {
  key: string;
  number: string;
  label: string;
  title: string;
  description: string;
};

const interactiveSlideSteps: Record<string, DemoStepKey> = {
  decks: "decks",
  editor: "editor",
  quickSetup: "preview",
  review: "review",
};

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

function StaticBackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d="m12.5 4.5-5.5 5.5 5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StaticAppHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="relative flex min-h-12 items-center justify-between border-b border-[#274D53]/10 bg-white/90 px-3 py-2.5 backdrop-blur-xl">
      <div className="min-w-16">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE] text-[#0F766E]">
          <StaticBackIcon />
        </span>
      </div>
      <p className="pointer-events-none absolute left-1/2 max-w-36 -translate-x-1/2 truncate text-center text-[13px] font-semibold text-[#002838]">
        {title}
      </p>
      {meta ? (
        <span className="rounded-full bg-[#E7F1EE] px-2.5 py-1 text-[8px] font-semibold text-[#0F766E]">
          {meta}
        </span>
      ) : (
        <span className="w-8" />
      )}
    </div>
  );
}

function StaticBottomNav({
  ui,
  active,
}: {
  ui: Record<string, string>;
  active: "decks" | "planner" | "downloads" | "profile";
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 grid h-16 grid-cols-4 overflow-hidden rounded-b-[2rem] border-t border-[#274D53]/10 bg-white/95 px-2 pb-1 pt-1.5 backdrop-blur-xl">
      {[
        {
          key: "planner",
          label: ui.plannerTab,
          icon: (
            <>
              <rect x="3.5" y="4.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6.5 2.8v3.4M13.5 2.8v3.4M3.5 8h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ),
        },
        {
          key: "decks",
          label: ui.decksTab,
          icon: (
            <path d="M3.5 5.5h13v9h-13zM6 3.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ),
        },
        {
          key: "downloads",
          label: ui.downloadsTab,
          icon: (
            <>
              <path d="M10 3.5v8M6.8 8.8 10 12l3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ),
        },
        {
          key: "profile",
          label: ui.profileTab,
          icon: (
            <>
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4.5 16c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ),
        },
      ].map((item) => (
        <span
          key={item.key}
          className={`flex flex-col items-center justify-center gap-0.5 text-[8px] font-semibold ${
            active === item.key ? "text-[#0F766E]" : "text-[#274D53]/55"
          }`}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
            {item.icon}
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}

function PlannerSetupScreen({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <StaticAppHeader title={ui.planExamTitle} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-20 pt-4">
        <div className="rounded-[1.2rem] bg-white p-4 shadow-sm">
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
            {ui.examLabel}
          </p>
          <p className="mt-2 text-xs font-semibold text-[#002838]">
            {ui.examName}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[1.2rem] bg-white p-4 shadow-sm">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
              {ui.examDate}
            </p>
            <p className="mt-2 text-xs font-semibold text-[#002838]">
              {ui.examDateValue}
            </p>
          </div>
          <div className="rounded-[1.2rem] bg-white p-4 shadow-sm">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
              {ui.studyDays}
            </p>
            <p className="mt-2 text-xs font-semibold text-[#002838]">
              {ui.studyDaysValue}
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-[1.2rem] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
              {ui.decksToMaster}
            </p>
            <span className="text-[8px] font-semibold text-[#274D53]/55">
              3
            </span>
          </div>
          {[ui.deckAnatomy, ui.deckPharmacology, ui.deckPathology].map(
            (deck) => (
              <div
                key={deck}
                className="mt-3 flex items-center gap-2 border-t border-[#274D53]/8 pt-3 first:border-0 first:pt-0"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0F766E] text-[8px] text-white">
                  ✓
                </span>
                <span className="truncate text-[9px] font-semibold text-[#002838]">
                  {deck}
                </span>
              </div>
            ),
          )}
        </div>
        <span className="mx-auto mt-4 block w-fit min-w-40 rounded-full bg-[#0F766E] px-5 py-3 text-center text-[9px] font-bold text-white">
          {ui.createStudyPlan}
        </span>
      </div>
      <StaticBottomNav ui={ui} active="planner" />
    </div>
  );
}

function PlannerTodayScreen({ ui }: { ui: Record<string, string> }) {
  const tasks = [
    [ui.todayAnatomy, "40", "#0F766E"],
    [ui.todayPhysiology, "25", "#78C2B7"],
    [ui.todayPharmacology, "10", "#E86860"],
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <StaticAppHeader title={ui.plannerTitle} meta={ui.examCountdown} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-20 pt-4">
        <div className="rounded-[1.35rem] bg-[#0F766E] p-5 text-white shadow-[0_10px_30px_rgba(15,118,110,0.2)]">
          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/65">
            {ui.today}
          </p>
          <p className="mt-2 text-lg font-semibold">{ui.todayTotal}</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full w-[35%] rounded-full bg-white" />
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-[1.2rem] bg-white shadow-sm">
          {tasks.map(([label, count, color]) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-[#274D53]/8 p-4 last:border-0"
            >
              <span
                className="h-10 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-[#002838]">
                  {label}
                </p>
                <p className="mt-1 text-[8px] text-[#274D53]/60">
                  {ui.plannedForToday}
                </p>
              </div>
              <span className="text-lg font-bold text-[#002838]">{count}</span>
            </div>
          ))}
        </div>
        <span className="mx-auto mt-4 block w-fit min-w-40 rounded-full bg-[#0F766E] px-5 py-3 text-center text-[9px] font-bold text-white">
          {ui.startTodayPlan}
        </span>
      </div>
      <StaticBottomNav ui={ui} active="planner" />
    </div>
  );
}

function TestModeScreen({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="flex h-full flex-col">
      <StaticAppHeader title={ui.testModeTitle} meta={ui.comingSoon} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
        <div className="rounded-[1.3rem] border border-[#B9DDD5] bg-white p-5 shadow-sm">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F1EE] text-lg font-bold text-[#0F766E]">
            ?
          </span>
          <h3 className="mt-4 text-sm font-semibold text-[#002838]">
            {ui.testModeHeading}
          </h3>
          <p className="mt-2 text-[10px] leading-5 text-[#274D53]">
            {ui.testModeDescription}
          </p>
        </div>
        <div className="mt-3 space-y-2">
          {[
            ["Aa", ui.testTyped],
            ["✓", ui.testChoice],
            ["◉", ui.testSpoken],
            ["◇", ui.testMental],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-[0.9rem] bg-white px-4 py-3 shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F1EE] text-[9px] font-bold text-[#0F766E]">
                {icon}
              </span>
              <span className="text-[9px] font-semibold text-[#002838]">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-[0.9rem] bg-[#E86860]/10 p-3 text-[8px] font-semibold leading-4 text-[#E86860]">
          {ui.testUseCases}
        </div>
      </div>
    </div>
  );
}

function OfflineScreen({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <StaticAppHeader title={ui.offlineTitle} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-20 pt-4">
        <div className="rounded-[1.3rem] bg-[#0F766E] p-5 text-white shadow-[0_10px_30px_rgba(15,118,110,0.2)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg">
            ↓
          </span>
          <h3 className="mt-4 text-sm font-semibold">{ui.offlineHeading}</h3>
          <p className="mt-2 text-[9px] leading-4 text-white/75">
            {ui.offlineDescription}
          </p>
        </div>
        <div className="mt-3 overflow-hidden rounded-[1.2rem] bg-white shadow-sm">
          {[
            [ui.offlineDeck, ui.deckAnatomy, "38 MB"],
            [ui.offlineFolder, ui.offlineFolderName, "126 MB"],
            [ui.offlineSubject, ui.offlineSubjectName, "420 MB"],
          ].map(([type, name, size], index) => (
            <div
              key={type}
              className="flex items-center gap-3 border-b border-[#274D53]/8 p-4 last:border-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7F1EE] text-sm font-bold text-[#0F766E]">
                {index === 2 ? "✓" : "↓"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#0F766E]">
                  {type}
                </p>
                <p className="mt-1 truncate text-[9px] font-semibold text-[#002838]">
                  {name}
                </p>
              </div>
              <span className="text-[8px] font-semibold text-[#274D53]/55">
                {size}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-[0.9rem] bg-[#E7F1EE] p-3 text-center text-[8px] font-semibold leading-4 text-[#274D53]">
          {ui.offlinePlaces}
        </p>
      </div>
      <StaticBottomNav ui={ui} active="downloads" />
    </div>
  );
}

function StaticStoryScreen({
  screenKey,
  ui,
}: {
  screenKey: string;
  ui: Record<string, string>;
}) {
  if (screenKey === "plannerSetup") return <PlannerSetupScreen ui={ui} />;
  if (screenKey === "plannerToday") return <PlannerTodayScreen ui={ui} />;
  if (screenKey === "testMode") return <TestModeScreen ui={ui} />;
  return <OfflineScreen ui={ui} />;
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
  const noopDirection = (_direction: StudyDirection) => {};
  const interactiveStep = interactiveSlideSteps[screen.key];

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

      <div className="relative px-5 pt-7 sm:px-9 lg:px-14 lg:pt-10">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <button
            type="button"
            onClick={() => goToSlide(active - 1)}
            aria-label={controls.previous}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
          >
            <Chevron direction="left" />
          </button>
          <div className="flex gap-2">
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
          <button
            type="button"
            onClick={() => goToSlide(active + 1)}
            aria-label={controls.next}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] text-[#0F766E] shadow-sm transition hover:bg-white active:scale-95"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <div className="relative grid min-h-[700px] items-center gap-10 px-5 pb-9 pt-5 sm:px-9 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:pb-12">
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
        </div>

        <div className="order-1 flex min-h-[660px] items-center justify-center lg:order-2">
          <div className="pointer-events-none select-none">
            <PhoneMockup>
              <div
                key={screen.number}
                className="h-full motion-safe:animate-[demo-in_280ms_ease-out]"
              >
                {interactiveStep ? (
                  <DemoAppScreen
                    step={interactiveStep}
                    ui={ui}
                    decks={decks}
                    selectedDeck="anatomy"
                    selectedDeckName={ui.deckAnatomy}
                    selectedCardType={"basic" as CardTypeKey}
                    isAnswerRevealed={false}
                    reviewMode="quick"
                    selectedReviewResult={null}
                    studyDirection="frontBack"
                    savedCards={[]}
                    editingCard={null}
                    studyCard={studyCard}
                    studyFrontLabel={ui.front}
                    studyBackLabel={ui.back}
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
                    onRevealAnswer={noop}
                    onReviewModeChange={noopMode}
                    onStudyDirectionChange={noopDirection}
                    onChooseReviewResult={noopResult}
                    onNext={noop}
                    onBack={noop}
                    onBackToDecks={noop}
                    onRepeatUnknown={noop}
                    onRepeatAll={noop}
                    onReset={noop}
                  />
                ) : (
                  <StaticStoryScreen screenKey={screen.key} ui={ui} />
                )}
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </div>
  );
}
