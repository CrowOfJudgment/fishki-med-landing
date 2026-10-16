# Landing refresh: replacement screenshots needed

Supply genuine app captures in English and Polish if both localized previews are required. Keep a consistent device, resolution and appearance across all five images. No mock screens or composited UI.

Carousel order:
1. Daily Study: the home study screen with today’s workload and progress. Currently uses `06-study-plan.png`, which is actually Daily Study.
2. Flashcard Editor: a clear editor with text and an image. Currently uses `03-card-editor.png`.
3. Cloze Deletion: selected text or a saved cloze with its answer. Currently reuses the genuine cloze shown in `03-card-editor.png`.
4. Exam Planner: an exam with its date, selected decks and daily plan. No matching asset is available; a placeholder is reserved in both the carousel and the exam planning section. One portrait capture can serve both locations.
5. Smart Reviews: a real review question or revealed answer with the available review ratings. Currently uses `04-smart-review.png`.

The replacement images can keep the existing portrait screenshot format. The page preserves the full frame without cropping.

Product updates still embeds the existing Tally forms (PL: `2ERGxA`, EN: `pbzpW8`). Supply replacement email-only form links with a real email field and Keep me updated submit action. The external iframe cannot be restyled or have individual fields hidden from this repository.

---

# Prawdziwe screeny aplikacji na landing

Landing nie może używać makiet ani komponentów imitujących aplikację. Galeria ma pokazywać wyłącznie zrzuty wykonane z działającej aplikacji Fishki na iPhonie.

## Planowane pliki

1. `01-decks.png` - lista trzech talii demonstracyjnych.
2. `02-deck-contents.png` - pięć fiszek wewnątrz talii.
3. `03-card-editor.png` - edytor fiszki z luką i tagami.
4. `04-image-study.png` - nauka z kartą zawierającą obraz.
5. `05-image-occlusion.png` - nauka z prawdziwą maską image occlusion.
6. `06-study-plan.png` - ekran Nauka z planem i powtórkami.

Finalne pliki należy umieścić w `public/images/app-screenshots/`.

## Zasady wykonania

- jeden model iPhone'a i jedna skala we wszystkich ujęciach,
- polski interfejs dla polskiego landingu,
- realistyczne dane z pakietu `Fishki-demo-medyczne.apkg`,
- brak prywatnego e-maila, nazwy konta, powiadomień i innych danych osobowych,
- pełna rozdzielczość PNG bez kompresji komunikatorów,
- spójna godzina, poziom baterii i tryb jasny,
- brak klawiatury poza screenem edytora,
- po podmianie obrazów trzeba najpierw sprawdzić poprawność masek image occlusion.

Pod galerią pozostaje informacja o pierwszych testerach i możliwym bezpłatnym zaproszeniu do zamkniętej bety. Przycisk zakupowy prowadzi do preorderu 12 miesięcy Fishki Premium od publicznej premiery; drugi przycisk prowadzi do zapisu na aktualności.
