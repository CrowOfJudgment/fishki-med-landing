import { useEffect, useRef, useState } from "react";
import type {
  CardTypeKey,
  DeckKey,
  DemoDeck,
  DemoStepKey,
  ReviewMode,
  ReviewResult,
  SavedCard,
} from "./app-demo";

type DemoUi = Record<string, string>;

function BackIcon() {
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

function PhotoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <rect x="2.75" y="4" width="14.5" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="8" r="1.35" fill="currentColor" />
      <path d="m4.5 14 3.4-3.4 2.25 2.1 2.15-2.2 3.2 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OcclusionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <rect x="2.75" y="4" width="14.5" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4.5 14 3.2-3.1 2.1 1.9 2-2 3.7 3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
      <ellipse cx="11.3" cy="9.6" rx="3.4" ry="2.25" fill="currentColor" opacity=".9" />
    </svg>
  );
}

function AppHeader({
  title,
  meta,
  backLabel,
  onBack,
  closeLabel,
  onClose,
}: {
  title: string;
  meta?: string;
  backLabel?: string;
  onBack?: () => void;
  closeLabel?: string;
  onClose?: () => void;
}) {
  return (
    <div className="relative flex min-h-12 items-center justify-between border-b border-[#274D53]/10 bg-white/90 px-3 py-2.5 backdrop-blur-xl">
      <div className="min-w-16">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE] text-[#0F766E] transition active:scale-95 active:bg-[#B9DDD5]"
          >
            <BackIcon />
          </button>
        )}
      </div>
      <p className="pointer-events-none absolute left-1/2 max-w-36 -translate-x-1/2 truncate text-center text-[13px] font-semibold text-[#002838]">
        {title}
      </p>
      {onClose ? (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE] text-lg font-light leading-none text-[#0F766E] transition active:scale-95 active:bg-[#B9DDD5]"
          >
            ×
          </button>
          {meta && (
            <span className="whitespace-nowrap rounded-full bg-[#E7F1EE] px-2 py-1 text-[8px] font-semibold text-[#0F766E]">
              {meta}
            </span>
          )}
        </div>
      ) : meta ? (
        <span className="max-w-20 truncate rounded-full bg-[#E7F1EE] px-2.5 py-1 text-[8px] font-semibold text-[#0F766E]">
          {meta}
        </span>
      ) : (
        <div className="min-w-8" />
      )}
    </div>
  );
}

