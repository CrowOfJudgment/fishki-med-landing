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
    { href: "/#why-fishki", label: t.header.whyFishki, className: "hidden min-[940px]:inline-flex" },
    { href: "/#how-it-works", label: t.header.how, className: "hidden min-[1040px]:inline-flex" },
    { href: "/#demo", label: t.header.demo, className: "hidden md:inline-flex" },
  ];

  return (
    <header className="fixed inset-x-0 top-2 z-40 sm:top-3">
      <div className="mx-auto max-w-7xl px-3 sm:px-5">
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5]/90 px-3 py-2.5 shadow-[0_16px_50px_rgba(39,77,83,0.1)] backdrop-blur-xl sm:rounded-[1.4rem] sm:px-4 sm:py-3 xl:gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Logo horizontal className="w-[92px] sm:w-[108px] lg:w-[116px] xl:w-[138px]" />
          </div>

          <nav className="min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.className} whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium text-[#274D53] transition hover:bg-[#E7F1EE] hover:text-[#002838] xl:px-3 xl:text-sm`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#preorder"
              aria-label={t.header.preorderCtaAria ?? t.header.preorderCta}
              className="hidden h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#E86860] px-3 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 hover:bg-[#D85A52] min-[820px]:inline-flex xl:px-4 xl:text-sm"
            >
              {t.header.preorderCta}
            </Link>
            <Link
              href="/#waitlist-form"
              aria-label={t.header.ctaAria ?? t.header.cta}
              className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#0F766E] px-3 text-xs font-medium text-white shadow-[0_10px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838] xl:px-4 xl:text-sm"
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
