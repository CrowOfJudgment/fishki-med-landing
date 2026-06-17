"use client";

import { useT } from "@/lib/i18n-context";

function FeatureIcon({ name }: { name: string }) {
  const symbols: Record<string, string> = {
    edit: "✎",
    notes: "≡",
    cloze: "{ }",
    image: "▧",
    occlusion: "◫",
    organize: "▤",
    tags: "#",
    difficulty: "!",
    reviews: "↻",
    offline: "↓",
  };

  return (
    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F1EE] text-sm font-bold text-[#0F766E] ring-1 ring-[#B9DDD5]">
      {symbols[name] ?? "•"}
    </span>
  );
}

export default function Features() {
  const t = useT();

  return (
    <section id="features" className="scroll-mt-28 bg-[#E7F1EE] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#F4F7F5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.features.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.features.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.features.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.features.items.map(
            (
              item: {
                icon: string;
                heading: string;
                text: string;
              },
              index: number,
            ) => (
              <article
                key={item.heading}
                className="group relative min-h-64 rounded-[1.6rem] border border-[#B9DDD5] bg-[#F4F7F5] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#78C2B7] hover:shadow-[0_20px_50px_rgba(39,77,83,0.1)]"
              >
                <div className="flex items-start justify-between">
                  <FeatureIcon name={item.icon} />
                  <span className="text-xs font-semibold text-[#274D53]/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-[#002838]">
                  {item.heading}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#274D53]">{item.text}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
