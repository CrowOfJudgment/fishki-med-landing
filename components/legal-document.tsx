"use client";

import Link from "next/link";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type LegalDocumentCopy = {
  back: string;
  badge: string;
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: { title: string; blocks: LegalBlock[] }[];
};

export default function LegalDocument({ copy }: { copy: LegalDocumentCopy }) {
  return (
    <main className="bg-[#F4F7F5] pb-20 pt-8">
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-[2.25rem] border border-[#B9DDD5] bg-white/80 p-6 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-10">
          <Link
            href="/"
            className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-white"
          >
            {copy.back}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {copy.badge}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#002838] sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-[#0F766E]">
            {copy.lastUpdated}
          </p>
          {copy.intro ? (
            <p className="mt-5 text-base leading-8 text-[#274D53]">{copy.intro}</p>
          ) : null}

          <div className="mt-10 space-y-8">
            {copy.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-[#B9DDD5] bg-[#F4F7F5] p-5 sm:p-6"
              >
                <h2 className="font-display text-2xl font-semibold text-[#002838]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, index) => {
                    if (block.type === "list") {
                      return (
                        <ul
                          key={`${section.title}-list-${index}`}
                          className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#274D53] marker:text-[#0F766E]"
                        >
                          {block.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote
                          key={`${section.title}-quote-${index}`}
                          className="whitespace-pre-line rounded-[1.15rem] border border-[#B9DDD5] bg-white p-4 text-sm leading-7 text-[#274D53]"
                        >
                          {block.text}
                        </blockquote>
                      );
                    }
                    return <p key={`${section.title}-paragraph-${index}`} className="whitespace-pre-line text-sm leading-7 text-[#274D53]">{block.text}</p>;
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
