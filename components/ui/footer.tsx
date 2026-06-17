"use client";

import Link from "next/link";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Footer({ border = false }: { border?: boolean }) {
  const t = useT();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: "/#features", label: t.footer.features },
    { href: "/#how-it-works", label: t.footer.how },
    { href: "/#demo", label: t.footer.demo },
    { href: "/#waitlist-form", label: t.footer.waitlist },
    { href: "/terms", label: t.footer.terms },
  ];

  return (
    <footer
      className={`relative pb-10 pt-16 sm:pt-20 ${
        border ? "border-t border-[#B9DDD5]" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#B9DDD5] bg-white/70 px-5 py-8 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-[#B9DDD5]/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#78C2B7]/15 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
            <div className="max-w-md">
              <Logo className="w-[120px] sm:w-[150px]" />
              <p className="mt-5 text-sm leading-7 text-[#274D53]">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#274D53]/70">
                {t.footer.product}
              </p>
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-[#274D53] transition hover:text-[#002838]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#78C2B7] transition group-hover:bg-[#0F766E]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="rounded-2xl border border-[#B9DDD5] bg-[#F4F7F5] p-5">
                <p className="mt-4 text-sm leading-6 text-[#274D53]">
                  © {year} Fishki. {t.footer.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
