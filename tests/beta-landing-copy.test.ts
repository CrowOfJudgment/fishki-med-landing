import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

type LandingMessages = {
  hero: { badge: string; subtitle: string; validation: string };
  demo: {
    badge: string;
    screenLabel: string;
    steps: Array<{ key: string; description: string }>;
    fixedScreens: Array<{ key: string; label: string; description: string }>;
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

  assert.match(polish.hero.validation, /pierwsi studenci medycyny już testują/i);
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
    "editor",
    "quickSetup",
    "review",
    "plannerSetup",
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

  const interactiveDemo = readFileSync(
    new URL("../components/app-demo/demo-app-screen.tsx", import.meta.url),
    "utf8",
  );
  const staticDemo = readFileSync(
    new URL("../components/app-demo/static-demo-showcase.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(interactiveDemo, /ui\.testMode|ui\.comingSoon/);
  assert.doesNotMatch(staticDemo, /TestModeScreen|OfflineScreen/);
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
      copy.demo.badge,
      copy.demo.screenLabel,
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
