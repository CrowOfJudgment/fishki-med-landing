"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "@/lib/i18n-context";
import type { PricingRegion } from "@/lib/pricing-region";

const POLISH_PREORDER_PAYMENT_URL = "https://paybylink.pl/linkPay/817cf10ad7e92cd595dd328477eb7974";
const INTERNATIONAL_PREORDER_PAYMENT_URL = "https://buy.stripe.com/6oU3cw00q2bSg5v9FufEk00";

export default function Preorder({
  pricingRegion,
}: {
  pricingRegion: PricingRegion;
}) {
  const t = useT();
  const pricing = t.preorder.pricing[pricingRegion];
  const [acceptedPreorderTerms, setAcceptedPreorderTerms] = useState(false);
  const [acceptedTermsOfUse, setAcceptedTermsOfUse] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const canBuy = acceptedPreorderTerms && acceptedTermsOfUse && acceptedPrivacyPolicy;

  const handleBuyClick = (paymentUrl: string) => {
    if (!canBuy) {
      setShowConsentError(true);
      return;
    }

    window.location.href = paymentUrl;
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
                  <button
                    type="button"
                    onClick={() => handleBuyClick(POLISH_PREORDER_PAYMENT_URL)}
                    data-analytics-click={canBuy ? "preorder_buy_paybylink" : "preorder_buy_missing_consents"}
                    data-analytics-section="preorder"
                    className={`flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_32px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 ${
                      pricingRegion === "pl" ? "order-1" : "order-2"
                    } ${
                      showConsentError && !canBuy
                        ? "bg-[#E86860] ring-4 ring-[#E86860]/20"
                        : "bg-[#E86860] hover:bg-[#D85A52]"
                    }`}
                  >
                    {t.preorder.buyWithBlik}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBuyClick(INTERNATIONAL_PREORDER_PAYMENT_URL)}
                    data-analytics-click={canBuy ? "preorder_buy_stripe" : "preorder_buy_missing_consents"}
                    data-analytics-section="preorder"
                    className={`flex min-h-12 w-full items-center justify-center rounded-full border-2 bg-white px-5 py-3 text-center text-sm font-semibold text-[#002838] transition hover:-translate-y-0.5 hover:bg-[#E86860]/5 ${
                      pricingRegion === "pl" ? "order-2" : "order-1"
                    } ${
                      showConsentError && !canBuy
                        ? "border-[#E86860] ring-4 ring-[#E86860]/20"
                        : "border-[#E86860]"
                    }`}
                  >
                    {t.preorder.buyWithCard}
                  </button>
                </div>
                {showConsentError && !canBuy ? (
                  <p className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]">
                    {t.preorder.buyCtaDisabled}
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

          <div className="mt-8 rounded-[1.75rem] border border-[#B9DDD5] bg-[#E7F1EE]/70 p-5 sm:p-6">
            <h3 className="font-display text-2xl font-semibold text-[#002838]">
              {t.preorder.roadmapTitle}
            </h3>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {t.preorder.roadmap.map((item: { stage: string; text: string }) => (
                <article
                  key={item.stage}
                  className="rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                    {item.stage}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#274D53]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
