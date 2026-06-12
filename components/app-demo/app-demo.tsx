"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n-context";
import PhoneMockup from "./phone-mockup";

type DemoKey = "decks" | "editor" | "cloze" | "image" | "review" | "results";

function AppHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#B9DDD5]/60 bg-white/70 px-5 py-4">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#0F766E]">Fishki</p>
        <p className="mt-1 text-sm font-semibold text-[#002838]">{title}</p>
      </div>
      {meta && <span className="rounded-full bg-[#E7F1EE] px-2.5 py-1 text-[9px] font-bold text-[#0F766E]">{meta}</span>}
    </div>
  );
}

function DecksScreen({ ui }: { ui: any }) {
  const decks = [
    { title: ui.deckAnatomy, cards: 286, due: 34, color: "#0F766E" },
    { title: ui.deckPharmacology, cards: 124, due: 18, color: "#78C2B7" },
    { title: ui.deckPathology, cards: 93, due: 12, color: "#E86860" },
  ];

  return (
    <>
      <AppHeader title={ui.decksTitle} />
      <div className="p-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">
          <span className="text-base">+</span> {ui.newDeck}
        </button>
        <div className="mt-5 space-y-3">
          {decks.map((deck) => (
            <div key={deck.title} className="rounded-2xl border border-[#B9DDD5] bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="h-9 w-2 rounded-full" style={{ backgroundColor: deck.color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#002838]">{deck.title}</p>
                  <p className="mt-1 text-[10px] text-[#274D53]/70">
                    {deck.cards} {ui.cards}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#002838]">{deck.due}</p>
                  <p className="text-[9px] text-[#274D53]/65">{ui.due}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E7F1EE]">
                <div className="h-full w-2/3 rounded-full bg-[#78C2B7]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EditorScreen({ ui }: { ui: any }) {
  return (
    <>
      <AppHeader title={ui.editorTitle} meta={ui.deckPharmacology} />
      <div className="p-5">
        <div className="rounded-2xl border border-[#B9DDD5] bg-white p-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{ui.front}</p>
          <p className="mt-4 text-sm font-medium leading-6 text-[#002838]">{ui.frontText}</p>
          <div className="mt-5 flex gap-2 border-t border-[#E7F1EE] pt-3 text-[10px] font-bold text-[#274D53]/65">
            <span>B</span><span>I</span><span>U</span><span>•</span>
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-[#B9DDD5] bg-white p-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{ui.back}</p>
          <p className="mt-4 text-sm font-medium leading-6 text-[#002838]">{ui.backText}</p>
        </div>
        <button className="mt-3 w-full rounded-xl border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-3 text-xs font-semibold text-[#274D53]">
          + {ui.addImage}
        </button>
        <button className="mt-3 w-full rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">{ui.save}</button>
      </div>
    </>
  );
}

function ClozeScreen({ ui }: { ui: any }) {
  return (
    <>
      <AppHeader title={ui.clozeTitle} meta={ui.deckAnatomy} />
      <div className="p-5">
        <div className="rounded-2xl border border-[#B9DDD5] bg-white p-5">
          <p className="text-sm leading-8 text-[#002838]">
            {ui.clozeTextBefore}{" "}
            <span className="rounded-md bg-[#B9DDD5] px-1.5 py-1 font-semibold text-[#002838]">{ui.clozeHidden}</span>{" "}
            {ui.clozeTextAfter}
          </p>
          <div className="mt-8 rounded-xl bg-[#E7F1EE] p-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{ui.selected}</p>
            <p className="mt-2 text-sm font-semibold text-[#002838]">{ui.clozeHidden}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-[#78C2B7] bg-[#E7F1EE]/70 p-4 text-center">
          <p className="text-2xl font-display text-[#0F766E]">{"{{c1::" + ui.clozeHidden + "}}"}</p>
        </div>
        <button className="mt-4 w-full rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">{ui.createCloze}</button>
      </div>
    </>
  );
}

function AnatomyDiagram() {
  return (
    <svg aria-hidden="true" viewBox="0 0 260 250" className="h-auto w-full">
      <path d="M130 20c-18 25-22 48-17 69m17-69c18 25 22 48 17 69M113 89 65 126m82-37 48 37M65 126l-34 67m34-67 34 58m96-58 34 67m-34-67-34 58M113 89l17 51 17-51" fill="none" stroke="#0F766E" strokeWidth="7" strokeLinecap="round" />
      <path d="M99 184 82 231m79-47 17 47m-48-91v91" fill="none" stroke="#78C2B7" strokeWidth="6" strokeLinecap="round" />
      <circle cx="130" cy="20" r="9" fill="#E86860" />
      <rect x="38" y="111" width="58" height="23" rx="6" fill="#F4F7F5" stroke="#B9DDD5" strokeWidth="2" />
      <rect x="164" y="111" width="58" height="23" rx="6" fill="#F4F7F5" stroke="#B9DDD5" strokeWidth="2" />
      <rect x="101" y="128" width="58" height="23" rx="6" fill="#F4F7F5" stroke="#B9DDD5" strokeWidth="2" />
    </svg>
  );
}

function ImageScreen({ ui }: { ui: any }) {
  return (
    <>
      <AppHeader title={ui.imageTitle} meta={ui.imageSubtitle} />
      <div className="p-5">
        <p className="text-center text-[10px] font-medium text-[#274D53]/70">{ui.coverHint}</p>
        <div className="mt-3 rounded-2xl border border-[#B9DDD5] bg-white p-4">
          <AnatomyDiagram />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#E7F1EE] px-4 py-3">
          <span className="text-xs font-semibold text-[#274D53]">{ui.covered}</span>
          <span className="h-3 w-3 rounded-full bg-[#E86860]" />
        </div>
        <button className="mt-4 w-full rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">{ui.save}</button>
      </div>
    </>
  );
}

function ReviewScreen({ ui }: { ui: any }) {
  return (
    <>
      <AppHeader title={ui.reviewTitle} meta={ui.reviewProgress} />
      <div className="p-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E7F1EE]">
          <div className="h-full w-[45%] rounded-full bg-[#0F766E]" />
        </div>
        <div className="mt-5 flex min-h-[350px] flex-col justify-between rounded-[1.6rem] border border-[#B9DDD5] bg-white p-6 shadow-[0_16px_40px_rgba(39,77,83,0.08)]">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0F766E]">{ui.deckPharmacology}</span>
          <p className="font-display text-2xl font-semibold leading-snug text-[#002838]">{ui.question}</p>
          <button className="rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">{ui.showAnswer}</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-[#E86860]/40 bg-[#E86860]/8 px-3 py-3 text-xs font-semibold text-[#E86860]">{ui.again}</button>
          <button className="rounded-xl bg-[#0F766E] px-3 py-3 text-xs font-semibold text-white">{ui.know}</button>
        </div>
      </div>
    </>
  );
}

function ResultsScreen({ ui }: { ui: any }) {
  return (
    <>
      <AppHeader title={ui.resultsTitle} />
      <div className="p-5 text-center">
        <div className="mx-auto mt-4 flex h-36 w-36 flex-col items-center justify-center rounded-full border-[10px] border-[#B9DDD5] bg-white">
          <p className="font-display text-3xl font-semibold text-[#002838]">{ui.resultScore}</p>
          <p className="mt-1 max-w-20 text-[9px] leading-3 text-[#274D53]/70">{ui.resultLabel}</p>
        </div>
        <div className="mt-8 rounded-2xl border border-[#E86860]/25 bg-[#E86860]/8 p-5 text-left">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E86860] text-sm font-bold text-white">!</span>
            <div>
              <p className="text-sm font-semibold text-[#002838]">{ui.weakTitle}</p>
              <p className="mt-2 text-[10px] leading-5 text-[#274D53]">{ui.weakDescription}</p>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-semibold text-white">{ui.reviewWeak}</button>
      </div>
    </>
  );
}

function DemoScreen({ active, ui }: { active: DemoKey; ui: any }) {
  if (active === "decks") return <DecksScreen ui={ui} />;
  if (active === "editor") return <EditorScreen ui={ui} />;
  if (active === "cloze") return <ClozeScreen ui={ui} />;
  if (active === "image") return <ImageScreen ui={ui} />;
  if (active === "review") return <ReviewScreen ui={ui} />;
  return <ResultsScreen ui={ui} />;
}

export default function AppDemo() {
  const t = useT();
  const [active, setActive] = useState<DemoKey>("decks");
  const activeStep = t.demo.steps.find((step: { key: DemoKey }) => step.key === active) ?? t.demo.steps[0];

  return (
    <section id="demo" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.demo.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.demo.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">{t.demo.intro}</p>
        </div>

        <div className="mt-14 grid items-center gap-10 rounded-[2rem] border border-[#B9DDD5] bg-[#E7F1EE] p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">{t.demo.tapHint}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {t.demo.steps.map(
                (step: { key: DemoKey; nav: string; title: string; description: string }, index: number) => (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => setActive(step.key)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      active === step.key
                        ? "border-[#0F766E] bg-[#0F766E] text-white shadow-[0_12px_30px_rgba(15,118,110,0.16)]"
                        : "border-[#B9DDD5] bg-[#F4F7F5] text-[#002838] hover:border-[#78C2B7]"
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active === step.key ? "bg-white/15" : "bg-[#E7F1EE] text-[#0F766E]"}`}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold">{step.nav}</span>
                  </button>
                ),
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-[#F4F7F5] p-5">
              <h3 className="font-display text-2xl font-semibold text-[#002838]">{activeStep.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#274D53]">{activeStep.description}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#274D53]/60">
              {t.demo.screenLabel}
            </p>
            <PhoneMockup>
              <div key={active} className="motion-safe:animate-[demo-in_280ms_ease-out]">
                <DemoScreen active={active} ui={t.demo.ui} />
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
