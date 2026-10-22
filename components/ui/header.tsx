"use client";

import Link from "next/link";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Header() {
  const t = useT();
  const navLinks = [
    {
      href: "/#how-it-works",
      label: t.header.how,
      className: "text-[#274D53] hidden min-[480px]:inline-flex",
    },
    {
      href: "/#why-fishki",
      label: t.header.problem,
      className: "text-[#274D53] hidden sm:inline-flex",
    },
    {
      href: "/#exam-planning",
      label: t.header.examPlanning,
      className: "text-[#274D53] hidden md:inline-flex",
    },
    {
      href: "/#for-medicine",
      label: t.header.forMedicine,
      className: "text-[#274D53] hidden min-[980px]:inline-flex",
    },
    {
      href: "/#preorder",
      label: t.header.preorderCta,
      className:
        "inline-flex shrink-0 bg-[#E86860] font-semibold text-[#002838]",
    },
    {
      href: "/#waitlist-form",
      label: t.header.waitlist,
      className: "text-[#274D53] hidden min-[1240px]:inline-flex",
    },
    {
      href: "/#faq",
      label: t.header.faq,
      className: "text-[#274D53] hidden min-[1120px]:inline-flex",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-2 z-40 sm:top-3">
      <div className="mx-auto max-w-7xl px-3 sm:px-5">
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5]/90 px-3 py-2.5 shadow-[0_16px_50px_rgba(39,77,83,0.1)] backdrop-blur-xl sm:rounded-[1.4rem] sm:px-4 sm:py-3 xl:gap-3">
          <div className="flex shrink-0 items-center gap-3">
            <Logo
              horizontal
              className="w-[128px] sm:w-[142px] lg:w-[154px] xl:w-[170px]"
            />
          </div>

          <nav className="flex min-w-0 items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-analytics-click={`header_${link.href.split("#")[1] ?? "link"}`}
                data-analytics-section="header"
                className={`${link.className} whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium transition xl:px-3 xl:text-sm ${
                  link.href === "/#preorder"
                    ? "hover:bg-[#E86860]"
                    : "hover:bg-[#E7F1EE] hover:text-[#002838]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
