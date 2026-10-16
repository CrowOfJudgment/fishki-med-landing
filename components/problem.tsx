"use client";

import { useT } from "@/lib/i18n-context";

const iconPaths = [
  "M12 19h8M16 3a2.1 2.1 0 0 1 3 3L8 17l-4 1 1-4Z M14 5l3 3",
  "M12 18V5a3 3 0 0 0-6 0 4 4 0 0 0-3 6 4 4 0 0 0 2 7 4 4 0 0 0 7 2 4 4 0 0 0 7-2 4 4 0 0 0 2-7 4 4 0 0 0-3-6 3 3 0 0 0-6 0 M8 8l-2-1m10 1 2-1M7 14l-2 1m12-1 2 1",
  "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm4 12 2 2 4-4",
];

export default function Problem() {
  const t = useT();
  return (
    <>
      <section id="why-fishki" className="scroll-mt-28 py-10 sm:py-16">
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
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {t.problem.tools.map(
              (tool: { name: string; text: string }, index: number) => (
                <article
                  key={tool.name}
                  className="rounded-[1.75rem] border border-[#B9DDD5] bg-white/70 p-6 sm:p-7"
                >
                  <svg
                    aria-hidden="true"
                    className="h-7 w-7 text-[#0F766E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={iconPaths[index]} />
                  </svg>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-[#002838]">
                    {tool.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#274D53]">
                    {tool.text}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>
      <section id="exam-planning" className="scroll-mt-28 py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
              {t.examPlanning.badge}
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
              {t.examPlanning.heading}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#274D53]">
              {t.examPlanning.intro}
            </p>
            <ol className="mt-6 space-y-5">
              {t.examPlanning.steps.map(
                (step: { title: string; text: string }, index: number) => (
                  <li key={step.title} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F1EE] text-sm font-semibold text-[#0F766E]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#002838]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#274D53]">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
          {/* Replace with a genuine exam planner screenshot when supplied. 06-study-plan.png shows Daily Study. */}
          <div className="flex min-h-72 items-center justify-center rounded-[2rem] border border-dashed border-[#78C2B7] bg-[#E7F1EE]/70 p-8 text-center text-sm text-[#274D53] lg:min-h-[32rem]">
            {t.demo.missingScreenshot}
          </div>
        </div>
      </section>
    </>
  );
}
