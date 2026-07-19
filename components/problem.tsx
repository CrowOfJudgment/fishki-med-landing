"use client";

import { useT } from "@/lib/i18n-context";

function NegativeIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
      <path d="m4 4 6 6M10 4l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
      <path d="m3 7.25 2.25 2.25L11 3.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ProblemTool = {
  name: string;
  label: string;
  text: string;
  points: string[];
};

export default function Problem() {
  const t = useT();

  return (
    <section id="problem" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.problem.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.problem.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.problem.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {t.problem.tools.map((tool: ProblemTool, index: number) => {
            const featured = index === 2;
            return (
              <article
                key={tool.name}
                className={`relative rounded-[1.75rem] border p-7 ${
                  featured
                    ? "border-[#0F766E] bg-[#0F766E] text-white shadow-[0_24px_60px_rgba(15,118,110,0.2)]"
                    : "border-[#B9DDD5] bg-white/70 text-[#002838]"
                }`}
              >
                {featured && (
                  <span className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-[#E86860]" />
                )}
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${featured ? "text-[#B9DDD5]" : "text-[#0F766E]"}`}>
                  {tool.name}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  {tool.label}
                </h3>
                <p className={`mt-4 text-sm leading-7 ${featured ? "text-white/80" : "text-[#274D53]"}`}>
                  {tool.text}
                </p>
                <ul className="mt-7 space-y-3">
                  {tool.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm font-medium leading-6">
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        featured
                          ? "bg-white/12 text-white"
                          : "bg-[#E86860]/10 text-[#E86860]"
                      }`}>
                        {featured ? <CheckIcon /> : <NegativeIcon />}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
