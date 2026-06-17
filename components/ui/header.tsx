"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Header() {
  const t = useT();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateVisibility = () => {
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      const currentScrollY = window.scrollY;

      setIsMobile(mobile);

      if (!mobile) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 12) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 24) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (isMobile && !isVisible) {
    return null;
  }

  const navLinks = [
    { href: "/#why-fishki", label: t.header.whyFishki, className: "hidden xl:inline-flex" },
    { href: "/#how-it-works", label: t.header.how, className: "hidden xl:inline-flex" },
    { href: "/#demo", label: t.header.demo, className: "hidden lg:inline-flex" },
    { href: "/#features", label: t.header.features, className: "hidden 2xl:inline-flex" },
  ];

  return (
    <header className="fixed inset-x-0 top-2 z-40 sm:top-3">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5]/90 px-3 py-2.5 shadow-[0_16px_50px_rgba(39,77,83,0.1)] backdrop-blur-xl sm:gap-3 sm:rounded-[1.4rem] sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Logo horizontal className="w-[92px] sm:w-[118px] lg:w-[138px]" />
          </div>

          <nav className="min-w-0 items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.className} whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-[#274D53] transition hover:bg-[#E7F1EE] hover:text-[#002838]`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#preorder"
              aria-label={t.header.preorderCtaAria ?? t.header.preorderCta}
              className="hidden h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#E86860] px-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 hover:bg-[#D85A52] lg:inline-flex"
            >
              {t.header.preorderCta}
            </Link>
            <Link
              href="/#waitlist-form"
              aria-label={t.header.ctaAria ?? t.header.cta}
              className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#0F766E] px-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
