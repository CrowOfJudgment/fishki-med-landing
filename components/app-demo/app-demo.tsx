"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n-context";
import DemoAppScreen from "./demo-app-screen";
import PhoneMockup from "./phone-mockup";

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
export type StudyDirection = "frontBack" | "backFront" | "mixed";

type StudySummary = {
  total: number;
  know: number;
  repeat: number;
};

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
  const [studyDirection, setStudyDirection] =
    useState<StudyDirection>("frontBack");
  const [selectedReviewResult, setSelectedReviewResult] =
    useState<ReviewResult | null>(null);
  const [savedCards, setSavedCards] = useState<Record<DeckKey, SavedCard[]>>({});
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [studyIndex, setStudyIndex] = useState(0);
  const [studyKnowCount, setStudyKnowCount] = useState(0);
  const [studyRepeatCount, setStudyRepeatCount] = useState(0);
  const [studyQueue, setStudyQueue] = useState<SavedCard[]>([]);
  const [cardsToRepeat, setCardsToRepeat] = useState<SavedCard[]>([]);
  const [studySummary, setStudySummary] = useState<StudySummary | null>(null);

  const activeStep = steps[currentStep];
  const selectedDeckData =
    decks.find((deck) => deck.id === selectedDeck) ?? decks[0];
  const buildStudyCards = (deck: DeckKey): SavedCard[] => {
    const deckData = decks.find((item) => item.id === deck);
    const userCards = savedCards[deck] ?? [];
    if (deckData?.custom) return userCards;

    const exampleCards = [
      t.demo.ui.sampleCardOne,
      t.demo.ui.sampleCardTwo,
      t.demo.ui.sampleCardThree,
      t.demo.ui.sampleCardFour,
      t.demo.ui.sampleCardFive,
      t.demo.ui.sampleCardSix,
      t.demo.ui.sampleCardSeven,
    ].map((title, index) => ({
      id: `study-${index + 1}`,
      title,
      studyFront: title,
      back: t.demo.ui.sampleCardAnswer,
    }));

    return [...userCards, ...exampleCards];
  };
  const studyCards =
    studyQueue.length > 0 ? studyQueue : buildStudyCards(selectedDeck);
  const activeStudyCard = studyCards[studyIndex];
  const shouldReverseStudyCard =
    studyDirection === "backFront" ||
    (studyDirection === "mixed" && studyIndex % 2 === 1);
  const displayedStudyCard = shouldReverseStudyCard
    ? {
        ...activeStudyCard,
        studyFront: activeStudyCard.back,
        back: activeStudyCard.studyFront,
      }
    : activeStudyCard;
  const studyFrontLabel = shouldReverseStudyCard
    ? t.demo.ui.back
    : t.demo.ui.front;
  const studyBackLabel = shouldReverseStudyCard
    ? t.demo.ui.front
    : t.demo.ui.back;

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
    setStudyDirection("frontBack");
    setSelectedReviewResult(null);
    setStudyIndex(0);
    setStudyKnowCount(0);
    setStudyRepeatCount(0);
    setStudyQueue([]);
    setCardsToRepeat([]);
    setStudySummary(null);
  };

  const editDeck = (deck: DeckKey) => {
    setSelectedDeck(deck);
    setEditingCard(null);
    goToStep(1);
  };

  const studyDeck = (deck: DeckKey) => {
    const cards = buildStudyCards(deck);
    if (cards.length === 0) return;

    setSelectedDeck(deck);
    setIsAnswerRevealed(false);
    setStudyIndex(0);
    setStudyKnowCount(0);
    setStudyRepeatCount(0);
    setCardsToRepeat([]);
    setStudySummary(null);
    setStudyQueue(cards);
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
    setSelectedDeck(newDeck.id);
    goToStep(1);
  };

  const chooseReviewResult = (result: ReviewResult) => {
    setSelectedReviewResult(result);
    const isKnown = result === "know";
    const currentCard = studyCards[studyIndex];
    const nextKnowCount = studyKnowCount + (isKnown ? 1 : 0);
    const nextRepeatCount = studyRepeatCount + (isKnown ? 0 : 1);
    const nextRepeatCards =
      isKnown || !currentCard ? cardsToRepeat : [...cardsToRepeat, currentCard];

    setStudyKnowCount(nextKnowCount);
    setStudyRepeatCount(nextRepeatCount);
    setCardsToRepeat(nextRepeatCards);

    if (studyIndex + 1 >= studyCards.length) {
      setStudySummary({
        total: studyCards.length,
        know: nextKnowCount,
        repeat: nextRepeatCount,
      });
      goToStep(5);
      return;
    }

    setStudyIndex((current) => current + 1);
    setIsAnswerRevealed(false);
  };

  const saveCard = (
    front: string,
    back: string,
    studyFront: string,
    action: "next" | "back" = "next",
  ) => {
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
    if (action === "back") goToStep(1);
  };

  const editCard = (card: SavedCard) => {
    setEditingCard(card);
    goToStep(2);
  };

  const createCard = () => {
    setEditingCard(null);
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
    <section
      id="demo"
      className="ios-demo-controls scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.demo.playBadge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.demo.playHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.demo.playIntro}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-[#E7F1EE] p-5 sm:p-8">
          <div>
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
                    studyCard={displayedStudyCard}
                    studyFrontLabel={studyFrontLabel}
                    studyBackLabel={studyBackLabel}
                    studyIndex={studyIndex}
                    studyTotal={studyCards.length}
                    studyKnowCount={studySummary?.know ?? studyKnowCount}
                    studyRepeatCount={studySummary?.repeat ?? studyRepeatCount}
                    onEditDeck={editDeck}
                    onStudyDeck={studyDeck}
                    onAddDeck={addDeck}
                    onShowCardTypes={createCard}
                    onSaveCard={saveCard}
                    onEditCard={editCard}
                    onDeleteCard={deleteCard}
                    onRevealAnswer={() => setIsAnswerRevealed((current) => !current)}
                    onReviewModeChange={setReviewMode}
                    studyDirection={studyDirection}
                    onStudyDirectionChange={setStudyDirection}
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
                      setStudySummary(null);
                      setIsAnswerRevealed(false);
                      goToStep(4);
                    }}
                    onRepeatAll={() => {
                      setStudyIndex(0);
                      setStudyKnowCount(0);
                      setStudyRepeatCount(0);
                      setCardsToRepeat([]);
                      setStudySummary(null);
                      setSelectedReviewResult(null);
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
              data-analytics-click="demo_reset"
              data-analytics-section="interactive_demo"
              className="rounded-xl bg-[#F4F7F5] px-5 py-3 text-sm font-semibold text-[#0F766E] shadow-sm transition active:scale-[0.98]"
            >
              {t.demo.resetInteractive}
            </button>
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-[#B9DDD5] bg-[#F4F7F5] p-5 text-center sm:p-6">
            <p className="text-sm font-semibold text-[#002838]">
              {t.demo.postDemoCta.title}
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#274D53]">
              {t.demo.postDemoCta.text}
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#waitlist-form"
                aria-label={t.demo.postDemoCta.waitlistAria}
                data-analytics-click="demo_waitlist"
                data-analytics-section="post_demo_cta"
                className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
              >
                {t.demo.postDemoCta.waitlist}
              </a>
              <a
                href="#preorder"
                aria-label={t.demo.postDemoCta.preorderAria}
                data-analytics-click="demo_preorder"
                data-analytics-section="post_demo_cta"
                className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(232,104,96,0.22)] transition hover:-translate-y-0.5 hover:bg-[#D85A52]"
              >
                {t.demo.postDemoCta.preorder}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
