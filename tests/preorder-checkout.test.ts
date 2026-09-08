import assert from "node:assert/strict";
import test from "node:test";
import {
  apiPricingRegion,
  isSafeCheckoutUrl,
  payByLinkAvailable,
  PREORDER_DOCUMENT_VERSIONS,
} from "../lib/preorder-checkout.ts";

test("maps every displayed region to the backend contract", () => {
  assert.equal(apiPricingRegion("pl"), "PL");
  assert.equal(apiPricingRegion("eu"), "EU");
  assert.equal(apiPricingRegion("us"), "INTERNATIONAL");
});

test("offers PayByLink only for the PLN checkout", () => {
  assert.equal(payByLinkAvailable("pl"), true);
  assert.equal(payByLinkAvailable("eu"), false);
  assert.equal(payByLinkAvailable("us"), false);
});

test("accepts only absolute HTTPS checkout URLs", () => {
  assert.equal(isSafeCheckoutUrl("https://checkout.stripe.com/example"), true);
  assert.equal(isSafeCheckoutUrl("http://checkout.example"), false);
  assert.equal(isSafeCheckoutUrl("javascript:alert(1)"), false);
  assert.equal(isSafeCheckoutUrl("/relative"), false);
  assert.equal(isSafeCheckoutUrl(null), false);
});

test("pins the exact legal document versions accepted at purchase", () => {
  assert.deepEqual(PREORDER_DOCUMENT_VERSIONS, {
    preorderTermsVersion: "2026-09-08",
    termsOfUseVersion: "2026-06-20",
    privacyPolicyVersion: "2026-09-08-v2",
  });
});