function DeckScreen({
  ui,
  decks,
  selectedDeck,
  onEditDeck,
  onStudyDeck,
  onAddDeck,
}: {
  ui: DemoUi;
  decks: DemoDeck[];
  selectedDeck: DeckKey;
  onEditDeck: (deck: DeckKey) => void;
  onStudyDeck: (deck: DeckKey) => void;
  onAddDeck: (name: string) => void;
}) {
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [deckName, setDeckName] = useState("");

  const submitDeck = () => {
    if (!deckName.trim()) return;
    onAddDeck(deckName);
    setDeckName("");
    setShowAddDeck(false);
  };

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#B9DDD5]/60 bg-white/75 px-4 py-3">
        <p className="text-sm font-semibold text-[#002838]">{ui.decksTitle}</p>
        <button
          type="button"
          aria-label={ui.searchDecks}
          title={ui.searchDecks}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE] text-[#0F766E] transition active:scale-95 active:bg-[#B9DDD5]"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <circle cx="8.5" cy="8.5" r="4.75" stroke="currentColor" strokeWidth="1.7" />
            <path d="m12 12 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-36 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="overflow-hidden rounded-[1.15rem] bg-white shadow-[0_1px_3px_rgba(0,40,56,0.06)]">
          {decks.map((deck) => {
            const selected = selectedDeck === deck.id;
            return (
              <div
                key={deck.id}
                className={`w-full border-b border-[#274D53]/8 bg-white p-4 text-left transition last:border-b-0 ${
                  selected
                    ? "bg-[#E7F1EE]/55"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="self-stretch w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: deck.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-xs font-semibold text-[#002838]">
                        {deck.title}
                      </p>
                      <p className="shrink-0 text-[9px] font-semibold text-[#274D53]/65">
                        {deck.cards} {ui.cards}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onEditDeck(deck.id)}
                        className="rounded-lg bg-[#E7F1EE] px-2 py-2 text-[8px] font-bold text-[#0F766E] active:scale-95"
                      >
                        {ui.editDeck}
                      </button>
                      <button
                        type="button"
                        onClick={() => onStudyDeck(deck.id)}
                        className="rounded-lg bg-[#0F766E] px-2 py-2 text-[8px] font-bold text-white active:scale-95"
                      >
                        {ui.studyDeck}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowAddDeck(true)}
        className="absolute bottom-[4.6rem] left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0F766E] px-5 py-3 text-[11px] font-semibold text-white shadow-[0_10px_28px_rgba(15,118,110,0.3)] transition active:scale-95 active:bg-[#0B625C]"
      >
        <span className="text-base font-light leading-none">+</span>
        {ui.addDeck}
      </button>

      <nav className="absolute bottom-0 left-0 right-0 z-10 grid h-16 grid-cols-3 border-t border-[#274D53]/10 bg-white/95 px-3 pb-1 pt-1.5 backdrop-blur-xl">
        {[
          {
            label: ui.decksTab,
            active: true,
            icon: (
              <path d="M3.5 5.5h13v9h-13zM6 3.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ),
          },
          {
            label: ui.plannerTab,
            active: false,
            icon: (
              <>
                <rect x="3.5" y="4.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.5 2.8v3.4M13.5 2.8v3.4M3.5 8h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ),
          },
          {
            label: ui.profileTab,
            active: false,
            icon: (
              <>
                <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 16c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ),
          },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex flex-col items-center justify-center gap-0.5 text-[8px] font-semibold ${
              item.active ? "text-[#0F766E]" : "text-[#274D53]/55"
            }`}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
              {item.icon}
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      {showAddDeck && (
        <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-[#002838]/25 p-5 backdrop-blur-sm">
          <div className="w-full rounded-[1.35rem] bg-[#F4F7F5]/95 p-5 shadow-[0_24px_60px_rgba(0,40,56,0.22)] backdrop-blur-xl">
            <h3 className="text-center text-base font-semibold text-[#002838]">
              {ui.newDeckTitle}
            </h3>
            <label className="mt-4 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">
              {ui.deckNameLabel}
            </label>
            <input
              autoFocus
              value={deckName}
              onChange={(event) => setDeckName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitDeck();
              }}
              placeholder={ui.deckNamePlaceholder}
              className="mt-2 w-full rounded-xl border-0 bg-white px-3 py-3 text-sm text-[#002838] shadow-inner outline-none ring-1 ring-[#274D53]/10 focus:ring-2 focus:ring-[#0F766E]/35"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeckName("");
                  setShowAddDeck(false);
                }}
                className="rounded-xl bg-[#E7F1EE] px-3 py-3 text-xs font-semibold text-[#274D53] transition active:scale-[0.98]"
              >
                {ui.cancel}
              </button>
              <button
                type="button"
                onClick={submitDeck}
                disabled={!deckName.trim()}
                className="rounded-xl bg-[#0F766E] px-3 py-3 text-xs font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
              >
                {ui.createDeck}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CardRow({
  index,
  title,
  onClick,
}: {
  index: number;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full border-b border-[#274D53]/8 bg-white p-4 text-left last:border-b-0 active:bg-[#E7F1EE]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E7F1EE] text-[10px] font-bold text-[#0F766E]">
          {index + 1}
        </span>
        <p className="min-w-0 flex-1 truncate text-xs font-semibold text-[#002838]">
          {title}
        </p>
        <span className="text-lg font-light text-[#274D53]/30">›</span>
      </div>
    </button>
  );
}

function SwipeCardRow({
  index,
  card,
  deleteLabel,
  onDelete,
  onEdit,
}: {
  index: number;
  card: SavedCard;
  deleteLabel: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const finishSwipe = () => {
    if (offset <= -104) {
      onDelete();
      return;
    }
    setOffset(offset <= -38 ? -72 : 0);
    setIsDragging(false);
    startPoint.current = null;
  };

  return (
    <div className="relative overflow-hidden border-b border-[#274D53]/8 last:border-b-0">
      <button
        type="button"
        onClick={onDelete}
        className="absolute inset-y-0 right-0 flex w-[72px] items-center justify-center bg-[#E86860] text-[9px] font-bold text-white"
      >
        {deleteLabel}
      </button>
      <div
        className={`relative touch-pan-y bg-white ${
          isDragging ? "" : "transition-transform duration-200 ease-out"
        }`}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={(event) => {
          startPoint.current = { x: event.clientX, y: event.clientY };
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!startPoint.current) return;
          const deltaX = event.clientX - startPoint.current.x;
          const deltaY = event.clientY - startPoint.current.y;
          if (Math.abs(deltaY) > Math.abs(deltaX)) return;
          setOffset(Math.max(-120, Math.min(0, deltaX)));
        }}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        onClick={() => {
          if (offset === 0) onEdit();
          else setOffset(0);
        }}
      >
        <CardRow index={index} title={card.title} />
      </div>
    </div>
  );
}

function CardTypeScreen({
  ui,
  deck,
  onShowCardTypes,
  onBack,
  savedCards,
  onDeleteCard,
  onEditCard,
}: {
  ui: DemoUi;
  deck: DemoDeck;
  onShowCardTypes: () => void;
  onBack: () => void;
  savedCards: SavedCard[];
  onDeleteCard: (cardId: string) => void;
  onEditCard: (card: SavedCard) => void;
}) {
  const sampleCards: Array<{
    id: string;
    title: string;
    studyFront: string;
    back: string;
    saved: boolean;
  }> =
    deck.cards > 0
      ? [
          ...savedCards.map((card) => ({ ...card, saved: true })),
          ...[
            ui.sampleCardOne,
            ui.sampleCardTwo,
            ui.sampleCardThree,
            ui.sampleCardFour,
            ui.sampleCardFive,
            ui.sampleCardSix,
            ui.sampleCardSeven,
          ].map((title, index) => ({
            id: `sample-${index}`,
            title,
            studyFront: title,
            back: ui.sampleCardAnswer,
            saved: false,
          })),
        ]
      : [];

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden">
      <AppHeader
        title={deck.title}
        backLabel={ui.backNavigation}
        onBack={onBack}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-24 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sampleCards.length > 0 ? (
          <div className="overflow-hidden rounded-[1.15rem] bg-white shadow-[0_1px_3px_rgba(0,40,56,0.06)]">
            {sampleCards.map((card, index) =>
              card.saved ? (
                <SwipeCardRow
                  key={card.id}
                  index={index}
                  card={card}
                  deleteLabel={ui.deleteCard}
                  onDelete={() => onDeleteCard(card.id)}
                  onEdit={() => onEditCard(card)}
                />
              ) : (
                <CardRow
                  key={card.id}
                  index={index}
                  title={card.title}
                  onClick={() => onEditCard(card)}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-[#B9DDD5] bg-white/60 p-6 text-center text-xs leading-6 text-[#274D53]">
            {ui.emptyDeck}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onShowCardTypes}
        className="absolute bottom-5 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0F766E] px-5 py-3 text-[11px] font-semibold text-white shadow-[0_10px_28px_rgba(15,118,110,0.3)] transition active:scale-95 active:bg-[#0B625C]"
      >
        <span className="text-base font-light leading-none">+</span>
        {ui.addFlashcard}
      </button>
    </div>
  );
}

function FlashcardField({
  label,
  value,
  onChange,
  onClozeTerm,
  generatedTerms,
  resetKey,
  onSnapshotChange,
  ui,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClozeTerm?: (term: string) => void;
  generatedTerms?: string[];
  resetKey: number;
  onSnapshotChange: (snapshot: FieldSnapshot) => void;
  ui: DemoUi;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isOcclusionMode, setIsOcclusionMode] = useState(false);
  const [editorRevision, setEditorRevision] = useState(0);
  const [ellipses, setEllipses] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);
  const [draftEllipse, setDraftEllipse] = useState<{
    startX: number;
    startY: number;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== value) {
      editorRef.current.innerText = value;
    }
  }, [value]);

  useEffect(() => {
    setImageUrl(null);
    setEllipses([]);
    setDraftEllipse(null);
    setIsOcclusionMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [resetKey]);

  useEffect(() => {
    const editorHtml = editorRef.current?.innerHTML ?? value;
    const previewContainer = document.createElement("div");
    previewContainer.innerHTML = editorHtml;
    previewContainer.querySelectorAll("[data-cloze='true']").forEach((marker) => {
      marker.textContent = "________";
      marker.className =
        "inline-block rounded-md border-b-2 border-dashed border-[#E86860] bg-[#B9DDD5]/70 px-1 text-transparent";
    });

    onSnapshotChange({
      text: value,
      html: editorHtml,
      previewHtml: previewContainer.innerHTML,
      imageUrl,
      ellipses,
    });
  }, [editorRevision, ellipses, imageUrl, onSnapshotChange, value]);

  const toolClass = (active: boolean) =>
    `flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-[9px] font-bold transition active:scale-95 ${
      active
        ? "bg-[#0F766E] text-white"
        : "bg-[#E7F1EE] text-[#0F766E]"
    }`;

  const keepSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const applyBold = () => {
    editorRef.current?.focus();
    document.execCommand("bold");
    if (editorRef.current) {
      onChange(editorRef.current.innerText);
      setEditorRevision((current) => current + 1);
    }
  };

  const applyCloze = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return;

    const term = selection.toString().trim();
    if (!term) return;

    const selectionNode =
      range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as Element)
        : range.commonAncestorContainer.parentElement;
    const existingMarker = selectionNode?.closest<HTMLElement>(
      "[data-cloze='true']",
    );

    if (existingMarker && editorRef.current.contains(existingMarker)) {
      const existingTerm = existingMarker.innerText.trim();
      existingMarker.replaceWith(document.createTextNode(existingMarker.innerText));
      selection.removeAllRanges();
      onChange(editorRef.current.innerText);
      setEditorRevision((current) => current + 1);
      onClozeTerm?.(existingTerm);
      return;
    }

    const marker = document.createElement("span");
    marker.textContent = term;
    marker.className =
      "rounded bg-[#B9DDD5] px-1 font-semibold text-[#0F766E] underline decoration-[#E86860] decoration-2 decoration-dashed underline-offset-2";
    marker.dataset.cloze = "true";
    marker.title = ui.clozeActive;
    range.deleteContents();
    range.insertNode(marker);
    selection.removeAllRanges();
    onChange(editorRef.current.innerText);
    setEditorRevision((current) => current + 1);
    onClozeTerm?.(term);
  };

  const addImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(String(reader.result));
      setEllipses([]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageUrl(null);
    setEllipses([]);
    setDraftEllipse(null);
    setIsOcclusionMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const pointInImage = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const startOcclusion = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isOcclusionMode || !imageUrl) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointInImage(event);
    setDraftEllipse({
      startX: point.x,
      startY: point.y,
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
    });
  };

  const drawOcclusion = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draftEllipse) return;
    const point = pointInImage(event);
    setDraftEllipse((current) =>
      current
        ? {
            ...current,
            x: Math.min(current.startX, point.x),
            y: Math.min(current.startY, point.y),
            width: Math.abs(point.x - current.startX),
            height: Math.abs(point.y - current.startY),
          }
        : null,
    );
  };

  const finishOcclusion = () => {
    if (draftEllipse && draftEllipse.width > 8 && draftEllipse.height > 8) {
      setEllipses((current) => [
        ...current,
        {
          x: draftEllipse.x,
          y: draftEllipse.y,
          width: draftEllipse.width,
          height: draftEllipse.height,
        },
      ]);
    }
    setDraftEllipse(null);
  };

  return (
    <div className="rounded-[1.15rem] bg-white p-3 shadow-[0_1px_3px_rgba(0,40,56,0.07)]">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">
          {label}
        </p>
        {!!generatedTerms?.length && (
          <span className="rounded-full bg-[#E86860]/10 px-2 py-1 text-[7px] font-bold text-[#E86860]">
            {generatedTerms.length} {ui.clozeActive}
          </span>
        )}
      </div>

      {generatedTerms && generatedTerms.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {generatedTerms.map((term, index) => (
            <span
              key={`${term}-${index}`}
              className="rounded-full bg-[#E7F1EE] px-2 py-1 text-[8px] font-semibold text-[#0F766E]"
            >
              {index + 1}. {term}
            </span>
          ))}
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerText)}
        aria-label={label}
        role="textbox"
        className="mt-2 min-h-16 w-full whitespace-pre-wrap bg-transparent text-xs font-medium leading-5 text-[#002838] outline-none"
      />

      {imageUrl && (
        <div
          className={`relative mb-3 h-28 touch-none overflow-hidden rounded-xl bg-[#E7F1EE] ${
            isOcclusionMode ? "cursor-crosshair ring-2 ring-[#0F766E]/35" : ""
          }`}
          onPointerDown={startOcclusion}
          onPointerMove={drawOcclusion}
          onPointerUp={finishOcclusion}
          onPointerCancel={finishOcclusion}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={ui.uploadedImage}
            className="h-full w-full object-contain"
            draggable={false}
          />
          {[...ellipses, ...(draftEllipse ? [draftEllipse] : [])].map(
            (ellipse, index) => (
              <span
                key={`${ellipse.x}-${ellipse.y}-${index}`}
                className="pointer-events-none absolute rounded-[50%] border-2 border-white/75 bg-[#E86860]/85 shadow-sm"
                style={{
                  left: ellipse.x,
                  top: ellipse.y,
                  width: ellipse.width,
                  height: ellipse.height,
                }}
              />
            ),
          )}
          {isOcclusionMode && ellipses.length === 0 && !draftEllipse && (
            <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#002838]/70 px-2.5 py-1 text-[7px] font-semibold text-white">
              {ui.drawOcclusionHint}
            </span>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => addImage(event.target.files?.[0])}
      />

      <div className="flex items-center gap-1.5 border-t border-[#E7F1EE] pt-2.5">
        <button
          type="button"
          onMouseDown={keepSelection}
          onClick={applyBold}
          aria-label={ui.formatText}
          title={ui.formatText}
          className={toolClass(false)}
        >
          B
        </button>
        <button
          type="button"
          onClick={() =>
            imageUrl ? removeImage() : fileInputRef.current?.click()
          }
          aria-label={imageUrl ? ui.removeImage : ui.addImage}
          title={imageUrl ? ui.removeImage : ui.addImage}
          className={toolClass(Boolean(imageUrl))}
        >
          <PhotoIcon />
        </button>
        <button
          type="button"
          onMouseDown={keepSelection}
          onClick={applyCloze}
          aria-label={ui.addCloze}
          title={ui.addCloze}
          className={toolClass(Boolean(generatedTerms?.length))}
        >
          {"{…}"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!imageUrl) {
              fileInputRef.current?.click();
              return;
            }
            setIsOcclusionMode((current) => !current);
          }}
          aria-label={ui.addOcclusion}
          title={ui.addOcclusion}
          className={toolClass(isOcclusionMode)}
        >
          <OcclusionIcon />
        </button>
        {ellipses.length > 0 && (
          <button
            type="button"
            onClick={() => setEllipses([])}
            className="ml-auto text-[8px] font-semibold text-[#E86860]"
          >
            {ui.clearOcclusions}
          </button>
        )}
      </div>
    </div>
  );
}

type Ellipse = { x: number; y: number; width: number; height: number };
type FieldSnapshot = {
  text: string;
  html: string;
  previewHtml: string;
  imageUrl: string | null;
  ellipses: Ellipse[];
};

function FieldPreview({
  snapshot,
  ui,
}: {
  snapshot: FieldSnapshot;
  ui: DemoUi;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        className="whitespace-pre-wrap text-center text-base font-medium leading-7 text-[#002838]"
        dangerouslySetInnerHTML={{ __html: snapshot.previewHtml }}
      />
      {snapshot.imageUrl && (
        <div className="relative mt-5 h-48 shrink-0 overflow-hidden rounded-xl bg-[#E7F1EE]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={snapshot.imageUrl}
            alt={ui.uploadedImage}
            className="h-full w-full object-contain"
          />
          {snapshot.ellipses.map((ellipse, index) => (
            <span
              key={`${ellipse.x}-${ellipse.y}-${index}`}
              className="absolute rounded-[50%] border-2 border-white/75 bg-[#E86860]/85"
              style={{
                left: ellipse.x,
                top: ellipse.y,
                width: ellipse.width,
                height: ellipse.height,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EditorScreen({
  ui,
  selectedDeckName,
  editingCard,
  onBack,
  onClose,
  onSaveCard,
}: {
  ui: DemoUi;
  selectedDeckName: string;
  editingCard: SavedCard | null;
  onBack: () => void;
  onClose: () => void;
  onSaveCard: (front: string, back: string, studyFront: string) => void;
}) {
  const emptySnapshot: FieldSnapshot = {
    text: "",
    html: "",
    previewHtml: "",
    imageUrl: null,
    ellipses: [],
  };
  const [front, setFront] = useState(editingCard?.title ?? ui.frontText);
  const [back, setBack] = useState(editingCard?.back ?? ui.backText);
  const [clozeTerms, setClozeTerms] = useState<string[]>([]);
  const [frontSnapshot, setFrontSnapshot] = useState<FieldSnapshot>(emptySnapshot);
  const [backSnapshot, setBackSnapshot] = useState<FieldSnapshot>(emptySnapshot);
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const addClozeTerm = (term: string) => {
    setClozeTerms((current) => {
      const next = current.includes(term)
        ? current.filter((item) => item !== term)
        : [...current, term];
      setBack(next.map((item, index) => `${index + 1}. ${item}`).join("\n"));
      return next;
    });
  };

  const saveAndReset = () => {
    const previewTextContainer = document.createElement("div");
    previewTextContainer.innerHTML = frontSnapshot.previewHtml;
    const studyFront =
      previewTextContainer.innerText.trim() || front.trim() || ui.untitledCard;
    onSaveCard(front, back, studyFront);
    if (editingCard) return;
    setFront("");
    setBack("");
    setClozeTerms([]);
    setFrontSnapshot(emptySnapshot);
    setBackSnapshot(emptySnapshot);
    setShowPreview(false);
    setIsPreviewFlipped(false);
    setResetKey((current) => current + 1);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <AppHeader
        title={editingCard ? ui.editCardTitle : ui.editorTitle}
        backLabel={ui.backNavigation}
        onBack={onBack}
        closeLabel={ui.closeEditor}
        onClose={onClose}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-20 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="mb-3 truncate text-[9px] font-semibold text-[#274D53]/65">
          {selectedDeckName}
        </p>
        <FlashcardField
          label={ui.front}
          value={front}
          onChange={setFront}
          onClozeTerm={addClozeTerm}
          generatedTerms={clozeTerms}
          resetKey={resetKey}
          onSnapshotChange={setFrontSnapshot}
          ui={ui}
        />
        <div className="mt-3">
          <FlashcardField
            label={ui.back}
            value={back}
            onChange={setBack}
            generatedTerms={clozeTerms}
            resetKey={resetKey}
            onSnapshotChange={setBackSnapshot}
            ui={ui}
          />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 grid gap-2 border-t border-[#274D53]/10 bg-white/90 px-3 py-2 backdrop-blur-xl ${editingCard ? "grid-cols-1" : "grid-cols-2"}`}>
        {!editingCard && (
          <button
            type="button"
            onClick={() => {
              setIsPreviewFlipped(false);
              setShowPreview(true);
            }}
            className="rounded-xl bg-[#E7F1EE] px-2 py-2.5 text-[9px] font-semibold text-[#0F766E] transition active:scale-[0.98]"
          >
            {ui.previewAction}
          </button>
        )}
        <button
          type="button"
          onClick={saveAndReset}
          className="rounded-xl bg-[#0F766E] px-2 py-2.5 text-[9px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
        >
          {editingCard ? ui.saveChanges : ui.saveAndNext}
        </button>
      </div>

      {showPreview && (
        <div className="absolute inset-0 z-40 flex flex-col bg-[#F1F5F3]">
          <AppHeader
            title={ui.previewTitle}
            closeLabel={ui.closePreview}
            onClose={() => setShowPreview(false)}
          />
          <div className="min-h-0 flex flex-1 flex-col px-4 pb-3 pt-2">
            <span className="mx-auto mb-2 rounded-full bg-[#E7F1EE] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
              {isPreviewFlipped ? ui.back : ui.front}
            </span>
            <button
              type="button"
              onClick={() => setIsPreviewFlipped((current) => !current)}
              aria-label={ui.flipCard}
              className="relative min-h-0 flex-1 text-left [perspective:1000px]"
            >
              <span
                className="absolute inset-0 block transition-transform duration-500 ease-out [transform-style:preserve-3d]"
                style={{
                  transform: isPreviewFlipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                <span className="absolute inset-0 block overflow-hidden rounded-[1.5rem] border border-[#B9DDD5] bg-white shadow-[0_16px_42px_rgba(0,40,56,0.12)] [backface-visibility:hidden]">
                  <FieldPreview snapshot={frontSnapshot} ui={ui} />
                </span>
                <span className="absolute inset-0 block overflow-hidden rounded-[1.5rem] border border-[#B9DDD5] bg-white shadow-[0_16px_42px_rgba(0,40,56,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <FieldPreview snapshot={backSnapshot} ui={ui} />
                </span>
              </span>
            </button>
            <p className="mt-3 text-center text-[9px] font-semibold text-[#274D53]/65">
              {isPreviewFlipped ? ui.tapForFront : ui.tapForBack}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-[#274D53]/10 bg-white/90 px-3 py-2 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="rounded-xl bg-[#E7F1EE] px-2 py-2.5 text-[9px] font-semibold text-[#0F766E]"
            >
              {ui.editCard}
            </button>
            <button
              type="button"
              onClick={saveAndReset}
              className="rounded-xl bg-[#0F766E] px-2 py-2.5 text-[9px] font-semibold text-white"
            >
              {ui.saveAndNext}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewScreen({
  ui,
  selectedDeckName,
  onBack,
  onNext,
}: {
  ui: DemoUi;
  selectedDeckName: string;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <AppHeader
        title={ui.chooseStudyMode}
        backLabel={ui.backNavigation}
        onBack={onBack}
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <p className="truncate text-[10px] font-semibold text-[#274D53]/65">
          {selectedDeckName}
        </p>
        <button
          type="button"
          onClick={onNext}
          className="mt-4 w-full rounded-[1.3rem] bg-white p-5 text-left shadow-[0_6px_24px_rgba(0,40,56,0.08)] transition active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E] text-lg text-white">✓</span>
            <span className="rounded-full bg-[#B9DDD5] px-2.5 py-1 text-[8px] font-bold text-[#0F766E]">
              {ui.availableNow}
            </span>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#002838]">
            {ui.quickStudyTitle}
          </h3>
          <p className="mt-2 text-[10px] leading-5 text-[#274D53]">
            {ui.quickStudyDescription}
          </p>
          <span className="mt-4 inline-flex text-[10px] font-bold text-[#0F766E]">
            {ui.startQuickStudy} →
          </span>
        </button>

        <div className="mt-3 rounded-[1.3rem] border border-[#B9DDD5] bg-[#E7F1EE]/70 p-5 opacity-75">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-[#0F766E]">↻</span>
            <span className="rounded-full bg-[#E86860]/10 px-2.5 py-1 text-[8px] font-bold text-[#E86860]">
              {ui.comingSoon}
            </span>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#002838]">
            {ui.smartStudyTitle}
          </h3>
          <p className="mt-2 text-[10px] leading-5 text-[#274D53]">
            {ui.smartStudyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({
  ui,
  studyCard,
  studyIndex,
  studyTotal,
  isAnswerRevealed,
  onBack,
  onRevealAnswer,
  onChooseReviewResult,
}: {
  ui: DemoUi;
  studyCard: SavedCard;
  studyIndex: number;
  studyTotal: number;
  isAnswerRevealed: boolean;
  onBack: () => void;
  onRevealAnswer: () => void;
  onChooseReviewResult: (result: ReviewResult) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <AppHeader
        title={ui.quickStudyTitle}
        meta={`${studyIndex + 1} / ${studyTotal}`}
        backLabel={ui.backNavigation}
        onBack={onBack}
      />
      <div className="min-h-0 flex flex-1 flex-col px-4 pb-3 pt-4">
        <div className="relative min-h-0 flex-1">
          <button
            type="button"
            onClick={onRevealAnswer}
            aria-label={ui.flipCard}
            className="absolute inset-0 text-left [perspective:1000px]"
          >
          <span
            className="absolute inset-0 block transition-transform duration-500 ease-out [transform-style:preserve-3d]"
            style={{
              transform: isAnswerRevealed
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
            }}
          >
            <span className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.5rem] border border-[#B9DDD5] bg-white p-6 text-center shadow-[0_14px_40px_rgba(0,40,56,0.1)] [backface-visibility:hidden]">
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                {ui.front}
              </span>
              <span className="mt-6 font-display text-xl font-semibold leading-snug text-[#002838]">
                {studyCard.studyFront}
              </span>
            </span>
            <span className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.5rem] border border-[#B9DDD5] bg-white p-6 text-center shadow-[0_14px_40px_rgba(0,40,56,0.1)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                {ui.back}
              </span>
              <span className="mt-6 whitespace-pre-wrap font-display text-xl font-semibold leading-snug text-[#002838]">
                {studyCard.back}
              </span>
            </span>
          </span>
          </button>
          <button
            type="button"
            aria-label={ui.quickEditCard}
            title={ui.quickEditCard}
            className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE]/95 text-[#0F766E] shadow-sm backdrop-blur transition active:scale-95"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
              <path d="m5 13.8.7-3 6.9-6.9a1.4 1.4 0 0 1 2 0l.5.5a1.4 1.4 0 0 1 0 2l-6.9 6.9-3.2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="m11.8 4.7 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <p className="mt-2 h-3 whitespace-nowrap text-center text-[7px] font-semibold leading-3 text-[#274D53]/55">
          {isAnswerRevealed ? ui.tapForFront : ui.tapForBack}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChooseReviewResult("dontKnow")}
            className="rounded-xl bg-[#E86860]/10 px-3 py-3 text-[10px] font-bold text-[#E86860] active:scale-[0.98]"
          >
            {ui.dontKnow}
          </button>
          <button
            type="button"
            onClick={() => onChooseReviewResult("know")}
            className="rounded-xl bg-[#0F766E] px-3 py-3 text-[10px] font-bold text-white active:scale-[0.98]"
          >
            {ui.know}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({
  ui,
  studyTotal,
  studyKnowCount,
  studyRepeatCount,
  onBack,
  onRepeat,
  onReset,
}: {
  ui: DemoUi;
  studyTotal: number;
  studyKnowCount: number;
  studyRepeatCount: number;
  onBack: () => void;
  onRepeat: () => void;
  onReset: () => void;
}) {
  const mastery = Math.round((studyKnowCount / Math.max(studyTotal, 1)) * 100);

  return (
    <div className="flex h-full flex-col">
      <AppHeader title={ui.sessionSummary} backLabel={ui.backNavigation} onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto p-5 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#B9DDD5] text-2xl font-bold text-[#0F766E]">
          {mastery}%
        </div>
        <h3 className="mt-4 text-xl font-semibold text-[#002838]">{ui.sessionDone}</h3>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            [ui.reviewedCards, String(studyTotal)],
            [ui.know, String(studyKnowCount)],
            [ui.dontKnow, String(studyRepeatCount)],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-xl bg-white px-1.5 py-3 shadow-sm">
              <p className="text-lg font-bold text-[#002838]">{value}</p>
              <p className="mt-1 break-words text-[7px] leading-3 text-[#274D53]">{label}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onRepeat}
          disabled={studyRepeatCount === 0}
          className="mt-5 w-full rounded-xl bg-[#E86860]/10 px-3 py-3 text-[10px] font-bold text-[#E86860] disabled:opacity-40"
        >
          {ui.repeatUnknown}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 w-full rounded-xl bg-[#0F766E] px-3 py-3 text-[10px] font-bold text-white"
        >
          {ui.backToDecks}
        </button>
      </div>
    </div>
  );
}

export default function DemoAppScreen({
  step,
  ui,
  decks,
  selectedDeck,
  selectedDeckName,
  selectedCardType,
  isAnswerRevealed,
  reviewMode,
  selectedReviewResult,
  savedCards,
  editingCard,
  studyCard,
  studyIndex,
  studyTotal,
  studyKnowCount,
  studyRepeatCount,
  onEditDeck,
  onStudyDeck,
  onAddDeck,
  onShowCardTypes,
  onSaveCard,
  onDeleteCard,
  onEditCard,
  onCloseEditor,
  onRevealAnswer,
  onReviewModeChange,
  onChooseReviewResult,
  onNext,
  onBack,
  onBackToDecks,
  onRepeatUnknown,
  onReset,
}: {
  step: DemoStepKey;
  ui: DemoUi;
  decks: DemoDeck[];
  selectedDeck: DeckKey;
  selectedDeckName: string;
  selectedCardType: CardTypeKey;
  isAnswerRevealed: boolean;
  reviewMode: ReviewMode;
  selectedReviewResult: ReviewResult | null;
  savedCards: SavedCard[];
  editingCard: SavedCard | null;
  studyCard: SavedCard;
  studyIndex: number;
  studyTotal: number;
  studyKnowCount: number;
  studyRepeatCount: number;
  onEditDeck: (deck: DeckKey) => void;
  onStudyDeck: (deck: DeckKey) => void;
  onAddDeck: (name: string) => void;
  onShowCardTypes: () => void;
  onSaveCard: (front: string, back: string, studyFront: string) => void;
  onDeleteCard: (cardId: string) => void;
  onEditCard: (card: SavedCard) => void;
  onCloseEditor: () => void;
  onRevealAnswer: () => void;
  onReviewModeChange: (mode: ReviewMode) => void;
  onChooseReviewResult: (result: ReviewResult) => void;
  onNext: () => void;
  onBack: () => void;
  onBackToDecks: () => void;
  onRepeatUnknown: () => void;
  onReset: () => void;
}) {
  if (step === "decks") {
    return (
      <DeckScreen
        ui={ui}
        decks={decks}
        selectedDeck={selectedDeck}
        onEditDeck={onEditDeck}
        onStudyDeck={onStudyDeck}
        onAddDeck={onAddDeck}
      />
    );
  }
  if (step === "type") {
    return (
      <CardTypeScreen
        ui={ui}
        deck={decks.find((deck) => deck.id === selectedDeck) ?? decks[0]}
        onShowCardTypes={onShowCardTypes}
        onBack={onBack}
        savedCards={savedCards}
        onDeleteCard={onDeleteCard}
        onEditCard={onEditCard}
      />
    );
  }
  if (step === "editor") {
    return (
      <EditorScreen
        ui={ui}
        selectedDeckName={selectedDeckName}
        editingCard={editingCard}
        onBack={onBack}
        onClose={onCloseEditor}
        onSaveCard={onSaveCard}
      />
    );
  }
  if (step === "preview") {
    return (
      <PreviewScreen
        ui={ui}
        selectedDeckName={selectedDeckName}
        onBack={onBackToDecks}
        onNext={onNext}
      />
    );
  }
  if (step === "review") {
    return (
      <ReviewScreen
        ui={ui}
        studyCard={studyCard}
        studyIndex={studyIndex}
        studyTotal={studyTotal}
        isAnswerRevealed={isAnswerRevealed}
        onBack={onBack}
        onRevealAnswer={onRevealAnswer}
        onChooseReviewResult={onChooseReviewResult}
      />
    );
  }
  return (
    <ResultScreen
      ui={ui}
      studyTotal={studyTotal}
      studyKnowCount={studyKnowCount}
      studyRepeatCount={studyRepeatCount}
      onBack={onBack}
      onRepeat={onRepeatUnknown}
      onReset={onReset}
    />
  );
}
