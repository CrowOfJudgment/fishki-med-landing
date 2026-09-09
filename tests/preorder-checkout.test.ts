import assert from "node:assert/strict";
import test from "node:test";
import {
  apiPricingRegion,
  isSafeCheckoutUrl,
  preorderProblemMessageKey,
  PREORDER_DOCUMENT_VERSIONS,
  PREORDER_PAYMENT_PROVIDER,
} from "../lib/preorder-checkout.ts";

test("maps every displayed region to the backend contract", () => {
  assert.equal(apiPricingRegion("pl"), "PL");
  assert.equal(apiPricingRegion("eu"), "EU");
  assert.equal(apiPricingRegion("us"), "INTERNATIONAL");
});

test("uses Stripe as the only preorder checkout provider", () => {
  assert.equal(PREORDER_PAYMENT_PROVIDER, "STRIPE");
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

test("maps duplicate preorder problems to dedicated customer messages", () => {
  assert.equal(
    preorderProblemMessageKey({ code: "PREORDER_ALREADY_PURCHASED" }),
    "alreadyPurchasedError",
  );
  assert.equal(
    preorderProblemMessageKey({ code: "PREORDER_PAYMENT_PROCESSING" }),
    "paymentProcessingError",
  );
  assert.equal(preorderProblemMessageKey({ code: "SOMETHING_ELSE" }), null);
  assert.equal(preorderProblemMessageKey(null), null);
});
