import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { getMessages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Delete your Fishki account | Fishki",
  description:
    "Request deletion of your Fishki account and associated data by contacting support@fishki-med.com.",
  alternates: {
    canonical: "https://fishki-med.com/delete-account",
  },
};

export default async function DeleteAccountPage() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const t = getMessages(acceptLanguage.startsWith("pl") ? "pl" : "en");
  const copy = t.deleteAccount;
  const supportEmail = "support@fishki-med.com";
  const emailHref = `mailto:${supportEmail}?subject=${encodeURIComponent(copy.emailSubject)}`;

  return (
    <section className="bg-[#F4F7F5] pb-20 pt-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <article className="rounded-[2.25rem] border border-[#B9DDD5] bg-white/80 p-6 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {copy.badge}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#002838] sm:text-5xl">
            {copy.title}
          </h1>
          <div className="mt-8 space-y-5 text-base leading-8 text-[#274D53]">
            <p>
              {copy.request}{" "}
              <a
                href={emailHref}
                className="break-words font-semibold text-[#0F766E] underline underline-offset-4 hover:text-[#002838]"
              >
                {supportEmail}
              </a>
              .
            </p>
            <p>{copy.emailHint}</p>
            <p>{copy.deletion}</p>
            <p className="text-sm leading-7">{copy.retention}</p>
            <p>
              <Link
                href="/privacy"
                className="font-semibold text-[#0F766E] underline underline-offset-4 hover:text-[#002838]"
              >
                {copy.privacyLink}
              </Link>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
