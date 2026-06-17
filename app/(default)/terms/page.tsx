"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n-context";

export default function TermsPage() {
  const t = useT();

  return (
    <main className="bg-[#F4F7F5] pb-20 pt-8">
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-[2.25rem] border border-[#B9DDD5] bg-white/75 p-6 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-10">
          <Link
            href="/"
            className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-white"
          >
            {t.terms.back}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.terms.badge}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#002838] sm:text-5xl">
            {t.terms.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#274D53]">
            {t.terms.intro}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#78C2B7] bg-[#F4F7F5] p-6">
            <h2 className="font-display text-2xl font-semibold text-[#002838]">
              {t.terms.placeholderTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#274D53]">
              {t.terms.placeholderText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
