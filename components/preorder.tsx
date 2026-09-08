"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLocale, useT } from "@/lib/i18n-context";
import type { PricingRegion } from "@/lib/pricing-region";
import {
  apiPricingRegion,
  isSafeCheckoutUrl,
  payByLinkAvailable,
  PREORDER_DOCUMENT_VERSIONS,
} from "@/lib/preorder-checkout";

type PaymentProvider = "STRIPE" | "PAY_BY_LINK";
type PreferredPlatform = "IOS" | "ANDROID" | "BOTH" | "UNDECIDED";

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
  const [preferredPlatform, setPreferredPlatform] =
    useState<PreferredPlatform | null>(null);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionIds = useRef<Partial<Record<PaymentProvider, string>>>({});
  const validName = fullName.trim().length >= 2;
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const canBuy =
    validName &&
    validEmail &&
    preferredPlatform !== null &&
    acceptedPreorderTerms &&
    acceptedTermsOfUse &&
    acceptedPrivacyPolicy;

  const handleBuyClick = async (
    paymentProvider: PaymentProvider,
  ) => {
    if (!canBuy) {
      setShowConsentError(true);
      return;
    }
    setSubmitting(true);
    setSubmissionError(null);
    try {
      const submissionId = submissionIds.current[paymentProvider]
        ?? crypto.randomUUID();
      submissionIds.current[paymentProvider] = submissionId;
      const response = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          fullName: fullName.trim(),
          email: email.trim(),
          paymentProvider,
          pricingRegion: apiPricingRegion(pricingRegion),
          locale,
          preferredPlatform,
          ...PREORDER_DOCUMENT_VERSIONS,
          website,
        }),
      });
      if (!response.ok) throw new Error("Preorder registration failed");
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
    <section id="preorder" className="scroll-mt-28 pb-10 pt-4 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#B9DDD5] bg-white/75 p-5 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#78C2B7]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#B9DDD5]/35 blur-3xl"
          />

          <div className="relative">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.preorder.badge}
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
                {pricing.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#274D53]">
                {t.preorder.subtitle}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {t.preorder.offerFacts.map(
                (item: { label: string; value: string; note: string }, index: number) => (
                  <article
                    key={item.label}
                    className={`rounded-[1.35rem] border p-4 sm:p-5 ${
                      index === 0
                        ? "border-[#E86860]/35 bg-[#E86860]/8"
                        : "border-[#B9DDD5] bg-[#F4F7F5]"
                    }`}
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#002838]">
                      {index === 0 ? pricing.value : item.value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#274D53]">
                      {index === 0 ? pricing.note : item.note}
                    </p>
                  </article>
                ),
              )}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              <div>
              <div className="rounded-[1.35rem] border border-[#B9DDD5] bg-[#F4F7F5] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                  {t.preorder.deliveryGuaranteeLabel}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#002838]">
                  {t.preorder.deliveryGuarantee}
                </p>
              </div>
              <div className="mt-7 space-y-3">
                {t.preorder.includes.map((item: string, index: number) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B9DDD5] text-xs font-bold text-[#0F766E]">
                      ✓
                    </span>
                    <span className="text-sm leading-6 text-[#274D53]">
                      {index === t.preorder.includes.length - 1
                        ? pricing.comparison
                        : item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-[#B9DDD5] bg-[#F4F7F5] p-4 text-sm leading-6 text-[#274D53]">
                {t.preorder.trust}
              </p>
              </div>

              <div>
              <div
                id="preorder-module"
                className="rounded-[1.75rem] border border-[#78C2B7] bg-[#F4F7F5] p-6 sm:p-8"
              >
                <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                  {t.preorder.placeholderLabel}
                </p>
                <div className="mt-5 space-y-3 text-left">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-[#002838]">
                      {t.preorder.fullNameLabel}
                      <input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
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
                  <fieldset className="rounded-[1.15rem] border border-[#B9DDD5] bg-white p-4">
                    <legend className="px-1 text-sm font-semibold text-[#002838]">
                      {t.preorder.platformLabel}
                    </legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(["IOS", "ANDROID", "BOTH", "UNDECIDED"] as const).map((platform) => (
                        <label
                          key={platform}
                          className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm transition ${
                            preferredPlatform === platform
                              ? "border-[#0F766E] bg-[#E7F1EE] text-[#002838]"
                              : "border-[#D8E8E4] text-[#274D53]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferred-platform"
                            value={platform}
                            checked={preferredPlatform === platform}
                            onChange={() => setPreferredPlatform(platform)}
                            className="accent-[#0F766E]"
                          />
                          {t.preorder.platformOptions[platform]}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="absolute -left-[10000px]" aria-hidden="true">
                    Website
                    <input
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                  <label className={`flex cursor-pointer items-start gap-3 rounded-[1.15rem] border bg-white p-4 text-sm leading-6 text-[#274D53] transition ${
                    showConsentError && !acceptedPreorderTerms
                      ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                      : "border-[#B9DDD5]"
                  }`}>
                    <input
                      type="checkbox"
                      required
                      checked={acceptedPreorderTerms}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedPreorderTerms(checked);
                        if (checked && acceptedTermsOfUse && acceptedPrivacyPolicy) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0F766E]"
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

                  <label className={`flex cursor-pointer items-start gap-3 rounded-[1.15rem] border bg-white p-4 text-sm leading-6 text-[#274D53] transition ${
                    showConsentError && !acceptedTermsOfUse
                      ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                      : "border-[#B9DDD5]"
                  }`}>
                    <input
                      type="checkbox"
                      required
                      checked={acceptedTermsOfUse}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedTermsOfUse(checked);
                        if (acceptedPreorderTerms && checked && acceptedPrivacyPolicy) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0F766E]"
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

                  <label className={`flex cursor-pointer items-start gap-3 rounded-[1.15rem] border bg-white p-4 text-sm leading-6 text-[#274D53] transition ${
                    showConsentError && !acceptedPrivacyPolicy
                      ? "border-[#E86860] shadow-[0_0_0_3px_rgba(232,104,96,0.12)]"
                      : "border-[#B9DDD5]"
                  }`}>
                    <input
                      type="checkbox"
                      required
                      checked={acceptedPrivacyPolicy}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setAcceptedPrivacyPolicy(checked);
                        if (acceptedPreorderTerms && acceptedTermsOfUse && checked) {
                          setShowConsentError(false);
                        }
                      }}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0F766E]"
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

                <div className="mt-6 flex flex-col gap-3">
                  {payByLinkAvailable(pricingRegion) ? (
                    <button
                      type="button"
                      onClick={() => void handleBuyClick("PAY_BY_LINK")}
                      disabled={submitting}
                      data-analytics-click={canBuy ? "preorder_buy_paybylink" : "preorder_buy_missing_consents"}
                      data-analytics-section="preorder"
                      className={`flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_32px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 ${
                        showConsentError && !canBuy
                          ? "bg-[#E86860] ring-4 ring-[#E86860]/20"
                          : "bg-[#E86860] hover:bg-[#D85A52]"
                      }`}
                    >
                      {submitting ? t.preorder.redirecting : t.preorder.buyWithBlik}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void handleBuyClick("STRIPE")}
                    disabled={submitting}
                    data-analytics-click={canBuy ? "preorder_buy_stripe" : "preorder_buy_missing_consents"}
                    data-analytics-section="preorder"
                    className={`flex min-h-12 w-full items-center justify-center rounded-full border-2 bg-white px-5 py-3 text-center text-sm font-semibold text-[#002838] transition hover:-translate-y-0.5 hover:bg-[#E86860]/5 ${
                      showConsentError && !canBuy
                        ? "border-[#E86860] ring-4 ring-[#E86860]/20"
                        : "border-[#E86860]"
                    }`}
                  >
                    {submitting ? t.preorder.redirecting : t.preorder.buyWithCard}
                  </button>
                </div>
                {showConsentError && !canBuy ? (
                  <p className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]">
                    {t.preorder.buyCtaDisabled}
                  </p>
                ) : null}
                {submissionError ? (
                  <p role="alert" className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]">
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
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
