"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n-context";
import DemoAppScreen from "./demo-app-screen";
import PhoneMockup from "./phone-mockup";
import StaticDemoShowcase from "./static-demo-showcase";

export type DemoStepKey =
  | "decks"
  | "type"
  | "editor"
  | "preview"
  | "review"
  | "result";

export type DeckKey = string;
export type DemoDeck = {
  id: DeckKey;
  title: string;
  cards: number;
  due: number;
  accent: string;
  custom?: boolean;
};
export type SavedCard = {
  id: string;
  title: string;
  studyFront: string;
  back: string;
};
export type CardTypeKey = "basic" | "cloze" | "image" | "occlusion";
export type ReviewMode = "smart" | "quick";
export type ReviewResult = "again" | "hard" | "good" | "easy" | "dontKnow" | "know";

export default function AppDemo() {
  const t = useT();
  const steps = t.demo.steps as Array<{
    key: DemoStepKey;
    nav: string;
    title: string;
    description: string;
    flow?: "create" | "study";
  }>;
  const [currentStep, setCurrentStep] = useState(0);
  const [decks, setDecks] = useState<DemoDeck[]>([
    {
      id: "anatomy",
      title: t.demo.ui.deckAnatomy,
      cards: 7,
      due: 34,
      accent: "#0F766E",
    },
    {
      id: "pharmacology",
      title: t.demo.ui.deckPharmacology,
      cards: 7,
      due: 18,
      accent: "#78C2B7",
    },
    {
      id: "pathophysiology",
      title: t.demo.ui.deckPathology,
      cards: 7,
      due: 12,
      accent: "#E86860",
    },
  ]);
  const [selectedDeck, setSelectedDeck] = useState<DeckKey>("anatomy");
  const [selectedCardType, setSelectedCardType] = useState<CardTypeKey>("basic");
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("smart");
  const [selectedReviewResult, setSelectedReviewResult] =
    useState<ReviewResult | null>(null);
  const [savedCards, setSavedCards] = useState<Record<DeckKey, SavedCard[]>>({});
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [studyIndex, setStudyIndex] = useState(0);
  const [studyKnowCount, setStudyKnowCount] = useState(0);
  const [studyRepeatCount, setStudyRepeatCount] = useState(0);
  const [studyQueue, setStudyQueue] = useState<SavedCard[]>([]);
  const [cardsToRepeat, setCardsToRepeat] = useState<SavedCard[]>([]);

  const activeStep = steps[currentStep];
  const selectedDeckData =
    decks.find((deck) => deck.id === selectedDeck) ?? decks[0];
  const buildStudyCards = (deck: DeckKey): SavedCard[] => [
    ...(savedCards[deck] ?? []),
    {
      id: "study-1",
      title: t.demo.ui.question,
      studyFront: t.demo.ui.question,
      back: t.demo.ui.answer,
    },
    {
      id: "study-2",
      title: t.demo.ui.sampleCardTwo,
      studyFront: t.demo.ui.sampleCardTwo,
      back: t.demo.ui.sampleCardAnswer,
    },
    {
      id: "study-3",
      title: t.demo.ui.sampleCardThree,
      studyFront: t.demo.ui.sampleCardThree,
      back: t.demo.ui.sampleCardAnswer,
    },
  ];
  const studyCards =
    studyQueue.length > 0 ? studyQueue : buildStudyCards(selectedDeck);

  const goToStep = (index: number) => {
    setCurrentStep(Math.max(0, Math.min(index, steps.length - 1)));
    if (index !== 3) setIsAnswerRevealed(false);
  };

  const goNext = () => goToStep(currentStep + 1);
  const goBack = () => goToStep(currentStep - 1);

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedDeck("anatomy");
    setSelectedCardType("basic");
    setIsAnswerRevealed(false);
    setReviewMode("smart");
    setSelectedReviewResult(null);
  };

  const editDeck = (deck: DeckKey) => {
    setSelectedDeck(deck);
    setEditingCard(null);
    goToStep(1);
  };

  const studyDeck = (deck: DeckKey) => {
    setSelectedDeck(deck);
    setIsAnswerRevealed(false);
    setStudyIndex(0);
    setStudyKnowCount(0);
    setStudyRepeatCount(0);
    setCardsToRepeat([]);
    setStudyQueue(buildStudyCards(deck));
    goToStep(3);
  };

  const addDeck = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newDeck: DemoDeck = {
      id: `custom-${Date.now()}`,
      title: trimmedName,
      cards: 0,
      due: 0,
      accent: "#78C2B7",
      custom: true,
    };

    setDecks((current) => [...current, newDeck]);
  };

  const chooseReviewResult = (result: ReviewResult) => {
    setSelectedReviewResult(result);
    if (result === "know") setStudyKnowCount((current) => current + 1);
    else {
      setStudyRepeatCount((current) => current + 1);
      setCardsToRepeat((current) => [...current, studyCards[studyIndex]]);
    }

    if (studyIndex + 1 >= studyCards.length) {
      goToStep(5);
      return;
    }

    setStudyIndex((current) => current + 1);
    setIsAnswerRevealed(false);
  };

  const saveCard = (front: string, back: string, studyFront: string) => {
    const title = front.trim() || t.demo.ui.untitledCard;
    const editingCardId = editingCard?.id;
    const editingPersistedCard = Boolean(
      editingCardId &&
        (savedCards[selectedDeck] ?? []).some(
          (card) => card.id === editingCardId,
        ),
    );
    setSavedCards((current) => ({
      ...current,
      [selectedDeck]: editingPersistedCard
        ? (current[selectedDeck] ?? []).map((card) =>
            card.id === editingCardId
              ? { ...card, title, studyFront, back }
              : card,
          )
        : [
            { id: `card-${Date.now()}`, title, studyFront, back },
            ...(current[selectedDeck] ?? []),
          ],
    }));
    if (!editingPersistedCard) {
      setDecks((current) =>
        current.map((deck) =>
          deck.id === selectedDeck ? { ...deck, cards: deck.cards + 1 } : deck,
        ),
      );
    }
    setEditingCard(null);
    if (editingCard) goToStep(1);
  };

  const editCard = (card: SavedCard) => {
    setEditingCard(card);
    goToStep(2);
  };

  const deleteCard = (cardId: string) => {
    setSavedCards((current) => ({
      ...current,
      [selectedDeck]: (current[selectedDeck] ?? []).filter(
        (card) => card.id !== cardId,
      ),
    }));
    setDecks((current) =>
      current.map((deck) =>
        deck.id === selectedDeck
          ? { ...deck, cards: Math.max(0, deck.cards - 1) }
          : deck,
      ),
    );
  };

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
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.demo.intro}
          </p>
        </div>

        <div className="mt-14">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
              {t.demo.showcaseBadge}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-[#002838]">
              {t.demo.showcaseHeading}
            </h3>
            <p className="mt-3 leading-7 text-[#274D53]">{t.demo.showcaseIntro}</p>
          </div>
          <StaticDemoShowcase
            screens={t.demo.fixedScreens}
            ui={t.demo.ui}
            controls={t.demo.carouselControls}
          />
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-[#E7F1EE] p-5 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
              {t.demo.playBadge}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-[#002838]">
              {t.demo.playHeading}
            </h3>
            <p className="mt-3 leading-7 text-[#274D53]">{t.demo.playIntro}</p>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#274D53]/60">
              {t.demo.screenLabel}
            </p>
            <div className="mx-auto w-fit">
              <PhoneMockup>
                <div
                  key={activeStep.key}
                  className="h-full motion-safe:animate-[demo-in_280ms_ease-out]"
                >
                  <DemoAppScreen
                    step={activeStep.key}
                    ui={t.demo.ui}
                    decks={decks}
                    selectedDeck={selectedDeck}
                    selectedDeckName={selectedDeckData.title}
                    selectedCardType={selectedCardType}
                    isAnswerRevealed={isAnswerRevealed}
                    reviewMode={reviewMode}
                    selectedReviewResult={selectedReviewResult}
                    savedCards={savedCards[selectedDeck] ?? []}
                    editingCard={editingCard}
                    studyCard={studyCards[studyIndex]}
                    studyIndex={studyIndex}
                    studyTotal={studyCards.length}
                    studyKnowCount={studyKnowCount}
                    studyRepeatCount={studyRepeatCount}
                    onEditDeck={editDeck}
                    onStudyDeck={studyDeck}
                    onAddDeck={addDeck}
                    onShowCardTypes={goNext}
                    onSaveCard={saveCard}
                    onEditCard={editCard}
                    onDeleteCard={deleteCard}
                    onCloseEditor={() => goToStep(1)}
                    onRevealAnswer={() =>
                      setIsAnswerRevealed((current) => !current)
                    }
                    onReviewModeChange={setReviewMode}
                    onChooseReviewResult={chooseReviewResult}
                    onNext={goNext}
                    onBack={goBack}
                    onBackToDecks={() => goToStep(0)}
                    onRepeatUnknown={() => {
                      setStudyQueue(cardsToRepeat);
                      setStudyIndex(0);
                      setStudyKnowCount(0);
                      setStudyRepeatCount(0);
                      setCardsToRepeat([]);
                      setIsAnswerRevealed(false);
                      goToStep(4);
                    }}
                    onReset={resetDemo}
                  />
                </div>
              </PhoneMockup>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-xl bg-[#F4F7F5] px-5 py-3 text-sm font-semibold text-[#0F766E] shadow-sm transition active:scale-[0.98]"
            >
              {t.demo.resetInteractive}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
