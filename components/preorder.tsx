"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLocale, useT } from "@/lib/i18n-context";
import type { PricingRegion } from "@/lib/pricing-region";
import {
  apiPricingRegion,
  isSafeCheckoutUrl,
  preorderProblemMessageKey,
  PREORDER_DOCUMENT_VERSIONS,
  PREORDER_PAYMENT_PROVIDER,
} from "@/lib/preorder-checkout";

export default function Preorder({
  pricingRegion,
}: {
  pricingRegion: PricingRegion;
}) {
  const t = useT();
  const locale = useLocale();
  const pricing = t.preorder.pricing[pricingRegion];
  const [acceptedPreorderTerms, setAcceptedPreorderTerms] = useState(false);
  const [acceptedTermsOfUse, setAcceptedTermsOfUse] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionId = useRef<string | null>(null);
  const validName = fullName.trim().length >= 2;
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const canBuy =
    validName &&
    validEmail &&
    acceptedPreorderTerms &&
    acceptedTermsOfUse &&
    acceptedPrivacyPolicy;

  const handleBuyClick = async () => {
    if (!canBuy) {
      setShowConsentError(true);
      return;
    }
    setSubmitting(true);
    setSubmissionError(null);
    try {
      submissionId.current ??= crypto.randomUUID();
      const response = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          fullName: fullName.trim(),
          email: email.trim(),
          paymentProvider: PREORDER_PAYMENT_PROVIDER,
          pricingRegion: apiPricingRegion(pricingRegion),
          locale,
          // The existing API requires this field; no device preference is collected.
          preferredPlatform: "UNDECIDED",
          ...PREORDER_DOCUMENT_VERSIONS,
          website,
        }),
      });
      if (!response.ok) {
        const problem = (await response.json().catch(() => null)) as {
          code?: unknown;
        } | null;
        const messageKey = preorderProblemMessageKey(problem);
        if (messageKey) {
          setSubmissionError(t.preorder[messageKey]);
          setSubmitting(false);
          return;
        }
        throw new Error("Preorder registration failed");
      }
      const result = (await response.json()) as { checkoutUrl?: unknown };
      if (!isSafeCheckoutUrl(result.checkoutUrl)) {
        throw new Error("Checkout URL is missing");
      }
      window.location.assign(result.checkoutUrl);
    } catch {
      setSubmissionError(t.preorder.formSaveError);
      setSubmitting(false);
    }
  };

  return (
    <section id="preorder" className="scroll-mt-28 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#B9DDD5] bg-white/75 p-5 shadow-[0_24px_70px_rgba(39,77,83,0.08)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
              {t.preorder.badge}
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
              {pricing.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#274D53]">
              {t.preorder.subtitle}
            </p>
          </div>
          <div className="mt-7 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] border border-[#B9DDD5] bg-[#E7F1EE]/70 p-5 sm:p-7">
              <p className="font-display text-5xl font-semibold text-[#002838]">
                {pricing.value}
              </p>
              <p className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#0F766E]">
                {pricing.savings}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#274D53]">
                {pricing.plannedAnnual}
              </p>
              <ul className="mt-6 space-y-3">
                {t.preorder.includes.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#274D53]"
                  >
                    <span
                      aria-hidden="true"
                      className="font-bold text-[#0F766E]"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[#B9DDD5] pt-5">
                <p className="text-sm font-semibold text-[#002838]">
                  {t.preorder.expectedLaunch}
                </p>
                <p className="mt-2 text-xs leading-6 text-[#274D53]">
                  {t.preorder.deliveryGuarantee}
                </p>
              </div>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleBuyClick();
              }}
              id="preorder-module"
              className="rounded-[1.75rem] border border-[#78C2B7] bg-[#F4F7F5] p-6 sm:p-8"
            >
              <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.preorder.placeholderLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#274D53]">
                {t.preorder.formSummary}
              </p>
              <div className="mt-5 space-y-3 text-left">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-[#002838]">
                    {t.preorder.fullNameLabel}
                    <input
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="name"
                      className={`mt-2 block min-h-12 w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition focus:border-[#0F766E] focus:ring-4 focus:ring-[#78C2B7]/20 ${
                        showConsentError && !validName
                          ? "border-[#E86860]"
                          : "border-[#B9DDD5]"
                      }`}
                    />
                  </label>
                  <label className="text-sm font-semibold text-[#002838]">
                    {t.preorder.emailLabel}
                    <input
                      type="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      className={`mt-2 block min-h-12 w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition focus:border-[#0F766E] focus:ring-4 focus:ring-[#78C2B7]/20 ${
                        showConsentError && !validEmail
                          ? "border-[#E86860]"
                          : "border-[#B9DDD5]"
                      }`}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-[#274D53]">
                  {t.preorder.accountEmailHint}
                </p>
                <label className="absolute -left-[10000px]" aria-hidden="true">
                  Website
                  <input
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
                <div className="space-y-0">
                  <label
                    className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-transparent px-1 py-1 text-sm leading-5 text-[#274D53] transition sm:min-h-9 ${
                      showConsentError && !acceptedPreorderTerms
                        ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                        : "border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      required
                      checked={acceptedPreorderTerms}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedPreorderTerms(checked);
                        if (
                          checked &&
                          acceptedTermsOfUse &&
                          acceptedPrivacyPolicy
                        ) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#0F766E]"
                    />
                    <span>
                      {t.preorder.purchaseConsentBefore}
                      <Link
                        href="/preorder-terms"
                        data-analytics-click="preorder_terms_inline"
                        data-analytics-section="preorder"
                        className="font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 hover:text-[#002838]"
                      >
                        {t.preorder.termsLink}
                      </Link>
                      {t.preorder.purchaseConsentAfter}
                    </span>
                  </label>

                  <label
                    className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-transparent px-1 py-1 text-sm leading-5 text-[#274D53] transition sm:min-h-9 ${
                      showConsentError && !acceptedTermsOfUse
                        ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                        : "border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      required
                      checked={acceptedTermsOfUse}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedTermsOfUse(checked);
                        if (
                          acceptedPreorderTerms &&
                          checked &&
                          acceptedPrivacyPolicy
                        ) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#0F766E]"
                    />
                    <span>
                      {t.preorder.documentsConsentBefore}
                      <Link
                        href="/terms"
                        data-analytics-click="preorder_terms_of_use_inline"
                        data-analytics-section="preorder"
                        className="font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 hover:text-[#002838]"
                      >
                        {t.preorder.termsOfUseLink}
                      </Link>
                      {t.preorder.documentsConsentAfter}
                    </span>
                  </label>

                  <label
                    className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-transparent px-1 py-1 text-sm leading-5 text-[#274D53] transition sm:min-h-9 ${
                      showConsentError && !acceptedPrivacyPolicy
                        ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                        : "border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      required
                      checked={acceptedPrivacyPolicy}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedPrivacyPolicy(checked);
                        if (
                          acceptedPreorderTerms &&
                          acceptedTermsOfUse &&
                          checked
                        ) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#0F766E]"
                    />
                    <span>
                      {t.preorder.privacyConsentBefore}
                      <Link
                        href="/privacy"
                        data-analytics-click="preorder_privacy_inline"
                        data-analytics-section="preorder"
                        className="font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 hover:text-[#002838]"
                      >
                        {t.preorder.privacyLink}
                      </Link>
                      {t.preorder.privacyConsentAfter}
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  data-analytics-click={
                    canBuy
                      ? "preorder_buy_stripe"
                      : "preorder_buy_missing_consents"
                  }
                  data-analytics-section="preorder"
                  className={`flex min-h-12 w-full items-center justify-center rounded-full border-2 bg-[#E86860] px-5 py-3 text-center text-sm font-semibold text-[#002838] transition disabled:cursor-wait ${
                    showConsentError && !canBuy
                      ? "border-[#E86860] ring-4 ring-[#E86860]/20"
                      : "border-[#E86860]"
                  }`}
                >
                  {submitting ? t.preorder.redirecting : t.preorder.buyWithCard}
                </button>
              </div>
              <p className="mt-3 text-center text-xs leading-5 text-[#274D53]">
                {t.preorder.paymentNote}
              </p>
              {showConsentError && !canBuy ? (
                <p className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]">
                  {t.preorder.buyCtaDisabled}
                </p>
              ) : null}
              {submissionError ? (
                <p
                  role="alert"
                  className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]"
                >
                  {submissionError}
                </p>
              ) : null}

              <Link
                href="/preorder-terms"
                data-analytics-click="preorder_terms_read"
                data-analytics-section="preorder"
                className="mx-auto mt-5 inline-flex items-center justify-center text-sm font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 transition hover:text-[#002838]"
              >
                {t.preorder.readTerms}
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PreorderFaq() {
  const t = useT();
  return (
    <section id="faq" className="scroll-mt-28 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold text-[#002838] sm:text-4xl">
          {t.preorder.faqTitle}
        </h2>
        <div className="mt-7 space-y-3">
          {t.preorder.faq.map((item: { question: string; answer: string }) => (
            <details
              key={item.question}
              className="rounded-2xl border border-[#B9DDD5] bg-white/70 p-5"
            >
              <summary className="cursor-pointer text-sm font-semibold leading-6 text-[#002838]">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#274D53]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-5 text-center">
          <Link
            href="/preorder-terms"
            className="text-sm font-semibold text-[#0F766E] underline underline-offset-4"
          >
            {t.preorder.termsLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
