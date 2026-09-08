"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n-context";

export default function PreorderThankYouPage() {
  const t = useT();

  return (
    <main className="bg-[#F4F7F5] pb-20 pt-8">
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2.25rem] border border-[#B9DDD5] bg-white/80 p-6 text-center shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-10">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
            {t.preorderThankYou.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-[#002838] sm:text-5xl">
            {t.preorderThankYou.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#274D53]">
            {t.preorderThankYou.body}
          </p>
          <div className="mx-auto mt-7 max-w-xl space-y-3 text-left">
            <p className="rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5] p-4 text-sm leading-7 text-[#274D53]">
              {t.preorderThankYou.accountHint}
            </p>
            <p className="rounded-[1.25rem] border border-[#B9DDD5] bg-white p-4 text-sm leading-7 text-[#274D53]">
              {t.preorderThankYou.receiptHint}
            </p>
          </div>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B5F59]"
          >
            {t.preorderThankYou.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
