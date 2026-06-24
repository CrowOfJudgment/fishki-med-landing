"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "@/lib/i18n-context";

const PAYBYLINK_URL = "https://paybylink.pl/linkPay/817cf10ad7e92cd595dd328477eb7974";

export default function Preorder() {
  const t = useT();
  const [acceptedPreorderTerms, setAcceptedPreorderTerms] = useState(false);
  const [acceptedTermsOfUse, setAcceptedTermsOfUse] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const canBuy = acceptedPreorderTerms && acceptedTermsOfUse && acceptedPrivacyPolicy;

  const handleBuyClick = () => {
    if (!canBuy) {
      setShowConsentError(true);
      return;
    }

    window.location.href = PAYBYLINK_URL;
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

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.preorder.badge}
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
                {t.preorder.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#274D53]">
                {t.preorder.subtitle}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {t.preorder.offerFacts.map(
                  (item: { label: string; value: string; note: string }, index: number) => (
                    <article
                      key={item.label}
                      className={`rounded-[1.35rem] border p-4 ${
                        index === 0
                          ? "border-[#E86860]/35 bg-[#E86860]/8"
                          : "border-[#B9DDD5] bg-[#F4F7F5]"
                      }`}
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[#002838]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#274D53]">
                        {item.note}
                      </p>
                    </article>
                  ),
                )}
              </div>
              <div className="mt-4 rounded-[1.35rem] border border-[#B9DDD5] bg-[#F4F7F5] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                  {t.preorder.deliveryGuaranteeLabel}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#002838]">
                  {t.preorder.deliveryGuarantee}
                </p>
              </div>
              <div className="mt-7 space-y-3">
                {t.preorder.includes.map((item: string) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B9DDD5] text-xs font-bold text-[#0F766E]">
                      ✓
                    </span>
                    <span className="text-sm leading-6 text-[#274D53]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-[#B9DDD5] bg-[#F4F7F5] p-4 text-sm leading-6 text-[#274D53]">
                {t.preorder.trust}
              </p>
            </div>

            <div className="space-y-4">
              <div
                id="preorder-module"
                className="rounded-[1.75rem] border border-[#78C2B7] bg-[#F4F7F5] p-6 sm:p-8"
              >
                <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                  {t.preorder.placeholderLabel}
                </p>
                <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-[#274D53]">
                  {t.preorder.placeholderText}
                </p>

                <div className="mt-6 space-y-3 text-left">
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
                      <Link href="/terms" className="font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 hover:text-[#002838]">
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
                      <Link href="/privacy" className="font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 hover:text-[#002838]">
                        {t.preorder.privacyLink}
                      </Link>
                      {t.preorder.privacyConsentAfter}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-[1.15rem] border border-[#B9DDD5] bg-white p-4 text-sm leading-6 text-[#274D53]">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0F766E]"
                    />
                    <span>{t.preorder.marketingConsent}</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleBuyClick}
                  className={`mt-6 flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 ${
                    showConsentError && !canBuy
                      ? "bg-[#E86860] ring-4 ring-[#E86860]/20"
                      : "bg-[#E86860] hover:bg-[#D85A52]"
                  }`}
                >
                  {t.preorder.buyCta}
                </button>
                {showConsentError && !canBuy ? (
                  <p className="mt-3 rounded-2xl border border-[#E86860]/35 bg-[#E86860]/10 px-4 py-3 text-center text-xs font-medium leading-5 text-[#002838]">
                    {t.preorder.buyCtaDisabled}
                  </p>
                ) : null}

                <Link
                  href="/preorder-terms"
                  className="mx-auto mt-5 inline-flex items-center justify-center text-sm font-semibold text-[#0F766E] underline decoration-[#78C2B7] underline-offset-4 transition hover:text-[#002838]"
                >
                  {t.preorder.readTerms}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-8 rounded-[1.75rem] border border-[#B9DDD5] bg-[#E7F1EE]/70 p-5 sm:p-6">
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
    </section>
  );
}
