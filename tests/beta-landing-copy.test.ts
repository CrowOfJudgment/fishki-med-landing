import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

type LandingMessages = {
  hero: { badge: string; subtitle: string; validation: string };
  demo: {
    showcaseIntro: string;
    postDemoCta: {
      title: string;
      text: string;
      waitlist: string;
      preorder: string;
    };
    steps: Array<{ key: string; description: string }>;
    fixedScreens: Array<{
      key: string;
      label: string;
      title: string;
      description: string;
    }>;
    ui: Record<string, string>;
  };
  preorder: {
    subtitle: string;
    accessSteps: Array<{ title: string; text: string }>;
    offerFacts: Array<{ note: string }>;
    includes: string[];
  };
};

function messages(locale: "pl" | "en") {
  return JSON.parse(
    readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  ) as LandingMessages;
}

test("landing clearly says that first testers already have access", () => {
  const polish = messages("pl");
  const english = messages("en");

  assert.match(
    polish.hero.validation,
    /pierwsi studenci medycyny już testują/i,
  );
  assert.match(polish.preorder.subtitle, /pierwsi studenci już korzystają/i);
  assert.match(english.hero.validation, /students are already testing/i);
  assert.match(english.preorder.subtitle, /join them today/i);
});

test("English landing copy avoids literal or awkward product phrasing", () => {
  const source = readFileSync(
    new URL("../messages/en.json", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /plan your study with you/i);
  assert.doesNotMatch(source, /comfortable offline study/i);
  assert.doesNotMatch(source, /covered elements on images/i);
  assert.doesNotMatch(source, /buy the preorder/i);
  assert.match(source, /medical students are already testing Fishki/i);
});

test("product showcase contains only features available in the beta", () => {
  const expectedScreens = [
    "decks",
    "deckContents",
    "editor",
    "smartReview",
    "imageStudy",
    "occlusionStudy",
    "plannerToday",
  ];

  for (const locale of ["pl", "en"] as const) {
    const copy = messages(locale);
    const showcase = JSON.stringify(copy.demo.fixedScreens);

    assert.deepEqual(
      copy.demo.fixedScreens.map((screen) => screen.key),
      expectedScreens,
    );
    assert.doesNotMatch(showcase, /test.?mode|tryb test|coming soon|wkrótce/i);
    assert.doesNotMatch(showcase, /folder|entire subject|cały przedmiot/i);
  }
});

test("mocked and interactive demos are removed while the beta CTA remains", () => {
  const page = readFileSync(
    new URL("../app/(default)/page.tsx", import.meta.url),
    "utf8",
  );
  const showcaseSection = readFileSync(
    new URL("../components/product-showcase-section.tsx", import.meta.url),
    "utf8",
  );
  const header = readFileSync(
    new URL("../components/ui/header.tsx", import.meta.url),
    "utf8",
  );
  const footer = readFileSync(
    new URL("../components/ui/footer.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(page, /AppDemo|StaticDemo|PhoneMockup/);
  assert.doesNotMatch(header, /\/#demo/);
  assert.doesNotMatch(footer, /\/#demo/);
  assert.doesNotMatch(showcaseSection, /DemoAppScreen|PhoneMockup|StaticDemo/);
  assert.match(showcaseSection, /t\.demo\.postDemoCta\.title/);
  assert.match(showcaseSection, /href="#waitlist-form"/);
  assert.match(showcaseSection, /href="#preorder"/);

  for (const locale of ["pl", "en"] as const) {
    const cta = messages(locale).demo.postDemoCta;
    assert.ok(cta.title);
    assert.ok(cta.text);
    assert.ok(cta.waitlist);
    assert.ok(cta.preorder);
  }
});

test("header section links follow the landing page order", () => {
  const header = readFileSync(
    new URL("../components/ui/header.tsx", import.meta.url),
    "utf8",
  );
  const orderedSections = [
    "/#how-it-works",
    "/#for-medicine",
    "/#student-voices",
    "/#why-fishki",
  ];

  const positions = orderedSections.map((section) => header.indexOf(section));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(
    positions,
    positions.toSorted((a, b) => a - b),
  );
});

test("screenshot introduction describes real app screens without card-count filler", () => {
  for (const locale of ["pl", "en"] as const) {
    const intro = messages(locale).demo.showcaseIntro;
    assert.doesNotMatch(
      intro,
      /15|realistycznych fiszek|realistic medical flashcards/i,
    );
    assert.match(intro, /iPhon/i);
  }
});

test("product showcase renders only genuine simulator screenshots", () => {
  const showcaseSection = readFileSync(
    new URL("../components/product-showcase-section.tsx", import.meta.url),
    "utf8",
  );
  const screenshotPaths = [
    "01-decks.png",
    "02-deck-contents.png",
    "03-card-editor.png",
    "04-smart-review.png",
    "06-study-plan.png",
  ];

  for (const screenshot of screenshotPaths) {
    assert.match(showcaseSection, new RegExp(screenshot.replace(".", "\\.")));
    for (const directory of ["", "en/"]) {
      const image = readFileSync(
        new URL(
          `../public/images/app-screenshots/${directory}${screenshot}`,
          import.meta.url,
        ),
      );
      assert.ok(
        image.length > 100_000,
        `${directory}${screenshot} should be a real screenshot`,
      );
    }
  }

  assert.match(showcaseSection, /useLocale/);
  assert.match(showcaseSection, /app-screenshots\/en/);
  assert.doesNotMatch(showcaseSection, /mockup|interactive demo/i);
});

test("screenshots use large stacked feature rows instead of a compact grid", () => {
  const showcaseSection = readFileSync(
    new URL("../components/product-showcase-section.tsx", import.meta.url),
    "utf8",
  );

  assert.match(showcaseSection, /max-w-5xl flex-col/);
  assert.match(showcaseSection, /max-w-\[25rem\]/);
  assert.match(showcaseSection, /lg:flex-row-reverse/);
  assert.doesNotMatch(showcaseSection, /xl:grid-cols-5|lg:grid-cols-3/);
});

test("floating beta CTA expands while scrolling and collapses after idle", () => {
  const floatingCta = readFileSync(
    new URL("../components/floating-cta.tsx", import.meta.url),
    "utf8",
  );

  assert.match(floatingCta, /setExpanded\(shouldShow\)/);
  assert.match(floatingCta, /setTimeout\(\(\) => setExpanded\(false\), 900\)/);
  assert.match(floatingCta, /expanded \? "w-\[min\(18rem/);
  assert.match(floatingCta, /: "w-12 px-0"/);
  assert.match(floatingCta, /motion-reduce:transition-none/);
  assert.match(floatingCta, /aria-label=\{t\.floatingCta\.text\}/);
});

test("medical screenshot plan covers the real beta flows", () => {
  const screenshotPlan = readFileSync(
    new URL("../docs/LANDING_SCREENSHOTS.md", import.meta.url),
    "utf8",
  );

  assert.match(screenshotPlan, /wyłącznie zrzuty.*działającej aplikacji/is);
  assert.match(screenshotPlan, /01-decks\.png/);
  assert.match(screenshotPlan, /03-card-editor\.png/);
  assert.match(screenshotPlan, /05-image-occlusion\.png/);
  assert.match(screenshotPlan, /06-study-plan\.png/);

  for (const locale of ["pl", "en"] as const) {
    const ui = messages(locale).demo.ui;
    assert.ok(ui.deckAnatomy);
    assert.ok(ui.deckPharmacology);
    assert.ok(ui.deckPathology);
    assert.ok(ui.demoCardAnatomyOne);
    assert.ok(ui.demoCardAnatomyFive);
    assert.ok(ui.demoImageQuestion);
    assert.ok(ui.demoOcclusionQuestion);
  }
});

test("offline section describes only local features present in the beta", () => {
  for (const locale of ["pl", "en"] as const) {
    const source = readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    );

    assert.doesNotMatch(source, /entire subject|cały przedmiot/i);
    assert.doesNotMatch(source, /offlineFolder|offlineSubject/);
  }
});

for (const locale of ["pl", "en"] as const) {
  test(`${locale} marketing copy describes an available beta`, () => {
    const copy = messages(locale);
    const marketingCopy = [
      copy.hero.badge,
      copy.hero.subtitle,
      copy.demo.postDemoCta.title,
      copy.demo.postDemoCta.text,
      copy.preorder.subtitle,
      ...copy.preorder.offerFacts.map((fact) => fact.note),
    ].join(" ");

    assert.match(marketingCopy, /beta/i);
    assert.doesNotMatch(marketingCopy, /prototyp|prototype/i);
    assert.doesNotMatch(
      marketingCopy,
      /planowan[yae]|planned for the end of september/i,
    );
  });

  test(`${locale} beta access flow is explicit`, () => {
    const copy = messages(locale);

    assert.equal(copy.preorder.accessSteps.length, 3);
    assert.ok(
      copy.preorder.accessSteps.every((step) => step.title && step.text),
    );
    assert.match(
      copy.preorder.accessSteps.map((step) => step.text).join(" "),
      /e-mail|email/i,
    );
  });

  test(`${locale} smart reviews are no longer presented as a future feature`, () => {
    const copy = messages(locale);
    const modeStep = copy.demo.steps.find((step) => step.key === "preview");

    assert.ok(modeStep);
    assert.match(modeStep.description, /FSRS/i);
    assert.doesNotMatch(modeStep.description, /planowan|planned/i);
  });

  test(`${locale} preorder does not promise feature-priority voting`, () => {
    const copy = messages(locale);

    assert.doesNotMatch(copy.preorder.includes.join(" "), /głosowan|vot/i);
  });
}

test("customer-facing copy uses only short hyphens", () => {
  for (const locale of ["pl", "en"] as const) {
    const source = readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    );
    const legalSource = readFileSync(
      new URL(`../messages/legal-${locale}.json`, import.meta.url),
      "utf8",
    );

    assert.doesNotMatch(source, /[—–]/);
    assert.doesNotMatch(legalSource, /[—–]/);
  }
});

test("preorder terms define the public full version without promising features", () => {
  for (const locale of ["pl", "en"] as const) {
    const source = readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    );

    assert.match(source, /publiczne udostępnienie|publicly available/i);
    assert.match(source, /nie oznacza gwarancji|does not guarantee/i);
  }
});
