import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import logoImage from "../../../../logo.png";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const copy = {
  pl: {
    eyebrow: "Konto Fishki",
    successTitle: "Adres e-mail został potwierdzony",
    successBody:
      "Twoje konto jest aktywne. Możesz wrócić do aplikacji mobilnej albo rozpocząć naukę w przeglądarce.",
    errorTitle: "Nie udało się potwierdzić adresu",
    errorBody:
      "Link mógł wygasnąć albo zostać już wykorzystany. Otwórz Fishki i poproś o wysłanie nowej wiadomości.",
    openMobile: "Otwórz Fishki",
    openWeb: "Otwórz aplikację webową",
    backHome: "Wróć na stronę główną",
    footnote:
      "Jeśli aplikacja mobilna nie otworzy się automatycznie, uruchom ją ręcznie i zaloguj się.",
  },
  en: {
    eyebrow: "Fishki account",
    successTitle: "Your email has been confirmed",
    successBody:
      "Your account is active. You can return to the mobile app or start learning in your browser.",
    errorTitle: "We couldn't confirm your email",
    errorBody:
      "The link may have expired or already been used. Open Fishki and request a new confirmation email.",
    openMobile: "Open Fishki",
    openWeb: "Open the web app",
    backHome: "Back to the homepage",
    footnote:
      "If the mobile app doesn't open automatically, launch it manually and sign in.",
  },
} as const;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EmailConfirmedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const headerStore = await headers();
  const locale = headerStore
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("pl")
    ? "pl"
    : "en";
  const t = copy[locale];
  const params = await searchParams;
  const hasError = Boolean(
    firstValue(params.error) ??
    firstValue(params.error_code) ??
    firstValue(params.error_description),
  );

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-white/85 p-6 text-center shadow-[0_30px_90px_rgba(39,77,83,0.12)] backdrop-blur-xl sm:p-10">
        <Image
          src={logoImage}
          alt=""
          priority
          className="mx-auto h-20 w-20 rounded-[22%] object-contain sm:h-24 sm:w-24"
        />

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-[#002838] sm:text-4xl">
          {hasError ? t.errorTitle : t.successTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-[#274D53] sm:text-lg">
          {hasError ? t.errorBody : t.successBody}
        </p>

        {!hasError && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="fishki://"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0F766E] px-6 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F766E]"
            >
              {t.openMobile}
            </a>
            <a
              href="https://app.fishki-med.com"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B9DDD5] bg-[#F4F7F5] px-6 py-3 font-semibold text-[#002838] transition hover:-translate-y-0.5 hover:border-[#78C2B7] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F766E]"
            >
              {t.openWeb}
            </a>
          </div>
        )}

        <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-[#5D797D]">
          {!hasError && t.footnote}
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex text-sm font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 transition hover:text-[#002838]"
        >
          {t.backHome}
        </Link>
      </div>
    </section>
  );
}
