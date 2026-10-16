import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  LANDING_SCREENSHOTS,
  SCREENSHOT_WIDTH,
  SCREENSHOT_HEIGHT,
} from "../lib/landing-screenshots.ts";

type LandingMessages = {
  hero: { badge: string; subtitle: string; validation: string };
  demo: {
    showcaseIntro: string;
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
    includes: string[];
    faq: Array<{ question: string; answer: string }>;
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

test("hero explains the launch start without repeated beta promotion", () => {
  assert.match(messages("en").hero.validation, /public launch/);
  for (const locale of ["en", "pl"] as const)
    assert.doesNotMatch(
      messages(locale).hero.validation,
      /beta|automatic renewal|automatycznego odnawiania/i,
    );
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
  assert.match(source, /Private testing underway/i);
});

test("product showcase contains only features available in the beta", () => {
  const expectedScreens = [
    "dailyStudy",
    "editor",
    "cloze",
    "examPlanner",
    "smartReview",
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

test("annual launch prices stay consistent in both locales", () => {
  const polish = readFileSync(
    new URL("../messages/pl.json", import.meta.url),
    "utf8",
  );
  const english = readFileSync(
    new URL("../messages/en.json", import.meta.url),
    "utf8",
  );

  assert.match(polish, /49,99 € rocznie/);
  assert.match(polish, /59,99 USD rocznie/);
  assert.match(english, /€49\.99 per year/);
  assert.match(english, /\$59\.99 per year/);
  assert.doesNotMatch(`${polish}\n${english}`, /€35|35 €|35 EUR|\$40|40 USD/);
  assert.doesNotMatch(
    `${polish}\n${english}`,
    /€129\.99|129,99 €|129,99 EUR|\$149\.99|149,99 USD/,
  );
});

test("preorder sells 12 months of Premium and treats beta invitations as free and optional", () => {
  for (const locale of ["pl", "en"] as const) {
    const copy = messages(locale) as LandingMessages & {
      header: { preorderCta: string };
      preorderThankYou: { title: string; body: string; accountHint: string };
      preorderTerms: {
        sections: Array<{ title: string; blocks: Array<{ text?: string }> }>;
      };
      preorder: LandingMessages["preorder"] & {
        pricing: Record<string, { title: string; value: string }>;
        faq: Array<{ question: string; answer: string }>;
        buyWithCard: string;
      };
    };
    const offer = JSON.stringify([
      copy.header.preorderCta,
      copy.preorder.pricing,
      copy.preorder.includes,
      copy.preorder.buyWithCard,
      copy.preorderThankYou,
    ]);
    const subject = JSON.stringify(copy.preorderTerms.sections[2]);

    assert.match(offer, /12 (miesięcy|months).*Premium/i);
    assert.match(subject, /12-(miesięcznej|month)|12 (miesięcy|months)/i);
    assert.match(subject, /bezpłatn|free/i);
    assert.match(subject, /nie gwarantuje|does not guarantee/i);
    assert.match(copy.preorder.faq[1].answer, /bezpłatn|free/i);
    assert.doesNotMatch(
      offer,
      /dostęp do bety \+|beta access \+|kup dostęp do bety|get beta access|Early Access/i,
    );
  }
});

test("showcase uses real screens and one discreet preorder link", () => {
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
  assert.match(showcaseSection, /t\.demo\.postDemoLink/);
  assert.doesNotMatch(showcaseSection, /href="#waitlist-form"/);
  assert.match(showcaseSection, /href="#preorder"/);
});

test("header section links follow the landing page order", () => {
  const header = readFileSync(
    new URL("../components/ui/header.tsx", import.meta.url),
    "utf8",
  );
  const orderedSections = [
    "/#how-it-works",
    "/#why-fishki",
    "/#exam-planning",
    "/#for-medicine",
    "/#preorder",
    "/#faq",
    "/#waitlist-form",
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
    assert.match(intro, /Fishki/);
  }
});

test("landing uses all 12 genuine supplied screenshots shared by both locales", () => {
  const screenshots = Object.values(LANDING_SCREENSHOTS).flat();
  assert.equal(screenshots.length, 12);
  assert.equal(new Set(screenshots.map((item) => item.src)).size, 12);
  for (const item of screenshots) {
    const image = readFileSync(
      new URL(`../public${item.src}`, import.meta.url),
    );
    assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(image.readUInt32BE(16), SCREENSHOT_WIDTH);
    assert.equal(image.readUInt32BE(20), SCREENSHOT_HEIGHT);
  }
  const showcase = readFileSync(
    new URL("../components/product-showcase-section.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(showcase, /useLocale|missingScreenshot/);
});

test("screenshots use one large automatically advancing carousel", () => {
  const showcaseSection = readFileSync(
    new URL("../components/product-showcase-section.tsx", import.meta.url),
    "utf8",
  );

  assert.match(showcaseSection, /AUTOPLAY_INTERVAL_MS = 5000/);
  assert.match(showcaseSection, /setInterval/);
  assert.match(showcaseSection, /SWIPE_THRESHOLD_PX = 48/);
  assert.match(showcaseSection, /aria-roledescription="carousel"/);
  assert.match(showcaseSection, /max-w-\[27rem\]/);
  assert.match(showcaseSection, /rounded-\[4\.5rem\]/);
  assert.match(showcaseSection, /border-\[10px\]/);
  assert.match(showcaseSection, /rounded-\[3\.75rem\]/);
  assert.match(showcaseSection, /unoptimized/);
  assert.doesNotMatch(showcaseSection, /xl:grid-cols-5|lg:grid-cols-3/);
});

test("screenshot documentation covers the supplied real app flows", () => {
  const plan = readFileSync(
    new URL("../docs/LANDING_SCREENSHOTS.md", import.meta.url),
    "utf8",
  );
  assert.match(plan, /wyłącznie zrzuty.*działającej aplikacji/is);
  for (const item of Object.values(LANDING_SCREENSHOTS).flat())
    assert.ok(plan.includes(item.src.split("/").at(-1)!));
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
  test(`${locale} FAQ keeps beta availability clear`, () => {
    const copy = messages(locale);
    const marketingCopy = [
      copy.hero.badge,
      copy.hero.subtitle,
      copy.preorder.subtitle,
      ...copy.preorder.faq.map((item: { answer: string }) => item.answer),
    ].join(" ");

    assert.match(marketingCopy, /beta/i);
    assert.doesNotMatch(marketingCopy, /prototyp|prototype/i);
    assert.doesNotMatch(
      copy.hero.validation,
      /planowan.{0,20}września|planned for the end of september/i,
    );
  });

  test(`${locale} checkout keeps optional beta separate from the purchase`, () => {
    const copy = messages(locale) as LandingMessages & {
      preorder: { faq: Array<{ answer: string }> };
    };
    assert.match(copy.preorder.faq[1].answer, /free|bezpłatn/i);
    assert.match(
      copy.preorder.faq[1].answer,
      /does not guarantee|nie gwarantuje/i,
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

test("legal copy preserves its existing punctuation", () => {
  for (const locale of ["pl", "en"] as const) {
    const source = readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    );
    const legalSource = readFileSync(
      new URL(`../messages/legal-${locale}.json`, import.meta.url),
      "utf8",
    );

    assert.ok(source);
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

test("active legal documents disclose Resend and use the Fishki support address", () => {
  for (const locale of ["pl", "en"] as const) {
    const landing = readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    );
    const legal = readFileSync(
      new URL(`../messages/legal-${locale}.json`, import.meta.url),
      "utf8",
    );
    const activeDocuments = `${landing}\n${legal}`;

    assert.match(activeDocuments, /support@fishki-med\.com/);
    assert.match(activeDocuments, /Resend/);
    assert.doesNotMatch(activeDocuments, /mateuszbuczak1@gmail\.com/);
    assert.match(
      legal,
      /zgłoszeń dotyczących wsparcia|support requests, bug reports/i,
    );
  }
});
