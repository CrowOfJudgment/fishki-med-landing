import type { PricingRegion } from "./pricing-region";

export const PREORDER_DOCUMENT_VERSIONS = {
  preorderTermsVersion: "2026-09-08",
  termsOfUseVersion: "2026-06-20",
  privacyPolicyVersion: "2026-09-08-v2",
} as const;

export function apiPricingRegion(region: PricingRegion) {
  if (region === "pl") return "PL" as const;
  if (region === "eu") return "EU" as const;
  return "INTERNATIONAL" as const;
}

export function payByLinkAvailable(region: PricingRegion) {
  return region === "pl";
}

export function isSafeCheckoutUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
